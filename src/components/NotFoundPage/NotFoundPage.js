import React, { Component } from 'react'
import './NotFoundPage.css'

class NotFoundPage extends Component {
    render() {
        return (
            <div className="not-found-page">
                <h2>Page Not Found</h2>
                <p>This page does not exist. Try going back or using the navigation menu.</p>
            </div>
        );
    }
}

export default NotFoundPage