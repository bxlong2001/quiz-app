const examReducer = (state, action) => {
    const {type, payload, total} = action
    console.log(total);
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
        
        case 'EXAMS_TEST_LOADED_SUCCESS':
            return {
                ...state,
                exams: payload.exams,
                examTime: payload.time || null,
                total,
                examsLoading: false
            }

        case 'EXAMS_TEST_LOADED_FAIL':
            return {
                ...state,
                exams: [],
                examTime: null,
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
        case 'DELETE_EXAM':
            return {
                ...state,
                exams: state.exams.filter(exam => exam._id !== payload._id)
            }
            
        case 'UPDATE_EXAM':
            const newExams = state.exams.map(exam => exam._id === payload._id ? payload : exam)

            return {
                ...state,
                exams: newExams
            }

        default:
            return state
    }
}

export default examReducer