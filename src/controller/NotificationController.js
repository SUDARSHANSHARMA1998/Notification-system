const AWSService = require('../services/AWSService')
const Notification = require('../models/notification')

const triggerNotification = async function(req, res) {
    const notification = await Notification.create({
        status: "IN-PROGRESS",
        data: req.body
    })

    const messageBody = {
        id: notification.id,
        ...req.body
    }

    await AWSService.sendMessageToQueue(JSON.stringify(messageBody))

    res.status(202).send({
        id: notification.id,
        message: "Notification request accepted for processing."
    })
}

const getNotification =  async function(req, res) {
    const id = req.params.id
    
    const notification = await Notification.findOne({
        where: {
            id: id
        }
    })

    res.send(notification)
}

module.exports = {
    triggerNotification,
    getNotification
}