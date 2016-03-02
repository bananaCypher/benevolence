var PlayerButton = React.createClass({
  render: function() {
    return (
      <button className='ReactPlayerButton' onClick={this.props.action}>{this.props.children}</button>
    );
  }
});
