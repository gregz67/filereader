var fs = require('fs');
var path = require('path');
var readline = require('readline');

/**
 *
 * OBJECTIVE : gather a list of names from different files in a path, display one list
 * of all the names in reverse sorted alpha order.
 *
 */


var rootPath = 'data/files';
var names = [];

fs.readdir(rootPath, function (err, fileArray) {
  var numFiles = fileArray.length;
  console.log('files to read ' + fileArray);

  fileArray.forEach(function (file) {
    var filePath = path.join(rootPath, file), fsInterface, fileStream;
    // make sure we are opening only files
    if (fs.statSync(filePath).isFile()) {
      console.log('processing ' + filePath);

      fileStream = fs.createReadStream(filePath, { 'encoding': 'utf8' });
      fsInterface = readline.createInterface({
        'input': fileStream,
        'output': process.stdout
      });
      // for each line
      fsInterface.on('line', function (data) {
        names.push(data);
      });
      fileStream.on('end', function () {
        numFiles--;
        // after last file is read, sort
        if (numFiles === 0) {
          console.log("\nDONE!");
          names.sort().reverse().forEach(function (n) {
            console.log(n);
          });
        }
      });
    }
  });


});
