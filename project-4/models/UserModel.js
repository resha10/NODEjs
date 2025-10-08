const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    book_name: {
        type: String,
        required: true,
    },
    book_author: {
        type: String,
        required: true,
    },
    book_price: {
        type: String,
        required: true,
    },
    book_pages: {
        type: Array,
        required: true,
    },
})

const User = mongoose.model('User', UserSchema);
module.exports = User;