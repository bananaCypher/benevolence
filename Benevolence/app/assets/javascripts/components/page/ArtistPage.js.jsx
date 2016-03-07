var ArtistPage = React.createClass({
  songPageHandler(song){
    return function(){
      this.props.songPage(song);
    }.bind(this)
  },
  render: function() {
    var songElements = [];
    for (var song of this.props.artist.songs) {
      var songPage = this.songPageHandler(song.id);
      songElements.push(
        <li><a href='#!' onClick={songPage}>{song.title}</a></li>
      ) 
    }
    return (
      <div className='ReactArtistPage'>
        <img src={this.props.artist.smallArt}/>
        <h2>{this.props.artist.name}</h2>
        <b>Songs:- </b>
        <ul>
          {songElements}
        </ul>
      </div>
    );
  }
});
