import { fromJS } from "immutable"
import {
    LOCATION_CHANGE,
    CALL_HISTORY_METHOD
} from "react-router-redux"

const initialState = fromJS({
    locationBeforeTransitions: null
})

export function router( state = initialState, action: any ) {

    switch ( action.type ) {
    case LOCATION_CHANGE:
        return state.set( "locationBeforeTransitions", action.payload )
    default:
        return state
    }
}