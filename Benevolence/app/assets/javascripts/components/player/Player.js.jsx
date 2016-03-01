var Player = React.createClass({
  getInitialState: function() {
    return {
      songUrl: '',
      songPosition: 0,
      songDuration: 200,
      playing: false
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
    this.setState({playing: true});
  },
  pause: function() {
    this.player.pause();
    this.setState({playing: false});
  },
  stop: function() {
    this.pause();
    this.player.currentTime = 0;
  },
  next: function() {
    this.props.nextSong();
    if (this.state.playing == false) {
      this.stop();
    } else {
      this.player.currentTime = 0;
      this.player.play();
    }
  },
  prev: function() {
    this.props.prevSong();
    if (this.state.playing == false) {
      this.stop();
    } else {
      this.player.currentTime = 0;
      this.player.play();
    }
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
      <PlayerButton action={this.next}>DJ Skip that Shite</PlayerButton> 
      <PlayerButton action={this.prev}>DJ Re-Spin that Shit</PlayerButton> 
      <PlayerButton action={this.props.shuffle}>DJ Shuffle that Shit</PlayerButton> 
      <PlayerButton action={this.props.repeat}>DJ Repeat that Shit</PlayerButton> 
      <PlayerTrack seek={this.seek} position={this.state.songPosition} duration={this.state.songDuration}></PlayerTrack>
      <PlayerAudio src={this.state.songUrl} playing={this.state.playing}></PlayerAudio>
      </div>
    );
  }
});
