var Page = React.createClass({
  getInitialState: function() {
    playlist = new Playlist('56d4310afdc77eacb4000000', {
      onUpdate: function(playlist){
        this.setState({playlist: playlist})
      }.bind(this)
    })
    return {playlist: playlist};
  },
  render: function() {
    return (
      <div>
        <h1>Benevolence</h1>
        <Player now_playing={this.state.playlist.now_playing}></Player>
      </div>
    );
  }
});
