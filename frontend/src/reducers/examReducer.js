const examReducer = (state, action) => {
    const {type, payload, total} = action
    
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
        case 'EXAMS_LOADED_SUCCESS':
            return {
                ...state,
                exams: payload,
                total,
                examsLoading: false
            }
        case 'EXAMS_LOADED_FAIL':
            return {
                ...state,
                exams: [],
                examsLoading: false
            }
        case 'SUBJECTS_LOADED_SUCCESS':
            return {
                ...state,
                subjects: payload,
                subjectsLoading: false
            }
        case 'SUBJECTS_LOADED_FAIL':
            return {
                ...state,
                subjects: [],
                subjectsLoading: false
            }
        case 'TRIALEXAMS_LOADED_SUCCESS':
            return {
                ...state,
                trialExams: payload,
                trialExamsLoading: false
            }
        case 'TRIALEXAMS_LOADED_FAIL':
            return {
                ...state,
                trialExams: [],
                trialExamsLoading: false
            }
            
        case 'UPDATE_EXAM':
            return {
                ...state,
                exams: [...state.exams, payload]
            }

        default:
            return state
    }
}

export default examReducer