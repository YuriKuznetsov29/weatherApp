import { RECENT__LOCATION } from "./types";
import { CURRENT__LOCATION } from "./types";

export function reducer(state, action) {
    switch (action.type) {
        case RECENT__LOCATION:
            return {
                ...state,
                recentLocations: action.payload
            }
        case CURRENT__LOCATION:
            return {
                ...state,
                currentLocation: action.payload
            }
    
        default:
            return state
    }
}