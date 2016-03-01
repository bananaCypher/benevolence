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
      currentSong: null,
      repeat: 0
    };
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
  nextSong: function(){
    var next = this.state.currentIndex + 1;
    if (next > this.state.playlistTracks.length - 1) {
      if (this.state.repeat == 1) {
        next = 0;
      } else {
        next = this.state.playlistTracks.length - 1;
      }
    }
    if (this.state.repeat == 2) {
      next = this.state.currentIndex;
    };
    this.setState({
      currentIndex: next,
      currentSong: this.state.playlistTracks[next]
    });
  },
  prevSong: function(){
    var prev = this.state.currentIndex - 1;
    if (prev < 0) {
      if (this.state.repeat == 1) {
        prev = this.state.playlistTracks.length - 1;
      } else {
        prev = 0;
      }
    }
    if (this.state.repeat == 2) {
      prev = this.state.currentIndex;
    };
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
  toggleRepeat: function(){
    newRepeat = this.state.repeat + 1;
    if (newRepeat > 2) {
      newRepeat = 0;
    }
    this.setState({repeat: newRepeat})
  },
  render: function() {
    return (
      <div>
        <h1>Benevolence</h1>
        <Player song={this.state.currentSong} nextSong={this.nextSong} prevSong={this.prevSong} shuffle={this.shufflePlaylist} repeat={this.toggleRepeat}></Player>
      </div>
    );
  }
});
