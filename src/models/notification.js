const { DataTypes } = require('sequelize')
const db = require('./index')

const Notification = db.define('Notification', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.JSON,
        allowNull: false
    }
}, {
    db,
    freezeTableName: true
})

db.sync({alter: true}).then(() => {
    console.log('Notification table is created')
}).catch((err) => {
    console.log('Notification table not created', err)
})

module.exports = Notification

