import React, { useEffect, useState } from "react";
import Moviecard from "../components/Moviecard";
import '../css/Home.css'
import { searchMovies, getPopulerMovies } from "../services/api";

const Home = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        setLoading(true);
        const popularMovies = await getPopulerMovies();
        setMovies(popularMovies);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      // If search is empty, reload popular movies
      try {
        setLoading(true);
        const popularMovies = await getPopulerMovies();
        setMovies(popularMovies);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      setLoading(true);
      const results = await searchMovies(query);
      setMovies(results);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("No movies found. Try a different search.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search a movie..."
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>

      {loading ? (
        <div className="loading">Loading movies...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <Moviecard 
              movie={movie} 
              key={movie.id} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;