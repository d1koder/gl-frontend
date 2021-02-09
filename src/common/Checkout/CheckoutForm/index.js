import React, { Component } from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'
import { UserContext } from '../../../utils/context/userContext'

class CheckoutForm extends Component {

    static contextType = UserContext


    state = {
        complete: false
    }

    handleSubmit = async () => {
        let { token } = await this.props.stripe.createToken({ name: 'Ji Yan' })
        // let response = await fetch(process.env.REACT_APP_API_ENDPOINT + '/charges', {
        let response = await fetch(process.env.REACT_APP_API_ENDPOINT + '/charges', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json;charset=utf-8;',
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            }),
            body: JSON.stringify({
                token: token.id,
                user_id: this.context.state.user_id
            })
        })

        if (response.ok) {
            this.setState({
                complete: true
            })
        }
    }

    render() {
        if (this.state.complete) return <h1>Purchase Complete!</h1>

        return (
            <div >
                <CardElement/>
                <button onClick={this.handleSubmit} >Purchase</button>
            </div>

        )
    }
}

export default injectStripe(CheckoutForm)