window.onload = function(){

const list = document.getElementById("list");

//Temp scores, will remove later, used for testing/place holder purposes
let HighScores = [
    {"Name": "PlayerName1",
    "Score": 500}   ,

    {"Name": "PlayerName2",
    "Score": 250}   ,

    {"Name": "PlayerName3",
    "Score": 300}   ,

    {"Name": "PlayerName4",
    "Score": 600}   ,

    {"Name": "PlayerName5",
    "Score": 100} ]

HighScores = greatToLeast(HighScores);

HighScores.forEach(function (idx) {

    console.log(idx);
    console.log(idx.Name);
    listObject = document.createElement("li");
    listObject.innerHTML = idx.Name +" : " + idx.Score;
    list.appendChild(listObject);
})
}
/*
Current Plan on leaderboard save data structure
localStorage = 
{ "HighScores" : [
    {"Name": "PlayerName1",
    "Score": 500}   ,
    {"Name": "PlayerName2",
    "Score": 400}   ,
    {"Name": "PlayerName3",
    "Score": 300}   ,
    {"Name": "PlayerName4",
    "Score": 200}   ,
    {"Name": "PlayerName5",
    "Score": 100} ]
}
*/

//Inseration Sort (Based off of Java Inseration Sort)
//Requires current list
//Returns new sorted list
function greatToLeast(list){
    for (let i=1; i<list.length; i++){
        let curObj = list[i];
        console.log(curObj);
        let curIdx = i-1;
        while (curIdx > -1 && curObj.Score > list[curIdx].Score){
            console.log(list[curIdx].Score + " less than " + curObj.Score)
            list[curIdx+1] = list[curIdx];
            curIdx--;
        }
        console.log("Place " + curObj + " at "+ (curIdx+1));
        list[curIdx+1] = curObj;
    }
    return list;
}