import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

class Header extends Component {

    render() {
        return (
            <header className="header">
                <h1>
                    <Link to="/" className="logo">Send Some</Link>
                </h1>
            </header>
        );
    }
}

export default Header