import { Link, Navigate, Outlet } from "react-router-dom";
import "../assets/css/guest.css";

function DefaultLayout(){
    if (localStorage.getItem("auth_token")) {
        return <Navigate to="/" />;
    }
 return (
     <div id="guest" >
         <nav className="navigation-bar">
             <div>
                 <Link to="/home">
                     <img className="logo" src="Logo.png" alt="Logo" />
                 </Link>
             </div>
             <div>
                 <Link to="/login">Login</Link>
             </div>
         </nav>
         <aside>
             <div>
                 <label>Search</label>
                 <input type="text" />
                 <button className="search-btn">search</button>
             </div>
         </aside>
         <main className="main">
             <Outlet />
         </main>
     </div>
 );
}
export default DefaultLayout;