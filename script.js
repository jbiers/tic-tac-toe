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
    const playerOneAIInput = documentMain.querySelector('.playerOneAIInput');
    const playerTwoAIInput = documentMain.querySelector('.playerTwoAIInput');
    const playerOneFormValidation = documentMain.querySelector('.formValidation.one');
    const playerTwoFormValidation = documentMain.querySelector('.formValidation.two');

    let playerOne;
    let playerTwo;

    for (let i = 0; i < documentBoard.childElementCount; i++) {
        documentBoard.children[i].addEventListener('click',
            e => {
                if ((playerOneTurn && !playerOne.AI) || (!playerOneTurn && !playerTwo.AI)) {
                    console.log('click');
                    if (e.currentTarget.classList[2] !== 'x' && e.currentTarget.classList[2] !== '') {
                        populateBoard(e.currentTarget);
                    };
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
    let drawCondition = false;

    // DISPLAY STUFF
    const renderBoard = function () {
        if (playerOneTurn) {
            documentBoard.classList.replace(playerTwo.symbol, playerOne.symbol);
        } else {
            documentBoard.classList.replace(playerOne.symbol, playerTwo.symbol);
        };

        for (let i = 0; i < board.length; i++) {
            if (board[i] === 'x' || board[i] === 'o') {
                documentBoard.children[i].classList.add(board[i]);
            } else {
                documentBoard.children[i].classList.remove(playerTwo.symbol, playerOne.symbol);
            }
        };
    };

    const renderCurrentTurnBtn = function () {
        if (playerOneTurn) {
            currentTurnBtn.innerHTML = `${playerOne.name.toUpperCase()}'S TURN`;
        } else {
            currentTurnBtn.innerHTML = `${playerTwo.name.toUpperCase()}'S TURN`;
        };
    };

    const populateBoard = function (cell) {
        if (playerOneTurn) {
            board[parseInt(cell.classList[1])] = playerOne.symbol;
        } else {
            board[parseInt(cell.classList[1])] = playerTwo.symbol;
        };


        if (detectWin() === true) {
            if (playerOneTurn) {
                handleWin(playerOne.name);
            } else {
                handleWin(playerTwo.name);
            }

        }

        else if (detectDraw()) {
            handleDraw();
        }

        else {
            playerOneTurn = !playerOneTurn;
            renderBoard();
            renderCurrentTurnBtn();

            if (playerOneTurn && playerOne.AI) {
                setTimeout(function () {
                    AImove(playerOne.symbol);
                }, 2000);
            }

            else if (!playerOneTurn && playerTwo.AI) {
                setTimeout(function () {
                    AImove(playerTwo.symbol);
                }, 2000);
            };
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

    const detectDraw = function () {
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                drawCondition = false;
                return drawCondition;
            };
        };

        if (!winCondition) {
            drawCondition = true;
            return drawCondition;
        };
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

    const AImove = function (aiSymbol) {

        let randomGuess = Math.floor(Math.random() * (8 - 0 + 1) + 0);

        if (board[randomGuess] !== '') {
            AImove(aiSymbol);
        } else {
            populateBoard(documentBoard.children[randomGuess]);

        }

    };

    const handleWin = function (winner) {
        clearBoard();

        renderBoard();
        winningScreen.children[0].innerHTML = `${winner.toUpperCase()} WINS THIS ROUND!`
        toggleScreen(winningScreen);
        winCondition = false;
    };

    const handleDraw = function () {
        clearBoard();
        renderBoard();
        winningScreen.children[0].innerHTML = `GAME ENDED IN A DRAW!`;
        toggleScreen(winningScreen);

        drawCondition = false;
    };

    const resetGame = function () {
        renderCurrentTurnBtn();

        if (playerOneTurn && playerOne.AI) {
            setTimeout(function () {
                AImove(playerOne.symbol);
            }, 2000);
        }

        else if (!playerOneTurn && playerTwo.AI) {
            setTimeout(function () {
                AImove(playerTwo.symbol);
            }, 2000);
        };

        toggleScreen(winningScreen);
        clearBoard();
        renderBoard();
    };

    const startGame = function () {
        if (getInput() === true) {
            renderCurrentTurnBtn();

            if (playerOneTurn && playerOne.AI) {
                setTimeout(function () {
                    AImove(playerOne.symbol);
                }, 2000);
            }

            else if (!playerOneTurn && playerTwo.AI) {
                setTimeout(function () {
                    AImove(playerTwo.symbol);
                }, 2000);
            };

            toggleScreen(changePlayersScreen);
            clearBoard();
            renderBoard();
        }
    }

    const getInput = function () {
        let playerOneName = playerOneInput.value;
        let playerTwoName = playerTwoInput.value;

        if (playerOneName === '' || playerTwoName === '') {

            if (playerOneName === '') {
                playerOneFormValidation.classList.add('show');
            } else {
                playerOneFormValidation.classList.remove('show');
            }

            if (playerTwoName === '') {
                playerTwoFormValidation.classList.add('show');
            } else {
                playerTwoFormValidation.classList.remove('show');
            }


            return false;
        } else {
            playerOne = Player(playerOneName, 'x', playerOneAIInput.checked);
            playerTwo = Player(playerTwoName, 'o', playerTwoAIInput.checked);

            playerOneFormValidation.classList.remove('show');
            playerTwoFormValidation.classList.remove('show');

            return true;
        }
    }

    startGame();
})();
