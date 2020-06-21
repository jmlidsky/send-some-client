import React from 'react'

const Context = React.createContext({
    locations: [],
    problems: [],
    addLocation: () => { },
})

export default Context