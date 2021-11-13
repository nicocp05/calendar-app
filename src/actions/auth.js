import { fetchWithoutToken } from "../helpers/fetch"
import { types } from '../types/types';


export const authStartLogin = ( name, password ) => {
    return async ( dispatch ) => {
        
        const resp = await fetchWithoutToken( 'auth/login', { name, password }, 'POST' );
        const body = await resp.json();

        if( body.ok ) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( login({
                name: body.name,
                id: body.id
            }));
        }

    }
}

const login = ( user ) => ({

    type: types.authLogin,
    payload: user

});