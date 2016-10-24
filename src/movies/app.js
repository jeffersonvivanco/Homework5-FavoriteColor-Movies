/**
 * Created by jeffersonvivanco on 10/22/16.
 */
require('./db');//so the code below can be executed
/*
Set up to be able to retrieve from db
 */
var mongoose  = require('mongoose');
var Movie  = mongoose.model('Movie');//Retrieving the model registered in mongoose
//-----------------------------------------------------------------//
/*
Set up for express
 */
var express = require('express');
var app = express();
//------------------------------------------------------------------//
/*
Set up to get static files
 */
var path = require('path');
app.use('/public',express.static(path.join(__dirname,'/public')));
//------------------------------------------------------------------//
/*
Set up for body-parser to have access to post data
 */
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
//------------------------------------------------------------------//
app.set('view engine', 'hbs');//Set up to use handlebars


app.get('/movies', function (req, res) {
    if(req.query.director != undefined && req.query.director != ''){
        Movie.find({director:req.query.director}, function (err, result, count) {
            res.render('movies', {'movies':result});
        });
    }
    else{
        Movie.find({}, function (err, result, count) {
            res.render('movies',{'movies':result});
        });
    }
});

app.get('/movies/add', function (req, res) {
   res.render('add-movie');
});

app.post('/movies/add', function (req, res) {
    var title = req.body.title;
    var director = req.body.director;
    var year  = req.body.year;

    if(title != '' && director!=''&& year!=undefined){
        new Movie({
            title:title,
            year:year,
            director:director
        }).save(function (err, movie, count) {
           res.redirect('/movies')
        });
    }
    else{
        res.redirect('/movies');
    }
});



app.listen(3000);

