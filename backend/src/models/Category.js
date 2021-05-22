const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
});

module.exports = model('Category', categorySchema);