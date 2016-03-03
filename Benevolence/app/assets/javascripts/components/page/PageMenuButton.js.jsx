var PageMenuButton = React.createClass({
  render: function() {
    return (
        <button onClick={this.props.toggleMenu}><i className='fa fa-bars'></i></button>
    );
  }
});
