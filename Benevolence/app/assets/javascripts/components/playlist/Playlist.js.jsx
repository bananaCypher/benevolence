var Playlist = React.createClass({
  getInitialState: function(){
    return({
      songs: {},
      artists: {}
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
        title: artist.name,
        smallArt: artist.small_art
      };
      var newArtists = this.state.artists;
      newArtists[id] = artistObj;
      this.setState({artists: newArtists})
    }.bind(this));  
  },
  render: function() {
    var list = [];
    for (var key in this.state.songs) {
      var song = this.state.songs[key];
      var artist = this.state.artists[song.artist] || {};
      list.push(<PlaylistElement song={song} artist={artist}></PlaylistElement>);
    }
    return (
        <div>
        <h1>Playlist</h1>
        {list}
        </div>
    );
  }
});
