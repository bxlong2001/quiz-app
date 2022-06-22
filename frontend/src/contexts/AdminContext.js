import {createContext, useReducer} from 'react'
import axios from 'axios'
import typeReducer from '../reducers/typeReducer'
import userReducer from '../reducers/userReducer'
import examReducer from '../reducers/examReducer'
import statisticReducer from '../reducers/statisticReducer'
import {apiUrl} from './constaints'

const AdminContext = createContext()

const AdminContextProvider = ({children}) => {
    const [statisticState, statisticDispatch] = useReducer(statisticReducer, {
        statistics: [],
        statisticsLoading: true
    })

    const [typeState, typeDispatch] = useReducer(typeReducer, {
        types: [],
        typesLoading: true
    })

    const [userState, userDispatch] = useReducer(userReducer, {
        users: [],
        usersLoading: true
    })

    const [examState, examDispatch] = useReducer(examReducer, {
        exams: [],
        total: null,
        examsLoading: true
    })

    // Lấy số liệu được thống kê
    const getStatistic = async() => {
        try {
            const response = await axios.get(apiUrl + 'admin/count')
            if(response.data.success)
                statisticDispatch({type: 'STATISTICS_LOADED_SUCCESS', payload: response.data.statistics})
        } catch (error) {
            statisticDispatch({type: 'STATISTICS_LOADED_FAIL'})
        }
    }
    
    const createExam = async(createForm, img) => {
        try {
            let form

            if(img){
                const formData = new FormData()
                formData.append('img-quiz', img)
                
                const config = {
                    headers: {
                        "Content-Type": 'multipart/form-data; boundary=XXX;'
                    }
                }

                const response1 = await axios.post(apiUrl + 'admin/exams/save-img', formData, config)
                if (!response1.data.success)
                    return response1.data
                
                form = {...createForm, img: response1.data.imgPath}
            }
            
            const response2 = await axios.post(apiUrl + 'admin/exams/create', form || createForm)
            return response2.data
        } catch (error) {
            return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
        }
    }
    
    const getTypes = async() => {
        try {
            const response = await axios.get(apiUrl + 'admin/exams')
            if (response.data.success)
                typeDispatch({type: 'TYPES_LOADED_SUCCESS', payload: response.data.types})
        } catch (error) {
            typeDispatch({type: 'TYPES_LOADED_FAIL'})
        }
    }

    const getUsers = async() => {
        try {
            const response = await axios.get(apiUrl + 'admin/users')
            if (response.data.success)
                userDispatch({type: 'USERS_LOADED_SUCCESS', payload: response.data.users})
        } catch (error) {
            userDispatch({type: 'USERS_LOADED_FAIL'})
        }
    }

    const getAllExams = async (slug, page, pagesize) => {
        try {
            const response = await axios.get(apiUrl + `admin/exams/${slug}`, {params: {page: page, pagesize: pagesize}})
            if (response.data.success)
                examDispatch({type: 'EXAMS_LOADED_SUCCESS', payload: response.data.exams, total: response.data.totalCount})
        } catch (error) {
            examDispatch({type: 'EXAMS_LOADED_FAIL'})
        }
    }

    const updateExam = async (exam) => {
        try {
            const response = await axios.put(apiUrl + `admin/exams/update/${exam._id}`, exam)
            if(response.data.success)
                examDispatch({type: 'UPDATE_EXAM', payload: response.data.exam})
            return response.data
        } catch (error) {
            return error.response.data
				? error.response.data
				: { success: false, message: 'Lỗi server' }
        }
    }

    const deleteExam = async (id) => {
        try {
            const response = await axios.delete(apiUrl + `admin/exams/delete/${id}`)
            if(response.data.success)
                examDispatch({type: 'DELETE_EXAM', payload: response.data.exam})
                return response.data
        } catch (error) {
            return error.response.data
				? error.response.data
				: { success: false, message: 'Lỗi server' }
        }
    }

    const deleteUser = async (id) => {
        try {
            const response = await axios.delete(apiUrl + `admin/users/delete/${id}`)
            if(response.data.success)
                userDispatch({type: 'DELETE_USER', payload: response.data.user})
            return response.data
        } catch (error) {
            return error.response.data
				? error.response.data
				: { success: false, message: 'Lỗi server' }
        }
    }
    
    const adminContextData = {typeState, getTypes, userState, getUsers, examState, getAllExams, statisticState, getStatistic, updateExam, createExam, deleteExam, deleteUser}

    return (
        <AdminContext.Provider value={adminContextData}>
            {children}
        </AdminContext.Provider>
    )
}

export {AdminContext}
export default AdminContextProvider