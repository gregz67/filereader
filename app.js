var fs = require('fs'),
  path = require('path'),
  Promise = require('es6-promise').Promise;

/**
 *
 * OBJECTIVE : gather a list of names from different files in a path, display one list
 * of all the names in reverse sorted alpha order.
 *
 */

var names = [], filesDir = 'data/files',
  getFiles = function(dir) {
    return new Promise(function(resolve, reject) {
      fs.readdir(dir, function(err, fileArray) {
        if (!err) {
          resolve(fileArray);
        } else {
          reject(err);
        }
      })
    })
  },
  getFile = function(file) {
    var opts = {
      'flag': 'r',
      'encoding': 'utf8'
    };
    console.log('processing ' + file);
    return new Promise(function(resolve, reject) {
      fs.readFile(path.join(filesDir, file), opts, function(err, data) {
        var result;
        if (!err) {
          result = data.split('\n').filter(function(v) {
            return v !== '';
          });
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
  };

getFiles(filesDir).then(function(files) {
  console.log('files to read ' + files);
  return Promise.all(files.map(getFile));
}).then(function(lineArray) {
  lineArray.forEach(function(lines) {
    names = names.concat(lines);
  });
  console.log('\nDONE!');
  names.sort().reverse().forEach(function(n) {
    console.log(n);
  });
}).catch(function(err) {
  console.error(err);
});
