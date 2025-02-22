/* eslint-disable comma-dangle */
// external import
const mongoose = require('mongoose');

// Maybe update later
const hotelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
        },
        city: {
            type: String,
        },
        address: {
            type: String,
        },
        distance: {
            type: String,
        },
        title: {
            type: String,
            required: true,
        },
        images: {
            type: Array,
        },
        desc: {
            type: String,
        },
        rating: {
            type: Number,
            min: 5,
            max: 10,
        },
        rooms: {
            type: [String],
        },
        bathroom: {
            type: Number,
        },
        price: {
            type: Number,
            required: true,
        },
        featured: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const HotelModel = mongoose.model('Hotel', hotelSchema);

module.exports = HotelModel;
