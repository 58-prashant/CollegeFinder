import { Navigate, createBrowserRouter } from "react-router-dom";
import GuestLayout from "./components/GuestLayout";
import Home from "./view/Home";
import DefaultLayout from "./components/DefaultLayout";
import Login from "./view/Login";
import Register from "./view/Register";
import PageNotFound from "./view/PageNotFound";
import User from "./view/User";
import axios from "axios";
import { Verification } from "./view/Verification";
import { AdminLayout } from "./components/AdminLayout";
import { Dashboard } from "./view/admin/Dashboard";
import { Profile } from "./view/admin/Profile";
import EditUser from "./view/EditUser";
import ViewCollege from "./view/ViewCollege";


axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("auth_token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
});

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/user",
                element: <User />,
            },
            {
                path: "/edit-user/:id",
                element: <EditUser />,
            },
            {
                path: "/view-college/:id",
                element: <ViewCollege />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/otp-verification",
                element: <Verification />,
            },
        ],
    },
    {
        path: "/",
        element: <AdminLayout />,
        children: [
            {
                path: "/admin-dashboard",
                element: <Dashboard />,
            },
            {
                path: "/admin",
                element: <Profile />,
            },
        ],
    },
    {
        path: "*",
        element: <PageNotFound />,
    },
]);
export default router;
