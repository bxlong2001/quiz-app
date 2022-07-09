import axios from "axios";
import { createContext, useReducer } from "react";
import examReducer from "../reducers/examReducer";
import resultReducer from "../reducers/resultReducer";
import {apiUrl} from './constaints'


const ExamContext = createContext()

const ExamContextProvider = ({children}) => {
    //State
    const [examState, examDispatch] = useReducer(examReducer, {
        topics: [],
        exams: [],
        examTime: null,
        subjects: [],
        trialExams: [],
        topicsLoading: true,
        examsLoading: true,
        subjectsLoading: true,
        trialExamsLoading: true,
    })

    const [resultState, resultDispatch] = useReducer(resultReducer, {
        maxResults: [],
        results: [],
        maxResultsLoading: true,
        resultsLoading: true
    })


    const getTopic = async() => {
        try {
            const response = await axios.get(apiUrl + 'exams')
            if (response.data.success) {
                examDispatch({type: 'TOPICS_LOADED_SUCCESS', payload: response.data.topics})
            }

        } catch (error) {
            examDispatch({type: 'TOPICS_LOADED_FAIL'})
        }
    }

    //Get random exams
    const getExams = async(slug, cancelRequest) => {
        try {
            const response = await axios.get(apiUrl + `exams/test/${slug}`, {
                cancelToken: cancelRequest.token,
            })
            
            if (response.data.success) {
                examDispatch({type: 'EXAMS_TEST_LOADED_SUCCESS', payload: {exams: response.data.exams, time: response.data.time.type[0].time}})
            }

        } catch (error) {
            examDispatch({type: 'EXAMS_TEST_LOADED_FAIL'})
        }
    }

    //Get trial exams
    const getTrialExams = async(slug) => {
        try {
            const response = await axios.get(apiUrl + `exams/try/${slug}`)
            if (response.data.success) {
                examDispatch({type: 'TRIALEXAMS_LOADED_SUCCESS', payload: response.data.exams})
            }

        } catch (error) {
            examDispatch({type: 'TRIALEXAMS_LOADED_FAIL'})
        }
    }

    const getSubjects = async() => {
        try {
            const response = await axios.get(apiUrl + 'exams/subjects')
            if (response.data.success) {
                examDispatch({type: 'SUBJECTS_LOADED_SUCCESS', payload: response.data.subjects})
            }

        } catch (error) {
            examDispatch({type: 'SUBJECTS_LOADED_FAIL'})
        }
    }

    const saveResult = async (examForm) => {
        try {
            const response = await axios.post(apiUrl + 'results/save', examForm)
            return response.data
        } catch (error) {
            if (error.response.data)
                return error.response.data
            else
                return {success: false, message: error.message}
        }
    }

    //Get all results
    const getResults = async() => {
        try {
            const response = await axios.get(apiUrl + 'results')
            if(response.data.success)
                resultDispatch({type: 'RESULTS_LOADED_SUCCESS', payload: response.data.results})
        } catch (error) {
            resultDispatch({type: 'RESULTS_LOADED_FAIL'})
        }
    }

    const getRanks = async(slug) => {
        try {
            const response = await axios.get(apiUrl + `results/rank/${slug}`)
            if(response.data.success)
                resultDispatch({type: 'MAXRESULTS_LOADED_SUCCESS', payload: response.data.results})
        } catch (error) {
            resultDispatch({type: 'MAXRESULTS_LOADED_FAIL'})
        }
    }

    const examContextData = {examState, examDispatch, resultState, resultDispatch, saveResult, getExams, getTopic, getResults, getSubjects, getTrialExams, getRanks}

    return (
        <ExamContext.Provider value={examContextData}>
            {children}
        </ExamContext.Provider>
    )


}

export {ExamContext}
export default ExamContextProvider