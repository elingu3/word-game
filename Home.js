/*Each page might require it's own JS file, especially for 
the puzzles so that extra unused functions don't take up memory.
*/

//Loads prototype game
//This function could be changed to take the parameter "file" and be reused to load different HTML files.
function gameStart() {
	const obj = document.createElement('p');
	obj.innerHTML = "Loading Game...";
	document.body.appendChild(obj);
	window.location.href = "Prototype.html";
}

