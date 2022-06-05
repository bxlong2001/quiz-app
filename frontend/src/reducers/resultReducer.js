const resultReducer = (state, action) => {
    const {type, payload} = action

    switch(type) {
        case 'RESULTS_LOADED_SUCCESS':
            return {
                ...state,
                results: payload,
                resultsLoading: false
            }
        case 'RESULTS_LOADED_FAIL':
            return {
                ...state,
                results: [],
                resultsLoading: false
            }
        default:
            return state
    }
}

export default resultReducer