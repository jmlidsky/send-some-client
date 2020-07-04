import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
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
                <NavLink
                    to="/locations">
                    My Locations
                </NavLink>
                <span className="hyph">{' - '}</span>
                <NavLink
                    onClick={this.handleLogoutClick}
                    to="/">
                    Logout
                </NavLink>
            </div>
        )
    }

    renderLoginLink() {
        // console.log(TokenService.hasAuthToken())
        return (
            <div className="header_not-logged-in">
                <NavLink
                    to="/login">
                    Login
                </NavLink>
                {/* <span className="hyph">{' - '}</span> */}
                <span className="hyph">&bull;</span>
                <NavLink
                    to="/signup">
                    Sign Up
                </NavLink>
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
                        : this.renderLoginLink() }
                </nav>
            </header>
        )
    }
}

export default Header