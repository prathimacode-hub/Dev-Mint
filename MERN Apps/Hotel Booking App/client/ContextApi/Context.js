/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useReducer } from 'react';
import Reducer from './Reducer';

const initial_state = {
    city: undefined,
    dates: [
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ],
    options: {
        adult: 1,
        children: 0,
        rooms: 1,
    },
};

export const Context = React.createContext(initial_state);

export function ContextProvider({ children }) {
    const [state, dispatch] = useReducer(Reducer, initial_state);

    return (
        <Context.Provider
            value={{
                city: state.city,
                dates: state.dates,
                options: state.options,
                dispatch,
            }}
        >
            {children}
        </Context.Provider>
    );
}
