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
        case 'MAXRESULTS_LOADED_SUCCESS':
            return {
                ...state,
                maxResults: payload,
                maxResultsLoading: false
            }
        case 'MAXRESULTS_LOADED_FAIL':
            return {
                ...state,
                maxResults: [],
                maxResultsLoading: false
            }
        default:
            return state
    }
}

export default resultReducer