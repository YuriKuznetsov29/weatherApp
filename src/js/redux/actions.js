import { CURRENT__LOCATION } from "./types"
import { RECENT__LOCATION } from "./types"

export function changeCurrentLocation(data) {
    return {
        type: CURRENT__LOCATION,
        payload: data
    }
}

export function changeRecentLocations(data) {
    return {
        type: RECENT__LOCATION,
        payload: data
    }
}