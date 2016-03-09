var Player = React.createClass({
  getInitialState: function() {
    return {
      songUrl: '',
      songPosition: 0,
      songDuration: 200,
      playing: false,
      buffered: 0
    }
  },
  componentDidMount(){
    this.player = document.getElementById('audio-player');
    this.player.ontimeupdate = function(){
      this.setState({
        songPosition: this.player.currentTime,
        songDuration: this.player.duration,
      });
      this.setBuffered();
    }.bind(this)
    this.player.onended = this.next;
  },
  componentWillReceiveProps: function(props) {
    SongHelper.get(props.song, function(details){
      this.setState({
        songUrl: details.file_url 
      }); 
    }.bind(this));
    if (props.shouldPlay == true){
      this.setState({
        playing: true
      });
    }
  },
  componentWillUpdate: function(nextProps, nextState){
    this.player.autoplay = nextState.playing;
  },
  setBuffered: function(){
    var duration =  this.player.duration;
    if (duration > 0) {
      var bufferedEnd = this.player.buffered.end(this.player.buffered.length - 1); 
      this.setState({buffered: bufferedEnd});
    }
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
    if (this.props.isLast == true || this.state.playing == false) {
      this.setState({playing: false});
      this.stop();
    } else {
      this.play();
    }
  },
  prev: function() {
    this.props.prevSong();
  },
  seek: function(pos) {
    this.player.currentTime = pos
  },
  render: function() {
    var playButton;
    if (this.state.playing == true) {
      playButton = <PlayerButton action={this.pause}>fa-pause</PlayerButton> 
    } else {
      playButton = <PlayerButton action={this.play}>fa-play</PlayerButton>
    }
    var shuffleButton;
    if (this.props.shuffled == true){
      shuffleButton = <PlayerButton action={this.props.shuffle}>fa-random ReactPlayerButtonActive</PlayerButton> 
    } else {
      shuffleButton = <PlayerButton action={this.props.shuffle}>fa-random</PlayerButton> 
    }
    var repeatButton;
    if (this.props.repeatMode != 0) {
      if (this.props.repeatMode == 2) {
        repeatButton = <PlayerButton action={this.props.repeat}>fa-repeat ReactPlayerButtonActive ReactPlayerButtonRepeatOne</PlayerButton> 
      } else {
        repeatButton = <PlayerButton action={this.props.repeat}>fa-repeat ReactPlayerButtonActive</PlayerButton> 
      }
    } else {
      repeatButton = <PlayerButton action={this.props.repeat}>fa-repeat</PlayerButton> 
    }
    return (
      <div className='ReactPlayer'>
        <PlayerTrack
          seek={this.seek} 
          position={this.state.songPosition} 
          duration={this.state.songDuration} 
          buffered={this.state.buffered}>
        </PlayerTrack>
        {shuffleButton}
        <PlayerButton action={this.prev}>fa-step-backward</PlayerButton> 
        {playButton}
        <PlayerButton action={this.stop}>fa-stop</PlayerButton> 
        <PlayerButton action={this.next}>fa-step-forward</PlayerButton> 
        {repeatButton}
        <PlayerAudio src={this.state.songUrl} playing={this.state.playing}></PlayerAudio>
      </div>
    );
  }
});
