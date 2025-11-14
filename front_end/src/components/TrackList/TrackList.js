import React from "react";
import "./TrackList.css";
import Track from "../Track/Track";

class TrackList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="TrackList">
        {/* You will add a map method that renders a set of Track components */}
        {this.props.playList.map((track) => {
          return (
            <Track
              key={track.id}
              track={track}
              onAdd={this.props.onAdd}
              isRemoval={this.props.isRemoval}
              onRemove={this.props.onRemove}
              parentName={this.props.parentName}
            />
          );
        })}
      </div>
    );
  }
}

export default TrackList;
