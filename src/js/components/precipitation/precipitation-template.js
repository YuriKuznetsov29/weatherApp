import getData from "../../services"

export function getPrecipitationTemplate(root, location) {
    console.log(location)
    const {lat, lon, timezone} = location
    loading(root)
    const {getWeather} = getData()
    getWeather(lat, lon, timezone).then(res => {
        const itemsArr = res.dailyPrecipitation.map((pecipitation, i) => {
            return `
                <div class="precipitation__item">
                    <div class="precipitation__probability">${res.dailyPrecipitationProb[i]}%</div>
                    <img class="precipitation__quantity-drop" src="drop.svg" alt="drop">
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