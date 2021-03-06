var PlayerTrack = React.createClass({
  size: 20,
  trackClick: function(e) {
    var track = this.getDOMNode();
    var x = e.clientX - track.offsetLeft - (this.size/2);
    var newPosition = x / (track.offsetWidth - this.size) * this.props.duration;
    this.props.seek(newPosition);
  },
  trackNode: function(){
    return this.getDOMNode();
  },
  render: function() {
    return (
      <div className='ReactPlayerTrack' onClick={this.trackClick} id='player-track'>
        <PlayerBuffer 
          buffered={this.props.buffered}
          duration={this.props.duration}>
        </PlayerBuffer>
        <PlayerPointer 
          position={this.props.position} 
          duration={this.props.duration}
          trackWidth={this.width}
          size={this.size}
          clickTrack={this.trackClick}>
        </PlayerPointer>
      </div> 
    );
  }
});
