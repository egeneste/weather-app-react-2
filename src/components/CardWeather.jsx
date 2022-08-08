import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

const CardWeather = ({lat, lon}) => {
    
  const [weather, setWeather] =  useState();
  const [temperature, setTemperature] = useState('')
  const [tempUnit, setTempUnit] = useState("c")
  const [toggleTempUnit, setToggleTempUnit] = useState(false)

    const getWeatherInfo = async (URL) => {
        const weatherInfo = await axios.get(URL)
      
        setWeather(weatherInfo.data)
        setTempUnit('c')
    }
    useEffect(() => {
        if (lat && lon){
            const API_KEY = '9c51206483db78dcb6a95612a895e3c8'
            const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
            getWeatherInfo(URL)
        }
        
    }, [lat, lon])
  
    useEffect(() => {
      if (tempUnit === 'f'){
        setTemperature(`${Math.round(((parseFloat(weather?.main.temp) - 273.15) * 9 / 5 + 32 ) *100)/100}  °F`)
      }
      else {
        setTemperature(`${Math.round((parseFloat(weather?.main.temp) - 273.15)*100)/100}  °C`)
      }

    },[tempUnit])
  const handle_unit_changed = () => {
    if (tempUnit === 'f') {
      setTempUnit('c')
    }
    else {
      setTempUnit("f")
    }
    
  }
  return (
    <>
      {weather ? 
      <div className='card'>
        <h2>Weather App</h2>
        <p>{weather.name}, {weather.sys.country}</p>
       
        <div className='weather'>
          <div className='image'>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="code" />
          </div>
          <div className="weather-datos">
            <p>&#34;{weather.weather[0].description}&#34;</p>
            <p>Wind speed : <span>{weather.wind.speed} m/s</span></p>
            <p>Clouds: <span>{weather.clouds.all} %</span></p>
            <p>Pressure: <span>{weather.main.pressure} hPa</span></p>
          </div>
        </div>
        
        <p className="temperature">{tempUnit == "c" ? `${Math.round(((parseFloat(weather?.main.temp) - 273.15) * 9 / 5 + 32)*100)/100} °F`: 
          `${Math.round((parseFloat(weather?.main.temp) - 273.15)*100)/100} °C`
          }</p>
        
        <button onClick={handle_unit_changed}>Degree </button>
      </div> 
      :<div>oops</div>}
    </>
  )
}

export default CardWeather