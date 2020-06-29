import React from 'react'

const Context = React.createContext({
    locations: [],
    problems: [],
    addLocation: () => {},
    addProblem: () => {},
    updateAuthToken: () => {},
    hasAuthToken: () => {},
    toggleSentStatus: () => {},
    setLocations: () => {},
    setProblems: () => {},
    deleteLocation: () => {},
})

export default Context