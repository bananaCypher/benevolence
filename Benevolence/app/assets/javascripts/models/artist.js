ArtistHelper = {
  get: function(id, callback){
    var URL = 'http://localhost:3000/api/artists/' + id
    var request = new XMLHttpRequest();
    request.open('GET', URL);
    request.onload = function(){
      if (request.status === 200) {
        obj = JSON.parse(request.responseText); 
        callback(obj)
      } else {
      }
    }
    request.send(null);
  }
}
