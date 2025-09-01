
import { useState } from 'react'
import './App.css'
import axios from "axios"
import { useEffect } from 'react'
import Map from './components/Map'
import "leaflet/dist/leaflet.css";


function App() {

  const key = "99707609b0b33c5db8e8b62df218a3f8"
  const [value,setValue] = useState("")
  const [city, setCity] = useState({})
  const [error, setError] = useState(null)
  const [loading,setLoading] = useState(false)
  const regionNames = new Intl.DisplayNames(["uk"], { type: "region" });
  const weatherTranslations = {
  Clear: "Ясно ☀️",
  Clouds: "Хмарно ☁️",
  Rain: "Дощ 🌧️",
  Snow: "Сніг ❄️",
  Thunderstorm: "Гроза ⛈️",
  Drizzle: "Мряка 🌦️",
  Mist: "Туман 🌫️",
  Smoke: "Дим 💨",
  Haze: "Імла 🌫️",
  Dust: "Пил 🌪️",
  Fog: "Туман 🌁",
  Sand: "Пісок 🏜️",
  Ash: "Попіл 🌋",
  Squall: "Шквал 🌬️",
  Tornado: "Торнадо 🌪️"
};




  const getWeather = async(e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      setLoading(true)
      setError(null)
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${key}&units=metric`
        const res = await axios.get(url)
        setCity(res.data)
        setError(null)
        setValue("")
      }
      catch (err) {
        setCity({})
        setError('Місто не знайдено')
      }
      finally {
        setLoading(false)
      }
    }
  }


  useEffect(() => {
    console.log(city)
  },[city])


  return (
  <div className='container'>
    <div className="weather-wrapper">

      <div className="header">
        <h2>Введіть місто</h2>
        <input type="text" value={value} onChange={(e)=>setValue(e.target.value)} onKeyDown={getWeather}/>
      </div>

      {loading && <div className="loading">Завантаження...</div>}

      {error && !loading && <div className='error'>{error}</div>}

      <div className="weather-content">
        {city.name && (
          <>
            <div className="weather-info">
              <div className="city">
                {city.name && city.sys && (
                  <p>{city.name}, {regionNames.of(city.sys.country) || city.sys.country}</p>
                )}
              </div>

              <div className="temp">
                {city.main && <p>{city.main.temp.toFixed()}°C</p>}
              </div>

              <div className="desk">
                {city.weather && <p>{weatherTranslations[city.weather[0].main]}</p>}
              </div>

              {city.name && city.main && city.wind && (
                <div className="footer">
                  <div className="feels_like">
                    <p>{city.main.feels_like?.toFixed()}°C</p>
                    <p>Відчувається як</p>
                  </div>
                  <div className='humidity'>
                    <p>{city.main.humidity?.toFixed()}%</p>
                    <p>Вологість</p>
                  </div>
                  <div className="wind">
                    <p>{city.wind.speed?.toFixed()} м/c</p>
                    <p>Швидкість вітру</p>
                  </div>
                </div>
              )}
            </div>

            <div className="map-section">
              <Map city={city} />
            </div>

            <div className="map-spacer"></div>
          </>
        )}
      </div>

    </div>
  </div>
)


}

export default App
