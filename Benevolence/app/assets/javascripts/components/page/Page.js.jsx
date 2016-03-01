var Page = React.createClass({
  getInitialState: function() {
    return {
      playlistID: '56d4310afdc77eacb4000000',
      playlistTitle: '',
      playlistTracks: [],
      currentSong: null
    };
  },
  componentDidMount: function(){
    Playlist.get(this.state.playlistID, function(details){
      this.setState({
        playlistTitle: details.title, 
        playlistTracks: details.tracks,
        currentSong: details.tracks[0]
      }) 
    }.bind(this));
  },
  render: function() {
    return (
      <div>
        <h1>Benevolence</h1>
        <Player song={this.state.currentSong}></Player>
      </div>
    );
  }
});
