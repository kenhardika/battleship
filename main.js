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
    // for(let i = 0; i < MAX_WIDTH; i++){
    //     const grid = document.createElement('div');
    // }

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
                let layer = document.querySelector(`.${user}Gameboard`);
                let gap = layer.querySelector(`.${arrayLoc}`);
                gap.classList.add('gap');
        });

        currentShip.forEach((curship)=>{
            let layer = document.querySelector(`.${user}Gameboard`);
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

function startGame(){
    function AIPlacement(val){
        let newShipCoord = (0,_placeRandomizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(val);
        let newShipWithGap = (0,_placeGap_js__WEBPACK_IMPORTED_MODULE_5__["default"])(newShipCoord);

        function reRandomizeWithGap(){
            newShipCoord = (0,_placeRandomizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(val);
            newShipWithGap = (0,_placeGap_js__WEBPACK_IMPORTED_MODULE_5__["default"])(newShipCoord);
        }

        function checkAndAddElements(newest, current, val){
            if ((0,_findCommonElements_js__WEBPACK_IMPORTED_MODULE_4__["default"])(newest, current) === false){ // if there IS NOT common elements inside of both array (not clashed), proceed to add to gameboard
                AIGameboard.placement((0,_ships_js__WEBPACK_IMPORTED_MODULE_2__["default"])(newShipCoord));
                AIGameboard.addGapLocation((0,_placeGap_js__WEBPACK_IMPORTED_MODULE_5__["default"])(newShipCoord));
            }
            else { // if there IS common element inside both array, randomize the ship placement again, then repeat this function
                console.log('clashed initiate recurese check');
                reRandomizeWithGap();
                checkAndAddElements(newShipCoord, AIGameboard.allGapLocation, val); // repeat this function again
            }
        }
        // starts here
        checkAndAddElements(newShipWithGap, AIGameboard.allGapLocation, val);
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
(0,_layoutGridPlacedColor_js__WEBPACK_IMPORTED_MODULE_7__["default"])(AIGameboard, 'AI');


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWU7Ozs7Ozs7Ozs7Ozs7O0FDSmY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsU0FBUyxFQUFDO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3Qiw2QkFBNkI7QUFDN0IsNkJBQTZCO0FBQzdCLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzVHQTtBQUNBO0FBQ0EsNkNBQTZDLEtBQUs7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixnQkFBZ0I7QUFDdEM7QUFDQSw4QkFBOEIsSUFBSSxFQUFFLEVBQUU7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBLEtBQUs7QUFDTCxzQkFBc0IsZUFBZTtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlOzs7Ozs7Ozs7Ozs7OztBQ3hCZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELEtBQUs7QUFDNUQsa0RBQWtELFNBQVM7QUFDM0Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLG1EQUFtRCxLQUFLO0FBQ3hELCtDQUErQyxRQUFRO0FBQ3ZEO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGlFQUFlOzs7Ozs7Ozs7Ozs7OztBQ3JCZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUVBQXFFO0FBQ3JFO0FBQ0E7QUFDQSxzRUFBc0U7QUFDdEU7QUFDQTtBQUNBLHNFQUFzRTtBQUN0RTtBQUNBO0FBQ0EscUVBQXFFO0FBQ3JFO0FBQ0E7QUFDQSw2RUFBNkU7QUFDN0U7QUFDQTtBQUNBLDRFQUE0RTtBQUM1RTtBQUNBO0FBQ0EsOEVBQThFO0FBQzlFO0FBQ0E7QUFDQSw2RUFBNkU7QUFDN0U7QUFDQSw0REFBNEQ7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRUFBZ0U7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlOzs7Ozs7Ozs7Ozs7OztBQ3RKZjtBQUNBLHlCQUF5QjtBQUN6QixzREFBc0Q7QUFDdEQ7QUFDQTtBQUNBLDRFQUE0RTtBQUM1RSw0R0FBNEc7QUFDNUc7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQix3QkFBd0IsU0FBUztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCx3QkFBd0IsU0FBUztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZTs7Ozs7Ozs7Ozs7Ozs7QUM3QmY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLE1BQU07Ozs7Ozs7Ozs7Ozs7O0FDL0JyQjtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlOzs7Ozs7VUN0RWY7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNpQztBQUNLO0FBQ1A7QUFDb0I7QUFDTTtBQUNwQjtBQUNJO0FBQ3NCO0FBQy9EO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUIsZ0NBQWdDO0FBQ2hDO0FBQ0EsMERBQVU7QUFDViwwREFBVTtBQUNWLGtCQUFrQixzREFBTTtBQUN4QixXQUFXLHNEQUFNO0FBQ2pCLHdCQUF3Qix5REFBUztBQUNqQyxvQkFBb0IseURBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLCtEQUFlO0FBQzFDLDZCQUE2Qix3REFBUTtBQUNyQztBQUNBO0FBQ0EsMkJBQTJCLCtEQUFlO0FBQzFDLDZCQUE2Qix3REFBUTtBQUNyQztBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isa0VBQWtCLDhCQUE4QjtBQUNoRSxzQ0FBc0MscURBQUs7QUFDM0MsMkNBQTJDLHdEQUFRO0FBQ25EO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQSxvRkFBb0Y7QUFDcEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxRUFBcUI7QUFDckIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZpbmRDb21tb25FbGVtZW50cy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2xheW91dEdyaWQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9sYXlvdXRHcmlkUGxhY2VkQ29sb3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGFjZUdhcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYWNlUmFuZG9taXplci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21haW5nYW1lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGZpbmRDb21tb25FbGVtZW50cyhhcnIxLCBhcnIyKSB7XHJcbiAgICByZXR1cm4gYXJyMS5zb21lKGl0ZW0gPT4gYXJyMi5pbmNsdWRlcyhpdGVtKSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZmluZENvbW1vbkVsZW1lbnRzIiwiXHJcbmNvbnN0IGdhbWVib2FyZCA9ICgpPT4ge1xyXG4gICAgbGV0IGFsbFNoaXAgPSBbXTtcclxuICAgIGxldCB0b3RhbEhlYWx0aCA9IDA7XHJcbiAgICBsZXQgYWxsTG9jYXRpb24gPSBbXTtcclxuICAgIGxldCBhdHRhY2tNaXNzZWQgPSBbXTtcclxuICAgIGxldCBhbGxHYXBMb2NhdGlvbiA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJlZnJlc2hBbGxMb2NhdGlvbigpe1xyXG4gICAgICAgIGxldCBuZXdMb2NhdGlvbiA9IFtdO1xyXG4gICAgICAgIGFsbFNoaXAuZm9yRWFjaCgoc2hpcCk9PntcclxuICAgICAgICAgICAgbmV3TG9jYXRpb24gPSBuZXdMb2NhdGlvbi5jb25jYXQoc2hpcC5sb2NhdGlvbigpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhbGxMb2NhdGlvbiA9IG5ld0xvY2F0aW9uO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gYXR0YWNrTWlzc2VkQ291bnRlcihjb29yKXtcclxuICAgICAgICBhdHRhY2tNaXNzZWQucHVzaChjb29yKTtcclxuICAgIH1cclxuXHJcbiAgICAvL2NvbnNvbGUubG9nKCdnYW1lYm9hcmQgaXMgb24nKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcGxhY2VtZW50OiAoc2hpcHMpPT57IC8vIGRvbnQgbmVlZCBjb29yIHNpbmNlIGNvb3JkaW5hdGUgc2hvdWxkIGJlIGluc2lkZSB0aGUgc2hpcCgpXHJcbiAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgY29vcmRpbmF0ZSBpcyB2YWxpZCwgd2hpY2ggbWVhbnMgZW1wdHkgYW5kIG9uZSBibG9jayBhd2F5IGZyb20gYW5vdGhlciBzaGlwXHJcbiAgICAgICAgICAgIC8vIHBsYWNlIHRoZSBzaGlwcyBvbiB0aGUgY29vcmRpbmF0ZSAgICAgXHJcbiAgICAgICAgICAgIGFsbFNoaXAucHVzaChzaGlwcyk7XHJcbiAgICAgICAgICAgIGFsbExvY2F0aW9uID0gYWxsTG9jYXRpb24uY29uY2F0KHNoaXBzLmxvY2F0aW9uKCkpO1xyXG4gICAgICAgICAgICAvLyBtYXJrcyB0aGUgY29vcmRpbmF0ZSB3aXRoIHNoaXBzJyBtYXJrc1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlY2VpdmVBdHRhY2s6IChjb29yKT0+e1xyXG4gICAgICAgICAgICBpZihhbGxMb2NhdGlvbi5pbmNsdWRlcyhjb29yKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0F0dGFjayBtaXNzZWQnKVxyXG4gICAgICAgICAgICAgICAgYXR0YWNrTWlzc2VkQ291bnRlcihjb29yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQXR0YWNrIEhpdCEnKVxyXG4gICAgICAgICAgICAgICAgYWxsU2hpcC5mb3JFYWNoKChzaGlwKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHNoaXAuaGl0KGNvb3IpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyByZWZyZXNoIHRoZSBhbGxMb2NhdGlvbiBBcnJheSBzbyB5b3UgY2Fubm90IGhpdCB0d2ljZSBvbiB0aGUgc2FtZSBjb29yZGluYXRlXHJcbiAgICAgICAgICAgICAgICByZWZyZXNoQWxsTG9jYXRpb24oKVxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAvLyB0b2dnbGUgY2hlY2tBbGxTaGlwKCkgdG8gbWFrZSBzdXJlIGlmIGl0cyBub3QgZW5kZ2FtZVxyXG4gICAgICAgICAgICAvLyBpZiBub3QgbWFya3MgdGhlIGNvb3JkaW5hdGUgd2l0aCBtaXNzZWRBdHRhY2soKVxyXG4gICAgICAgICAgICAvL3JldHVyblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2hlY2tUb3RhbEhlYWx0aDogKCk9PntcclxuICAgICAgICAgICAgLy8gY2hlY2sgdGhlIGhlYWx0aGJhciBvZiBlYWNoIHNoaXBzIHdpdGggc2hpcC5oZWFsdGhiYXIoKVxyXG4gICAgICAgICAgICBhbGxTaGlwLmZvckVhY2goKHNoaXApPT57XHJcbiAgICAgICAgICAgICAgICBzaGlwLmxvY2F0aW9uKCk7IFxyXG4gICAgICAgICAgICAgICAgdG90YWxIZWFsdGggPSB0b3RhbEhlYWx0aCArIHNoaXAuaGVhbHRoQmFyKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0b3RhbEhlYWx0aCk7XHJcbiAgICAgICAgICAgIC8vIGlmIGFsbCB0aGUgaGVhbHRoYmFyIGlzIDAgdGhlbiB0aGUgZ2FtZSBpcyBlbmRlZFxyXG4gICAgICAgICAgICBpZih0b3RhbEhlYWx0aCA8PSAwKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR0FNRSBPVkVSIEFMTCBPRiBZT1VSIFNISVBTIFdSRUNLRURcIilcclxuICAgICAgICAgICAgICAgIHJldHVybiB0b3RhbEhlYWx0aFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG90YWxIZWFsdGhcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoZWNrQWxsTG9jYXRpb246ICgpPT57XHJcbiAgICAgICAgICAgIHJlZnJlc2hBbGxMb2NhdGlvbigpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhbGxMb2NhdGlvbik7XHJcbiAgICAgICAgICAgIHJldHVybiBhbGxMb2NhdGlvblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWRkR2FwTG9jYXRpb246IChhcnJheSk9PiB7XHJcbiAgICAgICAgICAgIC8vIGdhcExvY2F0aW9uLnB1c2goYXJyYXkpO1xyXG4gICAgICAgICAgICBhcnJheS5mb3JFYWNoKChhcnIpPT57XHJcbiAgICAgICAgICAgICAgICBhbGxHYXBMb2NhdGlvbi5wdXNoKGFycik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIFxyXG4gICAgICAgIGNoZWNrR2FwTG9jYXRpb246ICgpPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhbGxHYXBMb2NhdGlvbik7XHJcbiAgICAgICAgICAgIHJldHVybiBhbGxHYXBMb2NhdGlvblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2hlY2tBdHRhY2tNaXNzZWQ6ICgpPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGF0dGFja01pc3NlZCk7XHJcbiAgICAgICAgICAgIHJldHVybiBhdHRhY2tNaXNzZWRcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFsbEdhcExvY2F0aW9uLFxyXG4gICAgICAgIGFsbExvY2F0aW9uXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdhbWVib2FyZDtcclxuXHJcbi8vIGNvbnN0IHBsYXlhID0gZ2FtZWJvYXJkKCk7XHJcbi8vIGNvbnN0IGJpZ1NoaXBDb29yID0gJzZCIDdCIDhCIDlCIDEwQic7XHJcbi8vIGNvbnN0IG1pZFNoaXBDb29yID0gJzRCIDRDIDREJztcclxuLy8gY29uc3QgbWlkU2hpcCA9IHNoaXBzKG1pZFNoaXBDb29yKTtcclxuLy8gY29uc3QgYmlnU2hpcCA9IHNoaXBzKGJpZ1NoaXBDb29yKTtcclxuXHJcbi8vIHBsYXlhLnBsYWNlbWVudChiaWdTaGlwKTtcclxuLy8gcGxheWEucGxhY2VtZW50KG1pZFNoaXApO1xyXG4vLyBwbGF5YS5yZWNlaXZlQXR0YWNrKFwiNEJcIik7ZGVidWdnZXJcclxuLy8gcGxheWEucmVjZWl2ZUF0dGFjayhcIjRDXCIpO2RlYnVnZ2VyXHJcbi8vIHBsYXlhLnJlY2VpdmVBdHRhY2soXCI0RFwiKTtkZWJ1Z2dlclxyXG4vLyBwbGF5YS5yZWNlaXZlQXR0YWNrKFwiM0JcIik7ZGVidWdnZXJcclxuLy8gcGxheWEuY2hlY2tBbGxMb2NhdGlvbigpO1xyXG4vLyBwbGF5YS5jaGVja0F0dGFja01pc3NlZCgpO1xyXG4vLyBwbGF5YS5jaGVja1RvdGFsSGVhbHRoKCk7IFxyXG4vLyByZXZpc2UgdGhpc1xyXG4vLyBwbGF5YS5wbGFjZW1lbnQoJzFBIDJBIDNBJywgc2hpcHMoMykpO1xyXG4vLyBwbGF5YS5wbGFjZW1lbnQoJzNCIDRCJywgc2hpcHMoMikpO1xyXG4vLyBwbGF5YS5wbGFjZW1lbnQoJzZCIDdCIDhCIDlCIDEwQicsIHNoaXBzKDUpKTtcclxuLy8gcGxheWEucGxhY2VtZW50KCc2RSA3RSA4RSA5RSAxMEUnLCBzaGlwcyg1KSk7IiwiXHJcbmZ1bmN0aW9uIGNyZWF0ZUdyaWQod2hvcyl7XHJcbiAgICBjb25zdCBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3dob3N9R2FtZWJvYXJkYCk7XHJcbiAgICBjb25zdCBNQVhfV0lEVEggPSAxMDtcclxuICAgIGNvbnN0IGFscGhhYmV0ID0gJ2FiY2RlZmdoaWonO1xyXG4gICAgY29uc3QgYWxwaEFycmF5ID0gYWxwaGFiZXQuc3BsaXQoJycpO1xyXG5cclxuICAgIGFscGhBcnJheS5mb3JFYWNoKChhbHApPT57XHJcbiAgICAgICAgZm9yIChsZXQgaT0xOyBpIDw9IE1BWF9XSURUSDsgaSsrICl7XHJcbiAgICAgICAgICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgZ3JpZC5jbGFzc05hbWU9YCR7YWxwfSR7aX1gO1xyXG4gICAgICAgICAgICAvLyBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGdyaWQuY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgIC8vIGNsaWNrZWQgdGhlIGdyaWRcclxuICAgICAgICAgICAgICAgIC8vIGluaXRpYXRlIGF0dGFjaygpIC8vIHRoZW4gQUkgYXR0YWNrIHlvdXJzIHRvb1xyXG4gICAgICAgICAgICAvLyB9KVxyXG4gICAgICAgICAgICBsYXllci5hcHBlbmQoZ3JpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvLyBmb3IobGV0IGkgPSAwOyBpIDwgTUFYX1dJRFRIOyBpKyspe1xyXG4gICAgLy8gICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIC8vIH1cclxuXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlR3JpZCIsImZ1bmN0aW9uIGxheW91dEdyaWRQbGFjZWRDb2xvcihnYW1lYm9hcmQsIHVzZXIpe1xyXG4gICAgbGV0IGN1cnJlbnRHYXAgPSBnYW1lYm9hcmQuYWxsR2FwTG9jYXRpb247XHJcbiAgICBsZXQgY3VycmVudFNoaXAgPSBnYW1lYm9hcmQuY2hlY2tBbGxMb2NhdGlvbigpO1xyXG4gICAgaWYgKCFjdXJyZW50R2FwKXtcclxuICAgICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGN1cnJlbnRHYXAuZm9yRWFjaCgoYXJyYXlMb2MpPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt1c2VyfUdhbWVib2FyZGApO1xyXG4gICAgICAgICAgICAgICAgbGV0IGdhcCA9IGxheWVyLnF1ZXJ5U2VsZWN0b3IoYC4ke2FycmF5TG9jfWApO1xyXG4gICAgICAgICAgICAgICAgZ2FwLmNsYXNzTGlzdC5hZGQoJ2dhcCcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjdXJyZW50U2hpcC5mb3JFYWNoKChjdXJzaGlwKT0+e1xyXG4gICAgICAgICAgICBsZXQgbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt1c2VyfUdhbWVib2FyZGApO1xyXG4gICAgICAgICAgICBsZXQgc2hpcCA9IGxheWVyLnF1ZXJ5U2VsZWN0b3IoYC4ke2N1cnNoaXB9YCk7XHJcbiAgICAgICAgICAgIHNoaXAuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsYXlvdXRHcmlkUGxhY2VkQ29sb3IiLCIvLyBzZXQgZ2FwIGJ5IG9uZSBieSBvbmUgbG9vcCBjaGVja1xyXG5cclxuZnVuY3Rpb24gcGxhY2VHYXAobWFpbkFycmF5KXtcclxuICAgIGxldCBvdXRwdXRBcnJheSA9IFtdO1xyXG4gICAgbGV0IHJlc3VsdEFycmF5ID0gW107XHJcbiAgICBjb25zdCBudW1iZXJQYXR0ID0gL1swLTldL2c7XHJcbiAgICBjb25zdCBhbHBoYVBhdHQgPSAvW2EtekEtWl0vZztcclxuICAgIGNvbnN0IGFscGhhYmV0TWF4ID0gJ2FiY2RlZmdoaWonO1xyXG4gICAgY29uc3QgYWxwQXJyYXkgPSBhbHBoYWJldE1heC5zcGxpdCgnJyk7XHJcbiAgICBtYWluQXJyYXkuZm9yRWFjaCgodmFsKT0+e1xyXG4gICAgICAgIGNvbnN0IG51bWIgPSBwYXJzZUludCh2YWwubWF0Y2gobnVtYmVyUGF0dCkuam9pbignJykpO1xyXG4gICAgICAgIGNvbnN0IGFscGggPSB2YWwubWF0Y2goYWxwaGFQYXR0KS5qb2luKCcnKTtcclxuICAgICAgICBjb25zdCBudW1iTWludXNPbmUgPSBudW1iIC0gMTtcclxuICAgICAgICBjb25zdCBudW1iUGx1c09uZSA9IG51bWIgKyAxO1xyXG4gICAgICAgIGNvbnN0IGFscGhQbHVzT25lID0gYWxwQXJyYXlbKGFscEFycmF5LmluZGV4T2YoYWxwaCkpKzFdO1xyXG4gICAgICAgIGNvbnN0IGFscGhNaW51c09uZSA9IGFscEFycmF5WyhhbHBBcnJheS5pbmRleE9mKGFscGgpKS0xXTtcclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBtZXJnZUFycmF5KCl7XHJcbiAgICAgICAgICAgICAgLy8gbWVyZ2UgdGhlIGFycmF5XHJcbiAgICAgICAgICAgIHJlc3VsdEFycmF5ID0gcmVzdWx0QXJyYXkuY29uY2F0KG91dHB1dEFycmF5KTtcclxuICAgICAgICAgICAgcmVzdWx0QXJyYXkgPSBbLi4ubmV3IFNldCAoWy4uLm1haW5BcnJheSwuLi5vdXRwdXRBcnJheV0pXTsgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBjaGVja1JpZ2h0KCl7XHJcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaC5jb25jYXQoKG51bWJQbHVzT25lKS50b1N0cmluZygpKSk7IC8vIHJpZ2h0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrTGVmdCgpe1xyXG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKGFscGguY29uY2F0KChudW1iTWludXNPbmUpLnRvU3RyaW5nKCkpKTsgLy8gbGVmdFxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBjaGVja1VwKCl7XHJcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaE1pbnVzT25lLmNvbmNhdCgobnVtYikudG9TdHJpbmcoKSkpOyAvLyB1cFxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBjaGVja0Rvd24oKXtcclxuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaChhbHBoUGx1c09uZS5jb25jYXQoKG51bWIpLnRvU3RyaW5nKCkpKTsgLy8gZG93blxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBjaGVja0RpYWdVcFJpZ2h0KCl7XHJcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaE1pbnVzT25lLmNvbmNhdCgobnVtYlBsdXNPbmUpLnRvU3RyaW5nKCkpKTsgLy8gdXAgcmlnaHRcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tEaWFnRG93blJpZ2h0KCl7XHJcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaFBsdXNPbmUuY29uY2F0KChudW1iUGx1c09uZSkudG9TdHJpbmcoKSkpOyAvLyBkb3duIHJpZ2h0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrRGlhZ1VwTGVmdCgpe1xyXG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKGFscGhNaW51c09uZS5jb25jYXQoKG51bWJNaW51c09uZSkudG9TdHJpbmcoKSkpOyAvLyB1cCBsZWZ0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrRGlhZ0Rvd25MZWZ0KCl7XHJcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaFBsdXNPbmUuY29uY2F0KChudW1iTWludXNPbmUpLnRvU3RyaW5nKCkpKTsgLy8gZG93biBsZWZ0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhbHBoTWludXNPbmUgPT0gdW5kZWZpbmVkICYmIG51bWJNaW51c09uZSA8IDEpeyAvLyBjb3JuZXIgdXAgbGVmdFxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0cyBjb3JuZXIgdXAgbGVmdCcpO1xyXG4gICAgICAgICAgICBjaGVja1JpZ2h0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrRG93bigpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdEb3duUmlnaHQoKTtcclxuICAgICAgICAgICAgbWVyZ2VBcnJheSgpOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYWxwaFBsdXNPbmUgPT0gdW5kZWZpbmVkICYmIG51bWJNaW51c09uZSA8IDEpeyAvLyBjb3JuZXIgYm90dG9tIGxlZnRcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdHMgY29ybmVyIGJvdHRvbSBsZWZ0Jyk7XHJcbiAgICAgICAgICAgIGNoZWNrUmlnaHQoKTtcclxuICAgICAgICAgICAgY2hlY2tVcCgpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdVcFJpZ2h0KCk7XHJcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFscGhNaW51c09uZSA9PSB1bmRlZmluZWQgJiYgbnVtYlBsdXNPbmUgPiAxMCl7IC8vIGNvcm5lciB1cCByaWdodCBcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdHMgY29ybmVyIHVwIHJpZ2h0Jyk7XHJcbiAgICAgICAgICAgIGNoZWNrTGVmdCgpO1xyXG4gICAgICAgICAgICBjaGVja0Rvd24oKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnRG93bkxlZnQoKTtcclxuICAgICAgICAgICAgbWVyZ2VBcnJheSgpOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYWxwaFBsdXNPbmUgPT0gdW5kZWZpbmVkICYmIG51bWJQbHVzT25lID4gMTApeyAvLyBjb3JuZXIgYm90dG9tIHJpZ2h0XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXRzIGNvcm5lciBib3R0b20gcmlnaHQnKTtcclxuICAgICAgICAgICAgY2hlY2tMZWZ0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrVXAoKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnVXBMZWZ0KCk7XHJcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG51bWJNaW51c09uZSA8IDEpe1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0IG51bWJlciA9IDAnKTtcclxuICAgICAgICAgICAgY2hlY2tSaWdodCgpO1xyXG4gICAgICAgICAgICBjaGVja1VwKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRG93bigpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdVcFJpZ2h0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25SaWdodCgpO1xyXG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKG51bWJQbHVzT25lID4gMTApe1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0IG51bWJlciA+IDEwJyk7XHJcbiAgICAgICAgICAgIGNoZWNrTGVmdCgpO1xyXG4gICAgICAgICAgICBjaGVja1VwKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRG93bigpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdVcExlZnQoKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnRG93bkxlZnQoKTtcclxuICAgICAgICAgICAgbWVyZ2VBcnJheSgpO1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYWxwaE1pbnVzT25lID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXRzIHVuZGVmaW5lZCcpO1xyXG4gICAgICAgICAgICBjaGVja0xlZnQoKTtcclxuICAgICAgICAgICAgY2hlY2tSaWdodCgpO1xyXG4gICAgICAgICAgICBjaGVja0Rvd24oKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnRG93bkxlZnQoKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnRG93blJpZ2h0KCk7IFxyXG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhbHBoUGx1c09uZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0cyB1bmRlZmluZWQnKTtcclxuICAgICAgICAgICAgY2hlY2tMZWZ0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrUmlnaHQoKTtcclxuICAgICAgICAgICAgY2hlY2tVcCgpOyBcclxuICAgICAgICAgICAgY2hlY2tEaWFnVXBMZWZ0KCk7IFxyXG4gICAgICAgICAgICBjaGVja0RpYWdVcFJpZ2h0KCk7XHJcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAvLyBob3Jpem9udGFsIGNoZWNrXHJcbiAgICAgICAgICAgICAgICBjaGVja0xlZnQoKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrUmlnaHQoKTtcclxuICAgICAgICAgICAgICAgIC8vIHZlcnRpY2FsIGNoZWNrXHJcbiAgICAgICAgICAgICAgICBjaGVja1VwKCk7XHJcbiAgICAgICAgICAgICAgICBjaGVja0Rvd24oKTtcclxuICAgICAgICAgICAgICAgIC8vZGlhZ29uYWwgbGVmdCBjaGVja1xyXG4gICAgICAgICAgICAgICAgY2hlY2tEaWFnVXBMZWZ0KCk7XHJcbiAgICAgICAgICAgICAgICBjaGVja0RpYWdEb3duTGVmdCgpO1xyXG4gICAgICAgICAgICAgICAgLy9kaWFnb25hbCByaWdodCBjaGVja1xyXG4gICAgICAgICAgICAgICAgY2hlY2tEaWFnVXBSaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tEaWFnRG93blJpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICBtZXJnZUFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG5cclxuICAgIH0pO1xyXG4gICAgLy8gY29uc29sZS5sb2cob3V0cHV0QXJyYXkpO1xyXG4gICAgLy8gY29uc29sZS5sb2cocmVzdWx0QXJyYXkpO1xyXG4gICAgcmV0dXJuIHJlc3VsdEFycmF5XHJcbn1cclxuXHJcbi8vIGxldCBhcnJheTEgPSBbJ2EnLCdiJywnYyddO1xyXG4vLyBsZXQgYXJyYXkyID0gWyd6JywnYScsJ3MnXTtcclxuXHJcbi8vIGxldCBhcnJheTMgPSBhcnJheTEuY29uY2F0KGFycmF5Mik7XHJcbi8vIGFycmF5MyA9IFsuLi5uZXcgU2V0KFsuLi5hcnJheTEsLi4uYXJyYXkyXSldXHJcblxyXG4vLyBjb25zb2xlLmxvZyhhcnJheTMpOyBcclxuXHJcbi8vIHBsYWNlR2FwKFsnMTBqJ10pO1xyXG4vLyBwbGFjZUdhcChbJzEwYycsICcxMGQnLCAnMTBlJ10pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcGxhY2VHYXAiLCJmdW5jdGlvbiBwbGFjZVJhbmRvbWl6ZXIobGVuZyl7XHJcbiAgICBjb25zdCBNQVhfR1JJRCA9IDEwOyAvLyBtYXhpbXVtIGdyaWQgbGVuZ3RoIGlzIDEweDEwXHJcbiAgICBjb25zdCByYW5kb21BeGlzID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7IC8vIG9ubHkgcmV0dXJuIDAvMVxyXG4gICAgY29uc3QgYXJyYXkgPSBbXTtcclxuICAgIGNvbnN0IGFscGhhYmV0ID0gXCJhYmNkZWZnaGlqXCI7XHJcbiAgICBjb25zdCByYW5kb21OdW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoTUFYX0dSSUQgLSBsZW5nKSkgKyAxOyAvLyB0aGlzIHJhbmRvbWl6ZXIgbnVtYmVyIGtlZXAgeW91IGZyb20gb3ZlcmZsb3dpbmcsIHBsdXMgb25lIHNvIGl0IHN0YXJ0IGZyb20gMSBub3QgMFxyXG4gICAgY29uc3QgcmFuZG9tQWxwID0gYWxwaGFiZXRbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYWxwaGFiZXQuc3Vic3RyaW5nKDAsKE1BWF9HUklEIC0gbGVuZykpLmxlbmd0aCldOyAvLyB0aGlzIHJhbmRvbWl6ZXIga2VlcHMgeW91IGZyb20gdmFsdWUgbW9yZSB0aGFuIGxlbmd0aFxyXG4gICAgbGV0IGFscGhhTnVtO1xyXG5cclxuICAgIGlmIChyYW5kb21BeGlzID09PSAwKXsgLy8gWCBheGlzIGJsb2Nrc1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDxsZW5nOyBpKysgKXtcclxuICAgICAgICAgICAgYWxwaGFOdW0gPSByYW5kb21BbHAuY29uY2F0KChyYW5kb21OdW1iZXIgKyBpKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgYXJyYXkucHVzaChhbHBoYU51bSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGFycmF5KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhyYW5kb21BeGlzKTtcclxuICAgICAgICByZXR1cm4gYXJyYXlcclxuICAgIH1cclxuICAgIGVsc2UgeyAvLyBZIGF4aXMgYmxvY2tzXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPGxlbmc7IGkrKyApe1xyXG4gICAgICAgICAgICBjb25zdCBhbHBMb29wID0gYWxwaGFiZXQuY2hhckF0KGFscGhhYmV0LmluZGV4T2YocmFuZG9tQWxwKSArIGkpO1xyXG4gICAgICAgICAgICBhbHBoYU51bSA9IGFscExvb3AuY29uY2F0KChyYW5kb21OdW1iZXIpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICBhcnJheS5wdXNoKGFscGhhTnVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYXJyYXkpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJhbmRvbUF4aXMpO1xyXG4gICAgICAgIHJldHVybiBhcnJheVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IHBsYWNlUmFuZG9taXplciIsIlxyXG4vLyBjb25zdCB5b3VyR2FtZWJvYXJkID0gZ2FtZWJvYXJkKCk7XHJcbi8vIGNvbnN0IGh1bWFuR2FtZWJvYXJkID0gZ2FtZWJvYXJkKCk7XHJcbi8vIGNvbnN0IEFJR2FtZWJvYXJkID0gZ2FtZWJvYXJkKCk7XHJcblxyXG5jb25zdCBwbGF5ZXIgPSAoKSA9PiB7XHJcbiAgICAvLyBwbGF5ZXIgc2hvdWxkIHRha2UgdHVybnMgcGxheWluZyB0aGUgZ2FtZSBieSBhdHRhY2tpbmcgb3Bwb25lbnQncyBnYW1lYm9hcmQuXHJcbiAgICBsZXQgYXR0YWNrU3RhdHVzID0gJ09GRic7XHJcbiAgICAvLyBwbGF5ZXIgYXR0YWNraW5nIHN0YXRlIGlzIE9OXHJcbiAgICAvLyBwbGF5ZXIgQ0hPT1NFIHRoZSBjb29yZGluYXRlIG9mIG9wcG9uZW50J3MgZ2FtZWJvYXJkLlxyXG4gICAgLy8gcGxheWVyIGF0dGFja2luZyBzdGF0ZSBpcyBPRkZcclxuICAgIC8vIGxldCB5b3VyR2FtZWJvYXJkID0gZ2FtZWJvYXJkKCk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHRvZ2dsZUF0dGFja09OIDogKCk9PiBhdHRhY2tTdGF0dXMgPSBcIk9OXCIsXHJcbiAgICAgICAgdG9nZ2xlQXR0YWNrT0ZGIDogKCk9PiBhdHRhY2tTdGF0dXMgPSBcIk9GRlwiLFxyXG4gICAgICAgIGNoZWNrQXR0YWNrOiAoKT0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYXR0YWNrU3RhdHVzKTsgXHJcbiAgICAgICAgICAgIHJldHVybiBhdHRhY2tTdGF0dXNcclxuICAgICAgICB9LFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBsZXQgcGxheWUgPSBwbGF5ZXIoKTtcclxuXHJcblxyXG4vLyBwbGF5ZS5jaGVja0F0dGFjaygpO1xyXG4vLyBwbGF5ZS50b2dnbGVBdHRhY2tPTigpO1xyXG4vLyBwbGF5ZS5jaGVja0F0dGFjaygpO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBsYXllcjsiLCJcclxuY29uc3Qgc2hpcHMgPSAoY29vcmQpID0+eyAvLyBsZW5ndGggd2lsbCBiZSBmcm9tIHNpemUgb2YgdGhlIHNoaXBcclxuICAgIC8vIGxldCBjb29yZCA9IGxvYy5zcGxpdCgnLCcpO1xyXG4gICAgbGV0IGhlYWx0aEJhciA9IGNvb3JkLmxlbmd0aDtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbGVuZ3RoOiAoKT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gbGVuIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGl0OiAobG9jKT0+e1xyXG4gICAgICAgICAgICAvL2dldCB0aGUgYXR0Y2sgaGl0IGxvY2F0aW9uXHJcbiAgICAgICAgICAgIGlmIChjb29yZC5pbmNsdWRlcyhsb2MpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiYXR0YWNrIG1pc3NlZFwiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihjb29yZC5pbmNsdWRlcyhsb2MpID09PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIGNvb3JkID0gY29vcmQuZmlsdGVyKCAodmFsKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbCAhPT0gbG9jXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGhlYWx0aEJhciA9IGhlYWx0aEJhciAtIDE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL21hcmsgcG9zaXRpb24gaW4gZ2FtZWJvYXJkIGFzIGEgaGl0XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidGhpcyBzaGlwIHRvb2sgaGl0OiBcIiArIG51bSlcclxuICAgICAgICAgICAgLy9yZXR1cm4gXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpc1N1bms6ICgpPT57XHJcbiAgICAgICAgICAgIC8vY2hlY2sgdGhlIHNoaXAgaWYgc3Vua2VuIHlldFxyXG4gICAgICAgICAgICBpZihoZWFsdGhCYXIgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NoaXAgaXMgZGVzdHJveWVkJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIFxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzaGlwIGlzIHN0aWxsIGludGFjdCcpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgXHJcbiAgICAgICAgaGVhbHRoQmFyIDogKCk9PiB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJ0aGlzIHNoaXAgaGVhbHRoOiBcIiArIGhlYWx0aEJhcik7XHJcbiAgICAgICAgICAgIHJldHVybiBoZWFsdGhCYXJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxvY2F0aW9uOiAoKT0+e1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGNvb3JkKVxyXG4gICAgICAgICAgICByZXR1cm4gY29vcmRcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGNvbnN0IGJpZ1NoaXAgPSBzaGlwcyhcIjNBIDRBIDVBIDZBIDdBXCIpO1xyXG4vLyBjb25zdCBtaWRTaGlwMiA9IHNoaXBzKFwiMTJBIDEyQiAxMkNcIik7XHJcbi8vIGNvbnN0IHNtYWxsU2hpcCA9IHNoaXBzKFwiNEJcIik7XHJcblxyXG4vLyBiaWdTaGlwLmxvY2F0aW9uKCk7XHJcbi8vIGJpZ1NoaXAuaGVhbHRoQmFyKCk7XHJcbi8vIGJpZ1NoaXAuaGl0KFwiM0FcIik7XHJcbi8vIGJpZ1NoaXAubG9jYXRpb24oKTtcclxuLy8gYmlnU2hpcC5oZWFsdGhCYXIoKTtcclxuLy8gYmlnU2hpcC5oaXQoXCI4QVwiKTtcclxuLy8gYmlnU2hpcC5sb2NhdGlvbigpO1xyXG4vLyBiaWdTaGlwLmhlYWx0aEJhcigpO1xyXG4vLyBiaWdTaGlwLmhpdChcIjRBXCIpO1xyXG4vLyBiaWdTaGlwLmhpdChcIjVBXCIpO1xyXG4vLyBiaWdTaGlwLmhpdChcIjZBXCIpO1xyXG4vLyBiaWdTaGlwLmxvY2F0aW9uKCk7XHJcbi8vIGJpZ1NoaXAuaGVhbHRoQmFyKCk7XHJcbi8vIGJpZ1NoaXAuaXNTdW5rKCk7XHJcbi8vIGJpZ1NoaXAuaGl0KFwiN0FcIik7XHJcbi8vIGJpZ1NoaXAubG9jYXRpb24oKTtcclxuLy8gYmlnU2hpcC5oZWFsdGhCYXIoKTtcclxuLy8gYmlnU2hpcC5pc1N1bmsoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNoaXBzIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBpbiB0aGlzIGZpbGUgd2UgYXJlIGdvbm5hIGdhdGhlciBhbGwgdGhlIGNvbXBvbmVudHMgb2YgQmF0dGxlc2hpcCBUaGUgR2FtZSBhbmQgdHVybiBpdCBpbnRvIHJlYWwgZ2FtZVxyXG5cclxuLy8gcGxheWVyLiBXaGF0IGRvZXMgcGxheWVyIGRvLlxyXG4vLyBwbGF5ZXIgc3RhcnQgdGhlIGdhbWUgYnkgY2hvb3Npbmcgd2hvIHlvdXJlIHBsYXlpbmcgd2l0aFxyXG4vLyBwbGF5ZXIgY2hvb3NlIGlzIGl0IGdvbm5hIGJlIHZzIEFJIG9yIHZzIEh1bWFuXHJcbi8vIGF0IHRoaXMgcG9pbnQsIGlmIHlvdSBjaG9vc2UgQUkuIEFJIHdpbGwgYXV0b21hdGljYWxseSBwbGFjZSB0aGVpciBzaGlwcyByYW5kb21seSBvbiBnYW1lYm9hcmQuXHJcbi8vIHBsYXllciBjaG9vc2UgdGhlIHNoaXBzIHBsYWNlbWVudCBhY2Nyb3NzIHRoZSBnYW1lYm9hcmQuXHJcbi8vIHNoaXAncyBwbGFjZW1lbnQgaXMgYmFzZWQgb24gb25lIHJ1bGUgdGhhdCB0aGVyZSBpcyBhbHdheXMgb25lIGVtcHR5IGJsb2NrIGJldHdlZW4gb25lIGFuZCBhbm90aGVyIHBsYWNlZCBzaGlwc1xyXG4vLyBwbGF5ZXIgaGF2ZSBhIGNob2ljZSB0byByYW5kb21seSBwbGFjZSB0aGUgc2hpcHMgYnkgY2xpY2tpbmcgdGhlIHJhbmRvbSBidXR0b24uIFxyXG4vLyBwbGF5ZXIgcGxhY2VtZW50IG9yZGVyIGlzLi4gZmlyc3QgeW91IHBsYWNlIG9uZSBiaWcgc2hpcCAoNSBpbiBsZW5ndGgpLCB0aGVuIHR3byBtaWQgc2hpcCAoMyBpbiBsZW5ndGgpLCB0aGVuIHRocmVlIHNtYWxsIHNoaXAgKDIgaW4gbGVuZ3RoKSBcclxuLy8gYWZ0ZXIgYWxsIHNoaXBzIGFyZSBwbGFjZWQsIGdhbWUgaW5pdGlhdGUgdG8gc3RhcnQgYXR0YWNraW5nIGJ5IGNob29zaW5nIHRoZSBvcHBvbmVudHMncyBnYW1lYm9hcmQuIFRoaXMgcGhhc2UgeW91IGNvdWxkIGhpdCBvcHBvbmVudHMncyBzaGlwLlxyXG4vLyBhZnRlciB5b3UgYXR0YWNrIG9wcG9uZW50J3Mgc2hpcCwgZ2FtZSBhdXRvbWF0aWNhbGx5IGNoYW5nZSB0byBvcHBvbmVudCdzIHR1cm4uIFRoaXMgdGltZSBPcHBvbmVudCdzIHdpbGwgaW5pdGlhdGUgYXR0YWNrIHBsYXllcidzIGdhbWVib2FyZCByYW5kb21seS5cclxuLy8gVGhlIEFJIGRvZXMgbm90IGhhdmUgdG8gYmUgc21hcnQsIGJ1dCBpdCBzaG91bGQga25vdyB3aGV0aGVyIG9yIG5vdCBhIGdpdmVuIG1vdmUgaXMgbGVnYWwuIChpLmUuIGl0IHNob3VsZG7igJl0IHNob290IHRoZSBzYW1lIGNvb3JkaW5hdGUgdHdpY2UpLiBcclxuLy8gR2FtZSByZXBlYXRpbmcgdGhlIHByZXZpb3VzIHN0ZXAgdW50aWwgb25lIG9mIHRoZSBwbGF5ZXIvQUkgc2hpcHMgYXJlIGZ1bGx5IGNsZWFuZWQgKGFsbCBkZXN0cm95ZWQpXHJcbi8vIGdhbWUgZW5kaW5nIGlmIG9uZSBvZiB0aGUgcGxheWVyL0FJIHRvdGFsIGhlYWx0aGJhciAoc2hpcHMpIGFyZSA9IDAuIFxyXG4vLyAxXHRDYXJyaWVyXHQ1XHJcbi8vIDJcdEJhdHRsZXNoaXBcdDRcclxuLy8gM1x0Q3J1aXNlclx0M1xyXG4vLyA0XHRTdWJtYXJpbmVcdDNcclxuLy8gNVx0RGVzdHJveWVyXHQyXHJcblxyXG5cclxuaW1wb3J0IHBsYXllciBmcm9tIFwiLi9wbGF5ZXIuanNcIjtcclxuaW1wb3J0IGdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmQuanNcIlxyXG5pbXBvcnQgc2hpcHMgZnJvbSBcIi4vc2hpcHMuanNcIjtcclxuaW1wb3J0IHBsYWNlUmFuZG9taXplciBmcm9tIFwiLi9wbGFjZVJhbmRvbWl6ZXIuanNcIjtcclxuaW1wb3J0IGZpbmRDb21tb25FbGVtZW50cyBmcm9tIFwiLi9maW5kQ29tbW9uRWxlbWVudHMuanNcIjtcclxuaW1wb3J0IHBsYWNlR2FwIGZyb20gXCIuL3BsYWNlR2FwLmpzXCI7XHJcbmltcG9ydCBjcmVhdGVHcmlkIGZyb20gXCIuL2xheW91dEdyaWQuanNcIjtcclxuaW1wb3J0IGxheW91dEdyaWRQbGFjZWRDb2xvciBmcm9tIFwiLi9sYXlvdXRHcmlkUGxhY2VkQ29sb3IuanNcIjtcclxuXHJcblxyXG4vLyBjb25zb2xlLmxvZyhQTEFZRVJPTkUpO2RlYnVnZ2VyXHJcbi8vIGNvbnNvbGUubG9nKHBsYXllckdhbWVib2FyZCk7ZGVidWdnZXJcclxuXHJcbmNyZWF0ZUdyaWQoJ0FJJyk7XHJcbmNyZWF0ZUdyaWQoJ3BsYXllcicpO1xyXG5jb25zdCBQTEFZRVJPTkUgPSBwbGF5ZXIoKTsgXHJcbmNvbnN0IEFJID0gcGxheWVyKCk7XHJcbmNvbnN0IHBsYXllckdhbWVib2FyZCA9IGdhbWVib2FyZCgpO1xyXG5jb25zdCBBSUdhbWVib2FyZCA9IGdhbWVib2FyZCgpO1xyXG5cclxuZnVuY3Rpb24gc3RhcnRHYW1lKCl7XHJcbiAgICBmdW5jdGlvbiBBSVBsYWNlbWVudCh2YWwpe1xyXG4gICAgICAgIGxldCBuZXdTaGlwQ29vcmQgPSBwbGFjZVJhbmRvbWl6ZXIodmFsKTtcclxuICAgICAgICBsZXQgbmV3U2hpcFdpdGhHYXAgPSBwbGFjZUdhcChuZXdTaGlwQ29vcmQpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiByZVJhbmRvbWl6ZVdpdGhHYXAoKXtcclxuICAgICAgICAgICAgbmV3U2hpcENvb3JkID0gcGxhY2VSYW5kb21pemVyKHZhbCk7XHJcbiAgICAgICAgICAgIG5ld1NoaXBXaXRoR2FwID0gcGxhY2VHYXAobmV3U2hpcENvb3JkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrQW5kQWRkRWxlbWVudHMobmV3ZXN0LCBjdXJyZW50LCB2YWwpe1xyXG4gICAgICAgICAgICBpZiAoZmluZENvbW1vbkVsZW1lbnRzKG5ld2VzdCwgY3VycmVudCkgPT09IGZhbHNlKXsgLy8gaWYgdGhlcmUgSVMgTk9UIGNvbW1vbiBlbGVtZW50cyBpbnNpZGUgb2YgYm90aCBhcnJheSAobm90IGNsYXNoZWQpLCBwcm9jZWVkIHRvIGFkZCB0byBnYW1lYm9hcmRcclxuICAgICAgICAgICAgICAgIEFJR2FtZWJvYXJkLnBsYWNlbWVudChzaGlwcyhuZXdTaGlwQ29vcmQpKTtcclxuICAgICAgICAgICAgICAgIEFJR2FtZWJvYXJkLmFkZEdhcExvY2F0aW9uKHBsYWNlR2FwKG5ld1NoaXBDb29yZCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgeyAvLyBpZiB0aGVyZSBJUyBjb21tb24gZWxlbWVudCBpbnNpZGUgYm90aCBhcnJheSwgcmFuZG9taXplIHRoZSBzaGlwIHBsYWNlbWVudCBhZ2FpbiwgdGhlbiByZXBlYXQgdGhpcyBmdW5jdGlvblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NsYXNoZWQgaW5pdGlhdGUgcmVjdXJlc2UgY2hlY2snKTtcclxuICAgICAgICAgICAgICAgIHJlUmFuZG9taXplV2l0aEdhcCgpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tBbmRBZGRFbGVtZW50cyhuZXdTaGlwQ29vcmQsIEFJR2FtZWJvYXJkLmFsbEdhcExvY2F0aW9uLCB2YWwpOyAvLyByZXBlYXQgdGhpcyBmdW5jdGlvbiBhZ2FpblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHN0YXJ0cyBoZXJlXHJcbiAgICAgICAgY2hlY2tBbmRBZGRFbGVtZW50cyhuZXdTaGlwV2l0aEdhcCwgQUlHYW1lYm9hcmQuYWxsR2FwTG9jYXRpb24sIHZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB2ZXJzdXNBSTogKCk9PntcclxuICAgICAgICAgICAgQUlQbGFjZW1lbnQoNSk7XHJcbiAgICAgICAgICAgIEFJUGxhY2VtZW50KDQpO1xyXG4gICAgICAgICAgICBBSVBsYWNlbWVudCgzKTtcclxuICAgICAgICAgICAgQUlQbGFjZW1lbnQoMyk7XHJcbiAgICAgICAgICAgIEFJUGxhY2VtZW50KDIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5zdGFydEdhbWUoKS52ZXJzdXNBSSgpO1xyXG5BSUdhbWVib2FyZC5jaGVja0FsbExvY2F0aW9uKCk7XHJcbkFJR2FtZWJvYXJkLmNoZWNrVG90YWxIZWFsdGgoKTtcclxubGF5b3V0R3JpZFBsYWNlZENvbG9yKEFJR2FtZWJvYXJkLCAnQUknKTtcclxuXHJcbmV4cG9ydCB7UExBWUVST05FLCBwbGF5ZXJHYW1lYm9hcmQsIEFJLCBBSUdhbWVib2FyZH0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=