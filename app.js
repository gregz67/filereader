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
  getFile = function(file) {
    var opts = {
      'flag': 'r',
      'encoding': 'utf8'
    };
    console.log('processing ' + file);
    return Q.nfcall(fs.readFile, path.join(filesDir, file), opts);
  };

getFiles(filesDir).then(function(fileArray) {
  console.log('files to read ' + fileArray);
  return Q.all(fileArray.map(getFile));
}).then(function(contentsArray) {
  contentsArray.forEach(function(contents) {
    names = names.concat(contents.split('\n').filter(function(v) {
      return v !== '';
    }));
  });
  console.log('DONE!');
  names.sort().reverse().forEach(function(n) {
    console.log(n);
  });
}).catch(function(err) {
  console.log(err);
});
