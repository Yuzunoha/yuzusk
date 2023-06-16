import express from 'express';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { YuzuskService } from './services/YuzuskService.mjs';
import { UtilService } from './services/UtilService.mjs';
import serverlessExpress from '@vendia/serverless-express';
import cors from 'cors';

// 初期化
const utilService = new UtilService();
const options = utilService.isAws() ? undefined : { endpoint: 'http://localhost:8000', region: 'dummy' };
const dynamoDB = new DynamoDB(options);
const ddbDocClient = DynamoDBDocumentClient.from(dynamoDB);
const yuzuskService = new YuzuskService({ ddbDocClient, UpdateCommand, QueryCommand, utilService });

// express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// 汎用関数
const p = console.log;
const createHandler = (func) => (req, res) => func({ req, res });
const setRouteGet = (route, func) => app.get(route, createHandler(func));
const setRoutePost = (route, func) => app.post(route, createHandler(func));

// コントローラ
setRouteGet('/', async ({ req, res }) => {
  // yuzuskkeyが無ければ作る
  const yuzuskkey = req.query.id;
  if (!yuzuskkey) {
    return res.send('');
  }
  let item = await yuzuskService.selectItem({ yuzuskkey });
  if (undefined === item) {
    /* 無いので作る */
    await yuzuskService.update({ yuzuskkey, memo: 'ご自由にお使いください。' });
    item = await yuzuskService.selectItem({ yuzuskkey });
  }
  res.send(JSON.stringify(item));
});
setRoutePost('/', async ({ req, res }) => {
  const { id: yuzuskkey, memo, oldMemo } = req.body;

  // 裏で更新が掛かっていたらエラーを返却する
  const item = await yuzuskService.selectItem({ yuzuskkey });
  if (oldMemo !== item.memo) {
    res.status(409);
    return res.send(JSON.stringify({ errMsg: '裏で更新されているため、更新に失敗しました。' }));
  }

  const { jst } = await yuzuskService.update({ yuzuskkey, memo });
  return res.send(JSON.stringify({ jst }));
});

// 起動
if (!utilService.isAws()) {
  p('ローカルで起動しました。');
  app.listen(3000);
}

export const handler = serverlessExpress({ app });
