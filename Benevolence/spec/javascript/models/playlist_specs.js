var assert = require('assert');
var Playlist = require('../../../app/assets/javascripts/models/playlist.js');

describe('Playlist', function(){
  beforeEach(function() {
    //Can't do an AJAX request in mocha so manually setting up Playlist
    playlist = new Playlist('56d4310afdc77eacb4000000');
    playlist.title = 'My Playlist';
    playlist.tracks = [
      "56d43681fdc77eb085000002", 
      "56d4369bfdc77eb085000003",
      "56d436aafdc77eb085000004",
      "56d436b7fdc77eb085000005",
      "56d436bcfdc77eb085000006",
      "56d436c5fdc77eb085000007",
      "56d436cdfdc77eb085000008",
      "56d436d6fdc77eb085000009",
      "56d436e6fdc77eb08500000a" 
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
    assert.equal(playlist.prev_song, playlist.tracks[8]);
  });
});
