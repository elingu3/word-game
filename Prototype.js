/*
Prototype Puzzle -
Different organization/program may be changed
to be more efficient or easier to use.

*/

const words9 = ["prototype"]; //1 word
const words8 = ["topotype"]; //1 word
const words7 = ["pottery"]; //1 word
const words6 = ["poetry","popery","potter",
									"pretty","ptooey","pyrope",
									"tooter","topper","toppo"]; //9 Words
const words5 = ["otter","petto","petty",
									"poopy","potto","potty",
									"preop","repot","rooty",
									"ropey","rotte","tepoy",
									"toper","torot","torte",
									"toter","toyer","troop",
									"trope"]; //19 Words
const words4 = ["otto","oyer","pepo","perp","pert",
									"poet","poop","poor","pope","pore",
									"port","prep","prey","prop","pyre",
									"pyro","repo","repp","root","rope",
									"ropy","rote","roto","ryot","toot",
									"tope","topo","tore","toro","tort",
									"tory","tote","toyo","tret","trey",
									"trop","trot","troy","tyer","type",
									"typo","typp","tyre","tyro","yett",
									"yore"]; //46 Words
const words3 = ["oot","ope","opt","ore","pep","per","pet",
									"poo","pop","pot","pro","pry","pye","rep",
									"ret","roe","roo","rot","rye","tet","toe",
									"too","top","tor","tot","toy","try","tye",
									"yep","yer","yet"]; //31 Words
//Complete 2d array of all words.
const wordList = [words3,words4,words5,words6,words7,words8,words9];

/*----------------------------------------------------------------------------------------------
From here down all this code can be reused, just depends on how we load all the possible words.
----------------------------------------------------------------------------------------------*/


//Creates a new array to store all found words.
let wordsFound = [];
wordList.forEach(function(){
wordsFound.push(new Array());
})


//Player's puzzle score
let score = 0;
let timerOn = false; //Prevents timer from being triggered more than once
let gameOver = false; //If the game is still going

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
	if (gameOver){
		return;
	}
	const text = document.getElementById("Textbox").value;
    const result = document.getElementById("Results");
	
    if (text === ""){
        result.innerHTML = "Type a word!";
        return;
    }
	const wordReal = findWord(text,wordList);
	const wordFound = findWord(text,wordsFound);
	
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
}
