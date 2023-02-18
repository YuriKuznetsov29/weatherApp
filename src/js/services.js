import { request } from "./http";

function getData() {
    const getLocation = () => {
        const data = request('http://ip-api.com/json/');
        return data;
    }

    const getCityLocation = (city) => {
        const data = request(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
        return data;
    }

    const getWeather = (lat, lon) => {
        const data = request(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,precipitation,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,windspeed_10m_max,windgusts_10m_max&timezone=Europe%2FMoscow`);
        data.then(console.log)
        return transformWeatherData(data);
    }

    const transformWeatherData = (data) => {
        const hour = new Date().getHours()
        return data.then((res) => {
            let result = {
                currentTemp: res.hourly.temperature_2m[hour],
                currentMoi: res.hourly.relativehumidity_2m[hour],
                currentPrecipitation: res.hourly.precipitation[hour],
                wind: res.hourly.windspeed_10m[hour],
                sunrise: res.daily.sunrise[0].slice(-5),
                sunset: res.daily.sunset[0].slice(-5),
            }
            return result;
        })
    }

    

    return {getLocation, getCityLocation, getWeather};
}

export default getData;