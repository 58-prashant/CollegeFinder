import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function College_profile() {
    const [data, setData] = useState({
        name: "",
        email: "",
        established_year: "",
        location: "",
        description: "",
        number: "",
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("api/college-detail/" + id).then((res) => {
            if (res.data.status === 200) {
                setData(res.data.college);
                setCourse(res.data.course);
                setPhotos(res.data.image);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate("/user");
            }
        });
    }, []);

    const [course, setCourse] = useState([
        {
            title: "",
            module_description: "",
            duration_in_months: "",
            modules: "",
            career: "",
        },
    ]);

    const [photos, setPhotos] = useState([]);

    return (
        <div id="userdata" className="container-fluid px-4">
            <div className="card-header">
                <h1>College Detail</h1>
            </div>
            <div>
                <img
                    style={{ width: 100 }}
                    src={"http://localhost:8000/" + data.image}
                />

                <div>
                    <h1>{data.name}</h1>
                    <div>
                        <i className="bi bi-calendar-event"></i>
                        {data.established_year}
                    </div>
                    <div>
                        <i className="bi bi-geo-alt-fill"></i>
                        {data.location}
                    </div>
                </div>
            </div>

            <div className="card-body">
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button
                            className="nav-link active"
                            id="nav-college-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-college"
                            type="button"
                            role="tab"
                            aria-controls="nav-college"
                            aria-selected="true"
                        >
                            College Details
                        </button>
                        <button
                            className="nav-link"
                            id="nav-course-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-course"
                            type="button"
                            role="tab"
                            aria-controls="nav-course"
                            aria-selected="false"
                        >
                            Course Details
                        </button>
                        <button
                            className="nav-link"
                            id="nav-photo-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-photo"
                            type="button"
                            role="tab"
                            aria-controls="nav-photo"
                            aria-selected="false"
                        >
                            Photos
                        </button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div
                        className="tab-pane card-body border fade show active"
                        id="nav-college"
                        role="tabpanel"
                        aria-labelledby="nav-college-tab"
                        // tabindex="0"
                    >
                        <div>
                            <h5>Contact Us:</h5>
                            <div>
                                <i className="bi bi-envelope"></i>
                                {data.email}
                            </div>

                            <div>
                                <i className="bi bi-telephone-fill"></i>
                                {data.number}
                            </div>
                        </div>
                        <div>
                            <h5>About Us:</h5>
                            <div>{data.description}</div>
                        </div>
                    </div>
                    <div
                        className="tab-pane card-body border fade"
                        id="nav-course"
                        role="tabpanel"
                        aria-labelledby="nav-course-tab"
                        // tabindex="0"
                    >
                        {course.map((course, index) => (
                            <div key={index}>
                                <div>
                                    <h4>{course.title}</h4>
                                </div>

                                <br />
                                {course.module_description ? (
                                    <div>
                                        <h5>About Course:</h5>
                                        <div>{course.module_description}</div>
                                    </div>
                                ) : (
                                    <></>
                                )}

                                <br />
                                {course.duration_in_months ? (
                                    <div>
                                        <h5>Duration:</h5>
                                        <div>
                                            {course.duration_in_months / 12}{" "}
                                            years
                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )}

                                <br />
                                {course.modules ? (
                                    <div>
                                        <h5>Modules:</h5>
                                        <div>{course.modules}</div>
                                    </div>
                                ) : (
                                    <></>
                                )}

                                <br />
                                {course.career ? (
                                    <div>
                                        <h5>Career:</h5>
                                        <div>{course.career}</div>
                                    </div>
                                ) : (
                                    <></>
                                )}

                                <br />
                            </div>
                        ))}
                    </div>
                    <div
                        className="tab-pane card-body border fade"
                        id="nav-photo"
                        role="tabpanel"
                        aria-labelledby="nav-photo-tab"
                        // tabindex="0"
                    >
                        <h5>Gallery:</h5>
                        {photos &&
                            photos.map((photo, index) => (
                                <img
                                    style={{ width: 100 }}
                                    src={
                                        "http://localhost:8000/" +
                                        photo.filename
                                    }
                                    alt={`Photo ${index}`}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default College_profile;
