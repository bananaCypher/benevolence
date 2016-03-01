var PlayerTrack = React.createClass({
  width: 800,
  size: 20,
  trackClick: function(e) {
    var x = e.clientX - this.getDOMNode().offsetLeft;
    var newPosition = x / this.width * this.props.duration;
    this.props.seek(newPosition);
  },
  trackNode: function(){
    return this.getDOMNode();
  },
  render: function() {
    var styles = {
      backgroundColor: 'green',
      width: this.width + 'px',
      height: this.size + 'px',
    };
    return (
      <div style={styles} onClick={this.trackClick}>
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
