import { DynamoDB } from 'aws-sdk';

const options = {
  region: 'localhost',
  endpoint: 'http://localhost:8080',
};

const isOffLine = () => {
  return process.env.IS_OFFLINE;
};

export const document = isOffLine()
  ? new DynamoDB.DocumentClient(options)
  : new DynamoDB.DocumentClient();