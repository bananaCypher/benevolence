var PlaylistsPage = React.createClass({
  getPlaylistChange: function(id){
    return function(){
      this.props.changeTo(id);
    }.bind(this);
  },
  render: function() {
    var playlistElements = this.props.playlists.map(function(playlist){
      var changeTo = this.getPlaylistChange(playlist.id);
      return(
        <li><button onClick={changeTo}><i className='fa fa-play'></i></button> {playlist.title}</li>
      );
    }.bind(this));
    return (
      <div className='ReactPlaylistsPage'>
        <h1>Playlists</h1>
        <ul>
          {playlistElements}
        </ul>
      </div>
    );
  }
});
