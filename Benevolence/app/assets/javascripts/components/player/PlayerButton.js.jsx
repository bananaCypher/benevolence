var PlayerButton = React.createClass({
  render: function() {
    return (
      <button className='ReactPlayerButton' onClick={this.props.action}><i className={'fa ' + this.props.children}></i></button>
    );
  }
});
