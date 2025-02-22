import React from 'react';
import { BiBody, BiSwim } from 'react-icons/bi';
import { FaBed, FaCar, FaTaxi } from 'react-icons/fa';
import { MdFastfood } from 'react-icons/md';
import Facility from '../Facility/Facility';
import styles from './whyus.module.scss';

const Facilities = [
    {
        id: 1,
        title: 'Delux Room',
        text: 'All placges and activiates are carefully picked by us. Lorem ipsum dolor sit amet consetetur sadipscing.',
        icon: <FaBed className={styles.icon} />,
    },
    {
        id: 2,
        title: 'Delicoius Food',
        text: 'Best price guaranteee & Hassle free! Lorem ipsum dolor sit amet consetetur sadipscing sit amet consetetur.',
        icon: <MdFastfood className={styles.icon} />,
    },
    {
        id: 3,
        title: 'Parking Space',
        text: 'All placges and activiates are carefully picked by us. Lorem ipsum dolor sit amet consetetur sadipscing.',
        icon: <FaCar className={styles.icon} />,
    },
    {
        id: 4,
        title: 'Fitness Center',
        text: 'Best price guaranteee & Hassle free! Lorem ipsum dolor sit amet consetetur sadipscing sit amet consetetur.',
        icon: <BiBody className={styles.icon} />,
    },
    {
        id: 5,
        title: 'Swimming Pool',
        text: 'All placges and activiates are carefully picked by us. Lorem ipsum dolor sit amet consetetur sadipscing.',
        icon: <BiSwim className={styles.icon} />,
    },
    {
        id: 6,
        title: 'Airport Taxi',
        text: 'Best price guaranteee & Hassle free! Lorem ipsum dolor sit amet consetetur sadipscing sit amet consetetur.',
        icon: <FaTaxi className={styles.icon} />,
    },
];

function WhyUs() {
    return (
        <div className={styles.why_us}>
            <div className={styles.why_us_main}>
                <div className={styles.why_us_title}>
                    <h2>Why Booking With Us?</h2>
                    <p>What Facilities & Services We Offer For You.</p>
                </div>

                <div className={styles.why_us_item}>
                    {Facilities.map((facilities) => (
                        <Facility key={facilities.id} facilities={facilities} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WhyUs;
