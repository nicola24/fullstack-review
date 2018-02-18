const express = require('express');
//require bodyparser
const bodyParser = require('body-parser');
const github = require('../helpers/github.js');
const db = require('../database/index.js');
let app = express();

// bodyparser expect an obj, now we get the property body of
// request = req.body
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // user submit/POST a 'username' on client
  // data is found in the stringify object req.body.term
  // req.body.term is then passed in the function from helpers/github.js
  // which make a get to the github api
  // then the callback retreive and return body which is string object
  // then we JSON.parse into, it's now an array of object of the username
  // we send this array to the database using save, which is going to process it
  console.log(' *** Server received data -> Get to api ***', req.body);

  github.getReposByUsername(req.body.term, (error, response, body) => {
    let arr = JSON.parse(body);
    if (Array.isArray(arr)) {
      db.save(arr, (resp) => {
      });
    }
  });
  res.sendStatus(201);
});

app.get('/repos', function (req, res) {
  // retreive data from db calling find from the db
  // pass the Repos collection, get the data thru the callback
  // filter it to get the top 25
  // send data to client (client retreive it thru ajax get)
  db.find(db.repos, (data) => {
    var tempArr = data.sort((a, b) => a.forks < b.forks);
    res.status(200);
    res.send(tempArr);
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(` *** Server listening on port ${port} ***`);
});
