import Swal from 'sweetalert2';
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch"
import { types } from '../types/types';


export const authStartLogin = ( name, password ) => {
    return async ( dispatch ) => {
        
        const resp = await fetchWithToken( 'auth/login', { name, password }, 'POST' );
        const body = await resp.json();

        if( body.ok ) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( login({
                name: body.name,
                id: body.id
            }));
        } else {
            Swal.fire('Error', body.msg, 'error')
        }

    }
}

export const startRegister = ( name, password ) => {
    return async ( dispatch ) => {

        const resp = await fetchWithoutToken( 'auth/new', { name, password }, 'POST' );
        const body = await resp.json();

        console.log(body);
        
        if( body.ok ) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( login({
                name: body.userCreated.name,
                id: body.userCreated.userId
            }));
        } else {
            Swal.fire('Error', body.msg, 'error')
        }


    }
}

export const startChecking = () => {
    return async (dispatch) => {

        const resp = await fetchWithToken( 'auth/renew' );
        const body = await resp.json();

        if( body.ok ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({
                id: body.id,
                name: body.name
            }) )
        } else {
            dispatch( checkingFinish() );
        }
    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish });

const login = ( user ) => ({

    type: types.authLogin,
    payload: user

});

export const startLogout = () => {
    return (dispatch) => {

        localStorage.clear();
        dispatch( logout() );

    }

}

const logout = (  ) => ({ type: types.authLogout });