var PlaylistForm = React.createClass({
  getInitialState: function(){
    return({
      playlists: []
    })
  },
  componentDidMount: function(){
    var request = new XMLHttpRequest();
    request.open('GET', '/api/playlists');
    request.onload = function(){
      if (request.status === 200) {
        this.setState({playlists: JSON.parse(request.responseText)})
      }
    }.bind(this);
    request.send(null);
  },
  getAddToPlaylist: function(playlist){
    return function(){
      this.props.addToPlaylist(this.props.song, playlist);
    }.bind(this)
  },
  render: function() {
    if (!this.props.showing) {
      return(<div></div>);
    }
    playlistElements = this.state.playlists.map(function(playlist){
      var addToPlaylist = this.getAddToPlaylist(playlist.id);
      console.log(addToPlaylist);
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
      </div>
    );
  }
});
