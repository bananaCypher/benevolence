var PlaylistElement = React.createClass({
  render: function() {
    var imgStyles = {
      width: '50px',
      height: '50px',
    };
    var divStyles = {
    };
    if (this.props.current == true) {
      divStyles.backgroundColor = 'Green'
    }
    return (
      <div style={divStyles}>
        <h3>{this.props.song.title} <small>{this.props.artist.name}</small></h3>
        <img style={imgStyles} src={this.props.artist.smallArt} onClick={this.props.changeTo}/>
      </div>
    );
  }
});
