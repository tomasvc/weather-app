import React, { useState, useEffect, useContext } from 'react'
import { Grid, Typography, IconButton, Modal } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'
import TempContext from './TempContext'
import Search from './Search'
import axios from 'axios'

export default function Location({ name, tempC, tempF, condition, isFavorite, onFavoriteClick, onDeleteClick }) {

    const {temp} = useContext(TempContext)

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
            <Typography className="name" sx={{color: '#222'}}>{name}</Typography> 
            <Typography className="temp" variant='h4' sx={{color: '#222'}}>{temp === 'C' ? tempC : tempF} &deg;{temp}</Typography>
            <Typography className="condition" sx={{color: '#222', marginBottom: 1}}>{condition}</Typography> 
            <Grid> 
                <IconButton size="small" onClick={() => onFavoriteClick()} ><FontAwesomeIcon icon={isFavorite ? solidHeart : regularHeart} style={{color: isFavorite && '#fc2d2d'}} /></IconButton>
                <IconButton size="small" onClick={() => onDeleteClick(name)}><FontAwesomeIcon icon={faTrash} style={{color: '#444'}} /></IconButton>
            </Grid>
        </Grid>
    )
}
