import { Link, Navigate, Outlet } from "react-router-dom";
import "../assets/css/guest.css";

function DefaultLayout(){
    if (localStorage.getItem("auth_token")) {
         if (type == 0) {
             return <Navigate to="/profile" />;
         }
         if (type == 1) {
             return <Navigate to="/admin" />;
         }
          if (type == 2) {
              return <Navigate to="/college-profile" />;
          }
    }
 return (
     <div id="guest">
         <header className="navigation-bar">
             <div>
                 <Link to="/home">
                     <img className="logo" src="Logo.png" alt="Logo" />
                 </Link>
             </div>
             <div></div>
             <div>
                 <Link
                     className={location.pathname === "/search" ? "active" : ""}
                     to="/guest-search"
                 >
                     <span className="bi bi-search"></span>Search
                 </Link>
                 <Link to="/login">Login</Link>
             </div>
         </header>
         
         <main className="main">
             <Outlet />
         </main>
     </div>
 );
}
export default DefaultLayout;