export default function Reducer(state, action) {
    switch (action.type) {
        case 'NEW_SEARCH':
            return action.payload;
        case 'RESET_SEARCH':
            return {
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
        default:
            return state;
    }
}
