var UploadForm = React.createClass({
  formHandler: function(e){
    e.preventDefault();
    e.target.classList.add("ReactUploadFormUploading");
    var metaData = {
      title: document.getElementsByName('upload-title')[0].value,
      artist: document.getElementsByName('upload-artist')[0].value,
      album: document.getElementsByName('upload-album')[0].value
    }
    var file = document.getElementsByName('upload-file')[0].files[0];

    var data = new FormData();
    data.append('metadata', JSON.stringify(metaData));
    data.append('file', file);

    var request = new XMLHttpRequest();
    request.open('POST', '/api/songs/');
    request.onload = function(){
      e.target.classList.remove("ReactUploadFormUploading");
      if (request.status === 200) {
        var response = JSON.parse(request.responseText);
        if(response.status == 'success') {
          e.target.classList.add("ReactUploadFormUploaded");
        }
      } else {
        e.target.classList.add("ReactUploadFormFailed");
      }
    };
    request.send(data);
  },
  render: function() {
    return (
        <form className='ReactUploadForm' onSubmit={this.formHandler}>
          <input type="file" name="upload-file"/> 
          <input type="text" name="upload-title" placeholder='Title'/>
          <input type="text" name="upload-artist" placeholder='Artist'/>
          <input type="text" name="upload-album" placeholder='Album'/>
          <button>Upload</button>
        </form>
    );
  }
});
