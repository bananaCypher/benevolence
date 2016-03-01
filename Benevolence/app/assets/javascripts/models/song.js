var Song = function(id){
  this.baseURL = 'http://localhost:3000/api/songs/'
  this.id = id; 
  this.title = '';
  this.artist = '';
  this.album = '';
  this.url = '';
}
Song.prototype = {
  get: function(callback){
    var request = new XMLHttpRequest();
    request.open('GET', this.baseURL + this.id);
    request.onload = function(){
      if (request.status === 200) {
        obj = JSON.parse(request.responseText); 
        this.title = obj.title;
        this.artist = obj.artist;
        if(obj.abum){ this.album=obj.album }
        this.url = obj.file_url
        callback(this);
      } else {
      }
    }.bind(this);
    request.send(null);
  },
}

try {
  module.exports = Song;
} 
catch(err) {}
