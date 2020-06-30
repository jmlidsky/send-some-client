import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
// import DATA from './dummy-data'
import Context from './Context'
import Header from './components/Header/Header.js'
import LandingPage from './components/Landing Page/LandingPage'
import LoginPage from './components/LoginPage/LoginPage'
import SignupPage from './components/SignupPage/SignupPage'
import LocationsPage from './components/Locations/LocationsPage'
import EditLocationPage from './components/EditLocationPage/EditLocationPage'
import ProblemsPage from './components/Problems/ProblemsPage'
import EditProblemPage from './components/EditProblemPage/EditProblemPage'
import NotFoundPage from './components/NotFoundPage/NotFoundPage'
import PrivateRoute from './utils/PrivateRoute'
import PublicOnlyRoute from './utils/PublicOnlyRoute'
import TokenService from './services/token-service'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locations: [],
      problems: [],
      hasAuthToken: TokenService.hasAuthToken()
    }
  }

  setLocations = (locations) => {
    this.setState({
      locations: [...locations]
    })
  }

  setProblems = (problems) => {
    this.setState({
      problems: [...problems]
    })
  }

  addLocation = (newLocation) => {
    // console.log(newLocation)
    this.setState({
      locations: [...this.state.locations, newLocation]
    })
  }
  
  deleteLocation = (location_id) => {
    const newLocations = this.state.locations.filter(location =>
      location.id !== location_id)
      this.setState({
        locations: newLocations
      })
  }

  addProblem = (newProblem) => {
    // console.log(newProblem)
    this.setState({
      problems: [...this.state.problems, newProblem]
    })
  }

  deleteProblem = (problem_id) => {
    const newProblems = this.state.problems.filter(problem =>
      problem.id !== problem_id)
      this.setState({
        problems: newProblems
      })
  }

  updateAuthToken = () => {
    this.setState({
      hasAuthToken: TokenService.hasAuthToken()
    })
  }

  render() {
    const contextValue = {
      locations: this.state.locations,
      problems: this.state.problems,
      addLocation: this.addLocation,
      addProblem: this.addProblem,
      updateAuthToken: this.updateAuthToken,
      hasAuthToken: this.state.hasAuthToken,
      setLocations: this.setLocations,
      setProblems: this.setProblems,
      deleteLocation: this.deleteLocation,
      deleteProblem: this.deleteProblem
    }

    return (
      <div className="App">
        <Context.Provider value={contextValue}>
          <div className="content" aria-live="polite">
            <Header />
            <main className="main">
              <Switch>
                <PublicOnlyRoute exact path="/" component={LandingPage} />
                <PublicOnlyRoute path="/login" component={LoginPage} />
                <PublicOnlyRoute path="/signup" component={SignupPage} />
                <PrivateRoute exact path="/locations" component={LocationsPage} />
                <PrivateRoute exact path="/edit/locations/:id" component={EditLocationPage} />
                <PrivateRoute path="/locations/:id" component={ProblemsPage} />
                <PrivateRoute path="/edit/locations/:id/problems/:id" component={EditProblemPage} />
                <Route component={NotFoundPage} />
              </Switch>
            </main>
          </div>
        </Context.Provider>
      </div>
    );
  }
}

export default App