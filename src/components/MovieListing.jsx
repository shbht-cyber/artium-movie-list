import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";

const MovieListing = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const suggestionBoxRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchMovies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPage((prev) => prev + 1);
    }
  };

  const handleClickOutside = (event) => {
    if (
      suggestionBoxRef.current &&
      !suggestionBoxRef.current.contains(event.target)
    ) {
      setSuggestions([]);
      setSearchTerm("");
    }
  };

  const fetchMovies = async () => {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=b9bd48a6&s=marvel&page=${page}`
    );
    const movieData = await response.json();
    setMovies((prev) => [...prev, ...movieData.Search]);
  };

  const fetchSuggestions = debounce(async (query) => {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=b9bd48a6&s=${query}`
    );
    const data = await response.json();
    setSuggestions(data.Search);
  }, 500);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value) {
      fetchSuggestions(e.target.value);
    } else {
      setSuggestions([]);
    }
  };

  const handleMovieSelect = () => {
    setSuggestions([]);
    setSearchTerm("");
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        {suggestions?.length > 0 && (
          <ul
            ref={suggestionBoxRef}
            className=" bg-white border mt-2 w-full z-10 rounded-lg "
          >
            {suggestions.map((movie) => (
              <li key={movie.imdbID} className="p-2">
                <Link
                  to={`/movie/${movie.imdbID}`}
                  onClick={() => handleMovieSelect()}
                >
                  {movie.Title}
                </Link>
                <hr />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`}>
            <div className="bg-slate-800 p-4 rounded-lg">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-auto"
              />
              <h3 className="mt-2 text-white">{movie.Title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieListing;
