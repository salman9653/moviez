import { useEffect, useState } from "react";
import './App.css';
import SearchIcon from './search.svg'
import MovieCard from "./MovieCard";

const API_URL = 'https://www.omdbapi.com?apikey=cfb9b78c'

function App() {

  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0)
  const [searchTerm, setSearchTerm] = useState("");


  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json()
    setMovies(data.Search)
    setTotalResults(data.totalResults)
    console.log(data)
  }

  useEffect(() => {
    searchMovies(searchTerm)
  }, [])

  return (
    <div className="app">
      <h1>MovieZ</h1>

      <div className="search">
        <input
          placeholder="Search for a Movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => { (e.keyCode === 13) && searchMovies(searchTerm) }}
        />
        < img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      <p className="totalResults">Total Results : {totalResults ? totalResults : 0}</p>
      {movies?.length > 0
        ? (
          <div className="container">
            {movies.map((movie) => <MovieCard movie={movie} key={movie.imdbID} />)}
          </div>
        )
        : (
          <div className="empty">
            <h2>No Movies Found</h2>
          </div>
        )
      }


    </div>
  );
}
export default App;
