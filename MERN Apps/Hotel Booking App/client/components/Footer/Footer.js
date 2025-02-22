import Link from 'next/link';
import React from 'react';
import { MdLocalHotel } from 'react-icons/md';
import FooterItem from '../FooterItem/FooterItem';
import style from './footer.module.scss';

const footer_detail1 = [
    {
        id: 1,
        link: 'Home',
        to: '/',
    },
    {
        id: 2,
        link: 'About Us',
        to: '/about',
    },
    {
        id: 3,
        link: 'Rooms',
        to: '/hotels',
    },
    {
        id: 4,
        link: 'News',
        to: '/blogs',
    },
];

const footer_detail2 = [
    {
        id: 1,
        link: 'About',
        to: '/about',
    },
    {
        id: 2,
        link: 'Services',
        to: '/service',
    },
    {
        id: 3,
        link: 'Contact',
        to: '/contact',
    },
    {
        id: 4,
        link: 'Hotels',
        to: '/hotels',
    },
];

const footer_detail3 = [
    {
        id: 1,
        link: 'Contact Us',
        to: '/contact',
    },
    {
        id: 2,
        link: 'Location',
        to: '/contact',
    },
    {
        id: 3,
        link: 'About',
        to: '/about',
    },
    {
        id: 4,
        link: 'Follow Us',
        to: '/contact',
    },
];

function Footer() {
    return (
        <div className={style.footer}>
            <div className={style.footer_main}>
                <div className={style.footer_left}>
                    <FooterItem footerDetail={footer_detail1} footerHeader="Quick Links" />
                    <FooterItem footerDetail={footer_detail2} footerHeader="About Us" />
                    <FooterItem footerDetail={footer_detail3} footerHeader="Contacts" />
                </div>

                <div className={style.footer_right}>
                    <Link href="/">
                        <div className={style.nav_brand}>
                            <MdLocalHotel style={{ marginRight: '5px' }} className={style.brand} />{' '}
                            Rooms
                        </div>
                    </Link>
                    <p>
                        Find your great rooms & hostels. Make your journey more interesting and
                        enjoyable.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
