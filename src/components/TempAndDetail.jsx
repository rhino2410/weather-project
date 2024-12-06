import { FaThermometerQuarter } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FaWind } from "react-icons/fa6";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";
import { LuSun, LuSunrise } from "react-icons/lu";

const TempAndDetail = ({weather}) => {
    const { 
        temp, 
        feels_like, 
        temp_min, 
        temp_max, 
        humidity, 
        speed, 
        sunrise, 
        sunset, 
        icon, 
        details 
    } = weather;
    const verticalDetail = [
        {
            id: 1,
            Icon: FaThermometerQuarter,
            title: "Real Feel:",
            value: `${feels_like.toFixed()}°`,
        },
        {
            id: 2,
            Icon: BiSolidDropletHalf,
            title: "Humidity:",
            value: `${humidity.toFixed()}%`,
        },
        {
            id: 3,
            Icon: FaWind,
            title: "Wind:",
            value: `${speed.toFixed()} km/h`,
        },


    ]

    const horizontalDetail = [
        {
            id:1,
            Icon: FiSunrise,
            title: "Sunrise:",
            value: sunrise,
        },
        {
            id:2,
            Icon: FiSunset,
            title: "Sunset:",
            value: sunset,
        },
        {
            id:3,
            Icon: FaAngleUp,
            title: "High:",
            value: `${temp_max.toFixed()}°`,
        },
        {
            id:4,
            Icon: FaAngleDown,
            title: "Low:", 
            value: `${temp_min.toFixed()}°`,
        },
    ]
  return (
    <div>
        <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
            <p>{details}</p>
        </div>

        <div className="flex flex-row justify-between items-center py-3">
            <img src={icon} alt="weather img" className="w-20"/>

            <p className="text-5xl">{`${temp.toFixed()}°`}</p>

            <div className="flex flex-col items-start space-y-3">
                {
                    verticalDetail.map(({id, Icon, title, value}) => (
                        <div key={id} className="flex font-light text-sm items-center justify-center">
                            <Icon className="mr-1" />
                            {`${title}`} 
                            <span className="font-medium ml-1">{value}</span>
                        </div>
                    ))
                }
            </div>
        </div>

        <div className="flex flex-row items-center justify-center space-x-10 text-sm py-3">
                {
                    horizontalDetail.map(({id, Icon, title, value}) => (
                        <div key={id} className="flex flex-row items-center">
                            <Icon size={20} className="mr-1" />
                            {`${title}`}
                            <span className="text-sm font-medium ml-1">{value}</span>
                        </div>
                    ))
                }
        </div>
    </div>
  )
}

export default TempAndDetail