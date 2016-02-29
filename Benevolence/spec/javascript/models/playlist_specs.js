var assert = require('assert');
var Playlist = require('../../../app/assets/javascripts/models/playlist.js');

describe('Playlist', function(){
  it('should be able to get a playlist from the API', function(done){
    var playlist = new Playlist()
    playlist.get('56d4310afdc77eacb4000000') 
    assert.equal(playlist.title, 'My Playlist')
  });
});
