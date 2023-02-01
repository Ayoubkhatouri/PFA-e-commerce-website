import React from 'react'
import { Row,Col,Container } from 'react-bootstrap'

const FormContainer = ({children}) => {
  return (
    <Container>
        <Row className=''>
            <Col sm={12} md={12} lg={10} xl={10}>
                {children} {/*all the forms inside formcontainer are the children*/}
            </Col>
        </Row>
    </Container>
  )
}

export default FormContainer