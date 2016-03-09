var Header = React.createClass({
  render: function() {
    var title = 'Benevolence';
    if(this.props.artist && this.props.song){
      title = this.props.artist.name + ' - ' + this.props.song.title; 
    }
    return (
      <div className='ReactHeader'>
        <img src='/BananaCypher.PNG'/>
        <PageMenuButton toggleMenu={this.props.toggleMenu}></PageMenuButton>
        <h2>{title}</h2>
      </div>
    );
  }
});
