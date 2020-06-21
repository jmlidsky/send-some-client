import React, { Component } from 'react'
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

    handleLoginSuccess = e => {
        e.preventDefault()
        this.setState({ error: null })
        TokenService.saveAuthToken()
        this.props.history.push("/locations")
        this.context.updateAuthToken()
    }

    render() {
        return (
            <form className="login-form" onSubmit={this.handleLoginSuccess}>
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