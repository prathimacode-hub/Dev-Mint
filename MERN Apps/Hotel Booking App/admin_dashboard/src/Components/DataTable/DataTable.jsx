/* eslint-disable jsx-a11y/img-redundant-alt */
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import noImage from '../../Images/user.png';
import './datatable.scss';

// Replace this data with your own

function DataTable() {
    const [data, setData] = useState([]);
    const location = useLocation();
    const path = location.pathname.split('/')[1];

    /* The `useEffect` hook is used to perform side effects in a functional component. In this case, it is used to fetch data from an API endpoint and update the component's state (`data`) with the fetched
data. */
    useEffect(() => {
        const dataCall = async () => {
            const res = await axios.get(`https://rooms-backend.onrender.com/api/${path}`);
            setData(res.data.message.slice(1));
        };
        dataCall();
    }, [path, data]);

    /**
     * The function `handleDlt` is used to delete an item from a data array and send a delete request
     * to a backend API.
     */
    const handleDlt = async (id) => {
        try {
            axios.delete(`https://rooms-backend.onrender.com/api/${path}/${id}`);
            setData(data.filter((item) => item.id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 310,
            renderCell: (param) => (
                <div className="userr">
                    <img
                        src={param.row.image ? param.row.image : noImage}
                        alt="User"
                        className="userr_image"
                    />
                    {param.row._id}
                </div>
            ),
        },
        {
            field: 'username',
            headerName: 'Username',
            width: 160,
        },
        { field: 'email', headerName: 'Email', width: 270 },
        { field: 'phone', headerName: 'Phone', width: 150 },
        { field: 'country', headerName: 'Country', width: 150 },
        {
            field: 'action',
            headerName: 'Action',
            width: 170,
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
        <div className="data_table">
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
    );
}

export default DataTable;
