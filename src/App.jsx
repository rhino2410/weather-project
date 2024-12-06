import React, { useEffect, useState } from 'react'
import './index.css';
import { FaReacteurope } from "react-icons/fa";
import TopButton from './components/TopButton';
import Input from './components/Input';
import TimeAndLocation from './components/TimeAndLocation';
import TempAndDetail from './components/TempAndDetail';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const App = () => {

  const [query, setQuery] = useState({ q: 'Erie' });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    const cityName = query.q ? query.q : "Current location"
    toast.info(`Fetching weather data for ${capitalizeFirstLetter(cityName)}`)

    await getFormattedWeatherData({ ...query, units}).then((data) => {
      toast.success(`Fetched weather data for ${data.name}, ${data.country}`)
      setWeather(data);
    });
  }

  useEffect(() => {
    getWeather()
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-500 to-blue-700";
    const threshhold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshhold) return "from-cyan-500 to-blue-700";
    else return "from-yellow-600 to-orange-700"
  }
  return (
    <div className={`mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-r shadow-xl shadow-gray-400
    ${formatBackground()}`}
    >
        <TopButton setQuery={setQuery}/>
        <Input setQuery={setQuery} setUnits={setUnits}/>
        {
          weather && (
            <>
              <TimeAndLocation weather={weather}/>

              <TempAndDetail weather={weather}/>

              <Forecast title='3 hour step forecast' data={weather.hourly}/>
              <Forecast title ='daily forecast' data={weather.daily}/> 
            </>
          )
        }

        <ToastContainer autoClose={2500} theme='colored' />
         
    </div>
  )
}

export default App