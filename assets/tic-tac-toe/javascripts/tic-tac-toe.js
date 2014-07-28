Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

Array.max = function(array){
    return Math.max.apply(Math, array);
};

Array.min = function(array){
    return Math.min.apply(Math, array);
};

// game = '';
// choice = '';
var TicTacToe = (function($) {
	var TicTacToe = {};

	var symbols = ['X', 'O'];
	// var game;
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
		doPlay(this);
	});

	return TicTacToe;
}(jQuery));

function Game() {
	this.moves = [];
	this.currentPlayer = 0;
	this.over = false;
	this.winner = 'none';

	var moveOptions = ["a1","a2","a3","b1","b2","b3","c1","c2","c3"];
	var symbols = ['X', 'O'];
	var elements = {a1: '', a2: '', a3: '', b1: '', b2: '', b3: '', c1: '', c2: '', c3: ''};
	var self = this;

	this.move = function (movement) {
		self.moves.push(movement);
		elements[movement] = symbols[self.currentPlayer];
		if (win() || gameOver()) {
			self.over = true;
			if (win() === 'X') {
				self.winner = 0;
			} else if (win() === 'Y') {
				self.winner = 1;
			} else {
				self.winner = 'none';
			}
		} else {
			switchPlayer();
		}
	}

	this.getAvailableMoves = function () {
		return moveOptions.diff(self.moves);
	}

	this.getElements = function () {
		return elements;
	}

	// OMFG I just want this piece of shitty code to work
	this.setSelf = function (game) {
		self = game;
	}
	this.getSelf = function (game) {
		return self;
	}
	this.setElements = function (elementsParam) {
		elements = elementsParam;
	}

	function switchPlayer() {
		self.currentPlayer = !self.currentPlayer ? 1 : 0;
	}

	// I'm ashamed of this function :(
	function win() {
		if ((elements.a1 === elements.a2) && (elements.a2 === elements.a3)) {
			return elements.a1;
		} else if ((elements.b1 === elements.b2) && (elements.b2 === elements.b3)) {
			return elements.b1;
		} else if ((elements.c1 === elements.c2) && (elements.c2 === elements.c3)) {
			return elements.c1;
		} else if ((elements.a1 === elements.b2) && (elements.b2 === elements.c3)) {
			return elements.a1;
		} else if ((elements.a3 === elements.b2) && (elements.b2 === elements.c1)) {
			return elements.a3;
		} else if ((elements.a1 === elements.b1) && (elements.b1 === elements.c1)) {
			return elements.a1;
		}  else if ((elements.a2 === elements.b2) && (elements.b2 === elements.c2)) {
			return elements.a2;
		}  else if ((elements.a3 === elements.b3) && (elements.b3 === elements.c3)) {
			return elements.a3;
		}

		return false;
	}

	function gameOver() {
		for (var element in elements) {
			if (elements[element] === '') {
				return false;
			}
		}

		return true;
	}

	return this;
}

// function score(currentGame) {
// 	if (currentGame.winner === currentGame.currentPlayer) {
// 		return 10;
// 	} else if (currentGame.winner === 'none') {
// 		return 0;
// 	} else {
// 		return -10;
// 	}
// }

// function miniMax(currentGame) {
// 	if (currentGame.over) {
// 		return score(currentGame);
// 	}

// 	var scores = [];
// 	var movess = [];

// 	for (var m = 0; m < currentGame.getAvailableMoves().length; m++) {
// 		var currentMove = currentGame.getAvailableMoves()[m];
// 		var possibleGame = new Game();
// 		possibleGame.moves = _.cloneDeep(currentGame.moves);
// 		possibleGame.currentPlayer = _.cloneDeep(currentGame.currentPlayer);
// 		possibleGame.over = _.cloneDeep(currentGame.over);
// 		possibleGame.winner = _.cloneDeep(currentGame.winner);
// 		possibleGame.setElements(_.cloneDeep(currentGame.getElements()));
// 		possibleGame.move(currentMove);
// 		scores.push(miniMax(possibleGame));
// 		movess.push(currentMove);
// 	}

// 	if (currentGame.currentPlayer === 0) {
// 		var maxScore = Array.max(scores);
// 		var maxScoreIndex = scores.indexOf(maxScore);
// 		choice = movess[maxScoreIndex];
// 		return scores[maxScoreIndex];
// 	} else {
// 		var minScore = Array.min(scores);
// 		var minScoreIndex = scores.indexOf(minScore);
// 		choice = movess[minScoreIndex];
// 		return scores[minScoreIndex];
// 	}
// }
