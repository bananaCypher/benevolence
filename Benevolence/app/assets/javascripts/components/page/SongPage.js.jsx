var SongPage = React.createClass({
  render: function() {
    console.log(this.props.song);
    return (
        <div className='ReactSongPage'>
          <img src={this.props.artist.smallArt}/>
          <h2>{this.props.song.title}</h2>
          <a href='#!'>{this.props.artist.name}</a>
          <a href='#!'>Song Album</a>
        </div>
    );
  }
});
