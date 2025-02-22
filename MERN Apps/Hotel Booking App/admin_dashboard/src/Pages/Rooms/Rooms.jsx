/* eslint-disable no-constant-condition */
/* eslint-disable no-nested-ternary */
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './rooms.scss';

function Rooms({ type }) {
    const [data, setData] = useState([]);
    const location = useLocation();
    const path = location.pathname.split('/')[1];

    /* The `useEffect` hook is used to perform side effects in a functional component. In this case, the
   effect is triggered when the `data` state variable changes. */
    useEffect(() => {
        const datass = async () => {
            const res = await axios.get('https://rooms-backend.onrender.com/api/rooms');
            setData(res.data.message);
        };
        datass();
    }, [data]);

    /**
     * The function `handleDlt` is used to delete a room with a specific ID from a server and update
     * the data accordingly.
     */
    const handleDlt = (id) => {
        try {
            axios.delete(`https://rooms-backend.onrender.com/api/${path}/${id}`);
            setData(data.filter((item) => item.id !== id));
            console.log(`deleted room ${id}`);
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 310,
            renderCell: (param) => <div className="userr">{param.row._id}</div>,
        },
        {
            field: 'title',
            headerName: 'Title',
            width: 470,
            style: { color: 'red' },
        },
        { field: 'maxPeople', headerName: 'Maxpeople', width: 140 },
        { field: 'price', headerName: 'Price', width: 140 },
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
        <div className="room_page">
            <Sidebar />

            <div className="room_page_main">
                <Navbar />

                <div className="room_page_table">
                    <div className="btnn">
                        <Link to="/rooms/addnew" style={{ textDecoration: 'none' }}>
                            <button type="button">Create New Room</button>
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

export default Rooms;
