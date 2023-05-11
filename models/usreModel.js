const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is Required'],
    },
    email: {
        type: String,
        required: [true, 'Email is Required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is Required'],
    },
    blogs: [{
        type: mongoose.Types.ObjectId,
        ref: 'Blog',
    },
    ],
}, { timestamps: true });

//Export the model
module.exports = mongoose.model('User', userSchema);