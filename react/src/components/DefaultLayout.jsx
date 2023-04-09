import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios";

function DefaultLayout() {
    const navigate = useNavigate();
    if (!localStorage.getItem("auth_token")) {
        return <Navigate to="/login" />;
    }
    const onLogout = (e) => {
        e.preventDefault();
        axios.post("/api/logout").then((res) => {
            if (res.data.status === 200) {
                localStorage.removeItem("auth_token");
                localStorage.removeItem("auth_user");
                swal("Success",res.data.message,"success");
                navigate("/login");
            }
        });
    };
    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/user">Profile</Link>
                <Link to="/">Home</Link>
            </aside>
            <div>Header</div>
            <div>
                <Link onClick={onLogout} className="btn-logout">
                    Logout
                </Link>
            </div>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
export default DefaultLayout;
