import { Outlet } from "react-router-dom"

function CollegeLayout(){
     const onLogout = (e) => {
         e.preventDefault();
         axios.post("/api/college-logout").then((res) => {
             if (res.data.status === 200) {
                 localStorage.removeItem("auth_token");
                 localStorage.removeItem("auth_user");
                 localStorage.removeItem("ac_type");
                 localStorage.removeItem("email");
                 swal("Success", res.data.message, "success");
                 navigate("/home");
             }
         });
     };
return (
    <div>
        <nav className="navigation-bar">
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
        </nav>
        <main>
            <Outlet />
        </main>
    </div>
);
}
export default CollegeLayout