import { DateTime } from "luxon";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/"
console.log("API Key:", API_KEY);


const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
    
    return fetch(url)
    .then((res) => res.json());

}

const formatIconToURL = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

const formatToLocalTime = (secs,
    offset,
    format = "cccc, dd LLL yyyy' | Local time: ' hh:mm a") => DateTime.fromSeconds(secs + offset , {zone: "utc"}).toFormat(format);

const formatCurrent = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_max, temp_min, humidity },
        sys: { country, sunrise, sunset },
        name,
        dt,
        timezone,
        weather,
        wind: { speed },
    } = data;

    const { main: details, icon } = weather[0];
    const formattedLocalTime = formatToLocalTime(dt, timezone);

    return {
        temp,
        feels_like,
        temp_min,
        temp_max, 
        country, 
        name, 
        humidity,
        sunrise: formatToLocalTime(sunrise, timezone, 'hh:mm a'),
        sunset: formatToLocalTime(sunset, timezone, 'hh:mm a'),
        speed,
        details,
        icon: formatIconToURL(icon),
        formattedLocalTime,
        dt,
        timezone,
        lat,
        lon,
    };
};

const formatForecastWeather = (secs, offset, data) => {
    const hourly = data
    .filter((f) => f.dt > secs )
    .map((f) => ({
        temp: f.main.temp,
        title: formatToLocalTime(f.dt, offset, "hh:mm a"),
        icon: formatIconToURL(f.weather[0].icon),
        date: f.dt_txt,
    }))
    .slice(0, 5);

    const daily = data
    .filter((f) => f.dt_txt.slice(-8) === "00:00:00")
    .map(f => ({
        temp: f.main.temp,
        title: formatToLocalTime(f.dt, offset, "ccc"),
        icon: formatIconToURL(f.weather[0].icon),
        date: f.dt_txt,
    }))

    return { hourly, daily }
}

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData(
        "weather", 
        searchParams
    ).then(formatCurrent);

    const { dt, timezone, lat, lon } = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData('forecast', {
        lat,
        lon,
        units: searchParams.units,
    }).then((d) => formatForecastWeather(dt, timezone, d.list));

    return { ...formattedCurrentWeather, ...formattedForecastWeather };


}

export default getFormattedWeatherData;