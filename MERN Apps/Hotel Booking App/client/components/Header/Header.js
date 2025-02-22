/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prettier/prettier */
import { format } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { FaCalendarAlt, FaUserFriends } from 'react-icons/fa';
import {
    MdLocalHotel
} from 'react-icons/md';
import { Context } from '../../ContextApi/Context';
import { Contexts } from '../../ContextUser/Contexts';
import style from './header.module.scss';

function Header({type}) {
    const [openDate, setOpenDate] = useState(false)
    const [openOption, setOpenOption] = useState(false)
    const [city, setCity] = useState('')
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        rooms: 1
    })
    const [dates, setDates] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);

    const router = useRouter()


    //  The handleBtn function updates the value of a specific option based on the given operation.
    const handleBtn = (name, operation) => {
        setOptions((prev) => ({
                ...prev,
                [name]: operation === "i" ? options[name] + 1 :  options[name] - 1
            }))
    }

    const handleCalender = () => {
        setOpenDate(!openDate)
        setOpenOption(false)
    }

    const handleRoomss = () => {
        setOpenOption(!openOption)
        setOpenDate(false)
    }

    const states = {
        city,
    }
    
    const {dispatch} = useContext(Context);
    const {user} = useContext(Contexts)


//  The handleSubmit function prevents the default form submission behavior, dispatches a new search
//  action with the city, dates, and options as payload, and navigates to the hotels page with the query
//  parameters.
    const handleSubmit = (e) => {
        e.preventDefault()
        // router.push(`http://localhost:4000/api/hotels?city=${city?.toLocaleLowerCase()}`)
        dispatch({type: 'NEW_SEARCH', payload: {city, dates, options}})
        router.push({
            pathname: '/hotels',
            query: states,
        })
    }

    return (
        <div className={style.header}>
            <div className={style.header_main}>
                {type !== "hList" && (
                    <>
                        
                    <h1 >Amazing hostel for the free spirited traveler.</h1>
                    <p>
                        A life time of discounts? - We have everything you need. It&apos;s simple: the
                        longer you stay, the more you save!
                    </p>

                    {user ? (
                        <div className={style.username}>Welcome <b> {user.username ? user.username : user.fullname}</b></div>
                    ) : (
                        <Link href="login">
                            <button className={style.reg_btn} type="button">
                                Sign In / Register
                            </button>
                        </Link>
                )}

                {/* header search */}
                    <div className={style.header_search}>
                            <div className={style.header_search_item}>
                                <MdLocalHotel className={style.header_search_icon_first} />
                                <input
                                    type="text"
                                    placeholder="Berlin, Tokyo, Dubai"
                                    className={style.searc_inp}
                                    value={city?.toLowerCase()}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>

                            <div className={style.header_search_item}>
                                <FaCalendarAlt className={style.header_search_icon} />
                                <span onClick={handleCalender} className={style.header_search_date}>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
                                </span>
                                    {openDate && <DateRange
                                        editableDateInputs
                                        onChange={item => setDates([item.selection])}
                                        moveRangeOnFirstSelection={false}
                                        ranges={dates}
                                        className={style.header_search_calender}
                                        minDate={new Date()}
                                    />}
                            </div>

                            <div className={style.header_search_item}>
                                <FaUserFriends className={style.header_search_icon_first} />
                                <span className={style.header_search_date} onClick={handleRoomss}>{`${options.adult} adult ${options.children} children ${options.rooms} room `}</span>
                            {openOption && <div className={style.search_options}>
                                <div className={style.search_option_item}>
                                    <span className={style.option_txt}>Adult</span>
                                    <div className={style.search_option_btnss}>
                                        <button className={style.option_btn} type="button" onClick={() => handleBtn("adult", "d")} disabled={options.adult <= 1}>-</button>
                                        <span className={style.option_txt_num}>{options.adult}</span>
                                        <button className={style.option_btn} type="button" onClick={() => handleBtn("adult", "i")}>+</button>
                                    </div>
                                </div>

                                <div className={style.search_option_item}>
                                    <span className={style.option_txt}>Children</span>
                                    <div className={style.search_option_btnss}>
                                        <button className={style.option_btn} type="button" onClick={() => handleBtn("children", "d")} disabled={options.children <= 0}>-</button>
                                        <span className={style.option_txt_num}>{options.children}</span>
                                        <button className={style.option_btn} type="button" onClick={() => handleBtn("children", "i")}>+</button>
                                    </div>
                                </div>

                                <div className={style.search_option_item}>
                                    <span className={style.option_txt}>Room</span>
                                    <div className={style.search_option_btnss}>
                                        <button className={style.option_btn} type="button" onClick={() => handleBtn("rooms", "d")} disabled={options.rooms <= 1}>-</button>
                                        <span className={style.option_txt_num}>{options.rooms}</span>
                                        <button className={style.option_btn} type="button" onClick={() => handleBtn("rooms", "i")}>+</button>
                                    </div>
                                </div>
                            </div>}

                            </div>

                            <div className={style.header_search_item}>
                                <button className={style.header_search_btn} type="button" onClick={handleSubmit}>Search</button>
                            </div>
                        </div>

                </>
                )}
            </div>
        </div>
    );
}

export default Header;
