/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/Input/Input';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import noImage from '../../Images/photo-camera.png';
import './New.scss';

function AddNew({ inputs, title, type }) {
    let dynamicInpVal;

    // dynamically change the state values
    /* The `switch` statement is used to conditionally assign different values to the `dynamicInpVal`
  variable based on the value of the `type` parameter. */
    switch (type) {
        case 'USER':
            dynamicInpVal = {
                username: '',
                fullname: '',
                email: '',
                password: '',
                country: '',
            };
            break;
        case 'BLOG':
            dynamicInpVal = {
                title: '',
                desc: '',
                tags: '',
            };
            break;
        default:
            break;
    }

    const [userInp, setUserInp] = useState(dynamicInpVal);
    const [roomData, setroomData] = useState([]);
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [emailErr, setEmailErr] = useState(null);
    const nevigate = useNavigate();
    // Dynamicaly change the data for different pages

    /**
     * The handleChange function updates the userInp state object with the new value entered by the
     * user.
     */
    const handleChange = (e) => {
        setUserInp({ ...userInp, [e.target.name]: e.target.value });
    };

    /**
     * The above function is a handleSubmit function in JavaScript React that handles form submission,
     * including uploading a photo to Cloudinary and making a POST request to a backend API.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            if (photo) {
                const data = new FormData();
                data.append('file', photo);
                data.append('upload_preset', 'upload');

                const uploadRes = await axios.post(
                    'https://api.cloudinary.com/v1_1/drbvugloj/image/upload',
                    data
                );
                const { url } = uploadRes.data;

                userInp.image = url;
            }

            await axios.post(
                `https://rooms-backend.onrender.com/api/${
                    type === 'USER' ? 'user/signup' : 'blog/create'
                }`,
                userInp
            );

            setLoading(false);
            nevigate(`/${type === 'USER' ? 'users' : 'blogs'}`);
        } catch (err) {
            console.log(err.response.data.error);
            setError(true);
            setEmailErr(err.response.data.error);
            setLoading(false);
        }
    };
    return (
        <div className="add_new">
            <Sidebar />

            <div className="new_page">
                <Navbar />

                <div className="new_page_main">
                    <div className="new_page_content">
                        <div className="image">
                            <p className="add_new_user">{title}</p>
                            <img src={photo ? URL.createObjectURL(photo) : noImage} alt="add img" />
                        </div>

                        <div className="form_top">
                            <form onSubmit={handleSubmit} className="form">
                                <div className="form_inp">
                                    <label htmlFor="file">
                                        Upload: <DriveFolderUploadIcon className="file_icon" />
                                    </label>

                                    <input
                                        type="file"
                                        name="file"
                                        id="file"
                                        style={{ display: 'none' }}
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                    />
                                </div>

                                {inputs.map((detail) => (
                                    <Input
                                        key={detail.id}
                                        {...detail}
                                        value={userInp[detail.name]}
                                        onChange={handleChange}
                                    />
                                ))}

                                <button
                                    type="submit"
                                    className="submit_btn"
                                    style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
                                >
                                    {loading ? 'Loading..' : 'Submit'}
                                </button>
                            </form>
                            {emailErr && (
                                <p
                                    style={{
                                        display: 'block',
                                        color: 'red',
                                        marginTop: '10px',
                                        marginLeft: '10px',
                                    }}
                                >
                                    {emailErr}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddNew;
