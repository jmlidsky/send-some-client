import React from 'react'

const Context = React.createContext({
    locations: [],
    problems: [],
    addLocation: () => {},
    addProblem: () => {},
    updateAuthToken: () => {},
    hasAuthToken: () => {},
    setLocations: () => {},
    setProblems: () => {},
    deleteLocation: () => {},
    deleteProblem: () => {},
})

export default Context