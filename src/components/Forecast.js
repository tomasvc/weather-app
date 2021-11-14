import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Forecast() {

    useEffect(() => {

        let today = new Date()
        let currentTime = today.getHours()

        coords && (
        axios(`http://api.weatherapi.com/v1/forecast.json?key=b052758d6ca34a0ea45160442211011&q=${coords.lat},${coords.lon}&days=4&aqi=no`)
            .then(res => {
                console.log(res)
                setCurrentLocation({
                    name: res.data.location.name,
                    temp_c: res.data.current.temp_c,
                    temp_f: res.data.current.temp_f,
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

                console.log(forecast)
                setHourlyForecast(forecast)
            })
        )
    }, [coords])

    return (
        <div>
            
        </div>
    )
}
