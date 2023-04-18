//Basically the same as getLeaderBoard() from the Save.js
//Returns the level access list stored in local storage,
//if it doesn't exist, creates a new one
function getLevelAccess(){
    let access = JSON.parse(localStorage.getItem("levelAccess"));
    if (access === null){
        //Boolean list, index 0 - Medium access, index 1 - Hard access
        //This is because Easy should always be accessable.
        access = [false,false];
        localStorage.setItem("levelAccess",JSON.stringify(access));
    }
    return access;
}

function leaderBoardLoad(diff){
    sessionStorage.setItem("difficulty",diff);
    goToPage('LeaderBoard.html');
}

//Runs as the page loads:
//If player wishes to access the leaderboard, adjust the buttons to redirect them
if (sessionStorage.getItem("leaderBoard") == "true"){
    document.getElementById("easy").setAttribute("onClick","leaderBoardLoad(0)");
    document.getElementById("medium").setAttribute("onClick","leaderBoardLoad(1)");
    document.getElementById("hard").setAttribute("onClick","leaderBoardLoad(2)");
}
//If the player is trying to play the game, lock certain levels until they meet a scoring thresh hold.
else if (sessionStorage.getItem("multiplayer") == 0){
    let levelAccess = getLevelAccess();
    document.getElementById("medium").disabled = !levelAccess[0];
    document.getElementById("hard").disabled = !levelAccess[1];
}


