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

//Creates a new array to store all found words.
let wordsFound = [];
wordList.forEach(function(){
wordsFound.push(new Array());
})

//Player's puzzle score
let score = 0;



//Returns back to home page
function homePage() {
	window.location.href = "Home.html";
}

//When player clicks submit button, function activates
function submitWord(){

	const text = document.getElementById("Textbox").value;
    const result = document.getElementById("Results");
	
    if (text === ""){
        result.innerHTML = "Type a word!";
        return;
    }
	const wordReal = findWord(text,wordList);
	const wordFound = findWord(text,wordsFound);
	
	
	//If word was invalid
	if(!wordReal) { result.innerHTML = "Invalid Word";}
	//If word was already guessed
	else if(wordFound) { result.innerHTML = "Word Already Used"; }
	//If word meets all criteria to award points	
	else{
		result.innerHTML = "Word Successfully Found!";
		score += text.length;
		document.getElementById("ScoreBoard").innerHTML = 'Points: '+score;
		wordsFound[text.length-3].push(text.toLowerCase());
		
	}
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
