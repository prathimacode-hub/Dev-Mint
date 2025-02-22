export const NewSearch = (credentials) => ({
    type: 'NEW_SEARCH',
    payload: credentials,
});

export const ResetSearch = () => ({
    type: 'RESET_SEARCH',
});
