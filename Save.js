window.onload = function(){
const scores = leaderboard; //dictionary object
const list = document.getElementById("list");

for(let key in scores){
    console.log(key +" "+scores[key]);
    listObject = document.createElement("li");
    listObject.innerHTML = key +" : " + scores[key];
    list.appendChild(listObject);
}
}