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
      menuShowing: false,
      page: 'home',
      backgroundImage: '/space.jpg',
      songs: {},
      artists: {},
      displayingSong: '',
      displayingArtist: ''
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
  componentDidUpdate: function(prevProps, prevState){
    if (prevState.playlistTracks != this.state.playlistTracks) {
      for (var track of this.state.playlistTracks) {
        this.getSongData(track);
      }
    }
    if (prevState.currentSong != this.state.currentSong) {
      this.setBackgroundImage();
    }
  },
  getSongData: function(id){
    SongHelper.get(id, function(song){
      var songObj = {
        id: id,
        title: song.title,
        artist: song.artist
      };
      var newSongs = this.state.songs;
      newSongs[id] = songObj;
      this.setState({songs: newSongs})
      var artist = this.state.artists[songObj.artist];
      if (!artist) {
        this.getArtistData(songObj.artist);
      }
    }.bind(this));  
  },
  getArtistData: function(id){
    ArtistHelper.get(id, function(artist){
      var artistObj = {
        id: id,
        name: artist.name,
        smallArt: artist.small_art,
        largeArt: artist.large_art,
        songs: artist.unique_songs
      };
      var newArtists = this.state.artists;
      newArtists[id] = artistObj;
      this.setState({artists: newArtists});
      this.setBackgroundImage();
    }.bind(this));  
  },
  getSong: function(id){
    var song = this.state.songs[id];
    if (song){
      return song
    } else {
      this.getSongData(id);
    }
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
  playSongNow: function(track){
    var newPlaylist = this.state.playlistTracks;
    newPlaylist.splice(this.state.currentIndex, 0, track);
    this.setState({
      playlistTracks: newPlaylist, 
      currentSong: newPlaylist[this.state.currentIndex],
      shouldPlay: true
    });
  },
  setBackgroundImage: function(){
    var song = this.state.songs[this.state.currentSong];
    var artist = this.state.artists[song.artist];
    this.setState({backgroundImage: artist.largeArt})
  },
  toggleMenu: function(){
    this.setState({menuShowing: !this.state.menuShowing});
  },
  showHomePage: function(){
    this.setState({page: 'home', menuShowing: false})
  },
  showPlayerPage: function(){
    this.setState({page: 'player', menuShowing: false})
  },
  showUploadPage: function(){
    this.setState({page: 'upload', menuShowing: false})
  },
  changeToSongPage: function(track){
    this.setState({page: 'song', displayingSong: track})
  },
  changeToArtistPage: function(artist){
    this.setState({page: 'artist', displayingArtist: artist})
  },
  playerPage: function(){
    return (
      <PlayerPage
        currentSong={this.state.currentSong}
        showingPlaylist={this.state.showingPlaylist}
        playlistTracks={this.state.playlistTracks}
        changeToTrack={this.changeToTrack}
        togglePlaylist={this.togglePlaylist}
        setBackgroundImage={this.setBackgroundImage}
        songs={this.state.songs}
        artists={this.state.artists}
        songPage={this.changeToSongPage}>
      </PlayerPage>
    )
  },
  uploadPage: function(){
    return (
      <UploadPage></UploadPage>
    )
  },
  songPage: function(){
    var song = this.getSong(this.state.displayingSong);
    var artist = this.state.artists[song.artist];
    return (
      <SongPage song={song} artist={artist} artistPage={this.changeToArtistPage} playSong={this.playSongNow}></SongPage>
    )
  },
  artistPage: function(){
    var artist = this.state.artists[this.state.displayingArtist];
    return (
      <ArtistPage artist={artist} songPage={this.changeToSongPage}></ArtistPage>
    )
  },
  render: function() {
    var page;
    switch(this.state.page) {
      case 'home':
        page = '';
        break;
      case 'player':
        page = this.playerPage();
        break;
      case 'upload':
        page = this.uploadPage();
        break;
      case 'song':
        page = this.songPage();
        break;
      case 'artist':
        page = this.artistPage();
        break;
      default:
        page = '';
    }
    var song = this.state.songs[this.state.currentSong];
    var artist = '';
    if (song) {
      artist = this.state.artists[song.artist]
    }
    return (
      <div className='ReactPage'>
        <BackgroundImage src={this.state.backgroundImage}></BackgroundImage>
        <Header 
          toggleMenu={this.toggleMenu} 
          artist={artist}
          song={song}>
        </Header>
        {page}
        <PageMenu showing={this.state.menuShowing} player={this.showPlayerPage} upload={this.showUploadPage} home={this.showHomePage}></PageMenu>
        <Player 
          song={this.state.currentSong}
          nextSong={this.nextSong}
          prevSong={this.prevSong}
          shuffle={this.shufflePlaylist} 
          repeat={this.toggleRepeat} 
          isLast={this.state.isLast} 
          shuffled={this.state.shuffled}
          repeatMode={this.state.repeat}
          shouldPlay={this.state.shouldPlay}>
        </Player>
      </div>
    );
  }
});
