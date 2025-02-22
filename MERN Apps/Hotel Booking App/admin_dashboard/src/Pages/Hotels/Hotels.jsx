/* eslint-disable no-constant-condition */
/* eslint-disable no-nested-ternary */
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import noImage from '../../Images/no hotel.jpg';
import './hotels.scss';

// dummy data
// const hotelData = [
//     {
//         id: '630343eb94c2812e4cd7e45d',
//         title: 'Burj Khalifa 2',
//         price: '45',
//         image: blog1,
//         city: 'Dubai',
//         rooms: 2,
//         rating: '9.5',
//         createdAt: new Date(Date.now()).toLocaleString(),
//     },
//     {
//         id: '6303234eb94c2812e4cd7e45e',
//         title: 'Best hotel in the city.',
//         price: '45',
//         image: blog2,
//         city: 'Tokyo',
//         rooms: 1,
//         rating: '9',
//         createdAt: new Date(Date.now()).toLocaleString(),
//     },
//     {
//         id: 'e40343eb94c2812e4cd7e4233',
//         title: 'Twin Tawer',
//         price: '45',
//         image: blog4,
//         city: 'Dubai',
//         rooms: 3,
//         rating: '9.5',
//         createdAt: new Date(Date.now()).toLocaleString(),
//     },
//     {
//         id: '930343eb94c2812e4cd7e45g',
//         title: 'Burj Khalifa 2',
//         price: '45',
//         image: blog5,
//         city: 'Dubai',
//         rooms: 2,
//         rating: '8.5',
//         createdAt: new Date(Date.now()).toLocaleString(),
//     },
//     {
//         id: '60443eb94c2812e4cd7e45ii',
//         title: 'Burj Khalifa 2',
//         price: '45',
//         image: blog6,
//         city: 'Tokyo',
//         rooms: 1,
//         rating: '9.5',
//         createdAt: new Date(Date.now()).toLocaleString(),
//     },
//     {
//         id: 'e23343eb94c2812e4cd7e45kk',
//         title: 'Burj Khalifa 2',
//         price: '45',
//         image: blog3,
//         city: 'Dubai',
//         rooms: 1,
//         rating: '9',
//         createdAt: new Date(Date.now()).toLocaleString(),
//     },
// ];

function Hotels({ type }) {
    const [data, setData] = useState([]);
    const location = useLocation();
    const path = location.pathname.split('/')[1];

    /* The `useEffect` hook is used to perform side effects in a functional component. In this case, the
   effect is triggered when the `data` state variable changes. */
    useEffect(() => {
        const datass = async () => {
            const res = await axios.get('https://rooms-backend.onrender.com/api/hotels');
            setData(res.data.message);
        };
        datass();
    }, [data]);

    /**
     * The function `handleDlt` is used to delete an item from the data array and make an API call to
     * delete the item with the corresponding id.
     */
    const handleDlt = (id) => {
        try {
            axios.delete(`https://rooms-backend.onrender.com/api/${path}/${id}`);
            setData(data.filter((item) => item.id !== id));
            console.log(`deleted user ${id}`);
        } catch (error) {
            console.log(error);
        }
    };

    /* The `columns` variable is an array of objects that define the columns for the data grid component.
  Each object represents a column and contains properties such as `field`, `headerName`, `width`,
  and `renderCell`. */
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 310,
            renderCell: (param) => (
                <div className="userr">
                    <img
                        src={param.row.images?.[0] ? param.row.images?.[0] : noImage}
                        alt="Hotel"
                        className="userr_image"
                    />
                    {param.row._id}
                </div>
            ),
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 350,
            style: { color: 'red' },
        },
        { field: 'price', headerName: 'Price', width: 140 },
        {
            field: 'rooms',
            headerName: 'Rooms',
            width: 140,
            renderCell: (param) => <div className="roomCount">{param.row.rooms.length}</div>,
        },
        { field: 'city', headerName: 'City', width: 140 },
        {
            field: 'action',
            headerName: 'Action',
            width: 160,
            renderCell: (params) => (
                <div className="actionn">
                    <Link to={params.row._id}>
                        <button type="button" className="view_btn">
                            View
                        </button>
                    </Link>
                    <button
                        type="button"
                        className="delete_btn"
                        onClick={() => handleDlt(params.row._id)}
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="hotel_page">
            <Sidebar />

            <div className="hotel_page_main">
                <Navbar />

                <div className="hotel_page_table">
                    <div className="btnn">
                        <Link
                            to={`/${
                                type === 'room' ? 'hotels' : 'user' ? 'users' : 'products'
                            }/addnew`}
                            style={{ textDecoration: 'none' }}
                        >
                            <button type="button">Create New Hotel</button>
                        </Link>
                    </div>
                    <DataGrid
                        className="data_grid"
                        rows={data}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                        getRowId={(row) => row._id}
                    />
                </div>
            </div>
        </div>
    );
}

export default Hotels;
