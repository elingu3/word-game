
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

//Saves new scores to post on leaderboard.
//Takes in String name, int score
function save(name, score){
    const storage = localStorage;

    let leaderBoard = getLeaderBoard();
    leaderBoard.push({"Name": name,"Score": score});
    greatToLeast(leaderBoard);
    leaderBoard.pop();
    storage.setItem("leaderBoard",JSON.stringify(leaderBoard));

}

//Returns the leaderboard list saved in local storage
//If it doesn't exist, a default list is created and stored.
function getLeaderBoard(){
    const storage = localStorage;
    console.log("Attempting to retrieve leaderboard");
    let highScores = JSON.parse(storage.getItem("leaderBoard"));
    if (highScores === null){
        console.log("Creating default leaderboard");
        highScores = [
            {"Name": "---",
            "Score": 0}   ,
            {"Name": "---",
            "Score": 0}   ,
            {"Name": "---",
            "Score": 0}   ,
            {"Name": "---",
            "Score": 0}   ,
            {"Name": "---",
            "Score": 0} ]
        storage.setItem("leaderBoard",JSON.stringify(highScores));
    }
    return highScores;
}