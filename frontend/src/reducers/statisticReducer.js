const statisticReducer = (state, action) => {
    const {type, payload} = action
    
    switch(type) {
        case 'STATISTICS_LOADED_SUCCESS':
            return {
                ...state,
                statistics: payload,
                statisticsLoading: false
            }
        case 'STATISTICS_LOADED_FAIL':
            return {
                ...state,
                statistics: [],
                statisticsLoading: false
            }
        default:
            return state
    }
}

export default statisticReducer