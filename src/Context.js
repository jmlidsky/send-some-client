import React from 'react'

const Context = React.createContext({
    locations: [],
    problems: [],
    addLocation: () => {},
    addProblem: () => {},
    updateAuthToken: () => {},
    hasAuthToken: () => {},
})

export default Context