const mongoose = require('mongoose');


const commentSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'A comment must have a text'],
        trim: true
    },
    vote: {
        type: Number,
        default: 0
    },
    createdDate: {
        type: String
    },
    user :
    {
        type: String
    }
});

const Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment;