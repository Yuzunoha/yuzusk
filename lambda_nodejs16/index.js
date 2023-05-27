const AWS = require('aws-sdk');
const isContains = (s, t) => (s && s.length && -1 !== s.indexOf(t) ? true : false);
const getDynamo = ({ AWS }) => {
  const isLocal = isContains(process.env.NODE_ENV, 'local');
  const options = isLocal ? { endpoint: 'http://localhost:8000', region: 'dummy' } : undefined;
  return new AWS.DynamoDB.DocumentClient(options);
};
const dynamo = getDynamo({ AWS });
const TableName = isContains(process.env.NODE_ENV, 'local_ct') ? 'local' : 'yuzusk';

exports.handler = async (event) => {
  console.log({ AWS });
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};
