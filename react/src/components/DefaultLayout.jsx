import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import {useEffect} from "react";

export default function DefaultLayout() {
  const {user, token, setUser, setToken, notification} = useStateContext();

  if (!token) {
    return <Navigate to="/login"/>
  }

  const onLogout = ev => {
    ev.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
         setUser(data)
      })
  }, [])

  return (
    <div id="defaultLayout">
      <aside>
        <img className="logo" src="logo.svg" alt="logo" />
        <Link to="/dashboard">Home</Link>
        <Link to="/users">Profile</Link>
        <a href="/">Bookmark</a>
        <form action="/action_page.php">
          <input type="text" placeholder="Search.." className="search" />
          <button type="submit">
            <i class="fa fa-search"></i>
          </button>
        </form>
      </aside>
      <div className="content">
        <header>
          <div>
            <h1>Sikhya Khoji</h1>
          </div>

          <div>
            {user.name} &nbsp; &nbsp;
            <a onClick={onLogout} className="btn-logout" href="#">
              Logout
            </a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
        {notification && <div className="notification">{notification}</div>}
      </div>
    </div>
  );
}
