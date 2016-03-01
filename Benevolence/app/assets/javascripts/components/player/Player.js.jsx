var Player = React.createClass({
  getInitialState: function() {
    return {
      songUrl: '',
      songPosition: 0,
      songDuration: 200
    }
  },
  componentDidMount(){
    this.player = document.getElementById('audio-player');
    this.player.ontimeupdate = function(){
      this.setState({
        songPosition: this.player.currentTime,
        songDuration: this.player.duration
      });
    }.bind(this)
  },
  componentWillReceiveProps: function(props) {
    Song.get(props.song, function(details){
      this.setState({
        songUrl: details.file_url 
      }); 
    }.bind(this));
  },
  componentDidUpdate: function(){
  },
  play: function() {
    this.player.play();
  },
  pause: function() {
    this.player.pause();
  },
  stop: function() {
    this.player.pause();
    this.player.currentTime = 0;
  },
  seek: function(pos) {
    this.player.currentTime = pos
  },
  render: function() {
    return (
      <div>
      <PlayerButton action={this.play}>DJ Spin that Shit</PlayerButton>
      <PlayerButton action={this.pause}>DJ Pause that Sheet</PlayerButton> 
      <PlayerButton action={this.stop}>DJ Stop that Sheit</PlayerButton> 
      <PlayerTrack seek={this.seek} position={this.state.songPosition} duration={this.state.songDuration}></PlayerTrack>
      <PlayerAudio src={this.state.songUrl}></PlayerAudio>
      </div>
    );
  }
});
