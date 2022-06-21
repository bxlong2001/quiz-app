const authReducer = (state, action) => {
    const {type, payload: {isAuthenticated, user}} = action

    switch (type) {
        case 'SET_AUTH':
            return {
                ...state,
                authLoading: false,
                isAuthenticated,
                user
            }
        case 'UPDATE_AVT':
            return {
                ...state,
                user: {...state.user, avt: user}
            }
        case 'UPDATE_FULLNAME':
            return {
                ...state,
                user: {...state.user, fullname: user}
            }
        default:
            return state
    }
}

export default authReducer