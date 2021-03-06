import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import './EditLocationPage.css'

class EditLocationPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            location_name: '',
        }
    }

    componentDidMount() {
        const location_id = + this.props.match.params.id

        fetch(`${config.API_ENDPOINT}/locations/${location_id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res => {
                return (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            })
            .then(location => {
                this.setState({
                    location_name: location.location_name
                })
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    handleUpdateLocationName = (e) => {
        this.setState({
            location_name: e.target.value
        })
    }

    handleCancelEdit = () => {
        this.props.history.goBack()
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const location_id = + this.props.match.params.id

        const { location_name } = this.state
        const updatedLocation = { location_name }

        fetch(`${config.API_ENDPOINT}/locations/${location_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(updatedLocation)
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(error => Promise.reject(error))
            })
            .then(() => {
                this.props.history.push('/')
            })
            .catch(error => {
                // console.log(error)
                this.setState({ error })
            })
    }

    render() {
        const { location_name } = this.state
        return (
                <form className="edit-form form" onSubmit={e => this.handleSubmit(e)}>
                    <h3 className="card-header">Edit Location</h3>

                    <label htmlFor="location-form-name">Name <span className="red">*</span></label>
                    <input required value={location_name} type="text" name="name" onChange={this.handleUpdateLocationName} />

                    <div className="edit-page-buttons-container">
                        <button type="submit" className="form-button">Save</button>
                        <button type="button" className="form-button" onClick={this.handleCancelEdit}>Cancel</button>
                    </div>
                </form>
        )
    }
}

export default EditLocationPage