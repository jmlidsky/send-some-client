import React, { Component } from 'react'
import config from '../../config'
import Context from '../../Context'
import TokenService from '../../services/token-service'
import './LoginPage.css'

class LoginPage extends Component {
    static contextType = Context

    constructor(props) {
        super(props);
        this.state = {
            error: null,
        }
    }

    handleSubmitJwtAuth = e => {
        e.preventDefault()

        this.setState({
            error: null
        })

        const username = e.target.username.value
        const password = e.target.password.value

        // console.log(username, password)
        fetch(`${config.API_ENDPOINT}/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ username, password }),
        })
            .then(res => {
                return !res.ok
                    ? res.json().then(e => Promise.reject(e))
                    : res.json();
            })
            .then(user => {
                // console.log(user)
                TokenService.saveAuthToken(user.authToken)
                console.log("saveAuthToken fired")
                this.props.history.push("/locations")
                // this.context.updateAuthToken()
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        return (
            <form className="login-form" onSubmit={this.handleSubmitJwtAuth}>
                <h3>Log In</h3>
                <div>
                    <label htmlFor="login-form-username">Username</label>
                    <input required name="username" className="login-form-username"></input>
                </div>
                <div>
                    <label htmlFor="login-form-username">Password</label>
                    <input required name="password" className="login-form-password"></input>
                </div>
                <button className="login-button">Log In</button>
            </form>
        )
    }
}

export default LoginPage