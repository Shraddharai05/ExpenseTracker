import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute(props) {
    const isAuth = () => {
        let value = localStorage.getItem("Isvalid");
        if (value === 'true') {
            return true;
        }
        else {
            return false;
        }
    }
    return (
        <div>
            {isAuth() ? props.children : < Navigate to='/' />}
        </div>
    )
}
export default PrivateRoute