const AWS = require('aws-sdk');
const { Consumer } = require('sqs-consumer');
const TwilioService = require('../services/TwilioService')
const NodeMailerService = require('../services/NodeMailerService')
const Notification = require('../models/notification')

const { SQSClient, DeleteMessageCommand  } = require('@aws-sdk/client-sqs')
const { credentials, queueUrl } = require('../constants/AWSConfig')

// Configure the SDK to use LocalStack endpoint
const sqsClient = new SQSClient({
  region: 'us-east-1',
  endpoint: 'http://localhost:4566',
  credentials: credentials
});

// Create an instance of the consumer
const consumer = Consumer.create({
  queueUrl: queueUrl,
  handleMessage: async (SQSMessage) => {
    let notificationId = null;

    try {
      console.log('Received message:', SQSMessage.Body);

      const { id, message, channels, recipient } = JSON.parse(SQSMessage.Body);
      notificationId = id
      
      if(channels.includes('SMS')) {
          await TwilioService.sendSMS(message, recipient.phoneNumber)
      }

      if(channels.includes('Email')) {
          await NodeMailerService.sendEmail(message, recipient.emailId)
      }
  
      await Notification.update({ status: "COMPLETED" }, {
        where: {
          id: notificationId
        },
      });

      console.log('Processing complete');

      await sqsClient.send(new DeleteMessageCommand({
        QueueUrl: queueUrl,
        ReceiptHandle: SQSMessage.ReceiptHandle
      }));
    
      console.log('Message deleted from the queue.');
    } catch (err) {
      await Notification.update({ status: "FAILED" }, {
        where: {
          id: notificationId
        },
      });

      console.error('Error processing the message from the queue:', err);
    }
  },
  sqs: sqsClient
});

const startListeningToSQS = async () => {
    // Start consuming messages from the queue
    await consumer.start();
}

module.exports = {
    startListeningToSQS
}


