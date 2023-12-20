import { useState, useEffect, useCallback  } from "react"
import { useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import { API_URL, API_KEY } from "../config";
import MovieInfo from "../Elements/MovieInfo/MovieInfo";
import MovieInfoBar from "../Elements/MovieInfoBar/MovieInfoBar";
import FourColGrid from "../Elements/FourColGrid/FourColGrid";
import Actor from "../Elements/Actors/Actor";
import Spinner from "../elements/Spinner/Spinner";
import "./Movie.css";


const Movie = () => {
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState(null);
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(false);

  const { movieId } = useParams();

  const fetchItems = useCallback(async (endpoint) => {
    const Movieresult = await fetch(endpoint).then((res) => res.json());
    if (Movieresult.status_code) {
      setLoading(false);
    } else {
      setMovie(Movieresult);
      const endpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
      let creditsResult = await fetch(endpoint).then((res) => res.json());
      
      const directors = creditsResult.crew.filter((member) => member.job === "Director");
      
      setActors(creditsResult.cast);
      setDirectors(directors);
      setLoading(false);
    }
  }, [movieId]);

  useEffect(() => {
    setLoading(true);
    const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    fetchItems(endpoint);
  }, [movieId, fetchItems]);

  return (
    <div className="rmdb-movie">
      {movie ? (
        <div>
          <MovieInfo movie={movie} directors={directors} />
          <MovieInfoBar time={movie.runtime} budget={movie.budget} revenue={movie.revenue} />
        </div>
      ) : null}
      {actors ? (
        <div className="rmdb-movie-grid">
          <FourColGrid header={"Actors"}>
            {actors.map((element, i) => (
              <Actor key={i} actor={element} />
            ))}
          </FourColGrid>
        </div>
      ) : null}
      {!actors && !loading ? <h1>No Movie Found</h1> : null}
      {loading ? <Spinner /> : null}
    </div>
  );
};

Movie.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.shape({
    movieName: PropTypes.string,
  }).isRequired,
};

export default Movie;