import {
    Link,
    Navigate,
    Outlet,
    useLocation,
    useNavigate,
} from "react-router-dom";
import axios from "axios";
import {  useEffect, useState } from "react";

function DefaultLayout() {
    const navigate = useNavigate();
    const [user,setUser] = useState("");
    const location = useLocation();
    const type = localStorage.getItem("ac_type");
    if (type != 0) {
        return <Navigate to="/admin" />;
    }
    if (!localStorage.getItem("auth_token")) {
        return <Navigate to="/login" />;
    }
    useEffect(()=>{
        setUser(localStorage.getItem("auth_user"));
    },[])
    
    const onLogout = (e) => {
        e.preventDefault();
        axios.post("/api/logout").then((res) => {
            if (res.data.status === 200) {
                localStorage.removeItem("auth_token");
                localStorage.removeItem("auth_user");
                localStorage.removeItem("ac_type");
                swal("Success", res.data.message, "success");
                navigate("/login");
            }
        });
    };
    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/">
                    <img className="logo" src="Logo.svg" alt="Logo" />
                </Link>

                <Link
                    className={location.pathname === "/" ? "active" : ""}
                    to="/"
                >
                    <i className="bi bi-house-door-fill"></i>Home
                </Link>
                <Link
                    className={location.pathname === "/user" ? "active" : ""}
                    to="/user"
                >
                    <span className="bi bi-person-circle"></span>Profile
                </Link>
                <Link
                    className={
                        location.pathname === "/bookmark" ? "active" : ""
                    }
                    to="/bookmark"
                >
                    <span className="bi bi-bookmarks-fill"></span>Bookmark
                </Link>
                <Link
                    className={location.pathname === "/search" ? "active" : ""}
                    to="/search"
                >
                    <span className="bi bi-search"></span>Search
                </Link>
            </aside>
            <div className="content">
                <header>
                    <Link className="user" to="/user">
                        <span className="bi bi-person-circle"></span>{user}
                    </Link>

                    <div>
                        <a onClick={onLogout} className="btn-logout" href="#">
                            Logout
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
export default DefaultLayout;
