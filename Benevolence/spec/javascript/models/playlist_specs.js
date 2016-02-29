var assert = require('assert');
var Playlist = require('../../../app/assets/javascripts/models/playlist.js');

describe('Playlist', function(){
  beforeEach(function() {
    //Can't do an AJAX request in mocha so manually setting up Playlist
    playlist = new Playlist('56d4310afdc77eacb4000000');
    playlist.title = 'My Playlist';
    playlist.tracks = [
      {song: "56d43681fdc77eb085000002", artist: "56d4354cfdc77eb085000000"},
      {song: "56d4369bfdc77eb085000003", artist: "56d4354cfdc77eb085000000"},
      {song: "56d436aafdc77eb085000004", artist: "56d4354cfdc77eb085000000"},
      {song: "56d436b7fdc77eb085000005", artist: "56d4354cfdc77eb085000000"},
      {song: "56d436bcfdc77eb085000006", artist: "56d4354cfdc77eb085000000"},
      {song: "56d436c5fdc77eb085000007", artist: "56d4354cfdc77eb085000000"},
      {song: "56d436cdfdc77eb085000008", artist: "56d4354cfdc77eb085000000"},
      {song: "56d436d6fdc77eb085000009", artist: "56d4354cfdc77eb085000000"},
      {song: "56d436e6fdc77eb08500000a", artist: "56d4354cfdc77eb085000000"},
    ]
    playlist.updatePlayingOrder();
  });
  it('should be have an id', function(){
    assert.equal(playlist.id, '56d4310afdc77eacb4000000');
  });
  it('should be have a title', function(){
    assert.equal(playlist.title, 'My Playlist');
  });
  it("should have a list of song id's", function(){
    assert.equal(playlist.tracks.length, 9);
  });
  it("should know what song is current playing", function(){
    assert.equal(playlist.now_playing, playlist.tracks[0]);
  });
  it("should know what song is next", function(){
    assert.equal(playlist.next_song, playlist.tracks[1]);
  });
  it("should know what song is previous", function(){
    assert.equal(playlist.prev_song, playlist.tracks[0]);
  });
  it("should loop round to first song if playlist repeat is on", function(){
    playlist.repeat = 2;
    playlist.playingIndex = playlist.tracks.length - 1;
    playlist.updatePlayingOrder();
    assert.equal(playlist.next_song, playlist.tracks[0]);
  });
});
