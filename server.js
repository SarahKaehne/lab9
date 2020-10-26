//https://hub.packtpub.com/building-movie-api-express/
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const actors = require('./routers/actor');
const movies = require('./routers/movie');
const app = express();
app.listen(8080);
app.use(bodyParser.json());

let path = require('path');
app.use("/", express.static(path.join(__dirname, "dist/movieAng")));

app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost:27017/lab7', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});
//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);

//2.Delete an actor and all its movies
app.delete('/actors/:id/del', actors.delActorMovies);
//3.Remove a movie from the list of movies of an actor
app.delete('/actors/:aid/:mid', actors.delMovieActor);


//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);

//1.Delete a movie by its ID
app.delete('/movies/:id', movies.deleteOne);
//4.Remove an actor from the list of actors in a movie
app.delete('/movies/:mid/:aid/ids', movies.delActorMovie);
//5.Add an existing actor to the list of actors in a movie
app.post('/movies/:aid/:mid', movies.addActor);
//6.Retrieve (GET) all the movies produced between year1 and year2, where year1>year2
app.get('/movies/:year1/:year2', movies.movieYear);
//9.Delete all the movies that are produced between two years.
app.delete('/delmovies/:year1/:year2', movies.deleteBetween);
//lab9 del older
app.delete('/movies/:year/delOlder', movies.deleteOlderThan);
//5.Add an existing movie to the list of movies in a actor
app.post('/actors/:mid/:aid', movies.addMovieActor);