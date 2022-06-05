import { useContext } from "react"
import { Col, Container, Row, Spinner } from "react-bootstrap"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import NavbarAptest from "../layout/NavbarAptest"
import CategoryAdmin from "../layout/CategoryAdmin"

const ProtectedAdmin = ({Component, flag}) => {
    const { authState: {authLoading, isAuthenticated, user} } = useContext(AuthContext)
    
    let body = null
    
    if(authLoading)
        return body = (
            <div className="d-flex justify-content-center mt-2">
                <Spinner animation='border' variant='info' />
            </div>
        )
    
    if(isAuthenticated)
        if(user.admin)
            body = (
                <Container className="container-page">
                    <NavbarAptest />
                    {!flag?
                    <Row>
                        <Col sm={2}>
                            <CategoryAdmin/>
                        </Col>
                        <Col sm={10}>
                            <Component/>
                        </Col>
                    </Row>:
                    <Component/>
                    }
                </Container>
            )
        else
            body = (
                <Navigate to='/login' />
            )
    else
        body = (
            <Navigate to='/login' />
        )

    return (
        <>
            {body}        
        </>
    )
}

export default ProtectedAdmin