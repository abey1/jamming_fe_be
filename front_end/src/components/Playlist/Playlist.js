import React from "react";
import "./Playlist.css";
import TrackList from "../TrackList/TrackList";
class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input
          value={this.props.playListName}
          onChange={this.handleNameChange}
        />
        {/* Add a TrackList component */}
        <TrackList
          playList={this.props.playListTracks}
          onAdd={this.props.onAdd}
          onRemove={this.props.onRemove}
          isRemoval={false}
          parentName="PLAYLIST"
        />

        <button className="Playlist-save" onClick={this.props.onSave}>
          SAVE TO SPOTIFY
        </button>
      </div>
    );
  }
}

export default Playlist;
