import React, { Component } from 'react'
import Context from '../../Context'
import TokenService from '../../services/token-service'
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
        e.preventDefault();
        this.setState({ error: null })
        TokenService.saveAuthToken()
        this.props.history.push("/locations")
        this.context.updateAuthToken()
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