const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection on mongo db error'));
db.once('open', () => {console.log('connection on mongo db successful')});

let reposSchema = mongoose.Schema({
  ownerLogin: String,
  ownerId: Number,
  url: String,
  forks: Number
});

let Repos = mongoose.model('Repos', reposSchema);


let save = (w, x, y, z) => {

var repos = new Repos({ ownerLogin: w,
                            ownerId: x,
                                  url: y,
                                  forks: z
                                });
repos.save();

  // var object = {  id: 583231,
  //                 url: "https://api.github.com/repos/octocat/git-consortium",
  //                 forks: 24
  //             };

  // console.log('we saved it');

}

module.exports.save = save;
