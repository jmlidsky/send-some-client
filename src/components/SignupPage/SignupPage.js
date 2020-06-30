import React, { Component } from 'react'
import config from '../../config'
import './SignupPage.css'

class SignupPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
        }
    }

    handleChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handleChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handleChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleChangeConfirmPassword = (e) => {
        this.setState({
            confirmPassword: e.target.value
        })
    }

    handleSignupSubmit = (e) => {
        e.preventDefault()

        const { email, username, password } = this.state
        const newUser = { email, username, password }

        fetch(`${config.API_ENDPOINT}/auth/signup`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(error => Promise.reject(error))
            })
            .then(() => {
                this.props.history.push("/login")
            })
            .catch(error => {
                console.log(error)
                this.setState({ error })
            })
    }

    render() {
        return (
            <form className="signup-form" onSubmit={this.handleSignupSubmit}>
                <h3>Sign Up</h3>
                <div>
                    <label htmlFor="signup-form-email">Email</label>
                    <input required name="email" className="signup-form-email" onChange={this.handleChangeEmail}></input>
                </div>
                <div>
                    <label htmlFor="signup-form-username">Username</label>
                    <input required name="username" className="signup-form-username" onChange={this.handleChangeUsername}></input>
                </div>
                <div>
                    <label htmlFor="signup-form-password">Password</label>
                    <input required type="password" name="password" className="signup-form-password" onChange={this.handleChangePassword}></input>
                </div>
                <div>
                    <label htmlFor="signup-form-confirm-password">Confirm Password</label>
                    <input required type="password" name="confirm-password" className="signup-form-confirm-password" onChange={this.handleChangeConfirmPassword}></input>
                </div>
                <button className="signup-button">Sign Up</button>
            </form>
        )
    }
}

export default SignupPage