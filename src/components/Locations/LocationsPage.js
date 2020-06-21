import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Context from '../../Context'
import './LocationsPage.css'

class LocationsPage extends Component {
    static contextType = Context

    constructor(props) {
        super(props)
        this.state = {
            location_name: {
                value: " ",
                touched: false,
            }
        }
    }

    updateName(name) {
        this.setState({
            location_name: {
                value: name,
                touched: true,
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const newLocation = {
            location_name: e.target['location-name'].value
        }
        
        this.context.addLocation(newLocation)
    }

    render() {
        const { locations } = this.context
        // console.log(this.context)

        return (
            <div className="locations-page">
                <h2>My Locations</h2>
                <form className="add-location-form" onSubmit={e => this.handleSubmit(e)}>
                    <h3>Add a Location</h3>
                    <label htmlFor="location-form-name">Name</label>
                    <input required placeholder="e.g. Chattanooga" type="text" name="location-name" className="location-name" onChange={e => this.updateName(e.target.value)} />
                    <button type="submit" className="add-location-button">Save</button>
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