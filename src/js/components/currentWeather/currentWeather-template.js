import getData from "../../services"
import { weatherDescription } from "../../constants"

export async function getCurrentWeatherTemplate(root, location) {
    if (!location) return ''
    const {lat, lon} = location
    const date = new Date()
    const time = date.toLocaleTimeString().slice(0,-3)
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
    const month = date.getMonth()
    const day = date.getDate()
    const {getWeatherForRecentLocation} = getData()
    const data = await getWeatherForRecentLocation(lat, lon)
    root.innerHTML = ''
    root.insertAdjacentHTML('afterbegin', `
        <div class="container">
            <div class="currentWeather__wrapper">
                <div class="currentWeather__data">
                    <div class="currentWeather__data-time">${day} ${months[month]}, ${time}</div>
                    <div class="currentWeather__data-temp">${data.currentTemp}C</div>
                    <div class="currentWeather__data-Feeltemp">Ощущается как ${data.realFeel}°C</div>
                </div>
                <div class="currentWeather__code">
                    <i class="ph-thin ph-sun code-icon"></i>
                    <div class="currentWeather__codeValue">${weatherDescription[data.weathercode]}</div>
                </div>
            </div>
        </div>`
    )
}