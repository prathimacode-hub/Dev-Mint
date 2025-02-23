import React from 'react';
import styles from './facility.module.scss';

function Facility({ facilities }) {
    return (
        <div className={styles.facility}>
            <p className={styles.icon}>{facilities.icon}</p>

            <div className={styles.facility_txt}>
                <h3>{facilities.title}</h3>
                <p>{facilities.text}</p>
            </div>
        </div>
    );
}

export default Facility;
