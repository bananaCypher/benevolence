var SearchArtistResult = React.createClass({
  render: function() {
    return (
      <div className='ReactSearchArtistResult' onClick={this.props.artistPage}>
        <img src={this.props.artist.small_art}/>
        <h2><b>Artist</b></h2>
        <p>{this.props.artist.name}</p>
      </div>
    );
  }
});
