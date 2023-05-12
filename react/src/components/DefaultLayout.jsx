import {
    Link,
    Navigate,
    Outlet,
    useLocation,
    useNavigate,
} from "react-router-dom";
import axios from "axios";
import {  useEffect, useState } from "react";
import '../assets/css/default.css';

function DefaultLayout() {
    const navigate = useNavigate();
    const [user,setUser] = useState("");
    const[data,setData] = useState([]);
    const location = useLocation();
    const type = localStorage.getItem("ac_type");
    const email = localStorage.getItem("email");
    if (type != 0) {
        return <Navigate to="/admin" />;
    }
    if (!localStorage.getItem("auth_token")) {
        return <Navigate to="/home" />;
    }
    useEffect(()=>{
        setUser(localStorage.getItem("auth_user"));
        axios
            .post("/api/view-profile", { email })
            .then((res) => {
                setData(res.data.user);
            })
            .catch((error) => {
                console.log(error);
            });
    },[])
    
    const onLogout = (e) => {
        e.preventDefault();
        axios.post("/api/logout").then((res) => {
            if (res.data.status === 200) {
                localStorage.removeItem("auth_token");
                localStorage.removeItem("auth_user");
                localStorage.removeItem("ac_type");
                localStorage.removeItem("email");
                swal("Success", res.data.message, "success");
                navigate("/login");
            }
        });
    };
    return (
        <div id="layout">
            <aside>
                <Link to="/">
                    <img className="logo" src="Logo.png" alt="Logo" />
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
                        <div>
                            {data.profile_path ? (
                                <div className="border">
                                <img
                                    className="pp"
                                    src={
                                        "http://localhost:8000/" +
                                        data.profile_path
                                    }
                                    // alt="profile picture"
                                />
                                </div>
                            ) : (
                                <span className="bi bi-person-circle"></span>
                            )}
                        </div>
                        {user}
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
