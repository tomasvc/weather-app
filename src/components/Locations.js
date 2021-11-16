import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import axios from 'axios'
import Location from './Location'
import Search from './Search'

export default function Locations() {

    const [locations, setLocations] = useState(JSON.parse(localStorage.getItem('locations')))
    const [favoriteLocations, setFavoriteLocations] = useState([])

    useEffect(() => {
        localStorage.setItem('locations', JSON.stringify(locations))
    }, [locations])

    // const onFavoriteClick = (item) => {
    //     let isItemInFavorites = favoriteLocations.some(el => el.location.location.name === item.location.location.name)
    //     if (!isItemInFavorites) {
    //         if (favoriteLocations.length === 0) {
    //             item.isFavorite = true
    //             setFavoriteLocations([item])
    //             setLocations([item, ...locations.filter(el => el.location.location.name !== item.location.location.name)])
    //         } else if (favoriteLocations.length > 0) {
    //             item.isFavorite = true
    //             setFavoriteLocations([item, ...favoriteLocations])
    //             setLocations([...favoriteLocations, ...locations.filter(el => el.location.location.name !== item.location.location.name)])
    //         }
    //     } else {
    //         item.isFavorite = false
    //         setFavoriteLocations(favoriteLocations.filter(el => el.location.location.name !== item.location.location.name))
    //         setLocations([...favoriteLocations, ...locations])
    //     }
    // }

    const onEdit = (name) => {

    }

    const onDelete = (name) => {
        setLocations(locations.filter(item => {
            return item.location.location.name !== name
        }))
    }


    // useEffect(() => {

    //     axios.all([
    //         axios('https://api.weatherapi.com/v1/current.json?key=b052758d6ca34a0ea45160442211011&q=London'),
    //         axios('https://api.weatherapi.com/v1/current.json?key=b052758d6ca34a0ea45160442211011&q=Paris'),
    //         axios('https://api.weatherapi.com/v1/current.json?key=b052758d6ca34a0ea45160442211011&q=New York'),
    //         axios('https://api.weatherapi.com/v1/current.json?key=b052758d6ca34a0ea45160442211011&q=Tokyo')
    //     ])
    //     .then(response => {
    //         let array = []
    //         response.map(item => {
    //             array = [...array, {location: item.data, isFavorite: false}]
    //             return setLocations(array)
    //         })
    //     })

    // }, [])

    
    const addLocation = (item) => {
        axios(`https://api.weatherapi.com/v1/current.json?key=b052758d6ca34a0ea45160442211011&q=${item?.label}`)
            .then(res => {
                if (locations?.some( el => el.location.location.name === res.data.location.name)) {
                    alert('This location already exists in your list')
                } else {
                    setLocations([{location: res?.data, isFavorite: false}, ...locations]) 
                }
            })
        
            
    }


    return (
        <>
            <Search onAddLocation={addLocation} />
            <Grid maxWidth="md" sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gridGap: 10,
                    marginBottom: 5,
                    background: '#fafafa'
                }}>
                {locations?.map((item) => {
                    return <Location 
                                key={item.location.location.name} 
                                name={item.location.location.name} 
                                tempC={item.location.current.temp_c} 
                                tempF={item.location.current.temp_f} 
                                condition={item.location.current.condition.text}
                                isFavorite={item.isFavorite}
                                // onFavoriteClick={() => onFavoriteClick(item)} 
                                onDeleteClick={onDelete} 
                            />
                })}
            </Grid>
        </>
    )
}