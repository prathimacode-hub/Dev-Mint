/* eslint-disable react/jsx-no-useless-fragment */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Chart from '../../Components/Chart/Chart';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import TableList from '../../Components/TableList/TableList';
import noImage from '../../Images/user.png';
import './Detail.scss';

function Detail() {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const path = location.pathname.split('/')[2];

    /* The `useEffect` hook in React is used to perform side effects in functional components. In this
   case, the `useEffect` hook is used to fetch user data from an API endpoint when the `path`
   variable changes. */
    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const data = await axios.get(`https://rooms-backend.onrender.com/api/user/${path}`);
            setUserData(data.data.message);
        };
        fetchData();
        setLoading(false);
    }, [path]);

    return (
        <>
            {loading ? (
                <p style={{ textAlign: 'center' }}>Loading</p>
            ) : (
                <div className="details">
                    <Sidebar />

                    <div className="detail_page_main">
                        <Navbar />

                        <div className="user_info">
                            <div className="user_detail">
                                <img src={noImage} alt="user" className="user_image" />

                                <div className="user_detailss">
                                    <p className="name">Name: {userData.username}</p>
                                    <p>Email: {userData.email}</p>
                                    <p>Address: {userData.country ? userData.country : 'USA'}</p>
                                    <p>Phone: {userData.phone ? userData.phone : '+00464564'}</p>
                                </div>
                            </div>

                            <div className="user_chart">
                                <Chart height={390} title="User spending" />
                            </div>
                        </div>

                        <div className="table">
                            <div className="title">Last Transactions</div>
                            <TableList />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Detail;
