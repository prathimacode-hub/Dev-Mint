/* eslint-disable import/no-unresolved */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import img1 from '../../images/about_sec1.jpg';
import img2 from '../../images/about_sec2.jpg';
import img3 from '../../images/about_sec3.jpg';
import style from './specialservices.module.scss';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules

const serviceDetails = [
    {
        id: '1',
        title: 'Hotel Reservation',
        text: 'Auctor neque vitae tempus quam pellentesque nec nam. Amet aliquam id diam maecenas ultricies mi eget mauris pharetra. Velit euismod in pellentesque massa placerat duis ultricies. Tempus egestas sed sed risus pretium quam.',
        link: '/hotels',
        image: img1,
    },
    {
        id: '2',
        title: 'Luxury Bath',
        text: 'Auctor neque vitae tempus quam pellentesque nec nam. Amet aliquam id diam maecenas ultricies mi eget mauris pharetra. Velit euismod in pellentesque massa placerat duis ultricies. Tempus egestas sed sed risus pretium quam.',
        link: '/bath',
        image: img2,
    },
    {
        id: '3',
        title: 'Couple Area',
        text: 'Auctor neque vitae tempus quam pellentesque nec nam. Amet aliquam id diam maecenas ultricies mi eget mauris pharetra. Velit euismod in pellentesque massa placerat duis ultricies. Tempus egestas sed sed risus pretium quam.',
        link: '/hotels',
        image: img3,
    },
];

function SpecialServices() {
    return (
        <div className={style.SpecialServices}>
            <div className={style.SpecialServices_main}>
                <div className={style.SpecialServices_header}>
                    <h1>Special Services</h1>
                    <p>Choose the rigth Destination. The main benefits to choose Rooms.</p>
                </div>

                <div className={style.service_slider}>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={40}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            768: {
                                slidesPerView: 1,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 2,
                                spaceBetween: 40,
                            },
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        {serviceDetails.map((service) => (
                            <SwiperSlide key={service.id}>
                                <div key={service.id} className={style.service_card}>
                                    <Image
                                        src={service.image}
                                        alt="hotelservice"
                                        className={style.service_card_img}
                                    />

                                    <div className={style.service_card_body}>
                                        <Link href="/hotels">
                                            <h2>{service.title}</h2>
                                        </Link>
                                        <p>{service.text}</p>

                                        <Link href="/hotels">
                                            <button type="button" className={style.service_button}>
                                                View Detail
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}

export default SpecialServices;
