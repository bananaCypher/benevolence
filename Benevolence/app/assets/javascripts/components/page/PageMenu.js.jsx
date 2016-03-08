var PageMenu = React.createClass({
  render: function() {
    if(this.props.showing) {
      return (
          <ul className='ReactPageMenu'>
            <li><button onClick={this.props.home}><i className='fa fa-home'></i> Home</button></li>
            <li><button onClick={this.props.player}><i className='fa fa-play'></i> Player</button></li>
            <li><button onClick={this.props.upload}><i className='fa fa-upload'></i> Upload Song</button></li>
            <li><button onClick={this.props.search}><i className='fa fa-search'></i> Search</button></li>
            <li><button onClick={this.props.playlists}><i className='fa fa-list'></i> Playlists</button></li>
          </ul>
      );
    } else {
      return (<div></div>);
    }
  }
});
