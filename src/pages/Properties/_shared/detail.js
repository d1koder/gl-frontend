import React from 'react'
import { Link } from "react-router-dom";
import { Card, Col, Row, Image, ListGroup, Container, Button } from "react-bootstrap";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import Modal from '../../../common/Modal'
//

const Detail = props => {

    const { id, title, category_id, featured_image, rate, description, location } = props.location.state || {}

    // console.log(props)

    const category = () => category_id === 1 ? 'birthday' : category_id === 2 ? 'corporate' : 'wedding'

    const contentStyle = { background: '#fff' };
    const overlayStyle = { background: 'rgba(255,255,255,0.5)' };

    return (
        <>
            <Container>
                <Row>
                    <Link className='btn btn-light my-3' to={`/properties/${category()}`}>Go Back</Link>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col md={6}>
                        <Image src={featured_image} alt={title} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>{title}</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Location: {location}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Rate: ${rate}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card className='border-0'>
                            <ListGroup variant='flush' className="text-center">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <strong>READY TO BOOK?</strong>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Popup trigger={<Button variant="success">PICK A DATE</Button>}
                                                modal {...{ contentStyle, overlayStyle}}>
                                                {close => (
                                                    <>
                                                        <button className="close" onClick={close}>&times;</button>
                                                        <Modal propertyId={id} title={title} finished={() => { close() }} />
                                                    </>
                                                )}
                                            </Popup>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Detail
