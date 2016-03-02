var BackgroundImage = React.createClass({
  render: function() {
    var styles = {
      backgroundImage: 'url("' + this.props.src + '")'
    }
    return (
      <div className='ReactBackgroundImage' style={styles}></div>
    );
  }
});
