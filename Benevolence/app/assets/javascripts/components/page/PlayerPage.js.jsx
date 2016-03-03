var PlayerPage = React.createClass({
  render: function() {
    return (
        <div>
          <Player 
            song={this.props.currentSong}
            nextSong={this.props.nextSong}
            prevSong={this.props.prevSong}
            shuffle={this.props.shufflePlaylist} 
            repeat={this.props.toggleRepeat} 
            isLast={this.props.isLast} 
            shuffled={this.props.shuffled}
            repeatMode={this.props.repeat}
            shouldPlay={this.props.shouldPlay}>
          </Player>
          <Playlist 
            showing={this.props.showingPlaylist} 
            tracks={this.props.playlistTracks} 
            current={this.props.currentSong} 
            changeToTrack={this.props.changeToTrack}
            togglePlaylist={this.props.togglePlaylist}>
          </Playlist>
        </div>
    );
  }
});
