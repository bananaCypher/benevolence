var Player = React.createClass({
  getInitialState: function() {
    return {
      songUrl: ''
    }
  },
  componentWillReceiveProps: function(props) {
    Song.get(props.song, function(details){
      this.setState({
        songUrl: details.file_url 
      }); 
    }.bind(this));
  },
  play: function() {
    document.getElementById('audio-player').play();
  },
  pause: function() {
    document.getElementById('audio-player').pause();
  },
  render: function() {
    return (
      <div>
      <PlayerButton action={this.play}>DJ Spin that Shit</PlayerButton>
      <PlayerButton action={this.pause}>DJ Pause that Sheet</PlayerButton> 
      <audio id='audio-player' src={this.state.songUrl}></audio>
      </div>
    );
  }
});
