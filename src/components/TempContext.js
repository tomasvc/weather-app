import React, { createContext } from 'react'

const TempContext = createContext({
    temp : 'C',
    setTemp: (newTemp) => {}
})

export default TempContext