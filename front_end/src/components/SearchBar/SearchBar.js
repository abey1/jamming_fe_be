import React from "react";
import "./SearchBar.css";
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
    };
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }
  search() {
    this.props.onSearch(this.state.term);
    // console.log(`in searchbar search method  ${this.state.term}`);
  }
  handleTermChange(event) {
    this.setState({ term: event.target.value });
    // console.log(`in handleTermChange : ${this.state.term}`);
  }
  render() {
    return (
      <div className="SearchBar">
        <input
          onChange={this.handleTermChange}
          placeholder="Enter A Song, Album, or Artist"
        />
        <button onClick={this.search} className="SearchButton">
          SEARCH
        </button>
      </div>
    );
  }
}

export default SearchBar;
