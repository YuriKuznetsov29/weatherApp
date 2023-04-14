export function getHeaderTemplate(currentLocation) {
    console.log( 'CURRENT', currentLocation)
    return `
    <div class="container">
        <div class="header__inner">
            <div class="location">
                <div class="location__city" data-type="city">${currentLocation.city}</div>
                
            </div>
            <nav class="nav">
                <a class="nav__link" href="./index.html">Main</a>
                <a class="nav__link" href="./daily.html">Daily</a>
                <!-- <a class="nav__link" href="#">Several days</a>
                <a class="nav__link" href="#">Marine Weather</a>
                <a class="nav__link" href="#">Historical Weather</a>
                <a class="nav__link" href="#">Air Quality</a> -->
            </nav>
            <i class="ph-list burger"></i>
        </div>
    </div>`
}

{/* <div class="location__get__btn">Get your location</div>
                <!-- <div class="location__change__btn">Change location</div> -->
                <div class="location__change__wrapper">
                    <input class="input-city" type="text" placeholder="Input your city"/>
                    <div class="location__change__find">
                    </div>
                </div> */}