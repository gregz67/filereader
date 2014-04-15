var fs = require('fs');
var Q = require('q');

var _ = require('underscore');


/**
 *
 * OBJECTIVE : gather a list of names from different files in a path, display one list
 * of all the names in reverse sorted alpha order.
 *
 */


var path = '/tmp/node';
var names = [];

fs.readdir(path, function (err, fileArray) {
  var numFiles = fileArray.length;
  console.log('files to read ' + fileArray);

  _.each(fileArray, function (file) {
    console.log('processing ' + file);

    // what events can we listen for on data?
    fs.readFile(path + '/' + file, { 'flag': 'r' }, function (err, data) {

      var fileLines = data.toString().split('\n');
      var cleanLines = _.filter(fileLines, function (l) {
        return l !== '';
      });

      _.each(cleanLines, function (line) {
        names.push(line);
      });

      // this feels *less* wrong
      numFiles--;
      if (numFiles === 0) {
        console.log("\nDONE!");
        _.each(names.sort().reverse(), function (n) {
          console.log(n);
        });
      }

    });


  });


});
