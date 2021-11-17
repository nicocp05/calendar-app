import { types } from '../types/types';
import { fetchWithToken } from '../helpers/fetch';
import { prepareEvents } from '../helpers/prepareEvents';
import Swal from 'sweetalert2';

const eventAddNew = ( event ) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventStartAddNew = ( event ) => {
    return async (dispatch, getState) => {

        const { id, name } = getState().auth;
        
        try {
            
            const resp = await fetchWithToken( 'events', event, 'POST' );
            const body = await resp.json();

            if( body.ok ) {
                event.eventId = body.eventCreated.eventId;
                event.user = {
                    userId: id,
                    name
                }
                dispatch( eventAddNew( event ) );
            }

        } catch (error) {
            
            console.log(error);

        }


        

    }
}

export const eventSetActive = ( event ) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventCleanActive = () => ({
    type: types.eventCleanActive
});

export const eventStartUpdate = ( event ) => {
    return async (dispatch) => {

        try {

            const resp = await fetchWithToken( `events/${event.eventId}`, event, 'PUT' );
            const body = await resp.json();

            if( body.ok ) {
                dispatch( eventUpdated( event ) );
            } else {
                Swal.fire('Error', body.msg, 'error')
            }

        } catch (error) {
            console.log(error);
        }

    }
}

const eventUpdated = (event) => ({
    type: types.eventUpdate,
    payload: event
});

export const eventStartDelete = () => {
    return async (dispatch, getState) => {

        const { eventId } = getState().calendar.activeEvent;

        try {

            const resp = await fetchWithToken( `events/${eventId}`, {}, 'DELETE' );
            const body = await resp.json();

            if( body.ok ) {
                dispatch( eventDelete( ) );
            } else {
                Swal.fire('Error', body.msg, 'error')
            }

        } catch (error) {
            console.log(error);
        }

    }
}

const eventDelete = () => ({
    type: types.eventDelete
});

export const eventStartLoading = () => {
    return async (dispatch) => {

        try {

            const resp = await fetchWithToken( 'events' )
            const body = await resp.json();

            const events = prepareEvents( body.events );
            
            dispatch( eventLoaded( events ) );
            
        } catch (error) {
            console.log(error);
        }

    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
});

export const eventLogout = () => ({
    type: types.eventLogout
});