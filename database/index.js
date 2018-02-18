const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;
db.on('error', console.error.bind(console, '*** Connection on MongoDB error ***'));
db.once('open', () => console.log('*** Connection on MongoDB successful ***'));

// we've got a schema with 4 property which are string and number.
let reposSchema = mongoose.Schema({
  ownerLogin: String,
  ownerId: Number,
  url: String,
  forks: Number
});

// the next step is compiling our schema into a Model. A model is a class with
// which we construct documents. In this case, each instance will be a Repos
// with properties and behaviors as declared in our schema.
let Repos = mongoose.model('Repos', reposSchema);


let save = (data, callback) => {
  data.forEach(repo => {
    // Let's create a newRepo instance representing the reposSchema we just created
    var newRepo = new Repos({
        ownerLogin: repo.owner.login,
        ownerId: repo.owner.id,
        url: repo.html_url,
        forks: repo.forks
    });

    newRepo.save((err) => {
      if (err) {
        console.error(err);
      };
      console.log('*** Data saved to db ***');
    });

  });
};

// using find we can access all of the data through our Repos model.
let find = (data, callback) => {
  //pass the Repos collection/database
  Repos.find((err, data) => {
      if (err) {
        return console.error(err);
      }
      callback(data);
      console.log('*** Data found in db ***');
  });

};

module.exports.save = save;
module.exports.find = find;
module.exports.repos = Repos;
