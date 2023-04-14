import getData from "../../services"
import { weatherDescription } from "../../constants"

export async function getCurrentWeatherTemplate(root, location) {
    if (!location) return ''
    const {lat, lon} = location
    const {getWeatherForRecentLocation} = getData()
    const data = await getWeatherForRecentLocation(lat, lon)
    root.innerHTML = ''
    root.insertAdjacentHTML('afterbegin', `
        <div class="container">
            <div class="currentWeather__wrapper">
                <div class="currentWeather__data">
                    <div class="currentWeather__data-time">12 апреля, 14:22</div>
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