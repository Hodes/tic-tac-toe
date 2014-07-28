var TicTacToe = (function($) {
	var TicTacToe = {};

	var symbols = ['X', 'O'];
	var game;
	var choice;

	TicTacToe.start = function () {
		game = new Game();
	};

	function doPlay(element) {
		$(element).text(symbols[game.currentPlayer]);
		var movement = element.id;
		game.move(movement);
		miniMax(game);
		$('#' + choice).text(symbols[game.currentPlayer]);
		game.move(choice);

		if (game.over) {
			$('.result').text(game.winner === 0 ? 'Venceu!' : 'Perdeu!');
		}
	}

	function score(currentGame) {
		if (currentGame.winner === currentGame.currentPlayer) {
			return 10;
		} else if (currentGame.winner === 'none') {
			return 0;
		} else {
			return -10;
		}
	}

	function miniMax(currentGame) {
		if (currentGame.over) {
			return score(currentGame);
		}

		var scores = [];
		var movess = [];

		for (var m = 0; m < currentGame.getAvailableMoves().length; m++) {
			var currentMove = currentGame.getAvailableMoves()[m];
			var possibleGame = new Game();
			possibleGame.moves = _.cloneDeep(currentGame.moves);
			possibleGame.currentPlayer = _.cloneDeep(currentGame.currentPlayer);
			possibleGame.over = _.cloneDeep(currentGame.over);
			possibleGame.winner = _.cloneDeep(currentGame.winner);
			possibleGame.setElements(_.cloneDeep(currentGame.getElements()));
			possibleGame.move(currentMove);
			scores.push(miniMax(possibleGame));
			movess.push(currentMove);
		}

		if (currentGame.currentPlayer === 0) {
			var maxScore = Array.max(scores);
			var maxScoreIndex = scores.indexOf(maxScore);
			choice = movess[maxScoreIndex];
			return scores[maxScoreIndex];
		} else {
			var minScore = Array.min(scores);
			var minScoreIndex = scores.indexOf(minScore);
			choice = movess[minScoreIndex];
			return scores[minScoreIndex];
		}
	}

	// Bind events
	$('.square').on('click', function(event) {
		if (!game.over) {
			doPlay(this);
		}
	});

	return TicTacToe;
}(jQuery));
