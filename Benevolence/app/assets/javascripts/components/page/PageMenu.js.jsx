var PageMenu = React.createClass({
  render: function() {
    if(this.props.showing) {
      return (
          <ul className='ReactPageMenu'>
            <li><button onClick={this.props.home}><i className='fa fa-home'></i> Player</button></li>
            <li><button onClick={this.props.player}><i className='fa fa-play'></i> Player</button></li>
            <li><button onClick={this.props.upload}><i className='fa fa-upload'></i> Upload Song</button></li>
          </ul>
      );
    } else {
      return (<div></div>);
    }
  }
});
