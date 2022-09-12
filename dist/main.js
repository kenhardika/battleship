/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/findCommonElements.js":
/*!***********************************!*\
  !*** ./src/findCommonElements.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function findCommonElements(arr1, arr2) {
    return arr1.some(item => arr2.includes(item))
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (findCommonElements);

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

const gameboard = ()=> {
    let allShip = [];
    let totalHealth = 0;
    let allLocation = [];
    let attackMissed = [];
    let allGapLocation = [];

    function refreshAllLocation(){
        let newLocation = [];
        allShip.forEach((ship)=>{
            newLocation = newLocation.concat(ship.location());
        });
        allLocation = newLocation;
    }
    function attackMissedCounter(coor){
        attackMissed.push(coor);
    }

    //console.log('gameboard is on');
    return {
        placement: (ships)=>{ // dont need coor since coordinate should be inside the ship()
            // make sure the coordinate is valid, which means empty and one block away from another ship
            // place the ships on the coordinate     
            allShip.push(ships);
            allLocation = allLocation.concat(ships.location());
            // marks the coordinate with ships' marks
            return
        },
        receiveAttack: (coor)=>{
            if(allLocation.includes(coor) === false){
                console.log('Attack missed')
                attackMissedCounter(coor);
                return 
            } 
            else {
                console.log('Attack Hit!')
                allShip.forEach((ship)=>{
                    ship.hit(coor);
                });
                // refresh the allLocation Array so you cannot hit twice on the same coordinate
                refreshAllLocation()
            } 
            // toggle checkAllShip() to make sure if its not endgame
            // if not marks the coordinate with missedAttack()
            //return
        },
        checkTotalHealth: ()=>{
            // check the healthbar of each ships with ship.healthbar()
            allShip.forEach((ship)=>{
                ship.location(); 
                totalHealth = totalHealth + ship.healthBar();
            });
            console.log(totalHealth);
            // if all the healthbar is 0 then the game is ended
            if(totalHealth <= 0){
                console.log("GAME OVER ALL OF YOUR SHIPS WRECKED")
                return totalHealth
            }
            else{
                return totalHealth
            } 
        },
        allLocation: ()=>{
            refreshAllLocation();
            return allLocation
        },
        checkAllLocation:()=>{
            refreshAllLocation();
            console.log(allLocation);
            return allLocation
        },
        deleteAllShip: ()=> {
            allShip.length = 0;
            totalHealth = 0;
            allLocation.length = 0;
            attackMissed.length=0;
            allGapLocation.length = 0;
            refreshAllLocation();
        },
        addGapLocation: (array)=> {
            // gapLocation.push(array);
            array.forEach((arr)=>{
                allGapLocation.push(arr);
            });
        }, 
        checkGapLocation: ()=> {
            console.log(allGapLocation);
            return allGapLocation
        },
        checkAttackMissed: ()=>{
            console.log(attackMissed);
            return attackMissed
        },
        allGapLocation
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameboard);

// const playa = gameboard();
// const bigShipCoor = '6B 7B 8B 9B 10B';
// const midShipCoor = '4B 4C 4D';
// const midShip = ships(midShipCoor);
// const bigShip = ships(bigShipCoor);

// playa.placement(bigShip);
// playa.placement(midShip);
// playa.receiveAttack("4B");debugger
// playa.receiveAttack("4C");debugger
// playa.receiveAttack("4D");debugger
// playa.receiveAttack("3B");debugger
// playa.checkAllLocation();
// playa.checkAttackMissed();
// playa.checkTotalHealth(); 
// revise this
// playa.placement('1A 2A 3A', ships(3));
// playa.placement('3B 4B', ships(2));
// playa.placement('6B 7B 8B 9B 10B', ships(5));
// playa.placement('6E 7E 8E 9E 10E', ships(5));

/***/ }),

/***/ "./src/layoutGrid.js":
/*!***************************!*\
  !*** ./src/layoutGrid.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function createGrid(whos){
    const layer = document.querySelector(`.${whos}Gameboard`);
    const MAX_WIDTH = 10;
    const alphabet = 'abcdefghij';
    const alphArray = alphabet.split('');

    alphArray.forEach((alp)=>{
        for (let i=1; i <= MAX_WIDTH; i++ ){
            const grid = document.createElement('div');
            grid.className=`${alp}${i}`;
            // grid.addEventListener('click', ()=>{
                // console.log(grid.className);
                // clicked the grid
                // initiate attack() // then AI attack yours too
            // })
            layer.append(grid);
        }
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createGrid);

/***/ }),

/***/ "./src/layoutGridPlacedColor.js":
/*!**************************************!*\
  !*** ./src/layoutGridPlacedColor.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function layoutGridPlacedColor(gameboard, user){
    let currentGap = gameboard.allGapLocation;
    let currentShip = gameboard.allLocation();
    // console.log(currentGap);
    if (currentGap.length === 0){
        // console.log('hit array gaplocation empty')
        const layer = document.querySelector(`.${user}Gameboard`);
        const gap = layer.querySelectorAll('div');
            gap.forEach((g)=>{
                g.classList.remove('gap');
                g.classList.remove('ship');
            });
    }
    else {
        currentGap.forEach((arrayLoc)=>{
            const layer = document.querySelector(`.${user}Gameboard`);
            let gap = layer.querySelector(`.${arrayLoc}`);
            gap.classList.add('gap');
        });
        currentShip.forEach((curship)=>{
            const layer = document.querySelector(`.${user}Gameboard`);
            let ship = layer.querySelector(`.${curship}`);
            ship.classList.add('ship');
        });
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (layoutGridPlacedColor);

/***/ }),

/***/ "./src/placeGap.js":
/*!*************************!*\
  !*** ./src/placeGap.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// set gap by one by one loop check

function placeGap(mainArray){
    let outputArray = [];
    let resultArray = [];
    const numberPatt = /[0-9]/g;
    const alphaPatt = /[a-zA-Z]/g;
    const alphabetMax = 'abcdefghij';
    const alpArray = alphabetMax.split('');
    mainArray.forEach((val)=>{
        const numb = parseInt(val.match(numberPatt).join(''));
        const alph = val.match(alphaPatt).join('');
        const numbMinusOne = numb - 1;
        const numbPlusOne = numb + 1;
        const alphPlusOne = alpArray[(alpArray.indexOf(alph))+1];
        const alphMinusOne = alpArray[(alpArray.indexOf(alph))-1];
        
        function mergeArray(){
              // merge the array
            resultArray = resultArray.concat(outputArray);
            resultArray = [...new Set ([...mainArray,...outputArray])];  
        }
        function checkRight(){
            outputArray.push(alph.concat((numbPlusOne).toString())); // right
        }
        function checkLeft(){
            outputArray.push(alph.concat((numbMinusOne).toString())); // left
        }
        function checkUp(){
            outputArray.push(alphMinusOne.concat((numb).toString())); // up
        }
        function checkDown(){
            outputArray.push(alphPlusOne.concat((numb).toString())); // down
        }
        function checkDiagUpRight(){
            outputArray.push(alphMinusOne.concat((numbPlusOne).toString())); // up right
        }
        function checkDiagDownRight(){
            outputArray.push(alphPlusOne.concat((numbPlusOne).toString())); // down right
        }
        function checkDiagUpLeft(){
            outputArray.push(alphMinusOne.concat((numbMinusOne).toString())); // up left
        }
        function checkDiagDownLeft(){
            outputArray.push(alphPlusOne.concat((numbMinusOne).toString())); // down left
        }
        if (alphMinusOne == undefined && numbMinusOne < 1){ // corner up left
            // console.log('hits corner up left');
            checkRight();
            checkDown();
            checkDiagDownRight();
            mergeArray(); 
        }
        else if (alphPlusOne == undefined && numbMinusOne < 1){ // corner bottom left
            // console.log('hits corner bottom left');
            checkRight();
            checkUp();
            checkDiagUpRight();
            mergeArray(); 
        }
        else if (alphMinusOne == undefined && numbPlusOne > 10){ // corner up right 
            // console.log('hits corner up right');
            checkLeft();
            checkDown();
            checkDiagDownLeft();
            mergeArray(); 
        }
        else if (alphPlusOne == undefined && numbPlusOne > 10){ // corner bottom right
            // console.log('hits corner bottom right');
            checkLeft();
            checkUp();
            checkDiagUpLeft();
            mergeArray(); 
        }
        else if (numbMinusOne < 1){
            // console.log('hit number = 0');
            checkRight();
            checkUp();
            checkDown();
            checkDiagUpRight();
            checkDiagDownRight();
            mergeArray();
            return
        }
        else if(numbPlusOne > 10){
            // console.log('hit number > 10');
            checkLeft();
            checkUp();
            checkDown();
            checkDiagUpLeft();
            checkDiagDownLeft();
            mergeArray();
            return
        }
        else if (alphMinusOne == undefined){
            // console.log('hits undefined');
            checkLeft();
            checkRight();
            checkDown();
            checkDiagDownLeft();
            checkDiagDownRight(); 
            mergeArray();
            return
        }
        else if (alphPlusOne == undefined){
            // console.log('hits undefined');
            checkLeft();
            checkRight();
            checkUp(); 
            checkDiagUpLeft(); 
            checkDiagUpRight();
            mergeArray();
            return
        }
        else{
                // horizontal check
                checkLeft();
                checkRight();
                // vertical check
                checkUp();
                checkDown();
                //diagonal left check
                checkDiagUpLeft();
                checkDiagDownLeft();
                //diagonal right check
                checkDiagUpRight();
                checkDiagDownRight();
                mergeArray();
                return
            }
        
        

    });
    // console.log(outputArray);
    // console.log(resultArray);
    return resultArray
}

// let array1 = ['a','b','c'];
// let array2 = ['z','a','s'];

// let array3 = array1.concat(array2);
// array3 = [...new Set([...array1,...array2])]

// console.log(array3); 

// placeGap(['10j']);
// placeGap(['10c', '10d', '10e']);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (placeGap);

/***/ }),

/***/ "./src/placeRandomizer.js":
/*!********************************!*\
  !*** ./src/placeRandomizer.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function placeRandomizer(leng){
    const MAX_GRID = 10; // maximum grid length is 10x10
    const randomAxis = Math.floor(Math.random() * 2); // only return 0/1
    const array = [];
    const alphabet = "abcdefghij";
    const randomNumber = Math.floor(Math.random() * (MAX_GRID - leng)) + 1; // this randomizer number keep you from overflowing, plus one so it start from 1 not 0
    const randomAlp = alphabet[Math.floor(Math.random() * alphabet.substring(0,(MAX_GRID - leng)).length)]; // this randomizer keeps you from value more than length
    let alphaNum;

    if (randomAxis === 0){ // X axis blocks
        for (let i = 0; i <leng; i++ ){
            alphaNum = randomAlp.concat((randomNumber + i).toString());
            array.push(alphaNum);
        }
        // console.log(array);
        // console.log(randomAxis);
        return array
    }
    else { // Y axis blocks
        for (let i = 0; i <leng; i++ ){
            const alpLoop = alphabet.charAt(alphabet.indexOf(randomAlp) + i);
            alphaNum = alpLoop.concat((randomNumber).toString());
            array.push(alphaNum);
        }
        // console.log(array);
        // console.log(randomAxis);
        return array
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (placeRandomizer);

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

// const yourGameboard = gameboard();
// const humanGameboard = gameboard();
// const AIGameboard = gameboard();

const player = () => {
    // player should take turns playing the game by attacking opponent's gameboard.
    let attackStatus = 'OFF';
    // player attacking state is ON
    // player CHOOSE the coordinate of opponent's gameboard.
    // player attacking state is OFF
    // let yourGameboard = gameboard();
    return {
        toggleAttackON : ()=> attackStatus = "ON",
        toggleAttackOFF : ()=> attackStatus = "OFF",
        checkAttack: ()=> {
            console.log(attackStatus); 
            return attackStatus
        },
        
    }
}

// let playe = player();


// playe.checkAttack();
// playe.toggleAttackON();
// playe.checkAttack();


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (player);

/***/ }),

/***/ "./src/ships.js":
/*!**********************!*\
  !*** ./src/ships.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

const ships = (coord) =>{ // length will be from size of the ship
    // let coord = loc.split(',');
    let healthBar = coord.length;
    return {
        length: ()=>{
            return len 
        },
        hit: (loc)=>{
            //get the attck hit location
            if (coord.includes(loc) === false){
                //console.log("attack missed")
                return
            }
            else if(coord.includes(loc) === true){
                coord = coord.filter( (val)=>{
                   return val !== loc
                });
                healthBar = healthBar - 1;
                return
            }
            //mark position in gameboard as a hit
            // console.log("this ship took hit: " + num)
            //return 
        },
        isSunk: ()=>{
            //check the ship if sunken yet
            if(healthBar <= 0) {
                console.log('ship is destroyed');
                return  
            } 
            else {
                console.log('ship is still intact');
                return 
            }
        }, 
        healthBar : ()=> {
            //console.log("this ship health: " + healthBar);
            return healthBar
        },
        location: ()=>{
            //console.log(coord)
            return coord
        }
    }
}

// const bigShip = ships("3A 4A 5A 6A 7A");
// const midShip2 = ships("12A 12B 12C");
// const smallShip = ships("4B");

// bigShip.location();
// bigShip.healthBar();
// bigShip.hit("3A");
// bigShip.location();
// bigShip.healthBar();
// bigShip.hit("8A");
// bigShip.location();
// bigShip.healthBar();
// bigShip.hit("4A");
// bigShip.hit("5A");
// bigShip.hit("6A");
// bigShip.location();
// bigShip.healthBar();
// bigShip.isSunk();
// bigShip.hit("7A");
// bigShip.location();
// bigShip.healthBar();
// bigShip.isSunk();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ships);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/maingame.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AI": () => (/* binding */ AI),
/* harmony export */   "AIGameboard": () => (/* binding */ AIGameboard),
/* harmony export */   "PLAYERONE": () => (/* binding */ PLAYERONE),
/* harmony export */   "playerGameboard": () => (/* binding */ playerGameboard)
/* harmony export */ });
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ "./src/player.js");
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard.js */ "./src/gameboard.js");
/* harmony import */ var _ships_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ships.js */ "./src/ships.js");
/* harmony import */ var _placeRandomizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./placeRandomizer.js */ "./src/placeRandomizer.js");
/* harmony import */ var _findCommonElements_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./findCommonElements.js */ "./src/findCommonElements.js");
/* harmony import */ var _placeGap_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./placeGap.js */ "./src/placeGap.js");
/* harmony import */ var _layoutGrid_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./layoutGrid.js */ "./src/layoutGrid.js");
/* harmony import */ var _layoutGridPlacedColor_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./layoutGridPlacedColor.js */ "./src/layoutGridPlacedColor.js");
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











(0,_layoutGrid_js__WEBPACK_IMPORTED_MODULE_6__["default"])('AI');
(0,_layoutGrid_js__WEBPACK_IMPORTED_MODULE_6__["default"])('player');
const PLAYERONE = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); 
const AI = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
const playerGameboard = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
const AIGameboard = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
const game = startGame();

function startGame(){
    function randomPlacement(board, val){ // you can use this randomPlacement with AI or Player
        let newShipCoord = (0,_placeRandomizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(val);
        let newShipWithGap = (0,_placeGap_js__WEBPACK_IMPORTED_MODULE_5__["default"])(newShipCoord);

        function reRandomizeWithGap(){
            newShipCoord = (0,_placeRandomizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(val);
            newShipWithGap = (0,_placeGap_js__WEBPACK_IMPORTED_MODULE_5__["default"])(newShipCoord);
        }

        function checkAndAddElements(newest, current, val){
            if ((0,_findCommonElements_js__WEBPACK_IMPORTED_MODULE_4__["default"])(newest, current) === false){ // if there IS NOT common elements inside of both array (not clashed), proceed to add to gameboard
                board.placement((0,_ships_js__WEBPACK_IMPORTED_MODULE_2__["default"])(newShipCoord));
                board.addGapLocation((0,_placeGap_js__WEBPACK_IMPORTED_MODULE_5__["default"])(newShipCoord));
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
        (0,_layoutGridPlacedColor_js__WEBPACK_IMPORTED_MODULE_7__["default"])(board, user);
    }
    function autoAttackAI(){
        // pick randomized grid from layout
        // launch attack() on that grid
        // check gameboard.receiveAttack()
        // if missed or hit receiveAttack() will sort it out
        // check gameboard.allLocation() to see if it is endgame or not 
    }
    return {
        startVsAI: ()=>{
            emptyTheGameboard(playerGameboard, 'player');
            emptyTheGameboard(AIGameboard, 'AI');
            setShipRandom(AIGameboard);
            setShipRandom(playerGameboard);
            (0,_layoutGridPlacedColor_js__WEBPACK_IMPORTED_MODULE_7__["default"])(playerGameboard, 'player');
        },
        restartGame: ()=> {
            emptyTheGameboard(playerGameboard, 'player');
            emptyTheGameboard(AIGameboard, 'AI');
        },
        attackMode: (user)=> {
            const gamelayout = document.querySelector(`.${user}Gameboard`);
            const allGrid = gamelayout.querySelectorAll('div');
            allGrid.forEach((grid)=>{
                grid.addEventListener('click', ()=>{
                    console.log( grid.className + ' attacked');
                })
            });
        }
    }
}

function startGameBtn(){
    const startBtn = document.querySelector('#startGameBtn');
    const restartBtn = document.querySelector('#restartBtn');

    startBtn.addEventListener('click', ()=>{
        console.log('Play the game!');
        game.startVsAI();
        game.attackMode('AI');
    });
    restartBtn.addEventListener('click', ()=>{
        console.log('restarted');
        game.restartGame();
    });
}

startGameBtn()

console.log('Game Ready');

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEscUVBQXFCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHFFQUFxQjtBQUNqQyxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsMERBQTBELEtBQUs7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9maW5kQ29tbW9uRWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9sYXlvdXRHcmlkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbGF5b3V0R3JpZFBsYWNlZENvbG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxhY2VHYXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGFjZVJhbmRvbWl6ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tYWluZ2FtZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBmaW5kQ29tbW9uRWxlbWVudHMoYXJyMSwgYXJyMikge1xuICAgIHJldHVybiBhcnIxLnNvbWUoaXRlbSA9PiBhcnIyLmluY2x1ZGVzKGl0ZW0pKVxufVxuXG5leHBvcnQgZGVmYXVsdCBmaW5kQ29tbW9uRWxlbWVudHMiLCJcbmNvbnN0IGdhbWVib2FyZCA9ICgpPT4ge1xuICAgIGxldCBhbGxTaGlwID0gW107XG4gICAgbGV0IHRvdGFsSGVhbHRoID0gMDtcbiAgICBsZXQgYWxsTG9jYXRpb24gPSBbXTtcbiAgICBsZXQgYXR0YWNrTWlzc2VkID0gW107XG4gICAgbGV0IGFsbEdhcExvY2F0aW9uID0gW107XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoQWxsTG9jYXRpb24oKXtcbiAgICAgICAgbGV0IG5ld0xvY2F0aW9uID0gW107XG4gICAgICAgIGFsbFNoaXAuZm9yRWFjaCgoc2hpcCk9PntcbiAgICAgICAgICAgIG5ld0xvY2F0aW9uID0gbmV3TG9jYXRpb24uY29uY2F0KHNoaXAubG9jYXRpb24oKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBhbGxMb2NhdGlvbiA9IG5ld0xvY2F0aW9uO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhdHRhY2tNaXNzZWRDb3VudGVyKGNvb3Ipe1xuICAgICAgICBhdHRhY2tNaXNzZWQucHVzaChjb29yKTtcbiAgICB9XG5cbiAgICAvL2NvbnNvbGUubG9nKCdnYW1lYm9hcmQgaXMgb24nKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBwbGFjZW1lbnQ6IChzaGlwcyk9PnsgLy8gZG9udCBuZWVkIGNvb3Igc2luY2UgY29vcmRpbmF0ZSBzaG91bGQgYmUgaW5zaWRlIHRoZSBzaGlwKClcbiAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgY29vcmRpbmF0ZSBpcyB2YWxpZCwgd2hpY2ggbWVhbnMgZW1wdHkgYW5kIG9uZSBibG9jayBhd2F5IGZyb20gYW5vdGhlciBzaGlwXG4gICAgICAgICAgICAvLyBwbGFjZSB0aGUgc2hpcHMgb24gdGhlIGNvb3JkaW5hdGUgICAgIFxuICAgICAgICAgICAgYWxsU2hpcC5wdXNoKHNoaXBzKTtcbiAgICAgICAgICAgIGFsbExvY2F0aW9uID0gYWxsTG9jYXRpb24uY29uY2F0KHNoaXBzLmxvY2F0aW9uKCkpO1xuICAgICAgICAgICAgLy8gbWFya3MgdGhlIGNvb3JkaW5hdGUgd2l0aCBzaGlwcycgbWFya3NcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9LFxuICAgICAgICByZWNlaXZlQXR0YWNrOiAoY29vcik9PntcbiAgICAgICAgICAgIGlmKGFsbExvY2F0aW9uLmluY2x1ZGVzKGNvb3IpID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0F0dGFjayBtaXNzZWQnKVxuICAgICAgICAgICAgICAgIGF0dGFja01pc3NlZENvdW50ZXIoY29vcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFxuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBdHRhY2sgSGl0IScpXG4gICAgICAgICAgICAgICAgYWxsU2hpcC5mb3JFYWNoKChzaGlwKT0+e1xuICAgICAgICAgICAgICAgICAgICBzaGlwLmhpdChjb29yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvLyByZWZyZXNoIHRoZSBhbGxMb2NhdGlvbiBBcnJheSBzbyB5b3UgY2Fubm90IGhpdCB0d2ljZSBvbiB0aGUgc2FtZSBjb29yZGluYXRlXG4gICAgICAgICAgICAgICAgcmVmcmVzaEFsbExvY2F0aW9uKClcbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAvLyB0b2dnbGUgY2hlY2tBbGxTaGlwKCkgdG8gbWFrZSBzdXJlIGlmIGl0cyBub3QgZW5kZ2FtZVxuICAgICAgICAgICAgLy8gaWYgbm90IG1hcmtzIHRoZSBjb29yZGluYXRlIHdpdGggbWlzc2VkQXR0YWNrKClcbiAgICAgICAgICAgIC8vcmV0dXJuXG4gICAgICAgIH0sXG4gICAgICAgIGNoZWNrVG90YWxIZWFsdGg6ICgpPT57XG4gICAgICAgICAgICAvLyBjaGVjayB0aGUgaGVhbHRoYmFyIG9mIGVhY2ggc2hpcHMgd2l0aCBzaGlwLmhlYWx0aGJhcigpXG4gICAgICAgICAgICBhbGxTaGlwLmZvckVhY2goKHNoaXApPT57XG4gICAgICAgICAgICAgICAgc2hpcC5sb2NhdGlvbigpOyBcbiAgICAgICAgICAgICAgICB0b3RhbEhlYWx0aCA9IHRvdGFsSGVhbHRoICsgc2hpcC5oZWFsdGhCYXIoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2codG90YWxIZWFsdGgpO1xuICAgICAgICAgICAgLy8gaWYgYWxsIHRoZSBoZWFsdGhiYXIgaXMgMCB0aGVuIHRoZSBnYW1lIGlzIGVuZGVkXG4gICAgICAgICAgICBpZih0b3RhbEhlYWx0aCA8PSAwKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdBTUUgT1ZFUiBBTEwgT0YgWU9VUiBTSElQUyBXUkVDS0VEXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvdGFsSGVhbHRoXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHJldHVybiB0b3RhbEhlYWx0aFxuICAgICAgICAgICAgfSBcbiAgICAgICAgfSxcbiAgICAgICAgYWxsTG9jYXRpb246ICgpPT57XG4gICAgICAgICAgICByZWZyZXNoQWxsTG9jYXRpb24oKTtcbiAgICAgICAgICAgIHJldHVybiBhbGxMb2NhdGlvblxuICAgICAgICB9LFxuICAgICAgICBjaGVja0FsbExvY2F0aW9uOigpPT57XG4gICAgICAgICAgICByZWZyZXNoQWxsTG9jYXRpb24oKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFsbExvY2F0aW9uKTtcbiAgICAgICAgICAgIHJldHVybiBhbGxMb2NhdGlvblxuICAgICAgICB9LFxuICAgICAgICBkZWxldGVBbGxTaGlwOiAoKT0+IHtcbiAgICAgICAgICAgIGFsbFNoaXAubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHRvdGFsSGVhbHRoID0gMDtcbiAgICAgICAgICAgIGFsbExvY2F0aW9uLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICBhdHRhY2tNaXNzZWQubGVuZ3RoPTA7XG4gICAgICAgICAgICBhbGxHYXBMb2NhdGlvbi5sZW5ndGggPSAwO1xuICAgICAgICAgICAgcmVmcmVzaEFsbExvY2F0aW9uKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGFkZEdhcExvY2F0aW9uOiAoYXJyYXkpPT4ge1xuICAgICAgICAgICAgLy8gZ2FwTG9jYXRpb24ucHVzaChhcnJheSk7XG4gICAgICAgICAgICBhcnJheS5mb3JFYWNoKChhcnIpPT57XG4gICAgICAgICAgICAgICAgYWxsR2FwTG9jYXRpb24ucHVzaChhcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIFxuICAgICAgICBjaGVja0dhcExvY2F0aW9uOiAoKT0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFsbEdhcExvY2F0aW9uKTtcbiAgICAgICAgICAgIHJldHVybiBhbGxHYXBMb2NhdGlvblxuICAgICAgICB9LFxuICAgICAgICBjaGVja0F0dGFja01pc3NlZDogKCk9PntcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGF0dGFja01pc3NlZCk7XG4gICAgICAgICAgICByZXR1cm4gYXR0YWNrTWlzc2VkXG4gICAgICAgIH0sXG4gICAgICAgIGFsbEdhcExvY2F0aW9uXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBnYW1lYm9hcmQ7XG5cbi8vIGNvbnN0IHBsYXlhID0gZ2FtZWJvYXJkKCk7XG4vLyBjb25zdCBiaWdTaGlwQ29vciA9ICc2QiA3QiA4QiA5QiAxMEInO1xuLy8gY29uc3QgbWlkU2hpcENvb3IgPSAnNEIgNEMgNEQnO1xuLy8gY29uc3QgbWlkU2hpcCA9IHNoaXBzKG1pZFNoaXBDb29yKTtcbi8vIGNvbnN0IGJpZ1NoaXAgPSBzaGlwcyhiaWdTaGlwQ29vcik7XG5cbi8vIHBsYXlhLnBsYWNlbWVudChiaWdTaGlwKTtcbi8vIHBsYXlhLnBsYWNlbWVudChtaWRTaGlwKTtcbi8vIHBsYXlhLnJlY2VpdmVBdHRhY2soXCI0QlwiKTtkZWJ1Z2dlclxuLy8gcGxheWEucmVjZWl2ZUF0dGFjayhcIjRDXCIpO2RlYnVnZ2VyXG4vLyBwbGF5YS5yZWNlaXZlQXR0YWNrKFwiNERcIik7ZGVidWdnZXJcbi8vIHBsYXlhLnJlY2VpdmVBdHRhY2soXCIzQlwiKTtkZWJ1Z2dlclxuLy8gcGxheWEuY2hlY2tBbGxMb2NhdGlvbigpO1xuLy8gcGxheWEuY2hlY2tBdHRhY2tNaXNzZWQoKTtcbi8vIHBsYXlhLmNoZWNrVG90YWxIZWFsdGgoKTsgXG4vLyByZXZpc2UgdGhpc1xuLy8gcGxheWEucGxhY2VtZW50KCcxQSAyQSAzQScsIHNoaXBzKDMpKTtcbi8vIHBsYXlhLnBsYWNlbWVudCgnM0IgNEInLCBzaGlwcygyKSk7XG4vLyBwbGF5YS5wbGFjZW1lbnQoJzZCIDdCIDhCIDlCIDEwQicsIHNoaXBzKDUpKTtcbi8vIHBsYXlhLnBsYWNlbWVudCgnNkUgN0UgOEUgOUUgMTBFJywgc2hpcHMoNSkpOyIsIlxuZnVuY3Rpb24gY3JlYXRlR3JpZCh3aG9zKXtcbiAgICBjb25zdCBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3dob3N9R2FtZWJvYXJkYCk7XG4gICAgY29uc3QgTUFYX1dJRFRIID0gMTA7XG4gICAgY29uc3QgYWxwaGFiZXQgPSAnYWJjZGVmZ2hpaic7XG4gICAgY29uc3QgYWxwaEFycmF5ID0gYWxwaGFiZXQuc3BsaXQoJycpO1xuXG4gICAgYWxwaEFycmF5LmZvckVhY2goKGFscCk9PntcbiAgICAgICAgZm9yIChsZXQgaT0xOyBpIDw9IE1BWF9XSURUSDsgaSsrICl7XG4gICAgICAgICAgICBjb25zdCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBncmlkLmNsYXNzTmFtZT1gJHthbHB9JHtpfWA7XG4gICAgICAgICAgICAvLyBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhncmlkLmNsYXNzTmFtZSk7XG4gICAgICAgICAgICAgICAgLy8gY2xpY2tlZCB0aGUgZ3JpZFxuICAgICAgICAgICAgICAgIC8vIGluaXRpYXRlIGF0dGFjaygpIC8vIHRoZW4gQUkgYXR0YWNrIHlvdXJzIHRvb1xuICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgIGxheWVyLmFwcGVuZChncmlkKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlR3JpZCIsImZ1bmN0aW9uIGxheW91dEdyaWRQbGFjZWRDb2xvcihnYW1lYm9hcmQsIHVzZXIpe1xuICAgIGxldCBjdXJyZW50R2FwID0gZ2FtZWJvYXJkLmFsbEdhcExvY2F0aW9uO1xuICAgIGxldCBjdXJyZW50U2hpcCA9IGdhbWVib2FyZC5hbGxMb2NhdGlvbigpO1xuICAgIC8vIGNvbnNvbGUubG9nKGN1cnJlbnRHYXApO1xuICAgIGlmIChjdXJyZW50R2FwLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXQgYXJyYXkgZ2FwbG9jYXRpb24gZW1wdHknKVxuICAgICAgICBjb25zdCBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3VzZXJ9R2FtZWJvYXJkYCk7XG4gICAgICAgIGNvbnN0IGdhcCA9IGxheWVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2RpdicpO1xuICAgICAgICAgICAgZ2FwLmZvckVhY2goKGcpPT57XG4gICAgICAgICAgICAgICAgZy5jbGFzc0xpc3QucmVtb3ZlKCdnYXAnKTtcbiAgICAgICAgICAgICAgICBnLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY3VycmVudEdhcC5mb3JFYWNoKChhcnJheUxvYyk9PntcbiAgICAgICAgICAgIGNvbnN0IGxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7dXNlcn1HYW1lYm9hcmRgKTtcbiAgICAgICAgICAgIGxldCBnYXAgPSBsYXllci5xdWVyeVNlbGVjdG9yKGAuJHthcnJheUxvY31gKTtcbiAgICAgICAgICAgIGdhcC5jbGFzc0xpc3QuYWRkKCdnYXAnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGN1cnJlbnRTaGlwLmZvckVhY2goKGN1cnNoaXApPT57XG4gICAgICAgICAgICBjb25zdCBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3VzZXJ9R2FtZWJvYXJkYCk7XG4gICAgICAgICAgICBsZXQgc2hpcCA9IGxheWVyLnF1ZXJ5U2VsZWN0b3IoYC4ke2N1cnNoaXB9YCk7XG4gICAgICAgICAgICBzaGlwLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBsYXlvdXRHcmlkUGxhY2VkQ29sb3IiLCIvLyBzZXQgZ2FwIGJ5IG9uZSBieSBvbmUgbG9vcCBjaGVja1xuXG5mdW5jdGlvbiBwbGFjZUdhcChtYWluQXJyYXkpe1xuICAgIGxldCBvdXRwdXRBcnJheSA9IFtdO1xuICAgIGxldCByZXN1bHRBcnJheSA9IFtdO1xuICAgIGNvbnN0IG51bWJlclBhdHQgPSAvWzAtOV0vZztcbiAgICBjb25zdCBhbHBoYVBhdHQgPSAvW2EtekEtWl0vZztcbiAgICBjb25zdCBhbHBoYWJldE1heCA9ICdhYmNkZWZnaGlqJztcbiAgICBjb25zdCBhbHBBcnJheSA9IGFscGhhYmV0TWF4LnNwbGl0KCcnKTtcbiAgICBtYWluQXJyYXkuZm9yRWFjaCgodmFsKT0+e1xuICAgICAgICBjb25zdCBudW1iID0gcGFyc2VJbnQodmFsLm1hdGNoKG51bWJlclBhdHQpLmpvaW4oJycpKTtcbiAgICAgICAgY29uc3QgYWxwaCA9IHZhbC5tYXRjaChhbHBoYVBhdHQpLmpvaW4oJycpO1xuICAgICAgICBjb25zdCBudW1iTWludXNPbmUgPSBudW1iIC0gMTtcbiAgICAgICAgY29uc3QgbnVtYlBsdXNPbmUgPSBudW1iICsgMTtcbiAgICAgICAgY29uc3QgYWxwaFBsdXNPbmUgPSBhbHBBcnJheVsoYWxwQXJyYXkuaW5kZXhPZihhbHBoKSkrMV07XG4gICAgICAgIGNvbnN0IGFscGhNaW51c09uZSA9IGFscEFycmF5WyhhbHBBcnJheS5pbmRleE9mKGFscGgpKS0xXTtcbiAgICAgICAgXG4gICAgICAgIGZ1bmN0aW9uIG1lcmdlQXJyYXkoKXtcbiAgICAgICAgICAgICAgLy8gbWVyZ2UgdGhlIGFycmF5XG4gICAgICAgICAgICByZXN1bHRBcnJheSA9IHJlc3VsdEFycmF5LmNvbmNhdChvdXRwdXRBcnJheSk7XG4gICAgICAgICAgICByZXN1bHRBcnJheSA9IFsuLi5uZXcgU2V0IChbLi4ubWFpbkFycmF5LC4uLm91dHB1dEFycmF5XSldOyAgXG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tSaWdodCgpe1xuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaChhbHBoLmNvbmNhdCgobnVtYlBsdXNPbmUpLnRvU3RyaW5nKCkpKTsgLy8gcmlnaHRcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBjaGVja0xlZnQoKXtcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaC5jb25jYXQoKG51bWJNaW51c09uZSkudG9TdHJpbmcoKSkpOyAvLyBsZWZ0XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tVcCgpe1xuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaChhbHBoTWludXNPbmUuY29uY2F0KChudW1iKS50b1N0cmluZygpKSk7IC8vIHVwXG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tEb3duKCl7XG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKGFscGhQbHVzT25lLmNvbmNhdCgobnVtYikudG9TdHJpbmcoKSkpOyAvLyBkb3duXG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tEaWFnVXBSaWdodCgpe1xuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaChhbHBoTWludXNPbmUuY29uY2F0KChudW1iUGx1c09uZSkudG9TdHJpbmcoKSkpOyAvLyB1cCByaWdodFxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrRGlhZ0Rvd25SaWdodCgpe1xuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaChhbHBoUGx1c09uZS5jb25jYXQoKG51bWJQbHVzT25lKS50b1N0cmluZygpKSk7IC8vIGRvd24gcmlnaHRcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBjaGVja0RpYWdVcExlZnQoKXtcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaE1pbnVzT25lLmNvbmNhdCgobnVtYk1pbnVzT25lKS50b1N0cmluZygpKSk7IC8vIHVwIGxlZnRcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBjaGVja0RpYWdEb3duTGVmdCgpe1xuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaChhbHBoUGx1c09uZS5jb25jYXQoKG51bWJNaW51c09uZSkudG9TdHJpbmcoKSkpOyAvLyBkb3duIGxlZnRcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWxwaE1pbnVzT25lID09IHVuZGVmaW5lZCAmJiBudW1iTWludXNPbmUgPCAxKXsgLy8gY29ybmVyIHVwIGxlZnRcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXRzIGNvcm5lciB1cCBsZWZ0Jyk7XG4gICAgICAgICAgICBjaGVja1JpZ2h0KCk7XG4gICAgICAgICAgICBjaGVja0Rvd24oKTtcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25SaWdodCgpO1xuICAgICAgICAgICAgbWVyZ2VBcnJheSgpOyBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhbHBoUGx1c09uZSA9PSB1bmRlZmluZWQgJiYgbnVtYk1pbnVzT25lIDwgMSl7IC8vIGNvcm5lciBib3R0b20gbGVmdFxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdHMgY29ybmVyIGJvdHRvbSBsZWZ0Jyk7XG4gICAgICAgICAgICBjaGVja1JpZ2h0KCk7XG4gICAgICAgICAgICBjaGVja1VwKCk7XG4gICAgICAgICAgICBjaGVja0RpYWdVcFJpZ2h0KCk7XG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7IFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFscGhNaW51c09uZSA9PSB1bmRlZmluZWQgJiYgbnVtYlBsdXNPbmUgPiAxMCl7IC8vIGNvcm5lciB1cCByaWdodCBcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXRzIGNvcm5lciB1cCByaWdodCcpO1xuICAgICAgICAgICAgY2hlY2tMZWZ0KCk7XG4gICAgICAgICAgICBjaGVja0Rvd24oKTtcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25MZWZ0KCk7XG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7IFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFscGhQbHVzT25lID09IHVuZGVmaW5lZCAmJiBudW1iUGx1c09uZSA+IDEwKXsgLy8gY29ybmVyIGJvdHRvbSByaWdodFxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdHMgY29ybmVyIGJvdHRvbSByaWdodCcpO1xuICAgICAgICAgICAgY2hlY2tMZWZ0KCk7XG4gICAgICAgICAgICBjaGVja1VwKCk7XG4gICAgICAgICAgICBjaGVja0RpYWdVcExlZnQoKTtcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTsgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobnVtYk1pbnVzT25lIDwgMSl7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0IG51bWJlciA9IDAnKTtcbiAgICAgICAgICAgIGNoZWNrUmlnaHQoKTtcbiAgICAgICAgICAgIGNoZWNrVXAoKTtcbiAgICAgICAgICAgIGNoZWNrRG93bigpO1xuICAgICAgICAgICAgY2hlY2tEaWFnVXBSaWdodCgpO1xuICAgICAgICAgICAgY2hlY2tEaWFnRG93blJpZ2h0KCk7XG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKG51bWJQbHVzT25lID4gMTApe1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdCBudW1iZXIgPiAxMCcpO1xuICAgICAgICAgICAgY2hlY2tMZWZ0KCk7XG4gICAgICAgICAgICBjaGVja1VwKCk7XG4gICAgICAgICAgICBjaGVja0Rvd24oKTtcbiAgICAgICAgICAgIGNoZWNrRGlhZ1VwTGVmdCgpO1xuICAgICAgICAgICAgY2hlY2tEaWFnRG93bkxlZnQoKTtcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFscGhNaW51c09uZSA9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdHMgdW5kZWZpbmVkJyk7XG4gICAgICAgICAgICBjaGVja0xlZnQoKTtcbiAgICAgICAgICAgIGNoZWNrUmlnaHQoKTtcbiAgICAgICAgICAgIGNoZWNrRG93bigpO1xuICAgICAgICAgICAgY2hlY2tEaWFnRG93bkxlZnQoKTtcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25SaWdodCgpOyBcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFscGhQbHVzT25lID09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0cyB1bmRlZmluZWQnKTtcbiAgICAgICAgICAgIGNoZWNrTGVmdCgpO1xuICAgICAgICAgICAgY2hlY2tSaWdodCgpO1xuICAgICAgICAgICAgY2hlY2tVcCgpOyBcbiAgICAgICAgICAgIGNoZWNrRGlhZ1VwTGVmdCgpOyBcbiAgICAgICAgICAgIGNoZWNrRGlhZ1VwUmlnaHQoKTtcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgLy8gaG9yaXpvbnRhbCBjaGVja1xuICAgICAgICAgICAgICAgIGNoZWNrTGVmdCgpO1xuICAgICAgICAgICAgICAgIGNoZWNrUmlnaHQoKTtcbiAgICAgICAgICAgICAgICAvLyB2ZXJ0aWNhbCBjaGVja1xuICAgICAgICAgICAgICAgIGNoZWNrVXAoKTtcbiAgICAgICAgICAgICAgICBjaGVja0Rvd24oKTtcbiAgICAgICAgICAgICAgICAvL2RpYWdvbmFsIGxlZnQgY2hlY2tcbiAgICAgICAgICAgICAgICBjaGVja0RpYWdVcExlZnQoKTtcbiAgICAgICAgICAgICAgICBjaGVja0RpYWdEb3duTGVmdCgpO1xuICAgICAgICAgICAgICAgIC8vZGlhZ29uYWwgcmlnaHQgY2hlY2tcbiAgICAgICAgICAgICAgICBjaGVja0RpYWdVcFJpZ2h0KCk7XG4gICAgICAgICAgICAgICAgY2hlY2tEaWFnRG93blJpZ2h0KCk7XG4gICAgICAgICAgICAgICAgbWVyZ2VBcnJheSgpO1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgXG5cbiAgICB9KTtcbiAgICAvLyBjb25zb2xlLmxvZyhvdXRwdXRBcnJheSk7XG4gICAgLy8gY29uc29sZS5sb2cocmVzdWx0QXJyYXkpO1xuICAgIHJldHVybiByZXN1bHRBcnJheVxufVxuXG4vLyBsZXQgYXJyYXkxID0gWydhJywnYicsJ2MnXTtcbi8vIGxldCBhcnJheTIgPSBbJ3onLCdhJywncyddO1xuXG4vLyBsZXQgYXJyYXkzID0gYXJyYXkxLmNvbmNhdChhcnJheTIpO1xuLy8gYXJyYXkzID0gWy4uLm5ldyBTZXQoWy4uLmFycmF5MSwuLi5hcnJheTJdKV1cblxuLy8gY29uc29sZS5sb2coYXJyYXkzKTsgXG5cbi8vIHBsYWNlR2FwKFsnMTBqJ10pO1xuLy8gcGxhY2VHYXAoWycxMGMnLCAnMTBkJywgJzEwZSddKTtcblxuZXhwb3J0IGRlZmF1bHQgcGxhY2VHYXAiLCJmdW5jdGlvbiBwbGFjZVJhbmRvbWl6ZXIobGVuZyl7XG4gICAgY29uc3QgTUFYX0dSSUQgPSAxMDsgLy8gbWF4aW11bSBncmlkIGxlbmd0aCBpcyAxMHgxMFxuICAgIGNvbnN0IHJhbmRvbUF4aXMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTsgLy8gb25seSByZXR1cm4gMC8xXG4gICAgY29uc3QgYXJyYXkgPSBbXTtcbiAgICBjb25zdCBhbHBoYWJldCA9IFwiYWJjZGVmZ2hpalwiO1xuICAgIGNvbnN0IHJhbmRvbU51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChNQVhfR1JJRCAtIGxlbmcpKSArIDE7IC8vIHRoaXMgcmFuZG9taXplciBudW1iZXIga2VlcCB5b3UgZnJvbSBvdmVyZmxvd2luZywgcGx1cyBvbmUgc28gaXQgc3RhcnQgZnJvbSAxIG5vdCAwXG4gICAgY29uc3QgcmFuZG9tQWxwID0gYWxwaGFiZXRbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYWxwaGFiZXQuc3Vic3RyaW5nKDAsKE1BWF9HUklEIC0gbGVuZykpLmxlbmd0aCldOyAvLyB0aGlzIHJhbmRvbWl6ZXIga2VlcHMgeW91IGZyb20gdmFsdWUgbW9yZSB0aGFuIGxlbmd0aFxuICAgIGxldCBhbHBoYU51bTtcblxuICAgIGlmIChyYW5kb21BeGlzID09PSAwKXsgLy8gWCBheGlzIGJsb2Nrc1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8bGVuZzsgaSsrICl7XG4gICAgICAgICAgICBhbHBoYU51bSA9IHJhbmRvbUFscC5jb25jYXQoKHJhbmRvbU51bWJlciArIGkpLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgYXJyYXkucHVzaChhbHBoYU51bSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coYXJyYXkpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhyYW5kb21BeGlzKTtcbiAgICAgICAgcmV0dXJuIGFycmF5XG4gICAgfVxuICAgIGVsc2UgeyAvLyBZIGF4aXMgYmxvY2tzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDxsZW5nOyBpKysgKXtcbiAgICAgICAgICAgIGNvbnN0IGFscExvb3AgPSBhbHBoYWJldC5jaGFyQXQoYWxwaGFiZXQuaW5kZXhPZihyYW5kb21BbHApICsgaSk7XG4gICAgICAgICAgICBhbHBoYU51bSA9IGFscExvb3AuY29uY2F0KChyYW5kb21OdW1iZXIpLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgYXJyYXkucHVzaChhbHBoYU51bSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coYXJyYXkpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhyYW5kb21BeGlzKTtcbiAgICAgICAgcmV0dXJuIGFycmF5XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgcGxhY2VSYW5kb21pemVyIiwiXG4vLyBjb25zdCB5b3VyR2FtZWJvYXJkID0gZ2FtZWJvYXJkKCk7XG4vLyBjb25zdCBodW1hbkdhbWVib2FyZCA9IGdhbWVib2FyZCgpO1xuLy8gY29uc3QgQUlHYW1lYm9hcmQgPSBnYW1lYm9hcmQoKTtcblxuY29uc3QgcGxheWVyID0gKCkgPT4ge1xuICAgIC8vIHBsYXllciBzaG91bGQgdGFrZSB0dXJucyBwbGF5aW5nIHRoZSBnYW1lIGJ5IGF0dGFja2luZyBvcHBvbmVudCdzIGdhbWVib2FyZC5cbiAgICBsZXQgYXR0YWNrU3RhdHVzID0gJ09GRic7XG4gICAgLy8gcGxheWVyIGF0dGFja2luZyBzdGF0ZSBpcyBPTlxuICAgIC8vIHBsYXllciBDSE9PU0UgdGhlIGNvb3JkaW5hdGUgb2Ygb3Bwb25lbnQncyBnYW1lYm9hcmQuXG4gICAgLy8gcGxheWVyIGF0dGFja2luZyBzdGF0ZSBpcyBPRkZcbiAgICAvLyBsZXQgeW91ckdhbWVib2FyZCA9IGdhbWVib2FyZCgpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHRvZ2dsZUF0dGFja09OIDogKCk9PiBhdHRhY2tTdGF0dXMgPSBcIk9OXCIsXG4gICAgICAgIHRvZ2dsZUF0dGFja09GRiA6ICgpPT4gYXR0YWNrU3RhdHVzID0gXCJPRkZcIixcbiAgICAgICAgY2hlY2tBdHRhY2s6ICgpPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYXR0YWNrU3RhdHVzKTsgXG4gICAgICAgICAgICByZXR1cm4gYXR0YWNrU3RhdHVzXG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgIH1cbn1cblxuLy8gbGV0IHBsYXllID0gcGxheWVyKCk7XG5cblxuLy8gcGxheWUuY2hlY2tBdHRhY2soKTtcbi8vIHBsYXllLnRvZ2dsZUF0dGFja09OKCk7XG4vLyBwbGF5ZS5jaGVja0F0dGFjaygpO1xuXG5cbmV4cG9ydCBkZWZhdWx0IHBsYXllcjsiLCJcbmNvbnN0IHNoaXBzID0gKGNvb3JkKSA9PnsgLy8gbGVuZ3RoIHdpbGwgYmUgZnJvbSBzaXplIG9mIHRoZSBzaGlwXG4gICAgLy8gbGV0IGNvb3JkID0gbG9jLnNwbGl0KCcsJyk7XG4gICAgbGV0IGhlYWx0aEJhciA9IGNvb3JkLmxlbmd0aDtcbiAgICByZXR1cm4ge1xuICAgICAgICBsZW5ndGg6ICgpPT57XG4gICAgICAgICAgICByZXR1cm4gbGVuIFxuICAgICAgICB9LFxuICAgICAgICBoaXQ6IChsb2MpPT57XG4gICAgICAgICAgICAvL2dldCB0aGUgYXR0Y2sgaGl0IGxvY2F0aW9uXG4gICAgICAgICAgICBpZiAoY29vcmQuaW5jbHVkZXMobG9jKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJhdHRhY2sgbWlzc2VkXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGNvb3JkLmluY2x1ZGVzKGxvYykgPT09IHRydWUpe1xuICAgICAgICAgICAgICAgIGNvb3JkID0gY29vcmQuZmlsdGVyKCAodmFsKT0+e1xuICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWwgIT09IGxvY1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGhlYWx0aEJhciA9IGhlYWx0aEJhciAtIDE7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL21hcmsgcG9zaXRpb24gaW4gZ2FtZWJvYXJkIGFzIGEgaGl0XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInRoaXMgc2hpcCB0b29rIGhpdDogXCIgKyBudW0pXG4gICAgICAgICAgICAvL3JldHVybiBcbiAgICAgICAgfSxcbiAgICAgICAgaXNTdW5rOiAoKT0+e1xuICAgICAgICAgICAgLy9jaGVjayB0aGUgc2hpcCBpZiBzdW5rZW4geWV0XG4gICAgICAgICAgICBpZihoZWFsdGhCYXIgPD0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzaGlwIGlzIGRlc3Ryb3llZCcpO1xuICAgICAgICAgICAgICAgIHJldHVybiAgXG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NoaXAgaXMgc3RpbGwgaW50YWN0Jyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBcbiAgICAgICAgaGVhbHRoQmFyIDogKCk9PiB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwidGhpcyBzaGlwIGhlYWx0aDogXCIgKyBoZWFsdGhCYXIpO1xuICAgICAgICAgICAgcmV0dXJuIGhlYWx0aEJhclxuICAgICAgICB9LFxuICAgICAgICBsb2NhdGlvbjogKCk9PntcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coY29vcmQpXG4gICAgICAgICAgICByZXR1cm4gY29vcmRcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gY29uc3QgYmlnU2hpcCA9IHNoaXBzKFwiM0EgNEEgNUEgNkEgN0FcIik7XG4vLyBjb25zdCBtaWRTaGlwMiA9IHNoaXBzKFwiMTJBIDEyQiAxMkNcIik7XG4vLyBjb25zdCBzbWFsbFNoaXAgPSBzaGlwcyhcIjRCXCIpO1xuXG4vLyBiaWdTaGlwLmxvY2F0aW9uKCk7XG4vLyBiaWdTaGlwLmhlYWx0aEJhcigpO1xuLy8gYmlnU2hpcC5oaXQoXCIzQVwiKTtcbi8vIGJpZ1NoaXAubG9jYXRpb24oKTtcbi8vIGJpZ1NoaXAuaGVhbHRoQmFyKCk7XG4vLyBiaWdTaGlwLmhpdChcIjhBXCIpO1xuLy8gYmlnU2hpcC5sb2NhdGlvbigpO1xuLy8gYmlnU2hpcC5oZWFsdGhCYXIoKTtcbi8vIGJpZ1NoaXAuaGl0KFwiNEFcIik7XG4vLyBiaWdTaGlwLmhpdChcIjVBXCIpO1xuLy8gYmlnU2hpcC5oaXQoXCI2QVwiKTtcbi8vIGJpZ1NoaXAubG9jYXRpb24oKTtcbi8vIGJpZ1NoaXAuaGVhbHRoQmFyKCk7XG4vLyBiaWdTaGlwLmlzU3VuaygpO1xuLy8gYmlnU2hpcC5oaXQoXCI3QVwiKTtcbi8vIGJpZ1NoaXAubG9jYXRpb24oKTtcbi8vIGJpZ1NoaXAuaGVhbHRoQmFyKCk7XG4vLyBiaWdTaGlwLmlzU3VuaygpO1xuXG5leHBvcnQgZGVmYXVsdCBzaGlwcyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gaW4gdGhpcyBmaWxlIHdlIGFyZSBnb25uYSBnYXRoZXIgYWxsIHRoZSBjb21wb25lbnRzIG9mIEJhdHRsZXNoaXAgVGhlIEdhbWUgYW5kIHR1cm4gaXQgaW50byByZWFsIGdhbWVcblxuLy8gcGxheWVyLiBXaGF0IGRvZXMgcGxheWVyIGRvLlxuLy8gcGxheWVyIHN0YXJ0IHRoZSBnYW1lIGJ5IGNob29zaW5nIHdobyB5b3VyZSBwbGF5aW5nIHdpdGhcbi8vIHBsYXllciBjaG9vc2UgaXMgaXQgZ29ubmEgYmUgdnMgQUkgb3IgdnMgSHVtYW5cbi8vIGF0IHRoaXMgcG9pbnQsIGlmIHlvdSBjaG9vc2UgQUkuIEFJIHdpbGwgYXV0b21hdGljYWxseSBwbGFjZSB0aGVpciBzaGlwcyByYW5kb21seSBvbiBnYW1lYm9hcmQuXG4vLyBwbGF5ZXIgY2hvb3NlIHRoZSBzaGlwcyBwbGFjZW1lbnQgYWNjcm9zcyB0aGUgZ2FtZWJvYXJkLlxuLy8gc2hpcCdzIHBsYWNlbWVudCBpcyBiYXNlZCBvbiBvbmUgcnVsZSB0aGF0IHRoZXJlIGlzIGFsd2F5cyBvbmUgZW1wdHkgYmxvY2sgYmV0d2VlbiBvbmUgYW5kIGFub3RoZXIgcGxhY2VkIHNoaXBzXG4vLyBwbGF5ZXIgaGF2ZSBhIGNob2ljZSB0byByYW5kb21seSBwbGFjZSB0aGUgc2hpcHMgYnkgY2xpY2tpbmcgdGhlIHJhbmRvbSBidXR0b24uIFxuLy8gcGxheWVyIHBsYWNlbWVudCBvcmRlciBpcy4uIGZpcnN0IHlvdSBwbGFjZSBvbmUgYmlnIHNoaXAgKDUgaW4gbGVuZ3RoKSwgdGhlbiB0d28gbWlkIHNoaXAgKDMgaW4gbGVuZ3RoKSwgdGhlbiB0aHJlZSBzbWFsbCBzaGlwICgyIGluIGxlbmd0aCkgXG4vLyBhZnRlciBhbGwgc2hpcHMgYXJlIHBsYWNlZCwgZ2FtZSBpbml0aWF0ZSB0byBzdGFydCBhdHRhY2tpbmcgYnkgY2hvb3NpbmcgdGhlIG9wcG9uZW50cydzIGdhbWVib2FyZC4gVGhpcyBwaGFzZSB5b3UgY291bGQgaGl0IG9wcG9uZW50cydzIHNoaXAuXG4vLyBhZnRlciB5b3UgYXR0YWNrIG9wcG9uZW50J3Mgc2hpcCwgZ2FtZSBhdXRvbWF0aWNhbGx5IGNoYW5nZSB0byBvcHBvbmVudCdzIHR1cm4uIFRoaXMgdGltZSBPcHBvbmVudCdzIHdpbGwgaW5pdGlhdGUgYXR0YWNrIHBsYXllcidzIGdhbWVib2FyZCByYW5kb21seS5cbi8vIFRoZSBBSSBkb2VzIG5vdCBoYXZlIHRvIGJlIHNtYXJ0LCBidXQgaXQgc2hvdWxkIGtub3cgd2hldGhlciBvciBub3QgYSBnaXZlbiBtb3ZlIGlzIGxlZ2FsLiAoaS5lLiBpdCBzaG91bGRu4oCZdCBzaG9vdCB0aGUgc2FtZSBjb29yZGluYXRlIHR3aWNlKS4gXG4vLyBHYW1lIHJlcGVhdGluZyB0aGUgcHJldmlvdXMgc3RlcCB1bnRpbCBvbmUgb2YgdGhlIHBsYXllci9BSSBzaGlwcyBhcmUgZnVsbHkgY2xlYW5lZCAoYWxsIGRlc3Ryb3llZClcbi8vIGdhbWUgZW5kaW5nIGlmIG9uZSBvZiB0aGUgcGxheWVyL0FJIHRvdGFsIGhlYWx0aGJhciAoc2hpcHMpIGFyZSA9IDAuIFxuLy8gMVx0Q2Fycmllclx0NVxuLy8gMlx0QmF0dGxlc2hpcFx0NFxuLy8gM1x0Q3J1aXNlclx0M1xuLy8gNFx0U3VibWFyaW5lXHQzXG4vLyA1XHREZXN0cm95ZXJcdDJcblxuXG5pbXBvcnQgcGxheWVyIGZyb20gXCIuL3BsYXllci5qc1wiO1xuaW1wb3J0IGdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmQuanNcIlxuaW1wb3J0IHNoaXBzIGZyb20gXCIuL3NoaXBzLmpzXCI7XG5pbXBvcnQgcGxhY2VSYW5kb21pemVyIGZyb20gXCIuL3BsYWNlUmFuZG9taXplci5qc1wiO1xuaW1wb3J0IGZpbmRDb21tb25FbGVtZW50cyBmcm9tIFwiLi9maW5kQ29tbW9uRWxlbWVudHMuanNcIjtcbmltcG9ydCBwbGFjZUdhcCBmcm9tIFwiLi9wbGFjZUdhcC5qc1wiO1xuaW1wb3J0IGNyZWF0ZUdyaWQgZnJvbSBcIi4vbGF5b3V0R3JpZC5qc1wiO1xuaW1wb3J0IGxheW91dEdyaWRQbGFjZWRDb2xvciBmcm9tIFwiLi9sYXlvdXRHcmlkUGxhY2VkQ29sb3IuanNcIjtcblxuY3JlYXRlR3JpZCgnQUknKTtcbmNyZWF0ZUdyaWQoJ3BsYXllcicpO1xuY29uc3QgUExBWUVST05FID0gcGxheWVyKCk7IFxuY29uc3QgQUkgPSBwbGF5ZXIoKTtcbmNvbnN0IHBsYXllckdhbWVib2FyZCA9IGdhbWVib2FyZCgpO1xuY29uc3QgQUlHYW1lYm9hcmQgPSBnYW1lYm9hcmQoKTtcbmNvbnN0IGdhbWUgPSBzdGFydEdhbWUoKTtcblxuZnVuY3Rpb24gc3RhcnRHYW1lKCl7XG4gICAgZnVuY3Rpb24gcmFuZG9tUGxhY2VtZW50KGJvYXJkLCB2YWwpeyAvLyB5b3UgY2FuIHVzZSB0aGlzIHJhbmRvbVBsYWNlbWVudCB3aXRoIEFJIG9yIFBsYXllclxuICAgICAgICBsZXQgbmV3U2hpcENvb3JkID0gcGxhY2VSYW5kb21pemVyKHZhbCk7XG4gICAgICAgIGxldCBuZXdTaGlwV2l0aEdhcCA9IHBsYWNlR2FwKG5ld1NoaXBDb29yZCk7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVSYW5kb21pemVXaXRoR2FwKCl7XG4gICAgICAgICAgICBuZXdTaGlwQ29vcmQgPSBwbGFjZVJhbmRvbWl6ZXIodmFsKTtcbiAgICAgICAgICAgIG5ld1NoaXBXaXRoR2FwID0gcGxhY2VHYXAobmV3U2hpcENvb3JkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrQW5kQWRkRWxlbWVudHMobmV3ZXN0LCBjdXJyZW50LCB2YWwpe1xuICAgICAgICAgICAgaWYgKGZpbmRDb21tb25FbGVtZW50cyhuZXdlc3QsIGN1cnJlbnQpID09PSBmYWxzZSl7IC8vIGlmIHRoZXJlIElTIE5PVCBjb21tb24gZWxlbWVudHMgaW5zaWRlIG9mIGJvdGggYXJyYXkgKG5vdCBjbGFzaGVkKSwgcHJvY2VlZCB0byBhZGQgdG8gZ2FtZWJvYXJkXG4gICAgICAgICAgICAgICAgYm9hcmQucGxhY2VtZW50KHNoaXBzKG5ld1NoaXBDb29yZCkpO1xuICAgICAgICAgICAgICAgIGJvYXJkLmFkZEdhcExvY2F0aW9uKHBsYWNlR2FwKG5ld1NoaXBDb29yZCkpO1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7IC8vIGlmIHRoZXJlIElTIGNvbW1vbiBlbGVtZW50IGluc2lkZSBib3RoIGFycmF5LCByYW5kb21pemUgdGhlIHNoaXAgcGxhY2VtZW50IGFnYWluLCB0aGVuIHJlcGVhdCB0aGlzIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2NsYXNoZWQgaW5pdGlhdGUgcmVjdXJlc2UgY2hlY2snKTtcbiAgICAgICAgICAgICAgICByZVJhbmRvbWl6ZVdpdGhHYXAoKTtcbiAgICAgICAgICAgICAgICBjaGVja0FuZEFkZEVsZW1lbnRzKG5ld1NoaXBDb29yZCwgYm9hcmQuYWxsR2FwTG9jYXRpb24sIHZhbCk7IC8vIHJlcGVhdCB0aGlzIGZ1bmN0aW9uIGFnYWluXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3RhcnRzIGhlcmVcbiAgICAgICAgY2hlY2tBbmRBZGRFbGVtZW50cyhuZXdTaGlwV2l0aEdhcCwgYm9hcmQuYWxsR2FwTG9jYXRpb24sIHZhbCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldFNoaXBSYW5kb20oYm9hcmQpe1xuICAgICAgICAvLyBwbGFjZSB0aGUgYm9hcmQgeW91IHVzZSBhbmQgdGhlIGxlbmd0aCBvZiBzaGlwLCB0aGVuIHJhbmRvbVBsYWNlbWVudCgpIHdpbGwgcGxhY2UgaXQgcmFuZG9tbHkgaW5jbHVkaW5nIGdhcCBiZXR3ZWVuIHNoaXBzXG4gICAgICAgIHJhbmRvbVBsYWNlbWVudChib2FyZCw1KTsgXG4gICAgICAgIHJhbmRvbVBsYWNlbWVudChib2FyZCw0KTtcbiAgICAgICAgcmFuZG9tUGxhY2VtZW50KGJvYXJkLDMpO1xuICAgICAgICByYW5kb21QbGFjZW1lbnQoYm9hcmQsMyk7XG4gICAgICAgIHJhbmRvbVBsYWNlbWVudChib2FyZCwyKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZW1wdHlUaGVHYW1lYm9hcmQoYm9hcmQsIHVzZXIpe1xuICAgICAgICBib2FyZC5kZWxldGVBbGxTaGlwKCk7XG4gICAgICAgIGxheW91dEdyaWRQbGFjZWRDb2xvcihib2FyZCwgdXNlcik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGF1dG9BdHRhY2tBSSgpe1xuICAgICAgICAvLyBwaWNrIHJhbmRvbWl6ZWQgZ3JpZCBmcm9tIGxheW91dFxuICAgICAgICAvLyBsYXVuY2ggYXR0YWNrKCkgb24gdGhhdCBncmlkXG4gICAgICAgIC8vIGNoZWNrIGdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKClcbiAgICAgICAgLy8gaWYgbWlzc2VkIG9yIGhpdCByZWNlaXZlQXR0YWNrKCkgd2lsbCBzb3J0IGl0IG91dFxuICAgICAgICAvLyBjaGVjayBnYW1lYm9hcmQuYWxsTG9jYXRpb24oKSB0byBzZWUgaWYgaXQgaXMgZW5kZ2FtZSBvciBub3QgXG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXJ0VnNBSTogKCk9PntcbiAgICAgICAgICAgIGVtcHR5VGhlR2FtZWJvYXJkKHBsYXllckdhbWVib2FyZCwgJ3BsYXllcicpO1xuICAgICAgICAgICAgZW1wdHlUaGVHYW1lYm9hcmQoQUlHYW1lYm9hcmQsICdBSScpO1xuICAgICAgICAgICAgc2V0U2hpcFJhbmRvbShBSUdhbWVib2FyZCk7XG4gICAgICAgICAgICBzZXRTaGlwUmFuZG9tKHBsYXllckdhbWVib2FyZCk7XG4gICAgICAgICAgICBsYXlvdXRHcmlkUGxhY2VkQ29sb3IocGxheWVyR2FtZWJvYXJkLCAncGxheWVyJyk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlc3RhcnRHYW1lOiAoKT0+IHtcbiAgICAgICAgICAgIGVtcHR5VGhlR2FtZWJvYXJkKHBsYXllckdhbWVib2FyZCwgJ3BsYXllcicpO1xuICAgICAgICAgICAgZW1wdHlUaGVHYW1lYm9hcmQoQUlHYW1lYm9hcmQsICdBSScpO1xuICAgICAgICB9LFxuICAgICAgICBhdHRhY2tNb2RlOiAodXNlcik9PiB7XG4gICAgICAgICAgICBjb25zdCBnYW1lbGF5b3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7dXNlcn1HYW1lYm9hcmRgKTtcbiAgICAgICAgICAgIGNvbnN0IGFsbEdyaWQgPSBnYW1lbGF5b3V0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2RpdicpO1xuICAgICAgICAgICAgYWxsR3JpZC5mb3JFYWNoKChncmlkKT0+e1xuICAgICAgICAgICAgICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggZ3JpZC5jbGFzc05hbWUgKyAnIGF0dGFja2VkJyk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzdGFydEdhbWVCdG4oKXtcbiAgICBjb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydEdhbWVCdG4nKTtcbiAgICBjb25zdCByZXN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3RhcnRCdG4nKTtcblxuICAgIHN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcbiAgICAgICAgY29uc29sZS5sb2coJ1BsYXkgdGhlIGdhbWUhJyk7XG4gICAgICAgIGdhbWUuc3RhcnRWc0FJKCk7XG4gICAgICAgIGdhbWUuYXR0YWNrTW9kZSgnQUknKTtcbiAgICB9KTtcbiAgICByZXN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcbiAgICAgICAgY29uc29sZS5sb2coJ3Jlc3RhcnRlZCcpO1xuICAgICAgICBnYW1lLnJlc3RhcnRHYW1lKCk7XG4gICAgfSk7XG59XG5cbnN0YXJ0R2FtZUJ0bigpXG5cbmNvbnNvbGUubG9nKCdHYW1lIFJlYWR5Jyk7XG5leHBvcnQge1BMQVlFUk9ORSwgcGxheWVyR2FtZWJvYXJkLCBBSSwgQUlHYW1lYm9hcmR9Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9