/**
 * Created by jeffersonvivanco on 10/22/16.
 */
var mongoose = require('mongoose');

//my schema goes here
/*
A schema represents a MongoDB collection.
 */
var Movie = new mongoose.Schema({
    title: String,
    director: String,
    year : Number
});

/*
Then we use our schema to define our model. The model is used as a constructor
to create new documents... or as an object with methods that allows the read or
update of existing documents.

The code below tells mongooses that our model exists. It registers our model so that
we can retrieve it later.
 */
mongoose.model('Movie', Movie);

mongoose.connect('mongodb://localhost/hw05');
