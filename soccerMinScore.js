const lineReader = require("line-reader");
var Promise = require("bluebird");

function getMinScore(file) {
  let arr;
  let team, getGoal, loseGoal;
  let minScore = Infinity;
  let minTeam = "";
  var eachLine = Promise.promisify(lineReader.eachLine);
  eachLine(file, (line) => {
    arr = line.split(/\ +/);
    let idx = arr.indexOf('-');

    team = arr[2];
    getGoal = parseInt(arr[idx - 1]);
    loseGoal = parseInt(arr[idx + 1]);

    let diff = Math.abs(getGoal - loseGoal);
    if (team && diff < minScore) {
      minScore = diff;
      minTeam = team;
    }
  })
    .then(() => console.log(minTeam))
    .catch((err) => console.error(err));
}

getMinScore("soccer.dat");