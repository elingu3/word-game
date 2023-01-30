/*Each page might require it's own JS file, especially for 
the puzzles so that extra unused functions don't take up memory.
*/

//Loads prototype game
//Original function was replaced by this function which can be reused.
function goToPage(page){
	window.location.href = page;
}

