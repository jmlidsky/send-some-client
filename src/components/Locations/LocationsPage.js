import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../config'
import TokenService from '../../services/token-service'
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

    componentDidMount() {
        fetch(`${config.API_ENDPOINT}/locations`, {
            headers: {
                'Authorization': `Bearer ${TokenService.getAuthToken()}`,
            }
        })
            .then(res => {
                return !res.ok
                    ? res.json().then(e => Promise.reject(e))
                    : res.json();
            })
            .then(locations => {
                // console.log(locations)
                this.context.setLocations(locations)
            })
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
        e.preventDefault()

        const newLocation = {
            location_name: e.target['location-name'].value
        }

        fetch(`${config.API_ENDPOINT}/locations`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(newLocation),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
            .then(newLocation => {
                this.context.addLocation(newLocation)
            })
        e.target.reset()
    }

    render() {
        const { locations } = this.context
        // console.log(this.context)
        // console.log(this.props)

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