// TEST

(function(test) {
	test.test= function() {
		console.log("hello world");
	};
}(window.test = window.test || {}));

test.test && test.test("boom");

