import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthmiddlewareRoute = ({
    component: Component,
    isAuthProtected,
    isLoaded, 
    setNotified,
    onNotified,
    ...rest
        
}) => (
    <Route {...rest}
        render={props => {
            if (isAuthProtected && !localStorage.getItem("authUser")) {
                return (
                    <Redirect
                    to={{ pathname: "/login", state: { from: props.location } }}
                    />
                    )
            } else if (props.location.pathname === "/login" && localStorage.getItem("authUser")) {
                return (
                    <Redirect to={{pathname:"/home", state: {from: props.location}}}/>
                )
            }
            return (
                <Component
                    {...props}
                    isLoaded={isLoaded}
                    onNotified={onNotified}
                    setNotified={setNotified} />
            )
        }}/>
)

export default AuthmiddlewareRoute;
