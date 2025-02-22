import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import style from './LovelyHome.module.scss';

function LovelyHome({ hmDetails }) {

    return (
        <div className={style.lovely_home}>
            <div>
                <Image
                    className={style.lovely_home_img}
                    src={hmDetails?.images && hmDetails?.images[0]}
                    alt="Lovely Hotel"
                    width={250}
                    height={200}
                />
            </div>

            <Link href={`/hotels/${hmDetails._id}`}>
                <h3>{hmDetails.name}</h3>
            </Link>
            <p style={{ textTransform: 'capitalize' }}>{hmDetails.city}</p>
            <p className={style.lovely_home_price}> Starting from ${hmDetails.price}</p>

            <div className={style.lovely_home_btm}>
                <span>{hmDetails.rating}</span>
                {hmDetails.rating > 9 ? <p>Wonderful</p> : <p>Exceptional</p>}
            </div>
        </div>
    );
}

export default LovelyHome;
