import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import Context from '../../Context'
import './ProblemsList.css'

class ProblemsList extends Component {
    static contextType = Context

    renderProjects() {
        const { problems } = this.props
        const projects = problems.filter(problem => {
            if (problem.sent === false) {
                return problem
            }
        })

        return (
            projects.map(project => {
                return (
                    <li>{project.problem_name}</li>
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
        })

        return (
            ascents.map(ascent => {
                return (
                    <li>{ascent.problem_name}</li>
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