const gameBoard = (() => {
    // DOCUMENT CACHING
    const documentMain = document.querySelector('main');
    const documentBoard = documentMain.querySelector('.gameBoard');
    const currentTurnBtn = documentMain.querySelector('.currentTurn');
    const winningScreen = documentMain.querySelector('.winningScreen');

    for (let i = 0; i < documentBoard.childElementCount; i++) {
        documentBoard.children[i].addEventListener('click',
            e => {
                if (e.currentTarget.classList[2] !== 'x' && e.currentTarget.classList[2] !== '') {
                    populateBoard(e.currentTarget);
                };
            });
    };

    // PLAYER STUFF
    const Player = function (name, symbol, AI) {
        return { name, symbol, AI, score: 0 };
    };

    let playerOne = Player('Mike', 'x', false);
    let playerTwo = Player('Jonas', 'o', false);

    let xTurn = true;

    // GAME DATA
    const board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];

    let winCondition = false;

    // DISPLAY STUFF
    const renderBoard = function () {
        if (xTurn) {
            documentBoard.classList.replace('o', 'x');
        } else {
            documentBoard.classList.replace('x', 'o');
        }

        for (let i = 0; i < board.length; i++) {
            if (board[i] === 'x' || board[i] === 'o') {
                documentBoard.children[i].classList.add(board[i]);
            } else {
                documentBoard.children[i].classList.remove('o', 'x');
            }
        };
    };

    const renderCurrentTurnBtn = function () {
        if (xTurn) {
            currentTurnBtn.innerHTML = 'X plays';
        } else {
            currentTurnBtn.innerHTML = 'O plays';
        };
    };

    const populateBoard = function (cell) {
        if (xTurn) {
            board[parseInt(cell.classList[1])] = 'x';
        } else {
            board[parseInt(cell.classList[1])] = 'o';
        };

        xTurn = !xTurn;
        renderBoard();
        renderCurrentTurnBtn();
        if (detectWin() === true) {
            handleWin();
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

    const handleWin = function () {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }

        renderBoard();
        // make impossible to click
        // display thing
        winningScreen.classList.add('show');
    }
})();
