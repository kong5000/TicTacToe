

const Player = (name) => {
    const getName = () => name;
    return{getName}
}
const player1 = Player("Player1");

const gameBoard = (() => {
    const winMessage = document.querySelector('#winMessage');
    let isPlayer1Turn = true;
    let gameOver = false;
    let turnCount = 0;

    let gameArray = [];

    const getValueAtIndex = (index) => {
        return gameArray[index];
    }
    const markLocation= (index, name) => {
        if(gameArray[index] == null && !gameOver){
            turnCount++;
            if(isPlayer1Turn){
                gameArray[index] = "X";
            }else{
                gameArray[index] = "O";
            }
            checkWinner();
            if(isPlayer1Turn){
                isPlayer1Turn = false;
            }else{
                isPlayer1Turn = true;
            }
        }
      
    }
    const checkRowWin = (marker) =>{
        console.table(gameArray);
        for(i = 0; i < 3; i++){
            if(gameArray[i * 3] == marker && gameArray[i * 3 + 1] == marker && gameArray[i * 3 + 2] == marker){
                winMessage.textContent = "Winner is " + marker;
               
                gameOver = true;
            }
        }
    }
    const checkColWin = (marker) =>{
        console.table(gameArray);
        for(i = 0; i < 3; i++){
            if(gameArray[i] == marker && gameArray[i + 3] == marker && gameArray[i + 6] == marker){
                winMessage.textContent = "Winner is " + marker;
                gameOver = true;
            }
        }
    }
    const checkDiagWin = (marker) =>{
        if(gameArray[0] == marker && gameArray[4] == marker && gameArray[8] == marker){
            winMessage.textContent = "Winner is " + marker;
            gameOver = true;
        }else if(gameArray[2] == marker && gameArray[4] == marker && gameArray[6] == marker){
            winMessage.textContent = "Winner is " + marker;
            gameOver = true;
        }
    }

    const checkWinner = () =>{
        if(isPlayer1Turn){
            checkColWin("X");
            checkDiagWin("X");
            checkRowWin("X")
        }else{
            checkColWin("O");
            checkDiagWin("O");
            checkRowWin("O");
        }
        if(turnCount > 8 && !gameOver){
            winMessage.textContent = "TIE GAME";
            gameOver = true;
        }
    }

    const reset = () =>{
        gameArray = [];
        gameOver = false;
        turnCount = 0;
        displayController.updateDisplay();
    }
    return{markLocation, getValueAtIndex, reset};
})();



const displayController = (() =>{
    
    const displayGrid = document.querySelectorAll('.grid-item');
    const displayArray = Array.from(displayGrid);
    const updateDisplay = () =>{
        for(i = 0; i < 9; i++){
            for(j = 0; j < displayArray.length; j++){
                if(displayArray[j].getAttribute('data-location') == i){
                    displayArray[j].textContent =gameBoard.getValueAtIndex(i);
                }
            }
        }
    }
    const initializeClickLiseteners = () =>{
        for(i = 0; i< displayGrid.length; i++){
            displayGrid[i].addEventListener('click', function(e){

                gameBoard.markLocation(e.target.getAttribute("data-location"), player1.getName());
                updateDisplay();
            })
        }
    }
    return{initializeClickLiseteners, updateDisplay};

})();

const newGameButton = document.querySelector('#newGame');
newGameButton.addEventListener('click', function(e){
    gameBoard.reset();
})



displayController.initializeClickLiseteners();







