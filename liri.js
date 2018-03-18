//Grab data from keys.js
var keys = require('./keys.js');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

//Twitter
var client = new Twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token_key: keys.access_token_key,
    access_token_secret: keys.access_token_secret
});

//Spotify
var spotifyClient = new Spotify ({
    id: keys.id,
    secret: keys.secret
});





var fs = require('fs');


var nodeArgv = process.argv;
var command = process.argv[2];

var x = "";
//attaches multiple word arguments
for (var i=3; i<nodeArgv.length; i++){
    if(i>3 && i<nodeArgv.length){
        x = x + "+" + nodeArgv[i];
    } else{
        x = x + nodeArgv[i];
    }
}


switch(command){
    case "my-tweets":
        tweets();
        break;

    case "spotify-this-song":
        if(x){
            getSong(x);
        } else{
            getSong();
        }
        break;

    case "movie-this":
        if(x){
            grabMovie(x)
        } else{
            grabMovie("Mr. Nobody")
        }
        break;

    case "do-what-it-says":
        doThing();
        break;

    default:
        console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
        break;
}

function tweets(){
    var screenName = {screen_name: 'JackMcCoy85'};
    client.get('statuses/user_timeline', screenName, function(error, tweets, response){
        if(!error){
            for(var i = 0; i<tweets.length; i++){
                var date = tweets[i].created_at;
                console.log("Daniel Hernandez tweeted: " + tweets[i].text);
            }
        }else{
            console.log('ERROR ERROR ' + JSON.stringify(error) );
        }
    });
}

function getSong() {
    spotifyClient.search({ type: 'track', query: 'As Loke Falls' }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            // console.log(JSON.stringify(data));
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song Name: " + data.tracks.items[0].name);
            console.log("Spotify Preview Link: " + data.tracks.items[0].external_urls.spotify);
            console.log("Album: " + data.tracks.items[0].album.name);
        }
        // console.log(JSON.stringify(data));
    });

}

function grabMovie() {
    request("http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy" + "&plot=short&tomatoes=true", function(error, response, body) {
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("The movie's Title is: " + JSON.parse(body).Title);
            console.log("The movie's Release Year is: " + JSON.parse(body).Year);
            console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
            console.log("The movie's rating is: " + JSON.parse(body).tomatoRating);
            console.log("The movie's Country originating in is: " + JSON.parse(body).Country);
            console.log("The movie's Language is: " + JSON.parse(body).Language);
            console.log("The movie's Plot is: " + JSON.parse(body).Plot);
            console.log("The movie contains the Actors: " + JSON.parse(body).Actors);


        }
    });

}







