// Create service client module using ES6 syntax.
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
const options = { endpoint: 'http://localhost:8000', region: 'dummy' };
const dynamoDB = new DynamoDB(options);
const ddbDocClient = DynamoDBDocumentClient.from(dynamoDB);

const p = console.log;

export const params = {
  TableName: 'yuzusk',
  Item: {
    key: 'key1',
    jst: 'jst1',
    NEW_ATTRIBUTE_1: 'NEW_ATTRIBUTE_1_VALUE',
  },
  ConditionExpression: 'attribute_not_exists(jst1)', // 条件式について調査中
};

const run = async () => {
  await ddbDocClient.send(new PutCommand(params));
};
run();
