// MAIN
var drawer = window.canvasDraw;
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

var up = false;
var down = false;

var paddle = {
	// controls TODO
	//up: false,
	//down: false,
	// speed (up/down movement) pixels/second
	vel: 500,
	// position
	pos: { x: 10, y: 100 },
	// size
	width: 10,
	height: 100,

	// update position
	update: function(delta) {
		// create dy value
		var dy = this.vel * delta / 1000;
		if ((up && down) || (!up && !down)) dy = 0;
		else if (up) dy = -dy;

		// check for wall collisions
		if (this.pos.y + dy < 0) dy = -this.pos.y;
		if (this.pos.y + dy + this.height > canvas.height) dy = canvas.height - (this.pos.y + this.height);

		// update position
		this.pos.y += dy;
	},

	// draw on canvas
	draw: function() {
		ctx.beginPath();
		ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
		ctx.fillStyle = "#0095dd";
		ctx.fill();
		ctx.closePath();
	}
}

var ball = {
	// speed is in pixels/second
	vel: 800,
	// normalized vector
	dir: { x:0.8, y:0.6 },
	// position
	pos: { x:100, y:100 },
	// radius
	radius: 10,
	
	// update position
	update: function(delta) {
		// create dx and dy scalar values
		var dx = Math.abs(this.dir.x * this.vel * delta / 1000);
		var dy = Math.abs(this.dir.y * this.vel * delta / 1000);

		// check for wall collisions
		if (this.pos.y + dy * this.dir.y < this.radius || this.pos.y + dy * this.dir.y > canvas.height-this.radius) this.dir.y = -this.dir.y;
		if (this.pos.x + dx * this.dir.x < this.radius || this.pos.x + dx * this.dir.x > canvas.width-this.radius) this.dir.x = -this.dir.x;

		// update positions
		this.pos.y += dy * this.dir.y;
		this.pos.x += dx * this.dir.x;
	},
	
	// draw on canvas
	draw: function() {
		ctx.beginPath();
		ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI*2);
		ctx.fillStyle = "#fff";
		ctx.fill();
		ctx.closePath();
	}
};

// Start/stop
function keyUpHandler(e) {
	if (e.keyCode == 32) drawer.toggleRunning();
	if (e.keyCode == 38) up = false;
	if (e.keyCode == 40) down = false;
}
function keyDownHandler(e) {
	if (e.keyCode == 38) up = true;
	else if (e.keyCode == 40) down = true;
}
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", keyDownHandler, false);

/// MAIN

// add to drawer
drawer.addObjectToDraw(ball);
drawer.addObjectToDraw(paddle);

// start drawing
//drawer.toggleRunning();
drawer.draw();
