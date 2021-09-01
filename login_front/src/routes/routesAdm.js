import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';

export default function RoutesAdm(){
    return (
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
    );
}