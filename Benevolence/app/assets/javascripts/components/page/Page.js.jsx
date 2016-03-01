// http://stackoverflow.com/a/6274398
function shuffleArray(array) {
  let counter = array.length;
  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);
    // Decrease counter by 1
    counter--;
    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}


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
  prevSong: function(){
    prev = this.state.currentIndex - 1;
    if (prev < 0) {
      prev = 0;
    }
    this.setState({
      currentIndex: prev,
      currentSong: this.state.playlistTracks[prev]
    });
  },
  shufflePlaylist: function(){
    var newTracks = shuffleArray(this.state.playlistTracks);
    var newIndex = newTracks.indexOf(this.state.currentSong);
    this.setState({
      playlistTracks: newTracks,
      currentIndex: newIndex
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
        <Player song={this.state.currentSong} nextSong={this.nextSong} prevSong={this.prevSong} shuffle={this.shufflePlaylist}></Player>
      </div>
    );
  }
});
