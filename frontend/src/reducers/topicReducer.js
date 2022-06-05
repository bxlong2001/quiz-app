const topicReducer = (state, action) => {
    const {type, payload} = action

    switch(type) {
        case 'TOPICS_LOADED_SUCCESS':
            return {
                ...state,
                topics: payload,
                topicsLoading: false
            }
        case 'TOPICS_LOADED_FAIL':
            return {
                ...state,
                topics: [],
                topicsLoading: false
            }
        default:
            return state
    }
}

export default topicReducer