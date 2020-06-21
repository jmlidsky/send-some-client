import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import './Header.css'

class Header extends Component {

    handleLogoutClick = () => {
        TokenService.clearAuthToken()
    }

    renderLogoutLink() {
        return (
            <div className="header_logged-in">
                <Link
                    to="/locations">
                    Locations
                </Link>
                <span className="hyph">{' - '}</span>
                <Link
                    onClick={this.handleLogoutClick}
                    to="/">
                    Logout
                </Link>
            </div>
        )
    }

    renderLoginLink() {
        return (
            <div className="header_not-logged-in">
                <Link
                    to="/signup">
                    Sign Up
                </Link>
                <span className="hyph">{' - '}</span>
                <Link
                    to="/login">
                    Log in
                </Link>
            </div>
        )
    }

    render() {
        return (
            <header className="header">
                <h1>
                    <Link to="/" className="logo">Send Some</Link>
                </h1>
                <nav>
                    {TokenService.hasAuthToken()
                        ? this.renderLogoutLink()
                        : this.renderLoginLink()}
                </nav>
            </header>
        )
    }
}

export default Header