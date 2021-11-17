import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';

import { Navbar } from '../ui/Navbar.js';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent.js';
import { CalendarModal } from './CalendarModal.js';
import { uiOpenModal } from '../../actions/ui';
import { eventCleanActive, eventSetActive, eventStartLoading } from '../../actions/events.js';
import { AddNewFab } from '../ui/AddNewFab.js';
import { DeleteEventFab } from '../ui/DeleteEventFab.js';

moment.locale('es');

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector(state => state.calendar);
    const { id } = useSelector(state => state.auth)

    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );

    useEffect(() => {
        dispatch( eventStartLoading() )
    }, [dispatch])

    const onDoubleClick = (e) => {
        dispatch( uiOpenModal() );
    }

    const onSelectEvent = (e) => {
        dispatch( eventSetActive( e ) );
    } 

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    } 

    const onSelectSlot = (e) => {
        dispatch( eventCleanActive() );
    }

    const eventStyleGetter = ( event, start, end, isSelected ) => {

        const style = {
            backgroundColor: ( event.user.userId === id ) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }
    }

    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                onSelectSlot={onSelectSlot}
                selectable={true}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />

            <AddNewFab />

            {
                ( activeEvent ) && <DeleteEventFab />
            }

            <CalendarModal />
        </div>
    )
}
