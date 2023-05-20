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

    const id = localStorage.getItem("id");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("api/college-detail/" + id).then((res) => {
            if (res.data.status === 200) {
                setData(res.data.college);
                setCourse(res.data.course);
                setPhotos(res.data.image);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
               
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

    //EVENT
     const [title, setTitle] = useState("");
     const [availableSlots, setAvailableSlots] = useState("");
     const [startTime, setStartTime] = useState("");
     const [endTime, setEndTime] = useState("");
     const [errorMessage, setErrorMessage] = useState("");
     const [successMessage, setSuccessMessage] = useState("");
     const [description,setDescription] = useState("");

     const handleSubmit = async (e) => {
         e.preventDefault();

         try {
             const response = await axios.post("/api/events", {
                 title,
                 description: description,
                 college_id: id,
                 available_slots: availableSlots,
                 start_time: startTime,
                 end_time: endTime,
             });
             setSuccessMessage(response.data.message);
             setErrorMessage("");
             setTitle("");
             setAvailableSlots("");
             setStartTime("");
             setEndTime("");
         } catch (error) {
             setErrorMessage(error.response.data.message);
             setSuccessMessage("");
         }
     };
     //Fetch event
     const [events, setEvents] = useState([]);

     useEffect(() => {
         fetchEvents();
     }, []);

     const fetchEvents = () => {
             axios
                 .get(`/api/events?college_id=${id}`)
                 .then((response) => {
                     setEvents(response.data);
                 })
                 .catch((error) => {
                     console.log(error);
                 });
     };
     const handleDelete = (eventId) => {
         // Make an HTTP request to delete the event
         axios
             .delete(`/api/events/${eventId}`)
             .then((response) => {
                 console.log(response.data.message);
                 // Handle the successful response, such as showing a success message or updating the event list
             })
             .catch((error) => {
                 console.log(error.response.data.message);
                 // Handle the error response, such as showing an error message
             });
     };
     //ASK QUESTION
     const [questions, setQuestions] = useState([]);
     const [newQuestion, setNewQuestion] = useState("");
     const [newReply, setNewReply] = useState(""); // State for the college's reply

     useEffect(() => {
         fetchQuestions();
     }, []);

     const fetchQuestions = async () => {
         try {
             const response = await axios.get("/api/questions");
             setQuestions(response.data);
         } catch (error) {
             console.error(error);
         }
     };

     const replyToQuestion = async (questionId) => {
         try {
             const response = await axios.put(`/api/questions/${questionId}`, {
                 answer: newReply,
             });
             const updatedQuestion = response.data;
             setQuestions((prevQuestions) =>
                 prevQuestions.map((question) =>
                     question.id === updatedQuestion.id
                         ? updatedQuestion
                         : question
                 )
             );
             setNewReply("");
         } catch (error) {
             console.error(error);
         }
     };
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
                        <button
                            className="nav-link"
                            id="nav-event-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-event"
                            type="button"
                            role="tab"
                            aria-controls="nav-event"
                            aria-selected="false"
                        >
                            Events
                        </button>
                        <button
                            className="nav-link"
                            id="nav-eventList-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-eventList"
                            type="button"
                            role="tab"
                            aria-controls="nav-eventList"
                            aria-selected="false"
                        >
                            Event List
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
                    <div
                        className="tab-pane card-body border fade"
                        id="nav-event"
                        role="tabpanel"
                        aria-labelledby="nav-event-tab"
                        // tabindex="0"
                    >
                        <h5>Add Event:</h5>
                        <form onSubmit={handleSubmit}>
                            {errorMessage && <p>{errorMessage}</p>}
                            {successMessage && <p>{successMessage}</p>}
                            <div>
                                <label>Title:</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label>Description:</label>
                                <br />
                                <textarea
                                    type="text"
                                    style={{ height: "100px", width: "450px" }}
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label>Available Slots:</label>
                                <input
                                    type="number"
                                    value={availableSlots}
                                    onChange={(e) =>
                                        setAvailableSlots(e.target.value)
                                    }
                                    required
                                    min="1"
                                />
                            </div>
                            <div>
                                <label>Start Time:</label>
                                <input
                                    type="datetime-local"
                                    value={startTime}
                                    onChange={(e) =>
                                        setStartTime(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label>End Time:</label>
                                <input
                                    type="datetime-local"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <button type="submit">Start Event</button>
                            </div>
                        </form>
                    </div>
                    <div
                        className="tab-pane card-body border fade"
                        id="nav-eventList"
                        role="tabpanel"
                        aria-labelledby="nav-eventList-tab"
                        // tabindex="0"
                    >
                        <h5>Event List:</h5>
                        <ul>
                            {events.map((event) => (
                                <li key={event.id}>
                                    <b>
                                        <h5>{event.title}</h5>
                                    </b>
                                    <button
                                        onClick={() => handleDelete(event.id)}
                                    >
                                        Delete
                                    </button>
                                    <p>
                                        Available Slots: {event.available_slots}
                                    </p>
                                    <p>Start Time: {event.start_time}</p>
                                    <p>End Time: {event.end_time}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <h3>Questions</h3>
                {questions.length === 0 && <p>No questions available</p>}
                {questions.map((question) => (
                    <div key={question.id}>
                        <p>{question.user && question.user.name} asked:</p>
                        <p>{question.question}</p>
                        {question.answer ? (
                            <p>Answer: {question.answer}</p>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    value={newReply}
                                    onChange={(e) =>
                                        setNewReply(e.target.value)
                                    }
                                />
                                <button
                                    onClick={() => replyToQuestion(question.id)}
                                >
                                    Reply
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default College_profile;
