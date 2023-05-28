// Create service client module using ES6 syntax.
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';
const options = { endpoint: 'http://localhost:8000', region: 'dummy' };
const dynamoDB = new DynamoDB(options);
const ddbDocClient = DynamoDBDocumentClient.from(dynamoDB);

const params = {
  TableName: 'yuzusk',
  Key: {
    yuzuskkey: 'yuzuskkey1',
  },
  ExpressionAttributeNames: {
    '#attr1': 'jst',
    '#attr2': 'memo',
  },
  ExpressionAttributeValues: {
    ':value1': 'abcde',
    ':value2': 'いいい',
  },
  UpdateExpression: 'set #attr1 = :value1, #attr2 = :value2',
  ConditionExpression: '#attr1 <> :value1',
};

const run = async () => {
  await ddbDocClient.send(new UpdateCommand(params));
};
run();
