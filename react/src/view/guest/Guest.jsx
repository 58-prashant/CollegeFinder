import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading";

function Guest() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/api/home").then((res) => {
            setData(res.data.college);
            console.log(data);
        });
        setLoading(false);
    }, []);
    useEffect(() => {
        console.log(data);
    }, [data]);

    if (loading) {
        return (
            <div>
                <h1>Loading....</h1>
            </div>
        );
    } else {
        return (
            <div id="guest">
                <div className="header">
                    {data.map((item) => (
                        <Link
                            className="link"
                            key={item.id}
                            to={"/viewCollege/" + item.id}
                        >
                            <div className="card" key={item.id}>
                                <div className="college">
                                    <div>
                                        <img
                                            style={{ width: 100 }}
                                            src={
                                                "http://localhost:8000/" +
                                                item.image
                                            }
                                        />
                                    </div>
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
            </div>
        );
    }
}
export default Guest;
