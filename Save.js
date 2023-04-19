
//Inseration Sort (Based off of Java Inseration Sort)
//Requires current list
//Returns new sorted list
function greatToLeast(list){
    for (let i=1; i<list.length; i++){
        let curObj = list[i];
        let curIdx = i-1;
        while (curIdx > -1 && curObj.Score > list[curIdx].Score){
            list[curIdx+1] = list[curIdx];
            curIdx--;
        }
        list[curIdx+1] = curObj;
    }
    return list;
}

//Saves new scores to post on leaderboard.
//Takes in String name, int score
function save(name, score){
    const storage = localStorage;
    let diff = sessionStorage.getItem("difficulty"); //Used to identify different difficulties
    let leaderBoard = getLeaderBoard(diff);
    leaderBoard.push({"Name": name,"Score": score});
    greatToLeast(leaderBoard);
    leaderBoard.pop();
    storage.setItem("leaderBoard"+diff,JSON.stringify(leaderBoard));

}

//Returns the leaderboard list saved in local storage
//If it doesn't exist, a default list is created and stored.
function getLeaderBoard(identifier){
    const storage = localStorage;
    let highScores = JSON.parse(storage.getItem("leaderBoard"+identifier));
    if (highScores === null){
        //Creates default leaderboard
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
        storage.setItem("leaderBoard"+identifier,JSON.stringify(highScores));
    }
    return highScores;
}

