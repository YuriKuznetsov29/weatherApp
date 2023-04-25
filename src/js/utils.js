import { weatherDayClasses, weatherNigthClasses } from "./constants"

export function storage(key, data) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key))
    }
    localStorage.setItem(key, JSON.stringify(data))
}

export function getTimeWithUtcOffset(offset) {
    const date = new Date()
    const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds())
    utcDate.setSeconds(offset)
    const time = utcDate.toLocaleTimeString().slice(0,-3)
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
    const month = utcDate.getMonth()
    const day = utcDate.getDate()
    const hour = utcDate.getHours()
    const hours = time.slice(0, 2)
    const minutes = time.slice(3, 5)
    const modTime = +hours + (+minutes * (10/6)/100)
    return {time, modTime, month, day, hour}
}

export function getWetherImage(sunrise, sunset, code, offset) {
    const {modTime} = getTimeWithUtcOffset(offset)
    const sunriseMod = (+sunrise.slice(0, 2) + (+sunrise.slice(3, 5) * (10/6))/100)
    const sunsetMod = (+sunset.slice(0, 2) + (+sunset.slice(3, 5) * (10/6))/100)

    if (modTime > sunriseMod && sunriseMod < sunsetMod) {
        return weatherDayClasses[code]
    } else {
        return weatherNigthClasses[code]
    }

}