import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clearsun.png'
import humidity from '../assets/humidity.png'
import wind from '../assets/wind.png'
import cloud_icon from '../assets/cloud.png'
import snow_icon from '../assets/snow.png'
import drizzle_icon from '../assets/dizzle.png'
import axios from 'axios'



const Weather = () => {
     const inputRef = useRef();
     const [city, setCity] = useState('');
     const [weatherData, setWeatherData] = useState({
      humidity: "",
      windSpeed: "",
      temperature:"",
      location: "",
      icon: ""
  });
     const [error,setError] = useState(false);

      const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        // "09d": rain_icon,
        // "09n": rain_icon,
        // "10d": rain_icon,
        // "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
      }

      
const apikey = 'cd5f4c2f5a61d65f4c6ff367cac38012';
  const search = async (city) => {

    console.log(city);
    if(city === ""){
        alert("Please enter a city Name")
        return  
    }
     
        try{  
            const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    q: city,
                    appid:apikey,
                    units:'metric',
                }
            });
            console.log("res:-----",response.data);
            const icon=allIcons[response.data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: response.data.main.humidity,
                windSpeed: response.data.wind.speed,
                temperature:response.data.main.temp,
                location: response.data.name,
                icon:icon
            })
            console.log("res:-----",response.data);
        }
        catch(error) {
          console.log(error);
          setError(true);
        }
        
  }

  useEffect(() => {
    search("Mumbai");
  },[])

  useEffect(() => {
    if(error){
      setWeatherData({
        humidity: "",
        windSpeed: "",
        temperature: "",
        location: "",
        icon: ""
      })
    }
  },[])

  return (
        <div className='weather'>
          <div className='search-bar'>
              <input ref={inputRef} onChange={(e) => setCity(e.target.value)} type="text" placeholder='Enter city Name' />
              <img src={search_icon} alt="Weather-icon" onClick={() => search(inputRef.current.value)}/>
            </div> 
           <img src={weatherData.icon} alt="sunicon" className='weather-icon' />
           <p className='temperature'>{weatherData.temperature}°C</p>
           <p className='city'>{weatherData.location}</p> 
           <div className='weather-details-container'>
           <div className='weather-details'>
             <div className='col'>
              <img src={humidity} alt="humidity_png" />
              <p className='title'>Humidity</p>
              <p className='value'>{weatherData.humidity}%</p>
             </div>
           </div>
           <div className='weather-details'>
             <div className='col'>
              <img src={wind} alt="wind_png" />
              <p className='title'>Wind</p>
              <p className='value'>{weatherData.windSpeed}km/hr</p>
             </div>
           </div>
           </div>           
        </div>
  );
}
export default Weather;
