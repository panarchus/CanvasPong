(function (cPong, undefined) {
	var canvas = document.getElementById("game");
	var ctx = canvas.getContext("2d");
	var pressedKeys = [];
	var paddles = [];
	var balls = [];
	var scores = { left: 0, right: 0 };

	// API
	cPong.getScore = function() {
		return scores;
	}

	/// Button press handling
	function keyDownHandler(e) {
		pressedKeys[e.keyCode] = true;
	};
	function keyUpHandler (e) {
		pressedKeys[e.keyCode] = false;
	};
	document.addEventListener("keydown", keyDownHandler);
	document.addEventListener("keyup", keyUpHandler);

	// lookup for pressed keys
	function isPressed(key) {
		// if key is not in dict we don't want to return non-false
		return pressedKeys[key] ? true : false;
	};

	// ball object
	cPong.Ball = function(name, startVel, velGrowFactor) {
		this.name = name;
		// speed is in pixels/second
		this.vel = startVel;
		this.velGrow = this.vel * velGrowFactor;
		// normalized vector
		var yd = (Math.random()+0.5)/2.0, xd = Math.random()+0.5;
		var vmag = Math.sqrt(yd*yd + xd*xd);
		this.dir = { x: xd/vmag * (Math.random() < .5 ? -1. : 1.), y: yd/vmag * (Math.random() < .5 ? -1. : 1.) };
		// position
		this.pos = { x: canvas.width/2, y: canvas.height/2 };
		// radius
		this.radius = 10;
		
		// update position
		this.update = function(delta) {
			// create dx and dy scalar values
			var dx = Math.abs(this.dir.x * this.vel * delta / 1000);
			var dy = Math.abs(this.dir.y * this.vel * delta / 1000);

			// check for paddle collisions
			var paddlehit = false;
			for (paddlename in paddles) {
				if (!paddles.hasOwnProperty(paddlename)) continue;
				var paddle = paddles[paddlename];

				// super dumb collision detection, to be revisited later
				// these can probably be combined, for starters
				if (paddle.leftside && this.dir.x < 0) {
					if (this.pos.x + dx * this.dir.x - this.radius < paddle.pos.x + paddle.width) {
						if (this.pos.y + dy * this.dir.y <= paddle.pos.y + paddle.height + this.radius &&
							this.pos.y + dy * this.dir.y >= paddle.pos.y - this.radius) {
							// hit paddle
							paddlehit = true;
							this.dir.x = -this.dir.x;
							this.vel += this.velGrow;
						}
					}
				} else if (!paddle.leftside && this.dir.x > 0) {
					if (this.pos.x + dx * this.dir.x + this.radius > paddle.pos.x) {
						if (this.pos.y + dy * this.dir.y <= paddle.pos.y + paddle.height + this.radius &&
							this.pos.y + dy * this.dir.y >= paddle.pos.y - this.radius) {
							// hit paddle
							paddlehit = true;
							this.dir.x = -this.dir.x;
							this.vel += this.velGrow;
						}
					}
				}
			}

			// check for wall collisions
			if (this.pos.y + dy * this.dir.y < this.radius || this.pos.y + dy * this.dir.y > canvas.height-this.radius) this.dir.y = -this.dir.y;
			if (!paddlehit && (this.pos.x + dx * this.dir.x < this.radius || this.pos.x + dx * this.dir.x > canvas.width-this.radius)) {
				if (this.dir.x > 0) ++scores.left;
				else ++scores.right;
				this.dir.x = -this.dir.x;
			}

			// update positions
			this.pos.y += dy * this.dir.y;
			this.pos.x += dx * this.dir.x;
		}
		
		// draw on canvas
		this.draw = function() {
			ctx.beginPath();
			ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI*2);
			ctx.fillStyle = "#fff";
			ctx.fill();
			ctx.closePath();
		};

		// add to balls
		balls[name] = this;
	};

	// paddle object
	cPong.Paddle = function(name, xStart, yStart, upKeyCode, downKeyCode, leftside) {
		// is this paddle on the left side?
		this.leftside = leftside;
		// name of this paddle
		this.name = name;
		// controls
		this.upKey = upKeyCode;
		this.downKey = downKeyCode;
		// speed (up/down movement) pixels/second
		this.vel = 500;
		// position
		this.pos = { x: xStart, y: yStart };
		// size
		this.width = 10;
		this.height = 100;

		// update position
		this.update = function(delta) {
			//get up/down values
			var up = isPressed(this.upKey);
			var down = isPressed(this.downKey);

			// create dy value
			var dy = this.vel * delta / 1000;
			if ((up && down) || (!up && !down)) dy = 0;
			else if (up) dy = -dy;

			// check for wall collisions
			if (this.pos.y + dy < 0) dy = -this.pos.y;
			if (this.pos.y + dy + this.height > canvas.height) dy = canvas.height - (this.pos.y + this.height);

			// update position
			this.pos.y += dy;
		};

		// draw on canvas
		this.draw = function() {
			ctx.beginPath();
			ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
			ctx.fillStyle = "#0095dd";
			ctx.fill();
			ctx.closePath();
		};

		// add to paddles
		paddles[name] = this;
	};
}) (window.cPong = window.cPong || {})
