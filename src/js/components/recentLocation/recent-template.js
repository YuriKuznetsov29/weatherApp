import getData from "../../services"
import { weatherDayClasses } from "../../constants"

export function addRecentItems(locations) {
    const {getWeatherForRecentLocation} = getData()
    const recentWrapper = document.querySelector('#recentWrapper')
    loading(locations, recentWrapper)

    const itemArr = []
    locations.forEach(async (location, i, arr) => {
        const {lat, lon, city} = location

        let data
        try {
            data = await getWeatherForRecentLocation(lat, lon)
        } catch (error) {
            throw error
        }

        itemArr.push(`
                <div class="recent-locations__item" data-type="recentItem" data-recentLocation="${lat},${lon},${city}">
                    <div class="recent-locations__item-city">${city}</div>
                    <div class="recent-locations__item-country">Россия</div>
                    <div class="recent-locations__item-data">
                        <i class="wi ${weatherDayClasses[data.weathercode]} recent-icon"></i>
                        <div class="recent-locations__item-data-temp">${data.currentTemp}</div>
                        <i class="ph-thin ph-thermometer"></i>
                    </div>
                    <div class="recent-locations__item-realFeel">
                        <div class="recent-locations__item-realFeel-note">RealFeel</div>
                        <div class="recent-locations__item-realFeel-temp">${data.realFeel}°C</div>
                    </div>
                </div>`)
                console.log(i)

        if (arr.length === itemArr.length) {
            recentWrapper.innerHTML = ''
            console.log(locations)
            console.log(itemArr)
            console.log(arr.length)
            recentWrapper.insertAdjacentHTML('afterbegin', itemArr.join(''))
        }
    })
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