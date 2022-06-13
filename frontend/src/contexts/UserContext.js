import {createContext, useCallback} from 'react'
import axios from 'axios'

const UserContext = createContext()

const UserContextProvider = ({children}) => {
    const updateInfo = useCallback(async (info, id) => {
        try {
            const response = await axios.patch(`http://localhost:8000/me/info/update/${id}`, {fullname: info})
            return response.data
        } catch (error) {
            return error.response.data
				? error.response.data
				: { success: false, message: 'Lỗi server' }
        }
    }, [])

    const userContextData = {updateInfo}

    return (
        <UserContext.Provider value={userContextData}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext}
export default UserContextProvider