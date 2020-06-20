import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import DATA from './dummy-data'
import Context from './Context'
import Header from './components/Header/Header.js'
import LandingPage from './components/Landing Page/LandingPage'
import LocationsPage from './components/Locations/LocationsPage'
import ProblemsPage from './components/Problems/ProblemsPage'
import './App.css'

class App extends Component {
  render() {
    const contextValue = {
      locations: DATA.locations,
      problems: DATA.problems,
    }

    return (
      <div className="App">
        <Context.Provider value={contextValue}>
          <div className="content" aria-live="polite">
            <Header />
            <main className="main">
              <Switch>
                <Route exact path ="/" component={LandingPage} />
                <Route exact path="/locations" component={LocationsPage} />
                <Route path="/locations/:id" component={ProblemsPage} />
              </Switch>
            </main>
          </div>
        </Context.Provider>
      </div>
    );
  }
}

export default App