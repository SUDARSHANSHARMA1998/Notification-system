const express = require('express')
const routes = require('./routes/routes.js')
const app = express()
const db = require('./models/index.js')
const AWSScript = require('./scripts/AWSSetup.js')

app.use(express.json())
app.use('/', routes)

app.listen(3000, (req, res) => {
    console.log('The server has started')
    
    // Script to setup the AWS infra locally // Ex. SQS
    AWSScript.setupAWS()
});