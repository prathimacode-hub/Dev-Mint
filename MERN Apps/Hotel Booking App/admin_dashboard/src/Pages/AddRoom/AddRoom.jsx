/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/Input/Input';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './addroom.scss';

function AddRoom({ inputs, title, type }) {
    const [inpVal, setInpVal] = useState({
        title: '',
        desc: '',
        price: '',
        maxPeople: '',
    });

    const [loading, setLoading] = useState(false);
    const [roomData, setRoomData] = useState([]);
    const [roomNums, setRoomNums] = useState([]);
    const [hotelId, setHotelId] = useState(null);
    const nevigate = useNavigate();

    /* The `useEffect` hook is used to perform side effects in a functional component. In this case, it
   is used to fetch data from the API endpoint `'https://rooms-backend.onrender.com/api/hotels'` and
   update the state variables `roomData` with the response data. */
    useEffect(() => {
        const roomsss = async () => {
            const hotel = await axios.get('https://rooms-backend.onrender.com/api/hotels');
            setRoomData(hotel.data.message);
        };
        roomsss();
    }, []);

    const handleChange = (e) => {
        setInpVal({ ...inpVal, [e.target.name]: e.target.value });
    };

    /**
     * The handleSubmit function is an asynchronous function that handles form submission by sending a
     * POST request to a backend API with the input values and room numbers, and then redirects to the
     * /rooms page.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const rooms = roomNums.split(',').map((room) => ({ number: room }));
        const datas = {
            ...inpVal,
            roomNumbers: rooms,
        };

        try {
            setLoading(true);

            await axios.post(`https://rooms-backend.onrender.com/api/room/${hotelId}`, datas);

            setLoading(false);
            nevigate(`/rooms`);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <div className="add_new_room">
            <Sidebar />

            <div className="new_page">
                <Navbar />

                <div className="new_page_main">
                    <div className="new_page_content">
                        <form onSubmit={handleSubmit} className="form">
                            <div className="form_main">
                                {inputs.map((detail) => (
                                    <Input
                                        key={detail.id}
                                        {...detail}
                                        value={inpVal[detail.name]}
                                        onChange={handleChange}
                                    />
                                ))}

                                <div className="select_inp_title">
                                    <label>Select Rooms</label>
                                    <select
                                        id="hotelId"
                                        onChange={(e) => setHotelId(e.target.value)}
                                    >
                                        {roomData &&
                                            roomData.map((item) => (
                                                <option key={item._id} value={item._id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                <div className="select_inp_textarea">
                                    <label> Room Numbers</label>
                                    <input
                                        placeholder="222, 333, 444"
                                        onChange={(e) => setRoomNums(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="submit_btn"
                                style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
                            >
                                {loading ? 'Loading..' : 'Submit'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddRoom;
