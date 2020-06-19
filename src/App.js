import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import DATA from './dummy-data'
import Context from './Context'
import Header from './components/Header/Header.js'
import './App.css'

class App extends Component {
  render() {
    const contextValue = {
      users: DATA.users,
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
              </Switch>
            </main>
          </div>
        </Context.Provider>
      </div>
    );
  }
}

export default App