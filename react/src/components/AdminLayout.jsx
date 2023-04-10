import axios from "axios";
import { useEffect } from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";

export function AdminLayout(){
     const navigate = useNavigate();
     const type = localStorage.getItem("ac_type");
      if (type != 1) {
          return <Navigate to="/" />;
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
                <h1>Admin Panel</h1>
                 <Link to="/admin-dashboard">
                     <span className="bi bi-speedometer"></span>Dashboard
                 </Link>
                 <Link to="/admin">
                     <span className="bi bi-person-circle"></span>Profile
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