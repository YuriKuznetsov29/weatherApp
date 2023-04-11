import getData from "../../services"

const { getWeatherForRecentLocation } = getData()

function getRecentLocationItem(location) {

        const items = []
        location.forEach(async (location) => {
        const {lat, lon} = location
        const data = await getWeatherForRecentLocation(lat, lon)
        items.push(`
        <div class="recent-locations__item">
            <div class="recent-locations__item-city">Архангельск</div>
            <div class="recent-locations__item-country">Россия</div>
            <div class="recent-locations__item-data">
                <i class="ph-thin ph-sun recent-icon"></i>
                <div class="recent-locations__item-data-temp">${data.currentTemp}</div>
                <i class="ph-thin ph-thermometer"></i>
            </div>
            <div class="recent-locations__item-realFeel">
                <div class="recent-locations__item-realFeel-note">RealFeel</div>
                <div class="recent-locations__item-realFeel-temp">10</div>
                <i class="ph-thin ph-thermometer"></i>
            </div>
        </div>`)
    })
    console.log(items.join(' '))
    
    return items.join('')
}

export function getRecentTemplate(locations) {
    return `<div class="container">
    <div class="recent-locations__inner">
        <div class="recent-locations__wrapper">
            <div class="recent-location__title">НЕДАВНИЕ МЕСТОПОЛОЖЕНИЯ</div>
        </div>
    </div>
    <div class="recent-locations__inner">
        <div class="recent-locations__wrapper">
            ${getRecentLocationItem(locations)}
            </div>
        </div>
    </div>
</div>`
}