import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { FaGripLines, FaHome, FaNewspaper, FaTimes } from 'react-icons/fa';
import { MdLocalHotel, MdLocalTaxi, MdMapsHomeWork } from 'react-icons/md';
import { Contexts } from '../../ContextUser/Contexts';
import style from './Navbar.module.scss';

function Navbar() {
    const { user, dispatch } = useContext(Contexts);
    const [toggler, setToggler] = useState(false);

    const menus = [
        {
            id: 1,
            icon: <FaHome className={style.icon} />,
            txt: 'Home',
            isActive: false,
            href: '/',
        },
        {
            id: 2,
            icon: <MdMapsHomeWork className={style.icon} />,
            txt: 'Hotels',
            isActive: false,
            href: '/hotels',
        },
        {
            id: 3,
            icon: <FaNewspaper className={style.icon} />,
            txt: 'Blogs',
            isActive: false,
            href: '/blogs',
        },
        {
            id: 4,
            icon: <MdLocalHotel className={style.icon} />,
            txt: 'Resorts',
            isActive: false,
            href: '/',
        },
        {
            id: 5,
            icon: <MdLocalTaxi className={style.icon} />,
            txt: 'Taxis',
            isActive: false,
            href: '/',
        },
    ];

    const handleToggle = () => {
        setToggler(!toggler);
    };

    const handleLogOut = () => {
        dispatch({ type: 'LOG_OUT' });
    };

    return (
        <div className={style.navbar}>
            <div className={style.navbar_main}>
                <Link href="/">
                    <div className={style.nav_brand}>
                        <h2>
                            <MdLocalHotel size={30} style={{ marginRight: '5px' }} /> Rooms
                        </h2>
                    </div>
                </Link>

                <div className={style.header_menus}>
                    <ul>
                        {menus.map((menu) => (
                            <Link href={menu.href} key={menu.id}>
                                <li>
                                    {menu.icon} {menu.txt}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>

                <div className={style.registration}>
                    {user ? (
                        <button className={style.reg_btn} type="button" onClick={handleLogOut}>
                            log out
                        </button>
                    ) : (
                        <Link href="/signup">
                            <button className={style.reg_btn} type="button">
                                sign in
                            </button>
                        </Link>
                    )}
                </div>

                <div className={style.res_nav}>
                    {toggler ? (
                        <FaTimes onClick={handleToggle} className={style.tgl_btn} />
                    ) : (
                        <FaGripLines onClick={handleToggle} className={style.tgl_btn} />
                    )}
                    {toggler && (
                        <div className={style.res_nav_menu}>
                            <ul>
                                {menus.map((menu) => (
                                    <Link href={menu.href} key={menu.id}>
                                        <li>
                                            {menu.icon} {menu.txt}
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
