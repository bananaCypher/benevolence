var PlaylistShowButton = React.createClass({
  render: function() {
    return (
        <button onClick={this.props.show}><i className='fa fa-list'></i></button>
    );
  }
});
