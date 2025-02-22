import Image from 'next/image';
import React from 'react';
import item1 from '../../images/item1.jpg';
import item2 from '../../images/item2.jpg';
import item3 from '../../images/item3.jpg';
import item4 from '../../images/item4.jpg';
import item5 from '../../images/item5.jpg';
import styles from './propertys.module.scss';

function Propertys({ propertyList2 }) {
    const images = [item1, item2, item3, item4, item5];

    return (
        <div className={styles.propertys}>
            <h2>Browse by propertys</h2>
            <div className={styles.propertys_main}>
                {propertyList2 &&
                    images?.map((img, i) => (
                        <div className={styles.property_item} key={i}>
                            <Image src={img} alt="Propertys" className={styles.property_item_img} />

                            <div className={styles.property_item_txt}>
                                <h3>{propertyList2[i]?.type}</h3>
                                <h4>
                                    {propertyList2[i]?.count} {propertyList2[i]?.type}
                                </h4>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Propertys;
