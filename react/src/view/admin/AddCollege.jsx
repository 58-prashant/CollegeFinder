import { useState } from "react";
import {Link} from "react-router-dom";

function AddCollege(){
    // const [data,setData] = useState([
    //     title: "",
    //             description: "",
    //             timePeriod: "",
    //             subject: "",
    //             career: "",
        
    // ]);
    // const handleCourseChange = (index, field, value) => {
    //     const newCourses = [...courses];
    //     newCourses[index][field] = value;
    //     setCourses(newCourses);
    // };

    // const handleAddCourse = () => {
    //     setCourses([
    //         ...courses,
    //         {
    //             title: "",
    //             description: "",
    //             timePeriod: "",
    //             subject: "",
    //             career: "",
    //         },
    //     ]);
    // };
    // return (
    //     <div className="container-fluid px-4">
    //         <div className="card mt-4">
    //             <div className="card-header">
    //                 <h1>Add College
    //                     <Link></Link>
    //                 </h1>
    //             </div>
    //         </div>

    //         <div>
    //             <nav>
    //                 <div class="nav nav-tabs" id="nav-tab" role="tablist">
    //                     <button
    //                         class="nav-link active"
    //                         id="nav-college-tab"
    //                         data-bs-toggle="tab"
    //                         data-bs-target="#nav-college"
    //                         type="button"
    //                         role="tab"
    //                         aria-controls="nav-college"
    //                         aria-selected="true"
    //                     >
    //                         College Details
    //                     </button>
    //                     <button
    //                         class="nav-link"
    //                         id="nav-course-tab"
    //                         data-bs-toggle="tab"
    //                         data-bs-target="#nav-course"
    //                         type="button"
    //                         role="tab"
    //                         aria-controls="nav-course"
    //                         aria-selected="false"
    //                     >
    //                         Course Details
    //                     </button>
    //                     <button
    //                         class="nav-link"
    //                         id="nav-photo-tab"
    //                         data-bs-toggle="tab"
    //                         data-bs-target="#nav-photo"
    //                         type="button"
    //                         role="tab"
    //                         aria-controls="nav-photo"
    //                         aria-selected="false"
    //                     >
    //                         Photos
    //                     </button>
    //                     <button
    //                         class="nav-link"
    //                         id="nav-disabled-tab"
    //                         data-bs-toggle="tab"
    //                         data-bs-target="#nav-disabled"
    //                         type="button"
    //                         role="tab"
    //                         aria-controls="nav-disabled"
    //                         aria-selected="false"
    //                         disabled
    //                     >
    //                         Disabled
    //                     </button>
    //                 </div>
    //             </nav>
    //             <div class="tab-content" id="nav-tabContent">
    //                 <div
    //                     class="tab-pane card-body border fade show active"
    //                     id="nav-college"
    //                     role="tabpanel"
    //                     aria-labelledby="nav-college-tab"
    //                     tabindex="0"
    //                 >
    //                     <div className="form-group mb-3">
    //                         <label>Name</label>
    //                         <input
    //                             onChange={handleInput}
    //                             value={productInput.name}
    //                             type="text"
    //                             className="form-control"
    //                             name="name"
    //                             placeholder="Enter Name"
    //                         />
    //                     </div>
    //                     <div className="form-group mb-3">
    //                         <label>Profile Image</label>
    //                         <input
    //                             type="file"
    //                             className="form-control"
    //                             name="name"
    //                             placeholder="Enter Name"
    //                         />
    //                     </div>
    //                     <div className="form-group mb-3">
    //                         <label>Email</label>
    //                         <input
    //                             onChange={handleInput}
    //                             value={productInput.email}
    //                             type="email"
    //                             className="form-control"
    //                             name="email"
    //                             placeholder="Enter Email"
    //                         />
    //                     </div>
    //                     <div className="form-group mb-3">
    //                         <label>password</label>
    //                         <input
    //                             onChange={handleInput}
    //                             value={productInput.password}
    //                             type="password"
    //                             className="form-control"
    //                             name="password"
    //                             placeholder="Enter password"
    //                         />
    //                     </div>
    //                     <div className="form-group mb-3">
    //                         <label>Established Year</label>
    //                         <input
    //                             onChange={handleInput}
    //                             value={productInput.establish}
    //                             type="text"
    //                             className="form-control"
    //                             name="established_year"
    //                             placeholder="Enter Established Year"
    //                         />
    //                     </div>
    //                     <div className="form-group mb-3">
    //                         <label>Location</label>
    //                         <input
    //                             onChange={handleInput}
    //                             value={productInput.location}
    //                             type="text"
    //                             className="form-control"
    //                             name="location"
    //                             placeholder="Enter location"
    //                         />
    //                     </div>
    //                     <div className="form-group mb-3">
    //                         <label>Description</label>
    //                         <textarea
    //                             onChange={handleInput}
    //                             value={productInput.description}
    //                             type="text"
    //                             className="form-control"
    //                             name="description"
    //                             placeholder="Enter Description"
    //                         />
    //                     </div>
    //                     <div className="form-group mb-3">
    //                         <label>Number</label>
    //                         <input
    //                             onChange={handleInput}
    //                             value={productInput.number}
    //                             type="text"
    //                             className="form-control"
    //                             name="number"
    //                             placeholder="Enter Mobile Number"
    //                         />
    //                     </div>
    //                 </div>
    //                 <div
    //                     class="tab-pane card-body border fade"
    //                     id="nav-course"
    //                     role="tabpanel"
    //                     aria-labelledby="nav-course-tab"
    //                     tabindex="0"
    //                 >
    //                     {courses.map((course, index) => (
    //                         <div key={index}>
    //                             <label>
    //                                 Title:
    //                                 <input
    //                                     type="text"
    //                                     value={course.title}
    //                                     onChange={(e) =>
    //                                         handleCourseChange(
    //                                             index,
    //                                             "title",
    //                                             e.target.value
    //                                         )
    //                                     }
    //                                 />
    //                             </label>
    //                             <br />
    //                             <label>
    //                                 Description:
    //                                 <textarea
    //                                     value={course.description}
    //                                     onChange={(e) =>
    //                                         handleCourseChange(
    //                                             index,
    //                                             "description",
    //                                             e.target.value
    //                                         )
    //                                     }
    //                                 ></textarea>
    //                             </label>
    //                             <br />
    //                             <label>
    //                                 Time Period:
    //                                 <input
    //                                     type="text"
    //                                     value={course.timePeriod}
    //                                     onChange={(e) =>
    //                                         handleCourseChange(
    //                                             index,
    //                                             "timePeriod",
    //                                             e.target.value
    //                                         )
    //                                     }
    //                                 />
    //                             </label>
    //                             <br />
    //                             <label>
    //                                 Subject:
    //                                 <input
    //                                     type="text"
    //                                     value={course.subject}
    //                                     onChange={(e) =>
    //                                         handleCourseChange(
    //                                             index,
    //                                             "subject",
    //                                             e.target.value
    //                                         )
    //                                     }
    //                                 />
    //                             </label>
    //                             <br />
    //                             <label>
    //                                 Career:
    //                                 <input
    //                                     type="text"
    //                                     value={course.career}
    //                                     onChange={(e) =>
    //                                         handleCourseChange(
    //                                             index,
    //                                             "career",
    //                                             e.target.value
    //                                         )
    //                                     }
    //                                 />
    //                             </label>
    //                             <br />
    //                         </div>
    //                     ))}
    //                     <button type="button" onClick={handleAddCourse}>
    //                         Add Course
    //                     </button>
    //                 </div>
    //                 <div
    //                     class="tab-pane card-body border fade"
    //                     id="nav-photo"
    //                     role="tabpanel"
    //                     aria-labelledby="nav-photo-tab"
    //                     tabindex="0"
    //                 >
    //                     c
    //                 </div>
    //                 <div
    //                     class="tab-pane fade"
    //                     id="nav-disabled"
    //                     role="tabpanel"
    //                     aria-labelledby="nav-disabled-tab"
    //                     tabindex="0"
    //                 >
    //                     ...
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
}
export default AddCollege;