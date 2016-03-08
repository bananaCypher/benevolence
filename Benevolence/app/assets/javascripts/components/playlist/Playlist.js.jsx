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
  songPageHandler(track){
    return function(){
      this.props.songPage(track);
    }.bind(this)
  },
  render: function() {
    var list = [];
    for (var i = 0, len = this.props.tracks.length; i < len; i++) {
      var track = this.props.tracks[i];
      var song = this.props.songs[track] || {};
      var artist = this.props.artists[song.artist] || {};
      var current = false;
      if (this.props.current == i){
        current = true; 
      }
      var changeTo = this.trackChangeHandler(track);
      var songPage = this.songPageHandler(track);
      list.push(<PlaylistElement song={song} artist={artist} current={current} changeTo={changeTo} songPage={songPage}></PlaylistElement>);
    }
    return (
      <div className='ReactPlaylist'>
        <h2>{this.props.title}</h2>
        {list}
      </div>
    );
  }
});
