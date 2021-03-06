import React, { Component } from 'react'
import './NotFoundPage.css'

class NotFoundPage extends Component {
    render() {
        return (
            <div className="not-found-page">
                <h3 className="card-header">Page Not Found</h3>
                <p>This page does not exist. Try going back or using the navigation menu.</p>
            </div>
        )
    }
}

export default NotFoundPage