import {createContext, useContext} from 'react'
import axios from 'axios'
import FormData from 'form-data'
import {apiUrl} from './constaints'
import { AuthContext } from './AuthContext'


const UserContext = createContext()

const UserContextProvider = ({children}) => {
    const {authDispatch} = useContext(AuthContext)

    const updateInfo = async (info, id) => {
        try {
            const response = await axios.patch(apiUrl + `me/info/${id}/update-fullname`, {fullname: info})
            if(response.data.success)
                authDispatch({type: 'UPDATE_FULLNAME', payload: {user: response.data.info.fullname}})
            console.log(response.data.info.fullname);
            return response.data
        } catch (error) {
            return error.response.data
				? error.response.data
				: { success: false, message: 'Lỗi server' }
        }
    }

    const updateImg = async (img, id, oldFile) => {
        const formData = new FormData();
        formData.append('avt', img, img.name)

        const config = {
            headers: {
                "Content-Type": 'multipart/form-data; boundary=XXX;'
            }
        }
        try {
            const response = await axios.patch(apiUrl + `me/info/${id}/update-avatar`, formData, oldFile, config)
            if(response.data.success)
                authDispatch({type: 'UPDATE_AVT', payload: {user: response.data.info.avt}})
            return response.data
        } catch (error) {
            return error.response.data
				? error.response.data
				: { success: false, message: 'Lỗi server' }
        }
    }

    const updatePassword = async (img, id, oldFile) => {

        try {
            const response = await axios.patch(apiUrl + `me/info/${id}/update-password`)
            return response.data
        } catch (error) {
            return error.response.data
				? error.response.data
				: { success: false, message: 'Lỗi server' }
        }
    }

    const userContextData = {updateInfo, updateImg, updatePassword}

    return (
        <UserContext.Provider value={userContextData}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext}
export default UserContextProvider