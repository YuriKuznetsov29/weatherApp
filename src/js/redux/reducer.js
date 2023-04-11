import { RECENT__LOCATION } from "./actions";
import { CURRENT__LOCATION } from "./actions";

export function reducer(state, action) {
    switch (action.type) {
        case RECENT__LOCATION:
            return {
                ...state,
                recentLocation: action.payload
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