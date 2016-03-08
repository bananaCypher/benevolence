var SearchOptionGrid = React.createClass({
  render: function() {
    return (
      <div className='ReactSearchOptionGrid'>
        <img src='/playicon2.png' onClick={this.props.playNow} title='Play Now'/>
        <img src='/plusicon.png' onClick={this.props.showPlaylistForm} title='Add to Playlist'/>
        <img src='/playnexticon.png' onClick={this.props.playNext} title='Play Next'/>
        <img src='/playlasticon.png' onClick={this.props.playLast}title='Play Last'/>
      </div>
    );
  }
});
