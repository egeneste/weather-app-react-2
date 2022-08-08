import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import CardWeather from './components/CardWeather'

function App() {

  const [coords, setCoords] = useState({})

  
  useEffect( () => {
    const success = pos => {
      setCoords({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      })
    }
    
    navigator.geolocation.getCurrentPosition(success)
  },[])
  
  return (
    <div className="App">
      <CardWeather lat={coords.latitude} lon ={coords.longitude}/>
    </div>
  )
}

export default App
