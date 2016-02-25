(function (cPong, undefined) {
	var canvas = document.getElementById("game");
	var ctx = canvas.getContext("2d");
	var pressedKeys = [];

	function keydown(e) {
		this.pressedKeys[e.keyCode] = true;
	};

	this.keyup = function(e) {
		this.pressedKeys[e.keyCode] = false;
	};

	cPong.Paddle = function(vel, xStart, yStart) {
		// controls
		this.up = false;
		this.down = false;
		// speed (up/down movement) pixels/second
		this.vel = vel;
		// position
		this.pos = { x: xStart, y: yStart };
		// size
		this.width = 10;
		this.height = 100;

		// update position
		this.update = function(delta) {
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
		this.draw = function() {
			ctx.beginPath();
			ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
			ctx.fillStyle = "#0095dd";
			ctx.fill();
			ctx.closePath();
		}
	};
}) (window.cPong = window.cPong || {})