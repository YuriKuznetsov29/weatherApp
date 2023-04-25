import getData from "../../services"

export function getPrecipitationTemplate(root, location) {
    console.log(location)
    const {lat, lon, timezone} = location
    loading(root)
    const {getWeather} = getData()
    getWeather(lat, lon, timezone).then(res => {
        const itemsArr = res.dailyPrecipitation.map((pecipitation, i) => {
            const percent = calckPrecipitationInHour(pecipitation)

            let adaptiveSize
            if (document.documentElement.clientWidth < 1200) {
                adaptiveSize = 50
            } else {
                adaptiveSize = 40
            }

            return `
                <div class="precipitation__item">
                    <div class="precipitation__probability">${res.dailyPrecipitationProb[i]}%</div>
                    <svg class="precipitation__quantity-drop" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40">
                        <linearGradient id="inside-gradient${i}"  x1="100%" y1="100%">
                            <stop offset="${percent}%" stop-color="rgba(8, 0, 255, 1)"/>
                            <stop offset="0" stop-color="rgba(0, 0, 0, 0.0)"/>
                        </linearGradient>
                        <linearGradient id="stroke-gradient${i}"  x1="100%" y1="100%">
                            <stop offset="0" stop-color="blue"/>
                            <stop offset="0" stop-color="white"/>
                        </linearGradient>
                        <rect width="36" height="36" fill="none" />
                        <path d="M208,144c0-72-80-128-80-128S48,72,48,144a80,80,0,0,0,160,0Z" fill="url(#inside-gradient${i})" stroke="rgba(161, 161, 161, 0.8)" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
                    </svg>
                    <div class="precipitation__quantity-value">${pecipitation}</div>
                    <div class="precipitation__time">${res.dailyTime[i]}</div>
                </div>
            `
        })

        root.innerHTML = ''
        root.insertAdjacentHTML('afterbegin', `
        <div class="container">
            <div class="precipitationTitle">Осадки</div>
            <div class="precipitation__wrapper">
                <div class="precipitation__titleWrapper">
                    <div class="precipitation__probability-title">Вероятность</div>
                    <div class="precipitation__quantity-title">
                        Количество<br>(мм)
                    </div>
                </div>
                ${itemsArr.join('')}
            </div>
        </div>
        `)
    })
}

function calckPrecipitationInHour(quantity) {
    const precipPercent = {'0.1': 0, '0.9': 20, '1': 30, '2': 55, '3': 65, '4': 80, '5': 90, '6': 100}
    quantity = quantity > 1 ? (quantity >= 6 ? 6 : Math.round(quantity)) : (quantity > 0.1 ? 0.9 : 0.1)
    return precipPercent[quantity]
}

function loading(root) {
    root.innerHTML = ''
    root.insertAdjacentHTML('afterbegin', `
        <div class="container">
            <div class="loading" id="load">
                <div class="gradient"></div>
            </div>
        </div>
    `)
}

{/* <img class="precipitation__quantity-drop" src="drop.svg" alt="drop"> */}
