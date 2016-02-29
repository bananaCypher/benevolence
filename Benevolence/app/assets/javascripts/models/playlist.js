var baseURL = 'http://localhost:3000/api/playlists/'

var Playlist = function(id){
  this.id = id;
  this.title = '';
  this.tracks = [];
  this.playingIndex = 0;
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
  },
  updatePlayingOrder: function(){
    var nextIndex = this.playingIndex + 1;
    if (nextIndex > this.tracks.length - 1) {
      nextIndex = 0;
    }
    var prevIndex = this.playingIndex - 1;
    if (prevIndex < 0) {
      prevIndex = this.tracks.length - 1;
    }
    this.now_playing = this.tracks[this.playingIndex];
    this.next_song = this.tracks[nextIndex];
    this.prev_song = this.tracks[prevIndex];
  }
}

try {
  module.exports = Playlist;
} 
catch(err) {}
