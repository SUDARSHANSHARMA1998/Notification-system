const { Router } = require('express')
const { validNotification } = require('../policies/validNotification')
const NotificationController = require('../controller/NotificationController')
const router = Router()

router.get('/notification/:id', NotificationController.getNotification)
router.post('/notification', validNotification, NotificationController.triggerNotification)

module.exports = router