import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";

import "../assets/css/guestLayout.css";

function GuestLayout() {
    if (localStorage.getItem("auth_token")) {
        if (type == 0) {
            return <Navigate to="/profile" />;
        }
        if (type == 1) {
            return <Navigate to="/admin" />;
        }
        if (type == 2) {
            return <Navigate to="/college-profile" />;
        }
    }
    return (
        <div className="body-image">
            <Outlet />
        </div>
    );
}
export default GuestLayout;
