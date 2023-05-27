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
    key: 'key1', // For example, 'Season': 2
    jst: 'jst1', // For example,  'Episode': 2 (only required if table has sort key)
    NEW_ATTRIBUTE_1: 'NEW_ATTRIBUTE_1_VALUE', //For example 'Title': 'The Beginning'
  },
};

const run = async () => {
  try {
    const data = await ddbDocClient.send(new PutCommand(params));
    p('Success - item added or updated', data);
  } catch (err) {
    p('Error', err);
  }
};
run();
