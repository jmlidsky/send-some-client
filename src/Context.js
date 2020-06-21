import React from 'react'

const Context = React.createContext({
    locations: [],
    problems: [],
    addLocation: () => {},
    updateAuthToken: () => {},
    hasAuthToken: () => {},
})

export default Context