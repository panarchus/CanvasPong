// MAIN
var drawer = window.canvasDraw;
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

var ball = {
	// speed is in pixels/second
	vel: 700,
	// normalized vector
	dir: { x:0.8, y:0.6 },
	// position
	pos: { x:100, y:100 },
	// radius
	radius: 20,
	
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
}
document.addEventListener("keyup", keyUpHandler, false);

/// MAIN

// add to drawer
drawer.addObjectToDraw(ball);

// start drawing
//drawer.toggleRunning();
drawer.draw();
