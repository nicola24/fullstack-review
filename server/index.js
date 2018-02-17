const express = require('express');
const bodyParser = require('body-parser');
const github = require('../helpers/github.js');
const db = require('../database/index.js');
let app = express();
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
    //console.log(response);
    let arr = JSON.parse(body);

    if (Array.isArray(arr)) {
      db.save(arr, (resp) => {
        res.status(201);
      });
    }
  });
  res.send();
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(` *** Server listening on port ${port} ***`);
});
