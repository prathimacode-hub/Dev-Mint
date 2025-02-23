/* eslint-disable no-nested-ternary */
import React from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../../Components/DataTable/DataTable';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import TableList from '../../Components/TableList/TableList';
import './userlists.scss';

function Lists({ type }) {
    //
    return (
        <div className="list_page">
            <Sidebar />

            <div className="list_page_main">
                <Navbar />

                {/* mui data table */}
                <div className="data_table">
                    {type === 'user' && (
                        <div className="btnn">
                            <Link
                                to={`/${
                                    type === 'user'
                                        ? 'users'
                                        : type === 'product'
                                        ? 'orders'
                                        : 'products'
                                }/addnew`}
                                style={{ textDecoration: 'none' }}
                            >
                                <button type="button">Add New {type}</button>
                            </Link>
                        </div>
                    )}

                    {type === 'user' ? (
                        <DataTable />
                    ) : type === 'product' ? (
                        <TableList />
                    ) : (
                        <DataTable />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Lists;
