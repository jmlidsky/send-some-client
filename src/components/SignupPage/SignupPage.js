import React, { Component } from 'react'
import config from '../../config'
import Context from '../../Context'
import './SignupPage.css'

class SignupPage extends Component {
    static contextType = Context

    constructor(props) {
        super(props);
        this.state = {
            error: null,
        }
    }

    handleSignupSubmit = (e) => {
        e.preventDefault()

        this.setState({
            error: null
        })

        const email = e.target.email.value
        const username = e.target.username.value
        const password = e.target.password.value

        console.log(email, username, password)

        fetch(`${config.API_ENDPOINT}/auth/signup`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ email, username, password }),
        })
            .then(res => {
                    (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
                    // console.log(res)
            })
            .then(res => {
                // want the user to login after signing up
                // TokenService.saveAuthToken()
                this.props.history.push("/login")
                // this.context.updateAuthToken()
            })
    }

    render() {
        return (
            <form className="signup-form" onSubmit={this.handleSignupSubmit}>
                <h3>Sign Up</h3>
                <div>
                    <label htmlFor="signup-form-email">Email</label>
                    <input required name="email" className="signup-form-email"></input>
                </div>
                <div>
                    <label htmlFor="signup-form-username">Username</label>
                    <input required name="username" className="signup-form-username"></input>
                </div>
                <div>
                    <label htmlFor="signup-form-password">Password</label>
                    <input required name="password" className="signup-form-password"></input>
                </div>
                <div>
                    <label htmlFor="signup-form-confirm-password">Confirm Password</label>
                    <input required name="confirm-password" className="signup-form-confirm-password"></input>
                </div>
                <button className="signup-button">Sign Up</button>
            </form>
        )
    }
}

export default SignupPage