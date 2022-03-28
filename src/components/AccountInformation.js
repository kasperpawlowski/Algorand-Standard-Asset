import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function AccountInformation(props) {
    return (
        <Accordion className="w-100 m-auto mt-4">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Held Assets</Accordion.Header>
                <Accordion.Body className="text-start">
                    {props.data.assets.length ? 
                    <Container>
                        <Row>
                            <Col>Asset ID</Col>
                            <Col>Name</Col>
                            <Col>Symbol</Col>
                            <Col>Amount</Col>
                        </Row>
                        {props.data.assets.map((element, index) => {
                            return (
                                <Row key={index}>
                                    <Col>{element.index}</Col>
                                    <Col>{element.params.name}</Col>
                                    <Col>{element.params['unit-name']}</Col>
                                    <Col>{element.amount}</Col>
                                </Row>
                            )
                        })}
                    </Container> : 
                    <></>}
                    <p className="mt-4">{`Test ALGO Balance: ${props.data.amount/10**6}`}</p>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Created Assets</Accordion.Header>
                <Accordion.Body className="text-start">
                    {props.data['created-assets'].length ? 
                    <Container>
                        <Row>
                            <Col>Asset ID</Col>
                            <Col>Name</Col>
                            <Col>Symbol</Col>
                            <Col>Decimals</Col>
                            <Col>Total</Col>
                        </Row>
                        {props.data['created-assets'].map((element, index) => {
                            return (
                                <Row key={index}>
                                    <Col>{element.index}</Col>
                                    <Col>{element.params.name}</Col>
                                    <Col>{element.params['unit-name']}</Col>
                                    <Col>{element.params.decimals}</Col>
                                    <Col>{element.params.total}</Col>
                                </Row>
                            )
                        })}
                    </Container> : 
                    <></>}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}
