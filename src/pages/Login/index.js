import React, { useContext} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { UserContext } from '../../utils/context/userContext'
import { Form, Row, Col, Button } from 'react-bootstrap'
import FormContainer from '../../common/FormContainer'

import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const history = useHistory()

    const { dispatch } = useContext(UserContext)

    const { register, handleSubmit, errors } = useForm({ mode: "onChange" });

    const onSubmit = (formData) => {

        const email = formData.email
        const password = formData.password

        const request = { "email": email, "password": password }

        const requestOptions = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json;charset=utf-8;',
            }),
            body: JSON.stringify(request)
        }

        fetch(process.env.REACT_APP_API_ENDPOINT + '/auth/login', requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then(result => {
                console.log(result);
                toast.success('Welcome!')
                dispatch({
                    type: "USER_LOGIN_SUCCESS",
                    payload: {
                        username: result.username,
                        jwt: result.jwt,
                        user_id: result.user_id
                    }
                })
                history.push('/')
            })
            .catch(error => {
                const detail = error.json();
                detail.then(message => {
                    if (message.error) {
                        toast.error(`${message.error}`)
                    }
                    dispatch({
                        type: "USER_LOGIN_FAIL",
                        payload: detail
                    })
                });
            })
    }

    return (
        <FormContainer>
            <h1 style={{ marginTop: "10vh", marginBottom: "5vh" }}>Log In</h1>
            <Form onSubmit={handleSubmit(onSubmit)} data-testid="loginForm">

                <Form.Group controlId="email">
                    <Form.Label >Email: </Form.Label>
                    <Form.Control
                        name="email"
                        type="email"
                        ref={register({ required: true })}
                    />
                </Form.Group>
                {errors.email && <><div>&nbsp;*Email is required</div><br /></>}

                <Form.Group controlId="password">
                    <Form.Label >Password:</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        ref={register({ required: true })}
                    />
                </Form.Group>
                {errors.password && <div>&nbsp;*Password is required</div>}
                <br />
                <Button type="submit" variant='primary'>
                    Sign In
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer? <Link to='/sign_up' data-testid="sign_up">Let's sign up!</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default Login
