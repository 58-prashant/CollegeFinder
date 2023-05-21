import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ViewCollege() {
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
    }, [id, navigate]);

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

    //For bookmark
    const [bookmarked, setBookmarked] = useState(false);
    const [bookmarkId, setBookmarkId] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem("id");
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);
    useEffect(() => {
        // Check if the college is bookmarked by the user
        const checkBookmark = async () => {
            try {
                const response = await axios.get(`/api/bookmarks`, {
                    params: {
                        college_id: id,
                        user_id: userId,
                    },
                });
                if (response.data.status === 200 && response.data.bookmark) {
                    setBookmarked(true);
                    setBookmarkId(response.data.bookmark.id);
                } else {
                    setBookmarked(false);
                    setBookmarkId(null);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
        if (userId) {
            checkBookmark();
        }
    }, [id, userId]);

    const handleBookmark = async () => {
        try {
            const response = await axios.post("/api/bookmarks", {
                college_id: id,
                user_id: userId,
            });
            setBookmarkId(response.data.bookmark.id);
            setBookmarked(true);
            checkBookmark();
            console.log(bookmarked);
            // Handle success or update UI accordingly
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleUnbookmark = async () => {
        try {
            await axios.delete(`/api/bookmarks/${bookmarkId}`);
            setBookmarked(false);
            setBookmarkId(null);
            checkBookmark();
            // Handle success or update UI accordingly
        } catch (error) {
            console.error("Error:", error);
        }
    };

    //FOR EVENTS
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

    const applyForEvent = (eventId) => {
        axios
            .post(`/api/events/${eventId}/apply`, {
                user_id: userId,
            })
            .then((response) => {
                console.log(response.data.message);
                swal;
                // Update the event list or perform other actions as needed
            })
            .catch((error) => {
                console.log(error.response.data.message);
            });
    };
    //ASK QUESTION
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState("");

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
      try {
          const response = await axios.get(
              `/api/questions?collegeId=${id}`
          );
          setQuestions(response.data);
      } catch (error) {
          console.error(error);
      }
    };

    const askQuestion = async () => {
        try {
            const response = await axios.post("/api/questions", {
                question: newQuestion,
                college_id: id,
                user_id: userId,
            });
            const newQuestionData = response.data;
            setQuestions([...questions, newQuestionData]);
            setNewQuestion("");
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div id="userdata" className="container-fluid px-4">
            <div className="content1">
                <div className="card-header">
                    <h1>College Detail</h1>
                </div>
                <div>
                    <img
                        style={{ width: 100 }}
                        src={"http://localhost:8000/" + data.image}
                    />

                    <div>
                        <h1>{data.name}</h1>{" "}
                        <button
                            onClick={
                                bookmarked ? handleUnbookmark : handleBookmark
                            }
                        >
                            <i
                                className={`bi ${
                                    bookmarked
                                        ? "bi-bookmark-fill"
                                        : "bi-bookmark"
                                }`}
                                style={{ color: bookmarked ? "black" : "gray" }}
                            ></i>
                            {bookmarked ? "Bookmarked" : "Bookmark"}
                        </button>
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
                                Event
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
                                            <div>
                                                {course.module_description}
                                            </div>
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
                                            <ul>
                                                {course.modules
                                                    .split(".")
                                                    .map((item, index) => {
                                                        const trimmedItem =
                                                            item.trim();
                                                        if (trimmedItem) {
                                                            return (
                                                                <li key={index}>
                                                                    {
                                                                        trimmedItem
                                                                    }
                                                                </li>
                                                            );
                                                        }
                                                        return null;
                                                    })}
                                            </ul>
                                        </div>
                                    ) : (
                                        <></>
                                    )}

                                    <br />
                                    {course.career ? (
                                        <div>
                                            <h5>Career:</h5>
                                            <ul>
                                                {course.career
                                                    .split(".")
                                                    .map((item, index) => {
                                                        const trimmedItem =
                                                            item.trim();
                                                        if (trimmedItem) {
                                                            return (
                                                                <li key={index}>
                                                                    {
                                                                        trimmedItem
                                                                    }
                                                                </li>
                                                            );
                                                        }
                                                        return null;
                                                    })}
                                            </ul>
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
                            <h5>Event:</h5>
                            <ul>
                                {events ? (
                                    events.map((event) => (
                                        <li key={event.id}>
                                            <h3>{event.title}</h3>
                                            <p>
                                                Available Slots:{" "}
                                                {event.available_slots}
                                            </p>
                                            <p>
                                                Start Time: {event.start_time}
                                            </p>
                                            <p>End Time: {event.end_time}</p>
                                            <button
                                                onClick={() =>
                                                    applyForEvent(event.id)
                                                }
                                            >
                                                Apply
                                            </button>
                                        </li>
                                    ))
                                ) : (
                                    <p>No events available</p>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content2">
                <div>
                    <h3>Ask a Question</h3>
                    <input
                        type="text"
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                    />
                    <button className="btn-submit" onClick={askQuestion}>
                        Submit
                    </button>
                </div>
                <div>
                    <h3>Questions</h3>
                    {questions.length === 0 && <p>No questions available</p>}
                    {questions.map((question) => (
                        <div key={question.id}>
                            <p>{question.user && question.user.name} asked:</p>
                            <p>{question.question}</p>
                            {question.answer && (
                                <p>Answer: {question.answer}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default ViewCollege;
