var assert = require('assert');
var Song = require('../../../app/assets/javascripts/models/song.js');

describe('Song', function(){
  beforeEach(function() {
    song = new Song('56d43681fdc77eb085000002');
    song.title = "Don't Wait Up";
    song.artist = "56d4354cfdc77eb085000000";
    song.url = '/tracks/56d43681fdc77eb085000002.mp3';
  });
  it('should have a title', function(){
    assert.equal(song.title, "Don't Wait Up");
  }); 
  it('should have an artist id', function(){
    assert.equal(song.artist, '56d4354cfdc77eb085000000');
  });
  it('can have an album id', function(){
    song.album = '56d435c3fdc77eb085000001';
    assert.equal(song.album, '56d435c3fdc77eb085000001');
  });
  it('should have a track url', function(){
    assert.equal(song.url, '/tracks/56d43681fdc77eb085000002.mp3'); 
  });
});
