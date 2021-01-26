import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Wedding from './Wedding';
import Birthday from './Birthday';
import Corporate from './Corporate';

const Properties = () => {
    return (
        <div>
            <h3>Properties</h3>
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
            <Switch>
                <Route path='/properties/corporate' component={Corporate} />
                <Route path='/properties/birthday' component={Birthday} />
                <Route path='/properties/wedding' component={Wedding} />
                <Redirect to='/properties/corporate' />
            </Switch>
        </div>
    )
}

export default Properties