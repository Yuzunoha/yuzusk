import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { YuzuskService } from './services/YuzuskService.mjs';
import { UtilService } from './services/UtilService.mjs';

const options = { endpoint: 'http://localhost:8000', region: 'dummy' };
const dynamoDB = new DynamoDB(options);
const ddbDocClient = DynamoDBDocumentClient.from(dynamoDB);
const utilService = new UtilService();
const yuzuskService = new YuzuskService({ ddbDocClient, UpdateCommand, utilService });

const p = console.log;

const main = async () => {
  const yuzuskkey = 'パーティションキー1';
  const memo = 'メモ1です。';
  await yuzuskService.update({ yuzuskkey, memo });
};

main();
