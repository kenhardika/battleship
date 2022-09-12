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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZTs7Ozs7Ozs7Ozs7Ozs7O0FDSGY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsU0FBUyxFQUFDOztBQUV6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0IsNkJBQTZCO0FBQzdCLDZCQUE2QjtBQUM3Qiw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDdEhBO0FBQ0EsNkNBQTZDLEtBQUs7QUFDbEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCLGdCQUFnQjtBQUN0QztBQUNBLDhCQUE4QixJQUFJLEVBQUUsRUFBRTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsaUVBQWU7Ozs7Ozs7Ozs7Ozs7O0FDcEJmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxLQUFLO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCxLQUFLO0FBQzFELDhDQUE4QyxTQUFTO0FBQ3ZEO0FBQ0EsU0FBUztBQUNUO0FBQ0EscURBQXFELEtBQUs7QUFDMUQsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQSxpRUFBZTs7Ozs7Ozs7Ozs7Ozs7QUMzQmY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUVBQXFFO0FBQ3JFO0FBQ0E7QUFDQSxzRUFBc0U7QUFDdEU7QUFDQTtBQUNBLHNFQUFzRTtBQUN0RTtBQUNBO0FBQ0EscUVBQXFFO0FBQ3JFO0FBQ0E7QUFDQSw2RUFBNkU7QUFDN0U7QUFDQTtBQUNBLDRFQUE0RTtBQUM1RTtBQUNBO0FBQ0EsOEVBQThFO0FBQzlFO0FBQ0E7QUFDQSw2RUFBNkU7QUFDN0U7QUFDQSw0REFBNEQ7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRUFBZ0U7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLGlFQUFlOzs7Ozs7Ozs7Ozs7OztBQ3RKZjtBQUNBLHlCQUF5QjtBQUN6QixzREFBc0Q7QUFDdEQ7QUFDQTtBQUNBLDRFQUE0RTtBQUM1RSw0R0FBNEc7QUFDNUc7O0FBRUEsMkJBQTJCO0FBQzNCLHdCQUF3QixTQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLHdCQUF3QixTQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlOzs7Ozs7Ozs7Ozs7Ozs7QUM1QmY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQSxpRUFBZSxNQUFNOzs7Ozs7Ozs7Ozs7Ozs7QUM5QnJCLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlOzs7Ozs7VUN0RWY7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdpQztBQUNLO0FBQ1A7QUFDb0I7QUFDTTtBQUNwQjtBQUNJO0FBQ3NCOztBQUUvRCwwREFBVTtBQUNWLDBEQUFVO0FBQ1Ysa0JBQWtCLHNEQUFNO0FBQ3hCLFdBQVcsc0RBQU07QUFDakIsd0JBQXdCLHlEQUFTO0FBQ2pDLG9CQUFvQix5REFBUztBQUM3Qjs7QUFFQTtBQUNBLDBDQUEwQztBQUMxQywyQkFBMkIsK0RBQWU7QUFDMUMsNkJBQTZCLHdEQUFROztBQUVyQztBQUNBLDJCQUEyQiwrREFBZTtBQUMxQyw2QkFBNkIsd0RBQVE7QUFDckM7O0FBRUE7QUFDQSxnQkFBZ0Isa0VBQWtCLDhCQUE4QjtBQUNoRSxnQ0FBZ0MscURBQUs7QUFDckMscUNBQXFDLHdEQUFRO0FBQzdDO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBLDhFQUE4RTtBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEscUVBQXFCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxxRUFBcUI7QUFDakMsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmluZENvbW1vbkVsZW1lbnRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbGF5b3V0R3JpZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2xheW91dEdyaWRQbGFjZWRDb2xvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYWNlR2FwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxhY2VSYW5kb21pemVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbWFpbmdhbWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZmluZENvbW1vbkVsZW1lbnRzKGFycjEsIGFycjIpIHtcbiAgICByZXR1cm4gYXJyMS5zb21lKGl0ZW0gPT4gYXJyMi5pbmNsdWRlcyhpdGVtKSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgZmluZENvbW1vbkVsZW1lbnRzIiwiXG5jb25zdCBnYW1lYm9hcmQgPSAoKT0+IHtcbiAgICBsZXQgYWxsU2hpcCA9IFtdO1xuICAgIGxldCB0b3RhbEhlYWx0aCA9IDA7XG4gICAgbGV0IGFsbExvY2F0aW9uID0gW107XG4gICAgbGV0IGF0dGFja01pc3NlZCA9IFtdO1xuICAgIGxldCBhbGxHYXBMb2NhdGlvbiA9IFtdO1xuXG4gICAgZnVuY3Rpb24gcmVmcmVzaEFsbExvY2F0aW9uKCl7XG4gICAgICAgIGxldCBuZXdMb2NhdGlvbiA9IFtdO1xuICAgICAgICBhbGxTaGlwLmZvckVhY2goKHNoaXApPT57XG4gICAgICAgICAgICBuZXdMb2NhdGlvbiA9IG5ld0xvY2F0aW9uLmNvbmNhdChzaGlwLmxvY2F0aW9uKCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgYWxsTG9jYXRpb24gPSBuZXdMb2NhdGlvbjtcbiAgICB9XG4gICAgZnVuY3Rpb24gYXR0YWNrTWlzc2VkQ291bnRlcihjb29yKXtcbiAgICAgICAgYXR0YWNrTWlzc2VkLnB1c2goY29vcik7XG4gICAgfVxuXG4gICAgLy9jb25zb2xlLmxvZygnZ2FtZWJvYXJkIGlzIG9uJyk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGxhY2VtZW50OiAoc2hpcHMpPT57IC8vIGRvbnQgbmVlZCBjb29yIHNpbmNlIGNvb3JkaW5hdGUgc2hvdWxkIGJlIGluc2lkZSB0aGUgc2hpcCgpXG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgdGhlIGNvb3JkaW5hdGUgaXMgdmFsaWQsIHdoaWNoIG1lYW5zIGVtcHR5IGFuZCBvbmUgYmxvY2sgYXdheSBmcm9tIGFub3RoZXIgc2hpcFxuICAgICAgICAgICAgLy8gcGxhY2UgdGhlIHNoaXBzIG9uIHRoZSBjb29yZGluYXRlICAgICBcbiAgICAgICAgICAgIGFsbFNoaXAucHVzaChzaGlwcyk7XG4gICAgICAgICAgICBhbGxMb2NhdGlvbiA9IGFsbExvY2F0aW9uLmNvbmNhdChzaGlwcy5sb2NhdGlvbigpKTtcbiAgICAgICAgICAgIC8vIG1hcmtzIHRoZSBjb29yZGluYXRlIHdpdGggc2hpcHMnIG1hcmtzXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfSxcbiAgICAgICAgcmVjZWl2ZUF0dGFjazogKGNvb3IpPT57XG4gICAgICAgICAgICBpZihhbGxMb2NhdGlvbi5pbmNsdWRlcyhjb29yKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBdHRhY2sgbWlzc2VkJylcbiAgICAgICAgICAgICAgICBhdHRhY2tNaXNzZWRDb3VudGVyKGNvb3IpO1xuICAgICAgICAgICAgICAgIHJldHVybiBcbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQXR0YWNrIEhpdCEnKVxuICAgICAgICAgICAgICAgIGFsbFNoaXAuZm9yRWFjaCgoc2hpcCk9PntcbiAgICAgICAgICAgICAgICAgICAgc2hpcC5oaXQoY29vcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gcmVmcmVzaCB0aGUgYWxsTG9jYXRpb24gQXJyYXkgc28geW91IGNhbm5vdCBoaXQgdHdpY2Ugb24gdGhlIHNhbWUgY29vcmRpbmF0ZVxuICAgICAgICAgICAgICAgIHJlZnJlc2hBbGxMb2NhdGlvbigpXG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgLy8gdG9nZ2xlIGNoZWNrQWxsU2hpcCgpIHRvIG1ha2Ugc3VyZSBpZiBpdHMgbm90IGVuZGdhbWVcbiAgICAgICAgICAgIC8vIGlmIG5vdCBtYXJrcyB0aGUgY29vcmRpbmF0ZSB3aXRoIG1pc3NlZEF0dGFjaygpXG4gICAgICAgICAgICAvL3JldHVyblxuICAgICAgICB9LFxuICAgICAgICBjaGVja1RvdGFsSGVhbHRoOiAoKT0+e1xuICAgICAgICAgICAgLy8gY2hlY2sgdGhlIGhlYWx0aGJhciBvZiBlYWNoIHNoaXBzIHdpdGggc2hpcC5oZWFsdGhiYXIoKVxuICAgICAgICAgICAgYWxsU2hpcC5mb3JFYWNoKChzaGlwKT0+e1xuICAgICAgICAgICAgICAgIHNoaXAubG9jYXRpb24oKTsgXG4gICAgICAgICAgICAgICAgdG90YWxIZWFsdGggPSB0b3RhbEhlYWx0aCArIHNoaXAuaGVhbHRoQmFyKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRvdGFsSGVhbHRoKTtcbiAgICAgICAgICAgIC8vIGlmIGFsbCB0aGUgaGVhbHRoYmFyIGlzIDAgdGhlbiB0aGUgZ2FtZSBpcyBlbmRlZFxuICAgICAgICAgICAgaWYodG90YWxIZWFsdGggPD0gMCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHQU1FIE9WRVIgQUxMIE9GIFlPVVIgU0hJUFMgV1JFQ0tFRFwiKVxuICAgICAgICAgICAgICAgIHJldHVybiB0b3RhbEhlYWx0aFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG90YWxIZWFsdGhcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH0sXG4gICAgICAgIGFsbExvY2F0aW9uOiAoKT0+e1xuICAgICAgICAgICAgcmVmcmVzaEFsbExvY2F0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm4gYWxsTG9jYXRpb25cbiAgICAgICAgfSxcbiAgICAgICAgY2hlY2tBbGxMb2NhdGlvbjooKT0+e1xuICAgICAgICAgICAgcmVmcmVzaEFsbExvY2F0aW9uKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhbGxMb2NhdGlvbik7XG4gICAgICAgICAgICByZXR1cm4gYWxsTG9jYXRpb25cbiAgICAgICAgfSxcbiAgICAgICAgZGVsZXRlQWxsU2hpcDogKCk9PiB7XG4gICAgICAgICAgICBhbGxTaGlwLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB0b3RhbEhlYWx0aCA9IDA7XG4gICAgICAgICAgICBhbGxMb2NhdGlvbi5sZW5ndGggPSAwO1xuICAgICAgICAgICAgYXR0YWNrTWlzc2VkLmxlbmd0aD0wO1xuICAgICAgICAgICAgYWxsR2FwTG9jYXRpb24ubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHJlZnJlc2hBbGxMb2NhdGlvbigpO1xuICAgICAgICB9LFxuICAgICAgICBhZGRHYXBMb2NhdGlvbjogKGFycmF5KT0+IHtcbiAgICAgICAgICAgIC8vIGdhcExvY2F0aW9uLnB1c2goYXJyYXkpO1xuICAgICAgICAgICAgYXJyYXkuZm9yRWFjaCgoYXJyKT0+e1xuICAgICAgICAgICAgICAgIGFsbEdhcExvY2F0aW9uLnB1c2goYXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBcbiAgICAgICAgY2hlY2tHYXBMb2NhdGlvbjogKCk9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhbGxHYXBMb2NhdGlvbik7XG4gICAgICAgICAgICByZXR1cm4gYWxsR2FwTG9jYXRpb25cbiAgICAgICAgfSxcbiAgICAgICAgY2hlY2tBdHRhY2tNaXNzZWQ6ICgpPT57XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhdHRhY2tNaXNzZWQpO1xuICAgICAgICAgICAgcmV0dXJuIGF0dGFja01pc3NlZFxuICAgICAgICB9LFxuICAgICAgICBhbGxHYXBMb2NhdGlvblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2FtZWJvYXJkO1xuXG4vLyBjb25zdCBwbGF5YSA9IGdhbWVib2FyZCgpO1xuLy8gY29uc3QgYmlnU2hpcENvb3IgPSAnNkIgN0IgOEIgOUIgMTBCJztcbi8vIGNvbnN0IG1pZFNoaXBDb29yID0gJzRCIDRDIDREJztcbi8vIGNvbnN0IG1pZFNoaXAgPSBzaGlwcyhtaWRTaGlwQ29vcik7XG4vLyBjb25zdCBiaWdTaGlwID0gc2hpcHMoYmlnU2hpcENvb3IpO1xuXG4vLyBwbGF5YS5wbGFjZW1lbnQoYmlnU2hpcCk7XG4vLyBwbGF5YS5wbGFjZW1lbnQobWlkU2hpcCk7XG4vLyBwbGF5YS5yZWNlaXZlQXR0YWNrKFwiNEJcIik7ZGVidWdnZXJcbi8vIHBsYXlhLnJlY2VpdmVBdHRhY2soXCI0Q1wiKTtkZWJ1Z2dlclxuLy8gcGxheWEucmVjZWl2ZUF0dGFjayhcIjREXCIpO2RlYnVnZ2VyXG4vLyBwbGF5YS5yZWNlaXZlQXR0YWNrKFwiM0JcIik7ZGVidWdnZXJcbi8vIHBsYXlhLmNoZWNrQWxsTG9jYXRpb24oKTtcbi8vIHBsYXlhLmNoZWNrQXR0YWNrTWlzc2VkKCk7XG4vLyBwbGF5YS5jaGVja1RvdGFsSGVhbHRoKCk7IFxuLy8gcmV2aXNlIHRoaXNcbi8vIHBsYXlhLnBsYWNlbWVudCgnMUEgMkEgM0EnLCBzaGlwcygzKSk7XG4vLyBwbGF5YS5wbGFjZW1lbnQoJzNCIDRCJywgc2hpcHMoMikpO1xuLy8gcGxheWEucGxhY2VtZW50KCc2QiA3QiA4QiA5QiAxMEInLCBzaGlwcyg1KSk7XG4vLyBwbGF5YS5wbGFjZW1lbnQoJzZFIDdFIDhFIDlFIDEwRScsIHNoaXBzKDUpKTsiLCJcbmZ1bmN0aW9uIGNyZWF0ZUdyaWQod2hvcyl7XG4gICAgY29uc3QgbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt3aG9zfUdhbWVib2FyZGApO1xuICAgIGNvbnN0IE1BWF9XSURUSCA9IDEwO1xuICAgIGNvbnN0IGFscGhhYmV0ID0gJ2FiY2RlZmdoaWonO1xuICAgIGNvbnN0IGFscGhBcnJheSA9IGFscGhhYmV0LnNwbGl0KCcnKTtcblxuICAgIGFscGhBcnJheS5mb3JFYWNoKChhbHApPT57XG4gICAgICAgIGZvciAobGV0IGk9MTsgaSA8PSBNQVhfV0lEVEg7IGkrKyApe1xuICAgICAgICAgICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZ3JpZC5jbGFzc05hbWU9YCR7YWxwfSR7aX1gO1xuICAgICAgICAgICAgLy8gZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZ3JpZC5jbGFzc05hbWUpO1xuICAgICAgICAgICAgICAgIC8vIGNsaWNrZWQgdGhlIGdyaWRcbiAgICAgICAgICAgICAgICAvLyBpbml0aWF0ZSBhdHRhY2soKSAvLyB0aGVuIEFJIGF0dGFjayB5b3VycyB0b29cbiAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICBsYXllci5hcHBlbmQoZ3JpZCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUdyaWQiLCJmdW5jdGlvbiBsYXlvdXRHcmlkUGxhY2VkQ29sb3IoZ2FtZWJvYXJkLCB1c2VyKXtcbiAgICBsZXQgY3VycmVudEdhcCA9IGdhbWVib2FyZC5hbGxHYXBMb2NhdGlvbjtcbiAgICBsZXQgY3VycmVudFNoaXAgPSBnYW1lYm9hcmQuYWxsTG9jYXRpb24oKTtcbiAgICAvLyBjb25zb2xlLmxvZyhjdXJyZW50R2FwKTtcbiAgICBpZiAoY3VycmVudEdhcC5sZW5ndGggPT09IDApe1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0IGFycmF5IGdhcGxvY2F0aW9uIGVtcHR5JylcbiAgICAgICAgY29uc3QgbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt1c2VyfUdhbWVib2FyZGApO1xuICAgICAgICBjb25zdCBnYXAgPSBsYXllci5xdWVyeVNlbGVjdG9yQWxsKCdkaXYnKTtcbiAgICAgICAgICAgIGdhcC5mb3JFYWNoKChnKT0+e1xuICAgICAgICAgICAgICAgIGcuY2xhc3NMaXN0LnJlbW92ZSgnZ2FwJyk7XG4gICAgICAgICAgICAgICAgZy5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwJyk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGN1cnJlbnRHYXAuZm9yRWFjaCgoYXJyYXlMb2MpPT57XG4gICAgICAgICAgICBjb25zdCBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3VzZXJ9R2FtZWJvYXJkYCk7XG4gICAgICAgICAgICBsZXQgZ2FwID0gbGF5ZXIucXVlcnlTZWxlY3RvcihgLiR7YXJyYXlMb2N9YCk7XG4gICAgICAgICAgICBnYXAuY2xhc3NMaXN0LmFkZCgnZ2FwJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBjdXJyZW50U2hpcC5mb3JFYWNoKChjdXJzaGlwKT0+e1xuICAgICAgICAgICAgY29uc3QgbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt1c2VyfUdhbWVib2FyZGApO1xuICAgICAgICAgICAgbGV0IHNoaXAgPSBsYXllci5xdWVyeVNlbGVjdG9yKGAuJHtjdXJzaGlwfWApO1xuICAgICAgICAgICAgc2hpcC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbGF5b3V0R3JpZFBsYWNlZENvbG9yIiwiLy8gc2V0IGdhcCBieSBvbmUgYnkgb25lIGxvb3AgY2hlY2tcblxuZnVuY3Rpb24gcGxhY2VHYXAobWFpbkFycmF5KXtcbiAgICBsZXQgb3V0cHV0QXJyYXkgPSBbXTtcbiAgICBsZXQgcmVzdWx0QXJyYXkgPSBbXTtcbiAgICBjb25zdCBudW1iZXJQYXR0ID0gL1swLTldL2c7XG4gICAgY29uc3QgYWxwaGFQYXR0ID0gL1thLXpBLVpdL2c7XG4gICAgY29uc3QgYWxwaGFiZXRNYXggPSAnYWJjZGVmZ2hpaic7XG4gICAgY29uc3QgYWxwQXJyYXkgPSBhbHBoYWJldE1heC5zcGxpdCgnJyk7XG4gICAgbWFpbkFycmF5LmZvckVhY2goKHZhbCk9PntcbiAgICAgICAgY29uc3QgbnVtYiA9IHBhcnNlSW50KHZhbC5tYXRjaChudW1iZXJQYXR0KS5qb2luKCcnKSk7XG4gICAgICAgIGNvbnN0IGFscGggPSB2YWwubWF0Y2goYWxwaGFQYXR0KS5qb2luKCcnKTtcbiAgICAgICAgY29uc3QgbnVtYk1pbnVzT25lID0gbnVtYiAtIDE7XG4gICAgICAgIGNvbnN0IG51bWJQbHVzT25lID0gbnVtYiArIDE7XG4gICAgICAgIGNvbnN0IGFscGhQbHVzT25lID0gYWxwQXJyYXlbKGFscEFycmF5LmluZGV4T2YoYWxwaCkpKzFdO1xuICAgICAgICBjb25zdCBhbHBoTWludXNPbmUgPSBhbHBBcnJheVsoYWxwQXJyYXkuaW5kZXhPZihhbHBoKSktMV07XG4gICAgICAgIFxuICAgICAgICBmdW5jdGlvbiBtZXJnZUFycmF5KCl7XG4gICAgICAgICAgICAgIC8vIG1lcmdlIHRoZSBhcnJheVxuICAgICAgICAgICAgcmVzdWx0QXJyYXkgPSByZXN1bHRBcnJheS5jb25jYXQob3V0cHV0QXJyYXkpO1xuICAgICAgICAgICAgcmVzdWx0QXJyYXkgPSBbLi4ubmV3IFNldCAoWy4uLm1haW5BcnJheSwuLi5vdXRwdXRBcnJheV0pXTsgIFxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrUmlnaHQoKXtcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaC5jb25jYXQoKG51bWJQbHVzT25lKS50b1N0cmluZygpKSk7IC8vIHJpZ2h0XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tMZWZ0KCl7XG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKGFscGguY29uY2F0KChudW1iTWludXNPbmUpLnRvU3RyaW5nKCkpKTsgLy8gbGVmdFxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrVXAoKXtcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaE1pbnVzT25lLmNvbmNhdCgobnVtYikudG9TdHJpbmcoKSkpOyAvLyB1cFxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrRG93bigpe1xuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaChhbHBoUGx1c09uZS5jb25jYXQoKG51bWIpLnRvU3RyaW5nKCkpKTsgLy8gZG93blxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrRGlhZ1VwUmlnaHQoKXtcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaE1pbnVzT25lLmNvbmNhdCgobnVtYlBsdXNPbmUpLnRvU3RyaW5nKCkpKTsgLy8gdXAgcmlnaHRcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBjaGVja0RpYWdEb3duUmlnaHQoKXtcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaFBsdXNPbmUuY29uY2F0KChudW1iUGx1c09uZSkudG9TdHJpbmcoKSkpOyAvLyBkb3duIHJpZ2h0XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tEaWFnVXBMZWZ0KCl7XG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKGFscGhNaW51c09uZS5jb25jYXQoKG51bWJNaW51c09uZSkudG9TdHJpbmcoKSkpOyAvLyB1cCBsZWZ0XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tEaWFnRG93bkxlZnQoKXtcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaFBsdXNPbmUuY29uY2F0KChudW1iTWludXNPbmUpLnRvU3RyaW5nKCkpKTsgLy8gZG93biBsZWZ0XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFscGhNaW51c09uZSA9PSB1bmRlZmluZWQgJiYgbnVtYk1pbnVzT25lIDwgMSl7IC8vIGNvcm5lciB1cCBsZWZ0XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0cyBjb3JuZXIgdXAgbGVmdCcpO1xuICAgICAgICAgICAgY2hlY2tSaWdodCgpO1xuICAgICAgICAgICAgY2hlY2tEb3duKCk7XG4gICAgICAgICAgICBjaGVja0RpYWdEb3duUmlnaHQoKTtcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTsgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYWxwaFBsdXNPbmUgPT0gdW5kZWZpbmVkICYmIG51bWJNaW51c09uZSA8IDEpeyAvLyBjb3JuZXIgYm90dG9tIGxlZnRcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXRzIGNvcm5lciBib3R0b20gbGVmdCcpO1xuICAgICAgICAgICAgY2hlY2tSaWdodCgpO1xuICAgICAgICAgICAgY2hlY2tVcCgpO1xuICAgICAgICAgICAgY2hlY2tEaWFnVXBSaWdodCgpO1xuICAgICAgICAgICAgbWVyZ2VBcnJheSgpOyBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhbHBoTWludXNPbmUgPT0gdW5kZWZpbmVkICYmIG51bWJQbHVzT25lID4gMTApeyAvLyBjb3JuZXIgdXAgcmlnaHQgXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0cyBjb3JuZXIgdXAgcmlnaHQnKTtcbiAgICAgICAgICAgIGNoZWNrTGVmdCgpO1xuICAgICAgICAgICAgY2hlY2tEb3duKCk7XG4gICAgICAgICAgICBjaGVja0RpYWdEb3duTGVmdCgpO1xuICAgICAgICAgICAgbWVyZ2VBcnJheSgpOyBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhbHBoUGx1c09uZSA9PSB1bmRlZmluZWQgJiYgbnVtYlBsdXNPbmUgPiAxMCl7IC8vIGNvcm5lciBib3R0b20gcmlnaHRcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXRzIGNvcm5lciBib3R0b20gcmlnaHQnKTtcbiAgICAgICAgICAgIGNoZWNrTGVmdCgpO1xuICAgICAgICAgICAgY2hlY2tVcCgpO1xuICAgICAgICAgICAgY2hlY2tEaWFnVXBMZWZ0KCk7XG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7IFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG51bWJNaW51c09uZSA8IDEpe1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdCBudW1iZXIgPSAwJyk7XG4gICAgICAgICAgICBjaGVja1JpZ2h0KCk7XG4gICAgICAgICAgICBjaGVja1VwKCk7XG4gICAgICAgICAgICBjaGVja0Rvd24oKTtcbiAgICAgICAgICAgIGNoZWNrRGlhZ1VwUmlnaHQoKTtcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25SaWdodCgpO1xuICAgICAgICAgICAgbWVyZ2VBcnJheSgpO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihudW1iUGx1c09uZSA+IDEwKXtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXQgbnVtYmVyID4gMTAnKTtcbiAgICAgICAgICAgIGNoZWNrTGVmdCgpO1xuICAgICAgICAgICAgY2hlY2tVcCgpO1xuICAgICAgICAgICAgY2hlY2tEb3duKCk7XG4gICAgICAgICAgICBjaGVja0RpYWdVcExlZnQoKTtcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25MZWZ0KCk7XG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhbHBoTWludXNPbmUgPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXRzIHVuZGVmaW5lZCcpO1xuICAgICAgICAgICAgY2hlY2tMZWZ0KCk7XG4gICAgICAgICAgICBjaGVja1JpZ2h0KCk7XG4gICAgICAgICAgICBjaGVja0Rvd24oKTtcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25MZWZ0KCk7XG4gICAgICAgICAgICBjaGVja0RpYWdEb3duUmlnaHQoKTsgXG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhbHBoUGx1c09uZSA9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdHMgdW5kZWZpbmVkJyk7XG4gICAgICAgICAgICBjaGVja0xlZnQoKTtcbiAgICAgICAgICAgIGNoZWNrUmlnaHQoKTtcbiAgICAgICAgICAgIGNoZWNrVXAoKTsgXG4gICAgICAgICAgICBjaGVja0RpYWdVcExlZnQoKTsgXG4gICAgICAgICAgICBjaGVja0RpYWdVcFJpZ2h0KCk7XG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8vIGhvcml6b250YWwgY2hlY2tcbiAgICAgICAgICAgICAgICBjaGVja0xlZnQoKTtcbiAgICAgICAgICAgICAgICBjaGVja1JpZ2h0KCk7XG4gICAgICAgICAgICAgICAgLy8gdmVydGljYWwgY2hlY2tcbiAgICAgICAgICAgICAgICBjaGVja1VwKCk7XG4gICAgICAgICAgICAgICAgY2hlY2tEb3duKCk7XG4gICAgICAgICAgICAgICAgLy9kaWFnb25hbCBsZWZ0IGNoZWNrXG4gICAgICAgICAgICAgICAgY2hlY2tEaWFnVXBMZWZ0KCk7XG4gICAgICAgICAgICAgICAgY2hlY2tEaWFnRG93bkxlZnQoKTtcbiAgICAgICAgICAgICAgICAvL2RpYWdvbmFsIHJpZ2h0IGNoZWNrXG4gICAgICAgICAgICAgICAgY2hlY2tEaWFnVXBSaWdodCgpO1xuICAgICAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25SaWdodCgpO1xuICAgICAgICAgICAgICAgIG1lcmdlQXJyYXkoKTtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIFxuXG4gICAgfSk7XG4gICAgLy8gY29uc29sZS5sb2cob3V0cHV0QXJyYXkpO1xuICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdEFycmF5KTtcbiAgICByZXR1cm4gcmVzdWx0QXJyYXlcbn1cblxuLy8gbGV0IGFycmF5MSA9IFsnYScsJ2InLCdjJ107XG4vLyBsZXQgYXJyYXkyID0gWyd6JywnYScsJ3MnXTtcblxuLy8gbGV0IGFycmF5MyA9IGFycmF5MS5jb25jYXQoYXJyYXkyKTtcbi8vIGFycmF5MyA9IFsuLi5uZXcgU2V0KFsuLi5hcnJheTEsLi4uYXJyYXkyXSldXG5cbi8vIGNvbnNvbGUubG9nKGFycmF5Myk7IFxuXG4vLyBwbGFjZUdhcChbJzEwaiddKTtcbi8vIHBsYWNlR2FwKFsnMTBjJywgJzEwZCcsICcxMGUnXSk7XG5cbmV4cG9ydCBkZWZhdWx0IHBsYWNlR2FwIiwiZnVuY3Rpb24gcGxhY2VSYW5kb21pemVyKGxlbmcpe1xuICAgIGNvbnN0IE1BWF9HUklEID0gMTA7IC8vIG1heGltdW0gZ3JpZCBsZW5ndGggaXMgMTB4MTBcbiAgICBjb25zdCByYW5kb21BeGlzID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7IC8vIG9ubHkgcmV0dXJuIDAvMVxuICAgIGNvbnN0IGFycmF5ID0gW107XG4gICAgY29uc3QgYWxwaGFiZXQgPSBcImFiY2RlZmdoaWpcIjtcbiAgICBjb25zdCByYW5kb21OdW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoTUFYX0dSSUQgLSBsZW5nKSkgKyAxOyAvLyB0aGlzIHJhbmRvbWl6ZXIgbnVtYmVyIGtlZXAgeW91IGZyb20gb3ZlcmZsb3dpbmcsIHBsdXMgb25lIHNvIGl0IHN0YXJ0IGZyb20gMSBub3QgMFxuICAgIGNvbnN0IHJhbmRvbUFscCA9IGFscGhhYmV0W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFscGhhYmV0LnN1YnN0cmluZygwLChNQVhfR1JJRCAtIGxlbmcpKS5sZW5ndGgpXTsgLy8gdGhpcyByYW5kb21pemVyIGtlZXBzIHlvdSBmcm9tIHZhbHVlIG1vcmUgdGhhbiBsZW5ndGhcbiAgICBsZXQgYWxwaGFOdW07XG5cbiAgICBpZiAocmFuZG9tQXhpcyA9PT0gMCl7IC8vIFggYXhpcyBibG9ja3NcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPGxlbmc7IGkrKyApe1xuICAgICAgICAgICAgYWxwaGFOdW0gPSByYW5kb21BbHAuY29uY2F0KChyYW5kb21OdW1iZXIgKyBpKS50b1N0cmluZygpKTtcbiAgICAgICAgICAgIGFycmF5LnB1c2goYWxwaGFOdW0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGFycmF5KTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmFuZG9tQXhpcyk7XG4gICAgICAgIHJldHVybiBhcnJheVxuICAgIH1cbiAgICBlbHNlIHsgLy8gWSBheGlzIGJsb2Nrc1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8bGVuZzsgaSsrICl7XG4gICAgICAgICAgICBjb25zdCBhbHBMb29wID0gYWxwaGFiZXQuY2hhckF0KGFscGhhYmV0LmluZGV4T2YocmFuZG9tQWxwKSArIGkpO1xuICAgICAgICAgICAgYWxwaGFOdW0gPSBhbHBMb29wLmNvbmNhdCgocmFuZG9tTnVtYmVyKS50b1N0cmluZygpKTtcbiAgICAgICAgICAgIGFycmF5LnB1c2goYWxwaGFOdW0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGFycmF5KTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmFuZG9tQXhpcyk7XG4gICAgICAgIHJldHVybiBhcnJheVxuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IHBsYWNlUmFuZG9taXplciIsIlxuLy8gY29uc3QgeW91ckdhbWVib2FyZCA9IGdhbWVib2FyZCgpO1xuLy8gY29uc3QgaHVtYW5HYW1lYm9hcmQgPSBnYW1lYm9hcmQoKTtcbi8vIGNvbnN0IEFJR2FtZWJvYXJkID0gZ2FtZWJvYXJkKCk7XG5cbmNvbnN0IHBsYXllciA9ICgpID0+IHtcbiAgICAvLyBwbGF5ZXIgc2hvdWxkIHRha2UgdHVybnMgcGxheWluZyB0aGUgZ2FtZSBieSBhdHRhY2tpbmcgb3Bwb25lbnQncyBnYW1lYm9hcmQuXG4gICAgbGV0IGF0dGFja1N0YXR1cyA9ICdPRkYnO1xuICAgIC8vIHBsYXllciBhdHRhY2tpbmcgc3RhdGUgaXMgT05cbiAgICAvLyBwbGF5ZXIgQ0hPT1NFIHRoZSBjb29yZGluYXRlIG9mIG9wcG9uZW50J3MgZ2FtZWJvYXJkLlxuICAgIC8vIHBsYXllciBhdHRhY2tpbmcgc3RhdGUgaXMgT0ZGXG4gICAgLy8gbGV0IHlvdXJHYW1lYm9hcmQgPSBnYW1lYm9hcmQoKTtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b2dnbGVBdHRhY2tPTiA6ICgpPT4gYXR0YWNrU3RhdHVzID0gXCJPTlwiLFxuICAgICAgICB0b2dnbGVBdHRhY2tPRkYgOiAoKT0+IGF0dGFja1N0YXR1cyA9IFwiT0ZGXCIsXG4gICAgICAgIGNoZWNrQXR0YWNrOiAoKT0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGF0dGFja1N0YXR1cyk7IFxuICAgICAgICAgICAgcmV0dXJuIGF0dGFja1N0YXR1c1xuICAgICAgICB9LFxuICAgICAgICBcbiAgICB9XG59XG5cbi8vIGxldCBwbGF5ZSA9IHBsYXllcigpO1xuXG5cbi8vIHBsYXllLmNoZWNrQXR0YWNrKCk7XG4vLyBwbGF5ZS50b2dnbGVBdHRhY2tPTigpO1xuLy8gcGxheWUuY2hlY2tBdHRhY2soKTtcblxuXG5leHBvcnQgZGVmYXVsdCBwbGF5ZXI7IiwiXG5jb25zdCBzaGlwcyA9IChjb29yZCkgPT57IC8vIGxlbmd0aCB3aWxsIGJlIGZyb20gc2l6ZSBvZiB0aGUgc2hpcFxuICAgIC8vIGxldCBjb29yZCA9IGxvYy5zcGxpdCgnLCcpO1xuICAgIGxldCBoZWFsdGhCYXIgPSBjb29yZC5sZW5ndGg7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbGVuZ3RoOiAoKT0+e1xuICAgICAgICAgICAgcmV0dXJuIGxlbiBcbiAgICAgICAgfSxcbiAgICAgICAgaGl0OiAobG9jKT0+e1xuICAgICAgICAgICAgLy9nZXQgdGhlIGF0dGNrIGhpdCBsb2NhdGlvblxuICAgICAgICAgICAgaWYgKGNvb3JkLmluY2x1ZGVzKGxvYykgPT09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiYXR0YWNrIG1pc3NlZFwiKVxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihjb29yZC5pbmNsdWRlcyhsb2MpID09PSB0cnVlKXtcbiAgICAgICAgICAgICAgICBjb29yZCA9IGNvb3JkLmZpbHRlciggKHZhbCk9PntcbiAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsICE9PSBsb2NcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBoZWFsdGhCYXIgPSBoZWFsdGhCYXIgLSAxO1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9tYXJrIHBvc2l0aW9uIGluIGdhbWVib2FyZCBhcyBhIGhpdFxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ0aGlzIHNoaXAgdG9vayBoaXQ6IFwiICsgbnVtKVxuICAgICAgICAgICAgLy9yZXR1cm4gXG4gICAgICAgIH0sXG4gICAgICAgIGlzU3VuazogKCk9PntcbiAgICAgICAgICAgIC8vY2hlY2sgdGhlIHNoaXAgaWYgc3Vua2VuIHlldFxuICAgICAgICAgICAgaWYoaGVhbHRoQmFyIDw9IDApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2hpcCBpcyBkZXN0cm95ZWQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gIFxuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzaGlwIGlzIHN0aWxsIGludGFjdCcpO1xuICAgICAgICAgICAgICAgIHJldHVybiBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgXG4gICAgICAgIGhlYWx0aEJhciA6ICgpPT4ge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInRoaXMgc2hpcCBoZWFsdGg6IFwiICsgaGVhbHRoQmFyKTtcbiAgICAgICAgICAgIHJldHVybiBoZWFsdGhCYXJcbiAgICAgICAgfSxcbiAgICAgICAgbG9jYXRpb246ICgpPT57XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGNvb3JkKVxuICAgICAgICAgICAgcmV0dXJuIGNvb3JkXG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIGNvbnN0IGJpZ1NoaXAgPSBzaGlwcyhcIjNBIDRBIDVBIDZBIDdBXCIpO1xuLy8gY29uc3QgbWlkU2hpcDIgPSBzaGlwcyhcIjEyQSAxMkIgMTJDXCIpO1xuLy8gY29uc3Qgc21hbGxTaGlwID0gc2hpcHMoXCI0QlwiKTtcblxuLy8gYmlnU2hpcC5sb2NhdGlvbigpO1xuLy8gYmlnU2hpcC5oZWFsdGhCYXIoKTtcbi8vIGJpZ1NoaXAuaGl0KFwiM0FcIik7XG4vLyBiaWdTaGlwLmxvY2F0aW9uKCk7XG4vLyBiaWdTaGlwLmhlYWx0aEJhcigpO1xuLy8gYmlnU2hpcC5oaXQoXCI4QVwiKTtcbi8vIGJpZ1NoaXAubG9jYXRpb24oKTtcbi8vIGJpZ1NoaXAuaGVhbHRoQmFyKCk7XG4vLyBiaWdTaGlwLmhpdChcIjRBXCIpO1xuLy8gYmlnU2hpcC5oaXQoXCI1QVwiKTtcbi8vIGJpZ1NoaXAuaGl0KFwiNkFcIik7XG4vLyBiaWdTaGlwLmxvY2F0aW9uKCk7XG4vLyBiaWdTaGlwLmhlYWx0aEJhcigpO1xuLy8gYmlnU2hpcC5pc1N1bmsoKTtcbi8vIGJpZ1NoaXAuaGl0KFwiN0FcIik7XG4vLyBiaWdTaGlwLmxvY2F0aW9uKCk7XG4vLyBiaWdTaGlwLmhlYWx0aEJhcigpO1xuLy8gYmlnU2hpcC5pc1N1bmsoKTtcblxuZXhwb3J0IGRlZmF1bHQgc2hpcHMiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIGluIHRoaXMgZmlsZSB3ZSBhcmUgZ29ubmEgZ2F0aGVyIGFsbCB0aGUgY29tcG9uZW50cyBvZiBCYXR0bGVzaGlwIFRoZSBHYW1lIGFuZCB0dXJuIGl0IGludG8gcmVhbCBnYW1lXG5cbi8vIHBsYXllci4gV2hhdCBkb2VzIHBsYXllciBkby5cbi8vIHBsYXllciBzdGFydCB0aGUgZ2FtZSBieSBjaG9vc2luZyB3aG8geW91cmUgcGxheWluZyB3aXRoXG4vLyBwbGF5ZXIgY2hvb3NlIGlzIGl0IGdvbm5hIGJlIHZzIEFJIG9yIHZzIEh1bWFuXG4vLyBhdCB0aGlzIHBvaW50LCBpZiB5b3UgY2hvb3NlIEFJLiBBSSB3aWxsIGF1dG9tYXRpY2FsbHkgcGxhY2UgdGhlaXIgc2hpcHMgcmFuZG9tbHkgb24gZ2FtZWJvYXJkLlxuLy8gcGxheWVyIGNob29zZSB0aGUgc2hpcHMgcGxhY2VtZW50IGFjY3Jvc3MgdGhlIGdhbWVib2FyZC5cbi8vIHNoaXAncyBwbGFjZW1lbnQgaXMgYmFzZWQgb24gb25lIHJ1bGUgdGhhdCB0aGVyZSBpcyBhbHdheXMgb25lIGVtcHR5IGJsb2NrIGJldHdlZW4gb25lIGFuZCBhbm90aGVyIHBsYWNlZCBzaGlwc1xuLy8gcGxheWVyIGhhdmUgYSBjaG9pY2UgdG8gcmFuZG9tbHkgcGxhY2UgdGhlIHNoaXBzIGJ5IGNsaWNraW5nIHRoZSByYW5kb20gYnV0dG9uLiBcbi8vIHBsYXllciBwbGFjZW1lbnQgb3JkZXIgaXMuLiBmaXJzdCB5b3UgcGxhY2Ugb25lIGJpZyBzaGlwICg1IGluIGxlbmd0aCksIHRoZW4gdHdvIG1pZCBzaGlwICgzIGluIGxlbmd0aCksIHRoZW4gdGhyZWUgc21hbGwgc2hpcCAoMiBpbiBsZW5ndGgpIFxuLy8gYWZ0ZXIgYWxsIHNoaXBzIGFyZSBwbGFjZWQsIGdhbWUgaW5pdGlhdGUgdG8gc3RhcnQgYXR0YWNraW5nIGJ5IGNob29zaW5nIHRoZSBvcHBvbmVudHMncyBnYW1lYm9hcmQuIFRoaXMgcGhhc2UgeW91IGNvdWxkIGhpdCBvcHBvbmVudHMncyBzaGlwLlxuLy8gYWZ0ZXIgeW91IGF0dGFjayBvcHBvbmVudCdzIHNoaXAsIGdhbWUgYXV0b21hdGljYWxseSBjaGFuZ2UgdG8gb3Bwb25lbnQncyB0dXJuLiBUaGlzIHRpbWUgT3Bwb25lbnQncyB3aWxsIGluaXRpYXRlIGF0dGFjayBwbGF5ZXIncyBnYW1lYm9hcmQgcmFuZG9tbHkuXG4vLyBUaGUgQUkgZG9lcyBub3QgaGF2ZSB0byBiZSBzbWFydCwgYnV0IGl0IHNob3VsZCBrbm93IHdoZXRoZXIgb3Igbm90IGEgZ2l2ZW4gbW92ZSBpcyBsZWdhbC4gKGkuZS4gaXQgc2hvdWxkbuKAmXQgc2hvb3QgdGhlIHNhbWUgY29vcmRpbmF0ZSB0d2ljZSkuIFxuLy8gR2FtZSByZXBlYXRpbmcgdGhlIHByZXZpb3VzIHN0ZXAgdW50aWwgb25lIG9mIHRoZSBwbGF5ZXIvQUkgc2hpcHMgYXJlIGZ1bGx5IGNsZWFuZWQgKGFsbCBkZXN0cm95ZWQpXG4vLyBnYW1lIGVuZGluZyBpZiBvbmUgb2YgdGhlIHBsYXllci9BSSB0b3RhbCBoZWFsdGhiYXIgKHNoaXBzKSBhcmUgPSAwLiBcbi8vIDFcdENhcnJpZXJcdDVcbi8vIDJcdEJhdHRsZXNoaXBcdDRcbi8vIDNcdENydWlzZXJcdDNcbi8vIDRcdFN1Ym1hcmluZVx0M1xuLy8gNVx0RGVzdHJveWVyXHQyXG5cblxuaW1wb3J0IHBsYXllciBmcm9tIFwiLi9wbGF5ZXIuanNcIjtcbmltcG9ydCBnYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCJcbmltcG9ydCBzaGlwcyBmcm9tIFwiLi9zaGlwcy5qc1wiO1xuaW1wb3J0IHBsYWNlUmFuZG9taXplciBmcm9tIFwiLi9wbGFjZVJhbmRvbWl6ZXIuanNcIjtcbmltcG9ydCBmaW5kQ29tbW9uRWxlbWVudHMgZnJvbSBcIi4vZmluZENvbW1vbkVsZW1lbnRzLmpzXCI7XG5pbXBvcnQgcGxhY2VHYXAgZnJvbSBcIi4vcGxhY2VHYXAuanNcIjtcbmltcG9ydCBjcmVhdGVHcmlkIGZyb20gXCIuL2xheW91dEdyaWQuanNcIjtcbmltcG9ydCBsYXlvdXRHcmlkUGxhY2VkQ29sb3IgZnJvbSBcIi4vbGF5b3V0R3JpZFBsYWNlZENvbG9yLmpzXCI7XG5cbmNyZWF0ZUdyaWQoJ0FJJyk7XG5jcmVhdGVHcmlkKCdwbGF5ZXInKTtcbmNvbnN0IFBMQVlFUk9ORSA9IHBsYXllcigpOyBcbmNvbnN0IEFJID0gcGxheWVyKCk7XG5jb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBnYW1lYm9hcmQoKTtcbmNvbnN0IEFJR2FtZWJvYXJkID0gZ2FtZWJvYXJkKCk7XG5jb25zdCBnYW1lID0gc3RhcnRHYW1lKCk7XG5cbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpe1xuICAgIGZ1bmN0aW9uIHJhbmRvbVBsYWNlbWVudChib2FyZCwgdmFsKXsgLy8geW91IGNhbiB1c2UgdGhpcyByYW5kb21QbGFjZW1lbnQgd2l0aCBBSSBvciBQbGF5ZXJcbiAgICAgICAgbGV0IG5ld1NoaXBDb29yZCA9IHBsYWNlUmFuZG9taXplcih2YWwpO1xuICAgICAgICBsZXQgbmV3U2hpcFdpdGhHYXAgPSBwbGFjZUdhcChuZXdTaGlwQ29vcmQpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHJlUmFuZG9taXplV2l0aEdhcCgpe1xuICAgICAgICAgICAgbmV3U2hpcENvb3JkID0gcGxhY2VSYW5kb21pemVyKHZhbCk7XG4gICAgICAgICAgICBuZXdTaGlwV2l0aEdhcCA9IHBsYWNlR2FwKG5ld1NoaXBDb29yZCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjaGVja0FuZEFkZEVsZW1lbnRzKG5ld2VzdCwgY3VycmVudCwgdmFsKXtcbiAgICAgICAgICAgIGlmIChmaW5kQ29tbW9uRWxlbWVudHMobmV3ZXN0LCBjdXJyZW50KSA9PT0gZmFsc2UpeyAvLyBpZiB0aGVyZSBJUyBOT1QgY29tbW9uIGVsZW1lbnRzIGluc2lkZSBvZiBib3RoIGFycmF5IChub3QgY2xhc2hlZCksIHByb2NlZWQgdG8gYWRkIHRvIGdhbWVib2FyZFxuICAgICAgICAgICAgICAgIGJvYXJkLnBsYWNlbWVudChzaGlwcyhuZXdTaGlwQ29vcmQpKTtcbiAgICAgICAgICAgICAgICBib2FyZC5hZGRHYXBMb2NhdGlvbihwbGFjZUdhcChuZXdTaGlwQ29vcmQpKTtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgeyAvLyBpZiB0aGVyZSBJUyBjb21tb24gZWxlbWVudCBpbnNpZGUgYm90aCBhcnJheSwgcmFuZG9taXplIHRoZSBzaGlwIHBsYWNlbWVudCBhZ2FpbiwgdGhlbiByZXBlYXQgdGhpcyBmdW5jdGlvblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdjbGFzaGVkIGluaXRpYXRlIHJlY3VyZXNlIGNoZWNrJyk7XG4gICAgICAgICAgICAgICAgcmVSYW5kb21pemVXaXRoR2FwKCk7XG4gICAgICAgICAgICAgICAgY2hlY2tBbmRBZGRFbGVtZW50cyhuZXdTaGlwQ29vcmQsIGJvYXJkLmFsbEdhcExvY2F0aW9uLCB2YWwpOyAvLyByZXBlYXQgdGhpcyBmdW5jdGlvbiBhZ2FpblxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHN0YXJ0cyBoZXJlXG4gICAgICAgIGNoZWNrQW5kQWRkRWxlbWVudHMobmV3U2hpcFdpdGhHYXAsIGJvYXJkLmFsbEdhcExvY2F0aW9uLCB2YWwpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRTaGlwUmFuZG9tKGJvYXJkKXtcbiAgICAgICAgLy8gcGxhY2UgdGhlIGJvYXJkIHlvdSB1c2UgYW5kIHRoZSBsZW5ndGggb2Ygc2hpcCwgdGhlbiByYW5kb21QbGFjZW1lbnQoKSB3aWxsIHBsYWNlIGl0IHJhbmRvbWx5IGluY2x1ZGluZyBnYXAgYmV0d2VlbiBzaGlwc1xuICAgICAgICByYW5kb21QbGFjZW1lbnQoYm9hcmQsNSk7IFxuICAgICAgICByYW5kb21QbGFjZW1lbnQoYm9hcmQsNCk7XG4gICAgICAgIHJhbmRvbVBsYWNlbWVudChib2FyZCwzKTtcbiAgICAgICAgcmFuZG9tUGxhY2VtZW50KGJvYXJkLDMpO1xuICAgICAgICByYW5kb21QbGFjZW1lbnQoYm9hcmQsMik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGVtcHR5VGhlR2FtZWJvYXJkKGJvYXJkLCB1c2VyKXtcbiAgICAgICAgYm9hcmQuZGVsZXRlQWxsU2hpcCgpO1xuICAgICAgICBsYXlvdXRHcmlkUGxhY2VkQ29sb3IoYm9hcmQsIHVzZXIpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBzdGFydFZzQUk6ICgpPT57XG4gICAgICAgICAgICBlbXB0eVRoZUdhbWVib2FyZChwbGF5ZXJHYW1lYm9hcmQsICdwbGF5ZXInKTtcbiAgICAgICAgICAgIGVtcHR5VGhlR2FtZWJvYXJkKEFJR2FtZWJvYXJkLCAnQUknKTtcbiAgICAgICAgICAgIHNldFNoaXBSYW5kb20oQUlHYW1lYm9hcmQpO1xuICAgICAgICAgICAgc2V0U2hpcFJhbmRvbShwbGF5ZXJHYW1lYm9hcmQpO1xuICAgICAgICAgICAgbGF5b3V0R3JpZFBsYWNlZENvbG9yKHBsYXllckdhbWVib2FyZCwgJ3BsYXllcicpO1xuICAgICAgICB9LFxuICAgICAgICByZXN0YXJ0R2FtZTogKCk9PiB7XG4gICAgICAgICAgICBlbXB0eVRoZUdhbWVib2FyZChwbGF5ZXJHYW1lYm9hcmQsICdwbGF5ZXInKTtcbiAgICAgICAgICAgIGVtcHR5VGhlR2FtZWJvYXJkKEFJR2FtZWJvYXJkLCAnQUknKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gc3RhcnRHYW1lQnRuKCl7XG4gICAgY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnRHYW1lQnRuJyk7XG4gICAgY29uc3QgcmVzdGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXN0YXJ0QnRuJyk7XG5cbiAgICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XG4gICAgICAgIGNvbnNvbGUubG9nKCdQbGF5IHRoZSBnYW1lIScpO1xuICAgICAgICBnYW1lLnN0YXJ0VnNBSSgpO1xuICAgIH0pO1xuICAgIHJlc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xuICAgICAgICBjb25zb2xlLmxvZygncmVzdGFydGVkJyk7XG4gICAgICAgIGdhbWUucmVzdGFydEdhbWUoKTtcbiAgICB9KTtcbn1cblxuc3RhcnRHYW1lQnRuKClcblxuY29uc29sZS5sb2coJ0dhbWUgUmVhZHknKTtcbmV4cG9ydCB7UExBWUVST05FLCBwbGF5ZXJHYW1lYm9hcmQsIEFJLCBBSUdhbWVib2FyZH0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=