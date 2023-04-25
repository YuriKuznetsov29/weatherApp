import getData from "../../services"
import { getWetherImage } from "../../utils"

export function addRecentItems(locations) {
    const {getWeatherForRecentLocation} = getData()
    const recentWrapper = document.querySelector('#recentWrapper')
    loading(locations, recentWrapper)

    const itemArr = []
    locations.forEach(async (location, i, arr) => {
        const {lat, lon, city, timezone, country} = location
        
        const data = await getWeatherForRecentLocation(lat, lon, timezone)
        const {weathercode, realFeel, currentTemp, sunrise, sunset, utcOffset} = data
        const image = getWetherImage(sunrise, sunset, weathercode, utcOffset)

        

        itemArr.push(`
                <div class="recent-locations__item" data-type="recentItem" data-recentLocation="${lat},${lon},${city},${timezone},${country}">
                    ${adaptiveContent(city, country)}
                    <div class="recent-locations__item-data">
                        <i class="wi ${image} recent-icon"></i>
                        <div class="recent-locations__item-data-temp">${currentTemp}</div>
                        <i class="ph-thin ph-thermometer"></i>
                    </div>
                    <div class="recent-locations__item-realFeel">
                        <div class="recent-locations__item-realFeel-note">RealFeel</div>
                        <div class="recent-locations__item-realFeel-temp">${realFeel}°C</div>
                    </div>
                </div>`)
                // console.log(i)

        if (arr.length === itemArr.length) {
            recentWrapper.innerHTML = ''
            recentWrapper.insertAdjacentHTML('afterbegin', itemArr.join(''))
        }
    })
}

function adaptiveContent(city, country) {
    if (document.documentElement.clientWidth > 650) {
        return`<div class="recent-locations__item-city">${city}</div>
        <div class="recent-locations__item-country">${country}</div>`
    } else {
        return `
        <div class="recent-locations__item-city">
            ${city}, <div class="recent-locations__item-country">${country}</div>
        </div>`
    }
}

function loading(locations, root) {
    const loadArr = new Array(locations.length)
        .fill(`<div class="smallLoading">
            <div class="smallGradient"></div>
        </div>`)
    root.innerHTML = ''
    root.insertAdjacentHTML('afterbegin', loadArr.join(''))
}

export function getRecentTemplate() {
    return `<div class="container">
                    <div class="recent-locations__inner">
                        <div class="recent-locations__wrapper">
                            <div class="recent-location__title">НЕДАВНИЕ МЕСТОПОЛОЖЕНИЯ</div>
                        </div>
                        <div class="recent-locations__inner">
                            <div class="recent-locations__wrapper" id="recentWrapper"></div>
                        </div>
                    </div>
            </div>`
}