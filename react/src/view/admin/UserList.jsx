import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function UserList() {
    const [data,setData] = useState([]);
    useEffect(()=>{
       fetchData();
    },[])
    const deleteHandler = ($id)=>{
        axios.delete("/api/delete-user/"+$id).then((res)=>{
            if(res.data.status=== 200){
                swal("Success",res.data.message,"success");
            }else{
                console.log(res.data.message);
            }
        });
        fetchData();

    }
    const fetchData=()=>{
         axios.get("/api/view-user").then((res) => {
             if (res.data.status == 200) {
                 setData(res.data.users);
             }
         });
    }
    
    return (
        <div id="userdata">
            <h1 className="admin-formtitle">Users</h1>
            <Link className="btn" to="/add-user">
                Add User
            </Link>
            <table className="table">
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
                                <Link
                                    className="name"
                                    to={"/profile/" + item.id}
                                >
                                    {item.name}
                                </Link>
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
                                <Link
                                    className="btn-edit"
                                    to={"/user-edit/" + item.id}
                                >
                                    Edit
                                </Link>
                                <Link
                                    className="btn-delete"
                                    onClick={() => deleteHandler(item.id)}
                                >
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
