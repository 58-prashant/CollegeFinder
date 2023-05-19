import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import "../assets/css/collegelayout.css";
import axios from "axios";

function CollegeLayout(){
    const type = localStorage.getItem("ac_type");
    const navigate = useNavigate();
    // if (type != 2) {
    //     return <Navigate to="/" />;
    // }
    // if (!localStorage.getItem("auth_token")) {
    //     return <Navigate to="/login" />;
    // }
     const onLogout = (e) => {
         e.preventDefault();
         axios.post("/api/college-logout").then((res) => {
             if (res.data.status === 200) {
                 localStorage.removeItem("auth_token");
                 localStorage.removeItem("auth_user");
                 localStorage.removeItem("ac_type");
                 localStorage.removeItem("email");
                 localStorage.removeItem("id");
                 swal("Success", res.data.message, "success");
                 navigate("/home");
             }
         });
     };
return (
    <div id="college">
        <header className="navigation-bar">
            <div>
                <Link to="/home">
                    <img className="logo" src="Logo.png" alt="Logo" />
                </Link>
            </div>
            <div>
                <a onClick={onLogout} className="btn-logout" href="#">
                    Logout
                </a>
            </div>
        </header>
        <div>
            <main>
                <Outlet />
            </main>
        </div>
    </div>
);
}
export default CollegeLayout