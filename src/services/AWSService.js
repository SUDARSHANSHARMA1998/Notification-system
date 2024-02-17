const AWS = require('aws-sdk');
const {credentials} = require('../constants/AWSConfig')
  
// Configure the SDK to use LocalStack endpoint
AWS.config.update({ 
region: 'us-east-1', 
endpoint: 'http://localhost:4566', 
sslEnabled: false, 
credentials: credentials 
});


// Create SQS service object
const sqs = new AWS.SQS();

// Function to send a message to the queue
async function sendMessageToQueue(messageBody, queueUrl =  'http://localhost:4566/000000000000/my-queue') {
    const params = {
        QueueUrl: queueUrl,
        MessageBody: messageBody
    };

    try {
        const data = await sqs.sendMessage(params).promise();
        console.log('Message sent to the queue:', data.MessageId);
    } catch (err) {
        console.error('Error sending message to the queue:', err);
    }
}

module.exports = {
    sendMessageToQueue
}
