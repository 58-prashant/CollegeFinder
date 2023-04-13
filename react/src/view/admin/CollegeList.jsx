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
      <div>
          <Link to="/add-college">Add College</Link>
          <table>
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
                              <Link to={"/edit-user/" + item.id}>Edit</Link>
                              <Link to={"/delete-user/" + item.id}>Delete</Link>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  );
}
export default CollegeList;