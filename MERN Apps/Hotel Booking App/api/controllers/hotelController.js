/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
// internal import
const HotelModel = require('../models/hotelModel');
const RoomModel = require('../models/roomModel');

//   The function creates a new hotel using the data from the request body and saves it to the database,
//   returning the saved hotel as a response.
const createHotel = async (req, res) => {
    try {
        const newHotel = HotelModel(req.body);
        const savedHotel = await newHotel.save();

        res.status(200).json({
            message: savedHotel,
        });
    } catch (error) {
        res.status(500).json({
            error: `Hotel not created! ${error}`,
        });
    }
};

//  * The function `updateHotel` updates a hotel record in the database based on the provided ID and
//  * request body.
const updateHotel = async (req, res) => {
    try {
        const updHotel = await HotelModel.findByIdAndUpdate(
            req.params.id,

            {
                $set: req.body,
            },
            { new: true },
        );

        res.status(200).json({
            message: updHotel,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Hotel not updated!',
        });
    }
};

//  * The deleteHotel function deletes a hotel from the database and returns a success message if the
//  * deletion is successful, or an error message if it fails.
const deleteHotel = async (req, res) => {
    try {
        await HotelModel.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: 'Hotel deleted successfully.',
        });
        } catch (error) {
                res.status(500).json({
                    error: 'Hotel not deleted!',
                });
        }
};

//  * The function `getOneHotel` retrieves a hotel from the database based on the provided ID and returns
//  * it as a JSON response.
const getOneHotel = async (req, res) => {
    try {
        const hotel = await HotelModel.findById(req.params.id);

        res.status(200).json({
            message: hotel,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Hotel not found!!',
        });
        }
};

//  * The function `getAllHotel` retrieves hotels based on specified criteria and returns them as a JSON
//  * response.
const getAllHotel = async (req, res) => {
    const { min, max, ...others } = req.query;

    try {
           const hotels = await HotelModel.find({ ...others, price: { $gt: min || 5, $lt: max || 1000 } }).limit(req.query.limit);

        res.status(200).json({
            message: hotels,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Hotels not found!!',
        });
        }
};

/**
 * The function `getHotelByCity` takes a list of cities as input and returns the count of hotels in
 * each city.
 */
const getHotelByCity = async (req, res) => {
    const cities = req.query.cities.split(',');

        try {
            const list = await Promise.all(cities.map((city) => HotelModel.countDocuments({ city })));

            res.status(200).json({
                message: list,
            });
        } catch (error) {
            res.status(500).json({
                error: 'Can not found hotel by cityname!',
            });
        }
};

/**
 * The function `getHotelByType` retrieves the count of hotels based on their type (apartment, hotel,
 * resort, villa, cabin) and returns the counts in a JSON response.
 */
const getHotelByType = async (req, res) => {
        try {
            const apartmentCount = await HotelModel.countDocuments({ type: 'apartment' });
            const hotelCount = await HotelModel.countDocuments({ type: 'hotel' });
            const resortCount = await HotelModel.countDocuments({ type: 'resort' });
            const villaCount = await HotelModel.countDocuments({ type: 'villa' });
            const cabinCount = await HotelModel.countDocuments({ type: 'cabin' });

            res.status(200).json({
                message: [
                    { type: 'apartments', count: apartmentCount },
                    { type: 'hotels', count: hotelCount },
                    { type: 'resorts', count: resortCount },
                    { type: 'villas', count: villaCount },
                    { type: 'cabins', count: cabinCount },
                ],
            });
        } catch (error) {
            res.status(500).json({
                error: 'Can not found hotel by hotel type!',
            });
        }
};

/**
 * The function `getHotelRooms` retrieves a list of rooms for a specific hotel using the hotel's ID.
 */
const getHotelRooms = async (req, res) => {
    try {
        const hotel = await HotelModel.findById(req.params.id);
        const lists = await Promise.all(hotel.rooms.map((room) => RoomModel.findById(room)));

        res.status(200).json({
            message: lists,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Can not found rooms on this hotel!',
        });
    }
};

module.exports = {
    createHotel,
    updateHotel,
    deleteHotel,
    getOneHotel,
    getAllHotel,
    getHotelByCity,
    getHotelByType,
    getHotelRooms,
};
