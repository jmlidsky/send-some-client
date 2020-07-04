import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import './EditProblemPage.css'

class EditProblemPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            problem_name: '',
            grade: '',
            area: '',
            notes: '',
            sent: '',
        }
    }

    componentDidMount() {
        const { location_id } = this.props.location.state
        const problem_id = +this.props.match.params.id

        // console.log(`${config.API_ENDPOINT}/locations/${location_id}/problems/${problem_id}`)
        fetch(`${config.API_ENDPOINT}/locations/${location_id}/problems/${problem_id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
            .then(problem => {
                this.setState({
                    problem_name: problem.problem_name,
                    grade: problem.grade,
                    area: problem.area,
                    notes: problem.notes,
                    sent: problem.sent
                })
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    handleUpdateProblemName = (e) => {
        this.setState({
            problem_name: e.target.value
        })
    }

    handleUpdateGrade = (e) => {
        this.setState({
            grade: e.target.value
        })
    }

    handleUpdateArea = (e) => {
        this.setState({
            area: e.target.value
        })
    }

    handleUpdateNotes = (e) => {
        this.setState({
            notes: e.target.value
        })
    }

    handleUpdateSent = (e) => {
        this.setState({
            sent: e.target.checked
        })
    }

    handleCancelEdit = () => {
        this.props.history.goBack()
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { location_id } = this.props.location.state
        const problem_id = +this.props.match.params.id

        const { problem_name, grade, area, notes, sent } = this.state
        const updatedProblem = { problem_name, grade, area, notes, sent }
        // console.log(JSON.stringify(updatedProblem))

        fetch(`${config.API_ENDPOINT}/locations/${location_id}/problems/${problem_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(updatedProblem)
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(error => Promise.reject(error))
            })
            .then(() => {
                this.props.history.goBack()
            })
            .catch(error => {
                // console.log(error)
                this.setState({ error })
            })
    }

    render() {
        const { problem_name, grade, area, notes, sent } = this.state
        // console.log(this.state)
        return (
                <form className="edit-form form" onSubmit={e => this.handleSubmit(e)}>
                    <h3 className="card-header">Edit Problem</h3>

                    <label htmlFor="problem-form-name">Name <span className="red">*</span></label>
                    <input required value={problem_name} type="text" name="name" onChange={this.handleUpdateProblemName} />

                    <label htmlFor="problem-form-grade">Grade <span className="red">*</span></label>
                    <input required value={grade} name="grade" onChange={this.handleUpdateGrade} />

                    <label htmlFor="problem-form-area">Area/Boulder</label>
                    <input type="text" value={area} name="area" onChange={this.handleUpdateArea} />

                    <label htmlFor="problem-form-notes">Notes</label>
                    <textarea type="text" value={notes} name="notes" onChange={this.handleUpdateNotes} />

                    <div className="sent-container">
                        <label htmlFor="problem-form-sent-checkbox">Problem Sent?</label>
                        <input type="checkbox" checked={sent} name="sent-checkbox" className="sent-checkbox" onChange={this.handleUpdateSent} />
                    </div>

                    <div className="edit-page-buttons-container">
                        <button type="submit" className="form-button">Save</button>
                        <button type="button" className="form-button" onClick={this.handleCancelEdit}>Cancel</button>
                    </div>
                </form>
        )
    }
}

export default EditProblemPage