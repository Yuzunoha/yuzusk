import express from 'express';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { YuzuskService } from './services/YuzuskService.mjs';
import { UtilService } from './services/UtilService.mjs';
import serverlessExpress from '@vendia/serverless-express';

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

// 汎用関数
const p = console.log;
const createHandler = (func) => (req, res) => func({ req, res });
const setRouteUse = (route, func) => app.use(route, createHandler(func));
const setRouteGet = (route, func) => app.get(route, createHandler(func));
const setRoutePost = (route, func) => app.post(route, createHandler(func));

// コントローラ
setRouteGet('/', ({ res }) => res.send('疎通確認成功！'));

const main = async (event) => {
  const yuzuskkey = 'パーティションキー1';
  const memo = 'メモ1です。';
  await yuzuskService.update({ yuzuskkey, memo });

  const item = await yuzuskService.selectItem({ yuzuskkey });
  p({ item });

  const body = 'レスポンスです。';
  const response = {
    statusCode: 200,
    body: JSON.stringify(body),
  };
  return response;
};

// 起動
if (!utilService.isAws()) {
  p('ローカルで起動しました。');
  app.listen(3000);
}

export const handler = serverlessExpress({ app });
