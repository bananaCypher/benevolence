var baseURL = 'http://localhost:3000/api/playlists/'

var Playlist = function(id){
  this.id = id;
  this.title = '';
  this.tracks = [];
}
Playlist.prototype = {
  get: function(playlistId){
    var request = new XMLHttpRequest();
    request.open('GET', baseURL + playlistId);
    request.onload = function(){
      if (request.status === 200) {
        obj = JSON.parse(request.responsText); 
        this.title = obj.title
        this.tracks = obj.song_ids
      } else {
      }
    }.bind(this);
    request.send(null);
    
  }
}

try {
  module.exports = Playlist;
} 
catch(err) {}
