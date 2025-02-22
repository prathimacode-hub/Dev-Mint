/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
// import { signIn, signOut, useSession } from "next-auth/react"
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { FaGoogle, FaTwitter } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Contexts } from '../../ContextUser/Contexts';
import Footer from '../../components/Footer/Footer';
import Input from '../../components/Input/Input';
import Navbar from '../../components/Navbar/Navbar';
import styles from '../../styles/login.module.scss';

const index = () => {
    const [inpval, setInpval] = useState({
        email: '',
        password: '',
    });
    const [err, setErr] = useState(false);
    const router = useRouter();
    const { loading, dispatch } = useContext(Contexts);
    // const { data: session } = useSession()

    //  The `inpDetail` constant is an array of objects that contains the details of the input fields
    // used in the login form. Each object represents an input field and contains the following
    // properties: 
    const inpDetail = [
        {
            id: 2,
            name: 'email',
            type: 'email',
            placeholder: 'Email',
            required: true,
            errMsg: 'Please provide a valid email address!',
        },
        {
            id: 3,
            name: 'password',
            type: 'password',
            placeholder: 'Password',
            required: true,
            errMsg: 'This field is required!',
        },
    ];


    //   The handleChng function updates the value of a specific property in the inpval object based on
    //   the user's input.
    const handleChng = (e) => {
        setInpval({ ...inpval, [e.target.name]: e.target.value });
    };

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        width: '250px',
        padding: '.75rem',
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
    });


    // The handleSubmit function is used to handle form submission for user login, making a POST
    // request to the specified API endpoint and dispatching actions based on the response.
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOGIN_START' });

        try {
            const res = await axios.post(
                'https://rooms-backend.onrender.com/api/user/login',
                inpval
            );
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.message.details });

            Toast.fire({
                icon: 'success',
                title: 'Log In Succesfully.',
            });
            router.push('/');
        } catch (error) {
            dispatch({ type: 'LOGIN_FAILURE' });
            setErr(true);
        }
    };

    return (
        <div className={styles.login_page}>
            <Navbar />
            <div className={styles.login_page_main}>
                <div className={styles.signup_page_form}>
                    <h3>LogIn Here</h3>
                    <form action="" onSubmit={handleSubmit}>
                        {inpDetail.map((inpdetail) => (
                            <Input
                                {...inpdetail}
                                key={inpdetail.id}
                                value={inpval[inpdetail.name]}
                                onChange={handleChng}
                            />
                        ))}

                        {err && (
                            <p style={{ color: 'red', marginBottom: '0px' }}>
                                Authentication failed!
                            </p>
                        )}
                        <input
                            type="submit"
                            value="Log In"
                            className={styles.submit_btn}
                            disabled={loading}
                        />

                        <hr className={styles.hr_line} />

                        <div className={`${styles.auth_next} ${styles.google}`}>
                            <FaGoogle style={{ marginRight: '5px' }} /> Google
                        </div>
                        <div className={`${styles.auth_next} ${styles.twitter}`}>
                            <FaTwitter style={{ marginRight: '5px' }} /> Twitter
                        </div>

                        <Link href="/signup">
                            <a href="" className={styles.login_link}>
                                Don&apos;t have an account? Register hare..
                            </a>
                        </Link>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default index;
