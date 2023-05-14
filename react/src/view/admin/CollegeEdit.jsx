import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function CollegeEdit() {
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
    const [picture, setPicture] = useState([]);

    const handleData = (e) => {
        e.persist();
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const handleImage = (e) => {
        setPicture({ image: e.target.files[0] });
    };
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
    const handleCourseChange = (index, field, value) => {
        const newCourses = [...course];
        newCourses[index][field] = value;
        setCourse(newCourses);
    };

    const handleAddCourse = () => {
        setCourse([
            ...course,
            {
                title: "",
                module_description: "",
                duration_in_months: "",
                modules: "",
                career: "",
            },
        ]);
    };

    const [photos, setPhotos] = useState([]);
    const handlePhotoChange = (e) => {
        console.log(e.target.files);
        setPhotos([...e.target.files]);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", picture.image);
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("established_year", data.established_year);
        formData.append("location", data.location);
        formData.append("description", data.description);
        formData.append("number", data.number);

        course.forEach((course, index) => {
            formData.append(`course[${index}][title]`, course.title);
            formData.append(
                `course[${index}][description]`,
                course.module_description
            );
            formData.append(`course[${index}][timePeriod]`, course.duration_in_months);
            formData.append(`course[${index}][module]`, course.modules);
            formData.append(`course[${index}][career]`, course.career);
        });

        if (photos) {
            photos.forEach((photo, index) => {
                formData.append(`photos[${index}]`, photo);
            });
        } else {
            console.warn("photos empty");
        }
        console.log(Object.fromEntries(formData));

        axios
            .post("/api/college-update/" + id, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                if (res.data.status === 200) {
                    swal("Success", res.data.message, "success");
                    navigate("/view-college");
                } else {
                    setError(res.data.error);
                }
            });
            console.log(data.image);
    };
    return (
        <div id="userdata" className="container-fluid px-4">
            <div>
                <div className="card-header">
                    <h1>Add College</h1>
                </div>
            </div>

            <div className="card-body">
                <form onSubmit={onSubmit} encType="multipart/form-data">
                    <nav>
                        <div
                            className="nav nav-tabs"
                            id="nav-tab"
                            role="tablist"
                        >
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
                            <div className="form-group mb-3">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    defaultValue={data.name}
                                    onChange={handleData}
                                    placeholder="Enter Name"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Profile Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="image"
                                    onChange={handleImage}
                                />
                                <img
                                    style={{ width: 100 }}
                                    src={"http://localhost:8000/" + data.image}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    defaultValue={data.email}
                                    onChange={handleData}
                                    placeholder="Enter Email"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Established Year</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="established_year"
                                    defaultValue={data.established_year}
                                    onChange={handleData}
                                    placeholder="Enter Established Year"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Location</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="location"
                                    defaultValue={data.location}
                                    onChange={handleData}
                                    placeholder="Enter location"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Description</label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    name="description"
                                    defaultValue={data.description}
                                    onChange={handleData}
                                    placeholder="Enter Description"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="number"
                                    defaultValue={data.number}
                                    onChange={handleData}
                                    placeholder="Enter Mobile Number"
                                />
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
                                    <h3>Course {index+1}:</h3>
                                    <div className="form-group mb-3">
                                        <label>
                                            Title:
                                            <input
                                                type="text"
                                                id={`course-title-${index}`}
                                                placeholder="Course Title"
                                                className="form-control"
                                                name={`course-title-${index}`}
                                                defaultValue={course.title}
                                                onChange={(e) =>
                                                    handleCourseChange(
                                                        index,
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </label>
                                    </div>
                                    <br />
                                    <div className="form-group mb-3">
                                        <label>
                                            Description:
                                            <textarea
                                                className="form-control"
                                                id={`course-description-${index}`}
                                                placeholder="Description"
                                                name={`course-description-${index}`}
                                                defaultValue={ course.module_description }
                                                onChange={(e) =>
                                                    handleCourseChange(
                                                        index,
                                                        "module_description",
                                                        e.target.value
                                                    )
                                                }
                                            ></textarea>
                                        </label>
                                    </div>
                                    <br />
                                    <div className="form-group mb-3">
                                        <label>
                                            Time Period:
                                            <input
                                                className="form-control"
                                                type="text"
                                                id={`course-timePeriod-${index}`}
                                                placeholder="Time in months"
                                                name={`course-timePeriod-${index}`}
                                                defaultValue={
                                                    course.duration_in_months
                                                }
                                                onChange={(e) =>
                                                    handleCourseChange(
                                                        index,
                                                        "duration_in_months",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </label>
                                    </div>
                                    <br />
                                    <label>
                                        Modules:
                                        <input
                                            className="form-control"
                                            type="text"
                                            id={`course-module-${index}`}
                                            placeholder="Modules"
                                            name={`course-module-${index}`}
                                            defaultValue={course.modules}
                                            onChange={(e) =>
                                                handleCourseChange(
                                                    index,
                                                    "modules",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </label>
                                    <br />
                                    <label>
                                        Career:
                                        <input
                                            className="form-control"
                                            type="text"
                                            id={`course-career-${index}`}
                                            name={`course-career-${index}`}
                                            defaultValue={course.career}
                                            placeholder="Career"
                                            onChange={(e) =>
                                                handleCourseChange(
                                                    index,
                                                    "career",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </label>
                                    <br />
                                </div>
                            ))}
                            <button
                                className="btn-edit"
                                type="button"
                                onClick={handleAddCourse}
                            >
                                Add Course
                            </button>
                        </div>
                        <div
                            className="tab-pane card-body border fade"
                            id="nav-photo"
                            role="tabpanel"
                            aria-labelledby="nav-photo-tab"
                            // tabindex="0"
                        >
                            <div className="form-group mb-3"></div>
                            <label>Photos:</label>
                            <input
                                className="form-control"
                                type="file"
                                name="photo"
                                onChange={handlePhotoChange}
                                multiple
                            />
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
                    <button className="btn">Update College</button>
                </form>
            </div>
        </div>
    );
}
export default CollegeEdit;
