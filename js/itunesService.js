var app = angular.module('itunes');

app.service('itunesService', function($http, $q){

    this.getArtist = function(artist) {

      var waitingForTheHeartbreak = $q.defer();
       $http({
          method: 'JSONP',
          url: 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
        }).then(function(response){
          var dataFromService = response.data.results
          var theRightData = [];
          for (var i = 0; i < dataFromService.length; i++) {
              theRightData[i] = {
                  Play: dataFromService[i].previewUrl,
                  Artist: dataFromService[i].artistName,
                  Collection: dataFromService[i].collectionName,
                  AlbumArt: dataFromService[i].artworkUrl100,
                  Genre: dataFromService[i].primaryGenreName,
                  CollectionPrice: dataFromService[i].collectionPrice,
                }
              }
      waitingForTheHeartbreak.resolve(theRightData);
    })
    return waitingForTheHeartbreak.promise;
  }
    //end
});
//This service is what will do the 'heavy lifting' and get our data from the iTunes API.
//Also note that we're using a 'service' and not a 'factory' so all your methods you want to call in your controller need to be on 'this'.

//Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
//https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
//Note that in the above line, artist is the parameter being passed in.
//You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

  //Code here
