import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(
                `/api/search?query=${query}`
            );
            setResults(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div id="guest">
            <div className="search">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                />
                <button onClick={handleSearch}>Search</button>

                <ul>
                    {results.map((college) => (
                        <Link
                            className="link"
                            key={college.id}
                            to={"/view-college/" + college.id}
                        >
                            <div className="card" key={college.id}>
                                <div className="college">
                                    <div>
                                        <h2>{college.name}</h2>
                                    </div>
                                    <div className="info">
                                        <p>
                                            <i className="bi bi-calendar3-event"></i>
                                            {college.established_year}
                                        </p>
                                        <p>
                                            <i className="bi bi-geo-alt-fill"></i>
                                            {college.location}
                                        </p>
                                        <p>
                                            <i className="bi bi-telephone-fill"></i>
                                            {college.number}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SearchBar;
