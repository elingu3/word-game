/*
Prototype Puzzle -
Different organization/program may be changed
to be more efficient or easier to use.
File dependent on Save.js, ensure Save.js is loaded in the page before this file.
*/


//Default global variables
let wordList;
let wordsFound;
let score;
let timerOn;
let gameOver;
let newHighScore;
let duplicateList;

startGame()//Main function

document.getElementById("Textbox").focus(); //Immediately hovers cursor over text
document.addEventListener("keydown",function(event){ //Allows keybinds commands to be utilized
	if (event.code === 'Escape'){
		homePage();
	}
	else if (event.code === 'Enter'){
		document.getElementById("Textbox").focus();
		submitWord();
	}
},true)

//Initiates game, can be used to restart game as well.
function startGame(){
	let difficultyNum = sessionStorage.getItem("difficulty");//Retrieves difficulty
	const levelText = document.getElementById("difficulty");//Gets difficulty text
	let difficulty = difficultyEasy; //Load easy puzzle by default
	if (difficultyNum == 1){ //Load medium puzzle
		difficulty = difficultyMedium;
		levelText.innerHTML = "Medium" + "<div><span id=\"Clock\">0:30</span></div>";
	}
	else if (difficultyNum == 2){ //Load difficult puzzle
		difficulty = difficultyHard;
		levelText.innerHTML = "Hard" + "<div><span id=\"Clock\">0:30</span></div>";
	}
	
	//This prevents repetative puzzles in back-to-back play throughs
	let puzzleIndex;
	do{
	puzzleIndex = Math.floor(Math.random()*difficulty.length);
	}
	while (puzzleIndex === duplicateList)
	duplicateList = puzzleIndex;
	
	const puzzle = difficulty[puzzleIndex]; //Retrieves object from Words.json
	wordList = puzzle.WordList;
	document.getElementById("letters").innerHTML = ("Letters: "+scrambleWord(puzzle.Name));

	//Creating a list for words found
	wordsFound = [];
	wordList.forEach(function(){
	wordsFound.push(new Array());})
	//Setting Default variables
	score = 0; //Player's puzzle score
	timerOn = false; //Prevents timer from being triggered more than once
	gameOver = false; //If the game is still going
	newHighScore = false; //If the player got a new high score

	//Set HTML text to defaults
	document.getElementById("Results").innerHTML = "";
	document.getElementById("ScoreBoard").innerHTML = "Points: 0";
	document.getElementById("Clock").innerHTML = "0:30";
	if (sessionStorage.getItem("multiplayer") != "0"){
		document.getElementById("multiStatus").innerHTML = "Player " + sessionStorage.getItem("multiplayer");
	}
}


//Returns back to home page
function homePage() {
	window.location.href = "index.html";
}

//When player clicks submit button, function activates
function submitWord(){
	//Gets objects from HTML page
	const text = document.getElementById("Textbox").value;
    const result = document.getElementById("Results");

	//If submitting highscore name
	if (newHighScore){
		save(text,score);
		result.innerHTML = "Congratulations " + text + " on your new high score of "+ score + "!";
		newHighScore = false;
	}
	//If game is over, do nothing
	if (gameOver) { return; }
	//If no text entered, "Type a word!"
    if (text === ""){
        result.innerHTML = "Type a word!";
        return;
    }

	//Timer function
	clock(30);
	//If word was invalid
	if(!findWord(text,wordList)) { result.innerHTML = text.toUpperCase() +" is an invalid word.";}
	//If word was already guessed
	else if(findWord(text,wordsFound)) { result.innerHTML = text.toUpperCase() +" has already been used"; }
	//If word meets all criteria to award points	
	else{
		result.innerHTML = "The word " + text.toUpperCase() + " has been successfully found!";
		score += text.length * (3-sessionStorage.getItem("difficulty")); //Points awarded by word length TIMES difficulty multiplier
		document.getElementById("ScoreBoard").innerHTML = 'Points: '+score;
		wordsFound[text.length-3].push(text.toLowerCase());
		
	}
	document.getElementById("Textbox").value = "";
}

//Checks if the word is valid to distribute points.
//Returns true if userWord is valid, otherwise false.
//Argument "userWord" is player's string input.
//Argument "array" must be a 2d array.
function findWord(userWord, array){
	const wordLength = userWord.length;
	//Only words with 3 or more characters are valid
	if (wordLength<3 || wordLength>array.length+2){
		return false;
	}
	//Search through array for specified word
	for(let i=0; i<array[wordLength-3].length; i++){
		if (userWord.toLowerCase() === (array[wordLength-3][i])){
			return true;
		}
	}
	return false;
}

//Creates a countdown timer
//Parameter "time" is counted in seconds for the countdown.
function clock(time) {
	if (timerOn){ return; }
	timerOn=true;
	let start = new Date().getTime();
	const end = start + (time * 1000);
	
	let countDown = setInterval(function(){
	const now = end - start; //Time in miliseconds
	const clock = document.getElementById("Clock");
	let minutes = Math.floor(now/60000);
	let seconds = Math.floor(now/1000%60);
	start += 1000;
	let format = Math.floor(minutes%10) + ":" + Math.floor(seconds/10) + Math.floor(seconds%10); 
	clock.innerHTML = format;
	if (now<0){
		clearInterval(countDown);
		clock.innerHTML = "Time's up!";
		timerOn = false;
		endGame();
	}
	
	},1000);	
}

//Function ends the game.
function endGame(){
	document.getElementById("button").setAttribute("disabled",true);
	document.getElementById("ScoreBoard").innerHTML = "Final Score: "+score;
	gameOver = true;

	//Unlocks next puzzle, currently will be upon completion
	//Unlocks puzzle indefinately
	const difficulty = JSON.parse(sessionStorage.getItem("difficulty"));
	if (difficulty <= 1){
		let access = JSON.parse(localStorage.getItem("levelAccess"));
		access[difficulty] = true;
		localStorage.setItem("levelAccess",JSON.stringify(access));
	}

	//If user's score is high enough to store AND if they are in singleplayer mode
	let highScores = getLeaderBoard();
	if (highScores[highScores.length-1]["Score"] < score && sessionStorage.getItem("multiplayer") == 0){
    	const result = document.getElementById("Results");
		//Allows next text entry to be saved as leaderboard username
		result.innerHTML = "New High Score!\nEnter a username you would like to save in the textbox above.";
		newHighScore = true;
	}
	//Make the replay button visable/clickable
	let restartButton = document.getElementById("restartButton");
	restartButton.style.display = "block";
	//Changes what the replay button says based on the situation the player(s) are in.
	if (sessionStorage.getItem("multiplayer") == 1) { restartButton.innerHTML = "Continue"; }
	else { restartButton.innerHTML = "Play Again"; }
	multiplayerEnd();
}

//Takes in a String
//Returns a randomly scrambled word with the same letters
function scrambleWord(word){
	for(let i=0; i<word.length; i++){
		replace = Math.floor(Math.random()*(word.length-1))+1;
		//if replace == i, function breaks
		if (replace === i){
			continue;
		}
		let max = Math.max(i,replace);
		let min = Math.min(i,replace);
		word = word.substring(0,min) +
				word.charAt(max) +
				word.substring(min+1,max) +
				word.charAt(min) +
				word.substring(max+1,word.length);
	}
	return word;
}

//MultiplayerEnd is a specific function in the event of ending a game in multiplayer mode.
function multiplayerEnd(){
	//if player 1 turn ended, start player 2 turn
	if (gameOver && sessionStorage.getItem("multiplayer") == 1){
		sessionStorage.setItem("player1Score",score); //Stores player 1's score while player 2 plays.
		sessionStorage.setItem("multiplayer",2); //This will allow the following if statement to run after another game.
		document.getElementById("Results").innerHTML = "Player 1 scored "+ score +" points!"
												+"\nClick continue for Player 2's turn!";
	}
	//if player 2 turn ended, compare player 1 and player 2 score.
	//Announces winner
	else if(gameOver && sessionStorage.getItem("multiplayer") == 2){
		const p1Score = sessionStorage.getItem("player1Score");
		let winStatus = "won"; //Default response
		if  (p1Score === score){ winStatus = "tied"; } //If player1 and player 2 earn the same score
		else if (p1Score < score){ winStatus = "lost"; }//If player1 has a lower score than player 2
		document.getElementById("Results").innerHTML = "Player 1 with a score of "+ 
														p1Score + ", " + winStatus+ 
														" against Player 2 with a score of " + 
														score +"!";
		//If player decides to play again.
		sessionStorage.setItem("multiplayer",1);
	}
}

//Restarts the game
function restartGame(){
	startGame();
	document.getElementById("restartButton").style.display = "none";
}
