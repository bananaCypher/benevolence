var UploadForm = React.createClass({
  getInitialState: function(){
    return({
      files: []
    })
  },
  getFormCallback: function(request, form){
    return function(){
      form.classList.remove("ReactUploadFormUploading");
      if (request.status === 200) {
        var response = JSON.parse(request.responseText);
        if(response.status == 'success') {
          form.classList.add("ReactUploadFormUploaded");
        } else {
          form.classList.add("ReactUploadFormFailed");
        }
      } else {
        form.classList.add("ReactUploadFormFailed");
      }
    }
  },
  formHandler: function(e){
    e.preventDefault();
    var forms = document.getElementsByClassName('ReactUploadFormFields');
    for (var i = 0, len = forms.length; i < len; i++) {
      var form = forms[i] 
      form.classList.add("ReactUploadFormUploading");
      fields = form.getElementsByTagName('input');
      var metaData = {
        title: fields[0].value,
        artist: fields[1].value,
        album: fields[2].value
      }
      var file = document.getElementsByName('upload-file')[0].files[i];

      var data = new FormData();
      data.append('metadata', JSON.stringify(metaData));
      data.append('file', file);

      var request = new XMLHttpRequest();
      request.open('POST', '/api/songs/');
      request.onload = this.getFormCallback(request, form);
      request.send(data);
    }
  },
  fileUpdater: function(e){
    this.setState({files: e.target.files})
  },
  render: function() {
    var formFields = [];
    for (var i = 0, len = this.state.files.length; i < len; i++) {
      var file = this.state.files[i];
      formFields.push(
        <UploadFormFields file={file}></UploadFormFields>    
      )
    }
    return (
      <div>
        <form className='ReactUploadForm' onSubmit={this.formHandler}>
          <input type="file" name="upload-file" multiple onChange={this.fileUpdater}/> 
          {formFields}
          <button>Upload</button>
        </form>
      </div>
    );
  }
});
