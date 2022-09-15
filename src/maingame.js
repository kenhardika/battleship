import gameboard from "./gameboard.js"
import ships from "./ships.js";
import placeRandomizer from "./placeRandomizer.js";
import findCommonElements from "./findCommonElements.js";
import placeGap from "./placeGap.js";
import createGrid from "./layoutGrid.js";
import layoutGridPlacedColor from "./layoutGridPlacedColor.js";
import clearChild from "./clearChild.js";
import popUpGameEnd from "./popUpGameEnd.js";

createGrid('AI');
createGrid('player');
const playerGameboard = gameboard();
const AIGameboard = gameboard();
const game = startGame();
const gameEnd = popUpGameEnd();

function startGame(){
    function randomPlacement(board, val){ // you can use this randomPlacement with AI or Player
        let newShipCoord = placeRandomizer(val);
        let newShipWithGap = placeGap(newShipCoord);

        function reRandomizeWithGap(){
            newShipCoord = placeRandomizer(val);
            newShipWithGap = placeGap(newShipCoord);
        }

        function checkAndAddElements(newest, current, val){
            if (findCommonElements(newest, current) === false){ // if there IS NOT common elements inside of both array (not clashed), proceed to add to gameboard
                board.placement(ships(newShipCoord));
                board.addGapLocation(placeGap(newShipCoord));
                return
            }
            else { // if there IS common element inside both array, randomize the ship placement again, then repeat this function
                reRandomizeWithGap();
                checkAndAddElements(newShipCoord, board.allGapLocation, val); // repeat this function again
                return
            }
        }
        // starts here
        checkAndAddElements(newShipWithGap, board.allGapLocation, val);
    }

    function randomAttack(board, user){
        let newAttackCoord = placeRandomizer(1); // only one grid per attack allowed
        
        function reNewAttack(){
            newAttackCoord = placeRandomizer(1);
        }

        function checkRepeatedAttack(newest, current, user){
            if (!current){
                board.receiveAttack(newAttackCoord, user);
                return
            }
            else if (findCommonElements(newest, current) === false){
                board.receiveAttack(newAttackCoord, user);
                return
            }
            else {
                reNewAttack();
                checkRepeatedAttack(newAttackCoord, board.allReceivedAttackLocation, user);
                return
            }
        }
        checkRepeatedAttack(newAttackCoord, board.allReceivedAttackLocation, user);
    }
    function setShipRandom(board){
        // place the board you use and the length of ship, then randomPlacement() will place it randomly including gap between ships
        randomPlacement(board,5); 
        randomPlacement(board,4);
        randomPlacement(board,3);
        randomPlacement(board,3);
        randomPlacement(board,2);
    }
    function resetGameboard(){
        AIGameboard.deleteAllShip();
        playerGameboard.deleteAllShip();
        clearChild('AIGameboard');
        clearChild('playerGameboard');
        createGrid('AI');
        createGrid('player');
    }
    function attackMode(user){
        const gamelayout = document.querySelector(`.${user}Gameboard`); // still broke every attack mode is initiated over2 again so, 4x start game = 4x attackmode()
        const allGrid = gamelayout.querySelectorAll('div');
        allGrid.forEach((grid)=>{
            grid.addEventListener('click', ()=>{
                if(grid.classList.contains('attacked') || grid.classList.contains('hit')){
                    return
                }
                else{
                    if(AIGameboard.allLocation().length < 1 || playerGameboard.allLocation().length < 1){
                        gameEnd.active();
                        return // GAME END
                    }
                    else{
                        AIGameboard.receiveAttack(grid.className, 'AI');
                        AIGameboard.checkTotalHealth();
                        randomAttack(playerGameboard, 'player');
                        return
                    }
                }
            });
        });
    }
    attackMode('AI');

    return {
        startVsAI: ()=>{
            resetGameboard();
            attackMode('AI');
            setShipRandom(AIGameboard);
            setShipRandom(playerGameboard);
            layoutGridPlacedColor(playerGameboard, 'player');
        },
        restartGame: ()=> {
            resetGameboard();
        }
    }
}

function startGameBtn(){
    const startBtn = document.querySelector('#startGameBtn');
    const restartBtn = document.querySelector('#restartBtn');
    const randomPlaceBtn = document.querySelector('#randomPlaceBtn');

    startBtn.addEventListener('click', ()=>{
        console.log('Play the game!');
        game.startVsAI();
    });
    restartBtn.addEventListener('click', ()=>{
        console.log('restarted');
        game.restartGame();
    });
    randomPlaceBtn.addEventListener('click', ()=>{
        console.log('randomize');
        // popUpGameEnd().active();
    });
}

startGameBtn()

console.log('Game Ready');
export {playerGameboard, AIGameboard}