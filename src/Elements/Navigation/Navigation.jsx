import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import "./Navigation.css";

const Navigation = (props) => {
  return (
    <div className="rmdb-navigation">
      <div className="rmdb-navigation-content">
        <Link to="/">
          <p>Home</p>
        </Link>
        <p>/</p>
        <p>{props.movie}</p>
      </div>
    </div>
  );
};

Navigation.propTypes = {
  movie: PropTypes.string,
};

export default Navigation;