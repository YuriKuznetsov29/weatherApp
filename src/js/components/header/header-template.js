export function getHeaderTemplate(currentLocation) {

    return `
    <div class="container">
        <div class="header__inner">
            <div class="location__city" data-type="city">${currentLocation.city}</div>
        </div>
    </div>`
}

            // </div>
            // <div class="location">
