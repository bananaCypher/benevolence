var baseURL = 'http://localhost:3000/api/playlists/'

var Playlist = function(id){
  this.id = id;
  this.title = '';
  this.tracks = [];
  this.playingIndex = 0;
  this.repeat = 0;
  this.now_playing = {song: '', artist: ''}
}
Playlist.prototype = {
  get: function(playlistId, callback){
    var request = new XMLHttpRequest();
    request.open('GET', baseURL + playlistId);
    request.onload = function(){
      if (request.status === 200) {
        obj = JSON.parse(request.responseText); 
        this.title = obj.title
        this.tracks = obj.tracks
        this.updatePlayingOrder();
        callback(this)
      } else {
      }
    }.bind(this);
    request.send(null);
  },
  update: function(callback){
    this.get(this.id, callback);
  },
  updatePlayingOrder: function(){
    this.now_playing = this.tracks[this.playingIndex];
    this.next_song = this.tracks[this.nextIndex()];
    this.prev_song = this.tracks[this.prevIndex()];
  },
  nextIndex: function(){
    var nextIndex = this.playingIndex + 1;
    if (nextIndex > this.tracks.length - 1) {
      if (this.repeat == 2) {
        nextIndex = 0;
      } else {
        nextIndex = this.tracks.length - 1;
      }
    }
    return nextIndex;
  },
  prevIndex: function(){
    var prevIndex = this.playingIndex - 1;
    if (prevIndex < 0) {
      if (this.repeat == 2) {
        prevIndex = this.tracks.length - 1;
      } else {
        prevIndex = 0;
      }
    }
    return prevIndex;
  }
}

try {
  module.exports = Playlist;
} 
catch(err) {}
