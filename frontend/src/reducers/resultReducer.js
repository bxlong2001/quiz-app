const resultReducer = (state, action) => {
    const {type, payload} = action

    switch(type) {
        case 'MYRANK_LOADED_SUCCESS':
            return {
                ...state,
                rankInfo: payload,
                rankInfoLoading: false
            }
        case 'MYRANK_LOADED_FAIL':
            return {
                ...state,
                rankInfo: null,
                rankInfoLoading: false
            }
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