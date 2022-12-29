import React, { useCallback, useEffect, useState } from "react";

import "./App.css";

import AddMovie from "./components/AddMovie";
import MoviesList from "./components/MoviesList";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-getting-started-d2fc4-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) throw new Error("Something went wrong!");
      const data = await response.json();

      const transformedMovies = [];

      for (const key in data) {
        transformedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseData: data[key].releaseData,
        });
      }
      // const transformedMovies = data.results.map((movieData) => ({
      //   id: movieData.episode_id,
      //   title: movieData.title,
      //   openingText: movieData.opening_crawl,
      //   releaseData: movieData.release_date,
      // }));
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const addMovieHandler = async (movie) => {
    const response = await fetch(
      "https://react-getting-started-d2fc4-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(movie),
      }
    );
    const data = await response.json();
    console.log(data);
  };

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
