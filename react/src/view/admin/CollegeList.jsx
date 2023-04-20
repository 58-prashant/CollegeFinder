import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CollegeList(){
  const [data, setData] = useState([]);
  useEffect(() => {
      fetchData();
  }, []);
  const deleteHandler = ($id) => {
      axios.delete("/api/college-delete/" + $id).then((res) => {
          if (res.data.status === 200) {
              swal("Success", res.data.message, "success");
          } else {
              console.log(res.data.message);
          }
      });
      fetchData();
  };

  const fetchData=()=>{
  axios.get("/api/home").then((res) => {
      if (res.data.status == 200) {
          setData(res.data.college);
          console.log(data)
      }
  });
}
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
                          <td>
                              <Link className="name" to={"/college-profile/" + item.id}>
                                  {item.name}
                              </Link>
                          </td>
                          <td>{item.email}</td>
                          <td>{item.location}</td>
                          <td>{item.established_year}</td>
                          <td>
                              <Link
                                  className="btn-edit"
                                  to={"/college-edit/" + item.id}
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
export default CollegeList;