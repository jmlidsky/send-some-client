import React, { Component } from 'react'
import Context from '../../Context'
import ProblemsList from './ProblemsList'
import './ProblemsPage.css'

class ProblemsPage extends Component {
    static contextType = Context

    render() {
        // console.log(this.props)
        const { locations, problems } = this.context
        const location_id = + this.props.match.params.id
        const selectedLocation = locations.find(location => location.id === location_id)
        const problemsToDisplay = problems.filter(problem => {
            if (selectedLocation) {
                return problem.location_id === selectedLocation.id
            }
            // is this line necessary?
            return true
        })

        return (
            <div className="problems-page" >
                <form className="add-problem-form">
                    <h3>Add a Problem</h3>
                    <div>
                        <label htmlFor="problem-form-name">Name</label>
                        <input required placeholder="Belly Up" type="text" name="problem-name" className="problem-name" />
                    </div>
                    <div>
                        <label htmlFor="problem-form-grade" className="">Grade</label>
                        <select required className="select-category">
                            <option value="V0">V0</option>
                            <option value="V1">V1</option>
                            <option value="V2">V2</option>
                            <option value="V3">V3</option>
                            <option value="V4">V4</option>
                            <option value="V5">V5</option>
                            <option value="V6">V6</option>
                            <option value="V7">V7</option>
                            <option value="V8">V8</option>
                            <option value="V9">V9</option>
                            <option value="V10">V10</option>
                            <option value="V11">V11</option>
                            <option value="V12">V12</option>
                            <option value="V13">V13</option>
                            <option value="V14">V14</option>
                            <option value="V15">V15</option>
                            <option value="V16">V16</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="problem-form-area">Area/Boulder</label>
                        <input placeholder="Jonah Boulder" type="text" name="problem-area" className="problem-area" />
                    </div>
                    <div>
                        <label htmlFor="problem-form-notes">Notes</label>
                        <textarea placeholder="e.g. beta, # of pads" type="text" name="problem-notes" className="problem-notes" />
                    </div>
                    <div>
                        <label htmlFor="problem-form-sent-checkbox">Sent?</label>
                        <input type="checkbox" name="problem-sent-checkbox" className="problem-sent-checkbox" />
                    </div>
                    <button className="add-problem-button">Save</button>
                </form>
                <div>
                   <ProblemsList problems={problemsToDisplay}/>
                </div>
            </div>
        );
    }
}

export default ProblemsPage