import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=b9bd48a6&i=${id}`
      );
      const movieData = await response.json();
      setMovie(movieData);
    };

    fetchMovie();
  }, [id]);

  function findRating() {
    const filteredRating = movie?.Ratings?.filter(
      (rating) => rating.Source === "Internet Movie Database"
    );
    return filteredRating?.[0]?.Value;
  }

  function renderHeadingSubheading(heading, subheading) {
    return (
      <>
        <h1 className="text-yellow-500">{heading}</h1>
        <p className="text-white">{subheading}</p>
      </>
    );
  }

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="p-4 min-h-screen">
      <div className="flex flex-col items-center">
        <img src={movie.Poster} alt={movie.Title} className="w-[20%] mb-4" />
      </div>
      <h1 className="text-2xl font-bold mb-2 text-yellow-500">
        {movie.Title} ({movie.Year})
      </h1>
      <div className="flex justify-between w-[70%] mb-4 mt-4">
        <div>{renderHeadingSubheading("Genre", movie.Genre)}</div>
        <div>{renderHeadingSubheading("Running Time", movie.Runtime)}</div>
        <div>{renderHeadingSubheading("Rating", findRating())}</div>
      </div>
      <div className="mb-4">{renderHeadingSubheading("Plot", movie.Plot)}</div>
      <div className="mb-4">
        {renderHeadingSubheading("Actors", movie.Actors)}
      </div>
    </div>
  );
};

export default SingleMovie;
