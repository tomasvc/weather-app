import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import axios from 'axios'
import Location from './Location'

export default function Locations() {

    const [locations, setLocations] = useState([])
    const [favoriteLocations, setFavoriteLocations] = useState([])

    const onFavoriteClick = (item) => {
        let isItemInFavorites = favoriteLocations.some(el => el.location.location.name === item.location.location.name)
        if (!isItemInFavorites) {
            if (favoriteLocations.length === 0) {
                item.isFavorite = true
                setFavoriteLocations([item])
                console.log(locations.filter(el => el.location.location.name !== item.location.location.name))
                setLocations([item, ...locations.filter(el => el.location.location.name !== item.location.location.name)])
            } else if (favoriteLocations.length > 0) {
                item.isFavorite = true
                setFavoriteLocations([item, ...favoriteLocations])
                console.log(favoriteLocations) 
                setLocations([...favoriteLocations, ...locations.filter(el => el.location.location.name !== item.location.location.name)])
                console.log(locations)
            }
        } else {
            item.isFavorite = false
            setFavoriteLocations(favoriteLocations.filter(el => el.location.location.name !== item.location.location.name))
            setLocations([...favoriteLocations, ...locations])
        }
    }

    const onEdit = (name) => {

    }

    const onDeleteClick = (name) => {
        setLocations(locations.filter(item => {
            return item.location.name !== name
        }))
    }


    useEffect(() => {

        axios.all([
            axios('http://api.weatherapi.com/v1/current.json?key=b052758d6ca34a0ea45160442211011&q=London'),
            axios('http://api.weatherapi.com/v1/current.json?key=b052758d6ca34a0ea45160442211011&q=Paris'),
            axios('http://api.weatherapi.com/v1/current.json?key=b052758d6ca34a0ea45160442211011&q=New York'),
            axios('http://api.weatherapi.com/v1/current.json?key=b052758d6ca34a0ea45160442211011&q=Tokyo')
        ])
        .then(response => {
            let array = []
            response.map(item => {
                array = [...array, {location: item.data, isFavorite: false}]
                console.log(array)
                return setLocations(array)
            })
        })

    }, [])


    // useEffect(() => {
    //     console.log(locations)
    //     console.log(favoriteLocations)
    // }, [locations, favoriteLocations])


    return (
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
                            onFavoriteClick={() => onFavoriteClick(item)} 
                            onDeleteClick={onDeleteClick} 
                        />
            })}
        </Grid>
    )
}