var PlaylistElement = React.createClass({
  render: function() {
    var classList = 'ReactPlaylistElement';
    if (this.props.current == true) {
      classList = classList + ' ReactPlaylistElementPlaying';
    }
    return (
      <div className={classList}>
        <img src={this.props.artist.small_art} onClick={this.props.changeTo}/>
        <div onClick={this.props.changeTo}></div>
        <h3 onClick={this.props.songPage}>{this.props.song.title} <small>{this.props.artist.name}</small></h3>
      </div>
    );
  }
});
