import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import React, { useEffect, useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';

// import css filr
import './progressBar.scss';

import axios from 'axios';
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

function ProgressBar() {
    const [userData, setUserData] = useState([]);
    const [hotelData, setHotelData] = useState([]);
    const [blogData, setBlogData] = useState([]);
    const [roomData, setRoomData] = useState([]);

    /* The `useEffect` hook is used to perform side effects in functional components. In this case, it
   is used to fetch data from the specified API endpoints and update the state variables
   (`userData`, `hotelData`, `blogData`, `roomData`) with the received data. */
    useEffect(() => {
        const datass = async () => {
            const res = await axios.get('https://rooms-backend.onrender.com/api/rooms');
            const res2 = await axios.get('https://rooms-backend.onrender.com/api/blogs');
            const res3 = await axios.get('https://rooms-backend.onrender.com/api/users');
            const res4 = await axios.get('https://rooms-backend.onrender.com/api/rooms');
            setHotelData(res.data.message);
            setBlogData(res2.data.message);
            setUserData(res3.data.message);
            setRoomData(res4.data.message);
        };
        datass();
    }, []);
    const data01 = [
        { name: 'Users', value: userData.length },
        { name: 'Hotels', value: hotelData.length },
        { name: 'Rooms', value: roomData.length },
        { name: 'Blogs', value: blogData.length },
        { name: 'Balance', value: 20 },
    ];

    return (
        <div className="progress_bar">
            <div className="top">
                <p>Total Revenue</p>
                <MoreVertOutlinedIcon />
            </div>

            <div className="middle">
                <div className="progress">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={data01}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#4665fdce"
                                label
                            />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <p>Total sales made today.</p>
                <p className="price">
                    <AttachMoneyOutlinedIcon style={{ fontSize: '32px' }} />
                    324
                </p>
            </div>

            <div className="bottom">
                <p>Previous transection processing. Last payments may not be included.</p>

                <div className="botom_nested">
                    <div className="nested_nested">
                        <p>Last Week</p>
                        <p className="pricee decrese">
                            <KeyboardArrowUpOutlinedIcon /> $11.9k
                        </p>
                    </div>
                    <div className="nested_nested">
                        <p>Last Month</p>
                        <p className="pricee">
                            <KeyboardArrowUpOutlinedIcon /> $12.4k
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProgressBar;
