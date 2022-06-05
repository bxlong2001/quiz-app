import { useContext, useState } from 'react'
import {Button} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const RegisterForm = () => {
    //Context
    const {registerUser} = useContext(AuthContext)

    //Local state
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

    const [alert, setAlert] = useState(null)
    const {username, password, confirmPassword} = registerForm

    const handleRegister = (e) => {
        setRegisterForm({
            ...registerForm,
            [e.target.name]: e.target.value
        })
    }

    const register = async (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            setAlert({type: 'danger', message: 'Mật khẩu không khớp'})
            setTimeout(() => setAlert(null), 3000)
            return
        }

        try {
            const registerData = await registerUser(registerForm)
            if(!registerData.success) {
                setAlert({type: 'danger', message: registerData.message})
                setTimeout(() => setAlert(null), 3000)
            }
        } catch (error) {
            console.log(error);
        }
    }

    

    return (
    <>
        <Form onSubmit={register}>
            <Form.Group>
                <Form.Control
                    type='text'
                    placeholder='Nhập tài khoản'
                    name='username'
                    required
                    value={username}
                    onChange={handleRegister}
                />
            </Form.Group>
            {/* <Form.Group>
                <Form.Control
                    type='text'
                    placeholder='Input email'
                    name='email'
                    required
                />
            </Form.Group> */}
            <Form.Group>
                <Form.Control
                    type='password'
                    placeholder='Nhập mật khẩu'
                    name='password'
                    required
                    value={password}
                    onChange={handleRegister}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type='password'
                    placeholder='Nhập lại mật khẩu'
                    name='confirmPassword'
                    required
                    value={confirmPassword}
                    onChange={handleRegister}
                />
            <AlertMessage info={alert}/>
            </Form.Group>
            <Button variant='success' type='submit' size='lg'>Đăng ký</Button>
        </Form>
        <p>Bạn có đã có tài khoản? 
            <Link to='/login'>
                <Button variant='info' size='sm'>Đăng nhập</Button>
            </Link>
        </p>
    </>
    )
}

export default RegisterForm