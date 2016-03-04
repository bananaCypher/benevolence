var UploadFormFields = React.createClass({
  componentDidMount: function(){
    var fields = this.getDOMNode().getElementsByTagName('input');
    var jsmediatags = window.jsmediatags;
    jsmediatags.read(this.props.file, {
      onSuccess: function(data){
        fields[0].value = data.tags.title || '';
        fields[1].value = data.tags.artist || '';
        fields[2].value = data.tags.album || '';
      },
      onError: function(){
        fields[0].value = '';
        fields[1].value = '';
        fields[2].value = '';
      }
    });
  },
  updateFields: function(){

  },
  render: function(){
    return(
      <div className='ReactUploadFormFields'>
        <h3>{this.props.file.name}</h3>
        <label for='title'>Title: </label><input type='text' name='title' placeholder='Title'/><br/>
        <label for='artist'>Artist: </label><input type='text' name='artist' placeholder='Artist'/><br/>
        <label for='album'>Album: </label><input type='text' name='album' placeholder='Album'/><br/>
      </div>
    );
  }
});
