import { Navigate, createBrowserRouter } from "react-router-dom";
import axios from "axios";

import UserLayout from "./components/UserLayout";
import Home from "./view/user/Home";
import User from "./view/user/User";
import EditUser from "./view/user/EditUser";
import ViewCollege from "./view/user/ViewCollege";
import SearchCollege from "./view/user/SearchCollege";
import Bookmark from "./view/user/Bookmark";

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
import CollegeEdit from "./view/admin/CollegeEdit";
import CollegeProfile from "./view/admin/CollegeProfile";


import CollegeLayout from "./components/CollegeLayout";
import College_Login from "./view/college/college_Login";
import College_Register from "./view/college/college_Register";
import College_profile from "./view/college/College_profile";

import DefaultLayout from "./components/DefaultLayout";
import Guest from "./view/guest/Guest";
import SearchBar from "./view/guest/SearchBar";
import ViewColleges from "./view/guest/ViewColleges";
import College_Edit from "./view/college/College_Edit";








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
        element: <UserLayout />,
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
            {
                path:"/search",
                element:<SearchCollege/>,
            },
            {
                path:"/bookmark",
                element:<Bookmark/>
            }
        ],
    },
    {
        path:"/",
        element:<CollegeLayout/>,
        children:[
            {
                path:"/college-profile",
                element:<College_profile/>
            },
            {
                path:"/edit-college/:id",
                element:<College_Edit/>
            }
        ]

    },
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/home",
                element: <Guest />,
            },
            {
                path: "/viewCollege/:id",
                element: <ViewColleges />,
            },
            {
                path:"/guest-search",
                element:<SearchBar/>
            }
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
            {
                path: "college-login",
                element: <College_Login />,
            },
            {
                path: "college-register",
                element: <College_Register />,
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
            {
                path: "/college-edit/:id",
                element: <CollegeEdit />,
            },
            {
                path: "/college-profile/:id",
                element: <CollegeProfile />,
            },
        ],
    },

    {
        path: "*",
        element: <PageNotFound />,
    },
]);
export default router;
