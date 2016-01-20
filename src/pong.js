// game constants
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

// controls
var run = false;
var up = false;
var down = false;

// single-player score = # of hits (exponential growth in speed)
var score = 0;
var gameover = false;

function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: " + score, 100, 20);
}

// event listeners for key presses
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if (e.keyCode == 38) up = true;
	else if (e.keyCode == 40) down = true;
}

function keyUpHandler(e) {
	if (e.keyCode == 32) run = !run;
	
	if (e.keyCode == 38) up = false;
	else if (e.keyCode == 40) down = false;
}

// ball details
var ball = {
	x: canvas.width/2,
	y: canvas.height-30,
	radius: 20,
	dx: 4,
	dy: -4
};

// paddle details (x,y will correspond to top-left corner, like the canvas x,y)
var paddle = {
	h: 100,
	w: 10,
	x: 20,
	y: 20,
	dy: 8
};

// reinitialize starting values
function init() {
	ball.x = canvas.width/2;
	ball.y = canvas.height-30
	ball.radius = 20;
	ball.dx = 4;
	ball.dy = -4;
	
	paddle.h = 100;
	paddle.w = 10;
	paddle.x = 20;
	paddle.y = 20;
	
	gameover = false;
}

// paints the ball on the canvas
function drawBall() {
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
	ctx.fillStyle = "#0095D";
	ctx.fill();
	ctx.closePath();
}

// updates the balls current coordinates
function updateBall() {
	// check for wall collision
	if (ball.y + ball.dy < ball.radius || ball.y + ball.dy > canvas.height-ball.radius) ball.dy = -ball.dy;
	// collision with right wall allowed
	if (ball.x + ball.dx > canvas.width-ball.radius) ball.dx = -ball.dx;
	// collision with left wall results in GAME OVER
	if (ball.x + ball.dx < ball.radius) {
		gameover = true;
		return;
	} else if (ball.x + ball.dx < paddle.x + paddle.w + ball.radius) {
		// check for collision with paddle
		if (ball.y >= paddle.y && ball.y <= paddle.y + paddle.h) {
			// hit paddle, speed up by 1.5x
			ball.dx = (-ball.dx * 5) / 4;
			++score;
		}
	}
	
	// change coordinates
	ball.x += ball.dx;
	ball.y += ball.dy;
}

function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function updatePaddle() {
	if (up && paddle.y > 0) paddle.y -= paddle.dy;
	if (down && paddle.y + paddle.h < canvas.height) paddle.y += paddle.dy;
}

/*
 * MAIN
 */
var reset = true;
function draw() {
	if (run) {
		if (reset) {
			init();
			reset = false;
		}
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		updatePaddle();
		updateBall();
		drawPaddle();
		drawBall();
		drawScore();
	}
	
	if (gameover) {
		ctx.font = "32px Arial";
		ctx.fillStyle = "#0095DD";
		ctx.fillText("GAME OVER", 150, 150);
		reset = true;
		run = false;
	}
	requestAnimationFrame(draw);
}
draw();
// run  draw() every 10 ms
//setInterval(draw, 10);

