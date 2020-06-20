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
        const projects = problems.filter(problem => {
            if (problem.sent === false) {
                return problem
            }
            return false
        })

        return (
            projects.map((project, index) => {
                return (
                    <div key={project.id}>
                        <button key={index} onClick={() => this.handleProjectButtonClick(index)}>{project.problem_name}</button>
                        {(this.state.currentProjectIndex === index) && <div>{project.grade}</div>}
                    </div>
                )
            })
        )
    }

    renderAscents() {
        const { problems } = this.props
        const ascents = problems.filter(problem => {
            if (problem.sent === true) {
                return problem
            }
            return false
        })

        return (
            ascents.map((ascent, index) => {
                return (
                    <div>
                        <button key={index} onClick={() => this.handleAscentButtonClick(index)}>{ascent.problem_name}</button>
                        {(this.state.currentAscentIndex === index) && <div>{ascent.grade}</div>}
                    </div>
                )
            })
        )
    }

    render() {
        return (
            <div className="problems-list" >
                <section>
                    <h3>My Projects</h3>
                    <ul>
                        {this.renderProjects()}
                    </ul>
                </section>
                <section>
                    <h3>My Ascents</h3>
                    <ul>
                        {this.renderAscents()}
                    </ul>
                </section>
            </div>
        )
    }
}

export default ProblemsList