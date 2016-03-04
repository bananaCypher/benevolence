var Playlist = React.createClass({
  getInitialState: function(){
    return({
      songs: {},
      artists: {},
      current: '',
    })
  },
  trackChangeHandler: function(track){
    return function(){
      this.props.changeToTrack(track);
    }.bind(this)
  },
  render: function() {
    var list = [];
    for (var track of this.props.tracks) {
      var song = this.props.songs[track] || {};
      var artist = this.props.artists[song.artist] || {};
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
