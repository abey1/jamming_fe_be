import React from "react";
import "./Track.css";

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    // console.log(props);
  }
  addTrack = () => {
    console.log("Track.js : ", this.props.track);
    this.props.onAdd(this.props.track);
  };
  removeTrack() {
    this.props.onRemove(this.props.track);
  }
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>
            {this.props.track.name}
            {/* track name will go here  */}
          </h3>
          <p>
            {this.props.track.artist} | {this.props.track.album}
            {/* track artist will go here--> | <!-- track album will go here  */}
          </p>
        </div>
        {this.props.parentName === "PLAYLIST" ? (
          <button className="Track-action" onClick={this.removeTrack}>
            -
          </button>
        ) : (
          <button className="Track-action" onClick={this.addTrack}>
            +
          </button>
        )}
        {/* {this.props.isRemoval ? (
          <button className="Track-action" onClick={this.removeTrack}>
            -
          </button>
        ) : (
          <button className="Track-action" onClick={this.addTrack}>
            +
          </button>
        )} */}
      </div>
    );
  }
}

export default Track;
