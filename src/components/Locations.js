import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import axios from 'axios'
import Location from './Location'
import Search from './Search'

export default function Locations() {

    let _favoriteLocations = localStorage.getItem('favoriteLocations')
    let _locations = localStorage.getItem('locations')

    const [locations, setLocations] = useState(_locations ? JSON.parse(_locations) : [])
    const [favoriteLocations, setFavoriteLocations] = useState(_favoriteLocations ? JSON.parse(_favoriteLocations) : [])


    useEffect(() => {
        localStorage.setItem('locations', JSON.stringify(locations))
        localStorage.setItem('favoriteLocations', JSON.stringify(favoriteLocations))
    }, [locations, favoriteLocations])

    
    const onFavoriteClick = (item) => {
        let isItemInFavorites = favoriteLocations?.some(el => el.location.location.name === item.location.location.name)
        if (!isItemInFavorites) {
            if (favoriteLocations?.length === 0) {
                item.isFavorite = true
                setFavoriteLocations([item])
                setLocations([...locations.filter(el => el.location.location.name !== item.location.location.name)])
            } else if (favoriteLocations?.length > 0) {
                item.isFavorite = true
                setFavoriteLocations([item, ...favoriteLocations])
                setLocations([...locations.filter(el => el.location.location.name !== item.location.location.name)])
            }
        } else {
            item.isFavorite = false
            setFavoriteLocations(favoriteLocations?.filter(el => el.location.location.name !== item.location.location.name))
            setLocations([item, ...locations])
        }
    }

    const onDelete = (name) => {
        setLocations(locations?.filter(item => {
            return item.location.location.name !== name
        }))
        setFavoriteLocations(favoriteLocations?.filter(item => {
            return item.location.location.name !== name
        }))
    }

    const addLocation = (item) => {
        axios(`https://api.weatherapi.com/v1/current.json?key=b052758d6ca34a0ea45160442211011&q=${item?.label}`)
            .then(res => {
                if (locations?.length > 0 || favoriteLocations?.length > 0) {
                    console.log(res.data)
                    locations.forEach(loc => console.log(loc.location.location.name))
                    if (locations?.some( el => el.location.location.name === res.data.location.name ) ||
                        favoriteLocations?.some( el => el.location.location.name === res.data.location.name )) {
                        alert('This location already exists in your list')
                    } else {
                        setLocations([{location: res?.data, isFavorite: false}, ...locations]) 
                    }
                } else {
                    if (locations?.some( el => el.location.location.name === res.data.location.name ) ||
                        favoriteLocations?.some( el => el.location.location.name === res.data.locations.name )) {
                        alert('This location already exists in your list')
                    } else {
                        setLocations([{location: res?.data, isFavorite: false}]) 
                    }
                }
            }).catch(error => console.log(error))
                 
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
                {favoriteLocations?.map((item) => {
                    return <Location 
                    key={item.location.location.name} 
                    name={item.location.location.name} 
                    tempC={item.location.current.temp_c} 
                    tempF={item.location.current.temp_f} 
                    condition={item.location.current.condition.text}
                    isFavorite={item.isFavorite}
                    // editLocation={editLocation}
                    onFavoriteClick={() => onFavoriteClick(item)} 
                    onDeleteClick={onDelete} 
                />
                })}
                {locations?.map((item) => {
                    return <Location 
                                key={item.location.location.name} 
                                name={item.location.location.name} 
                                tempC={item.location.current.temp_c} 
                                tempF={item.location.current.temp_f} 
                                condition={item.location.current.condition.text}
                                isFavorite={item.isFavorite}
                                // editLocation={editLocation}
                                onFavoriteClick={() => onFavoriteClick(item)} 
                                onDeleteClick={onDelete} 
                            />
                })}
            </Grid>
        </>
    )
}