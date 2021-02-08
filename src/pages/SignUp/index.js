import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { UserContext } from '../../utils/context/userContext'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../../common/FormContainer'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignUp = () => {

    const history = useHistory()

    const { dispatch } = useContext(UserContext)

    const { register, handleSubmit, errors } = useForm({ mode: "onChange" });

    const onSubmit = (formData) => {

        const username = formData.username
        const email = formData.email
        const password = formData.password
        const password_confirmation = formData.password_confirmation
        const admin = false

        const request = { "username": username, "email": email, "password": password, "password_confirmation": password_confirmation, "admin": admin }

        const requestOptions = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json;charset=utf-8;',
            }),
            body: JSON.stringify(request)
        }

<<<<<<< HEAD

        fetch(process.env.REACT_APP_API_ENDPOINT + '/auth/sign_up', requestOptions)
=======
        // fetch(process.env.REACT_APP_API_ENDPOINT + '/auth/sign_up', requestOptions)
        fetch('http://localhost:3000/api' + '/auth/sign_up', requestOptions)
>>>>>>> b9e3712753bd592924377836c8f5ba57aa60900f
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then(result => {
                console.log(result);
                dispatch({
                    type: "USER_SIGNUP_SUCCESS",
                    payload: {
                        username: result.username,
                        jwt: result.jwt
                    }
                })
                history.push('/')
            })
            .catch(error => {
                const detail = error.json()
                detail.then(message => {
                    console.log(message);
                    if (message.username) {
                        toast.error('This username has been taken')
                    }
                    if (message.email) {
                        toast.error('This email has been taken')
                    }
                    if (message.password_confirmation) {
                        toast.error('The Password and confirmation don\'t match')
                    }
                    dispatch({
                        type: "USER_SIGNUP_FAIL",
                        payload: detail
                    })
                });
            })
    }



    return (
        <FormContainer>
            <h1 style={{ marginTop: "10vh", marginBottom: "5vh" }}>
                Sign Up
            </h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="username">
                    <Form.Label>Username: </Form.Label>
                    <Form.Control
                        name="username"
                        type="input"
                        ref={register({ required: true })}
                    />
                </Form.Group>
                {errors.username && <><div>&nbsp;*Username is required</div><br /></>}

                <Form.Group controlId="email">
                    <Form.Label>Email: </Form.Label>
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
                        ref={register({
                            required: true,
                            minLength: {
                                value: 6,
                                message: '*must be 6 chars'
                            },
                            validate: (value) => {
                                return (
                                    [/[^a-zA-Z0-9]/].every(pattern => pattern.test(value))
                                ) || '*must include a special char'
                            }
                        })}
                    />
                </Form.Group>
                {errors.password && <><div>&nbsp;{errors.password.message}</div><br /></>}

                <Form.Group controlId="password_confirmation">
                    <Form.Label>Password Confirmation:</Form.Label>
                    <Form.Control
                        name="password_confirmation"
                        type="password"
                        ref={register({ required: true })}
                    />
                </Form.Group>
                {errors.password_confirmation && <><div>&nbsp;*Password confirmation is required</div></>}
                <br />
                <Button type="submit">
                    Sign Up
                </Button>
            </Form>
        </FormContainer>
    )
}

export default SignUp
