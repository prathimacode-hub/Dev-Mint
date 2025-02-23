/* eslint-disable no-constant-condition */
/* eslint-disable no-nested-ternary */
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import blog1 from '../../Images/blog1.jpg';
import blog2 from '../../Images/blog2.jpg';
import blog3 from '../../Images/blog3.jpg';
import blog4 from '../../Images/blog4.jpg';
import blog5 from '../../Images/book3.jpg';
import blog6 from '../../Images/book5.jpg';
import noUser from '../../Images/user.png';
import './blogs.scss';

const userData = [
    {
        id: '630343eb94c2812e4cd7e45d',
        title: 'Want to know how to manage multiple projects at once.',
        author: 'devidbom23',
        image: blog1,
        createdAt: new Date(Date.now()).toLocaleString(),
    },
    {
        id: '6303234eb94c2812e4cd7e45e',
        title: 'How to Choose a right product?',
        author: 'john03',
        image: blog2,
        createdAt: new Date(Date.now()).toLocaleString(),
    },
    {
        id: 'e40343eb94c2812e4cd7e4233',
        title: 'How do you create a compelling  title',
        author: 'dilvibhasanjohn',
        image: blog4,
        createdAt: new Date(Date.now()).toLocaleString(),
    },
    {
        id: '930343eb94c2812e4cd7e45g',
        title: 'How to cure wanderlust without leaving your home?',
        author: 'doejelia88',
        image: blog5,
        createdAt: new Date(Date.now()).toLocaleString(),
    },
    {
        id: '60443eb94c2812e4cd7e45ii',
        title: 'The Seven People You Should Always Meet.',
        author: 'lucashossel',
        image: blog6,
        createdAt: new Date(Date.now()).toLocaleString(),
    },
    {
        id: 'e23343eb94c2812e4cd7e45kk',
        title: 'Which search queries drive traffic to my website?',
        author: 'anniejhon',
        image: blog3,
        createdAt: new Date(Date.now()).toLocaleString(),
    },
];

function Blogs({ type }) {
    const [data, setData] = useState([]);
    const location = useLocation();
    const path = location.pathname.split('/')[1];

    /* The `useEffect` hook is used to perform side effects in a functional component. In this case, it
   is used to fetch data from an API endpoint and update the state variable `data` with the fetched
   data. */
    useEffect(() => {
        const getData = async () => {
            const datas = await axios.get('https://rooms-backend.onrender.com/api/blogs');
            setData(datas.data.message);
        };
        getData();
    }, [data]);

    /**
     * The function `handleDlt` is used to delete an item from the data array and send a delete request
     * to the specified API endpoint.
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

    /* The `columns` array is defining the columns for the DataGrid component. Each object in the array
   represents a column and has properties such as `field`, `headerName`, and `width` to define the
   column's data source, header name, and width respectively. */
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 310,
            renderCell: (param) => (
                <div className="userr">
                    <img
                        src={param.row.image ? param.row.image : noUser}
                        alt="User"
                        className="userr_image"
                    />
                    {param.row._id}
                </div>
            ),
        },
        {
            field: 'title',
            headerName: 'Title',
            width: 520,
            style: { color: 'red' },
        },
        { field: 'createdAt', headerName: 'CreatedAt', width: 250 },
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
        <div className="blog_page">
            <Sidebar />

            <div className="blog_page_main">
                <Navbar />

                <div className="blog_page_table">
                    <div className="btnn">
                        <Link
                            to={`/${
                                type === 'blog' ? 'blogs' : 'user' ? 'users' : 'products'
                            }/addnew`}
                            style={{ textDecoration: 'none' }}
                        >
                            <button type="button">Create New {type}</button>
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

export default Blogs;
