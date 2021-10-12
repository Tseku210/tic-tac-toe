const gameBoard = (() => {
    const _board = ['', '', '', '', '', '', '', '', ''];

    const getField = (i) => {
        return _board[i];
    }
    
    const setField = (i, player) => {
        _board[i] = player.getSymbol();
        console.log(_board)
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
            gameController.playRound(field.dataset.i)
            updateGameBoard()
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
    round = 1
    let currentPlayer = _player1;

    const playRound = (fieldIndex) => {
        gameBoard.setField(fieldIndex, getCurrentPlayer())
        round++;
        displayController.displayMessage(`Player ${getCurrentPlayer().getSymbol().toUpperCase()}'s turn`)
    }

    const getCurrentPlayer = () => {
        return round % 2 === 1 ? _player1 : _player2;
    }

    const changePlayerTurn = () => {
        if (currentPlayer === _player1){
            currentPlayer = _player2;
        } else if (currentPlayer === _player2){
            currentPlayer = _player1;
        }
    };

    const currentPlayerSymbol = () => {
        currentPlayer.getSymbol();
    }

    const isValid = (field) => {
        if (field.textContent === ""){
            true;
        } else {
            false;
        }
    }

    // const hasWon = () => {
    //     if (rowWin(player) || columnWin(player) || diagonalWin(player)){
    //         return player;
    //     } else if (rowWin()) {

    //     }
    // }


    return {
        changePlayerTurn,
        isValid,
        currentPlayerSymbol,
        currentPlayer,
        playRound
    };
})();