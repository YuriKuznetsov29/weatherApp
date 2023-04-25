import getData from "../../services"
import { weatherDescription} from "../../constants"
import { getTimeWithUtcOffset, getWetherImage } from "../../utils"

export async function getCurrentWeatherTemplate(root, location) {
    if (!location) return ''

    loading(root)
    const {lat, lon, timezone} = location
    const {getWeatherForRecentLocation} = getData()
    const data = await getWeatherForRecentLocation(lat, lon, timezone)
    const {currentTemp, weathercode, realFeel, sunrise, sunset, utcOffset, moi, dewpoint, pressure, uvIndex, precipProb, visibility} = data
    const image = getWetherImage(sunrise, sunset, weathercode, utcOffset)
    
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
    const {time, month, day} = getTimeWithUtcOffset(data.utcOffset)

    root.innerHTML = ''
    root.insertAdjacentHTML('afterbegin', `
        <div class="container">
            <div class="currentWeather__wrapper">
                <div class="currentWeather__data">
                    <div class="currentWeather__data-time">${day} ${months[month]}, ${time}</div>
                    <div class="currentWeather__data-temp">${currentTemp}°C</div>
                    <div class="currentWeather__data-Feeltemp">Ощущается как ${realFeel}°C</div>
                </div>
                <div class="currentWeather__code">
                    <i class="wi ${image} code-icon"></i>
                    <div class="currentWeather__codeValue">${weatherDescription[weathercode]}</div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="currentWeather__nowTitle">Сейчас</div>
            <div class="currentWeather__wrapper">
                <div class="currentWeather__data">
                    <div class="currentWeather__data-name">Влажность</div>
                    <div class="currentWeather__data-name">Точка росы</div>
                    <div class="currentWeather__data-name">Давление</div>
                    <div class="currentWeather__data-name">УФ-индекс</div>
                    <div class="currentWeather__data-name">Вероятность осадков</div>
                    <div class="currentWeather__data-name">Видимость</div>
                    
                </div>
                <div class="currentWeather__values">
                    <div class="currentWeather__data-value">${moi} %</div>
                    <div class="currentWeather__data-value">${dewpoint} °C</div>
                    <div class="currentWeather__data-value">${pressure} мбар</div>
                    <div class="currentWeather__data-value">${uvIndex}</div>
                    <div class="currentWeather__data-value">${precipProb} %</div>
                    <div class="currentWeather__data-value">${visibility} M</div>
                </div>
            </div>
        </div>
        `
    )
}

function loading(root) {
    root.innerHTML = ''
    root.insertAdjacentHTML('afterbegin', `
        <div class="container">
            <div class="loading" id="load">
                <div class="gradient"></div>
            </div>
        </div>
        <br>
        <br>
        <br>
        <div class="container">
            <div class="loading" id="load">
                <div class="gradient"></div>
            </div>
        </div>`)
}

