import {createContext, useCallback} from 'react'
import axios from 'axios'
import FormData from 'form-data'


const UserContext = createContext()

const UserContextProvider = ({children}) => {
    const updateInfo = useCallback(async (info, id) => {
        try {
            const response = await axios.patch(`http://localhost:8000/me/info/${id}/update-fullname`, {fullname: info})
            return response.data
        } catch (error) {
            return error.response.data
				? error.response.data
				: { success: false, message: 'Lỗi server' }
        }
    }, [])

    const updateImg = async (img, id, oldFile) => {
        const formData = new FormData();
        formData.append('avt', img, img.name)

        const config = {
            headers: {
                "Content-Type": 'multipart/form-data; boundary=XXX;'
            }
        }
        try {
            const response = await axios.patch(`http://localhost:8000/me/info/${id}/update-avatar`, formData, oldFile, config)
            return response.data
        } catch (error) {
            return error.response.data
				? error.response.data
				: { success: false, message: 'Lỗi server' }
        }
    }

    const updatePassword = async (img, id, oldFile) => {

        try {
            const response = await axios.patch(`http://localhost:8000/me/info/${id}/update-password`)
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