import {createContext, useEffect, useReducer} from 'react'
import axios from 'axios'
import authReducer from '../reducers/authReducer'
import setAuthToken from '../utils/setAuthToken'

const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    })

    //Authenticate user
    const loadUser = async () => {
		if (localStorage['access_token']) {
			setAuthToken(localStorage['access_token'])
		}

		try {
			const response = await axios.get('http://localhost:8000/auth')
			if (response.data.success) {
				dispatch({
					type: 'SET_AUTH',
					payload: { isAuthenticated: true, user: response.data.user}
				})
			}
		} catch (error) {
			localStorage.removeItem('access_token')
			setAuthToken(null)
			dispatch({
				type: 'SET_AUTH',
				payload: { isAuthenticated: false, user: null}
			})
		}
	}

	useEffect(() => {loadUser()}, [])
    //Register
    const registerUser = async registerForm => {
        try {
            const response = await axios.post('http://localhost:8000/auth/register', registerForm)
            if(response.data.success)
                localStorage.setItem('access_token',response.data.accessToken)

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
            const response = await axios.post('http://localhost:8000/auth/login', loginForm)
            if(response.data.success)
                localStorage.setItem('access_token',response.data.accessToken)

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
        localStorage.removeItem('access_token')
			setAuthToken(null)
			dispatch({
				type: 'SET_AUTH',
				payload: { isAuthenticated: false, user: null }
			})
    }

    //Context data
    const authContextData = { loginUser, registerUser, logoutUser, authState}

    //return provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext}
export default AuthContextProvider