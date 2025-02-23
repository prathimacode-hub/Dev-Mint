/* eslint-disable func-names */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { MdDriveFolderUpload } from 'react-icons/md';
import Footer from '../../components/Footer/Footer';
import Email from '../../components/FormComponents/Email';
import PersonalInfo from '../../components/FormComponents/PersonalInfo';
import SocialLink from '../../components/FormComponents/SocialLink';
import Navbar from '../../components/Navbar/Navbar';
import noImage from '../../images/user.png';
import styles from '../../styles/signuppage.module.scss';

const index = () => {
    const Router = useRouter();
    const [page, setPage] = useState(0);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [conPass, setConPass] = useState('');

    const [fullname, setFullname] = useState('');
    const [userName, setUserName] = useState('');
    const [country, setCountry] = useState('');

    const [phone, setPhone] = useState('');
    const [facebookUrl, setFacebookUrl] = useState('');
    const [twitterUrl, setTwitterUrl] = useState('');

    const [photo, setPhoto] = useState(null);
    const [error, setError] = useState(false);

    const [loading, setLoading] = useState(false);

    const eChng = (e) => {
        setEmail(e.target.value);
    };
    const pChng = (e) => {
        setPass(e.target.value);
    };
    const cChng = (e) => {
        setConPass(e.target.value);
    };

    const fChng = (e) => {
        setFullname(e.target.value);
    };
    const lChng = (e) => {
        setCountry(e.target.value);
    };
    const uChng = (e) => {
        setUserName(e.target.value);
    };
    const phnChng = (e) => {
        setPhone(e.target.value);
    };
    const facebookUrlChng = (e) => {
        setFacebookUrl(e.target.value);
    };
    const twitterUrlChng = (e) => {
        setTwitterUrl(e.target.value);
    };

    const PageTitle = ['Sign In', 'Personal Info', 'Social Links'];


    //  The `handleSubmit` function is used to handle form submission, including uploading a photo to
    // Cloudinary and making a POST request to a signup API endpoint.
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            if (photo) {
                const data = new FormData();
                data.append('file', photo);
                data.append('upload_preset', 'upload');

                const uploadRes = await axios.post(
                    'https://api.cloudinary.com/v1_1/drbvugloj/image/upload',
                    data
                );

                const { url } = uploadRes.data;
                try {
                    await axios.post('https://rooms-backend.onrender.com/api/user/signup', {
                        email,
                        password: pass,
                        fullname,
                        country,
                        username: userName,
                        image: url,
                        phone,
                        fblink: facebookUrl,
                        twlink: twitterUrl,
                    });

                    Router.push('/login');
                    setLoading(false);
                } catch (err) {
                    setError(true);
                    console.log('signup error', err);
                    setLoading(false);
                }
            } else {
                try {
                    await axios.post('https://rooms-backend.onrender.com/api/user/signup', {
                        email,
                        password: pass,
                        fullname,
                        country,
                        username: userName,
                        phone,
                        fblink: facebookUrl,
                        twlink: twitterUrl,
                    });

                    Router.push('/login');
                    setLoading(false);
                } catch (err) {
                    setError(true);
                    console.log('signup error', err);
                    setLoading(false);
                }
            }
        } catch (errr) {
            console.log('image error', errr);
            setError(true);
            setLoading(false);
        }
    };


    // The function returns different components based on the value of the "page" variable.
    // @returns The code is returning a component based on the value of the "page" variable. If "page"
    // is equal to 0, it returns the "Email" component with the specified props. If "page" is equal to
    // 1, it returns the "PersonalInfo" component with the specified props. Otherwise, it returns the
    // "SocialLink" component with the specified props.
    const PageBody = function () {
        if (page === 0) {
            return (
                <Email
                    eVal={email}
                    pVal={pass}
                    cVal={conPass}
                    eChng={eChng}
                    pChng={pChng}
                    cChng={cChng}
                />
            );
        }
        if (page === 1) {
            return (
                <PersonalInfo
                    fnVal={fullname}
                    lnVal={country}
                    unVal={userName}
                    fnChng={fChng}
                    lnChng={lChng}
                    usChng={uChng}
                />
            );
        }
        return (
            <SocialLink
                facebookUrl={facebookUrl}
                twitterUrl={twitterUrl}
                phoneUrl={phone}
                phnChng={phnChng}
                facebookUrlChng={facebookUrlChng}
                twitterUrlChng={twitterUrlChng}
            />
        );
    };

    return (
        <div className={styles.signup_page}>
            <Navbar />
            <div className={styles.signup_page_main}>
                <div className={styles.signup_page_form}>
                    <div className={styles.signup_progress}>
                        <div
                            className={styles.signup_progress_widht}
                            style={{ width: page === 0 ? '33.3%' : page === 1 ? '66.6%' : '100%' }}
                        />
                    </div>
                    <div className={styles.form_container}>
                        <div className={styles.form_header}>
                            <h3>{PageTitle[page]}</h3>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className={styles.upload_img}>
                                <div className={styles.form_inp}>
                                    <label htmlFor="file">
                                        Upload: <MdDriveFolderUpload className={styles.file_icon} />
                                    </label>

                                    <input
                                        type="file"
                                        name="file"
                                        id="file"
                                        style={{ display: 'none' }}
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                    />
                                </div>

                                <Image
                                    src={photo ? URL.createObjectURL(photo) : noImage}
                                    alt="upload image"
                                    width={100}
                                    height={100}
                                    className={styles.img}
                                />
                            </div>

                            <div className={styles.form_body}>
                                <div>{PageBody()}</div>
                            </div>

                            <div className={styles.form_footer}>
                                {page !== 0 && (
                                    <span
                                        className={styles.form_btns}
                                        style={{ marginRight: '3px' }}
                                        onClick={() => setPage((curr) => curr - 1)}
                                    >
                                        Prev
                                    </span>
                                )}
                                {page !== PageTitle.length - 1 && (
                                    <span
                                        className={styles.form_btns}
                                        style={{ marginLeft: '3px' }}
                                        onClick={() => setPage((curr) => curr + 1)}
                                    >
                                        Next
                                    </span>
                                )}
                            </div>

                            {error && (
                                <p style={{ color: 'red', marginBottom: '-5px' }}>SignUp failed!</p>
                            )}
                            {page === 2 && (
                                <input
                                    type="submit"
                                    value={loading ? 'Loading...' : 'Submit'}
                                    className={styles.submit_btn}
                                    style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
                                />
                            )}
                            <p style={{ marginTop: '10px' }}>
                                <Link href="/login"> Already have an account? Log in here..</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default index;
