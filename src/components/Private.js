import React from 'react';
import { Navigate } from 'react-router-dom';
//import { authenticationService } from '../services';

function Private( props) {
//function Private( Component, user, roles, ...props) {
    //const currentUser = JSON.parse(sessionStorage.getItem("user"))[0]
    //console.log(props.user)
    const roles = props.roles
    const currentUser = props.user
    const Component = props.Component
    if (!currentUser) {
        // not logged in so redirect to login page with the return url
        return <Navigate to={{ pathname: '/users-login' }} />
    }

    // check if route is restricted by role
    if (roles && roles.indexOf(currentUser.role) === -1) {
        // role not authorised so redirect to home page
        return <Navigate to={{ pathname: '/' }} />
    }

    // authorised so return component
    return <Component {...props} />
}
export default Private

