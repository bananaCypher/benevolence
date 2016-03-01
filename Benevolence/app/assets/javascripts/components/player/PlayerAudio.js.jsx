var PlayerAudio = React.createClass({
  componentDidUpdate: function(){
    if (this.props.playing == true) {
      this.getDOMNode().play();
    }
  },
  render: function() {
    return (
      <audio id='audio-player' src={this.props.src}></audio>
    );
  }
});
