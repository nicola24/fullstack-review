const request = require('request');
const config = require('../config.js');

let getReposByUsername = (str, callback) => {
  let options = {
    url: `https://api.github.com/users/${str}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  request(options, callback);
}

module.exports.getReposByUsername = getReposByUsername;
