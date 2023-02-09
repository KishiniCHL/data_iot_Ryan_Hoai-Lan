const socket = io('http://localhost:3000');

socket.on('connect', () => {
    console.log('Connected to server');
});


let button = document.querySelector('#allo')

button.addEventListener("click", () =>{
    socket.emit("message", {msg:"salut"});

})



let character = document.getElementById("character");
let block = document.getElementById("block");
let counter=0;

function jump(){
    if(character.classList == "animate"){return}
    character.classList.add("animate");
    setTimeout(function(){
        character.classList.remove("animate");
    },300);
}
let checkDead = setInterval(function() {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    if(blockLeft<20 && blockLeft>-20 && characterTop>=130){
        block.style.animation = "none";
        alert("Game Over. score: "+Math.floor(counter/100));
        counter=0;
        block.style.animation = "block 1s infinite linear";
    }else{
        counter++;
        document.getElementById("scoreSpan").innerHTML = Math.floor(counter/100);
        socket.emit("message", Math.floor(counter/100));
    }
}, 10);