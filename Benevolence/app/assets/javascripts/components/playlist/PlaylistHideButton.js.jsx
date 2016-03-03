var PlaylistHideButton = React.createClass({
  render: function() {
    return (
        <button onClick={this.props.hide}><i className='fa fa-times'></i></button>
    );
  }
});
