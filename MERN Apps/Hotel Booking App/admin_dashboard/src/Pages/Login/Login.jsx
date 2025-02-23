/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-props-no-spreading */
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Contexts } from '../../ContextUser/Contexts';
import './Login.scss';

const index = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginLoading, setLoginLoading] = useState('');
    const [err, setErr] = useState(false);
    const nevigate = useNavigate();
    const { loading, dispatch } = useContext(Contexts);

    /**
     * The handleSubmit function is used to handle form submission for user login, making an API call to
     * the backend and updating the state accordingly.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const inpVal = {
            email,
            password,
        };
        dispatch({ type: 'LOGIN_START' });
        setLoginLoading(true);

        try {
            const res = await axios.post(
                'https://rooms-backend.onrender.com/api/user/login',
                inpVal
            );

            if (res.data.message.isadmin) {
                dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.message.details });
                nevigate('/');
                setLoginLoading(false);
            } else {
                dispatch({ type: 'LOGIN_FAILURE' });
                setErr(true);
                setLoginLoading(false);
            }
        } catch (error) {
            dispatch({ type: 'LOGIN_FAILURE' });
            setErr(true);
            setLoginLoading(false);
        }
    };

    return (
        <div className="login_page">
            <div className="login_page_main">
                <div className="signup_page_form">
                    <h3>Admin LogIn</h3>
                    <form action="" onSubmit={handleSubmit} className="form">
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <input
                            type="submit"
                            value={loginLoading ? 'Loading..' : 'Log In'}
                            className="submit_btn"
                            disabled={loading}
                        />
                        {err && (
                            <p style={{ color: 'red', marginBottom: '0px' }}>
                                Authentication failed!
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default index;
