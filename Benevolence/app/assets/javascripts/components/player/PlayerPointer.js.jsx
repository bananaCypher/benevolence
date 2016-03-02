var PlayerPointer = React.createClass({
  dragging: false,
  lastPosition: 0,
  size: 0,
  componentDidMount: function(){
    this.size = this.getDOMNode().offsetWidth;
  },
  getLeft: function() {
    var track = document.getElementById('player-track');
    if (!track) {
      return '0px';
    }
    if (this.dragging == false) {
      var perc = this.props.position / this.props.duration;
      this.lastPosition = (track.offsetWidth - this.size) * perc;
    }
    return this.lastPosition + 'px';
  },
  startDrag: function(){
    this.dragging = true;
    window.onmousemove = this.dragHandler;
    window.onmouseup = this.stopDrag
  },
  stopDrag: function(e){
    this.dragging = false;
    window.onmousemove = null;
    window.onmouseup = null;
    this.props.clickTrack(e);
  },
  dragHandler: function(e){
    var track = this.getDOMNode().parentElement;
    var newLeft = e.clientX - track.offsetLeft - (this.size/2);
    var maxLeft = track.offsetWidth - this.size;
    if (newLeft < 0) {
      newLeft = 0;
    }
    if (newLeft > maxLeft) {
      newLeft = maxLeft;
    }
    this.getDOMNode().style.left = newLeft + 'px';
  },
  render: function() {
    var styles = {
      left: this.getLeft()
    };
    return (
      <div className='ReactPlayerPointer' style={styles} onMouseDown={this.startDrag}></div> 
    );
  }
});
