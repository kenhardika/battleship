// in this file we are gonna gather all the components of Battleship The Game and turn it into real game

// player. What does player do.
// player start the game by choosing who youre playing with
// player choose is it gonna be vs AI or vs Human
// at this point, if you choose AI. AI will automatically place their ships randomly on gameboard.
// player choose the ships placement accross the gameboard.
// ship's placement is based on one rule that there is always one empty block between one and another placed ships
// player have a choice to randomly place the ships by clicking the random button. 
// player placement order is.. first you place one big ship (5 in length), then two mid ship (3 in length), then three small ship (2 in length) 
// after all ships are placed, game initiate to start attacking by choosing the opponents's gameboard. This phase you could hit opponents's ship.
// after you attack opponent's ship, game automatically change to opponent's turn. This time Opponent's will initiate attack player's gameboard randomly.
// The AI does not have to be smart, but it should know whether or not a given move is legal. (i.e. it shouldn’t shoot the same coordinate twice). 
// Game repeating the previous step until one of the player/AI ships are fully cleaned (all destroyed)
// game ending if one of the player/AI total healthbar (ships) are = 0. 
// 1	Carrier	5
// 2	Battleship	4
// 3	Cruiser	3
// 4	Submarine	3
// 5	Destroyer	2


import player from "./player.js";
import gameboard from "./gameboard.js"
import ships from "./ships.js";
import placeRandomizer from "./placeRandomizer.js";
import findCommonElements from "./findCommonElements.js";
import placeGap from "./placeGap.js";
import createGrid from "./layoutGrid.js";
import layoutGridPlacedColor from "./layoutGridPlacedColor.js";
import {markedAttack, resetMarkedAttack} from "./markedAttackMove.js";
import clearChild from "./clearChild.js";

createGrid('AI');
createGrid('player');
const PLAYERONE = player(); 
const AI = player();
const playerGameboard = gameboard();
const AIGameboard = gameboard();
const game = startGame();

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
                // console.log('clashed initiate recurese check');
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
            console.log(newest);
            console.log(current);
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
    function emptyTheGameboard(board, user){
        board.deleteAllShip();
        layoutGridPlacedColor(board, user);
    }
    function attackMode(user){
        const gamelayout = document.querySelector(`.${user}Gameboard`); // still broke every attack mode is initiated over2 again so, 4x start game = 4x attackmode()
        const allGrid = gamelayout.querySelectorAll('div');
        allGrid.forEach((grid)=>{
            grid.addEventListener('click', ()=>{
                if( PLAYERONE.checkAttack() == "OFF" ) {
                    //AI initiate auto Attack
                    PLAYERONE.toggleAttackON();
                    return 
                }
                else if (PLAYERONE.checkAttack() == "ON" ){
                    console.log( grid.className + ' attacked');
                    AIGameboard.receiveAttack(grid.className, 'AI');
                    AIGameboard.checkTotalHealth();
                    randomAttack(playerGameboard, 'player');
                    // PLAYERONE.toggleAttackOFF();
                    // AI.toggleAttackON();
                    // toggle AI auto Attack
                    return
                } 
            });
        });
    }
    attackMode('AI');
    // attackMode('player');
    
    function autoAttackAI(){
        // pick randomized grid from layout
        // const randomGrid = randomPlacement(playerGameboard, 1);
        // launch attack() on that grid
        // playerGameboard.receiveAttack(randomGrid);
        // check gameboard.receiveAttack()
        // if missed or hit receiveAttack() will sort it out
        // check gameboard.allLocation() to see if it is endgame or not 
    }
    
    return {
        startVsAI: ()=>{
            clearChild('AIGameboard');
            clearChild('playerGameboard');
            createGrid('AI');
            createGrid('player');
            attackMode('AI');
            emptyTheGameboard(playerGameboard, 'player');
            emptyTheGameboard(AIGameboard, 'AI');
            resetMarkedAttack('AI');
            resetMarkedAttack('player');
            setShipRandom(AIGameboard);
            setShipRandom(playerGameboard);
            layoutGridPlacedColor(playerGameboard, 'player');
            PLAYERONE.toggleAttackON();
            // layoutGridPlacedColor(AIGameboard, 'AI');

        },
        restartGame: ()=> {
            emptyTheGameboard(playerGameboard, 'player');
            emptyTheGameboard(AIGameboard, 'AI');
            resetMarkedAttack('AI');
            resetMarkedAttack('player');
            clearChild('AIGameboard');
            clearChild('playerGameboard');
            createGrid('AI');
            createGrid('player');
        }
    }
}

function startGameBtn(){
    const startBtn = document.querySelector('#startGameBtn');
    const restartBtn = document.querySelector('#restartBtn');

    startBtn.addEventListener('click', ()=>{
        console.log('Play the game!');
        game.startVsAI();
    });
    restartBtn.addEventListener('click', ()=>{
        console.log('restarted');
        game.restartGame();
    });
}

startGameBtn()

console.log('Game Ready');
export {PLAYERONE, playerGameboard, AI, AIGameboard}