import { types } from "../types/types";

// {
//     title: 'Cumpleaños del jefe',
//     start: moment().toDate(),
//     end: moment().add(2, 'hours').toDate(),
//     bgColor: '#fafafa',
//     user: {
//         id: '1',
//         name: 'Nico'
//     }
// }

const initialState = {
    events: [],
    activeEvent: null
}

export const calendarReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }
        
        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }
    
        case types.eventCleanActive:
            return {
                ...state,
                activeEvent: null
            }

        case types.eventUpdate:
            return {
                ...state,
                events: state.events.map(
                    e => ( e.eventId === action.payload.eventId ) ? action.payload : e
                )
            }

        case types.eventDelete:
            return {
                ...state,
                events: state.events.filter(
                    e => ( e.eventId !== state.activeEvent.eventId )
                ),
                activeEvent: null
            }

        case types.eventLoaded:
            return {
                ...state,
                events: [...action.payload]
            }

        case types.eventLogout:
            return {
                ...initialState
            }

        default:
            return state;
    }


}