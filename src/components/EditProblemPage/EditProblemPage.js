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

    // componentDidMount() {
    //         fetch(`${config.API_ENDPOINT}/locations/${location_id}/problems/${problem_id}`, {
    //             method: 'GET',
    //             headers: {
    //                 'authorization': `Bearer ${TokenService.getAuthToken()}`
    //             }
    //         })
    //             .then(res =>
    //                 (!res.ok)
    //                     ? res.json().then(e => Promise.reject(e))
    //                     : res.json()
    //             )
    //             .then(problem => {
    //                 this.setState({
    //                     problem_name: problem.problem_name,
    //                     grade: problem.grade,
    //                     area: problem.area,
    //                     notes: problem.notes,
    //                     sent: problem.sent,
    //                 })
    //             })
    //             .catch(error => {
    //                 console.error(error)
    //                 this.setState({ error })
    //             })
    // }

    handleChangeProblemName = (e) => {
        this.setState({
            problem_name: e.target.value
        })
    }

    handleChangeGrade = (e) => {
        this.setState({
            grade: e.target.value
        })
    }

    handleChangeArea = (e) => {
        this.setState({
            area: e.target.value
        })
    }

    handleChangeNotes = (e) => {
        this.setState({
            notes: e.target.value
        })
    }

    handleChangeSent = (e) => {
        this.setState({
            sent: e.target.value
        })
    }


    render() {
        console.log(this.props)
        return (
            <div className="edit-location-page">
                <form className="edit-problem-form" onSubmit={e => this.handleSubmit(e)}>
                    <h3>Edit Problem</h3>
                    <div>
                        <label htmlFor="problem-form-name">Name</label>
                        <input required type="text" name="problem-name" className="problem-name" onChange={e => this.updateName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="problem-form-grade">Grade</label>
                        <input required name="problem-grade" className="problem-grade" onChange={e => this.updateGrade(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="problem-form-area">Area/Boulder</label>
                        <input type="text" name="problem-area" className="problem-area" onChange={e => this.updateArea(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="problem-form-notes">Notes</label>
                        <textarea type="text" name="problem-notes" className="problem-notes" onChange={e => this.updateNotes(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="problem-form-sent-checkbox">Problem Sent?</label>
                        <input type="checkbox" name="problem-sent-checkbox" className="problem-sent-checkbox" onChange={e => this.updateSent(e.target.checked)} />
                    </div>
                    <button className="add-problem-button">Save</button>
                </form>
            </div>
        );
    }
}

export default EditProblemPage