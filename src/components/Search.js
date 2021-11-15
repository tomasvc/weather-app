import React, { useState, useEffect } from 'react'
import { TextField, Autocomplete } from '@mui/material'
import axios from 'axios'

export default function Search({ onAddLocation }) {

    const [input, setInput] = useState('')
    const [results, setResults] = useState([])

    useEffect(() => {
        input &&
            axios(`https://api.weatherapi.com/v1/search.json?key=b052758d6ca34a0ea45160442211011&q=${input}`)
                .then(res => {
                    console.log(res)
                    let list = res.data.map(item => {
                        return {label: item.name, id: res.data.indexOf(item)}
                    })
                    setResults(list)
                })
    }, [input])

    const onHandleChange = (event, value) => {
        setInput(value)
    }

    const onSelect = (event, value) => {
        onAddLocation(value)
    }

    return (
        <Autocomplete 
            variant="outlined" 
            sx={{width: '100%', marginTop: 2, marginBottom: 2, background: '#ffffff'}} 
            placeholder="Search" 
            onInputChange={onHandleChange}
            onChange={onSelect} 
            options={results}
            renderInput={params => <TextField {...params} placeholder="Search location" />}
        />
    )
}