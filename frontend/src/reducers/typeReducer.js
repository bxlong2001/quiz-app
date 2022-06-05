const typeReducer = (state, action) => {
    const {type, payload} = action

    switch(type) {
        case 'TYPES_LOADED_SUCCESS':
            return {
                ...state,
                types: payload,
                typesLoading: false
            }
        case 'TYPES_LOADED_FAIL':
            return {
                ...state,
                types: [],
                typesLoading: false
            }
        default:
            return state
    }
}

export default typeReducer