var fs = require('fs');
var path = require('path');
var Q = require('Q');

/**
 *
 * OBJECTIVE : gather a list of names from different files in a path, display one list
 * of all the names in reverse sorted alpha order.
 *
 */

var filesDir = 'data/files', names = [],
  getFiles = function(dir) {
    return Q.nfcall(fs.readdir, dir);
  },
  getLines = function(file) {
    var opts = {
      'flag': 'r',
      'encoding': 'utf8'
    };
    console.log('processing ' + file);
    return Q.nfcall(fs.readFile, path.join(filesDir, file), opts).then(
      // fulfilled
      function(contents) {
        return contents.split('\n').filter(function(v) {
          return v !== '';
        });
      },
      // rejected
      function(err) {
        console.log(err);
      }
    );
  };

getFiles(filesDir).then(function(fileArray) {
  console.log('files to read ' + fileArray);
  return Q.all(fileArray.map(getLines));
}).then(function(linesArray) {
  linesArray.forEach(function(lines) {
    names = names.concat(lines);
  });
  console.log('DONE!');
  names.sort().reverse().forEach(function(n) {
    console.log(n);
  });
}).catch(function(err) {
  console.log(err);
});
