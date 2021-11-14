import React, { useState, useContext } from 'react'
import { Grid, Typography, IconButton } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'
import TempContext from './TempContext'

export default function Location({ name, tempC, tempF, condition, isFavorite, onFavoriteClick, onDeleteClick }) {

    const [liked, setLiked] = useState()
    const {temp} = useContext(TempContext)

    const onClick = () => {
        onFavoriteClick()
    }

    return (
        <Grid sx={{
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'space-between', 
            padding: 2,
            borderRadius: 1,
            border: '1px solid lightgrey',
            background: '#ffffff'
            }}>
            <Typography sx={{color: '#222'}}>{name}</Typography> 
            <Typography variant='h4' sx={{color: '#222'}}>{temp === 'C' ? tempC : tempF} &deg;{temp}</Typography>
            <Typography sx={{color: '#222', marginBottom: 1}}>{condition}</Typography> 
            <Grid> 
                <IconButton size="small" onClick={() => onClick(name)}><FontAwesomeIcon icon={isFavorite ? solidHeart : regularHeart} style={{color: isFavorite && '#fc2d2d'}} /></IconButton>
                <IconButton size="small"><FontAwesomeIcon sx={{marginRight: 2}} icon={faPen} style={{color: '#444'}} /></IconButton>
                <IconButton size="small" onClick={() => onDeleteClick(name)}><FontAwesomeIcon icon={faTrash} style={{color: '#444'}} /></IconButton>
            </Grid>
        </Grid>
    )
}
