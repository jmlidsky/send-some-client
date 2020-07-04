import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Context from '../../Context'
import config from '../../config'
import TokenService from '../../services/token-service'
import './ProblemsList.css'

class ProblemsList extends Component {
    static contextType = Context

    constructor(props) {
        super(props)
        this.state = {
            error: null,
            currentProjectIndex: null,
            currentAscentIndex: null,
        }
    }

    handleProjectButtonClick(index) {
        this.setState({
            currentProjectIndex: index
        })
    }

    handleAscentButtonClick(index) {
        this.setState({
            currentAscentIndex: index
        })
    }

    handleDeleteProblem = (problem_id) => {
        const location_id = this.props.location_id

        // console.log(`${config.API_ENDPOINT}/locations/${location_id}/problems/${problem_id}`)
        fetch(`${config.API_ENDPOINT}/locations/${location_id}/problems/${problem_id}`, {
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
                this.context.deleteProblem(problem_id)
            })
            .catch(error => {
                // console.log(error)
                this.setState({ error })
            })
    }

    renderProjects() {
        const { problems } = this.props
        const projects = problems.filter(problem => problem.sent === false)

        return (
            projects.map((project, index) => {
                return (
                    <div className="problem-item" key={project.id}>
                        <button key={index} onClick={() => this.handleProjectButtonClick(index)} className="name-and-grade">{project.problem_name} &ndash; {project.grade}</button>
                        {(this.state.currentProjectIndex === index) &&
                            <div className="expanding-container">
                                <div className="details-container">
                                    <div>Area/Boulder: {project.area}</div>
                                    <div>Notes: {project.notes}</div>
                                </div>
                                <div className="problem-buttons">
                                    <Link to={{ pathname: `/edit/locations/${this.props.location_id}/problems/${project.id}`, state: { location_id: this.props.location_id } }}><i className="far fa-edit"></i></Link>
                                    <button onClick={() => this.handleDeleteProblem(project.id)}><i className="far fa-trash-alt"></i></button>
                                </div>
                            </div>}
                    </div>
                )
            })
        )
    }

    renderAscents() {
        const { problems } = this.props
        const ascents = problems.filter(problem => problem.sent === true)

        return (
            ascents.map((ascent, index) => {
                return (
                    <div className="problem-item" key={index}>
                        <button onClick={() => this.handleAscentButtonClick(index)} className="name-and-grade">{ascent.problem_name} &ndash; {ascent.grade}</button>
                        {(this.state.currentAscentIndex === index) &&
                            <div className="expanding-container">
                                <div className="details-container">
                                    <div><span class="highlight">Area/Boulder:</span> {ascent.area}</div>
                                    <div><span class="highlight">Notes:</span> {ascent.notes}</div>
                                </div>
                                <div className="problem-buttons">
                                    <Link to={{ pathname: `/edit/locations/${this.props.location_id}/problems/${ascent.id}`, state: { location_id: this.props.location_id } }}><i className="far fa-edit"></i></Link>
                                    <button onClick={() => this.handleDeleteProblem(ascent.id)}><i className="far fa-trash-alt"></i></button>
                                </div>
                            </div>}
                    </div>
                )
            })
        )
    }

    render() {
        return (
            <div className="problems-list" >
                <section className="section-container">
                    <h4>My Projects</h4>
                    <div>
                        {this.renderProjects()}
                    </div>
                </section>
                <section className="section-container">
                    <h4>My Ascents</h4>
                    <div>
                        {this.renderAscents()}
                    </div>
                </section>
            </div>
        )
    }
}

export default ProblemsList