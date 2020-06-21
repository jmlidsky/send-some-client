import React, { Component } from 'react'
import TokenService from '../../services/token-service'
import './LandingPage.css'

class LandingPage extends Component {
    render() {
        return (
            <div className="landing-page">
                <h4>A logbook for climbers.</h4>
                <p>SEND SOME will help you organize & keep track of all your projects & ascents.</p>
                <p>To demo the app, use the following credentials:</p>
                <p>Username: demo | Password: demo</p>
            </div>
        )
    }
}

export default LandingPage