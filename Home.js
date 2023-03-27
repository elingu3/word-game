/*
This file is to store simple
helper functions that assist in
the set up of the game, however
are not actually used in the game.
*/

//Loads prototype game
//Original function was replaced by this function which can be reused.
//Arguments:
//-- page: String of an HTML file name
function goToPage(page){
	window.location.href = page;
}

//Stores "difficulty" level into session storage
//for Prototype.js to read and generate corresponding puzzles
//Arguments:
//-- difficulty: An integer between [0,2]
function loadPuzzle(difficulty){
	//Keep these in mind when creating puzzles
	//Easy=0   -- 4-5  Letters
	//Medium=1 -- 6-7  Letters
	//Hard=2   -- 8-10 Letters
	sessionStorage.setItem("difficulty",difficulty);
	goToPage("Prototype.html");
}

//Stores "multi" as a integer into session storage
//for Prototype.js to use and function accordingly
function multiplayer(multi){
	sessionStorage.setItem("multiplayer",multi);
	goToPage("Levels.html");
}