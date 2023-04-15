import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function CollegeList(){
  const [data, setData] = useState([]);
  axios.get("/api/home").then((res) => {
      if (res.data.status == 200) {
          setData(res.data.college);
          console.log(data)
      }
  });
  return (
      <div id="userdata">
        <h1 className="admin-formtitle">Colleges</h1>
          <Link className="btn" to="/add-college">
              Add College
          </Link>
          <table className="table">
              <thead>
                  <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Established Year</th>
                      <th>Operations</th>
                  </tr>
              </thead>
              <tbody>
                  {data.map((item) => (
                      <tr className="link" key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.location}</td>
                          <td>{item.established_year}</td>
                          <td>
                              <Link
                                  className="btn-edit"
                                  to={"/edit-user/" + item.id}
                              >
                                  Edit
                              </Link>
                              <Link
                                  className="btn-delete"
                                  to={"/delete-user/" + item.id}
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
export default CollegeList;