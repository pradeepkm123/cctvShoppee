const mongoose = require('mongoose');

const popupSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    link: {
        type: String,
        default: '/'
    },
    status: {
        type: Boolean,
        default: true
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    storeId: {
        type: String,
        default: 'default'
    }
}, { timestamps: true });

module.exports = mongoose.model('Popup', popupSchema);
