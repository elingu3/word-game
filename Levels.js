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

//Runs as the page loads:

if (sessionStorage.getItem("multiplayer") == 0){
    let levelAccess = getLevelAccess();
    document.getElementById("medium").disabled = !levelAccess[0];
    document.getElementById("hard").disabled = !levelAccess[1];
}

