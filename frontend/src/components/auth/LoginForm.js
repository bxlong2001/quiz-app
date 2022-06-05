import {useContext, useState} from 'react'
import {Button} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const LoginForm = () => {
    const {loginUser} = useContext(AuthContext)
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })

    const [alert, setAlert] = useState(null)
    const {username, password} = loginForm

    const login = async (e) => {
        e.preventDefault()

        try {
            const loginData = await loginUser(loginForm)
            if(!loginData.success){
                setAlert({type: 'danger', message: loginData.message})
                setTimeout(() => setAlert(null), 3000)
            }       
        } catch (error) {
            console.log(error);
        }
    }

    const handleLogin = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
            <Form onSubmit={login}>
                <Form.Group>
                    <Form.Control
                        type='text'
                        placeholder='Nhập tài khoản'
                        name='username'
                        required
                        value={username}
                        onChange={handleLogin}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type='password'
                        placeholder='Nhập mật khẩu'
                        name='password'
                        required
                        value={password}
                        onChange={handleLogin}
                    />
                </Form.Group>
                <AlertMessage info={alert}/>
                <Button variant='success' type='submit' size='lg' >Đăng nhập</Button>
            </Form>
            <p>Bạn chưa có tài khoản? 
                <Link to='/register'>
                    <Button variant='info' size='sm'>Đăng ký</Button>
                </Link>
            </p>
        </>
      )
}

export default LoginForm