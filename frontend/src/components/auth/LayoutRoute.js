import { Col, Container, Row} from "react-bootstrap"
import NavbarAptest from "../layout/NavbarAptest"
import CategoryAptest from "../layout/CategoryAptest"

const LayoutRoute = ({Component, flag}) => {
    return (
        <Container className="container-page">
            <NavbarAptest />
            {!flag?
                <Row>
                    <Col sm={2}>
                        <CategoryAptest />
                    </Col>
                    <Col sm={10}>
                        <Component />
                    </Col>
                </Row>:
                <Component/>
            }
        </Container>
    )
}

export default LayoutRoute