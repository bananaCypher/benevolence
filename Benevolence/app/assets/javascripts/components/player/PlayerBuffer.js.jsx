var PlayerBuffer = React.createClass({
  getWidth: function(){
    var track = document.getElementById('player-track');
    if (!track) {
      return 0;
    }
    var perc = this.props.buffered / this.props.duration;
    return (perc * 100);
  },
  render: function() {
    styles = {
      width: this.getWidth() + '%'
    }
    return (
      <div className='ReactPlayerBuffer' style={styles}>
      </div> 
    );
  }
});
