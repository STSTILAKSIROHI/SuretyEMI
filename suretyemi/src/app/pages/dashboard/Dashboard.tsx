import React from 'react'
import Card from 'react-bootstrap/esm/Card'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'

const Dashboard = () => {
    return (
        <div className='mt-3 ' >
            <Row>
                <Col sm={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Earning</Card.Title>

                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={4}>

                </Col>
                <Col sm={4}>

                </Col>
                <Col sm={4}>

                </Col>

            </Row>
        </div>
    )
}

export default Dashboard
