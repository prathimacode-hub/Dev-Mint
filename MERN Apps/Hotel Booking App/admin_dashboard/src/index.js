import React from 'react';
import ReactDOM from 'react-dom/client';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { ColorContextProvider } from './ColorContext/darkContext';
import { UserContext } from './ContextUser/Contexts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <UserContext>
            <ColorContextProvider>
                <App />
            </ColorContextProvider>
        </UserContext>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
