/*
Prototype Puzzle -
Different organization/program may be changed
to be more efficient or easier to use.

*/




const wordList = prototype; //Retrieves object from Words.json

/*----------------------------------------------------------------------------------------------
From here down all this code can be reused, just depends on how we load all the possible words.
----------------------------------------------------------------------------------------------*/
//File dependent on Save.js, ensure Save.js is loaded in the page before this file.

//Creates a new array to store all found words.
let wordsFound = [];
wordList.forEach(function(){
wordsFound.push(new Array());
})


//Player's puzzle score
let score = 0;
let timerOn = false; //Prevents timer from being triggered more than once
let gameOver = false; //If the game is still going
let newHighScore = false; //If the player got a new high score

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



//Returns back to home page
function homePage() {
	window.location.href = "index.html";
}

//When player clicks submit button, function activates
function submitWord(){
	const text = document.getElementById("Textbox").value;
    const result = document.getElementById("Results");
	if (newHighScore){
		save(text,score);
		result.innerHTML = "Congradulations \"" + text + "\", on your new high score of "+score + "!";
	}


	//If game is over, do nothing
	if (gameOver){
		return;
	}
	//If no text entered, "Type a word!"
    if (text === ""){
        result.innerHTML = "Type a word!";
        return;
    }
	const wordReal = findWord(text,wordList);
	const wordFound = findWord(text,wordsFound);
	//Timer function
	clock(60);
	//If word was invalid
	if(!wordReal) { result.innerHTML = text.toUpperCase() +" is an invalid word.";}
	//If word was already guessed
	else if(wordFound) { result.innerHTML = text.toUpperCase() +" has already been used"; }
	//If word meets all criteria to award points	
	else{
		result.innerHTML = "The word " + text.toUpperCase() + " has been successfully found!";
		score += text.length;
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
	if (wordLength<3){
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
		clock.innerHTML = "Times up!";
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

	//Saving information
	let highScores = getLeaderBoard();
	if (highScores[highScores.length-1]["Score"] < score){
    	const result = document.getElementById("Results");
		result.innerHTML = "New High Score!\nEnter a username you would like to save in the textbox above.";
		newHighScore = true;
	}

}
