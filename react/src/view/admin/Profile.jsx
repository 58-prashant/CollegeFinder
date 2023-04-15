import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/editUser.css";
function Profile() {
    const [data, setData] = useState({});

    useEffect(() => {
        const email = localStorage.getItem("email");

        axios
            .post("/api/view-profile", { email })
            .then((res) => {
                setData(res.data.user);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="userinfo-card">
            <Link className="btn-edit" to={"/user-edit/" + data.id}>
                <i className="bi bi-pencil-fill"></i>
            </Link>
            <div>
                <div>
                    {data.profile_path ? (
                        <img
                            className="profile"
                            style={{ width: 100 }}
                            src={"http://localhost:8000/" + data.profile_path}
                            // alt="profile picture"
                        />
                    ) : (
                        <span id="picon" className="bi bi-person-circle"></span>
                    )}
                    <h2>{data.name}</h2>
                    <label className="label">Email:</label>
                    <p>{data.email}</p>
                    <label className="label">Address:</label>
                    <p>{data.address}</p>
                    <label className="label">Birthday:</label> <p>{data.dob}</p>
                </div>
            </div>
        </div>
    );
}

export default Profile;
