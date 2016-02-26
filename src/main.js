// global
var cpong = window.cPong;
var painter = window.canvasPainter;
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

// game objects
var paddleLeft = new cpong.Paddle("left", 10, 100, 87, 83, true);
var paddleRight = new cpong.Paddle("right", canvas.width-20, 100, 38, 40, false)
var ball = new cpong.Ball("ball1", 800, 0.1);

var scoreDisplay = {
	scores: { left: 0, right: 0 },
	draw: function() {
		ctx.fillText(this.scores.left, canvas.width/4, 25);
		ctx.fillText(this.scores.right, canvas.width*3/4, 25);
	},

	update: function(delta) {
		this.scores = cpong.getScore();
	}
};

// start/stop
function keyUpHandler(e) {
	if (e.keyCode == 32) painter.toggleRunning();
}
document.addEventListener("keyup", keyUpHandler, false);

/// MAIN

// add to painter
// painter does updates in order that objects are added, and
// it is important that paddles are updated before the ball
painter.addObjectToDraw(scoreDisplay);
painter.addObjectToDraw(paddleLeft);
painter.addObjectToDraw(paddleRight);
painter.addObjectToDraw(ball);

// start drawing
painter.draw();
