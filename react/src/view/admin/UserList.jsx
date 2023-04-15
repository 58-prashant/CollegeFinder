import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserList() {
    const [data,setData] = useState([]);
    useEffect(()=>{
        axios.get("/api/view-user").then((res) => {
        if (res.data.status == 200) {
            setData(res.data.users);
        }
    });},[])
    
    return (
        <div>
            <Link to="/add-user">Add User</Link>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Birthday</th>
                        <th>Status</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr className="link" key={item.id}>
                            <td>{item.id}</td>
                            <td>
                                <Link to={'/profile/'+item.id}>{item.name}</Link>
                            </td>
                            {item.profile_path ? (
                                <td>
                                    <img
                                        style={{ width: 50 }}
                                        src={
                                            "http://localhost:8000/" +
                                            item.profile_path
                                        }
                                        // alt="profile picture"
                                    />
                                </td>
                            ) : (
                                <td className="bi bi-person-circle"></td>
                            )}
                            <td>{item.email}</td>
                            <td>{item.address}</td>
                            <td>{item.dob}</td>
                            <td>{item.status}</td>
                            <td>
                                <Link to={"/edit-user/" + item.id}>Edit</Link>
                                <Link to={"/delete-user/" + item.id}>
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default UserList;
