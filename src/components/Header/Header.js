import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Context from '../../Context'
import TokenService from '../../services/token-service'
import './Header.css'

class Header extends Component {
    static contextType = Context

    handleLogoutClick = () => {
        TokenService.clearAuthToken()
        this.context.updateAuthToken()
    }

    renderLogoutLink() {
        // console.log(TokenService.hasAuthToken())
        return (
            <div className="header_logged-in">
                <Link
                    to="/locations">
                    My Locations
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
        // console.log(TokenService.hasAuthToken())
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
        const { hasAuthToken } = this.context

        return (
            <header className="header">
                <h1>
                    <Link to="/" className="logo">Send Some</Link>
                </h1>
                <nav>
                    { hasAuthToken
                        ? this.renderLogoutLink()
                        : this.renderLoginLink()}
                </nav>
            </header>
        )
    }
}

export default Header