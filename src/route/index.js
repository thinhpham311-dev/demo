import React from 'react';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Logout from '../Pages/Logout';
import Locations from '../Pages/Locations';
import PageNotFound from '../Pages/PageNotFound';
import { Redirect } from 'react-router-dom';


export const protectedRoute = [
    { path: '/home', component: Home},
    { path: '/locations', component: Locations},
    { path: '/', exact: true, component: () => <Redirect to="/home" /> },
    {path: '*', exact: true, component: PageNotFound}
];
export const publicRoute = [
    { path: '/login', component: Login },
    { path: '/logout', component: Logout }
];
