const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'A discussion must have a text'],
        trim: true
    },
    vote: {
        type: Number,
        default: 0 
    },
    createdDate: {
        type: Date
    },
    user: {
        type: String
    }
    
});

const Discussion = mongoose.model('Discussion', discussionSchema);

module.exports = Discussion;