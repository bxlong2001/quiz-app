import { useContext } from "react"
import { Spinner } from "react-bootstrap"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import LayoutRoute from "../LayoutRoute/LayoutRoute"

const ProtectedRoute = ({Component, flag}) => {
    const { authState: {authLoading, isAuthenticated} } = useContext(AuthContext)

    if(authLoading)
        return (
            <div className="d-flex justify-content-center mt-2">
                <Spinner animation='border' variant='info' />
            </div>
        )

    return (
        isAuthenticated ? 
            <LayoutRoute Component={Component} flag={flag}/> 
        :
            <Navigate to='/login' />
    )
}

export default ProtectedRoute