/*Each page might require it's own JS file, especially for 
the puzzles so that extra unused functions don't take up memory.
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
