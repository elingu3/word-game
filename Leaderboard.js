//File dependent on Save.js, ensure Save.js is loaded in the page before this file.

//Triggers when the JS file (and HTML file) are loaded
//Genereates the leaderboard information
const list = document.getElementById("list");
let highScores = getLeaderBoard();
highScores.forEach(function (idx) {
    listObject = document.createElement("li");
    listObject.innerHTML = idx.Name +" : " + idx.Score;
    list.appendChild(listObject);
})

