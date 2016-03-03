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
      repeat: 0,
      isLast: false,
      shuffled: false,
      shouldPlay: false,
      showingPlaylist: false
    };
  },
  componentDidMount: function(){
    PlaylistHelper.get(this.state.playlistID, function(details){
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
    var last = false;
    if (this.state.repeat == 0 && next == this.state.playlistTracks.length - 1) {
      last = true;
    }
    this.setState({
      currentIndex: next,
      currentSong: this.state.playlistTracks[next],
      isLast: last
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
    var last = false;
    if (this.state.repeat == 0 && prev == this.state.playlistTracks.length - 1) {
      last = true;
    }
    this.setState({
      currentIndex: prev,
      currentSong: this.state.playlistTracks[prev],
      isLast: last
    });
  },
  shufflePlaylist: function(){
    var newTracks = shuffleArray(this.state.playlistTracks);
    var newIndex = newTracks.indexOf(this.state.currentSong);
    var last = false;
    if (newIndex == newTracks.length - 1) {
      this.setState({isLast: true});
    }
    this.setState({
      playlistTracks: newTracks,
      currentIndex: newIndex,
      shuffled: true
    });
  },
  toggleRepeat: function(){
    var newRepeat = this.state.repeat + 1;
    var last = false;
    if (newRepeat > 2) {
      newRepeat = 0;
      if(this.currentIndex == this.state.playlistTracks.length - 1){
        last = true;
      }
    }
    this.setState({repeat: newRepeat, isLast: last})
  },
  changeToTrack: function(track){
    var index = this.state.playlistTracks.indexOf(track);
    this.setState({
      currentSong: this.state.playlistTracks[index],
      currentIndex: index,
      shouldPlay: true
    });
  },
  togglePlaylist: function(){
    this.setState({showingPlaylist: !this.state.showingPlaylist});
  },
  render: function() {
    return (
      <div className='ReactPage'>
        <BackgroundImage src='http://vanyaland.com/wp-content/uploads/2013/06/kflay.jpg'></BackgroundImage>
        <Header></Header>
        <PlayerPage
          currentSong={this.state.currentSong}
          isLast={this.state.isLast}
          shuffled={this.state.shuffled}
          repeat={this.state.repeat}
          shouldPlay={this.state.shouldPlay}
          showingPlaylist={this.state.showingPlaylist}
          playlistTracks={this.state.playlistTracks}
          nextSong={this.nextSong}
          prevSong={this.prevSong}
          shufflePlaylist={this.shufflePlaylist}
          toggleRepeat={this.toggleRepeat}
          changeToTrack={this.changeToTrack}
          togglePlaylist={this.togglePlaylist}>
        </PlayerPage>
      </div>
    );
  }
});
