import React, { useState } from 'react';
import Swal from 'sweetalert2';
import styles from './newsletter.module.scss';

function Newsletter() {
    const [email, setEmail] = useState('');
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        width: '250px',
        padding: '.75rem',
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            Toast.fire({
                icon: 'success',
                title: 'Subscribed successfully',
            });
            setEmail('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.newsletter}>
            <div className={styles.newsletter_main}>
                <h1>Subscribe for every discount and deals.</h1>
                <p>Want to save money? W&apos;ll send the best deal to you.</p>

                <div className={styles.right}>
                    <form className={styles.right_form} onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Enter your email.."
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input type="submit" value="Subscribe" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Newsletter;
