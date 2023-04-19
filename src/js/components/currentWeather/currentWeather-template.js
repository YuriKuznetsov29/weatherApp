import getData from "../../services"
import { weatherDescription, weatherDayClasses, weatherNigthClasses } from "../../constants"

export async function getCurrentWeatherTemplate(root, location) {
    if (!location) return ''

    loading(root)
    const {lat, lon, timezone} = location
    const {getWeatherForRecentLocation} = getData()
    const data = await getWeatherForRecentLocation(lat, lon, timezone)
    console.log(data.utcOffset)
    
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
    const {time, month, day} = getTimeWithUtcOffset(data.utcOffset)

    root.innerHTML = ''
    root.insertAdjacentHTML('afterbegin', `
        <div class="container">
            <div class="currentWeather__wrapper">
                <div class="currentWeather__data">
                    <div class="currentWeather__data-time">${day} ${months[month]}, ${time}</div>
                    <div class="currentWeather__data-temp">${data.currentTemp}°C</div>
                    <div class="currentWeather__data-Feeltemp">Ощущается как ${data.realFeel}°C</div>
                </div>
                <div class="currentWeather__code">
                    <i class="wi ${weatherDayClasses[data.weathercode]} code-icon"></i>
                    <div class="currentWeather__codeValue">${weatherDescription[data.weathercode]}</div>
                </div>
            </div>
        </div>`
    )
}

function getTimeWithUtcOffset(offset) {
    const date = new Date()
    const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds())
    utcDate.setSeconds(offset)
    const time = utcDate.toLocaleTimeString().slice(0,-3)
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
    const month = utcDate.getMonth()
    const day = utcDate.getDate()
    return {time, month, day}
}

function loading(root) {
    root.innerHTML = ''
    root.insertAdjacentHTML('afterbegin', `
        <div class="container">
            <div class="loading" id="load">
                <div class="gradient"></div>
            </div>
        </div>`)
}

