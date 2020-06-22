import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import Context from '../../Context'
import './ProblemsList.css'

class ProblemsList extends Component {
    static contextType = Context

    constructor(props) {
        super(props)
        this.state = {
            currentProjectIndex: null,
            currentAscentIndex: null,
        }
    }

    handleProjectButtonClick(index) {
        this.setState({ currentProjectIndex: index })
    }

    handleAscentButtonClick(index) {
        this.setState({ currentAscentIndex: index })
    }

    renderProjects() {
        const { problems } = this.props
        const projects = problems.filter(problem => problem.sent === false)

        return (
            projects.map((project, index) => {
                return (
                    <div key={project.id}>
                        <button key={index} onClick={() => this.handleProjectButtonClick(index)} className="project-name">{project.problem_name}</button>
                        {(this.state.currentProjectIndex === index) &&
                            <div>
                                <div className="project-grade">{project.grade}</div>
                                <div className="project-area">{project.area}</div>
                                <div className="project-notes">{project.notes}</div>
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
                    <div key={index}>
                        <button onClick={() => this.handleAscentButtonClick(index)} className="ascent-name">{ascent.problem_name}</button>
                        {(this.state.currentAscentIndex === index) &&
                            <div className="problem-details">
                                <div className="ascent-grade">{ascent.grade}</div>
                                <div className="ascent-area">{ascent.area}</div>
                                <div className="ascent-notes">{ascent.notes}</div>
                            </div>}
                    </div>
                )
            })
        )
    }

    render() {
        return (
            <div className="problems-list" >
                <section>
                    <h4>My Projects</h4>
                    <ul>
                        {this.renderProjects()}
                    </ul>
                </section>
                <section>
                    <h4>My Ascents</h4>
                    <ul>
                        {this.renderAscents()}
                    </ul>
                </section>
            </div>
        )
    }
}

export default ProblemsList