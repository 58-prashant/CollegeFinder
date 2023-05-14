import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Bookmark({  }) {
    const [bookmarks, setBookmarks] = useState([]);
    const userId = localStorage.getItem("id")
    useEffect(() => {
        // Fetch the list of bookmarks for the user
        const fetchBookmarks = async () => {
            try {
                const response = await axios.get(
                    `/api/view-bookmarks/` + userId
                );
                if (response.data.status === 200) {
                    setBookmarks(response.data.bookmarks);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchBookmarks();
    }, [userId]);

    return (
        <div>
            <h1>Bookmarks</h1>
            {bookmarks.length > 0 ? (
                <ul>
                    {bookmarks.map((bookmark) => (
                        <Link
                            className="link"
                            key={bookmark.id}
                            to={"/view-college/" + bookmark.id}
                        >
                            <div className="card" key={bookmark.id}>
                                <div className="college">
                                    <div>
                                        <h2>{bookmark.college.name}</h2>
                                    </div>
                                    <div className="info">
                                        <p>
                                            <i className="bi bi-calendar3-event"></i>
                                            {bookmark.college.established_year}
                                        </p>
                                        <p>
                                            <i className="bi bi-geo-alt-fill"></i>
                                            {bookmark.college.location}
                                        </p>
                                        <p>
                                            <i className="bi bi-telephone-fill"></i>
                                            {bookmark.college.number}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        // <li key={bookmark.id}>
                        //     <h2>{bookmark.college.name}</h2>
                        //     <p>Location: {bookmark.college.location}</p>
                        //     <p>Description: {bookmark.college.description}</p>
                        //     {/* Display other college details as needed */}
                        // </li>
                    ))}
                </ul>
            ) : (
                <p>No bookmarks found.</p>
            )}
        </div>
    );
}

export default Bookmark;
