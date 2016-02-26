/*
 * First try at more complex collision detection
 * Ball shoots off screen immediately: may be due to integer instead of floating point math
 * being done in some places
 */

			// check for paddle collisions
			// for now only worrying about changing dx
			for (paddlename in paddles) {
				if (!paddles.hasOwnProperty(paddlename)) continue;

				var paddle = paddles[paddlename];
				console.log(paddle);
				// edge that ball would make contact with given direction
				var edge = paddle.pos.x;
				if (this.dir.x < 0) edge += paddle.width;

				// check if the edge is passed
				if ((this.dir.x > 0 && this.pos.x + dx * this.dir.x + this.radius >= edge) ||
					(this.dir.x < 0 && this.pos.x + dx * this.dir.x - this.radius <= edge)) {
					// do intersection and update logic: put the ball at the spot of contact
					// then swap x direction and divide deltas by % distance used
					// this will allow the wall collisions below to work sucessfully

					// y = mx + b : line for trajectory of ball
					var m = this.dir.y / this.dir.x;
					var b = this.pos.y + (this.dir.x > 0 ? this.radius : - this.radius) - m * this.pos.x;
					var intersect = m * edge + b;

					// check if ball crosses edge where paddle is located
					if (intersect + this.radius >= paddle.pos.y || intersect - this.radius <= paddle.pos.y + paddle.height) {
						var endx = this.pos.x + this.radius + this.dir.x * dx;
						var leftover = (endx - edge) / dx;
						this.pos.x = edge - (this.dir.x > 0 ? this.radius : -this.radius);
						this.pos.y = intersect + (intersect + this.radius >= paddle.pos.y ? -this.radius : this.radius);
						dx *= -leftover;
						dy *= leftover;
					}
				}
			}