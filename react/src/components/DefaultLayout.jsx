import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function DefaultLayout() {
    const navigate = useNavigate();
    const type = localStorage.getItem("ac_type");
    if (type != 0) {
        return <Navigate to="/admin" />;
    }
    if (!localStorage.getItem("auth_token")) {
        return <Navigate to="/login" />;
    }

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

                <Link to="/">
                    <span className="bi bi-house-fill"></span>Home
                </Link>
                <Link to="/user">
                    <span className="bi bi-person-circle"></span>Profile
                </Link>
                <Link to="/bookmark">
                    <span className="bi bi-bookmarks-fill"></span>Bookmark
                </Link>
                <Link to="/search">
                    <span className="bi bi-search"></span>Search
                </Link>
            </aside>
            <div className="content">
                <header>
                    <div>Header</div>

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
