import React, { useState, useEffect } from 'react'
import { TextField } from '@mui/material'
import axios from 'axios'

export default function Search() {

    const [input, setInput] = useState('')
    const [results, setResults] = useState([])

    useEffect(() => {
        axios(`http://api.weatherapi.com/v1/search.json?key=b052758d6ca34a0ea45160442211011&q=${input}`)
            .then(res => {
                console.log(res)
                setResults(res.data)
            })
    }, [input])


    return (
        // <Autocomplete 
        //     variant="outlined" 
        //     sx={{width: '100%', marginTop: 2}} 
        //     placeholder="Search" 
        //     onChange={e => setInput(e.target.value)} 
        //     options={results}
        //     renderInput={params => <TextField {...params} placeholder="Search location" />}
        // />
        <TextField
            variant="outlined" 
            sx={{width: '100%', marginTop: 2, marginBottom: 2, background: '#ffffff'}} 
            placeholder="Search location" 
            onChange={e => setInput(e.target.value)} 
         />
    )
}
