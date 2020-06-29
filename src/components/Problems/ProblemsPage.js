import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import Context from '../../Context'
import ProblemsList from './ProblemsList'
import './ProblemsPage.css'

class ProblemsPage extends Component {
    static contextType = Context

    constructor(props) {
        super(props)
        this.state = {
            problem_name: {
                value: " ",
                touched: false,
            },
            grade: {
                value: " ",
                touched: false,
            },
            area: {
                value: " ",
                touched: false,
            },
            notes: {
                value: " ",
                touched: false,
            },
            sent: {
                checked: true,
                touched: false,
            }
        }
    }

    componentDidMount() {
        const location_id = + this.props.match.params.id
        fetch(`${config.API_ENDPOINT}/locations/${location_id}/problems`, {
            headers: {
                'Authorization': `Bearer ${TokenService.getAuthToken()}`,
            }
        })
            .then(res => {
                return !res.ok
                    ? res.json().then(e => Promise.reject(e))
                    : res.json();
            })
            .then(problems => {
                // console.log(problems)
                this.context.setProblems(problems)
            })
    }

    updateName(name) {
        this.setState({
            problem_name: {
                value: name,
                touched: true,
            }
        })
    }

    updateGrade(grade) {
        this.setState({
            grade: {
                value: grade,
                touched: true,
            }
        })
    }

    updateArea(area) {
        this.setState({
            area: {
                value: area,
                touched: true,
            }
        })
    }

    updateNotes(note) {
        this.setState({
            notes: {
                value: note,
                touched: true,
            }
        })
    }

    updateSent(status) {
        this.setState({
            sent: {
                checked: status,
                touched: true,
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault()

        // const { locations } = this.context
        // const location_id = + this.props.match.params.id
        // const selectedLocation = locations.find(location => location.id === location_id)
        const newProblem = {
            problem_name: e.target['problem-name'].value,
            grade: e.target['problem-grade'].value,
            area: e.target['problem-area'].value,
            notes: e.target['problem-notes'].value,
            sent: e.target['problem-sent-checkbox'].checked,
        }

        const location_id = + this.props.match.params.id
        // const url = `${config.API_ENDPOINT}/locations/${location_id}/problems`
        // console.log(url)
        fetch(`${config.API_ENDPOINT}/locations/${location_id}/problems`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(newProblem),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
            .then(newProblem => {
                this.context.addProblem(newProblem)
            })
        e.target.reset()
    }


    render() {
        // console.log(this.props)
        const { locations, problems } = this.context
        const location_id = + this.props.match.params.id
        const selectedLocation = locations.find(location => location.id === location_id)
        const problemsToDisplay = problems.filter(problem => {
            if (selectedLocation) {
                return problem.location_id === selectedLocation.id
            }
            // or return false?
            return null
        })

        return (
            <div className="problems-page" >
                <h2>{selectedLocation.location_name}</h2>
                <form className="add-problem-form" onSubmit={e => this.handleSubmit(e)}>
                    <h3>Add a Problem</h3>
                    <div>
                        <label htmlFor="problem-form-name">Name</label>
                        <input required placeholder="Belly Up" type="text" name="problem-name" className="problem-name" onChange={e => this.updateName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="problem-form-grade">Grade</label>
                        <input required placeholder="V5, 6A, 5.10a, etc." name="problem-grade" className="problem-grade" onChange={e => this.updateGrade(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="problem-form-area">Area/Boulder</label>
                        <input placeholder="Jonah Boulder" type="text" name="problem-area" className="problem-area" onChange={e => this.updateArea(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="problem-form-notes">Notes</label>
                        <textarea placeholder="e.g. beta, # of pads, etc." type="text" name="problem-notes" className="problem-notes" onChange={e => this.updateNotes(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="problem-form-sent-checkbox">Problem Sent?</label>
                        <input type="checkbox" name="problem-sent-checkbox" className="problem-sent-checkbox" onChange={e => this.updateSent(e.target.checked)} />
                    </div>
                    <button className="add-problem-button">Save</button>
                </form>
                <div>
                    <ProblemsList problems={problemsToDisplay} />
                </div>
            </div>
        );
    }
}

export default ProblemsPage