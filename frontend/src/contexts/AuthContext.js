import {createContext, useEffect, useReducer} from 'react'
import axios from 'axios'
import authReducer from '../reducers/authReducer'
import setAuthToken from '../utils/setAuthToken'
import {apiUrl, LOCAL_STORAGE_TOKEN_NAME} from './constaints'

const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [authState, authDispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    })

    //Authenticate user
    const loadUser = async () => {
		if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
			setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
		}

		try {
			const response = await axios.get(apiUrl + 'auth')
			if (response.data.success) {
				authDispatch({
					type: 'SET_AUTH',
					payload: { isAuthenticated: true, user: response.data.user}
				})
			}
		} catch (error) {
			localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
			setAuthToken(null)
			authDispatch({
				type: 'SET_AUTH',
				payload: { isAuthenticated: false, user: null}
			})
		}
	}

	useEffect(() => {loadUser()}, [])
    //Register
    const registerUser = async registerForm => {
        try {
            const response = await axios.post(apiUrl + 'auth/register', registerForm)
            if(response.data.success)
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME,response.data.accessToken)

            await loadUser()

            return response.data
        } catch (error) {
            if (error.response.data)
                return error.response.data
            else
                return {success: false, message: error.message}
        }
    }

    //Login
    const loginUser = async loginForm => {
        try {
            const response = await axios.post(apiUrl + 'auth/login', loginForm)
            if(response.data.success)
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME,response.data.accessToken)

            await loadUser()

            return response.data
        } catch (error) {
            if (error.response.data)
                return error.response.data
            else
                return {success: false, message: error.message}
        }
    }

    //Logout
    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
			setAuthToken(null)
			authDispatch({
				type: 'SET_AUTH',
				payload: { isAuthenticated: false, user: null }
			})
    }

    //Context data
    const authContextData = { loginUser, registerUser, logoutUser, authState, authDispatch}

    //return provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext}
export default AuthContextProvider