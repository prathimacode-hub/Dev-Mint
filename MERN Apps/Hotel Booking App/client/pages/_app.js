/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import { ContextProvider } from '../ContextApi/Context';
import { UserContext } from '../ContextUser/Contexts';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        setShowChild(true);
    }, []);

    if (!showChild) {
        return true;
    }

    return (
        // <SessionProvider session={session}>
        <UserContext>
            <ContextProvider>
                <Component {...pageProps} />
            </ContextProvider>
        </UserContext>
        // </SessionProvider>
    );
}

export default MyApp;
