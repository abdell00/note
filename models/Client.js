const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
    }
}, {
    timestamps: true
})

const Client = mongoose.model('Clients', ClientSchema)

module.exports = Client