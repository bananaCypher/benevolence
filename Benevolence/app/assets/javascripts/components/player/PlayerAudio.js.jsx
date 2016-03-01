var PlayerAudio = React.createClass({
  render: function() {
    return (
      <audio id='audio-player' src={this.props.src}></audio>
    );
  }
});
