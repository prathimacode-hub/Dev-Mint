/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import style from './formcomponent.module.scss';

function Email({ eVal, pVal, cVal, cChng, eChng, pChng }) {
    const [focus, setFocus] = useState(false);

    const onBlur = (n) => {
        setFocus(true);
    };

    return (
        <div className={style.exact_form}>
            <input
                className={style.exact_form_inp}
                placeholder="Email"
                type="email"
                value={eVal}
                onChange={eChng}
                required
                onBlur={onBlur}
                focused={focus.toString()}
            />
            <p
                clasName={style.form_err}
                style={{ color: 'red', marginTop: '-13px', fontSize: '14px', marginBottom: '10px' }}
            >
                Provide a valid email address
            </p>
            <input
                className={style.exact_form_inp}
                type="Password"
                placeholder="Password"
                value={pVal}
                onChange={pChng}
                onBlur={onBlur}
                focused={focus.toString()}
                pattern="^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,15}$"
            />
            <p
                clasName={style.form_err}
                style={{ color: 'red', marginTop: '-13px', fontSize: '14px', marginBottom: '10px' }}
            >
                Password should be 5-15 characters and include at last 1 letter, 1 number and 1
                special character!
            </p>
            <input
                className={style.exact_form_inp}
                type="Password"
                placeholder="Confirm Password"
                value={cVal}
                onChange={cChng}
                onBlur={onBlur}
                focused={focus.toString()}
                pattern={pVal}
            />
            <p
                clasName={style.form_err}
                style={{ color: 'red', marginTop: '-13px', fontSize: '14px', marginBottom: '10px' }}
            >
                Password doesn&apos;t matched
            </p>
        </div>
    );
}

export default Email;
