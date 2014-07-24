var TicTacToe = (function($) {
	var TicTacToe = {};

	var elements = {
		square: $('.square')
	};
	var symbols = ['X', 'O'];
	var currentPlayer;

	TicTacToe.start = function () {
		currentPlayer = 0;
	};

	function doPlay(element) {
		$(element).text(symbols[currentPlayer]);
		switchPlayer();
	}

	function switchPlayer() {
		currentPlayer = currentPlayer === 0 ? 1 : 0;
	}

	// Bind events
	elements.square.on('click', function(event) {
		doPlay(this);
	});

	return TicTacToe;
}(jQuery));
