var fs = require('fs');
var path = require('path');

/**
 *
 * OBJECTIVE : gather a list of names from different files in a path, display one list
 * of all the names in reverse sorted alpha order.
 *
 */

var filesDir = 'data/files';
var names = [];

fs.readdir(filesDir, function (err, fileArray) {
  var numFiles = fileArray.length;
  console.log('files to read ' + fileArray);

  fileArray.forEach(function (file) {
    console.log('processing ' + file);

    // what events can we listen for on data?
    fs.readFile(path.join(filesDir, file), function (err, data) {

      var fileLines = data.toString().split('\n');

      fileLines.forEach(function (line) {
        names.push(line);
      });

      // this feels *less* wrong
      numFiles--;
      if (numFiles === 0) {
        console.log("\nDONE!");
        names.sort().reverse().forEach(function (n) {
          console.log(n);
        });
      }
    });
  });
});
