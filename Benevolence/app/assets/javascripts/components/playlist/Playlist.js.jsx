var Playlist = React.createClass({
  getInitialState: function(){
    return({
      songs: {},
      artists: {},
      current: '',
    })
  },
  componentDidMount: function(){
    for (var track of this.props.tracks) {
      this.getSongData(track);
    }
  },
  componentWillReceiveProps: function(props){
    for (var track of props.tracks) {
      this.getSongData(track);
    }
  },
  getSongData: function(id){
    SongHelper.get(id, function(song){
      var songObj = {
        title: song.title,
        artist: song.artist
      };
      var newSongs = this.state.songs;
      newSongs[id] = songObj;
      this.setState({songs: newSongs})
      this.getArtistData(songObj.artist);
    }.bind(this));  
  },
  getArtistData: function(id){
    ArtistHelper.get(id, function(artist){
      var artistObj = {
        name: artist.name,
        smallArt: artist.small_art
      };
      var newArtists = this.state.artists;
      newArtists[id] = artistObj;
      this.setState({artists: newArtists})
    }.bind(this));  
  },
  trackChangeHandler: function(track){
    return function(){
      this.props.changeToTrack(track);
    }.bind(this)
  },
  render: function() {
    var list = [];
    for (var track of this.props.tracks) {
      var song = this.state.songs[track] || {};
      var artist = this.state.artists[song.artist] || {};
      var current = false;
      if (this.props.current == track){
        current = true; 
      }
      var changeTo = this.trackChangeHandler(track);
      list.push(<PlaylistElement song={song} artist={artist} current={current} changeTo={changeTo}></PlaylistElement>);
    }
    return (
        <div className='ReactPlaylist'>
          {list}
        </div>
    );
  }
});
