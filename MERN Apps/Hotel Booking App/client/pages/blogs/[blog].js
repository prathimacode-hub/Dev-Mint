import axios from 'axios';
import Image from 'next/image';
import React from 'react';
import { FaCalendarAlt, FaRegEye } from 'react-icons/fa';
import BlogComponent from '../../components/BlogComponent/BlogComponent';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import LatestBlogs from '../../components/LatestBlogs/LatestBlogs';
import Navbar from '../../components/Navbar/Navbar';
import Newsletter from '../../components/Newsletter/Newsletter';
import noPhoto from '../../images/no hotel.jpg';
import style from '../../styles/blogdetail.module.scss';

// remove this dummy data and fetch from the database

const blogDetails = ({ blogList1, blogss }) => (
    <div className={style.blog_detail}>
        <Navbar />
        <Header type="hList" />
        <div className={style.blog_detail_main}>
            <div className={style.blog_detailss}>
                <h1>{blogList1.title}</h1>

                <Image
                    src={blogList1.image ? blogList1.image : noPhoto}
                    alt="Travel blogs"
                    className={style.blog_detail_img}
                    height={400}
                    width={600}
                    objectFit="cover"
                    layout="responsive"
                />

                <div className={style.blog_detail_tv}>
                    <p>
                        <FaCalendarAlt style={{ marginRight: '3px' }} />
                        {blogList1.createdAt}
                    </p>
                    <p>
                        <FaRegEye style={{ marginRight: '3px' }} />
                        {blogList1.view} views
                    </p>
                </div>

                <p className={style.blog_detail_txt}>{blogList1.desc}</p>
                <h3>Tags:</h3>
                {blogList1.tags.map((tag, i) => (
                    <span key={i} className={style.blog_detail_tag}>
                        {tag}
                    </span>
                ))}
            </div>

            <div className={style.blog_detail_right}>
                <h2>Recent Blogs</h2>
                {blogss
                    .filter((item) => item._id !== blogList1._id)
                    .slice(0, 3)
                    .map((blog, i) => (
                        <LatestBlogs blog={blog} key={i} />
                    ))}
            </div>
        </div>

        <BlogComponent blogDetail={blogss} title="You might also like" id={blogList1._id} />

        <Newsletter />
        <Footer />
    </div>
);
export default blogDetails;


// The function `getStaticPaths` retrieves data from an API endpoint and generates an array of paths
// based on the response data.
// @returns an object with two properties: "paths" and "fallback".
export async function getStaticPaths() {
    const response = await axios.get(`https://rooms-backend.onrender.com/api/blogs`);
    const data = await response.data.message;

    const paths = data.map((item) => ({
        params: {
            blog: item._id,
        },
    }));

    return {
        paths,
        fallback: false,
    };
}


// The function `getStaticProps` is an asynchronous function that fetches data from two API routes and
// returns the data as props.
export async function getStaticProps(context) {
    // api route
    const { params } = context;
    console.log(params);
    const res = await axios.get(`https://rooms-backend.onrender.com/api/blog/${params.blog}`);
    const res2 = await axios.get('https://rooms-backend.onrender.com/api/blogs');

    const data = await res.data.message;
    const blogss = await res2.data.message;

    return {
        props: {
            blogList1: data,
            blogss,
        },
    };
}
