import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Box, Typography, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import TempContext from './TempContext'
import Locations from './Locations'
import Search from './Search'
import SwitchTemp from './SwitchTemp'

export default function Homepage() {

    const [temp, setTemp] = useState('C')

    const [coords, setCoords] = useState()
    const [currentLocation, setCurrentLocation] = useState()
    const [hourlyForecast, setHourlyForecast] = useState()
    const [dailyForecast, setDailyForecast] = useState()
    const [tabValue, setTabValue] = useState('1')

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue)
    }

    useEffect(() => {
        console.log(temp)
    }, [temp])

    useEffect(() => {

        let success = pos => {
            setCoords({'lat': pos.coords.latitude, 'lon': pos.coords.longitude})
        }

        navigator.geolocation.getCurrentPosition(success)

    }, [])


    // get current location data
    useEffect(() => {

        let today = new Date()
        let currentTime = today.getHours()

        coords && (
        axios(`http://api.weatherapi.com/v1/forecast.json?key=b052758d6ca34a0ea45160442211011&q=${coords.lat},${coords.lon}&days=7&aqi=no`)
            .then(res => {
                setCurrentLocation({
                    name: res.data.location.name,
                    temp_c: res.data.current.temp_c,
                    temp_f: res.data.current.temp_f,
                    feelsLike_c: res.data.current.feelslike_c,
                    feelsLike_f: res.data.current.feelslike_f,
                    wind_mph: res.data.current.wind_mph,
                    wind_dir: res.data.current.wind_dir,
                    vis_miles: res.data.current.vis_miles,
                    humidity: res.data.current.humidity,
                    condition: res.data.current.condition.text,
                    icon: res.data.current.condition.icon
                })

                let hours = res.data.forecast.forecastday[0].hour

                let forecast = hours.filter(hour => {

                    let time = Number(hour.time.slice(-5,-3)) 
                    if (time > currentTime) {
                        return hour
                    }

                })

                setHourlyForecast(forecast)

                let days = res.data.forecast.forecastday

                setDailyForecast(days.map(day => day))
            })
        )
    }, [coords])
 

    return (
        <TempContext.Provider value={{temp, setTemp}}>
            <Container maxWidth="md" sx={{background: '#fafafa'}}>
                <Container maxWidth="md" sx={{
                    display: 'flex', 
                    justifyContent: 'space-between',  
                    padding: 5,
                    margin: 'auto',
                    zIndex: 1
                    }}>
                    <Box>
                        <Typography sx={{color: '#222'}} variant="h5">{currentLocation?.name}</Typography>
                        <Typography sx={{color: '#222'}} variant="h2">{temp === 'C' ? currentLocation?.temp_c : currentLocation?.temp_f} &deg;{temp}</Typography>
                        <Typography sx={{color: '#444'}} variant="subtitle1">{currentLocation?.condition}</Typography>
                    </Box>
                    <Box sx={{textAlign: 'right'}}>
                        <Typography sx={{color: '#444', fontSize: '0.9rem'}} variant="subtitle1">Feels like: {temp === 'C' ? currentLocation?.feelsLike_c : currentLocation?.feelsLike_f} &deg;{temp}</Typography>
                        <Typography sx={{color: '#444', fontSize: '0.9rem'}} variant="subtitle1">Humidity: {currentLocation?.humidity}%</Typography>
                        <Typography sx={{color: '#444', fontSize: '0.9rem'}} variant="subtitle1">Wind: {currentLocation?.wind_dir} {currentLocation?.wind_mph} mph</Typography>
                        <Typography sx={{color: '#444', fontSize: '0.9rem'}} variant="subtitle1">Visibility: {currentLocation?.vis_miles} miles</Typography>
                        &deg;C<SwitchTemp />&deg;F
                    </Box>
                </Container>

                <Box sx={{border: '1px solid lightgrey', borderRadius: 1, background: '#ffffff'}}>
                    <TabContext value={tabValue}>
                        <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'stretch'}}>
                            <TabList onChange={handleTabChange}>
                                <Tab sx={{width: '50%'}} label="Hourly forecast" value='1' />
                                <Tab sx={{width: '50%'}} label="Daily forecast" value='2' />
                            </TabList>
                        </Box>
                        <TabPanel sx={{display: tabValue === '2' ? 'none' : 'flex', overflowX: 'auto'}} value='1'>
                            {hourlyForecast?.map(item => {
                                return <Container sx={{textAlign: 'center'}} key={item.time}>
                                            <Typography sx={{fontWeight: 500, color: '#444'}} variant="body2">{item.time.slice(-5)}</Typography>
                                            <img  width="50" alt="weather" src={`https:${item.condition.icon}`} />
                                            <Typography sx={{fontWeight: 500, color: '#222'}} variant="subtitle1">{temp === 'C' ? item.temp_c : item.temp_f}</Typography>
                                        </Container>
                            })}
                        </TabPanel>
                        <TabPanel sx={{display: tabValue === '1' ? 'none' : 'flex', overflowX: 'auto'}} value='2'>
                            {dailyForecast?.map(item => {
                                return <Container sx={{textAlign: 'center'}} key={item.date}>
                                            <Typography sx={{fontWeight: 500, color: '#444'}} variant="body2">{item.date}</Typography>
                                            <img  width="50" alt="weather" src={`https:${item.day.condition.icon}`} />
                                            <Typography sx={{fontWeight: 500, color: '#222'}} variant="subtitle1">{temp === 'C' ? item.day.avgtemp_c : item.day.avgtemp_f}</Typography>
                                        </Container>
                            })}
                        </TabPanel>
                    </TabContext>
                </Box>
                
                <Search />
                <Locations />
            </Container>
        </TempContext.Provider>
    )
}