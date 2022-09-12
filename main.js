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
        checkAllLocation: ()=>{
            refreshAllLocation();
            console.log(allLocation);
            return allLocation
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
        allGapLocation,
        allLocation
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
    let currentShip = gameboard.checkAllLocation();
    if (!currentGap){
        return
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












// console.log(PLAYERONE);debugger
// console.log(playerGameboard);debugger

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
            }
            else { // if there IS common element inside both array, randomize the ship placement again, then repeat this function
                console.log('clashed initiate recurese check');
                reRandomizeWithGap();
                checkAndAddElements(newShipCoord, board.allGapLocation, val); // repeat this function again
            }
        }
        // starts here
        checkAndAddElements(newShipWithGap, board.allGapLocation, val);
    }

    return {
        startVsAI: ()=>{
            // place the board you use and the length of ship, then randomPlacement() will place it randomly including gap between ships
            randomPlacement(AIGameboard,5); 
            randomPlacement(AIGameboard,4);
            randomPlacement(AIGameboard,3);
            randomPlacement(AIGameboard,3);
            randomPlacement(AIGameboard,2);
        },
        randomizeShipPlacement: ()=> {
            randomPlacement(playerGameboard,5); 
            randomPlacement(playerGameboard,4);
            randomPlacement(playerGameboard,3);
            randomPlacement(playerGameboard,3);
            randomPlacement(playerGameboard,2);
            (0,_layoutGridPlacedColor_js__WEBPACK_IMPORTED_MODULE_7__["default"])(playerGameboard, 'player');
        }

    }
}
// startGame().versusAI();
game.randomizeShipPlacement();
AIGameboard.checkAllLocation();
AIGameboard.checkTotalHealth();


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cUMsd0RBQVE7QUFDN0M7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBLDhFQUE4RTtBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVkscUVBQXFCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmluZENvbW1vbkVsZW1lbnRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbGF5b3V0R3JpZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2xheW91dEdyaWRQbGFjZWRDb2xvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYWNlR2FwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxhY2VSYW5kb21pemVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbWFpbmdhbWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZmluZENvbW1vbkVsZW1lbnRzKGFycjEsIGFycjIpIHtcclxuICAgIHJldHVybiBhcnIxLnNvbWUoaXRlbSA9PiBhcnIyLmluY2x1ZGVzKGl0ZW0pKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmaW5kQ29tbW9uRWxlbWVudHMiLCJcclxuY29uc3QgZ2FtZWJvYXJkID0gKCk9PiB7XHJcbiAgICBsZXQgYWxsU2hpcCA9IFtdO1xyXG4gICAgbGV0IHRvdGFsSGVhbHRoID0gMDtcclxuICAgIGxldCBhbGxMb2NhdGlvbiA9IFtdO1xyXG4gICAgbGV0IGF0dGFja01pc3NlZCA9IFtdO1xyXG4gICAgbGV0IGFsbEdhcExvY2F0aW9uID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gcmVmcmVzaEFsbExvY2F0aW9uKCl7XHJcbiAgICAgICAgbGV0IG5ld0xvY2F0aW9uID0gW107XHJcbiAgICAgICAgYWxsU2hpcC5mb3JFYWNoKChzaGlwKT0+e1xyXG4gICAgICAgICAgICBuZXdMb2NhdGlvbiA9IG5ld0xvY2F0aW9uLmNvbmNhdChzaGlwLmxvY2F0aW9uKCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFsbExvY2F0aW9uID0gbmV3TG9jYXRpb247XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBhdHRhY2tNaXNzZWRDb3VudGVyKGNvb3Ipe1xyXG4gICAgICAgIGF0dGFja01pc3NlZC5wdXNoKGNvb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vY29uc29sZS5sb2coJ2dhbWVib2FyZCBpcyBvbicpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwbGFjZW1lbnQ6IChzaGlwcyk9PnsgLy8gZG9udCBuZWVkIGNvb3Igc2luY2UgY29vcmRpbmF0ZSBzaG91bGQgYmUgaW5zaWRlIHRoZSBzaGlwKClcclxuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHRoZSBjb29yZGluYXRlIGlzIHZhbGlkLCB3aGljaCBtZWFucyBlbXB0eSBhbmQgb25lIGJsb2NrIGF3YXkgZnJvbSBhbm90aGVyIHNoaXBcclxuICAgICAgICAgICAgLy8gcGxhY2UgdGhlIHNoaXBzIG9uIHRoZSBjb29yZGluYXRlICAgICBcclxuICAgICAgICAgICAgYWxsU2hpcC5wdXNoKHNoaXBzKTtcclxuICAgICAgICAgICAgYWxsTG9jYXRpb24gPSBhbGxMb2NhdGlvbi5jb25jYXQoc2hpcHMubG9jYXRpb24oKSk7XHJcbiAgICAgICAgICAgIC8vIG1hcmtzIHRoZSBjb29yZGluYXRlIHdpdGggc2hpcHMnIG1hcmtzXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVjZWl2ZUF0dGFjazogKGNvb3IpPT57XHJcbiAgICAgICAgICAgIGlmKGFsbExvY2F0aW9uLmluY2x1ZGVzKGNvb3IpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQXR0YWNrIG1pc3NlZCcpXHJcbiAgICAgICAgICAgICAgICBhdHRhY2tNaXNzZWRDb3VudGVyKGNvb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBdHRhY2sgSGl0IScpXHJcbiAgICAgICAgICAgICAgICBhbGxTaGlwLmZvckVhY2goKHNoaXApPT57XHJcbiAgICAgICAgICAgICAgICAgICAgc2hpcC5oaXQoY29vcik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIHJlZnJlc2ggdGhlIGFsbExvY2F0aW9uIEFycmF5IHNvIHlvdSBjYW5ub3QgaGl0IHR3aWNlIG9uIHRoZSBzYW1lIGNvb3JkaW5hdGVcclxuICAgICAgICAgICAgICAgIHJlZnJlc2hBbGxMb2NhdGlvbigpXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIC8vIHRvZ2dsZSBjaGVja0FsbFNoaXAoKSB0byBtYWtlIHN1cmUgaWYgaXRzIG5vdCBlbmRnYW1lXHJcbiAgICAgICAgICAgIC8vIGlmIG5vdCBtYXJrcyB0aGUgY29vcmRpbmF0ZSB3aXRoIG1pc3NlZEF0dGFjaygpXHJcbiAgICAgICAgICAgIC8vcmV0dXJuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaGVja1RvdGFsSGVhbHRoOiAoKT0+e1xyXG4gICAgICAgICAgICAvLyBjaGVjayB0aGUgaGVhbHRoYmFyIG9mIGVhY2ggc2hpcHMgd2l0aCBzaGlwLmhlYWx0aGJhcigpXHJcbiAgICAgICAgICAgIGFsbFNoaXAuZm9yRWFjaCgoc2hpcCk9PntcclxuICAgICAgICAgICAgICAgIHNoaXAubG9jYXRpb24oKTsgXHJcbiAgICAgICAgICAgICAgICB0b3RhbEhlYWx0aCA9IHRvdGFsSGVhbHRoICsgc2hpcC5oZWFsdGhCYXIoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRvdGFsSGVhbHRoKTtcclxuICAgICAgICAgICAgLy8gaWYgYWxsIHRoZSBoZWFsdGhiYXIgaXMgMCB0aGVuIHRoZSBnYW1lIGlzIGVuZGVkXHJcbiAgICAgICAgICAgIGlmKHRvdGFsSGVhbHRoIDw9IDApe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHQU1FIE9WRVIgQUxMIE9GIFlPVVIgU0hJUFMgV1JFQ0tFRFwiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvdGFsSGVhbHRoXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0b3RhbEhlYWx0aFxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2hlY2tBbGxMb2NhdGlvbjogKCk9PntcclxuICAgICAgICAgICAgcmVmcmVzaEFsbExvY2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFsbExvY2F0aW9uKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFsbExvY2F0aW9uXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhZGRHYXBMb2NhdGlvbjogKGFycmF5KT0+IHtcclxuICAgICAgICAgICAgLy8gZ2FwTG9jYXRpb24ucHVzaChhcnJheSk7XHJcbiAgICAgICAgICAgIGFycmF5LmZvckVhY2goKGFycik9PntcclxuICAgICAgICAgICAgICAgIGFsbEdhcExvY2F0aW9uLnB1c2goYXJyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgXHJcbiAgICAgICAgY2hlY2tHYXBMb2NhdGlvbjogKCk9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFsbEdhcExvY2F0aW9uKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFsbEdhcExvY2F0aW9uXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaGVja0F0dGFja01pc3NlZDogKCk9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYXR0YWNrTWlzc2VkKTtcclxuICAgICAgICAgICAgcmV0dXJuIGF0dGFja01pc3NlZFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWxsR2FwTG9jYXRpb24sXHJcbiAgICAgICAgYWxsTG9jYXRpb25cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2FtZWJvYXJkO1xyXG5cclxuLy8gY29uc3QgcGxheWEgPSBnYW1lYm9hcmQoKTtcclxuLy8gY29uc3QgYmlnU2hpcENvb3IgPSAnNkIgN0IgOEIgOUIgMTBCJztcclxuLy8gY29uc3QgbWlkU2hpcENvb3IgPSAnNEIgNEMgNEQnO1xyXG4vLyBjb25zdCBtaWRTaGlwID0gc2hpcHMobWlkU2hpcENvb3IpO1xyXG4vLyBjb25zdCBiaWdTaGlwID0gc2hpcHMoYmlnU2hpcENvb3IpO1xyXG5cclxuLy8gcGxheWEucGxhY2VtZW50KGJpZ1NoaXApO1xyXG4vLyBwbGF5YS5wbGFjZW1lbnQobWlkU2hpcCk7XHJcbi8vIHBsYXlhLnJlY2VpdmVBdHRhY2soXCI0QlwiKTtkZWJ1Z2dlclxyXG4vLyBwbGF5YS5yZWNlaXZlQXR0YWNrKFwiNENcIik7ZGVidWdnZXJcclxuLy8gcGxheWEucmVjZWl2ZUF0dGFjayhcIjREXCIpO2RlYnVnZ2VyXHJcbi8vIHBsYXlhLnJlY2VpdmVBdHRhY2soXCIzQlwiKTtkZWJ1Z2dlclxyXG4vLyBwbGF5YS5jaGVja0FsbExvY2F0aW9uKCk7XHJcbi8vIHBsYXlhLmNoZWNrQXR0YWNrTWlzc2VkKCk7XHJcbi8vIHBsYXlhLmNoZWNrVG90YWxIZWFsdGgoKTsgXHJcbi8vIHJldmlzZSB0aGlzXHJcbi8vIHBsYXlhLnBsYWNlbWVudCgnMUEgMkEgM0EnLCBzaGlwcygzKSk7XHJcbi8vIHBsYXlhLnBsYWNlbWVudCgnM0IgNEInLCBzaGlwcygyKSk7XHJcbi8vIHBsYXlhLnBsYWNlbWVudCgnNkIgN0IgOEIgOUIgMTBCJywgc2hpcHMoNSkpO1xyXG4vLyBwbGF5YS5wbGFjZW1lbnQoJzZFIDdFIDhFIDlFIDEwRScsIHNoaXBzKDUpKTsiLCJcclxuZnVuY3Rpb24gY3JlYXRlR3JpZCh3aG9zKXtcclxuICAgIGNvbnN0IGxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7d2hvc31HYW1lYm9hcmRgKTtcclxuICAgIGNvbnN0IE1BWF9XSURUSCA9IDEwO1xyXG4gICAgY29uc3QgYWxwaGFiZXQgPSAnYWJjZGVmZ2hpaic7XHJcbiAgICBjb25zdCBhbHBoQXJyYXkgPSBhbHBoYWJldC5zcGxpdCgnJyk7XHJcblxyXG4gICAgYWxwaEFycmF5LmZvckVhY2goKGFscCk9PntcclxuICAgICAgICBmb3IgKGxldCBpPTE7IGkgPD0gTUFYX1dJRFRIOyBpKysgKXtcclxuICAgICAgICAgICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBncmlkLmNsYXNzTmFtZT1gJHthbHB9JHtpfWA7XHJcbiAgICAgICAgICAgIC8vIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZ3JpZC5jbGFzc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgLy8gY2xpY2tlZCB0aGUgZ3JpZFxyXG4gICAgICAgICAgICAgICAgLy8gaW5pdGlhdGUgYXR0YWNrKCkgLy8gdGhlbiBBSSBhdHRhY2sgeW91cnMgdG9vXHJcbiAgICAgICAgICAgIC8vIH0pXHJcbiAgICAgICAgICAgIGxheWVyLmFwcGVuZChncmlkKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVHcmlkIiwiZnVuY3Rpb24gbGF5b3V0R3JpZFBsYWNlZENvbG9yKGdhbWVib2FyZCwgdXNlcil7XHJcbiAgICBsZXQgY3VycmVudEdhcCA9IGdhbWVib2FyZC5hbGxHYXBMb2NhdGlvbjtcclxuICAgIGxldCBjdXJyZW50U2hpcCA9IGdhbWVib2FyZC5jaGVja0FsbExvY2F0aW9uKCk7XHJcbiAgICBpZiAoIWN1cnJlbnRHYXApe1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY3VycmVudEdhcC5mb3JFYWNoKChhcnJheUxvYyk9PntcclxuICAgICAgICAgICAgY29uc3QgbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt1c2VyfUdhbWVib2FyZGApO1xyXG4gICAgICAgICAgICBsZXQgZ2FwID0gbGF5ZXIucXVlcnlTZWxlY3RvcihgLiR7YXJyYXlMb2N9YCk7XHJcbiAgICAgICAgICAgIGdhcC5jbGFzc0xpc3QuYWRkKCdnYXAnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjdXJyZW50U2hpcC5mb3JFYWNoKChjdXJzaGlwKT0+e1xyXG4gICAgICAgICAgICBjb25zdCBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3VzZXJ9R2FtZWJvYXJkYCk7XHJcbiAgICAgICAgICAgIGxldCBzaGlwID0gbGF5ZXIucXVlcnlTZWxlY3RvcihgLiR7Y3Vyc2hpcH1gKTtcclxuICAgICAgICAgICAgc2hpcC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxheW91dEdyaWRQbGFjZWRDb2xvciIsIi8vIHNldCBnYXAgYnkgb25lIGJ5IG9uZSBsb29wIGNoZWNrXHJcblxyXG5mdW5jdGlvbiBwbGFjZUdhcChtYWluQXJyYXkpe1xyXG4gICAgbGV0IG91dHB1dEFycmF5ID0gW107XHJcbiAgICBsZXQgcmVzdWx0QXJyYXkgPSBbXTtcclxuICAgIGNvbnN0IG51bWJlclBhdHQgPSAvWzAtOV0vZztcclxuICAgIGNvbnN0IGFscGhhUGF0dCA9IC9bYS16QS1aXS9nO1xyXG4gICAgY29uc3QgYWxwaGFiZXRNYXggPSAnYWJjZGVmZ2hpaic7XHJcbiAgICBjb25zdCBhbHBBcnJheSA9IGFscGhhYmV0TWF4LnNwbGl0KCcnKTtcclxuICAgIG1haW5BcnJheS5mb3JFYWNoKCh2YWwpPT57XHJcbiAgICAgICAgY29uc3QgbnVtYiA9IHBhcnNlSW50KHZhbC5tYXRjaChudW1iZXJQYXR0KS5qb2luKCcnKSk7XHJcbiAgICAgICAgY29uc3QgYWxwaCA9IHZhbC5tYXRjaChhbHBoYVBhdHQpLmpvaW4oJycpO1xyXG4gICAgICAgIGNvbnN0IG51bWJNaW51c09uZSA9IG51bWIgLSAxO1xyXG4gICAgICAgIGNvbnN0IG51bWJQbHVzT25lID0gbnVtYiArIDE7XHJcbiAgICAgICAgY29uc3QgYWxwaFBsdXNPbmUgPSBhbHBBcnJheVsoYWxwQXJyYXkuaW5kZXhPZihhbHBoKSkrMV07XHJcbiAgICAgICAgY29uc3QgYWxwaE1pbnVzT25lID0gYWxwQXJyYXlbKGFscEFycmF5LmluZGV4T2YoYWxwaCkpLTFdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIG1lcmdlQXJyYXkoKXtcclxuICAgICAgICAgICAgICAvLyBtZXJnZSB0aGUgYXJyYXlcclxuICAgICAgICAgICAgcmVzdWx0QXJyYXkgPSByZXN1bHRBcnJheS5jb25jYXQob3V0cHV0QXJyYXkpO1xyXG4gICAgICAgICAgICByZXN1bHRBcnJheSA9IFsuLi5uZXcgU2V0IChbLi4ubWFpbkFycmF5LC4uLm91dHB1dEFycmF5XSldOyAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrUmlnaHQoKXtcclxuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaChhbHBoLmNvbmNhdCgobnVtYlBsdXNPbmUpLnRvU3RyaW5nKCkpKTsgLy8gcmlnaHRcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tMZWZ0KCl7XHJcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaC5jb25jYXQoKG51bWJNaW51c09uZSkudG9TdHJpbmcoKSkpOyAvLyBsZWZ0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrVXAoKXtcclxuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaChhbHBoTWludXNPbmUuY29uY2F0KChudW1iKS50b1N0cmluZygpKSk7IC8vIHVwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrRG93bigpe1xyXG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKGFscGhQbHVzT25lLmNvbmNhdCgobnVtYikudG9TdHJpbmcoKSkpOyAvLyBkb3duXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrRGlhZ1VwUmlnaHQoKXtcclxuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaChhbHBoTWludXNPbmUuY29uY2F0KChudW1iUGx1c09uZSkudG9TdHJpbmcoKSkpOyAvLyB1cCByaWdodFxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBjaGVja0RpYWdEb3duUmlnaHQoKXtcclxuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaChhbHBoUGx1c09uZS5jb25jYXQoKG51bWJQbHVzT25lKS50b1N0cmluZygpKSk7IC8vIGRvd24gcmlnaHRcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tEaWFnVXBMZWZ0KCl7XHJcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaE1pbnVzT25lLmNvbmNhdCgobnVtYk1pbnVzT25lKS50b1N0cmluZygpKSk7IC8vIHVwIGxlZnRcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tEaWFnRG93bkxlZnQoKXtcclxuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaChhbHBoUGx1c09uZS5jb25jYXQoKG51bWJNaW51c09uZSkudG9TdHJpbmcoKSkpOyAvLyBkb3duIGxlZnRcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFscGhNaW51c09uZSA9PSB1bmRlZmluZWQgJiYgbnVtYk1pbnVzT25lIDwgMSl7IC8vIGNvcm5lciB1cCBsZWZ0XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXRzIGNvcm5lciB1cCBsZWZ0Jyk7XHJcbiAgICAgICAgICAgIGNoZWNrUmlnaHQoKTtcclxuICAgICAgICAgICAgY2hlY2tEb3duKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25SaWdodCgpO1xyXG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhbHBoUGx1c09uZSA9PSB1bmRlZmluZWQgJiYgbnVtYk1pbnVzT25lIDwgMSl7IC8vIGNvcm5lciBib3R0b20gbGVmdFxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0cyBjb3JuZXIgYm90dG9tIGxlZnQnKTtcclxuICAgICAgICAgICAgY2hlY2tSaWdodCgpO1xyXG4gICAgICAgICAgICBjaGVja1VwKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ1VwUmlnaHQoKTtcclxuICAgICAgICAgICAgbWVyZ2VBcnJheSgpOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYWxwaE1pbnVzT25lID09IHVuZGVmaW5lZCAmJiBudW1iUGx1c09uZSA+IDEwKXsgLy8gY29ybmVyIHVwIHJpZ2h0IFxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0cyBjb3JuZXIgdXAgcmlnaHQnKTtcclxuICAgICAgICAgICAgY2hlY2tMZWZ0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrRG93bigpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdEb3duTGVmdCgpO1xyXG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhbHBoUGx1c09uZSA9PSB1bmRlZmluZWQgJiYgbnVtYlBsdXNPbmUgPiAxMCl7IC8vIGNvcm5lciBib3R0b20gcmlnaHRcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdHMgY29ybmVyIGJvdHRvbSByaWdodCcpO1xyXG4gICAgICAgICAgICBjaGVja0xlZnQoKTtcclxuICAgICAgICAgICAgY2hlY2tVcCgpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdVcExlZnQoKTtcclxuICAgICAgICAgICAgbWVyZ2VBcnJheSgpOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobnVtYk1pbnVzT25lIDwgMSl7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXQgbnVtYmVyID0gMCcpO1xyXG4gICAgICAgICAgICBjaGVja1JpZ2h0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrVXAoKTtcclxuICAgICAgICAgICAgY2hlY2tEb3duKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ1VwUmlnaHQoKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnRG93blJpZ2h0KCk7XHJcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYobnVtYlBsdXNPbmUgPiAxMCl7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXQgbnVtYmVyID4gMTAnKTtcclxuICAgICAgICAgICAgY2hlY2tMZWZ0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrVXAoKTtcclxuICAgICAgICAgICAgY2hlY2tEb3duKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ1VwTGVmdCgpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdEb3duTGVmdCgpO1xyXG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhbHBoTWludXNPbmUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdHMgdW5kZWZpbmVkJyk7XHJcbiAgICAgICAgICAgIGNoZWNrTGVmdCgpO1xyXG4gICAgICAgICAgICBjaGVja1JpZ2h0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrRG93bigpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdEb3duTGVmdCgpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdEb3duUmlnaHQoKTsgXHJcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFscGhQbHVzT25lID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXRzIHVuZGVmaW5lZCcpO1xyXG4gICAgICAgICAgICBjaGVja0xlZnQoKTtcclxuICAgICAgICAgICAgY2hlY2tSaWdodCgpO1xyXG4gICAgICAgICAgICBjaGVja1VwKCk7IFxyXG4gICAgICAgICAgICBjaGVja0RpYWdVcExlZnQoKTsgXHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ1VwUmlnaHQoKTtcclxuICAgICAgICAgICAgbWVyZ2VBcnJheSgpO1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vIGhvcml6b250YWwgY2hlY2tcclxuICAgICAgICAgICAgICAgIGNoZWNrTGVmdCgpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tSaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gdmVydGljYWwgY2hlY2tcclxuICAgICAgICAgICAgICAgIGNoZWNrVXAoKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrRG93bigpO1xyXG4gICAgICAgICAgICAgICAgLy9kaWFnb25hbCBsZWZ0IGNoZWNrXHJcbiAgICAgICAgICAgICAgICBjaGVja0RpYWdVcExlZnQoKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25MZWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAvL2RpYWdvbmFsIHJpZ2h0IGNoZWNrXHJcbiAgICAgICAgICAgICAgICBjaGVja0RpYWdVcFJpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICBjaGVja0RpYWdEb3duUmlnaHQoKTtcclxuICAgICAgICAgICAgICAgIG1lcmdlQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcblxyXG4gICAgfSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhvdXRwdXRBcnJheSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHRBcnJheSk7XHJcbiAgICByZXR1cm4gcmVzdWx0QXJyYXlcclxufVxyXG5cclxuLy8gbGV0IGFycmF5MSA9IFsnYScsJ2InLCdjJ107XHJcbi8vIGxldCBhcnJheTIgPSBbJ3onLCdhJywncyddO1xyXG5cclxuLy8gbGV0IGFycmF5MyA9IGFycmF5MS5jb25jYXQoYXJyYXkyKTtcclxuLy8gYXJyYXkzID0gWy4uLm5ldyBTZXQoWy4uLmFycmF5MSwuLi5hcnJheTJdKV1cclxuXHJcbi8vIGNvbnNvbGUubG9nKGFycmF5Myk7IFxyXG5cclxuLy8gcGxhY2VHYXAoWycxMGonXSk7XHJcbi8vIHBsYWNlR2FwKFsnMTBjJywgJzEwZCcsICcxMGUnXSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwbGFjZUdhcCIsImZ1bmN0aW9uIHBsYWNlUmFuZG9taXplcihsZW5nKXtcclxuICAgIGNvbnN0IE1BWF9HUklEID0gMTA7IC8vIG1heGltdW0gZ3JpZCBsZW5ndGggaXMgMTB4MTBcclxuICAgIGNvbnN0IHJhbmRvbUF4aXMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTsgLy8gb25seSByZXR1cm4gMC8xXHJcbiAgICBjb25zdCBhcnJheSA9IFtdO1xyXG4gICAgY29uc3QgYWxwaGFiZXQgPSBcImFiY2RlZmdoaWpcIjtcclxuICAgIGNvbnN0IHJhbmRvbU51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChNQVhfR1JJRCAtIGxlbmcpKSArIDE7IC8vIHRoaXMgcmFuZG9taXplciBudW1iZXIga2VlcCB5b3UgZnJvbSBvdmVyZmxvd2luZywgcGx1cyBvbmUgc28gaXQgc3RhcnQgZnJvbSAxIG5vdCAwXHJcbiAgICBjb25zdCByYW5kb21BbHAgPSBhbHBoYWJldFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhbHBoYWJldC5zdWJzdHJpbmcoMCwoTUFYX0dSSUQgLSBsZW5nKSkubGVuZ3RoKV07IC8vIHRoaXMgcmFuZG9taXplciBrZWVwcyB5b3UgZnJvbSB2YWx1ZSBtb3JlIHRoYW4gbGVuZ3RoXHJcbiAgICBsZXQgYWxwaGFOdW07XHJcblxyXG4gICAgaWYgKHJhbmRvbUF4aXMgPT09IDApeyAvLyBYIGF4aXMgYmxvY2tzXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPGxlbmc7IGkrKyApe1xyXG4gICAgICAgICAgICBhbHBoYU51bSA9IHJhbmRvbUFscC5jb25jYXQoKHJhbmRvbU51bWJlciArIGkpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICBhcnJheS5wdXNoKGFscGhhTnVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYXJyYXkpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJhbmRvbUF4aXMpO1xyXG4gICAgICAgIHJldHVybiBhcnJheVxyXG4gICAgfVxyXG4gICAgZWxzZSB7IC8vIFkgYXhpcyBibG9ja3NcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8bGVuZzsgaSsrICl7XHJcbiAgICAgICAgICAgIGNvbnN0IGFscExvb3AgPSBhbHBoYWJldC5jaGFyQXQoYWxwaGFiZXQuaW5kZXhPZihyYW5kb21BbHApICsgaSk7XHJcbiAgICAgICAgICAgIGFscGhhTnVtID0gYWxwTG9vcC5jb25jYXQoKHJhbmRvbU51bWJlcikudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIGFycmF5LnB1c2goYWxwaGFOdW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhhcnJheSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmFuZG9tQXhpcyk7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgcGxhY2VSYW5kb21pemVyIiwiXHJcbi8vIGNvbnN0IHlvdXJHYW1lYm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuLy8gY29uc3QgaHVtYW5HYW1lYm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuLy8gY29uc3QgQUlHYW1lYm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuXHJcbmNvbnN0IHBsYXllciA9ICgpID0+IHtcclxuICAgIC8vIHBsYXllciBzaG91bGQgdGFrZSB0dXJucyBwbGF5aW5nIHRoZSBnYW1lIGJ5IGF0dGFja2luZyBvcHBvbmVudCdzIGdhbWVib2FyZC5cclxuICAgIGxldCBhdHRhY2tTdGF0dXMgPSAnT0ZGJztcclxuICAgIC8vIHBsYXllciBhdHRhY2tpbmcgc3RhdGUgaXMgT05cclxuICAgIC8vIHBsYXllciBDSE9PU0UgdGhlIGNvb3JkaW5hdGUgb2Ygb3Bwb25lbnQncyBnYW1lYm9hcmQuXHJcbiAgICAvLyBwbGF5ZXIgYXR0YWNraW5nIHN0YXRlIGlzIE9GRlxyXG4gICAgLy8gbGV0IHlvdXJHYW1lYm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdG9nZ2xlQXR0YWNrT04gOiAoKT0+IGF0dGFja1N0YXR1cyA9IFwiT05cIixcclxuICAgICAgICB0b2dnbGVBdHRhY2tPRkYgOiAoKT0+IGF0dGFja1N0YXR1cyA9IFwiT0ZGXCIsXHJcbiAgICAgICAgY2hlY2tBdHRhY2s6ICgpPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhdHRhY2tTdGF0dXMpOyBcclxuICAgICAgICAgICAgcmV0dXJuIGF0dGFja1N0YXR1c1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGxldCBwbGF5ZSA9IHBsYXllcigpO1xyXG5cclxuXHJcbi8vIHBsYXllLmNoZWNrQXR0YWNrKCk7XHJcbi8vIHBsYXllLnRvZ2dsZUF0dGFja09OKCk7XHJcbi8vIHBsYXllLmNoZWNrQXR0YWNrKCk7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcGxheWVyOyIsIlxyXG5jb25zdCBzaGlwcyA9IChjb29yZCkgPT57IC8vIGxlbmd0aCB3aWxsIGJlIGZyb20gc2l6ZSBvZiB0aGUgc2hpcFxyXG4gICAgLy8gbGV0IGNvb3JkID0gbG9jLnNwbGl0KCcsJyk7XHJcbiAgICBsZXQgaGVhbHRoQmFyID0gY29vcmQubGVuZ3RoO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBsZW5ndGg6ICgpPT57XHJcbiAgICAgICAgICAgIHJldHVybiBsZW4gXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoaXQ6IChsb2MpPT57XHJcbiAgICAgICAgICAgIC8vZ2V0IHRoZSBhdHRjayBoaXQgbG9jYXRpb25cclxuICAgICAgICAgICAgaWYgKGNvb3JkLmluY2x1ZGVzKGxvYykgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJhdHRhY2sgbWlzc2VkXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGNvb3JkLmluY2x1ZGVzKGxvYykgPT09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgY29vcmQgPSBjb29yZC5maWx0ZXIoICh2YWwpPT57XHJcbiAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsICE9PSBsb2NcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaGVhbHRoQmFyID0gaGVhbHRoQmFyIC0gMTtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vbWFyayBwb3NpdGlvbiBpbiBnYW1lYm9hcmQgYXMgYSBoaXRcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ0aGlzIHNoaXAgdG9vayBoaXQ6IFwiICsgbnVtKVxyXG4gICAgICAgICAgICAvL3JldHVybiBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzU3VuazogKCk9PntcclxuICAgICAgICAgICAgLy9jaGVjayB0aGUgc2hpcCBpZiBzdW5rZW4geWV0XHJcbiAgICAgICAgICAgIGlmKGhlYWx0aEJhciA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2hpcCBpcyBkZXN0cm95ZWQnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAgXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NoaXAgaXMgc3RpbGwgaW50YWN0Jyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBcclxuICAgICAgICBoZWFsdGhCYXIgOiAoKT0+IHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInRoaXMgc2hpcCBoZWFsdGg6IFwiICsgaGVhbHRoQmFyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGhlYWx0aEJhclxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbG9jYXRpb246ICgpPT57XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coY29vcmQpXHJcbiAgICAgICAgICAgIHJldHVybiBjb29yZFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gY29uc3QgYmlnU2hpcCA9IHNoaXBzKFwiM0EgNEEgNUEgNkEgN0FcIik7XHJcbi8vIGNvbnN0IG1pZFNoaXAyID0gc2hpcHMoXCIxMkEgMTJCIDEyQ1wiKTtcclxuLy8gY29uc3Qgc21hbGxTaGlwID0gc2hpcHMoXCI0QlwiKTtcclxuXHJcbi8vIGJpZ1NoaXAubG9jYXRpb24oKTtcclxuLy8gYmlnU2hpcC5oZWFsdGhCYXIoKTtcclxuLy8gYmlnU2hpcC5oaXQoXCIzQVwiKTtcclxuLy8gYmlnU2hpcC5sb2NhdGlvbigpO1xyXG4vLyBiaWdTaGlwLmhlYWx0aEJhcigpO1xyXG4vLyBiaWdTaGlwLmhpdChcIjhBXCIpO1xyXG4vLyBiaWdTaGlwLmxvY2F0aW9uKCk7XHJcbi8vIGJpZ1NoaXAuaGVhbHRoQmFyKCk7XHJcbi8vIGJpZ1NoaXAuaGl0KFwiNEFcIik7XHJcbi8vIGJpZ1NoaXAuaGl0KFwiNUFcIik7XHJcbi8vIGJpZ1NoaXAuaGl0KFwiNkFcIik7XHJcbi8vIGJpZ1NoaXAubG9jYXRpb24oKTtcclxuLy8gYmlnU2hpcC5oZWFsdGhCYXIoKTtcclxuLy8gYmlnU2hpcC5pc1N1bmsoKTtcclxuLy8gYmlnU2hpcC5oaXQoXCI3QVwiKTtcclxuLy8gYmlnU2hpcC5sb2NhdGlvbigpO1xyXG4vLyBiaWdTaGlwLmhlYWx0aEJhcigpO1xyXG4vLyBiaWdTaGlwLmlzU3VuaygpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgc2hpcHMiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIGluIHRoaXMgZmlsZSB3ZSBhcmUgZ29ubmEgZ2F0aGVyIGFsbCB0aGUgY29tcG9uZW50cyBvZiBCYXR0bGVzaGlwIFRoZSBHYW1lIGFuZCB0dXJuIGl0IGludG8gcmVhbCBnYW1lXHJcblxyXG4vLyBwbGF5ZXIuIFdoYXQgZG9lcyBwbGF5ZXIgZG8uXHJcbi8vIHBsYXllciBzdGFydCB0aGUgZ2FtZSBieSBjaG9vc2luZyB3aG8geW91cmUgcGxheWluZyB3aXRoXHJcbi8vIHBsYXllciBjaG9vc2UgaXMgaXQgZ29ubmEgYmUgdnMgQUkgb3IgdnMgSHVtYW5cclxuLy8gYXQgdGhpcyBwb2ludCwgaWYgeW91IGNob29zZSBBSS4gQUkgd2lsbCBhdXRvbWF0aWNhbGx5IHBsYWNlIHRoZWlyIHNoaXBzIHJhbmRvbWx5IG9uIGdhbWVib2FyZC5cclxuLy8gcGxheWVyIGNob29zZSB0aGUgc2hpcHMgcGxhY2VtZW50IGFjY3Jvc3MgdGhlIGdhbWVib2FyZC5cclxuLy8gc2hpcCdzIHBsYWNlbWVudCBpcyBiYXNlZCBvbiBvbmUgcnVsZSB0aGF0IHRoZXJlIGlzIGFsd2F5cyBvbmUgZW1wdHkgYmxvY2sgYmV0d2VlbiBvbmUgYW5kIGFub3RoZXIgcGxhY2VkIHNoaXBzXHJcbi8vIHBsYXllciBoYXZlIGEgY2hvaWNlIHRvIHJhbmRvbWx5IHBsYWNlIHRoZSBzaGlwcyBieSBjbGlja2luZyB0aGUgcmFuZG9tIGJ1dHRvbi4gXHJcbi8vIHBsYXllciBwbGFjZW1lbnQgb3JkZXIgaXMuLiBmaXJzdCB5b3UgcGxhY2Ugb25lIGJpZyBzaGlwICg1IGluIGxlbmd0aCksIHRoZW4gdHdvIG1pZCBzaGlwICgzIGluIGxlbmd0aCksIHRoZW4gdGhyZWUgc21hbGwgc2hpcCAoMiBpbiBsZW5ndGgpIFxyXG4vLyBhZnRlciBhbGwgc2hpcHMgYXJlIHBsYWNlZCwgZ2FtZSBpbml0aWF0ZSB0byBzdGFydCBhdHRhY2tpbmcgYnkgY2hvb3NpbmcgdGhlIG9wcG9uZW50cydzIGdhbWVib2FyZC4gVGhpcyBwaGFzZSB5b3UgY291bGQgaGl0IG9wcG9uZW50cydzIHNoaXAuXHJcbi8vIGFmdGVyIHlvdSBhdHRhY2sgb3Bwb25lbnQncyBzaGlwLCBnYW1lIGF1dG9tYXRpY2FsbHkgY2hhbmdlIHRvIG9wcG9uZW50J3MgdHVybi4gVGhpcyB0aW1lIE9wcG9uZW50J3Mgd2lsbCBpbml0aWF0ZSBhdHRhY2sgcGxheWVyJ3MgZ2FtZWJvYXJkIHJhbmRvbWx5LlxyXG4vLyBUaGUgQUkgZG9lcyBub3QgaGF2ZSB0byBiZSBzbWFydCwgYnV0IGl0IHNob3VsZCBrbm93IHdoZXRoZXIgb3Igbm90IGEgZ2l2ZW4gbW92ZSBpcyBsZWdhbC4gKGkuZS4gaXQgc2hvdWxkbuKAmXQgc2hvb3QgdGhlIHNhbWUgY29vcmRpbmF0ZSB0d2ljZSkuIFxyXG4vLyBHYW1lIHJlcGVhdGluZyB0aGUgcHJldmlvdXMgc3RlcCB1bnRpbCBvbmUgb2YgdGhlIHBsYXllci9BSSBzaGlwcyBhcmUgZnVsbHkgY2xlYW5lZCAoYWxsIGRlc3Ryb3llZClcclxuLy8gZ2FtZSBlbmRpbmcgaWYgb25lIG9mIHRoZSBwbGF5ZXIvQUkgdG90YWwgaGVhbHRoYmFyIChzaGlwcykgYXJlID0gMC4gXHJcbi8vIDFcdENhcnJpZXJcdDVcclxuLy8gMlx0QmF0dGxlc2hpcFx0NFxyXG4vLyAzXHRDcnVpc2VyXHQzXHJcbi8vIDRcdFN1Ym1hcmluZVx0M1xyXG4vLyA1XHREZXN0cm95ZXJcdDJcclxuXHJcblxyXG5pbXBvcnQgcGxheWVyIGZyb20gXCIuL3BsYXllci5qc1wiO1xyXG5pbXBvcnQgZ2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZC5qc1wiXHJcbmltcG9ydCBzaGlwcyBmcm9tIFwiLi9zaGlwcy5qc1wiO1xyXG5pbXBvcnQgcGxhY2VSYW5kb21pemVyIGZyb20gXCIuL3BsYWNlUmFuZG9taXplci5qc1wiO1xyXG5pbXBvcnQgZmluZENvbW1vbkVsZW1lbnRzIGZyb20gXCIuL2ZpbmRDb21tb25FbGVtZW50cy5qc1wiO1xyXG5pbXBvcnQgcGxhY2VHYXAgZnJvbSBcIi4vcGxhY2VHYXAuanNcIjtcclxuaW1wb3J0IGNyZWF0ZUdyaWQgZnJvbSBcIi4vbGF5b3V0R3JpZC5qc1wiO1xyXG5pbXBvcnQgbGF5b3V0R3JpZFBsYWNlZENvbG9yIGZyb20gXCIuL2xheW91dEdyaWRQbGFjZWRDb2xvci5qc1wiO1xyXG5cclxuXHJcbi8vIGNvbnNvbGUubG9nKFBMQVlFUk9ORSk7ZGVidWdnZXJcclxuLy8gY29uc29sZS5sb2cocGxheWVyR2FtZWJvYXJkKTtkZWJ1Z2dlclxyXG5cclxuY3JlYXRlR3JpZCgnQUknKTtcclxuY3JlYXRlR3JpZCgncGxheWVyJyk7XHJcbmNvbnN0IFBMQVlFUk9ORSA9IHBsYXllcigpOyBcclxuY29uc3QgQUkgPSBwbGF5ZXIoKTtcclxuY29uc3QgcGxheWVyR2FtZWJvYXJkID0gZ2FtZWJvYXJkKCk7XHJcbmNvbnN0IEFJR2FtZWJvYXJkID0gZ2FtZWJvYXJkKCk7XHJcbmNvbnN0IGdhbWUgPSBzdGFydEdhbWUoKTtcclxuXHJcbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpe1xyXG4gICAgZnVuY3Rpb24gcmFuZG9tUGxhY2VtZW50KGJvYXJkLCB2YWwpeyAvLyB5b3UgY2FuIHVzZSB0aGlzIHJhbmRvbVBsYWNlbWVudCB3aXRoIEFJIG9yIFBsYXllclxyXG4gICAgICAgIGxldCBuZXdTaGlwQ29vcmQgPSBwbGFjZVJhbmRvbWl6ZXIodmFsKTtcclxuICAgICAgICBsZXQgbmV3U2hpcFdpdGhHYXAgPSBwbGFjZUdhcChuZXdTaGlwQ29vcmQpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiByZVJhbmRvbWl6ZVdpdGhHYXAoKXtcclxuICAgICAgICAgICAgbmV3U2hpcENvb3JkID0gcGxhY2VSYW5kb21pemVyKHZhbCk7XHJcbiAgICAgICAgICAgIG5ld1NoaXBXaXRoR2FwID0gcGxhY2VHYXAobmV3U2hpcENvb3JkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrQW5kQWRkRWxlbWVudHMobmV3ZXN0LCBjdXJyZW50LCB2YWwpe1xyXG4gICAgICAgICAgICBpZiAoZmluZENvbW1vbkVsZW1lbnRzKG5ld2VzdCwgY3VycmVudCkgPT09IGZhbHNlKXsgLy8gaWYgdGhlcmUgSVMgTk9UIGNvbW1vbiBlbGVtZW50cyBpbnNpZGUgb2YgYm90aCBhcnJheSAobm90IGNsYXNoZWQpLCBwcm9jZWVkIHRvIGFkZCB0byBnYW1lYm9hcmRcclxuICAgICAgICAgICAgICAgIGJvYXJkLnBsYWNlbWVudChzaGlwcyhuZXdTaGlwQ29vcmQpKTtcclxuICAgICAgICAgICAgICAgIGJvYXJkLmFkZEdhcExvY2F0aW9uKHBsYWNlR2FwKG5ld1NoaXBDb29yZCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgeyAvLyBpZiB0aGVyZSBJUyBjb21tb24gZWxlbWVudCBpbnNpZGUgYm90aCBhcnJheSwgcmFuZG9taXplIHRoZSBzaGlwIHBsYWNlbWVudCBhZ2FpbiwgdGhlbiByZXBlYXQgdGhpcyBmdW5jdGlvblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NsYXNoZWQgaW5pdGlhdGUgcmVjdXJlc2UgY2hlY2snKTtcclxuICAgICAgICAgICAgICAgIHJlUmFuZG9taXplV2l0aEdhcCgpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tBbmRBZGRFbGVtZW50cyhuZXdTaGlwQ29vcmQsIGJvYXJkLmFsbEdhcExvY2F0aW9uLCB2YWwpOyAvLyByZXBlYXQgdGhpcyBmdW5jdGlvbiBhZ2FpblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHN0YXJ0cyBoZXJlXHJcbiAgICAgICAgY2hlY2tBbmRBZGRFbGVtZW50cyhuZXdTaGlwV2l0aEdhcCwgYm9hcmQuYWxsR2FwTG9jYXRpb24sIHZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzdGFydFZzQUk6ICgpPT57XHJcbiAgICAgICAgICAgIC8vIHBsYWNlIHRoZSBib2FyZCB5b3UgdXNlIGFuZCB0aGUgbGVuZ3RoIG9mIHNoaXAsIHRoZW4gcmFuZG9tUGxhY2VtZW50KCkgd2lsbCBwbGFjZSBpdCByYW5kb21seSBpbmNsdWRpbmcgZ2FwIGJldHdlZW4gc2hpcHNcclxuICAgICAgICAgICAgcmFuZG9tUGxhY2VtZW50KEFJR2FtZWJvYXJkLDUpOyBcclxuICAgICAgICAgICAgcmFuZG9tUGxhY2VtZW50KEFJR2FtZWJvYXJkLDQpO1xyXG4gICAgICAgICAgICByYW5kb21QbGFjZW1lbnQoQUlHYW1lYm9hcmQsMyk7XHJcbiAgICAgICAgICAgIHJhbmRvbVBsYWNlbWVudChBSUdhbWVib2FyZCwzKTtcclxuICAgICAgICAgICAgcmFuZG9tUGxhY2VtZW50KEFJR2FtZWJvYXJkLDIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmFuZG9taXplU2hpcFBsYWNlbWVudDogKCk9PiB7XHJcbiAgICAgICAgICAgIHJhbmRvbVBsYWNlbWVudChwbGF5ZXJHYW1lYm9hcmQsNSk7IFxyXG4gICAgICAgICAgICByYW5kb21QbGFjZW1lbnQocGxheWVyR2FtZWJvYXJkLDQpO1xyXG4gICAgICAgICAgICByYW5kb21QbGFjZW1lbnQocGxheWVyR2FtZWJvYXJkLDMpO1xyXG4gICAgICAgICAgICByYW5kb21QbGFjZW1lbnQocGxheWVyR2FtZWJvYXJkLDMpO1xyXG4gICAgICAgICAgICByYW5kb21QbGFjZW1lbnQocGxheWVyR2FtZWJvYXJkLDIpO1xyXG4gICAgICAgICAgICBsYXlvdXRHcmlkUGxhY2VkQ29sb3IocGxheWVyR2FtZWJvYXJkLCAncGxheWVyJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG4vLyBzdGFydEdhbWUoKS52ZXJzdXNBSSgpO1xyXG5nYW1lLnJhbmRvbWl6ZVNoaXBQbGFjZW1lbnQoKTtcclxuQUlHYW1lYm9hcmQuY2hlY2tBbGxMb2NhdGlvbigpO1xyXG5BSUdhbWVib2FyZC5jaGVja1RvdGFsSGVhbHRoKCk7XHJcblxyXG5leHBvcnQge1BMQVlFUk9ORSwgcGxheWVyR2FtZWJvYXJkLCBBSSwgQUlHYW1lYm9hcmR9Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9