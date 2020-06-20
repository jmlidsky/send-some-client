import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Context from '../../Context'
import './LocationsPage.css'

class LocationsPage extends Component {
    static contextType = Context

    render() {
        const { locations } = this.context

        return (
            <div className="locations-page">
                <h2>My Locations</h2>
                <form className="add-location-form">
                    <h3>Add a Location</h3>
                    <label htmlFor="location-form-name">Name</label>
                    <input required placeholder="e.g. Chattanooga" type="text" name="location-name" className="location-name" />
                    <button className="add-location-button">Save</button>
                </form>
                <ul>
                    {locations.map(location =>
                        <li key={location.id}>
                            <Link to={`/locations/${location.id}`}>{location.location_name}</Link>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default LocationsPage