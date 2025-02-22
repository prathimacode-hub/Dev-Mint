import Image from 'next/image';
import React from 'react';
import item1 from '../../images/img1.jpg';
import item2 from '../../images/img2.jpg';
import item3 from '../../images/img3.jpg';
import style from './features.module.scss';

function Features({ propertyList }) {
    return (
        <div className={style.feature_sec}>
            <div className={style.feature_sec_main}>
                <div className={style.feature_item}>
                    <Image src={item1} className={style.feature_item_img} />
                    <div className={style.feature_item_txt}>
                        <h1>Berlin</h1>
                        <h2>{propertyList[0]} properties</h2>
                    </div>
                </div>

                <div className={style.feature_item}>
                    <Image src={item2} className={style.feature_item_img} />
                    <div className={style.feature_item_txt}>
                        <h1>Tokyo</h1>
                        <h2>{propertyList[1]} properties</h2>
                    </div>
                </div>

                <div className={style.feature_item}>
                    <Image src={item3} className={style.feature_item_img} />
                    <div className={style.feature_item_txt}>
                        <h1>Dubai</h1>
                        <h2>{propertyList[2]} properties</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Features;
