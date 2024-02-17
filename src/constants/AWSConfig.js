const AWS = require('aws-sdk');

const credentials = new AWS.Credentials({
    accessKeyId: 'test',
    secretAccessKey: 'test'
  });

const queueUrl = 'http://sqs.us-east-1.localhost.localstack.cloud:4566/000000000000/my-queue'

module.exports = {
    credentials,
    queueUrl
}