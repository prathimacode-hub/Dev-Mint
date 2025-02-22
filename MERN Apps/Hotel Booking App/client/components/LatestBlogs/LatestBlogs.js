import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import style from './latestblogs.module.scss';

function LatestBlogs({ blog }) {
    const { image, createdAt, title, _id } = blog;
    const date = moment(createdAt).fromNow();
    return (
        <div className={style.recent_blog}>
            <Link href={`/blogs/${_id}`}>
                <Image
                    src={image}
                    alt="recent blog"
                    className={style.recent_blog_img}
                    height={100}
                    width={150}
                    objectFit="cover"
                    layout="responsive"
                />
            </Link>

            <div className={style.recent_blog_txt}>
                <Link href={`/blogs/${_id}`}>
                    <h3>{title}</h3>
                </Link>
                <p>{date}</p>
            </div>
        </div>
    );
}

export default LatestBlogs;
