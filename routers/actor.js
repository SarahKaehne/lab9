const mongoose = require('mongoose');
const moment = require('moment');
const Actor = require('../models/actor');
const Movie = require('../models/movie');
module.exports = {
    getAll: function (req, res) {
        if (req.query.min_age == undefined){
            Actor.find({}).populate('movies').exec(function (err, actors) {
                if (err) return res.status(404).json(err);
                res.json(actors);
            })
        } else {
            if (isNaN(req.query.min_age) || isNaN(req.query.max_age)){
                res.status(404);
            }

            let miny = moment().subtract(req.query.min_age, 'years').format('YYYY');
            let maxy = moment().subtract(req.query.max_age, 'years').format('YYYY');

            Actor.find({bYear: {$lte: miny, $gte: maxy}}).populate('movies').exec(function (err, actors){
                if(err) return res.status(400).json(err);
                res.json(actors);
            })
        }
    },
    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            res.json(actor);
        });
    },
    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },
    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        });
    },
    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    },

    delActorMovies: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
        });
        Movie.deleteMany({ actors: req.params.id }, function (err, doc) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    delMovieActor:function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.aid }, { $unset: { movies: req.params.mid } }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json();
        });
    },
    
};