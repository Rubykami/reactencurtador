import React from 'react'
import { Navigate } from 'react-router-dom'
import {isLoggedin} from '../Auth/Auth';

export default function PrivateRoute(Component) {
    function AuthRoute () {    
        if (isLoggedin()) {
            return <Component/>
        }
        else {
            return <Navigate to='/' />
        }
    }

    return AuthRoute();
}