var Page = React.createClass({
  getInitialState: function() {
    return {
      playlistID: '56d4310afdc77eacb4000000',
      playlistTitle: '',
      playlistTracks: [],
      currentIndex: 0,
      currentSong: null
    };
  },
  nextSong: function(){
    next = this.state.currentIndex + 1;
    if (next > this.state.playlistTracks.length - 1) {
      next = this.state.playlistTracks.length - 1;
    }
    this.setState({
      currentIndex: next,
      currentSong: this.state.playlistTracks[next]
    });
  },
  componentDidMount: function(){
    Playlist.get(this.state.playlistID, function(details){
      this.setState({
        playlistTitle: details.title, 
        playlistTracks: details.tracks,
        currentSong: details.tracks[0],
        currentIndex: 0
      }) 
    }.bind(this));
  },
  render: function() {
    return (
      <div>
        <h1>Benevolence</h1>
        <Player song={this.state.currentSong} nextSong={this.nextSong}></Player>
      </div>
    );
  }
});
