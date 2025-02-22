/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/Input/Input';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import noImage from '../../Images/photo-camera.png';
import './addHotel.scss';

function AddHotel({ inputs, title, type }) {
    const [inpVal, setInpVal] = useState({
        name: '',
        type: '',
        city: '',
        title: '',
        desc: '',
        image: '',
        price: '',
        rooms: '',
        rating: '',
    });

    const [roomData, setroomData] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [featured, setFeatured] = useState(false);
    const [photo, setPhoto] = useState('');
    const [loading, setLoading] = useState(false);
    const nevigate = useNavigate();

    /* The `useEffect` hook is used to perform side effects in a functional component. In this case, it
   is used to fetch data from the API endpoint `'https://rooms-backend.onrender.com/api/rooms'` and
   update the state variable `roomData` with the response data. */
    useEffect(() => {
        const roomsss = async () => {
            const room = await axios.get('https://rooms-backend.onrender.com/api/rooms');
            setroomData(room.data.message);
        };
        roomsss();
    }, []);

    const handleChange = (e) => {
        setInpVal({ ...inpVal, [e.target.name]: e.target.value });
    };

    const handleFeatured = (e) => {
        setFeatured(e.target.value);
    };

    const handleSelectRoom = (e) => {
        const value = Array.from(e.target.selectedOptions, (option) => option.value);
        setRooms(value);
    };

    /**
     * The handleSubmit function is used to handle form submission, upload images to Cloudinary, and
     * create a new hotel entry in the database.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const imgList = await Promise.all(
                Object.values(photo).map(async (files) => {
                    const data = new FormData();
                    data.append('file', files);
                    data.append('upload_preset', 'upload');

                    const uploadRes = await axios.post(
                        'https://api.cloudinary.com/v1_1/drbvugloj/image/upload',
                        data
                    );

                    const { url } = uploadRes.data;
                    return url;
                })
            );

            const newHotel = {
                ...inpVal,
                rooms,
                featured,
                images: imgList,
            };

            await axios.post('https://rooms-backend.onrender.com/api/hotel/create', newHotel);
            setLoading(false);
            nevigate(`/hotels`);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <div className="add_new_hotel">
            <Sidebar />

            <div className="new_page">
                <Navbar />

                <div className="new_page_main">
                    <div className="new_page_content">
                        <div className="image">
                            <p className="add_new_user">{title}</p>
                            <img
                                src={photo ? URL.createObjectURL(photo[0]) : noImage}
                                alt="add img"
                            />
                        </div>

                        <form onSubmit={handleSubmit} className="form">
                            <div className="form_main">
                                <div className="form_inp">
                                    <label htmlFor="file">
                                        Upload: <DriveFolderUploadIcon className="file_icon" />
                                    </label>

                                    <input
                                        type="file"
                                        name="file"
                                        multiple
                                        id="file"
                                        style={{ display: 'none' }}
                                        onChange={(e) => setPhoto(e.target.files)}
                                    />
                                </div>

                                {inputs.map((detail) => (
                                    <Input
                                        key={detail.id}
                                        {...detail}
                                        value={inpVal[detail.name]}
                                        onChange={handleChange}
                                    />
                                ))}

                                <div className="select_inp">
                                    <label htmlFor="">Featured</label>
                                    <select id="featured" onChange={handleFeatured}>
                                        <option value={false}>No</option>
                                        <option value>Yes</option>
                                    </select>
                                </div>

                                <div className="select_inp_title">
                                    <label>Select Rooms</label>
                                    <select id="rooms" multiple onChange={handleSelectRoom}>
                                        {roomData &&
                                            roomData.map((item) => (
                                                <option key={item._id} value={item._id}>
                                                    {item.title}
                                                </option>
                                            ))}
                                    </select>
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

export default AddHotel;
