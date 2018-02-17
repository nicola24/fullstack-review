const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {console.log('connection successful')});

let reposSchema = mongoose.Schema({
  ownerId: Number,
  url: String,
  fork: Number
});

let Repos = mongoose.model('Repos', reposSchema);


let save = () => {

  // var object = {  id: 583231,
  //                 url: "https://api.github.com/repos/octocat/git-consortium",
  //                 forks: 24
  //             };
  //
  // var repos = new Repos({ownerId: object.id, url: object.url, fork: object.forks});
  //
  // repos.save();
  // console.log('we saved it');

}

module.exports.save = save;
