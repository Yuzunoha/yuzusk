import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { YuzuskService } from './services/YuzuskService.mjs';
import { UtilService } from './services/UtilService.mjs';

const utilService = new UtilService();
const options = utilService.isAws() ? undefined : { endpoint: 'http://localhost:8000', region: 'dummy' };
const dynamoDB = new DynamoDB(options);
const ddbDocClient = DynamoDBDocumentClient.from(dynamoDB);
const yuzuskService = new YuzuskService({ ddbDocClient, UpdateCommand, QueryCommand, utilService });

const p = console.log;

export const handler = async (event) => {
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

// ここがローカルなら実行する
if (!utilService.isAws()) {
  handler();
}
