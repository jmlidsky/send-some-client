import React, { Component } from 'react'
import config from '../../config'
import ValidationError from '../../components/ValidationError/ValidationError'
import './SignupPage.css'

class SignupPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            email: '',
            username: {
                touched: false,
                value: ''
            },
            password: {
                touched: false,
                value: ''
            },
            confirmPassword: {
                touched: false,
                value: ''
            },
        }
    }

    handleChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handleChangeUsername = (e) => {
        this.setState({
            username: {
                touched: true,
                value: e.target.value
            }

        })
    }

    handleChangePassword = (e) => {
        this.setState({
            password: {
                touched: true,
                value: e.target.value
            }
        })
    }

    handleChangeConfirmPassword = (e) => {
        this.setState({
            confirmPassword: {
                touched: true,
                value: e.target.value
            }
        })
    }

    validateUsername() {
        const username = this.state.username.value.trim()
        if (username.length === 0) {
            return 'Username is required'
        }
        else if (username.length < 3) {
            return 'Username must be at least 3 characters long'
        }
    }

    validatePassword() {
        const password = this.state.password.value.trim()
        if (password.length === 0) {
            return 'Password is required';
        } else if (password.length < 6 || password.length > 20) {
            return 'Password must be between 6 and 20 characters long'
        }
    }

    validateConfirmPassword() {
        const confirmPassword = this.state.confirmPassword.value.trim()
        const password = this.state.password.value.trim()

        if (confirmPassword !== password) {
            return 'Passwords do not match'
        }
    }

    handleSignupSubmit = (e) => {
        e.preventDefault()
        // console.log(this.state.username.value)

        const { email } = this.state
        const username = this.state.username.value
        const password = this.state.password.value
        const newUser = { email, username: username, password: password }
        // console.log(JSON.stringify(newUser))

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
        const usernameError = this.validateUsername()
        const passwordError = this.validatePassword()
        const confirmPasswordError = this.validateConfirmPassword()
        
        return (
            <form className="signup-form" onSubmit={this.handleSignupSubmit}>
                <h3>Sign Up</h3>
                <div>
                    <label htmlFor="signup-form-email">Email</label>
                    <input required type="email" name="email" className="signup-form-email" onChange={this.handleChangeEmail}></input>
                </div>
                <div>
                    <label htmlFor="signup-form-username">Username</label>
                    <input required type="text" name="username" className="signup-form-username" onChange={this.handleChangeUsername}></input>
                    {this.state.username.touched && (<ValidationError message={usernameError} />)}
                </div>
                <div>
                    <label htmlFor="signup-form-password">Password</label>
                    <input required type="password" name="password" className="signup-form-password" onChange={this.handleChangePassword}></input>
                    {this.state.password.touched && (<ValidationError message={passwordError} />)}
                </div>
                <div>
                    <label htmlFor="signup-form-confirm-password">Confirm Password</label>
                    <input required type="password" name="confirm-password" className="signup-form-confirm-password" onChange={this.handleChangeConfirmPassword}></input>
                    {this.state.confirmPassword.touched && (<ValidationError message={confirmPasswordError} />)}
                </div>
                <button className="signup-button" type="submit"
                    disabled={
                        this.validateUsername() ||
                        this.validatePassword() ||
                        this.validateConfirmPassword()
                    }
                >Sign Up</button>
            </form>
        )
    }
}

export default SignupPage