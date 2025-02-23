/* eslint-disable prettier/prettier */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaBath, FaBed } from 'react-icons/fa';
import noPhoto from '../../images/no hotel.jpg';
import style from './searchitem.module.scss';

function SearchItem({ results }) {
    return (
        <div className={style.search_item}>
            <Link href={`/hotels/${results._id}`}>
                <div className={style.search_item_img} style={{ position: 'relative' }}>
                    <Image src={results.images.length > 0 ? results.images[0] : noPhoto} height={260} width={270} layout="responsive" alt="Hotels"  />
                </div>
            </Link>

            <div className={style.search_item_details}>
                <Link href={`/hotels/${results._id}`}>
                    <h3>{results.name}</h3>
                </Link>

                <p >{results.desc}</p>
                <span className={style.free}>Free dining room</span>
                <div className={style.search_item_bed}>
                    <p style={{ marginRight: '8px' }}>
                        <FaBed size={19} className={style.search_item_bed_icon} /> {results.rooms.length}
                    </p>
                    <p>
                        <FaBath className={style.search_item_bed_icon} />
                        {results.bathroom}
                    </p>
                </div>
            </div>

            <div className={style.search_item_pricing}>
                <div className={style.search_item_priceing_rating}>
                    {results.rating >= 9 ? (
                        <p className={style.priceing_rating}>Excellent</p>
                    ) : (
                        <p className={style.priceing_rating}>Comfort</p>
                    )}
                    <span>{results.rating}</span>
                </div>
                <div className={style.search_item_price}>
                    <p>${results.price}</p>

                    <Link href={`/hotels/${results._id}`}>
                        <button type="button">View Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SearchItem;
