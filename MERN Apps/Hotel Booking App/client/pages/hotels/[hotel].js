/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-unresolved */
import Image from 'next/image';
import { FaBath, FaBed, FaCheck } from 'react-icons/fa';
import { EffectCards, EffectFade, Navigation, Pagination } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import required modules
import axios from 'axios';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Context } from '../../ContextApi/Context';
import { Contexts } from '../../ContextUser/Contexts';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Newsletter from '../../components/Newsletter/Newsletter';
import Reserve from '../../components/Reserve/Reserve';
import img1 from '../../images/img1.jpg';
import item2 from '../../images/medium1.jpg';
import item1 from '../../images/medium2.jpg';
import item4 from '../../images/medium3.jpg';
import item3 from '../../images/medium4.jpg';
import noPhoto from '../../images/no hotel.jpg';
import style from '../../styles/hotelDetail.module.scss';

const hotelDetails = ({ hotel, rooms }) => {
    const { dates, options } = useContext(Context);
    const { user } = useContext(Contexts);
    const [sliderNum, setSliderNum] = useState(0);
    const [open, setOpen] = useState(false);

    const details = {
        id: 1,
        image: [img1, item1, item2, item3, item4],
        title: 'Standard Twin Room Private Shared Bathroom.',
        desc: [
            'In addition to the standard of SHA Plus, all guests get free Wi-Fi in all rooms and free parking if arriving by car. Strategically situated in Hua Hin Beachfront, allowing you access and proximity to local attractions and sights. Do not leave before paying a visit to the famous Cicada Market. Rated with 5 stars, this high-quality property provides guests with access to massage, restaurant and fitness center on-site. In addition to the standard of SHA Plus, all guests get free Wi-Fi in all rooms and free parking if arriving by car. Strategically situated in Hua Hin Beachfront, allowing you access and proximity to local attractions and sights.',
            'Strategically situated in Hua Hin Beachfront, allowing you access and proximity to local attractions and sights. Do not leave before paying a visit to the famous Cicada Market. Rated with 5 stars, this high-quality property provides guests with access to massage, restaurant and fitness center on-site.',
        ],
        sleep: '2 sleeps',
        bathroom: '1 bathroom',
        facilities: [
            'Large bed',
            '24/7 support',
            'Shared kitchen',
            'Shower in the room',
            'Dry cleaning',
            'General paid gym',
            'Air conditioning',
            'High speed WiFi',
        ],
        rating: '9.5',
        price: '231',
    };


//  The handleClick function checks if the user is defined and sets the open state to true if so,
//  otherwise it sets it to false.
    const handleClick = () => {
        if (user) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    };

//   The function calculates the difference in days between two dates.
//  param date1 - The `date1` parameter represents the start date of a period of time.
//  param date2 - The `date2` parameter represents the end date of a specific event or period.
//  returns The function `dayDifference` returns the number of days between `date1` and `date2`.
    const MILISEC_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {
        const timeDiference = Math.abs(date2.getTime() - date1.getTime());
        const differenceDays = Math.ceil(timeDiference / MILISEC_PER_DAY);
        return differenceDays === 0 ? 1 : differenceDays;
    }

    const day = dayDifference(dates[0].endDate, dates[0].startDate);

    return (
        <div className={style.hotel_detail}>
            <Navbar />
            <Header type="hList" />

            {/* hotel details */}
            <div className={style.hotel_detail_main}>
                <div className={style.hotel_detail_left}>
                    <h1>{hotel.name}</h1>
                    <Swiper
                        effect="fade"
                        navigation
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Navigation, EffectFade, Pagination]}
                        className="mySwiper"
                    >
                        {hotel.images.length > 0 ? (
                            hotel.images.map((imgs, i) => (
                                <SwiperSlide className={style.swiper_slide} key={i}>
                                    <Image
                                        className={style.swiper_slide_img}
                                        src={imgs}
                                        height={400}
                                        layout="fill"
                                        objectFit="cover"
                                        alt="hotels"
                                    />
                                </SwiperSlide>
                            ))
                        ) : (
                            <SwiperSlide className={style.swiper_slide}>
                                <Image
                                    className={style.swiper_slide_img}
                                    src={noPhoto}
                                    height={400}
                                    layout="fill"
                                    objectFit="cover"
                                    alt="hotels"
                                />
                            </SwiperSlide>
                        )}
                    </Swiper>

                    <div className={style.hotel_detail_rooms}>
                        <p style={{ marginRight: '8px' }}>
                            <FaBed size={22} className={style.search_item_bed_icon} />
                            {hotel.rooms.length}
                        </p>
                        <p>
                            <FaBath className={style.search_item_bed_icon} />
                            {hotel.bathroom}
                        </p>
                    </div>

                    <div className={style.hotel_detail_desc}>
                        <p>{hotel.desc}</p>
                    </div>

                    <h2>Room Facilities</h2>
                    <div className={style.hotel_detail_facilities}>
                        {details.facilities?.map((list, i) => (
                            <p key={i}>
                                <FaCheck style={{ marginRight: '5px' }} /> {list}
                            </p>
                        ))}
                    </div>
                </div>

                <div className={style.hotel_detail_right}>
                    <Swiper
                        effect="cards"
                        grabCursor
                        modules={[EffectCards]}
                        className={style.mySwiper}
                    >
                        {hotel.images.length > 0 ? (
                            hotel.images.slice(1).map((imgs, i) => (
                                <SwiperSlide
                                    className={style.swiper_slide2}
                                    style={{ position: 'relative' }}
                                    key={i}
                                >
                                    <Image
                                        className={style.swiper_slide_img2}
                                        src={imgs}
                                        objectFit="cover"
                                        alt="hotels"
                                        width={300}
                                        height={200}
                                    />
                                </SwiperSlide>
                            ))
                        ) : (
                            <SwiperSlide
                                className={style.swiper_slide2}
                                style={{ position: 'relative' }}
                            >
                                <Image
                                    className={style.swiper_slide_img2}
                                    src={noPhoto}
                                    objectFit="cover"
                                    alt="hotels"
                                    width={300}
                                    height={200}
                                />
                            </SwiperSlide>
                        )}
                    </Swiper>

                    <div className={style.hotel_detail_booking}>
                        <h2>Perfect for {day} days stay!</h2>
                        <p>
                            Located in the real heart of Krakow, this hotel has an excellent review
                            of <b>{details.rating}</b>.
                        </p>
                        <p>
                            <span>${hotel.price * options.rooms * day} </span> / {day} nights
                        </p>

                        {user ? (
                            <button type="button" onClick={handleClick}>
                                Reserve or Book now
                            </button>
                        ) : (
                            <Link href="/login">
                                <button type="button">Reserve or Book now</button>
                            </Link>
                        )}
                    </div>
                </div>
                <hr />
            </div>
             
            {/* conditionally rendering the `<Reserve>` component based on the value of the `open` state
            variable.  */}
            {open && <Reserve setOpen={setOpen} hotelId={hotel._id} rooms={rooms} />}

            <Newsletter />
            <Footer />
        </div>
    );
};

export default hotelDetails;


// The function `getStaticPaths` retrieves a list of hotels from an API and generates static paths for
// each hotel.
// @returns an object with two properties: "paths" and "fallback". The "paths" property is an array of
// objects, where each object represents a specific hotel and contains a "params" property with the
// hotel's ID. The "fallback" property is set to false, indicating that any paths not returned in the
// "paths" array will result in a 404 page.
export async function getStaticPaths() {
    const response = await axios.get(`https://rooms-backend.onrender.com/api/hotels`);
    const data = await response.data.message;

    const paths = data.map((item) => ({
        params: {
            hotel: item._id,
        },
    }));

    return {
        paths,
        fallback: false,
    };
}


//  The function `getStaticProps` is an asynchronous function that makes two API requests to retrieve
//  data for a hotel and its rooms, and returns the data as props.
export async function getStaticProps(context) {
    // api route
    const { params } = context;
    const res = await axios.get(`https://rooms-backend.onrender.com/api/hotel/${params.hotel}`);
    const res2 = await axios.get(`https://rooms-backend.onrender.com/api/rooms/${params.hotel}`);

    const data = await res.data.message;
    const data2 = await res2.data.message;

    return {
        props: {
            hotel: data,
            rooms: data2,
        },
    };
}
