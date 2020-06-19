import React, { Component } from 'react'
import './LandingPage.css'

class LandingPage extends Component {

    render() {
        return (
            <div className="landing-page">
                <div className="about-container">
                    <h4>A logbook for climbers.</h4>
                    <p>SEND SOME will help you organize & keep track of all your projects & ascents.</p>
                    <p>To demo the app, use the following credentials:</p>
                    <p>Username: demo | Password: demo</p>
                </div>
                <div className="landing-page-forms-container">
                    <form className="signup-form">
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
                    <form className="login-form">
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
                </div>
            </div>
        );
    }
}

export default LandingPage