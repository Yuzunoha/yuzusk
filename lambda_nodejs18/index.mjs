// Create service client module using ES6 syntax.
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
const ddbClient = new DynamoDBClient({});
export { ddbClient };

const p = console.log;
p(123);
