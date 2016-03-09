var ArtistPage = React.createClass({
  getPlayNow: function(song){
    return function(){
      this.props.playSong(song);
    }.bind(this);
  },
  getShowPlaylistForm: function(song){
    return function(){
      this.props.showPlaylistForm(song);
    }.bind(this);
  },
  getSongPage: function(song){
    return function(){
      this.props.songPage(song);
    }.bind(this);
  },
  getPlayNext: function(song){
    return function(){
      this.props.playNext(song);
    }.bind(this);
  },
  getPlayLast: function(song){
    return function(){
      this.props.playLast(song);
    }.bind(this);
  },
  render: function() {
    var songElements = [];
    console.log(this.props.artist);
    for (var song of this.props.artist.songs) {
      var playNow = this.getPlayNow(song.id);
      var songPage = this.getSongPage(song.id);
      var showPlaylistForm = this.getShowPlaylistForm(song.id);
      var playNext = this.getPlayNext(song.id);
      var playLast = this.getPlayLast(song.id);
      songElements.push(
        <SearchSongResult 
          songPage={songPage} 
          artist={this.props.artist} 
          song={song} 
          playNow={playNow}
          showPlaylistForm={showPlaylistForm}
          playNext={playNext}
          playLast={playLast}>
        </SearchSongResult>    
      )
    }
    return (
      <div className='ReactArtistPage'>
        <img src={this.props.artist.small_art}/>
        <h2>{this.props.artist.name}</h2>
        <b>Songs:- </b>
        <div className='ReactArtistPageSongs'>
          {songElements}
        </div>
      </div>
    );
  }
});
