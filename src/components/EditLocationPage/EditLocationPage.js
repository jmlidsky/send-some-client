import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import Context from '../../Context'
// import './EditLocationPage.css'

class EditLocationPage extends Component {
    static contextType = Context

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
                'authorization': `Bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
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

    handleChangeLocationName = (e) => {
        this.setState({
            location_name: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const location_id = + this.props.match.params.id
        const location_name = this.state.location_name


        fetch(`${config.API_ENDPOINT}/locations/${location_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({ location_name })
        })
            .then(res => {
                // console.log(res)
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
            <div className="edit-location-page">
                <form className="edit-location-form" onSubmit={e => this.handleSubmit(e)}>
                    <h3>Edit Location</h3>
                    <label htmlFor="location-form-name">Name</label>
                    <input required value={location_name} type="text" name="location-name" className="location-name" onChange={this.handleChangeLocationName} />
                    <button type="submit" className="add-location-button">Save</button>
                </form>
            </div>
        );
    }
}

export default EditLocationPage