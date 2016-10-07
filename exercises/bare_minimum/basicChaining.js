/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var promiseConstructor = require('./promiseConstructor');
var promisification = require('./promisification');

var writeFileProm = Promise.promisify(fs.writeFile);



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  //return new Promise(function(resolve, reject) {
  return promiseConstructor.pluckFirstLineFromFileAsync(readFilePath)
  .then(function(username) {
    return promisification.getGitHubProfileAsync(username);
  })
  .then(function(profile) {
    return writeFileProm(writeFilePath, JSON.stringify(profile));
  })
  .catch(function(error) {
    console.log('there is an error! ', error);
  })
  .finally(function() {
    console.log('at least this should run');
  });
  //});
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
