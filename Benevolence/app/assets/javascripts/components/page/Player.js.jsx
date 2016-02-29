var Player = React.createClass({
  render: function() {
    return (
      <audio src={this.props.now_playing.song}></audio>
    );
  }
});
