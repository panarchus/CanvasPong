(function(canvasPainter, undefined) {
	var canvas = document.getElementById("game");
	var ctx = canvas.getContext("2d");
	var toDraw = [], running, lastFrame;
	
	// API main draw loop
	canvasPainter.draw = function() {
		var delta = requestAnimFrame();
		
		if (running) {
			update(delta);
			
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for (var i = 0; i < toDraw.length; ++i) {
				// if the object has draw(), then run it
				toDraw[i].draw && toDraw[i].draw();
			}
		}
		
		// helper method to run get delta value since last frame
		// and run the requestAnimationFrame() call
		function requestAnimFrame() {
			requestAnimationFrame(canvasPainter.draw);
			var delta = 0;
			var now = Date.now();
			if (lastFrame) {
				delta = now - lastFrame;
			}
			lastFrame = now;
			return delta;
		}
		
		// private method: updates all given objects to draw
		// @param delta: time since last frame in ms
		function update(delta) {
			for (var i = 0; i < toDraw.length; ++i) {
				// if the object has update(), then run it
				toDraw[i].update && toDraw[i].update(delta);
			}
		}
	};
	
	// API: add an object to be drawn (object should have 
	// draw() and update(delta) methods)
	canvasPainter.addObjectToDraw = function(obj) {
		toDraw.push(obj);
	};
	
	// API: start/pause
	canvasPainter.toggleRunning = function() {
		running = !running;
	};

	// API: specifically pause
	canvasPainter.pause = function() {
		running = false;
	}

}) (window.canvasPainter = window.canvasPainter || {});
