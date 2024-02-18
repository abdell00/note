const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clients'
    }
}, {
    timestamps: true
})


const Note = mongoose.model('Notes', NoteSchema)

module.exports = Note