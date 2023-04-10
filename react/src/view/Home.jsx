import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("/api/home").then((res) => {
            // setEstablished(res.data.college.established_year);
            setData(res.data.college);
            console.log(data);
        });
    }, []);
    useEffect(() => {
        console.log(data);
    }, [data]);
    return (
        <div>
            {data.map((item) => (
                <Link className="link" key={item.id} to="/college">
                    <div className="card" key={item.id}>
                        <div className="college">
                            <div>
                                <h2>{item.name}</h2>
                            </div>
                            <div className="info">
                                <p>
                                    <i className="bi bi-calendar3-event"></i>
                                    {item.established_year}
                                </p>
                                <p>
                                    <i className="bi bi-geo-alt-fill"></i>
                                    {item.location}
                                </p>
                                <p>
                                    <i className="bi bi-telephone-fill"></i>
                                    {item.number}
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
export default Home;
