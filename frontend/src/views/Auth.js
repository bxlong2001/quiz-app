import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import Spinner from 'react-bootstrap/Spinner'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'

const Auth = ({ authRoute }) => {
    const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext)

    let body

    if (authLoading)
        body = (
            <div className='d-flex justify-content-center mt-2'>
                <Spinner animation='border' variant='info' />
            </div>
        )
    else if (isAuthenticated)
        body = (
            <Navigate to='/' as={Link}/>
        )
    else
        body = (
            <>
                {authRoute === 'login' && <LoginForm />}
                {authRoute === 'register' && <RegisterForm />}
            </>
        )


    return (
        <div className='wallpaper'>
            <div className='dark-overlay'>
                <div className='wrap'>
                    <h1>APTEST</h1>
                    <h5>"Hãy học khi người khác ngủ, lao động khi người khác lười nhác, <br/> chuẩn bị khi người khác chơi bời và có được giấc mơ của mình khi mọi người chỉ ao ước"</h5>
                    {body}
                </div>
            </div>
        </div>
    )
}

export default Auth