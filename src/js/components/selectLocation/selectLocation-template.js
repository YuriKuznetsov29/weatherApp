export function getSelectLocationTemplate() {
    return `
    <div class="container">
        <div id="closeSearch">
            <div class="search__wrapper">
                <i class="ph-thin ph-magnifying-glass search__icon" ></i>
                <input class="search__input" type="text" placeholder="Поиск" data-type="inputLocation"></input>
                    <div class="search__results-wrapper">
                        <div class="search__wrapper">
                            <div class="search__btnCurrentLocation" data-type="getLocation">
                                <i class="ph-thin ph-navigation-arrow currentLocation__icon" data-type="getLocation"></i>
                                Использовать текущее местоположение
                            </div>
                        </div>
                        <div class="search__wrapper">
                            <div class="search__results" data-type="results">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
}

export function insertSearchResults(location) {
    const {country, country_code, name, latitude, longitude, timezone} = location
    return `<div class="search__result" data-type="setLocation" data-location="${latitude},${longitude},${name},${timezone},${country}">${country}, ${name}, ${country_code}</div>`
}