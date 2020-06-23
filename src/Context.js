import React from 'react'

const Context = React.createContext({
    locations: [],
    problems: [],
    addLocation: () => {},
    addProblem: () => {},
    updateAuthToken: () => {},
    hasAuthToken: () => {},
    toggleSentStatus: () => {},
})

export default Context