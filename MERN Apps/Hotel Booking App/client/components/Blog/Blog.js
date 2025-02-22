/* eslint-disable react/no-array-index-key */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaCalendarAlt, FaRegEye } from 'react-icons/fa';
import style from './blog.module.scss';

function Blog({ blogs }) {
    const { title, image, desc, createdAt, view, tags, _id } = blogs;

    return (
        <div className={style.blog}>
            <div className={style.blog_img} style={{ position: 'relative' }}>
                <Link href={`/blogs/${_id}`}>
                    <Image
                        src={image}
                        className={style.blog_imggg}
                        height={200}
                        width={300}
                        layout="responsive"
                        objectFit="cover"
                    />
                </Link>

                <p className={style.blog_tag} style={{ textTransform: 'capitalize' }}>
                    {tags[0]}
                </p>
            </div>

            <div className={style.blog_details}>
                <Link href={`/blogs/${_id}`}>
                    <h2>{title}</h2>
                </Link>
                <p>{desc}</p>

                <div className={style.blog_foter}>
                    <p>
                        <FaCalendarAlt style={{ marginRight: '3px' }} />
                        {createdAt}
                    </p>
                    <p>
                        <FaRegEye style={{ marginRight: '3px' }} />
                        {view} views
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Blog;
