import { Component } from "react";
import FontAwesome from "react-fontawesome";
import PropTypes from "prop-types";
import "./SearchBar.css";

class SearchBar extends Component {
  state = {
    value: "",
    timeout: null,
  };

  doSearch = (event) => {
    this.setState({ value: event.target.value });
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.props.callback(this.state.value);
    }, 500);
  };

  render() {
    return (
      <div className="rmdb-searchbar">
        <div className="rmdb-searchbar-content">
          <FontAwesome className="rmdb-fa-search" name="search" size="2x" />
          <input
            type="text"
            className="rmdb-searchbar-input"
            onChange={this.doSearch}
            value={this.state.value}
          />
        </div>
      </div>
    );
  }
}
SearchBar.propTypes = {
  callback: PropTypes.func, // Add this line
};

export default SearchBar;