const express = require('express');
const bodyParser = require('body-parser');
const github = require('../helpers/github.js');
const save = require('../database/index.js');
let app = express();
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // user submit/POST a 'username' on client
  // data is found in the stringify object req.body.term
  // req.body.term is then passed in the function from helpers/github.js
  // which make a get to the github api
  // then the callback retreive and return an array of object of the username repos
  // then we loop thru data to get the info needed
  // data need now to be save in the database
  github.getReposByUsername(req.body.term, (error, response, body) => {
    let arr = JSON.parse(body);
    arr.forEach(data => {
      save(data.owner.login, data.owner.id, data.url, data.forks);
      // console.log(data.owner.login);
      // console.log(data.owner.id);
      // console.log(data.url);
      // console.log(data.forks);
    });
  });
  res.status(201);
  res.send();
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});
