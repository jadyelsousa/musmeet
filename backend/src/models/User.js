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
    picture: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
});

module.exports = model('User', userSchema);