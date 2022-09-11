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


// console.log(PLAYERONE);debugger
// console.log(playerGameboard);debugger

createGrid('AI');
createGrid('player');
const PLAYERONE = player(); 
const AI = player();
const playerGameboard = gameboard();
const AIGameboard = gameboard();

function startGame(){
    let totalGap = [];
    function AIPlacement(val){
        let newShipCoord = placeRandomizer(val);
        let newShipWithGap = placeGap(newShipCoord);

        function AIPlaceShip(ship){
            AIGameboard.placement(ships(ship));
        }

        function AIPlaceGap(ship){
            AIGameboard.addGapLocation(
                placeGap(ship)
            );
        }

        function addTotalGap(){
            // merge the array
          totalGap = totalGap.concat(newShipWithGap);
          totalGap = [...new Set ([...newShipWithGap])];  
        //   console.log('total gap under me')
        //   console.log(totalGap);
        }

        function checkCommonElements(newest, current, val){
            if (findCommonElements(newest, current) === true){
                console.log('clashed initiate recurese check')
                newShipCoord = placeRandomizer(val);
                newShipWithGap = placeGap(newShipCoord);
                checkCommonElements(newShipCoord, AIGameboard.gapLocation, val);
            }
            else {
                AIPlaceShip(newShipCoord);
                AIPlaceGap(newShipCoord);
                addTotalGap();
                // add total gap
            }
        }

        // starts here
        // changing into include the gap
        console.log('totalGap and Gap location under me')
        console.log(totalGap);
        console.log(AIGameboard.gapLocation);
        if(findCommonElements(newShipWithGap, AIGameboard.gapLocation) === true){
            console.log('clashed: reset initialize');
            newShipCoord = placeRandomizer(val);
            newShipWithGap = placeGap(newShipCoord);
            checkCommonElements(newShipWithGap, AIGameboard.gapLocation, val);
            // CarrierGap = placeGap(newShipCoord);
        } else {
            AIPlaceShip(newShipCoord);
            AIPlaceGap(newShipCoord);
            addTotalGap();
            // add totalgap 
        }
    }

    return {
        versusAI: ()=>{
            AIPlacement(5);
            AIPlacement(4);
            AIPlacement(3);
            AIPlacement(3);
            AIPlacement(2);
        }
    }
}
startGame().versusAI();
AIGameboard.checkAllLocation();
AIGameboard.checkTotalHealth();
layoutGridPlacedColor();

export {PLAYERONE, playerGameboard, AI, AIGameboard}

//startGame().versusAI();