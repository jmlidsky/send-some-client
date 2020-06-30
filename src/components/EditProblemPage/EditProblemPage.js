import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
// import './EditProblemPage.css'

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
                console.log(error)
                this.setState({ error })
            })
    }

    render() {
        const { problem_name, grade, area, notes, sent } = this.state
        // console.log(this.state)
        return (
            <div className="edit-location-page">
                <form className="edit-problem-form" onSubmit={e => this.handleSubmit(e)}>
                    <h3>Edit Problem</h3>
                    <div>
                        <label htmlFor="problem-form-name">Name *</label>
                        <input required value={problem_name} type="text" name="problem-name" className="problem-name" onChange={this.handleUpdateProblemName} />
                    </div>
                    <div>
                        <label htmlFor="problem-form-grade">Grade *</label>
                        <input required value={grade} name="problem-grade" className="problem-grade" onChange={this.handleUpdateGrade} />
                    </div>
                    <div>
                        <label htmlFor="problem-form-area">Area/Boulder</label>
                        <input type="text" value={area} name="problem-area" className="problem-area" onChange={this.handleUpdateArea} />
                    </div>
                    <div>
                        <label htmlFor="problem-form-notes">Notes</label>
                        <textarea type="text" value={notes} name="problem-notes" className="problem-notes" onChange={this.handleUpdateNotes} />
                    </div>
                    <div>
                        <label htmlFor="problem-form-sent-checkbox">Problem Sent?</label>
                        <input type="checkbox" checked={sent} name="problem-sent-checkbox" className="problem-sent-checkbox" onChange={this.handleUpdateSent} />
                    </div>
                    <button className="add-problem-button">Save</button>
                </form>
            </div>
        )
    }
}

export default EditProblemPage