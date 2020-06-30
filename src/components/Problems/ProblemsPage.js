import React, { Component } from 'react'
import Context from '../../Context'
import config from '../../config'
import TokenService from '../../services/token-service'
import ProblemsList from './ProblemsList'
import './ProblemsPage.css'

class ProblemsPage extends Component {
    static contextType = Context

    constructor(props) {
        super(props)
        this.state = {
            error: null,
            location_name: '',
            problem_name: '',
            grade: '',
            area: '',
            notes: '',
            sent: false,
        }
    }

    componentDidMount() {
        // for location name header
        const location_id = + this.props.match.params.id
        
        fetch(`${config.API_ENDPOINT}/locations/${location_id}`, {
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
            .then(location => {
                this.setState({
                    location_name: location.location_name
                })
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })

        fetch(`${config.API_ENDPOINT}/locations/${location_id}/problems`, {
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
            .then(problems => {
                // console.log(problems)
                this.context.setProblems(problems)
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

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
            sent: e.target.checked
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const location_id = + this.props.match.params.id

        const { problem_name, grade, area, notes, sent } = this.state
        const newProblem = { problem_name, grade, area, notes, sent }

        // console.log(`${config.API_ENDPOINT}/locations/${location_id}/problems`)
        fetch(`${config.API_ENDPOINT}/locations/${location_id}/problems`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(newProblem),
        })
            .then(res => {
                return (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            })
            .then(newProblem => {
                this.context.addProblem(newProblem)
            })
            .catch(error => {
                console.log(error)
                this.setState({ error })
            })

        e.target.reset()
    }


    render() {
        // console.log(this.props)
        const { problems } = this.context
        const location_id = + this.props.match.params.id
        const problemsToDisplay = problems.filter(problem => {
            return problem.location_id === location_id
        })

        return (
            <div className="problems-page" >
                <h2>{this.state.location_name}</h2>
                <form className="add-problem-form" onSubmit={e => this.handleSubmit(e)}>
                    <h3>Add a Problem</h3>
                    <div>
                        <label htmlFor="problem-form-name">Name *</label>
                        <input required type="text" name="problem-name" className="problem-name" onChange={this.handleChangeProblemName} />
                    </div>
                    <div>
                        <label htmlFor="problem-form-grade">Grade *</label>
                        <input required name="problem-grade" className="problem-grade" onChange={this.handleChangeGrade} />
                    </div>
                    <div>
                        <label htmlFor="problem-form-area">Area/Boulder</label>
                        <input type="text" name="problem-area" className="problem-area" onChange={this.handleChangeArea} />
                    </div>
                    <div>
                        <label htmlFor="problem-form-notes">Notes</label>
                        <textarea placeholder="beta, # of pads, etc." type="text" name="problem-notes" className="problem-notes" onChange={this.handleChangeNotes} />
                    </div>
                    <div>
                        <label htmlFor="problem-form-sent-checkbox">Problem Sent?</label>
                        <input type="checkbox" name="problem-sent-checkbox" className="problem-sent-checkbox" onChange={this.handleChangeSent} />
                    </div>
                    <button className="add-problem-button" type="submit">Save</button>
                </form>
                <div>
                    <ProblemsList problems={problemsToDisplay} location_id={location_id} />
                </div>
            </div>
        )
    }
}

export default ProblemsPage