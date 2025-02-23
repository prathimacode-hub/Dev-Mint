// external import
const express = require('express');

// internal importe
const {
    createRoom,
    updateRoom,
    deleteRoom,
    getOneRoom,
    getAllRoom,
    updateRoomAvailability,
} = require('../controllers/roomController');

const router = express.Router();

// create room
router.post('/room/:hotelid', createRoom);

// find room by id and update
router.put('/room/:id', updateRoom);

// room update
router.put('/room/availability/:id', updateRoomAvailability);

// find room by id and delete
router.delete('/rooms/:id', deleteRoom);

// find room by id
router.get('/room/:id', getOneRoom);

// find all rooms
router.get('/rooms', getAllRoom);

module.exports = router;
