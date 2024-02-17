
# Notification Service (Multi-Channel)

## Introduction

**Problem Statement:**
We aim to develop a versatile notification delivery system capable of reaching users through various channels such as push notifications, SMS, and email.

## Features

- Users can submit requests to send notifications via SMS, email, etc.
- Users can check the status of their notification requests.

## Technologies Used:

- Node.js, Express.js, JavaScript
- AWS SQS, MySQL, Localstack, Docker
- ORM: Sequelize
- **External Services**
  - Twilio: For sending SMS
  - Nodemailer: For sending Email

## Installation / Setup
- Ensure Node.js version `v20.11` is installed.
- Run `npm i` to install all required Node.js modules.
- Launch the localstack image using Docker.
- Start MySQL Server locally and update the password and username in `src\models\index.js`.
- Add credentials for Twilio and Nodemailer.
- Use the following command to start the server:
	```
	npm start
	```

## Working
[View Whimsical Diagram](https://whimsical.com/notification-system-RGJTzxXDGWGocbv1644nJS)
![image](https://github.com/SUDARSHANSHARMA1998/Notification-system/assets/31753412/8797a4f6-1096-4930-9a88-46b7098e8f52)


-  Users submit a request to the **notification service** via the **POST /notification** endpoint, providing details such as message content, recipient information, and desired notification channels:
```
{ 
  "message": "We have an exclusive discount for you!!",
 "channels": ["SMS", "Email"], 
 "recipient": { 
	 "name": "Sudarshan", 
	 "emailId": "sudarshansharmano.1@gmail.com", 
	 "phoneNumber": "+9190XXXXXX" 
	}
}
```
-The **Notification Service** records the notification in the database with a status of **"IN-PROGRESS"** and sends the message to **AWS SQS** for asynchronous processing:
```
{ 
  "id": "notificationID
  "message": "We have an exclusive discount for you!!",
  "channels": ["SMS", "Email"], 
  "recipient": { 
	 "name": "Sudarshan", 
	 "emailId": "sudarshansharmano.1@gmail.com", 
	 "phoneNumber": "+9190XXXXXX" 
	}
}
```
- The user receives a `202 Accepted` response containing the **notificationID**.
- Users can later check the status of their notification using the **GET /notification/:id** endpoint.

  ## Worker Node
	-   Worker nodes subscribe to **AWS SQS** to process notifications.
	-   Upon receiving a message, workers determine the appropriate channels and send the notification via Twilio, Nodemailer, etc.
	-   If successful, the notification status is updated to **"COMPLETED"**; otherwise, it is marked as **"FAILED"**.
	-   Finally, the worker deletes the message from SQS upon successful processing.

## Improvements
-   Implement authentication and authorization mechanisms.
-   Validate request bodies with middleware.
-   Use DB transactions for consistency.
-   Scale by adding multiple worker nodes.
-   Enhance reliability with unit tests.
