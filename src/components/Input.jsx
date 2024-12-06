import { useState } from "react";
import { BiSearch, BiCurrentLocation } from "react-icons/bi";

const Input = ({setQuery, setUnits}) => {

  const [ city, setCity ] = useState("");

  const handleSearchClick = () => {
    if (city !== "")
      setQuery({q: city})
  }

  const handleLocationClick = () => {
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        const { longitude, latitude } = position.coords
        setQuery({lon: longitude, lat: latitude})
      })
    }
  }

  const handleCitySubmit = () => {
    if (city.trim()) {
      setQuery({ q: city }); // Update the query with the entered city
      setCity(""); // Clear the input field
    }
  };

  return (
    <div className="flex flex-row justify-center my-6">
        <div className="flex flex-row justify-center items-center w-3/4 space-x-4">
            <input type="text" placeholder="Enter the city..." 
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCitySubmit(); // Trigger on Enter
              }
            }}
            className="text-gray-500 p-2 text-xl font-medium w-full shadow-xl focus:outline-none"
            />

            <BiSearch size={30} className="cursor-pointer transition ease-out hover:scale-125" onClick={handleSearchClick} />
            <BiCurrentLocation size={30} className="cursor-pointer transition ease-out hover:scale-125" onClick={handleLocationClick} />
        </div>

        <div className="flex flex-row w-1/4 justify-center items-center">
            <button className="text-2xl font-medium mt-1 transition ease-out hover:scale-125" onClick={() => setUnits('metric')}>°C</button>
            <p className="text-2xl font-medium mx-1 mt-1">|</p>
            <button className="text-2xl font-medium mt-1 transition ease-out hover:scale-125" onClick={() => setUnits('imperial')}>°F</button>
        </div>
        
    </div>
    
  )
}

export default Input