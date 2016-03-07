var SearchOptionGrid = React.createClass({
  render: function() {
    return (
      <div className='ReactSearchOptionGrid'>
        <img src='/playicon.png' onClick={this.props.playNow}/>
        <img src='/playicon.png'/>
        <img src='/playicon.png'/>
        <img src='/playicon.png'/>
      </div>
    );
  }
});
