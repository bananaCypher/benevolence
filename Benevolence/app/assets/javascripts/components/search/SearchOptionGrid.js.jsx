var SearchOptionGrid = React.createClass({
  render: function() {
    return (
      <div className='ReactSearchOptionGrid'>
        <img src='/playicon2.png' onClick={this.props.playNow}/>
        <img src='/plusicon.png' onClick={this.props.showPlaylistForm}/>
        <img src='/playnexticon.png' onClick={this.props.playNext}/>
        <img src='/playicon.png'/>
      </div>
    );
  }
});
