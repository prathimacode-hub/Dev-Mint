/* eslint-disable jsx-a11y/no-static-element-interactions */
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import TableChartIcon from '@mui/icons-material/TableChart';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ColorContext } from '../../ColorContext/darkContext';
import './Sidebar.scss';

function Sidebar() {
    // color state management using react context
    const { darkMode, dispatch } = useContext(ColorContext);

    return (
        <div className="sidebar">
            <div className="logo">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <h3 className="text_none">RoomsDashboard</h3>
                </Link>
            </div>

            <div className="links">
                <ul>
                    <p className="spann">Main</p>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <li>
                            <DashboardIcon className="icon" /> Dashboard
                        </li>
                    </Link>

                    <Link to="/users" style={{ textDecoration: 'none' }}>
                        <li>
                            <PersonIcon className="icon" /> Users
                        </li>
                    </Link>

                    <Link to="/hotels" style={{ textDecoration: 'none' }}>
                        <li>
                            <TableChartIcon className="icon" /> Hotels
                        </li>
                    </Link>
                    <Link to="/rooms" style={{ textDecoration: 'none' }}>
                        <li>
                            <TableChartIcon className="icon" /> Rooms
                        </li>
                    </Link>
                    <Link to="/blogs" style={{ textDecoration: 'none' }}>
                        <li>
                            <CreditCardIcon className="icon" /> Blogs
                        </li>
                    </Link>
                    <Link to="/orders" style={{ textDecoration: 'none' }}>
                        <li>
                            <CreditCardIcon className="icon" /> Orders
                        </li>
                    </Link>

                    <p className="spann">Seetings</p>
                    <li>
                        <AccountCircleIcon className="icon" /> Profile
                    </li>

                    <li>
                        <LogoutIcon className="icon" /> Log Out
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
