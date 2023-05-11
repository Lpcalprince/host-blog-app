const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is Required'],
    },
    discription: {
        type: String,
        required: [true, 'Discription is Required'],
    },
    image: {
        type: String,
        required: [true, 'Image is Required'],
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        require: [true, "User ID is Require"]
    },
},
    {
        timestamps: true
    });

//Export the model
module.exports = mongoose.model('Blog', blogSchema);