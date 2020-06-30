import React from 'react'

const Context = React.createContext({
    locations: [],
    problems: [],
    hasAuthToken: () => { },
    updateAuthToken: () => { },
    setLocations: () => { },
    setProblems: () => { },
    addLocation: () => { },
    addProblem: () => { },
    deleteLocation: () => { },
    deleteProblem: () => { },
})

export default Context