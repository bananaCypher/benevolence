var SongPage = React.createClass({
  render: function() {
    var changeToArtist = function(){
      this.props.artistPage(this.props.artist.id);
    }.bind(this);
    var playTrack = function(){
      this.props.playSong(this.props.song.id);
    }.bind(this);
    return (
        <div className='ReactSongPage'>
          <img src={this.props.artist.smallArt}/>
          <h2>{this.props.song.title}</h2>
          <a href='#!' onClick={playTrack}>Play Now</a>
          <a href='#!' onClick={changeToArtist}>{this.props.artist.name}</a>
          <a href='#!'>Song Album</a>
        </div>
    );
  }
});
