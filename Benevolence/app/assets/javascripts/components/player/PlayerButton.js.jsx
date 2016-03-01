var PlayerButton = React.createClass({
  render: function() {
    return (
      <button onClick={this.props.action}>{this.props.children}</button>
    );
  }
});
