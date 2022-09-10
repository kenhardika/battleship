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
        checkAttackMissed: ()=>{
            console.log(attackMissed);
            return attackMissed
        }

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
            grid.className=`${i}${alp}`;
            grid.addEventListener('click', ()=>{
                // console.log(grid.className);
                // clicked the grid
                // initiate attack() // then AI attack yours too
            })
            layer.append(grid);
        }
    });
    // for(let i = 0; i < MAX_WIDTH; i++){
    //     const grid = document.createElement('div');
    // }

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createGrid);

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
            outputArray.push((numbPlusOne).toString().concat(alph)); // right
        }
        function checkLeft(){
            outputArray.push((numbMinusOne).toString().concat(alph)); // left
        }
        function checkUp(){
            outputArray.push((numb).toString().concat(alphMinusOne)); // up
        }
        function checkDown(){
            outputArray.push((numb).toString().concat(alphPlusOne)); // down
        }
        function checkDiagUpRight(){
            outputArray.push((numbPlusOne).toString().concat(alphMinusOne)); // up right
        }
        function checkDiagDownRight(){
            outputArray.push((numbPlusOne).toString().concat(alphPlusOne)); // down right
        }
        function checkDiagUpLeft(){
            outputArray.push((numbMinusOne).toString().concat(alphMinusOne)); // up left
        }
        function checkDiagDownLeft(){
            outputArray.push((numbMinusOne).toString().concat(alphPlusOne)); // down left
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
            alphaNum = (randomNumber + i).toString().concat(randomAlp);
            array.push(alphaNum);
        }
        // console.log(array);
        // console.log(randomAxis);
        return array
    }
    else { // Y axis blocks
        for (let i = 0; i <leng; i++ ){
            const alpLoop = alphabet.charAt(alphabet.indexOf(randomAlp) + i);
            alphaNum = (randomNumber).toString().concat(alpLoop);
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

function startGame(){
    let CarrierGap = [];

    function AIPlacement(val){
        let newShipCoord = (0,_placeRandomizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(val);
        if((0,_findCommonElements_js__WEBPACK_IMPORTED_MODULE_4__["default"])(newShipCoord, AIGameboard.checkAllLocation()) === true){
            // CarrierCoord = placeRandomizer(val);
            // CarrierGap = placeGap(newShipCoord);
            console.log('clashed: reset initialize');
        } else {
            AIGameboard.placement((0,_ships_js__WEBPACK_IMPORTED_MODULE_2__["default"])(newShipCoord));
        }
    }

    return {
        versusAI: ()=>{
            AIPlacement(5);
            AIPlacement(5);
            AIPlacement(3);
        }
    }
}
startGame().versusAI();
AIGameboard.checkAllLocation();
AIGameboard.checkTotalHealth();


//startGame().versusAI();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdpQztBQUNLO0FBQ1A7QUFDb0I7QUFDTTtBQUNwQjtBQUNJOzs7QUFHekMsMEJBQTBCO0FBQzFCLGdDQUFnQzs7QUFFaEMsMERBQVU7QUFDViwwREFBVTtBQUNWLGtCQUFrQixzREFBTTtBQUN4QixXQUFXLHNEQUFNO0FBQ2pCLHdCQUF3Qix5REFBUztBQUNqQyxvQkFBb0IseURBQVM7O0FBRTdCO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkIsK0RBQWU7QUFDMUMsV0FBVyxrRUFBa0I7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLGtDQUFrQyxxREFBSztBQUN2QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDb0Q7O0FBRXBELHlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9maW5kQ29tbW9uRWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9sYXlvdXRHcmlkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxhY2VHYXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGFjZVJhbmRvbWl6ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tYWluZ2FtZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBmaW5kQ29tbW9uRWxlbWVudHMoYXJyMSwgYXJyMikge1xuICAgIHJldHVybiBhcnIxLnNvbWUoaXRlbSA9PiBhcnIyLmluY2x1ZGVzKGl0ZW0pKVxufVxuXG5leHBvcnQgZGVmYXVsdCBmaW5kQ29tbW9uRWxlbWVudHMiLCJcbmNvbnN0IGdhbWVib2FyZCA9ICgpPT4ge1xuICAgIGxldCBhbGxTaGlwID0gW107XG4gICAgbGV0IHRvdGFsSGVhbHRoID0gMDtcbiAgICBsZXQgYWxsTG9jYXRpb24gPSBbXTtcbiAgICBsZXQgYXR0YWNrTWlzc2VkID0gW107XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoQWxsTG9jYXRpb24oKXtcbiAgICAgICAgbGV0IG5ld0xvY2F0aW9uID0gW107XG4gICAgICAgIGFsbFNoaXAuZm9yRWFjaCgoc2hpcCk9PntcbiAgICAgICAgICAgIG5ld0xvY2F0aW9uID0gbmV3TG9jYXRpb24uY29uY2F0KHNoaXAubG9jYXRpb24oKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBhbGxMb2NhdGlvbiA9IG5ld0xvY2F0aW9uO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhdHRhY2tNaXNzZWRDb3VudGVyKGNvb3Ipe1xuICAgICAgICBhdHRhY2tNaXNzZWQucHVzaChjb29yKTtcbiAgICB9XG5cbiAgICAvL2NvbnNvbGUubG9nKCdnYW1lYm9hcmQgaXMgb24nKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBwbGFjZW1lbnQ6IChzaGlwcyk9PnsgLy8gZG9udCBuZWVkIGNvb3Igc2luY2UgY29vcmRpbmF0ZSBzaG91bGQgYmUgaW5zaWRlIHRoZSBzaGlwKClcbiAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgY29vcmRpbmF0ZSBpcyB2YWxpZCwgd2hpY2ggbWVhbnMgZW1wdHkgYW5kIG9uZSBibG9jayBhd2F5IGZyb20gYW5vdGhlciBzaGlwXG4gICAgICAgICAgICAvLyBwbGFjZSB0aGUgc2hpcHMgb24gdGhlIGNvb3JkaW5hdGUgICAgIFxuICAgICAgICAgICAgYWxsU2hpcC5wdXNoKHNoaXBzKTtcbiAgICAgICAgICAgIGFsbExvY2F0aW9uID0gYWxsTG9jYXRpb24uY29uY2F0KHNoaXBzLmxvY2F0aW9uKCkpO1xuICAgICAgICAgICAgLy8gbWFya3MgdGhlIGNvb3JkaW5hdGUgd2l0aCBzaGlwcycgbWFya3NcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9LFxuICAgICAgICByZWNlaXZlQXR0YWNrOiAoY29vcik9PntcbiAgICAgICAgICAgIGlmKGFsbExvY2F0aW9uLmluY2x1ZGVzKGNvb3IpID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0F0dGFjayBtaXNzZWQnKVxuICAgICAgICAgICAgICAgIGF0dGFja01pc3NlZENvdW50ZXIoY29vcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFxuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBdHRhY2sgSGl0IScpXG4gICAgICAgICAgICAgICAgYWxsU2hpcC5mb3JFYWNoKChzaGlwKT0+e1xuICAgICAgICAgICAgICAgICAgICBzaGlwLmhpdChjb29yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvLyByZWZyZXNoIHRoZSBhbGxMb2NhdGlvbiBBcnJheSBzbyB5b3UgY2Fubm90IGhpdCB0d2ljZSBvbiB0aGUgc2FtZSBjb29yZGluYXRlXG4gICAgICAgICAgICAgICAgcmVmcmVzaEFsbExvY2F0aW9uKClcbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAvLyB0b2dnbGUgY2hlY2tBbGxTaGlwKCkgdG8gbWFrZSBzdXJlIGlmIGl0cyBub3QgZW5kZ2FtZVxuICAgICAgICAgICAgLy8gaWYgbm90IG1hcmtzIHRoZSBjb29yZGluYXRlIHdpdGggbWlzc2VkQXR0YWNrKClcbiAgICAgICAgICAgIC8vcmV0dXJuXG4gICAgICAgIH0sXG4gICAgICAgIGNoZWNrVG90YWxIZWFsdGg6ICgpPT57XG4gICAgICAgICAgICAvLyBjaGVjayB0aGUgaGVhbHRoYmFyIG9mIGVhY2ggc2hpcHMgd2l0aCBzaGlwLmhlYWx0aGJhcigpXG4gICAgICAgICAgICBhbGxTaGlwLmZvckVhY2goKHNoaXApPT57XG4gICAgICAgICAgICAgICAgc2hpcC5sb2NhdGlvbigpOyBcbiAgICAgICAgICAgICAgICB0b3RhbEhlYWx0aCA9IHRvdGFsSGVhbHRoICsgc2hpcC5oZWFsdGhCYXIoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2codG90YWxIZWFsdGgpO1xuICAgICAgICAgICAgLy8gaWYgYWxsIHRoZSBoZWFsdGhiYXIgaXMgMCB0aGVuIHRoZSBnYW1lIGlzIGVuZGVkXG4gICAgICAgICAgICBpZih0b3RhbEhlYWx0aCA8PSAwKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdBTUUgT1ZFUiBBTEwgT0YgWU9VUiBTSElQUyBXUkVDS0VEXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvdGFsSGVhbHRoXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHJldHVybiB0b3RhbEhlYWx0aFxuICAgICAgICAgICAgfSBcbiAgICAgICAgfSxcbiAgICAgICAgY2hlY2tBbGxMb2NhdGlvbjogKCk9PntcbiAgICAgICAgICAgIHJlZnJlc2hBbGxMb2NhdGlvbigpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYWxsTG9jYXRpb24pO1xuICAgICAgICAgICAgcmV0dXJuIGFsbExvY2F0aW9uXG4gICAgICAgIH0sXG4gICAgICAgIGNoZWNrQXR0YWNrTWlzc2VkOiAoKT0+e1xuICAgICAgICAgICAgY29uc29sZS5sb2coYXR0YWNrTWlzc2VkKTtcbiAgICAgICAgICAgIHJldHVybiBhdHRhY2tNaXNzZWRcbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBnYW1lYm9hcmQ7XG5cbi8vIGNvbnN0IHBsYXlhID0gZ2FtZWJvYXJkKCk7XG4vLyBjb25zdCBiaWdTaGlwQ29vciA9ICc2QiA3QiA4QiA5QiAxMEInO1xuLy8gY29uc3QgbWlkU2hpcENvb3IgPSAnNEIgNEMgNEQnO1xuLy8gY29uc3QgbWlkU2hpcCA9IHNoaXBzKG1pZFNoaXBDb29yKTtcbi8vIGNvbnN0IGJpZ1NoaXAgPSBzaGlwcyhiaWdTaGlwQ29vcik7XG5cbi8vIHBsYXlhLnBsYWNlbWVudChiaWdTaGlwKTtcbi8vIHBsYXlhLnBsYWNlbWVudChtaWRTaGlwKTtcbi8vIHBsYXlhLnJlY2VpdmVBdHRhY2soXCI0QlwiKTtkZWJ1Z2dlclxuLy8gcGxheWEucmVjZWl2ZUF0dGFjayhcIjRDXCIpO2RlYnVnZ2VyXG4vLyBwbGF5YS5yZWNlaXZlQXR0YWNrKFwiNERcIik7ZGVidWdnZXJcbi8vIHBsYXlhLnJlY2VpdmVBdHRhY2soXCIzQlwiKTtkZWJ1Z2dlclxuLy8gcGxheWEuY2hlY2tBbGxMb2NhdGlvbigpO1xuLy8gcGxheWEuY2hlY2tBdHRhY2tNaXNzZWQoKTtcbi8vIHBsYXlhLmNoZWNrVG90YWxIZWFsdGgoKTsgXG4vLyByZXZpc2UgdGhpc1xuLy8gcGxheWEucGxhY2VtZW50KCcxQSAyQSAzQScsIHNoaXBzKDMpKTtcbi8vIHBsYXlhLnBsYWNlbWVudCgnM0IgNEInLCBzaGlwcygyKSk7XG4vLyBwbGF5YS5wbGFjZW1lbnQoJzZCIDdCIDhCIDlCIDEwQicsIHNoaXBzKDUpKTtcbi8vIHBsYXlhLnBsYWNlbWVudCgnNkUgN0UgOEUgOUUgMTBFJywgc2hpcHMoNSkpOyIsIlxuZnVuY3Rpb24gY3JlYXRlR3JpZCh3aG9zKXtcbiAgICBjb25zdCBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3dob3N9R2FtZWJvYXJkYCk7XG4gICAgY29uc3QgTUFYX1dJRFRIID0gMTA7XG4gICAgY29uc3QgYWxwaGFiZXQgPSAnYWJjZGVmZ2hpaic7XG4gICAgY29uc3QgYWxwaEFycmF5ID0gYWxwaGFiZXQuc3BsaXQoJycpO1xuXG4gICAgYWxwaEFycmF5LmZvckVhY2goKGFscCk9PntcbiAgICAgICAgZm9yIChsZXQgaT0xOyBpIDw9IE1BWF9XSURUSDsgaSsrICl7XG4gICAgICAgICAgICBjb25zdCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBncmlkLmNsYXNzTmFtZT1gJHtpfSR7YWxwfWA7XG4gICAgICAgICAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhncmlkLmNsYXNzTmFtZSk7XG4gICAgICAgICAgICAgICAgLy8gY2xpY2tlZCB0aGUgZ3JpZFxuICAgICAgICAgICAgICAgIC8vIGluaXRpYXRlIGF0dGFjaygpIC8vIHRoZW4gQUkgYXR0YWNrIHlvdXJzIHRvb1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGxheWVyLmFwcGVuZChncmlkKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIGZvcihsZXQgaSA9IDA7IGkgPCBNQVhfV0lEVEg7IGkrKyl7XG4gICAgLy8gICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAvLyB9XG5cbn1cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUdyaWQiLCIvLyBzZXQgZ2FwIGJ5IG9uZSBieSBvbmUgbG9vcCBjaGVja1xuXG5mdW5jdGlvbiBwbGFjZUdhcChtYWluQXJyYXkpe1xuICAgIGxldCBvdXRwdXRBcnJheSA9IFtdO1xuICAgIGxldCByZXN1bHRBcnJheSA9IFtdO1xuICAgIGNvbnN0IG51bWJlclBhdHQgPSAvWzAtOV0vZztcbiAgICBjb25zdCBhbHBoYVBhdHQgPSAvW2EtekEtWl0vZztcbiAgICBjb25zdCBhbHBoYWJldE1heCA9ICdhYmNkZWZnaGlqJztcbiAgICBjb25zdCBhbHBBcnJheSA9IGFscGhhYmV0TWF4LnNwbGl0KCcnKTtcbiAgICBtYWluQXJyYXkuZm9yRWFjaCgodmFsKT0+e1xuICAgICAgICBjb25zdCBudW1iID0gcGFyc2VJbnQodmFsLm1hdGNoKG51bWJlclBhdHQpLmpvaW4oJycpKTtcbiAgICAgICAgY29uc3QgYWxwaCA9IHZhbC5tYXRjaChhbHBoYVBhdHQpLmpvaW4oJycpO1xuICAgICAgICBjb25zdCBudW1iTWludXNPbmUgPSBudW1iIC0gMTtcbiAgICAgICAgY29uc3QgbnVtYlBsdXNPbmUgPSBudW1iICsgMTtcbiAgICAgICAgY29uc3QgYWxwaFBsdXNPbmUgPSBhbHBBcnJheVsoYWxwQXJyYXkuaW5kZXhPZihhbHBoKSkrMV07XG4gICAgICAgIGNvbnN0IGFscGhNaW51c09uZSA9IGFscEFycmF5WyhhbHBBcnJheS5pbmRleE9mKGFscGgpKS0xXTtcbiAgICAgICAgXG4gICAgICAgIGZ1bmN0aW9uIG1lcmdlQXJyYXkoKXtcbiAgICAgICAgICAgICAgLy8gbWVyZ2UgdGhlIGFycmF5XG4gICAgICAgICAgICByZXN1bHRBcnJheSA9IHJlc3VsdEFycmF5LmNvbmNhdChvdXRwdXRBcnJheSk7XG4gICAgICAgICAgICByZXN1bHRBcnJheSA9IFsuLi5uZXcgU2V0IChbLi4ubWFpbkFycmF5LC4uLm91dHB1dEFycmF5XSldOyAgXG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tSaWdodCgpe1xuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaCgobnVtYlBsdXNPbmUpLnRvU3RyaW5nKCkuY29uY2F0KGFscGgpKTsgLy8gcmlnaHRcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBjaGVja0xlZnQoKXtcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goKG51bWJNaW51c09uZSkudG9TdHJpbmcoKS5jb25jYXQoYWxwaCkpOyAvLyBsZWZ0XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tVcCgpe1xuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaCgobnVtYikudG9TdHJpbmcoKS5jb25jYXQoYWxwaE1pbnVzT25lKSk7IC8vIHVwXG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tEb3duKCl7XG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKChudW1iKS50b1N0cmluZygpLmNvbmNhdChhbHBoUGx1c09uZSkpOyAvLyBkb3duXG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tEaWFnVXBSaWdodCgpe1xuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaCgobnVtYlBsdXNPbmUpLnRvU3RyaW5nKCkuY29uY2F0KGFscGhNaW51c09uZSkpOyAvLyB1cCByaWdodFxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrRGlhZ0Rvd25SaWdodCgpe1xuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaCgobnVtYlBsdXNPbmUpLnRvU3RyaW5nKCkuY29uY2F0KGFscGhQbHVzT25lKSk7IC8vIGRvd24gcmlnaHRcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBjaGVja0RpYWdVcExlZnQoKXtcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goKG51bWJNaW51c09uZSkudG9TdHJpbmcoKS5jb25jYXQoYWxwaE1pbnVzT25lKSk7IC8vIHVwIGxlZnRcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBjaGVja0RpYWdEb3duTGVmdCgpe1xuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaCgobnVtYk1pbnVzT25lKS50b1N0cmluZygpLmNvbmNhdChhbHBoUGx1c09uZSkpOyAvLyBkb3duIGxlZnRcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWxwaE1pbnVzT25lID09IHVuZGVmaW5lZCAmJiBudW1iTWludXNPbmUgPCAxKXsgLy8gY29ybmVyIHVwIGxlZnRcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXRzIGNvcm5lciB1cCBsZWZ0Jyk7XG4gICAgICAgICAgICBjaGVja1JpZ2h0KCk7XG4gICAgICAgICAgICBjaGVja0Rvd24oKTtcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25SaWdodCgpO1xuICAgICAgICAgICAgbWVyZ2VBcnJheSgpOyBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhbHBoUGx1c09uZSA9PSB1bmRlZmluZWQgJiYgbnVtYk1pbnVzT25lIDwgMSl7IC8vIGNvcm5lciBib3R0b20gbGVmdFxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdHMgY29ybmVyIGJvdHRvbSBsZWZ0Jyk7XG4gICAgICAgICAgICBjaGVja1JpZ2h0KCk7XG4gICAgICAgICAgICBjaGVja1VwKCk7XG4gICAgICAgICAgICBjaGVja0RpYWdVcFJpZ2h0KCk7XG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7IFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFscGhNaW51c09uZSA9PSB1bmRlZmluZWQgJiYgbnVtYlBsdXNPbmUgPiAxMCl7IC8vIGNvcm5lciB1cCByaWdodCBcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXRzIGNvcm5lciB1cCByaWdodCcpO1xuICAgICAgICAgICAgY2hlY2tMZWZ0KCk7XG4gICAgICAgICAgICBjaGVja0Rvd24oKTtcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25MZWZ0KCk7XG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7IFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFscGhQbHVzT25lID09IHVuZGVmaW5lZCAmJiBudW1iUGx1c09uZSA+IDEwKXsgLy8gY29ybmVyIGJvdHRvbSByaWdodFxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdHMgY29ybmVyIGJvdHRvbSByaWdodCcpO1xuICAgICAgICAgICAgY2hlY2tMZWZ0KCk7XG4gICAgICAgICAgICBjaGVja1VwKCk7XG4gICAgICAgICAgICBjaGVja0RpYWdVcExlZnQoKTtcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTsgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobnVtYk1pbnVzT25lIDwgMSl7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0IG51bWJlciA9IDAnKTtcbiAgICAgICAgICAgIGNoZWNrUmlnaHQoKTtcbiAgICAgICAgICAgIGNoZWNrVXAoKTtcbiAgICAgICAgICAgIGNoZWNrRG93bigpO1xuICAgICAgICAgICAgY2hlY2tEaWFnVXBSaWdodCgpO1xuICAgICAgICAgICAgY2hlY2tEaWFnRG93blJpZ2h0KCk7XG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKG51bWJQbHVzT25lID4gMTApe1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdCBudW1iZXIgPiAxMCcpO1xuICAgICAgICAgICAgY2hlY2tMZWZ0KCk7XG4gICAgICAgICAgICBjaGVja1VwKCk7XG4gICAgICAgICAgICBjaGVja0Rvd24oKTtcbiAgICAgICAgICAgIGNoZWNrRGlhZ1VwTGVmdCgpO1xuICAgICAgICAgICAgY2hlY2tEaWFnRG93bkxlZnQoKTtcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFscGhNaW51c09uZSA9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdHMgdW5kZWZpbmVkJyk7XG4gICAgICAgICAgICBjaGVja0xlZnQoKTtcbiAgICAgICAgICAgIGNoZWNrUmlnaHQoKTtcbiAgICAgICAgICAgIGNoZWNrRG93bigpO1xuICAgICAgICAgICAgY2hlY2tEaWFnRG93bkxlZnQoKTtcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25SaWdodCgpOyBcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFscGhQbHVzT25lID09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0cyB1bmRlZmluZWQnKTtcbiAgICAgICAgICAgIGNoZWNrTGVmdCgpO1xuICAgICAgICAgICAgY2hlY2tSaWdodCgpO1xuICAgICAgICAgICAgY2hlY2tVcCgpOyBcbiAgICAgICAgICAgIGNoZWNrRGlhZ1VwTGVmdCgpOyBcbiAgICAgICAgICAgIGNoZWNrRGlhZ1VwUmlnaHQoKTtcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgLy8gaG9yaXpvbnRhbCBjaGVja1xuICAgICAgICAgICAgICAgIGNoZWNrTGVmdCgpO1xuICAgICAgICAgICAgICAgIGNoZWNrUmlnaHQoKTtcbiAgICAgICAgICAgICAgICAvLyB2ZXJ0aWNhbCBjaGVja1xuICAgICAgICAgICAgICAgIGNoZWNrVXAoKTtcbiAgICAgICAgICAgICAgICBjaGVja0Rvd24oKTtcbiAgICAgICAgICAgICAgICAvL2RpYWdvbmFsIGxlZnQgY2hlY2tcbiAgICAgICAgICAgICAgICBjaGVja0RpYWdVcExlZnQoKTtcbiAgICAgICAgICAgICAgICBjaGVja0RpYWdEb3duTGVmdCgpO1xuICAgICAgICAgICAgICAgIC8vZGlhZ29uYWwgcmlnaHQgY2hlY2tcbiAgICAgICAgICAgICAgICBjaGVja0RpYWdVcFJpZ2h0KCk7XG4gICAgICAgICAgICAgICAgY2hlY2tEaWFnRG93blJpZ2h0KCk7XG4gICAgICAgICAgICAgICAgbWVyZ2VBcnJheSgpO1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgXG5cbiAgICB9KTtcbiAgICAvLyBjb25zb2xlLmxvZyhvdXRwdXRBcnJheSk7XG4gICAgLy8gY29uc29sZS5sb2cocmVzdWx0QXJyYXkpO1xuICAgIHJldHVybiByZXN1bHRBcnJheVxufVxuXG4vLyBsZXQgYXJyYXkxID0gWydhJywnYicsJ2MnXTtcbi8vIGxldCBhcnJheTIgPSBbJ3onLCdhJywncyddO1xuXG4vLyBsZXQgYXJyYXkzID0gYXJyYXkxLmNvbmNhdChhcnJheTIpO1xuLy8gYXJyYXkzID0gWy4uLm5ldyBTZXQoWy4uLmFycmF5MSwuLi5hcnJheTJdKV1cblxuLy8gY29uc29sZS5sb2coYXJyYXkzKTsgXG5cbi8vIHBsYWNlR2FwKFsnMTBqJ10pO1xuLy8gcGxhY2VHYXAoWycxMGMnLCAnMTBkJywgJzEwZSddKTtcblxuZXhwb3J0IGRlZmF1bHQgcGxhY2VHYXAiLCJmdW5jdGlvbiBwbGFjZVJhbmRvbWl6ZXIobGVuZyl7XG4gICAgY29uc3QgTUFYX0dSSUQgPSAxMDsgLy8gbWF4aW11bSBncmlkIGxlbmd0aCBpcyAxMHgxMFxuICAgIGNvbnN0IHJhbmRvbUF4aXMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTsgLy8gb25seSByZXR1cm4gMC8xXG4gICAgY29uc3QgYXJyYXkgPSBbXTtcbiAgICBjb25zdCBhbHBoYWJldCA9IFwiYWJjZGVmZ2hpalwiO1xuICAgIGNvbnN0IHJhbmRvbU51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChNQVhfR1JJRCAtIGxlbmcpKSArIDE7IC8vIHRoaXMgcmFuZG9taXplciBudW1iZXIga2VlcCB5b3UgZnJvbSBvdmVyZmxvd2luZywgcGx1cyBvbmUgc28gaXQgc3RhcnQgZnJvbSAxIG5vdCAwXG4gICAgY29uc3QgcmFuZG9tQWxwID0gYWxwaGFiZXRbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYWxwaGFiZXQuc3Vic3RyaW5nKDAsKE1BWF9HUklEIC0gbGVuZykpLmxlbmd0aCldOyAvLyB0aGlzIHJhbmRvbWl6ZXIga2VlcHMgeW91IGZyb20gdmFsdWUgbW9yZSB0aGFuIGxlbmd0aFxuICAgIGxldCBhbHBoYU51bTtcblxuICAgIGlmIChyYW5kb21BeGlzID09PSAwKXsgLy8gWCBheGlzIGJsb2Nrc1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8bGVuZzsgaSsrICl7XG4gICAgICAgICAgICBhbHBoYU51bSA9IChyYW5kb21OdW1iZXIgKyBpKS50b1N0cmluZygpLmNvbmNhdChyYW5kb21BbHApO1xuICAgICAgICAgICAgYXJyYXkucHVzaChhbHBoYU51bSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coYXJyYXkpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhyYW5kb21BeGlzKTtcbiAgICAgICAgcmV0dXJuIGFycmF5XG4gICAgfVxuICAgIGVsc2UgeyAvLyBZIGF4aXMgYmxvY2tzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDxsZW5nOyBpKysgKXtcbiAgICAgICAgICAgIGNvbnN0IGFscExvb3AgPSBhbHBoYWJldC5jaGFyQXQoYWxwaGFiZXQuaW5kZXhPZihyYW5kb21BbHApICsgaSk7XG4gICAgICAgICAgICBhbHBoYU51bSA9IChyYW5kb21OdW1iZXIpLnRvU3RyaW5nKCkuY29uY2F0KGFscExvb3ApO1xuICAgICAgICAgICAgYXJyYXkucHVzaChhbHBoYU51bSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coYXJyYXkpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhyYW5kb21BeGlzKTtcbiAgICAgICAgcmV0dXJuIGFycmF5XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgcGxhY2VSYW5kb21pemVyIiwiXG4vLyBjb25zdCB5b3VyR2FtZWJvYXJkID0gZ2FtZWJvYXJkKCk7XG4vLyBjb25zdCBodW1hbkdhbWVib2FyZCA9IGdhbWVib2FyZCgpO1xuLy8gY29uc3QgQUlHYW1lYm9hcmQgPSBnYW1lYm9hcmQoKTtcblxuY29uc3QgcGxheWVyID0gKCkgPT4ge1xuICAgIC8vIHBsYXllciBzaG91bGQgdGFrZSB0dXJucyBwbGF5aW5nIHRoZSBnYW1lIGJ5IGF0dGFja2luZyBvcHBvbmVudCdzIGdhbWVib2FyZC5cbiAgICBsZXQgYXR0YWNrU3RhdHVzID0gJ09GRic7XG4gICAgLy8gcGxheWVyIGF0dGFja2luZyBzdGF0ZSBpcyBPTlxuICAgIC8vIHBsYXllciBDSE9PU0UgdGhlIGNvb3JkaW5hdGUgb2Ygb3Bwb25lbnQncyBnYW1lYm9hcmQuXG4gICAgLy8gcGxheWVyIGF0dGFja2luZyBzdGF0ZSBpcyBPRkZcbiAgICAvLyBsZXQgeW91ckdhbWVib2FyZCA9IGdhbWVib2FyZCgpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHRvZ2dsZUF0dGFja09OIDogKCk9PiBhdHRhY2tTdGF0dXMgPSBcIk9OXCIsXG4gICAgICAgIHRvZ2dsZUF0dGFja09GRiA6ICgpPT4gYXR0YWNrU3RhdHVzID0gXCJPRkZcIixcbiAgICAgICAgY2hlY2tBdHRhY2s6ICgpPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYXR0YWNrU3RhdHVzKTsgXG4gICAgICAgICAgICByZXR1cm4gYXR0YWNrU3RhdHVzXG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgIH1cbn1cblxuLy8gbGV0IHBsYXllID0gcGxheWVyKCk7XG5cblxuLy8gcGxheWUuY2hlY2tBdHRhY2soKTtcbi8vIHBsYXllLnRvZ2dsZUF0dGFja09OKCk7XG4vLyBwbGF5ZS5jaGVja0F0dGFjaygpO1xuXG5cbmV4cG9ydCBkZWZhdWx0IHBsYXllcjsiLCJcbmNvbnN0IHNoaXBzID0gKGNvb3JkKSA9PnsgLy8gbGVuZ3RoIHdpbGwgYmUgZnJvbSBzaXplIG9mIHRoZSBzaGlwXG4gICAgLy8gbGV0IGNvb3JkID0gbG9jLnNwbGl0KCcsJyk7XG4gICAgbGV0IGhlYWx0aEJhciA9IGNvb3JkLmxlbmd0aDtcbiAgICByZXR1cm4ge1xuICAgICAgICBsZW5ndGg6ICgpPT57XG4gICAgICAgICAgICByZXR1cm4gbGVuIFxuICAgICAgICB9LFxuICAgICAgICBoaXQ6IChsb2MpPT57XG4gICAgICAgICAgICAvL2dldCB0aGUgYXR0Y2sgaGl0IGxvY2F0aW9uXG4gICAgICAgICAgICBpZiAoY29vcmQuaW5jbHVkZXMobG9jKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJhdHRhY2sgbWlzc2VkXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGNvb3JkLmluY2x1ZGVzKGxvYykgPT09IHRydWUpe1xuICAgICAgICAgICAgICAgIGNvb3JkID0gY29vcmQuZmlsdGVyKCAodmFsKT0+e1xuICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWwgIT09IGxvY1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGhlYWx0aEJhciA9IGhlYWx0aEJhciAtIDE7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL21hcmsgcG9zaXRpb24gaW4gZ2FtZWJvYXJkIGFzIGEgaGl0XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInRoaXMgc2hpcCB0b29rIGhpdDogXCIgKyBudW0pXG4gICAgICAgICAgICAvL3JldHVybiBcbiAgICAgICAgfSxcbiAgICAgICAgaXNTdW5rOiAoKT0+e1xuICAgICAgICAgICAgLy9jaGVjayB0aGUgc2hpcCBpZiBzdW5rZW4geWV0XG4gICAgICAgICAgICBpZihoZWFsdGhCYXIgPD0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzaGlwIGlzIGRlc3Ryb3llZCcpO1xuICAgICAgICAgICAgICAgIHJldHVybiAgXG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NoaXAgaXMgc3RpbGwgaW50YWN0Jyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBcbiAgICAgICAgaGVhbHRoQmFyIDogKCk9PiB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwidGhpcyBzaGlwIGhlYWx0aDogXCIgKyBoZWFsdGhCYXIpO1xuICAgICAgICAgICAgcmV0dXJuIGhlYWx0aEJhclxuICAgICAgICB9LFxuICAgICAgICBsb2NhdGlvbjogKCk9PntcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coY29vcmQpXG4gICAgICAgICAgICByZXR1cm4gY29vcmRcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gY29uc3QgYmlnU2hpcCA9IHNoaXBzKFwiM0EgNEEgNUEgNkEgN0FcIik7XG4vLyBjb25zdCBtaWRTaGlwMiA9IHNoaXBzKFwiMTJBIDEyQiAxMkNcIik7XG4vLyBjb25zdCBzbWFsbFNoaXAgPSBzaGlwcyhcIjRCXCIpO1xuXG4vLyBiaWdTaGlwLmxvY2F0aW9uKCk7XG4vLyBiaWdTaGlwLmhlYWx0aEJhcigpO1xuLy8gYmlnU2hpcC5oaXQoXCIzQVwiKTtcbi8vIGJpZ1NoaXAubG9jYXRpb24oKTtcbi8vIGJpZ1NoaXAuaGVhbHRoQmFyKCk7XG4vLyBiaWdTaGlwLmhpdChcIjhBXCIpO1xuLy8gYmlnU2hpcC5sb2NhdGlvbigpO1xuLy8gYmlnU2hpcC5oZWFsdGhCYXIoKTtcbi8vIGJpZ1NoaXAuaGl0KFwiNEFcIik7XG4vLyBiaWdTaGlwLmhpdChcIjVBXCIpO1xuLy8gYmlnU2hpcC5oaXQoXCI2QVwiKTtcbi8vIGJpZ1NoaXAubG9jYXRpb24oKTtcbi8vIGJpZ1NoaXAuaGVhbHRoQmFyKCk7XG4vLyBiaWdTaGlwLmlzU3VuaygpO1xuLy8gYmlnU2hpcC5oaXQoXCI3QVwiKTtcbi8vIGJpZ1NoaXAubG9jYXRpb24oKTtcbi8vIGJpZ1NoaXAuaGVhbHRoQmFyKCk7XG4vLyBiaWdTaGlwLmlzU3VuaygpO1xuXG5leHBvcnQgZGVmYXVsdCBzaGlwcyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gaW4gdGhpcyBmaWxlIHdlIGFyZSBnb25uYSBnYXRoZXIgYWxsIHRoZSBjb21wb25lbnRzIG9mIEJhdHRsZXNoaXAgVGhlIEdhbWUgYW5kIHR1cm4gaXQgaW50byByZWFsIGdhbWVcblxuLy8gcGxheWVyLiBXaGF0IGRvZXMgcGxheWVyIGRvLlxuLy8gcGxheWVyIHN0YXJ0IHRoZSBnYW1lIGJ5IGNob29zaW5nIHdobyB5b3VyZSBwbGF5aW5nIHdpdGhcbi8vIHBsYXllciBjaG9vc2UgaXMgaXQgZ29ubmEgYmUgdnMgQUkgb3IgdnMgSHVtYW5cbi8vIGF0IHRoaXMgcG9pbnQsIGlmIHlvdSBjaG9vc2UgQUkuIEFJIHdpbGwgYXV0b21hdGljYWxseSBwbGFjZSB0aGVpciBzaGlwcyByYW5kb21seSBvbiBnYW1lYm9hcmQuXG4vLyBwbGF5ZXIgY2hvb3NlIHRoZSBzaGlwcyBwbGFjZW1lbnQgYWNjcm9zcyB0aGUgZ2FtZWJvYXJkLlxuLy8gc2hpcCdzIHBsYWNlbWVudCBpcyBiYXNlZCBvbiBvbmUgcnVsZSB0aGF0IHRoZXJlIGlzIGFsd2F5cyBvbmUgZW1wdHkgYmxvY2sgYmV0d2VlbiBvbmUgYW5kIGFub3RoZXIgcGxhY2VkIHNoaXBzXG4vLyBwbGF5ZXIgaGF2ZSBhIGNob2ljZSB0byByYW5kb21seSBwbGFjZSB0aGUgc2hpcHMgYnkgY2xpY2tpbmcgdGhlIHJhbmRvbSBidXR0b24uIFxuLy8gcGxheWVyIHBsYWNlbWVudCBvcmRlciBpcy4uIGZpcnN0IHlvdSBwbGFjZSBvbmUgYmlnIHNoaXAgKDUgaW4gbGVuZ3RoKSwgdGhlbiB0d28gbWlkIHNoaXAgKDMgaW4gbGVuZ3RoKSwgdGhlbiB0aHJlZSBzbWFsbCBzaGlwICgyIGluIGxlbmd0aCkgXG4vLyBhZnRlciBhbGwgc2hpcHMgYXJlIHBsYWNlZCwgZ2FtZSBpbml0aWF0ZSB0byBzdGFydCBhdHRhY2tpbmcgYnkgY2hvb3NpbmcgdGhlIG9wcG9uZW50cydzIGdhbWVib2FyZC4gVGhpcyBwaGFzZSB5b3UgY291bGQgaGl0IG9wcG9uZW50cydzIHNoaXAuXG4vLyBhZnRlciB5b3UgYXR0YWNrIG9wcG9uZW50J3Mgc2hpcCwgZ2FtZSBhdXRvbWF0aWNhbGx5IGNoYW5nZSB0byBvcHBvbmVudCdzIHR1cm4uIFRoaXMgdGltZSBPcHBvbmVudCdzIHdpbGwgaW5pdGlhdGUgYXR0YWNrIHBsYXllcidzIGdhbWVib2FyZCByYW5kb21seS5cbi8vIFRoZSBBSSBkb2VzIG5vdCBoYXZlIHRvIGJlIHNtYXJ0LCBidXQgaXQgc2hvdWxkIGtub3cgd2hldGhlciBvciBub3QgYSBnaXZlbiBtb3ZlIGlzIGxlZ2FsLiAoaS5lLiBpdCBzaG91bGRu4oCZdCBzaG9vdCB0aGUgc2FtZSBjb29yZGluYXRlIHR3aWNlKS4gXG4vLyBHYW1lIHJlcGVhdGluZyB0aGUgcHJldmlvdXMgc3RlcCB1bnRpbCBvbmUgb2YgdGhlIHBsYXllci9BSSBzaGlwcyBhcmUgZnVsbHkgY2xlYW5lZCAoYWxsIGRlc3Ryb3llZClcbi8vIGdhbWUgZW5kaW5nIGlmIG9uZSBvZiB0aGUgcGxheWVyL0FJIHRvdGFsIGhlYWx0aGJhciAoc2hpcHMpIGFyZSA9IDAuIFxuLy8gMVx0Q2Fycmllclx0NVxuLy8gMlx0QmF0dGxlc2hpcFx0NFxuLy8gM1x0Q3J1aXNlclx0M1xuLy8gNFx0U3VibWFyaW5lXHQzXG4vLyA1XHREZXN0cm95ZXJcdDJcblxuXG5pbXBvcnQgcGxheWVyIGZyb20gXCIuL3BsYXllci5qc1wiO1xuaW1wb3J0IGdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmQuanNcIlxuaW1wb3J0IHNoaXBzIGZyb20gXCIuL3NoaXBzLmpzXCI7XG5pbXBvcnQgcGxhY2VSYW5kb21pemVyIGZyb20gXCIuL3BsYWNlUmFuZG9taXplci5qc1wiO1xuaW1wb3J0IGZpbmRDb21tb25FbGVtZW50cyBmcm9tIFwiLi9maW5kQ29tbW9uRWxlbWVudHMuanNcIjtcbmltcG9ydCBwbGFjZUdhcCBmcm9tIFwiLi9wbGFjZUdhcC5qc1wiO1xuaW1wb3J0IGNyZWF0ZUdyaWQgZnJvbSBcIi4vbGF5b3V0R3JpZC5qc1wiO1xuXG5cbi8vIGNvbnNvbGUubG9nKFBMQVlFUk9ORSk7ZGVidWdnZXJcbi8vIGNvbnNvbGUubG9nKHBsYXllckdhbWVib2FyZCk7ZGVidWdnZXJcblxuY3JlYXRlR3JpZCgnQUknKTtcbmNyZWF0ZUdyaWQoJ3BsYXllcicpO1xuY29uc3QgUExBWUVST05FID0gcGxheWVyKCk7IFxuY29uc3QgQUkgPSBwbGF5ZXIoKTtcbmNvbnN0IHBsYXllckdhbWVib2FyZCA9IGdhbWVib2FyZCgpO1xuY29uc3QgQUlHYW1lYm9hcmQgPSBnYW1lYm9hcmQoKTtcblxuZnVuY3Rpb24gc3RhcnRHYW1lKCl7XG4gICAgbGV0IENhcnJpZXJHYXAgPSBbXTtcblxuICAgIGZ1bmN0aW9uIEFJUGxhY2VtZW50KHZhbCl7XG4gICAgICAgIGxldCBuZXdTaGlwQ29vcmQgPSBwbGFjZVJhbmRvbWl6ZXIodmFsKTtcbiAgICAgICAgaWYoZmluZENvbW1vbkVsZW1lbnRzKG5ld1NoaXBDb29yZCwgQUlHYW1lYm9hcmQuY2hlY2tBbGxMb2NhdGlvbigpKSA9PT0gdHJ1ZSl7XG4gICAgICAgICAgICAvLyBDYXJyaWVyQ29vcmQgPSBwbGFjZVJhbmRvbWl6ZXIodmFsKTtcbiAgICAgICAgICAgIC8vIENhcnJpZXJHYXAgPSBwbGFjZUdhcChuZXdTaGlwQ29vcmQpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NsYXNoZWQ6IHJlc2V0IGluaXRpYWxpemUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEFJR2FtZWJvYXJkLnBsYWNlbWVudChzaGlwcyhuZXdTaGlwQ29vcmQpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHZlcnN1c0FJOiAoKT0+e1xuICAgICAgICAgICAgQUlQbGFjZW1lbnQoNSk7XG4gICAgICAgICAgICBBSVBsYWNlbWVudCg1KTtcbiAgICAgICAgICAgIEFJUGxhY2VtZW50KDMpO1xuICAgICAgICB9XG4gICAgfVxufVxuc3RhcnRHYW1lKCkudmVyc3VzQUkoKTtcbkFJR2FtZWJvYXJkLmNoZWNrQWxsTG9jYXRpb24oKTtcbkFJR2FtZWJvYXJkLmNoZWNrVG90YWxIZWFsdGgoKTtcbmV4cG9ydCB7UExBWUVST05FLCBwbGF5ZXJHYW1lYm9hcmQsIEFJLCBBSUdhbWVib2FyZH1cblxuLy9zdGFydEdhbWUoKS52ZXJzdXNBSSgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==