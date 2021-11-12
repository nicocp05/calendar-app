import React from 'react';
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventCleanActive } from '../../actions/events';

export const AddNewFab = () => {

    const dispatch = useDispatch();

    const handleClickNew = () => {
        dispatch( uiOpenModal() )
        dispatch( eventCleanActive() );
    }

    return (
        <button className="btn btn-primary fab" onClick={ handleClickNew }>
            <i className="fas fa-plus"></i>
        </button>
    )
}
