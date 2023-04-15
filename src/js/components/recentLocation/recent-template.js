import getData from "../../services"

export function addRecentItems(locations) {
    const {getWeatherForRecentLocation} = getData()
    const recentWrapper = document.querySelector('#recentWrapper')
    recentWrapper.innerHTML = ''

    locations.forEach(async (location) => {
        const {lat, lon, city} = location
        const data = await getWeatherForRecentLocation(lat, lon)
        recentWrapper.insertAdjacentHTML('afterbegin', `
            <div class="recent-locations__item" data-type="recentItem" data-recentLocation="${lat},${lon},${city}">
                <div class="recent-locations__item-city">${city}</div>
                <div class="recent-locations__item-country">Россия</div>
                <div class="recent-locations__item-data">
                    <i class="ph-thin ph-sun recent-icon"></i>
                    <div class="recent-locations__item-data-temp">${data.currentTemp}</div>
                    <i class="ph-thin ph-thermometer"></i>
                </div>
                <div class="recent-locations__item-realFeel">
                    <div class="recent-locations__item-realFeel-note">RealFeel</div>
                    <div class="recent-locations__item-realFeel-temp">${data.realFeel}°C</div>
                </div>
            </div>`)

    })
}
                    // <i class="ph-thin ph-thermometer"></i>

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