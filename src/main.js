// global
var cpong = window.cPong;
var painter = window.canvasPainter;
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
ctx.font = "24px Arial";
ctx.fillStyle = "#0095DD";

var gameover = false;
var restart = false;
var endscore = 10;

// game objects
var paddleLeft = new cpong.Paddle("left", 10, 100, 87, 83, true);
var paddleRight = new cpong.Paddle("right", canvas.width-20, 100, 38, 40, false)
var ball = new cpong.Ball("ball1", 800, 0.1);

var scoreDisplay = {
	scores: { left: 0, right: 0 },
	draw: function() {
		ctx.fillText(this.scores.left, canvas.width/4, 25);
		ctx.fillText(this.scores.right, canvas.width*3/4, 25);

		if (gameover || restart) {
			painter.pause();
			restart = false;
			if (gameover) ctx.fillText("GAME OVER", canvas.width/2-100, canvas.height/2-25);
		}
	},

	update: function(delta) {
		this.scores = cpong.getScore();
		if (this.scores.left == endscore || this.scores.right == endscore) gameover = true;
		else gameover = false;
	}
};

// start/stop/restart
function keyUpHandler(e) {
	// space bar = pause/unpause
	if (e.keyCode == 32) {
		if (gameover) {
			cpong.setScores(0, 0);
			cpong.reset();
		}
		painter.toggleRunning();
		cpong.startUpdates();
	}

	// 'n' = new game
	if (e.keyCode == 78) {
		cpong.setScores(0, 0);
		cpong.reset();
		restart = true;
	}
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
