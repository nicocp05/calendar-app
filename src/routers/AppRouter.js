import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { LoginScreen } from '../components/auth/LoginScreen';
import { startChecking } from '../actions/auth';
import { PrivateRoute } from '../routers/PrivateRoute';
import { PublicRoute } from '../routers/PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const { checking, id } = useSelector(state => state.auth);

    useEffect(() => {
        
        dispatch( startChecking() );

    }, [dispatch]);

    if( checking ) {
        return (<h5>Espere...</h5>)
    }

    return (
        <Router>
            <div>
                <Switch>
                        <PublicRoute isAuthenticated={ !!id } exact path="/login" component={ LoginScreen } />
                        <PrivateRoute isAuthenticated={ !!id } exact path="/" component={ CalendarScreen } />  
                        <Redirect to="/" /> 
                </Switch>
            </div>
        </Router>
    )
}
