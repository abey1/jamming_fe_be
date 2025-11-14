import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import React from "react";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playListName: "My Playlist",
      playListTracks: [],
      searchTerm: "",
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    // When the app first loads, check the URL hash
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");
    const expiresIn = params.get("expires_in");

    if (token) {
      // Save to localStorage for global access
      localStorage.setItem("spotify_access_token", token);
      localStorage.setItem("spotify_expires_in", expiresIn);

      // Store in component state too
      this.setState({ accessToken: token, expiresIn });

      // Clean up the URL
      window.history.replaceState(null, "", window.location.pathname);

      // Set timeout to clear token when it expires
      setTimeout(() => {
        localStorage.removeItem("spotify_access_token");
        localStorage.removeItem("spotify_expires_in");
        this.setState({ accessToken: null });
      }, expiresIn * 1000);
    } else {
      // If not in URL, try to get it from localStorage
      const storedToken = localStorage.getItem("spotify_access_token");
      const storedExpires = localStorage.getItem("spotify_expires_in");
      if (storedToken) {
        this.setState({ accessToken: storedToken, expiresIn: storedExpires });
      }
    }
  }

  addTrack(newTrack) {
    console.log("App.js : ", newTrack);
    const trackExists = this.state.playListTracks.some(
      (track) => track.id === newTrack.id
    );
    if (!trackExists) {
      const newPlayList = this.state.playListTracks.push(newTrack);
      this.setState({ playlistTracks: newPlayList });
      // this.setState((prevState) => {
      //   return { playlistTracks: [...prevState.playListTracks, newTrack] };
      // });
    }
    console.log("App.js play list tracks : ", this.state.playlistTracks);
  }

  removeTrack(doomedTrack) {
    const newList = this.state.playListTracks.filter((track) => {
      return track.id !== doomedTrack.id;
    });
    this.setState({
      playListTracks: newList,
    });
  }

  updatePlaylistName(newPlaylistName) {
    this.setState({ playListName: newPlaylistName });
  }

  updateSearchTerm(newSearchTerm) {
    this.setState({ searchTerm: newSearchTerm });
    localStorage.setItem("spotify_search_term", newSearchTerm);
  }

  savePlaylist() {
    console.log("in save playlist", this.state.playListTracks);
    const trackUris = this.state.playListTracks.map((track) => track.uri);

    Spotify.savePlaylist(this.state.playListName, trackUris);
    this.setState({ playListName: "New Playlist" });
    this.setState({ playListTracks: [] });
  }

  async search(searchTerm) {
    console.log("before search results");
    // this.setState({searchResults: })
    // this.state.searchResults =
    const data = await Spotify.search(searchTerm);
    console.log(data);
    const tracks = data?.tracks?.items || [];

    const searchedTracks = tracks.map((track) => {
      //  return track.uri;
      return {
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.album_type,
        uri: track.uri,
      };
    });

    //save track uris to the search results
    this.setState({ searchResults: searchedTracks });
    this.setState({ searchTerm: "" });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          {/* Add a SearchBar component */}
          <SearchBar
            onSearch={this.search}
            onTermChange={this.updateSearchTerm}
            searchTerm={this.state.searchTerm}
          />
          <div className="App-playlist">
            {/* Add a SearchResults component */}
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
              onRemove={this.removeTrack}
            />
            {/* Add a Playlist component */}
            <Playlist
              playListName={this.state.playListName}
              playListTracks={this.state.playListTracks}
              onAdd={this.addTrack}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
