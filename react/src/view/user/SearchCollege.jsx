import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchCollege = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/api/search?query=${query}`);
            setResults(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
            />
            <button className="btn-search" onClick={handleSearch}>
                Search
            </button>

            <ul>
                {results.length > 0
                    ? results.map((college) => (
                          <Link
                              className="link"
                              key={college.id}
                              to={"/view-college/" + college.id}
                          >
                              <div className="card" key={college.id}>
                                  <div className="college">
                                      <div>
                                          <img
                                              style={{ width: 100 }}
                                              src={
                                                  "http://localhost:8000/" +
                                                  college.image
                                              }
                                          />
                                      </div>
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
                      ))
                    : query.length > 0 && <p>No results found</p>}
            </ul>
        </div>
    );
};

export default SearchCollege;
