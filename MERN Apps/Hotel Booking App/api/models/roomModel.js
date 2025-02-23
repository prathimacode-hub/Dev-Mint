/* eslint-disable comma-dangle */
// external import
const mongoose = require('mongoose');

// Maybe update later
const roomSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        maxPeople: {
            type: Number,
        },
        desc: {
            type: Array,
            required: true,
        },
        roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
        facilities: {
            type: Array,
            required: true,
        },
    },
    { timestamps: true }
);

// roombumber example
// [
//     {number: 101, unavailableDates: [13.9.2022, 14.9.2022]},
//     {number: 102, unavailableDates: [20.9.2022, 22.9.2022]},
// ]

const RoomModel = mongoose.model('room', roomSchema);

module.exports = RoomModel;
