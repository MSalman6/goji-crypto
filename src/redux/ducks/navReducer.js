const initialState = {
    theme: undefined,
    pages: {
        dao: '',
        staking: '',
        farming: '',
        lock: ''
    }
};

const CHANGETHEME = 'changeTheme';
const CHANGEPAGE = 'changePage';

export const changeTheme = (theme) => ({
    type: CHANGETHEME,
    payload: theme
})

export const changePage = (pages) => ({
    type: CHANGEPAGE,
    payload: pages
})

const navReducer = (state=initialState, action) => {
    switch(action.type) {
        case CHANGETHEME:
            return { ...state, theme: action.payload }
        case CHANGEPAGE:
            return { ...state, pages: action.payload }
        default:
            return state
    }
}

export default navReducer;