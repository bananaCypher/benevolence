var SearchPage = React.createClass({
  getInitialState: function(){
    return({
      results: []
    })
  },
  searchHandler: function(e){
    e.preventDefault();
    this.setState({results: []});
    var term = e.target.childNodes[0].value;

    var requestSong = new XMLHttpRequest();
    requestSong.open('GET', '/api/songs/search/' + term);
    requestSong.onload = function(){
      if (requestSong.status === 200) {
        response = JSON.parse(requestSong.responseText); 
        var results = this.state.results;
        for (var result of response) {
          results.push({
            type: 'song',
            data: result
          })  
          this.props.addSong(result);
        }
        this.setState({results: results})
      }
    }.bind(this);

    var requestArtist = new XMLHttpRequest();
    requestArtist.open('GET', '/api/artists/search/' + term);
    requestArtist.onload = function(){
      if (requestArtist.status === 200) {
        response = JSON.parse(requestArtist.responseText); 
        var results = this.state.results;
        for (var result of response) {
          var artistObj = {
            id: result.id,
            name: result.name,
            small_art: result.small_art,
            large_art: result.large_art,
            songs: result.unique_songs
          } 
          results.push({
            type: 'artist',
            data: artistObj
          })  
          this.props.addArtist(result);
        }
        this.setState({results: results})
      }
    }.bind(this);

    requestSong.send(null);
    requestArtist.send(null);
  },
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
  getArtistPage: function(artist){
    return function(){
      this.props.artistPage(artist);
    }.bind(this);
  },
  render: function() {
    var results = [];
    for (var result of this.state.results) {
      if(result.type == 'song'){
        var playNow = this.getPlayNow(result.data.id);
        var songPage = this.getSongPage(result.data.id);
        var showPlaylistForm = this.getShowPlaylistForm(result.data.id);
        var playNext = this.getPlayNext(result.data.id);
        var playLast = this.getPlayLast(result.data.id);
        results.push(
          <SearchSongResult 
            songPage={songPage} 
            artist={result.data.artist} 
            song={result.data} 
            playNow={playNow}
            showPlaylistForm={showPlaylistForm}
            playNext={playNext}
            playLast={playLast}>
          </SearchSongResult>    
        )
      } 
      if(result.type == 'artist'){
        var artistPage = this.getArtistPage(result.data.id);
        results.push(
          <SearchArtistResult artistPage={artistPage} artist={result.data}></SearchArtistResult>
        )
      }
    }
    return (
      <div className='ReactSearchPage'>
        <form onSubmit={this.searchHandler}>
          <input type='text' placeholder='Search'/>
          <button><i className='fa fa-search'></i></button>
        </form>
        <div className='ReactSearchPageResults'>
          {results}
        </div>
      </div>
    );
  }
});
