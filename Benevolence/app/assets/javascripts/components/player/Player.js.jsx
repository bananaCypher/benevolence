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
  player: function() {
    return document.getElementById('audio-player')
  },
  play: function() {
    var player = this.player();
    player.play();
  },
  pause: function() {
    var player = this.player();
    player.pause();
  },
  stop: function() {
    var player = this.player();
    player.pause();
    player.currentTime = 0;
  },
  render: function() {
    return (
      <div>
      <PlayerButton action={this.play}>DJ Spin that Shit</PlayerButton>
      <PlayerButton action={this.pause}>DJ Pause that Sheet</PlayerButton> 
      <PlayerButton action={this.stop}>DJ Stop that Sheit</PlayerButton> 
      <audio id='audio-player' src={this.state.songUrl}></audio>
      </div>
    );
  }
});
