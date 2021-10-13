const gameBoard = (() => {
    const _board = ['', '', '', '', '', '', '', '', ''];

    const getField = (i) => {
        return _board[i];
    }
    
    const setField = (i, player) => {
        _board[i] = player.getSymbol();
        console.log(_board);
    }

    const resetBoard = () => {
        _board = ["", "", "", "", "", "", "", "", ""];
    } 


    return {getField, setField, resetBoard};
})();

const displayController = (() => {
    const _fields = document.querySelectorAll(".nodes");
    const _message = document.querySelector("#message");
    // add event listener for each node
    _fields.forEach(field => {
        field.addEventListener("click", () => {
            // if (gameController.isOver() || field.textContent !== "") return;
            if (field.textContent !== "" || gameController.getIsOver()) return;
            gameController.playRound(field.dataset.i, gameController.getCurrentPlayer());
            updateGameBoard();
        })
    })
    const displayMessage = (message) => {
        _message.textContent = message
    }
    const updateGameBoard = () => {
        for(let i = 0; i < _fields.length; i++){
            _fields[i].textContent = gameBoard.getField(i)
        }
    }

    return {
        displayMessage,
        updateGameBoard      
    };
})();

const Player = (symbol) => {
    const getSymbol = () => symbol;
    return {getSymbol};
};

const gameController = (() => {
    const _player1 = Player("x");
    const _player2 = Player("o");
    let round = 1;
    let isOver = false;

    const playRound = (fieldIndex, player) => {
        gameBoard.setField(fieldIndex, getCurrentPlayer());
        if (hasWon(player)){
            displayController.displayMessage(`Player ${player.getSymbol().toUpperCase()} has won!`);
            isOver = true;
            return;
        }
        if (round === 9){
            displayController.displayMessage("Draw!");
            isOver = true;
            return;
        }
        round++;
        displayController.displayMessage(`Player ${getCurrentPlayer().getSymbol().toUpperCase()}'s turn`)
    }

    const getCurrentPlayer = () => {
        return round % 2 === 1 ? _player1 : _player2;
    }


    const hasWon = (player) => {
        if (rowWin(player) || columnWin(player) || diagonalWin(player)){
            isOver = true;
            displayController.displayMessage(`Player ${player.getSymbol().toUpperCase()} has won the game!`);
            return true;
        } else {
            return false;
        }
    }
    // [0, 1, 2,
    //  3, 4, 5,
    //  6, 7, 8]
    const rowWin = (player) => {
        const symbol = player.getSymbol();

        for (let i = 0; i < 9; i = i + 3){
            let count = 0;
            for (let j = i; j <= i + 2; j++){
                if (gameBoard.getField(j) === symbol){
                    count++;
                }
            }
            if (count === 3){
                return true;
            }
        }
        return false;
    }

    const columnWin = (player) => {
        const symbol = player.getSymbol();

        for (let i = 0; i < 3; i++){
            let count = 0;
            for (let j = i; j <= i + 6; j = j + 3){
                if (gameBoard.getField(j) === symbol){
                    count++;
                }
            }
            if (count === 3){
                return true;
            }
        }
        return false;
    }
    // [0, 1, 2,
    //  3, 4, 5,
    //  6, 7, 8]
    const diagonalWin = (player) => {
        const symbol = player.getSymbol();
        const winCond = [[0, 4, 8], [2, 4, 6]];

        for (let i = 0; i < 2; i++){
            let iswin = true;
            for (let j = 0; j < 3; j++){
                let index = winCond[i][j]
                if (gameBoard.getField(index) !== symbol){
                    iswin = false;
                }
            }
            if (iswin === true){
                return true;
            }
        }
        return false;
    }
    const getIsOver = () => {
        return isOver;
    }

    return {
        hasWon,
        playRound,
        getIsOver,
        getCurrentPlayer
    };
})();