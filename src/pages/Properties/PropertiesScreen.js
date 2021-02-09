import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom';
import { Nav, Row, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Wedding from './Wedding';
import Birthday from './Birthday';
import Corporate from './Corporate';

import Test from '../../common/Test'

const Properties = () => {
    return (
        <>
            <Container style={{ paddingTop: '3vh' }}>
                <Nav variant="tabs" as="ul">
                    <Nav.Item as="li">
                        <LinkContainer to="/properties/corporate">
                            <Nav.Link >Corporate</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <LinkContainer to="/properties/wedding">
                            <Nav.Link >Wedding</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <LinkContainer to="/properties/birthday">
                            <Nav.Link >Birthday</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                </Nav>
                <Container>
                    <Row>
                        <Switch>
                            <Route path='/properties/corporate' component={Corporate} />
                            <Route path='/properties/birthday' component={Birthday} />
                            <Route path='/properties/wedding' component={Wedding} />
                            <Redirect to='/properties/corporate' />
                        </Switch>
                    </Row>
                </Container>
            </Container>
            <Test />
        </>
        
    )
}

export default Properties
