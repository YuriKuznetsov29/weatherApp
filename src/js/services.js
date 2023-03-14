import { request } from "./http";

function getData() {
    const getLocation = () => {
        const data = request('https://api.ipgeolocation.io/ipgeo?apiKey=17a8d753063e4a20a9531fe3638de576');
        // function success(pos) {
        //     var crd = pos.coords;
        //     console.log('Ваше текущее местоположение:');
        //     console.log(`Широта: ${crd.latitude}`);
        //     console.log(`Долгота: ${crd.longitude}`);
        //     console.log(`Плюс-минус ${crd.accuracy} метров.`);
        //     console.log(crd);
        //   };

        //   navigator.geolocation.getCurrentPosition(success)
          
          return data.then(res => {
            return {
                city: res.city,
                lat: res.latitude,
                lon: res.longitude,
            }
          })
        // return data;
    }

    // 
    // http://ip-api.com/json/

    const getCityLocation = (city) => {
        const data = request(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
        return data;
    }

    const getLastDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const lastDate = new Date(year, month, day + 15);
        const lastYear = lastDate.getFullYear();
        const lastmonth = lastDate.getMonth();
        const lastDay = lastDate.getDate();
        const transformLastDate = `${lastYear}-${(lastmonth + 1) < 10 ? `0${(lastmonth + 1)}` : (lastmonth + 1)}-${lastDay < 10 ? `0${lastDay}` : lastDay}`;
        console.log(transformLastDate);
        return transformLastDate;
    }

    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const currentDate = `${year}-${(month + 1) < 10 ? `0${(month + 1)}` : (month + 1)}-${day < 10 ? `0${day}` : day}`;
        // console.log(currentDate);
        return currentDate;
    }

    const getWeather = (lat, lon, day = getCurrentDate()) => {
        const data = request(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,precipitation,weathercode,pressure_msl,surface_pressure,windspeed_10m,winddirection_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&timezone=Europe%2FMoscow&start_date=${day}&end_date=${getLastDate()}`);
        data.then(console.log)
        console.log(day);
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
                weathercode: res.hourly.weathercode[hour],
                dailyTemp: res.hourly.temperature_2m.slice(0, 24),
                dailyMoi: res.hourly.relativehumidity_2m.slice(0, 24),
                dailyWind: res.hourly.windspeed_10m.slice(0, 24).map(el => Math.round(el)),
                dailyWindDir: res.hourly.winddirection_10m.slice(0, 24),
                dailyPressure: res.hourly.pressure_msl.slice(0, 24).map(el => Math.round(el)),
                dailyTime: res.hourly.time.slice(0, 24).map(item => item.slice(-5)),
            }
            return result;
        })
    }

    return {getLocation, getCityLocation, getWeather};
}

export default getData;