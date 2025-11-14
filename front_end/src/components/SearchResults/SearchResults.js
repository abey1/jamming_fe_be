import React from "react";
import TrackList from "../TrackList/TrackList";

import "./SearchResults.css";
class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        {/* Add a TrackList component */}
        <TrackList
          playList={this.props.searchResults}
          isRemoval={false}
          onAdd={this.props.onAdd}
          onRemove={this.props.onRemove}
          parentName="SEARCHRESULTS"
        />
      </div>
    );
  }
}

export default SearchResults;
