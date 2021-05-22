const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    bio: String,
    image: {
        type: String,
        required: true
    },
    phone:{
        type:String, 
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
    }],
}, {
    timestamps: true,
});

module.exports = model('User', userSchema);