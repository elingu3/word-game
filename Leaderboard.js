//File dependent on Save.js, ensure Save.js is loaded in the page before this file.

//Triggers when the JS file (and HTML file) are loaded
//Genereates the leaderboard information

//This will catagorize the highscores, Easy, Medium, and Hard
let difficulty = JSON.parse(sessionStorage.getItem("difficulty"));
let title = ["Easy","Medium","Hard"]
document.getElementById("title").innerHTML = title[difficulty] + " Highscores";
//This will display the actual scores
const list = document.getElementById("list");
let highScores = getLeaderBoard(difficulty);
highScores.forEach(function (idx) {
    listObject = document.createElement("li");
    listObject.innerHTML = idx.Name +" : " + idx.Score;
    list.appendChild(listObject);
})

