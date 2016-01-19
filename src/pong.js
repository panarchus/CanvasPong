var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.rect(20,20,20,20);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(40,40,20,0,Math.PI*2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

