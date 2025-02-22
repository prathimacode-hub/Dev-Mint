/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Context } from '../../ContextApi/Context';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Newsletter from '../../components/Newsletter/Newsletter';
import SearchItem from '../../components/SearchItem/SearchItem';
import style from '../../styles/hotels.module.scss';

const index = ({ hotelList }) => {
    const { query } = useRouter();
    const [openDate, setOpenDate] = useState(false);
    const [city, setCity] = useState(query.city || '');
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        rooms: 1,
    });
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ]);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(999);
    const [hotelData, setHotelData] = useState(hotelList);

    const { dispatch } = useContext(Context);

//  The `useEffect` hook is used to perform side effects in a functional component. In this case, the
// `useEffect` hook is used to fetch hotel data based on the selected city. 
    useEffect(() => {
        const getHotelByCity = async () => {

            if (city !== "") {
            const response = await axios.get(`https://rooms-backend.onrender.com/api/hotels?city=${city}`
            );
            const hotels = await response.data.message
            setHotelData(hotels)
        } else  {
            setHotelData(hotelList)
        }
        }

        getHotelByCity()
    }, [city])


//  The handleSubmit function is used to handle form submission, dispatch a new search action, and fetch
//  hotel data from a server based on search values.
//  @param e - The parameter `e` is an event object that represents the event that triggered the form
//  submission. In this case, it is the form submission event.
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: 'NEW_SEARCH', payload: { city, dates, options } });
        // fetch data from server by search values
        const hotels = await axios.get(
            `https://rooms-backend.onrender.com/api/hotels?city=${city?.toLocaleLowerCase()}&min=${min}&max=${max}`
        );
        const hotelDatas = await hotels.data.message;
        setHotelData(hotelDatas);
    };

    return (
        <div className={style.hotels_page}>
            <Navbar />
            <Header type="hList" />

            <div className={style.hotels_page_main}>
                <div className={style.hotels_page_search}>
                    <h2>Search</h2>
                    <div className={style.search_item}>
                        <label>City</label>
                        <input
                            type="text"
                            placeholder={city}
                            value={city?.toLowerCase()}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>

                    <div className={style.search_item}>
                        <label>Check-in Date</label>
                        <span
                            className={style.search_item_date}
                            onClick={() => setOpenDate(!openDate)}
                        >{`${format(dates[0]?.startDate, 'MM/dd/yyyy')} to ${format(
                            dates[0].endDate,
                            'MM/dd/yyyy'
                        )}`}</span>
                        {openDate && (
                            <DateRange
                                editableDateInputs
                                onChange={(item) => setDates([item.selection])}
                                ranges={dates}
                                className={style.header_search_calender}
                                minDate={new Date()}
                            />
                        )}
                    </div>

                    <div className={style.search_item}>
                        <label style={{ marginBottom: '11px', marginTop: '10px' }}>Options</label>
                        <div className={style.search_item_option}>
                            <span className={style.option_txt}>
                                Min price <small className={style.night_batch}>per night</small>
                            </span>
                            <input
                                type="number"
                                className={style.option_inp}
                                min={1}
                                onChange={(e) => setMin(e.target.value)}
                            />
                        </div>

                        <div className={style.search_item_option}>
                            <span className={style.option_txt}>
                                Max price <small className={style.night_batch}>per night</small>
                            </span>
                            <input
                                type="number"
                                className={style.option_inp}
                                max={5000}
                                min={1}
                                onChange={(e) => setMax(e.target.value)}
                            />
                        </div>

                        <div className={style.search_item_option}>
                            <span className={style.option_txt}>Adult</span>
                            <input
                                type="number"
                                min={1}
                                value={options.adult}
                                onChange={(e) => setOptions({ ...options, adult: e.target.value })}
                                className={style.option_inp}
                                placeholder={options.adult}
                            />
                            {/* value={options.adult} onChange={handleBtn("adult")} */}
                        </div>

                        <div className={style.search_item_option}>
                            <span className={style.option_txt}>Children</span>
                            <input
                                type="number"
                                value={options.children}
                                onChange={(e) =>
                                    setOptions({ ...options, children: e.target.value })
                                }
                                className={style.option_inp}
                                placeholder={options.children}
                                min={0}
                            />
                        </div>

                        <div className={style.search_item_option}>
                            <span className={style.option_txt}>Room</span>
                            <input
                                type="number"
                                value={options.rooms}
                                onChange={(e) => setOptions({ ...options, rooms: e.target.value })}
                                className={style.option_inp}
                                placeholder={options.rooms}
                                min={1}
                            />
                        </div>
                    </div>
                    <button
                        className={style.header_search_btn}
                        type="button"
                        onClick={handleSubmit}
                    >
                        Search
                    </button>
                </div>

                <div className={style.hotels_page_result}>
                    <span className={style.page_result}>{hotelData.length} results found</span>
                    {hotelData.map((results_item) => (
                        <SearchItem results={results_item} key={results_item._id} />
                    ))}
                </div>
            </div>

            <Newsletter />
            <Footer />
        </div>
    );
};

export default index;


// The function retrieves a list of hotels from an API endpoint and returns it as a prop.
export async function getStaticProps() {
    const response = await axios.get('https://rooms-backend.onrender.com/api/hotels');

    const data = await response.data.message;

    return {
        props: {
            hotelList: data,
        },
    };
}
