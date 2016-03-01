var PlayerPointer = React.createClass({
  dragging: false,
  lastPosition: 0,
  getLeft: function() {
    if (this.dragging == false) {
      var perc = this.props.position / this.props.duration;
      this.lastPosition = (this.props.trackWidth - this.props.size) * perc;
    }
    return this.lastPosition + 'px';
  },
  startDrag: function(){
    console.log('here we go');
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
    var newLeft = e.clientX - this.props.size;
    var maxLeft = this.getDOMNode().parentElement.offsetWidth - this.props.size;
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
      backgroundColor: 'yellow',
      width: this.props.size + 'px',
      height: this.props.size + 'px',
      position: 'relative',
      left: this.getLeft()
    };
    return (
      <div style={styles} onMouseDown={this.startDrag}></div> 
    );
  }
});
