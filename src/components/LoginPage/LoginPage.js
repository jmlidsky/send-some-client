import React, { Component } from 'react'
import Context from '../../Context'
import config from '../../config'
import TokenService from '../../services/token-service'
import './LoginPage.css'

class LoginPage extends Component {
    static contextType = Context

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            username: '',
            password: '',
        }
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

    handleSubmitJwtAuth = (e) => {
        e.preventDefault()

        const { username, password } = this.state
        const user = { username, password } 

        fetch(`${config.API_ENDPOINT}/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user),
        })
            .then(res => {
                return (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            })
            .then(user => {
                TokenService.saveAuthToken(user.authToken)
                // console.log("saveAuthToken fired")
                this.props.history.push("/locations")
                this.context.updateAuthToken()
            })
            .catch(error => {
                console.log(error)
                this.setState({ error })
            })
    }

    render() {
        return (
            <form className="login-form" onSubmit={this.handleSubmitJwtAuth}>
                <h3>Log In</h3>
                <div>
                    <label htmlFor="login-form-username">Username</label>
                    <input required name="username" className="login-form-username" onChange={this.handleChangeUsername}></input>
                </div>
                <div>
                    <label htmlFor="login-form-username">Password</label>
                    <input required type="password" name="password" className="login-form-password" onChange={this.handleChangePassword}></input>
                </div>
                <button className="login-button">Log In</button>
            </form>
        )
    }
}

export default LoginPage