const AWS = require('aws-sdk');
const SQSConsumerService = require('../services/SQSConsumerService')
const {credentials} = require('../constants/AWSConfig')

// Configure the SDK to use LocalStack endpoint
AWS.config.update({ 
region: 'us-east-1', 
endpoint: 'http://localhost:4566', 
sslEnabled: false, 
credentials: credentials 
});


const setupAWS = async () => {
    try{
        const sqs = new AWS.SQS();
        const params = {
            QueueName: 'my-queue'
        };
        
        // Create the SQS queue
        const data = await sqs.createQueue(params).promise();
        console.log('Queue created:', data);
        
        //Start listening to SQS
        await SQSConsumerService.startListeningToSQS()

        console.log("AWS Setup Completed", data.QueueUrl)
    } catch(err) {
        console.log("Unable to setup the AWS infra locally", err)
    }
}

module.exports = {
    setupAWS
}
