/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import React, { useState } from 'react';
import Blog from '../../components/Blog/Blog';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Newsletter from '../../components/Newsletter/Newsletter';
import bImg1 from '../../images/blog1.jpg';
import bImg2 from '../../images/blog2.jpg';
import bImg3 from '../../images/blog3.jpg';
import bImg4 from '../../images/blog4.jpg';
import style from '../../styles/blogpage.module.scss';

// remove this dummy data and fetch from database
const Blogs = [
    {
        id: 1,
        img: bImg1,
        title: 'How to cure wanderlust without leaving your home',
        tags: ['Travel', 'Communication', 'Tourist Guide'],
        text: [
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam rerum ea doloribus quae alias velit porro eligendi laudantium dolor necessitatibus delectus ab esse, corporis labore dignissimos molestiae cupiditate quo. Ipsa adipisci error beatae, deleniti accusantium molestias quae cumque nulla quasi sunt laborum! Possimus, numquam. Obcaecati animi aspernatur distinctio explicabo consequuntur.',
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam rerum ea doloribus quae alias velit porro eligendi laudantium dolor necessitatibus delectus ab esse, corporis labore dignissimos molestiae cupiditate quo. Ipsa adipisci error beatae, deleniti accusantium molestias quae cumque nulla quasi sunt laborum! Possimus, numquam.',
        ],
        createdAt: new Date().toDateString(),
        views: 122,
    },
    {
        id: 2,
        img: bImg2,
        title: '10 of the Most Underrated Cities in Europe',
        tags: ['City', 'Communication', 'Tourist Guide'],
        text: [
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam rerum ea doloribus quae alias velit porro eligendi laudantium dolor necessitatibus delectus ab esse, corporis labore dignissimos molestiae cupiditate quo. Ipsa adipisci error beatae, deleniti accusantium molestias quae cumque nulla quasi sunt laborum! Possimus, numquam. Obcaecati animi aspernatur distinctio explicabo consequuntur.',
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam rerum ea doloribus quae alias velit porro eligendi laudantium dolor necessitatibus delectus ab esse, corporis labore dignissimos molestiae cupiditate quo. Ipsa adipisci error beatae, deleniti accusantium molestias quae cumque nulla quasi sunt laborum! Possimus, numquam.',
        ],
        createdAt: new Date().toDateString(),
        views: 29,
    },
    {
        id: 3,
        img: bImg3,
        title: 'The Seven People You Always Meet Hosteling',
        tags: ['Communication', 'Tourist Guide', 'City'],
        text: [
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam rerum ea doloribus quae alias velit porro eligendi laudantium dolor necessitatibus delectus ab esse, corporis labore dignissimos molestiae cupiditate quo. Ipsa adipisci error beatae, deleniti accusantium molestias quae cumque nulla quasi sunt laborum! Possimus, numquam. Obcaecati animi aspernatur distinctio explicabo consequuntur.',
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam rerum ea doloribus quae alias velit porro eligendi laudantium dolor necessitatibus delectus ab esse, corporis labore dignissimos molestiae cupiditate quo. Ipsa adipisci error beatae, deleniti accusantium molestias quae cumque nulla quasi sunt laborum! Possimus, numquam.',
        ],
        createdAt: new Date().toDateString(),
        views: 120,
    },
    {
        id: 4,
        img: bImg4,
        title: 'How to cure wanderlust without leaving your home',
        tags: ['Travel', 'Communication', 'Tourist Guide', 'City'],
        text: [
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam rerum ea doloribus quae alias velit porro eligendi laudantium dolor necessitatibus delectus ab esse, corporis labore dignissimos molestiae cupiditate quo. Ipsa adipisci error beatae, deleniti accusantium molestias quae cumque nulla quasi sunt laborum! Possimus, numquam. Obcaecati animi aspernatur distinctio explicabo consequuntur.',
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam rerum ea doloribus quae alias velit porro eligendi laudantium dolor necessitatibus delectus ab esse, corporis labore dignissimos molestiae cupiditate quo. Ipsa adipisci error beatae, deleniti accusantium molestias quae cumque nulla quasi sunt laborum! Possimus, numquam.',
        ],
        createdAt: new Date().toDateString(),
        views: 802,
    },
    {
        id: 5,
        img: bImg1,
        title: 'How to cure wanderlust without leaving your home',
        tags: ['Travel', 'Communication', 'Tourist Guide'],
        text: [
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam rerum ea doloribus quae alias velit porro eligendi laudantium dolor necessitatibus delectus ab esse, corporis labore dignissimos molestiae cupiditate quo. Ipsa adipisci error beatae, deleniti accusantium molestias quae cumque nulla quasi sunt laborum! Possimus, numquam. Obcaecati animi aspernatur distinctio explicabo consequuntur.',
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam rerum ea doloribus quae alias velit porro eligendi laudantium dolor necessitatibus delectus ab esse, corporis labore dignissimos molestiae cupiditate quo. Ipsa adipisci error beatae, deleniti accusantium molestias quae cumque nulla quasi sunt laborum! Possimus, numquam.',
        ],
        createdAt: new Date().toDateString(),
        views: 122,
    },
];

const index = ({ blogs }) => {
    const [blogData, setBlogData] = useState(blogs);

    return (
        <div className={style.blog_page}>
            <Navbar />
            <Header type="hList" />
            <div className={style.blog_page_main}>
                <div className={style.blog_list}>
                    <form action="" className={style.blog_search}>
                        <input type="text" name="" placeholder="Search blogs..." />
                        <input type="submit" value="Search" />
                    </form>

                    <p>{blogData.length} blogs found.</p>
                    {blogData.length > 0 &&
                        blogData.map((blog) => <Blog blogs={blog} key={blog._id} />)}
                </div>

                <div className={style.blog_search_tag}>
                    <h2>Tags</h2>
                    <div className={style.tags_main}>
                        {/* <Link href="blogs/search?tag=Travel"> */}
                        <span>Travel</span>
                        {/* </Link> */}
                        <span>Communication</span>
                        <span>Tourist</span>
                    </div>
                </div>
            </div>
            <Newsletter />
            <Footer />
        </div>
    );
};
export default index;

//  The function is using axios to make an asynchronous GET request to the specified URL and returning
//  the response data as props for the component.
//  returns an object with a "props" property. The "props" property contains a "blogs" property, which
//  is assigned the value of the "data" variable.
export async function getStaticProps() {
    const res = await axios.get('https://rooms-backend.onrender.com/api/blogs');
    const data = await res.data.message;

    return {
        props: {
            blogs: data,
        },
    };
}
