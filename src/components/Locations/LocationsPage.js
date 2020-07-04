import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Context from '../../Context'
import config from '../../config'
import TokenService from '../../services/token-service'
import './LocationsPage.css'

class LocationsPage extends Component {
    static contextType = Context

    constructor(props) {
        super(props)
        this.state = {
            error: null,
            location_name: '',
        }
    }

    componentDidMount() {
        fetch(`${config.API_ENDPOINT}/locations`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`,
            }
        })
            .then(res => {
                return (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            })
            .then(locations => {
                // console.log(locations)
                this.context.setLocations(locations)
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    handleDeleteLocation = (location_id) => {
        fetch(`${config.API_ENDPOINT}/locations/${location_id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`,
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => Promise.reject(error))
                }
            })
            .then(() => {
                this.context.deleteLocation(location_id)
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    handleChangeLocationName = (e) => {
        this.setState({
            location_name: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { location_name } = this.state
        const newLocation = { location_name }

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
            .catch(error => {
                // console.log(error)
                this.setState({ error })
            })

        e.target.reset()
    }

    render() {
        const { locations } = this.context
        // console.log(this.context)
        // console.log(this.props)

        return (
            <div className="locations-page">
                <h3 className="top-header">My Locations</h3>
                <form className="add-location-form form" onSubmit={e => this.handleSubmit(e)}>
                    <h3 className="card-header">Add a Location</h3>
                    <label htmlFor="location-form-name">Name <span className="red">*</span></label>
                    <input required type="text" name="name" onChange={this.handleChangeLocationName} />
                    <button type="submit" className="form-button">Save</button>
                </form>
                <div className="locations-list">
                    {locations.map(location =>
                        <div className="location-item" key={location.id}>
                            <Link to={`/locations/${location.id}`}>
                                <h4 className="location-name">{location.location_name}</h4>
                            </Link>
                            <div className="location-icons-container icons-container">
                                <Link to={`/edit/locations/${location.id}`}><i className="far fa-edit"></i></Link>
                                <button onClick={() => this.handleDeleteLocation(location.id)}><i className="far fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default LocationsPage