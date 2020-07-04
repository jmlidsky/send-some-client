import React, { Component } from 'react'
import './LandingPage.css'

class LandingPage extends Component {
    render() {
        return (
            <div className="landing-page">
                <h2>A logbook for climbers.</h2>
                <p><strong>SEND SOME</strong> will help you organize & keep track of your projects & ascents.</p>
                <div className="landing-page-directions">
                    <p>To demo the app, use the following credentials:</p>
                    <p>Username: demo<br />
                    Password: password</p>
                </div>
            </div>
        )
    }
}

export default LandingPage