import axios from "axios";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

function AddCollege() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const locationRef = useRef();
    const establishRef = useRef();
    const descriptionRef = useRef();
    const numberRef = useRef();

    const [picture, setPicture] = useState([]);

    
    const handleImage = (e) => {
        setPicture({ image: e.target.files[0] });
    };

    const [course, setCourse] = useState([
        {
            title: "",
            description: "",
            timePeriod: "",
            subject: "",
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
                description: "",
                timePeriod: "",
                module: "",
                career: "",
            },
        ]);
    };

    const [photos, setPhotos] = useState([]);
    const handlePhotoChange = (e) => {
        setPhotos([...e.target.files]);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            location: locationRef.current.value,
            established_year: establishRef.current.value,
            number: numberRef.current.value,
            description: descriptionRef.current.value,
        };
        const formData = new FormData();
        formData.append("image", picture.image);
        formData.append("name", payload.name);
        formData.append("email", payload.email);
        formData.append("password", payload.password);
        formData.append("established_year", payload.established_year);
        formData.append("location", payload.location);
        formData.append("description", payload.description);
        formData.append("number", payload.number);

        course.forEach((course, index) => {
            formData.append(`course[${index}][title]`, course.title);
            formData.append(
                `course[${index}][description]`,
                course.description
            );
            formData.append(`course[${index}][timePeriod]`, course.timePeriod);
            formData.append(`course[${index}][module]`, course.module);
            formData.append(`course[${index}][career]`, course.career);
        });

        photos.forEach((photo, index) => {
            formData.append(`photos[${index}]`, photo);
        });
        console.log(Object.fromEntries(formData));
        
        axios
            .post("/api/create-college", formData, {
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
                            <div className="form-group mb-3">
                                <label>Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    ref={nameRef}
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
                            </div>
                            <div className="form-group mb-3">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    ref={emailRef}
                                    placeholder="Enter Email"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    ref={passwordRef}
                                    placeholder="Enter password"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Established Year</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    ref={establishRef}
                                    placeholder="Enter Established Year"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Location</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    ref={locationRef}
                                    placeholder="Enter location"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Description</label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    ref={descriptionRef}
                                    placeholder="Enter Description"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    ref={numberRef}
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
                                                defaultValue={
                                                    course.description
                                                }
                                                onChange={(e) =>
                                                    handleCourseChange(
                                                        index,
                                                        "description",
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
                                                defaultValue={course.timePeriod}
                                                onChange={(e) =>
                                                    handleCourseChange(
                                                        index,
                                                        "timePeriod",
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
                                            defaultValue={course.module}
                                            onChange={(e) =>
                                                handleCourseChange(
                                                    index,
                                                    "module",
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
                        </div>
                    </div>
                    <button className="btn">Create College</button>
                </form>
            </div>
        </div>
    );
}
export default AddCollege;
