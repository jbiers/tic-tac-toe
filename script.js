const gameBoard = (() => {
    // DOCUMENT CACHING
    const documentMain = document.querySelector('main');
    const documentBoard = documentMain.querySelector('.gameBoard');
    const currentTurnBtn = documentMain.querySelector('.currentTurn');
    const winningScreen = documentMain.querySelector('.winningScreen');
    const playAgainBtn = documentMain.querySelector('.playAgain');
    const newPlayers = documentMain.querySelector('.newPlayers');
    const changePlayersScreen = documentMain.querySelector('.changePlayersScreen');
    const startGameBtn = documentMain.querySelector('.startGame');
    const playerOneInput = documentMain.querySelector('.playerOneName');
    const playerTwoInput = documentMain.querySelector('.playerTwoName');

    let playerOne;
    let playerTwo;

    for (let i = 0; i < documentBoard.childElementCount; i++) {
        documentBoard.children[i].addEventListener('click',
            e => {
                if (e.currentTarget.classList[2] !== 'x' && e.currentTarget.classList[2] !== '') {
                    populateBoard(e.currentTarget);
                };
            });
    };

    playAgainBtn.addEventListener('click', () => {
        resetGame();
    });

    startGameBtn.addEventListener('click', () => {
        startGame();
    });

    newPlayers.addEventListener('click', () => {
        toggleScreen(winningScreen);
        toggleScreen(changePlayersScreen);
    });


    // PLAYER STUFF
    const Player = function (name, symbol, AI) {
        return { name, symbol, AI };
    };

    let playerOneTurn = true;

    // GAME DATA
    const board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];

    let winCondition = false;

    // DISPLAY STUFF
    const renderBoard = function () {
        if (playerOneTurn) {
            documentBoard.classList.replace('o', 'x');
        } else {
            documentBoard.classList.replace('x', 'o');
        };

        for (let i = 0; i < board.length; i++) {
            if (board[i] === 'x' || board[i] === 'o') {
                documentBoard.children[i].classList.add(board[i]);
            } else {
                documentBoard.children[i].classList.remove('o', 'x');
            }
        };
    };

    const renderCurrentTurnBtn = function () {
        if (playerOneTurn) {
            currentTurnBtn.innerHTML = `${playerOne.name}'s turn`;
        } else {
            currentTurnBtn.innerHTML = `${playerTwo.name}'s turn`;
        };
    };

    const populateBoard = function (cell) {
        if (playerOneTurn) {
            board[parseInt(cell.classList[1])] = 'x';
        } else {
            board[parseInt(cell.classList[1])] = 'o';
        };


        if (detectWin() === true) {
            if (playerOneTurn) {
                handleWin(playerOne.name);
            } else {
                handleWin(playerTwo.name);
            }

        } else {
            playerOneTurn = !playerOneTurn;
            renderBoard();
            renderCurrentTurnBtn();
        }
    };

    /**
     *  0, 1, 2
     *  3, 4, 5
     *  6, 7, 8
     * 
     *  0, 3, 6
     *  1, 4, 7
     *  2, 5, 8
     * 
     *  0, 4, 8
     *  2, 4, 6
     */
    const detectWin = function () {
        switch (true) {
            case board[0] !== '' && (board[0] === board[1] && board[0] === board[2]):
                winCondition = true;
                break;
            case board[3] !== '' && (board[3] === board[4] && board[3] === board[5]):
                winCondition = true;
                break;
            case board[6] !== '' && (board[6] === board[7] && board[6] === board[8]):
                winCondition = true;
                break;

            case board[0] !== '' && (board[0] === board[3] && board[0] === board[6]):
                winCondition = true;
                break;
            case board[1] !== '' && (board[1] === board[4] && board[1] === board[7]):
                winCondition = true;
                break;
            case board[2] !== '' && (board[2] === board[5] && board[2] === board[8]):
                winCondition = true;
                break;

            case board[0] !== '' && (board[0] === board[4] && board[0] === board[8]):
                winCondition = true;
                break;
            case board[2] !== '' && (board[2] === board[4] && board[2] === board[6]):
                winCondition = true;
                break;
        };

        return winCondition;
    };

    const clearBoard = function () {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
    }

    const toggleScreen = function (screen) {
        screen.classList.toggle('show');

        documentMain.children[0].classList.toggle('blur');
        documentMain.children[1].classList.toggle('blur');
    }

    const handleWin = function (winner) {
        clearBoard();

        renderBoard();
        winningScreen.children[0].innerHTML = `${winner} wins this round!`
        toggleScreen(winningScreen);
        winCondition = false;
    };

    const resetGame = function () {
        renderCurrentTurnBtn();
        toggleScreen(winningScreen);
        clearBoard();
        renderBoard();
    };

    const startGame = function () {
        if (getInput() === true) {
            renderCurrentTurnBtn();
            toggleScreen(changePlayersScreen);
            clearBoard();
            renderBoard();
        }
    }

    const getInput = function () {
        let playerOneName = playerOneInput.value;
        let playerTwoName = playerTwoInput.value;

        if (playerOneName === '' || playerTwoName === '') {
            // THIS WILL CHANGE
            console.log('provide name');
            return false;
        } else {
            playerOne = Player(playerOneName, 'x', false);
            playerTwo = Player(playerTwoName, 'o', false);

            return true;
        }
    }

    startGame();
})();
