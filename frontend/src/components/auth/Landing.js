import { useContext } from 'react'
import { Spinner } from 'react-bootstrap'
import {Link, Navigate} from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

const Landing = () => {
    const {authState: {authLoading, isAuthenticated, user}} = useContext(AuthContext)
    let body = null
    if(authLoading)
        return body = (
            <div className="d-flex justify-content-center mt-2">
                <Spinner animation='border' variant='info' />
            </div>
        )


    if(isAuthenticated){
        if(user.admin)    
            body = (
                <Navigate to='/admin' as={Link}/>
            )
        else
            body = (
                <Navigate to='/home' as={Link}/>
            )
            
    }else
        body = (
            <Navigate to='/home' as={Link}/>
        )
        
    return (
        <>
            {body}        
        </>
    )
}

export default Landing