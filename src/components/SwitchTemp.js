import React, { useContext } from 'react'
import { Switch } from '@mui/material'
import TempContext from './TempContext'

export default function SwitchTemp() {

    const {temp, setTemp} = useContext(TempContext)

    const changeTemp = () => {
        if (temp === 'C') {
            setTemp('F')
        } else {
            setTemp('C')
        }
    }

    return (
        <Switch onChange={() => changeTemp()} />
    )
}
