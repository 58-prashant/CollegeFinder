import axios from "axios";
import { useEffect, useState } from "react";
import {
    Link,
    Navigate,
    Outlet,
    useLocation,
    useNavigate,
} from "react-router-dom";
import "../assets/css/admin.css";

function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const type = localStorage.getItem("ac_type");
    const email = localStorage.getItem("email");
    const [user, setUser] = useState("");
    const [data, setData] = useState([]);

    if (type != 1) {
        return <Navigate to="/" />;
    }
    if (!localStorage.getItem("auth_token")) {
        return <Navigate to="/login" />;
    }

    useEffect(() => {
        setUser(localStorage.getItem("auth_user"));
        axios
            .post("/api/view-profile", { email })
            .then((res) => {
                setData(res.data.user);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const onLogout = (e) => {
        e.preventDefault();
        axios.post("/api/logout").then((res) => {
            if (res.data.status === 200) {
                localStorage.removeItem("auth_token");
                localStorage.removeItem("auth_user");
                localStorage.removeItem("email");
                localStorage.removeItem("ac_type");
                swal("Success", res.data.message, "success");
                navigate("/home");
            }
        });
    };
    return (
        <div id="layout">
            <aside>
                <Link
                    className={location.pathname === "/" ? "active" : ""}
                    to="/"
                >
                    <img className="logo" src="Logo.svg" alt="Logo" />
                </Link>
                <h1 className="sidetitle">Admin Panel</h1>

                <Link
                    className={location.pathname === "/admin" ? "active" : ""}
                    to="/user"
                >
                    <span className="bi bi-person-circle"></span>
                    Profile
                </Link>
                <Link
                    className={
                        location.pathname === "/admin-dashboard" ? "active" : ""
                    }
                    to="/admin-dashboard"
                >
                    <span className="bi bi-speedometer"></span>
                    Dashboard
                </Link>
                <Link
                    className={
                        location.pathname === "/view-user" ? "active" : ""
                    }
                    to="/view-user"
                >
                    <i className="bi bi-people"></i> Users
                </Link>
                <Link
                    className={
                        location.pathname === "/view-college" ? "active" : ""
                    }
                    to="/view-college"
                >
                    <i className="fa fa-university"></i>
                    Colleges
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
export default AdminLayout;
