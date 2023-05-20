import React, { useState, useEffect } from "react";
import axios from "axios";

const EventList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = () => {
        axios
            .get("/api/events")
            .then((response) => {
                setEvents(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const applyForEvent = (eventId) => {
        axios
            .post(`/api/events/${eventId}/apply`)
            .then((response) => {
                console.log(response.data.message);
                // Update the event list or perform other actions as needed
            })
            .catch((error) => {
                console.log(error.response.data.message);
            });
    };

    return (
        <div>
            <h1>Events</h1>
            <ul>
                {events.map((event) => (
                    <li key={event.id}>
                        <h3>{event.title}</h3>
                        <p>Available Slots: {event.available_slots}</p>
                        <p>Start Time: {event.start_time}</p>
                        <p>End Time: {event.end_time}</p>
                        <button onClick={() => applyForEvent(event.id)}>
                            Apply
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;
