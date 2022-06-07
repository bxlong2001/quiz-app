import {createContext, useCallback, useReducer} from 'react'
import axios from 'axios'
import typeReducer from '../reducers/typeReducer'
import userReducer from '../reducers/userReducer'
import examReducer from '../reducers/examReducer'
import statisticReducer from '../reducers/statisticReducer'

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
    const getStatistic = useCallback(async() => {
        try {
            const response = await axios.get('http://localhost:8000/admin/count')
            if(response.data.success)
                statisticDispatch({type: 'STATISTICS_LOADED_SUCCESS', payload: response.data.statistics})
        } catch (error) {
            statisticDispatch({type: 'STATISTICS_LOADED_FAIL'})
        }
    }, [])
    
    const createExam = useCallback(async(createForm) => {
        try {
            const response = await axios.post('http://localhost:8000/admin/exams/create', createForm)
            alert(response.data.message)
        } catch (error) {
            return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
        }
    }, [])
    
    const getTypes = useCallback(async() => {
        try {
            const response = await axios.get('http://localhost:8000/admin/exams')
            if (response.data.success)
                typeDispatch({type: 'TYPES_LOADED_SUCCESS', payload: response.data.types})
        } catch (error) {
            typeDispatch({type: 'TYPES_LOADED_FAIL'})
        }
    },[])

    const getUsers = useCallback(async() => {
        try {
            const response = await axios.get('http://localhost:8000/admin/users')
            if (response.data.success)
                userDispatch({type: 'USERS_LOADED_SUCCESS', payload: response.data.users})
        } catch (error) {
            userDispatch({type: 'USERS_LOADED_FAIL'})
        }
    }, [])

    const getAllExams = useCallback(async (slug, page, pagesize) => {
        try {
            const response = await axios.get(`http://localhost:8000/admin/exams/${slug}`, {params: {page: page, pagesize: pagesize}})
            if (response.data.success)
                examDispatch({type: 'EXAMS_LOADED_SUCCESS', payload: response.data.exams, total: response.data.totalCount})
        } catch (error) {
            examDispatch({type: 'EXAMS_LOADED_FAIL'})
        }
    }, [])

    const updateExam = useCallback(async (exam) => {
        try {
            const response = await axios.put(`http://localhost:8000/admin/exams/update/${exam._id}`, exam)
            if(response.data.success)
                alert(response.data.message)
        } catch (error) {
            return error.response.data
				? error.response.data
				: { success: false, message: 'Lỗi server' }
        }
    }, [])

    const deleteExam = useCallback(async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/admin/exams/delete/${id}`)
            if(response.data.success)
                alert(response.data.message)
        } catch (error) {
            return error.response.data
				? error.response.data
				: { success: false, message: 'Lỗi server' }
        }
    }, [])

    const deleteUser = useCallback(async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/admin/users/delete/${id}`)
            if(response.data.success)
                alert(response.data.message)
        } catch (error) {
            return error.response.data
				? error.response.data
				: { success: false, message: 'Lỗi server' }
        }
    }, [])
    
    const adminContextData = {typeState, getTypes, userState, getUsers, examState, getAllExams, statisticState, getStatistic, updateExam, createExam, deleteExam, deleteUser}

    return (
        <AdminContext.Provider value={adminContextData}>
            {children}
        </AdminContext.Provider>
    )
}

export {AdminContext}
export default AdminContextProvider