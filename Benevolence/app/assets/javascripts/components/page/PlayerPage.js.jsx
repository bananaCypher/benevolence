var PlayerPage = React.createClass({
  render: function() {
    return (
        <div>
          <Playlist 
            showing={this.props.showingPlaylist} 
            tracks={this.props.playlistTracks} 
            current={this.props.currentSong} 
            changeToTrack={this.props.changeToTrack}
            togglePlaylist={this.props.togglePlaylist}
            setBackgroundImage={this.props.setBackgroundImage}
            songs={this.props.songs}
            artists={this.props.artists}
            songPage={this.props.songPage}>
          </Playlist>
        </div>
    );
  }
});
