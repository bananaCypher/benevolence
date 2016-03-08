var PlaylistForm = React.createClass({
  getAddToPlaylist: function(playlist){
    return function(){
      this.props.addToPlaylist(this.props.song, playlist);
    }.bind(this)
  },
  newPlaylistHandler: function(e){
    e.preventDefault();
    var title = e.target.getElementsByTagName('input')[0].value;
    this.props.createNewPlaylist(title);
  },
  render: function() {
    if (!this.props.showing) {
      return(<div></div>);
    }
    playlistElements = this.props.playlists.map(function(playlist){
      var addToPlaylist = this.getAddToPlaylist(playlist.id);
      return(
        <li onClick={addToPlaylist}>{playlist.title}</li>
      ); 
    }.bind(this)); 
    return (
      <div className='ReactPlaylistForm'>
        <h1>Playlists</h1>
        <ul>
          {playlistElements}
        </ul>
        <form onSubmit={this.newPlaylistHandler}>
          <input type='text' placeholder='Playlist title'/><button>Create new playlist</button>
        </form>
      </div>
    );
  }
});
