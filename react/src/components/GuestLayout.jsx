import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";

import '../assets/css/guestLayout.css';

function GuestLayout() {
    
    if (localStorage.getItem('auth_token')) {
        return <Navigate to="/" />;
    }
    return (
        <div className="body-image" >
            <Outlet />

        </div>
    );
}
export default GuestLayout;
