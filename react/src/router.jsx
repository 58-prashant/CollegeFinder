import { Navigate, createBrowserRouter } from "react-router-dom";
import axios from "axios";

import DefaultLayout from "./components/DefaultLayout";
import Home from "./view/user/Home";
import User from "./view/user/User";
import EditUser from "./view/user/EditUser";
import ViewCollege from "./view/user/ViewCollege";

import GuestLayout from "./components/GuestLayout";
import Login from "./view/user/Login";
import Verification from "./view/user/Verification";
import Register from "./view/user/Register";

import AdminLayout from "./components/AdminLayout";


import PageNotFound from "./view/PageNotFound";
import CollegeList from "./view/admin/CollegeList";
import UserList from "./view/admin/UserList";
import AddUser from "./view/admin/AddUser";
import UserProfile from "./view/admin/UserProfile";
import Profile from "./view/admin/Profile";
import UserEdit from "./view/admin/UserEdit";
import AddCollege from "./view/admin/AddCollege";





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
                path: "/admin",
                element: <Profile />,
            },
            {
                path: "/user-edit/:id",
                element: <UserEdit />,
            },
            {
                path: "/view-college",
                element: <CollegeList />,
            },
            {
                path: "/view-user",
                element: <UserList />,
            },
            {
                path: "/add-user",
                element: <AddUser />,
            },
            {
                path: "/profile/:id",
                element: <UserProfile />,
            },
            {
                path: "/add-college",
                element: <AddCollege />,
            },
        ],
    },

    {
        path: "*",
        element: <PageNotFound />,
    },
]);
export default router;
