import { Col, Container, Row} from "react-bootstrap"
import NavbarAptest from "../../layout/NavbarAptest/NavbarAptest"
import CategoryAptest from "../../layout/CategoryAptest/CategoryAptest"
import { FooterAptest } from "../../layout/FooterAptest/FooterAptest"

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
            <FooterAptest />
        </Container>
    )
}

export default LayoutRoute