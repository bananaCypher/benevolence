var SearchSongResult = React.createClass({
  render: function() {
    return (
      <div className='ReactSearchSongResult' onClick={this.props.songPage}>
        <img src={this.props.artist.small_art}/>
        <SearchOptionGrid
        playNow={this.props.playNow}>
        </SearchOptionGrid>
        <h2><b>Song</b></h2>
        <p>{this.props.song.title}</p>
      </div>
    );
  }
});
