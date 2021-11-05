const lineReader = require("line-reader");
var Promise = require("bluebird");

function getMinSpread(file) {
  let arr;
  let date, max, min;
  let minSpread = Infinity;
  let minDate = 1;
  var eachLine = Promise.promisify(lineReader.eachLine);
  eachLine(file, (line) => {
    arr = line.split(/\ +/);
    date = parseInt(arr[1]);
    max = parseInt(arr[2]);
    min = parseInt(arr[3]);
    if (date && max - min < minSpread) {
      minSpread = max - min;
      minDate = date;
    }
  })
    .then(() => console.log(minDate))
    .catch((err) => console.error(err));
}

getMinSpread("w_data.dat");
