var SearchSongResult = React.createClass({
  render: function() {
    return (
      <div className='ReactSearchSongResult'>
        <img src={this.props.artist.small_art}/>
        <SearchOptionGrid
          playNow={this.props.playNow}
          showPlaylistForm={this.props.showPlaylistForm}
          playNext={this.props.playNext}
          playLast={this.props.playLast}>
        </SearchOptionGrid>
        <h2><b>Song</b></h2>
        <p onClick={this.props.songPage}>{this.props.song.title}</p>
      </div>
    );
  }
});
