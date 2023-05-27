// Create service client module using ES6 syntax.
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
const options = { endpoint: 'http://localhost:8000', region: 'dummy' };
const dynamoDB = new DynamoDB(options);
const documentClient = DynamoDBDocumentClient.from(dynamoDB);

const p = console.log;
p({ documentClient });
