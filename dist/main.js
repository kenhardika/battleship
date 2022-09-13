/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/clearChild.js":
/*!***************************!*\
  !*** ./src/clearChild.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function clearChild(parent) {
    const layer = document.querySelector(`.${parent}`)
    while (layer.firstChild) {
      layer.removeChild(layer.firstChild);
    }
  }
  
  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clearChild);

/***/ }),

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
/* harmony import */ var _markedAttackMove_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./markedAttackMove.js */ "./src/markedAttackMove.js");


const gameboard = ()=> {
    let allShip = [];
    let totalHealth = 0;
    let allLocation = [];
    let attackMissed = [];
    let allGapLocation = [];
    let allReceivedAttackLocation = [];

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
        receiveAttack: (coor, user)=>{
            let coord = coor.toString();
            allReceivedAttackLocation.push(coord);
            if(allLocation.includes(coord) === false){
                console.log('Attack missed')
                attackMissedCounter(coord);
                (0,_markedAttackMove_js__WEBPACK_IMPORTED_MODULE_0__.markedAttack)(user, coord);
                return 
            } 
            else {
                console.log('Attack Hit!')
                allShip.forEach((ship)=>{
                    ship.hit(coord);
                });
                // refresh the allLocation Array so you cannot hit twice on the same coordinate
                refreshAllLocation()
                if (allLocation.length < 1){
                    console.log('ALL SHIPS HAS BEEN DESTROYED, RIP BOZO')
                }
                (0,_markedAttackMove_js__WEBPACK_IMPORTED_MODULE_0__.markedHit)(user, coord);
                // console.log(allLocation);
            } 
            // toggle checkAllShip() to make sure if its not endgame
            // if not marks the coordinate with missedAttack()
            //return
        },
        allReceivedAttackLocation,
        checkTotalHealth: ()=>{
            // check the healthbar of each ships with ship.healthbar()
            // allShip.forEach((ship)=>{
            //     ship.location(); 
            //     totalHealth = totalHealth + ship.healthBar();
            // });
            // console.log(totalHealth);
            refreshAllLocation();
            totalHealth = allLocation.length;
            // if all the healthbar is 0 then the game is ended
            if(totalHealth <= 0){
                console.log("GAME OVER ALL OF YOUR SHIPS WRECKED");
            }
            else{
                return 
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
            allReceivedAttackLocation.length = 0;
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
            //     console.log(grid.className);
            //     // clicked the grid
            //     // initiate attack() // then AI attack yours too
            // });
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

/***/ "./src/markedAttackMove.js":
/*!*********************************!*\
  !*** ./src/markedAttackMove.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "markedAttack": () => (/* binding */ markedAttack),
/* harmony export */   "markedHit": () => (/* binding */ markedHit),
/* harmony export */   "resetMarkedAttack": () => (/* binding */ resetMarkedAttack)
/* harmony export */ });
function markedAttack(user, className){
        const gamelayout = document.querySelector(`.${user}Gameboard`);
        const grid = gamelayout.querySelector(`.${className}`);
        // console.log(className);
        // console.log(grid);
        grid.classList.add('attacked');
        return
}
function markedHit(user, className){
        const gamelayout = document.querySelector(`.${user}Gameboard`);
        const grid = gamelayout.querySelector(`.${className}`);
        // console.log(className);
        // console.log(grid);
        grid.classList.add('hit');
        return
}

function resetMarkedAttack(user){
        const gamelayout = document.querySelector(`.${user}Gameboard`);
        const allGrid = gamelayout.querySelectorAll(`div`);
        // console.log(className);
        // console.log(grid);
        allGrid.forEach((grid)=>{
                grid.classList.remove('hit');
                grid.classList.remove('attacked');
        });
        return
}


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
            // console.log(attackStatus); 
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
/* harmony import */ var _markedAttackMove_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./markedAttackMove.js */ "./src/markedAttackMove.js");
/* harmony import */ var _clearChild_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./clearChild.js */ "./src/clearChild.js");
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

    function randomAttack(board, user){
        let newAttackCoord = (0,_placeRandomizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(1); // only one grid per attack allowed
        
        function reNewAttack(){
            newAttackCoord = (0,_placeRandomizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(1);
        }

        function checkRepeatedAttack(newest, current, user){
            console.log(newest);
            console.log(current);
            if (!current){
                board.receiveAttack(newAttackCoord, user);
                return
            }
            else if ((0,_findCommonElements_js__WEBPACK_IMPORTED_MODULE_4__["default"])(newest, current) === false){
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
        (0,_layoutGridPlacedColor_js__WEBPACK_IMPORTED_MODULE_7__["default"])(board, user);
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
            (0,_clearChild_js__WEBPACK_IMPORTED_MODULE_9__["default"])('AIGameboard');
            (0,_clearChild_js__WEBPACK_IMPORTED_MODULE_9__["default"])('playerGameboard');
            (0,_layoutGrid_js__WEBPACK_IMPORTED_MODULE_6__["default"])('AI');
            (0,_layoutGrid_js__WEBPACK_IMPORTED_MODULE_6__["default"])('player');
            attackMode('AI');
            emptyTheGameboard(playerGameboard, 'player');
            emptyTheGameboard(AIGameboard, 'AI');
            (0,_markedAttackMove_js__WEBPACK_IMPORTED_MODULE_8__.resetMarkedAttack)('AI');
            (0,_markedAttackMove_js__WEBPACK_IMPORTED_MODULE_8__.resetMarkedAttack)('player');
            setShipRandom(AIGameboard);
            setShipRandom(playerGameboard);
            (0,_layoutGridPlacedColor_js__WEBPACK_IMPORTED_MODULE_7__["default"])(playerGameboard, 'player');
            PLAYERONE.toggleAttackON();
            // layoutGridPlacedColor(AIGameboard, 'AI');

        },
        restartGame: ()=> {
            emptyTheGameboard(playerGameboard, 'player');
            emptyTheGameboard(AIGameboard, 'AI');
            (0,_markedAttackMove_js__WEBPACK_IMPORTED_MODULE_8__.resetMarkedAttack)('AI');
            (0,_markedAttackMove_js__WEBPACK_IMPORTED_MODULE_8__.resetMarkedAttack)('player');
            (0,_clearChild_js__WEBPACK_IMPORTED_MODULE_9__["default"])('AIGameboard');
            (0,_clearChild_js__WEBPACK_IMPORTED_MODULE_9__["default"])('playerGameboard');
            (0,_layoutGrid_js__WEBPACK_IMPORTED_MODULE_6__["default"])('AI');
            (0,_layoutGrid_js__WEBPACK_IMPORTED_MODULE_6__["default"])('player');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLDBEQUFVO0FBQ3RCLFlBQVksMERBQVU7QUFDdEIsWUFBWSwwREFBVTtBQUN0QixZQUFZLDBEQUFVO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLFlBQVksdUVBQWlCO0FBQzdCLFlBQVksdUVBQWlCO0FBQzdCO0FBQ0E7QUFDQSxZQUFZLHFFQUFxQjtBQUNqQztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsWUFBWSx1RUFBaUI7QUFDN0IsWUFBWSx1RUFBaUI7QUFDN0IsWUFBWSwwREFBVTtBQUN0QixZQUFZLDBEQUFVO0FBQ3RCLFlBQVksMERBQVU7QUFDdEIsWUFBWSwwREFBVTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jbGVhckNoaWxkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmluZENvbW1vbkVsZW1lbnRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbGF5b3V0R3JpZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2xheW91dEdyaWRQbGFjZWRDb2xvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21hcmtlZEF0dGFja01vdmUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGFjZUdhcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYWNlUmFuZG9taXplci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21haW5nYW1lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGNsZWFyQ2hpbGQocGFyZW50KSB7XHJcbiAgICBjb25zdCBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3BhcmVudH1gKVxyXG4gICAgd2hpbGUgKGxheWVyLmZpcnN0Q2hpbGQpIHtcclxuICAgICAgbGF5ZXIucmVtb3ZlQ2hpbGQobGF5ZXIuZmlyc3RDaGlsZCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsZWFyQ2hpbGQ7IiwiZnVuY3Rpb24gZmluZENvbW1vbkVsZW1lbnRzKGFycjEsIGFycjIpIHtcclxuICAgIHJldHVybiBhcnIxLnNvbWUoaXRlbSA9PiBhcnIyLmluY2x1ZGVzKGl0ZW0pKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmaW5kQ29tbW9uRWxlbWVudHMiLCJpbXBvcnQgeyBtYXJrZWRBdHRhY2ssIG1hcmtlZEhpdCB9IGZyb20gXCIuL21hcmtlZEF0dGFja01vdmUuanNcIjtcclxuXHJcbmNvbnN0IGdhbWVib2FyZCA9ICgpPT4ge1xyXG4gICAgbGV0IGFsbFNoaXAgPSBbXTtcclxuICAgIGxldCB0b3RhbEhlYWx0aCA9IDA7XHJcbiAgICBsZXQgYWxsTG9jYXRpb24gPSBbXTtcclxuICAgIGxldCBhdHRhY2tNaXNzZWQgPSBbXTtcclxuICAgIGxldCBhbGxHYXBMb2NhdGlvbiA9IFtdO1xyXG4gICAgbGV0IGFsbFJlY2VpdmVkQXR0YWNrTG9jYXRpb24gPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiByZWZyZXNoQWxsTG9jYXRpb24oKXtcclxuICAgICAgICBsZXQgbmV3TG9jYXRpb24gPSBbXTtcclxuICAgICAgICBhbGxTaGlwLmZvckVhY2goKHNoaXApPT57XHJcbiAgICAgICAgICAgIG5ld0xvY2F0aW9uID0gbmV3TG9jYXRpb24uY29uY2F0KHNoaXAubG9jYXRpb24oKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYWxsTG9jYXRpb24gPSBuZXdMb2NhdGlvbjtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGF0dGFja01pc3NlZENvdW50ZXIoY29vcil7XHJcbiAgICAgICAgYXR0YWNrTWlzc2VkLnB1c2goY29vcik7XHJcbiAgICB9XHJcblxyXG4gICAgLy9jb25zb2xlLmxvZygnZ2FtZWJvYXJkIGlzIG9uJyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHBsYWNlbWVudDogKHNoaXBzKT0+eyAvLyBkb250IG5lZWQgY29vciBzaW5jZSBjb29yZGluYXRlIHNob3VsZCBiZSBpbnNpZGUgdGhlIHNoaXAoKVxyXG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgdGhlIGNvb3JkaW5hdGUgaXMgdmFsaWQsIHdoaWNoIG1lYW5zIGVtcHR5IGFuZCBvbmUgYmxvY2sgYXdheSBmcm9tIGFub3RoZXIgc2hpcFxyXG4gICAgICAgICAgICAvLyBwbGFjZSB0aGUgc2hpcHMgb24gdGhlIGNvb3JkaW5hdGUgICAgIFxyXG4gICAgICAgICAgICBhbGxTaGlwLnB1c2goc2hpcHMpO1xyXG4gICAgICAgICAgICBhbGxMb2NhdGlvbiA9IGFsbExvY2F0aW9uLmNvbmNhdChzaGlwcy5sb2NhdGlvbigpKTtcclxuICAgICAgICAgICAgLy8gbWFya3MgdGhlIGNvb3JkaW5hdGUgd2l0aCBzaGlwcycgbWFya3NcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZWNlaXZlQXR0YWNrOiAoY29vciwgdXNlcik9PntcclxuICAgICAgICAgICAgbGV0IGNvb3JkID0gY29vci50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBhbGxSZWNlaXZlZEF0dGFja0xvY2F0aW9uLnB1c2goY29vcmQpO1xyXG4gICAgICAgICAgICBpZihhbGxMb2NhdGlvbi5pbmNsdWRlcyhjb29yZCkgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBdHRhY2sgbWlzc2VkJylcclxuICAgICAgICAgICAgICAgIGF0dGFja01pc3NlZENvdW50ZXIoY29vcmQpO1xyXG4gICAgICAgICAgICAgICAgbWFya2VkQXR0YWNrKHVzZXIsIGNvb3JkKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQXR0YWNrIEhpdCEnKVxyXG4gICAgICAgICAgICAgICAgYWxsU2hpcC5mb3JFYWNoKChzaGlwKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHNoaXAuaGl0KGNvb3JkKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gcmVmcmVzaCB0aGUgYWxsTG9jYXRpb24gQXJyYXkgc28geW91IGNhbm5vdCBoaXQgdHdpY2Ugb24gdGhlIHNhbWUgY29vcmRpbmF0ZVxyXG4gICAgICAgICAgICAgICAgcmVmcmVzaEFsbExvY2F0aW9uKClcclxuICAgICAgICAgICAgICAgIGlmIChhbGxMb2NhdGlvbi5sZW5ndGggPCAxKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQUxMIFNISVBTIEhBUyBCRUVOIERFU1RST1lFRCwgUklQIEJPWk8nKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbWFya2VkSGl0KHVzZXIsIGNvb3JkKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGFsbExvY2F0aW9uKTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgLy8gdG9nZ2xlIGNoZWNrQWxsU2hpcCgpIHRvIG1ha2Ugc3VyZSBpZiBpdHMgbm90IGVuZGdhbWVcclxuICAgICAgICAgICAgLy8gaWYgbm90IG1hcmtzIHRoZSBjb29yZGluYXRlIHdpdGggbWlzc2VkQXR0YWNrKClcclxuICAgICAgICAgICAgLy9yZXR1cm5cclxuICAgICAgICB9LFxyXG4gICAgICAgIGFsbFJlY2VpdmVkQXR0YWNrTG9jYXRpb24sXHJcbiAgICAgICAgY2hlY2tUb3RhbEhlYWx0aDogKCk9PntcclxuICAgICAgICAgICAgLy8gY2hlY2sgdGhlIGhlYWx0aGJhciBvZiBlYWNoIHNoaXBzIHdpdGggc2hpcC5oZWFsdGhiYXIoKVxyXG4gICAgICAgICAgICAvLyBhbGxTaGlwLmZvckVhY2goKHNoaXApPT57XHJcbiAgICAgICAgICAgIC8vICAgICBzaGlwLmxvY2F0aW9uKCk7IFxyXG4gICAgICAgICAgICAvLyAgICAgdG90YWxIZWFsdGggPSB0b3RhbEhlYWx0aCArIHNoaXAuaGVhbHRoQmFyKCk7XHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0b3RhbEhlYWx0aCk7XHJcbiAgICAgICAgICAgIHJlZnJlc2hBbGxMb2NhdGlvbigpO1xyXG4gICAgICAgICAgICB0b3RhbEhlYWx0aCA9IGFsbExvY2F0aW9uLmxlbmd0aDtcclxuICAgICAgICAgICAgLy8gaWYgYWxsIHRoZSBoZWFsdGhiYXIgaXMgMCB0aGVuIHRoZSBnYW1lIGlzIGVuZGVkXHJcbiAgICAgICAgICAgIGlmKHRvdGFsSGVhbHRoIDw9IDApe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHQU1FIE9WRVIgQUxMIE9GIFlPVVIgU0hJUFMgV1JFQ0tFRFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWxsTG9jYXRpb246ICgpPT57XHJcbiAgICAgICAgICAgIHJlZnJlc2hBbGxMb2NhdGlvbigpO1xyXG4gICAgICAgICAgICByZXR1cm4gYWxsTG9jYXRpb25cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoZWNrQWxsTG9jYXRpb246KCk9PntcclxuICAgICAgICAgICAgcmVmcmVzaEFsbExvY2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFsbExvY2F0aW9uKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFsbExvY2F0aW9uXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZWxldGVBbGxTaGlwOiAoKT0+IHtcclxuICAgICAgICAgICAgYWxsU2hpcC5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB0b3RhbEhlYWx0aCA9IDA7XHJcbiAgICAgICAgICAgIGFsbExvY2F0aW9uLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIGF0dGFja01pc3NlZC5sZW5ndGg9MDtcclxuICAgICAgICAgICAgYWxsR2FwTG9jYXRpb24ubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgYWxsUmVjZWl2ZWRBdHRhY2tMb2NhdGlvbi5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICByZWZyZXNoQWxsTG9jYXRpb24oKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFkZEdhcExvY2F0aW9uOiAoYXJyYXkpPT4ge1xyXG4gICAgICAgICAgICAvLyBnYXBMb2NhdGlvbi5wdXNoKGFycmF5KTtcclxuICAgICAgICAgICAgYXJyYXkuZm9yRWFjaCgoYXJyKT0+e1xyXG4gICAgICAgICAgICAgICAgYWxsR2FwTG9jYXRpb24ucHVzaChhcnIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCBcclxuICAgICAgICBjaGVja0dhcExvY2F0aW9uOiAoKT0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYWxsR2FwTG9jYXRpb24pO1xyXG4gICAgICAgICAgICByZXR1cm4gYWxsR2FwTG9jYXRpb25cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoZWNrQXR0YWNrTWlzc2VkOiAoKT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhdHRhY2tNaXNzZWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gYXR0YWNrTWlzc2VkXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhbGxHYXBMb2NhdGlvblxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnYW1lYm9hcmQ7XHJcblxyXG4vLyBjb25zdCBwbGF5YSA9IGdhbWVib2FyZCgpO1xyXG4vLyBjb25zdCBiaWdTaGlwQ29vciA9ICc2QiA3QiA4QiA5QiAxMEInO1xyXG4vLyBjb25zdCBtaWRTaGlwQ29vciA9ICc0QiA0QyA0RCc7XHJcbi8vIGNvbnN0IG1pZFNoaXAgPSBzaGlwcyhtaWRTaGlwQ29vcik7XHJcbi8vIGNvbnN0IGJpZ1NoaXAgPSBzaGlwcyhiaWdTaGlwQ29vcik7XHJcblxyXG4vLyBwbGF5YS5wbGFjZW1lbnQoYmlnU2hpcCk7XHJcbi8vIHBsYXlhLnBsYWNlbWVudChtaWRTaGlwKTtcclxuLy8gcGxheWEucmVjZWl2ZUF0dGFjayhcIjRCXCIpO2RlYnVnZ2VyXHJcbi8vIHBsYXlhLnJlY2VpdmVBdHRhY2soXCI0Q1wiKTtkZWJ1Z2dlclxyXG4vLyBwbGF5YS5yZWNlaXZlQXR0YWNrKFwiNERcIik7ZGVidWdnZXJcclxuLy8gcGxheWEucmVjZWl2ZUF0dGFjayhcIjNCXCIpO2RlYnVnZ2VyXHJcbi8vIHBsYXlhLmNoZWNrQWxsTG9jYXRpb24oKTtcclxuLy8gcGxheWEuY2hlY2tBdHRhY2tNaXNzZWQoKTtcclxuLy8gcGxheWEuY2hlY2tUb3RhbEhlYWx0aCgpOyBcclxuLy8gcmV2aXNlIHRoaXNcclxuLy8gcGxheWEucGxhY2VtZW50KCcxQSAyQSAzQScsIHNoaXBzKDMpKTtcclxuLy8gcGxheWEucGxhY2VtZW50KCczQiA0QicsIHNoaXBzKDIpKTtcclxuLy8gcGxheWEucGxhY2VtZW50KCc2QiA3QiA4QiA5QiAxMEInLCBzaGlwcyg1KSk7XHJcbi8vIHBsYXlhLnBsYWNlbWVudCgnNkUgN0UgOEUgOUUgMTBFJywgc2hpcHMoNSkpOyIsIlxyXG5mdW5jdGlvbiBjcmVhdGVHcmlkKHdob3Mpe1xyXG4gICAgY29uc3QgbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt3aG9zfUdhbWVib2FyZGApO1xyXG4gICAgY29uc3QgTUFYX1dJRFRIID0gMTA7XHJcbiAgICBjb25zdCBhbHBoYWJldCA9ICdhYmNkZWZnaGlqJztcclxuICAgIGNvbnN0IGFscGhBcnJheSA9IGFscGhhYmV0LnNwbGl0KCcnKTtcclxuXHJcbiAgICBhbHBoQXJyYXkuZm9yRWFjaCgoYWxwKT0+e1xyXG4gICAgICAgIGZvciAobGV0IGk9MTsgaSA8PSBNQVhfV0lEVEg7IGkrKyApe1xyXG4gICAgICAgICAgICBjb25zdCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGdyaWQuY2xhc3NOYW1lPWAke2FscH0ke2l9YDtcclxuICAgICAgICAgICAgLy8gZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhncmlkLmNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgIC8vICAgICAvLyBjbGlja2VkIHRoZSBncmlkXHJcbiAgICAgICAgICAgIC8vICAgICAvLyBpbml0aWF0ZSBhdHRhY2soKSAvLyB0aGVuIEFJIGF0dGFjayB5b3VycyB0b29cclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgIGxheWVyLmFwcGVuZChncmlkKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVHcmlkIiwiZnVuY3Rpb24gbGF5b3V0R3JpZFBsYWNlZENvbG9yKGdhbWVib2FyZCwgdXNlcil7XHJcbiAgICBsZXQgY3VycmVudEdhcCA9IGdhbWVib2FyZC5hbGxHYXBMb2NhdGlvbjtcclxuICAgIGxldCBjdXJyZW50U2hpcCA9IGdhbWVib2FyZC5hbGxMb2NhdGlvbigpO1xyXG4gICAgLy8gY29uc29sZS5sb2coY3VycmVudEdhcCk7XHJcbiAgICBpZiAoY3VycmVudEdhcC5sZW5ndGggPT09IDApe1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXQgYXJyYXkgZ2FwbG9jYXRpb24gZW1wdHknKVxyXG4gICAgICAgIGNvbnN0IGxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7dXNlcn1HYW1lYm9hcmRgKTtcclxuICAgICAgICBjb25zdCBnYXAgPSBsYXllci5xdWVyeVNlbGVjdG9yQWxsKCdkaXYnKTtcclxuICAgICAgICAgICAgZ2FwLmZvckVhY2goKGcpPT57XHJcbiAgICAgICAgICAgICAgICBnLmNsYXNzTGlzdC5yZW1vdmUoJ2dhcCcpO1xyXG4gICAgICAgICAgICAgICAgZy5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY3VycmVudEdhcC5mb3JFYWNoKChhcnJheUxvYyk9PntcclxuICAgICAgICAgICAgY29uc3QgbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt1c2VyfUdhbWVib2FyZGApO1xyXG4gICAgICAgICAgICBsZXQgZ2FwID0gbGF5ZXIucXVlcnlTZWxlY3RvcihgLiR7YXJyYXlMb2N9YCk7XHJcbiAgICAgICAgICAgIGdhcC5jbGFzc0xpc3QuYWRkKCdnYXAnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjdXJyZW50U2hpcC5mb3JFYWNoKChjdXJzaGlwKT0+e1xyXG4gICAgICAgICAgICBjb25zdCBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3VzZXJ9R2FtZWJvYXJkYCk7XHJcbiAgICAgICAgICAgIGxldCBzaGlwID0gbGF5ZXIucXVlcnlTZWxlY3RvcihgLiR7Y3Vyc2hpcH1gKTtcclxuICAgICAgICAgICAgc2hpcC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxheW91dEdyaWRQbGFjZWRDb2xvciIsImZ1bmN0aW9uIG1hcmtlZEF0dGFjayh1c2VyLCBjbGFzc05hbWUpe1xyXG4gICAgICAgIGNvbnN0IGdhbWVsYXlvdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt1c2VyfUdhbWVib2FyZGApO1xyXG4gICAgICAgIGNvbnN0IGdyaWQgPSBnYW1lbGF5b3V0LnF1ZXJ5U2VsZWN0b3IoYC4ke2NsYXNzTmFtZX1gKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhjbGFzc05hbWUpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGdyaWQpO1xyXG4gICAgICAgIGdyaWQuY2xhc3NMaXN0LmFkZCgnYXR0YWNrZWQnKTtcclxuICAgICAgICByZXR1cm5cclxufVxyXG5mdW5jdGlvbiBtYXJrZWRIaXQodXNlciwgY2xhc3NOYW1lKXtcclxuICAgICAgICBjb25zdCBnYW1lbGF5b3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7dXNlcn1HYW1lYm9hcmRgKTtcclxuICAgICAgICBjb25zdCBncmlkID0gZ2FtZWxheW91dC5xdWVyeVNlbGVjdG9yKGAuJHtjbGFzc05hbWV9YCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coY2xhc3NOYW1lKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhncmlkKTtcclxuICAgICAgICBncmlkLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xyXG4gICAgICAgIHJldHVyblxyXG59XHJcblxyXG5mdW5jdGlvbiByZXNldE1hcmtlZEF0dGFjayh1c2VyKXtcclxuICAgICAgICBjb25zdCBnYW1lbGF5b3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7dXNlcn1HYW1lYm9hcmRgKTtcclxuICAgICAgICBjb25zdCBhbGxHcmlkID0gZ2FtZWxheW91dC5xdWVyeVNlbGVjdG9yQWxsKGBkaXZgKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhjbGFzc05hbWUpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGdyaWQpO1xyXG4gICAgICAgIGFsbEdyaWQuZm9yRWFjaCgoZ3JpZCk9PntcclxuICAgICAgICAgICAgICAgIGdyaWQuY2xhc3NMaXN0LnJlbW92ZSgnaGl0Jyk7XHJcbiAgICAgICAgICAgICAgICBncmlkLmNsYXNzTGlzdC5yZW1vdmUoJ2F0dGFja2VkJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuXHJcbn1cclxuZXhwb3J0IHttYXJrZWRBdHRhY2ssIG1hcmtlZEhpdCwgcmVzZXRNYXJrZWRBdHRhY2t9IiwiLy8gc2V0IGdhcCBieSBvbmUgYnkgb25lIGxvb3AgY2hlY2tcclxuXHJcbmZ1bmN0aW9uIHBsYWNlR2FwKG1haW5BcnJheSl7XHJcbiAgICBsZXQgb3V0cHV0QXJyYXkgPSBbXTtcclxuICAgIGxldCByZXN1bHRBcnJheSA9IFtdO1xyXG4gICAgY29uc3QgbnVtYmVyUGF0dCA9IC9bMC05XS9nO1xyXG4gICAgY29uc3QgYWxwaGFQYXR0ID0gL1thLXpBLVpdL2c7XHJcbiAgICBjb25zdCBhbHBoYWJldE1heCA9ICdhYmNkZWZnaGlqJztcclxuICAgIGNvbnN0IGFscEFycmF5ID0gYWxwaGFiZXRNYXguc3BsaXQoJycpO1xyXG4gICAgbWFpbkFycmF5LmZvckVhY2goKHZhbCk9PntcclxuICAgICAgICBjb25zdCBudW1iID0gcGFyc2VJbnQodmFsLm1hdGNoKG51bWJlclBhdHQpLmpvaW4oJycpKTtcclxuICAgICAgICBjb25zdCBhbHBoID0gdmFsLm1hdGNoKGFscGhhUGF0dCkuam9pbignJyk7XHJcbiAgICAgICAgY29uc3QgbnVtYk1pbnVzT25lID0gbnVtYiAtIDE7XHJcbiAgICAgICAgY29uc3QgbnVtYlBsdXNPbmUgPSBudW1iICsgMTtcclxuICAgICAgICBjb25zdCBhbHBoUGx1c09uZSA9IGFscEFycmF5WyhhbHBBcnJheS5pbmRleE9mKGFscGgpKSsxXTtcclxuICAgICAgICBjb25zdCBhbHBoTWludXNPbmUgPSBhbHBBcnJheVsoYWxwQXJyYXkuaW5kZXhPZihhbHBoKSktMV07XHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gbWVyZ2VBcnJheSgpe1xyXG4gICAgICAgICAgICAgIC8vIG1lcmdlIHRoZSBhcnJheVxyXG4gICAgICAgICAgICByZXN1bHRBcnJheSA9IHJlc3VsdEFycmF5LmNvbmNhdChvdXRwdXRBcnJheSk7XHJcbiAgICAgICAgICAgIHJlc3VsdEFycmF5ID0gWy4uLm5ldyBTZXQgKFsuLi5tYWluQXJyYXksLi4ub3V0cHV0QXJyYXldKV07ICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tSaWdodCgpe1xyXG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKGFscGguY29uY2F0KChudW1iUGx1c09uZSkudG9TdHJpbmcoKSkpOyAvLyByaWdodFxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBjaGVja0xlZnQoKXtcclxuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaChhbHBoLmNvbmNhdCgobnVtYk1pbnVzT25lKS50b1N0cmluZygpKSk7IC8vIGxlZnRcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tVcCgpe1xyXG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKGFscGhNaW51c09uZS5jb25jYXQoKG51bWIpLnRvU3RyaW5nKCkpKTsgLy8gdXBcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tEb3duKCl7XHJcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaFBsdXNPbmUuY29uY2F0KChudW1iKS50b1N0cmluZygpKSk7IC8vIGRvd25cclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tEaWFnVXBSaWdodCgpe1xyXG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKGFscGhNaW51c09uZS5jb25jYXQoKG51bWJQbHVzT25lKS50b1N0cmluZygpKSk7IC8vIHVwIHJpZ2h0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrRGlhZ0Rvd25SaWdodCgpe1xyXG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKGFscGhQbHVzT25lLmNvbmNhdCgobnVtYlBsdXNPbmUpLnRvU3RyaW5nKCkpKTsgLy8gZG93biByaWdodFxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBjaGVja0RpYWdVcExlZnQoKXtcclxuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaChhbHBoTWludXNPbmUuY29uY2F0KChudW1iTWludXNPbmUpLnRvU3RyaW5nKCkpKTsgLy8gdXAgbGVmdFxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBjaGVja0RpYWdEb3duTGVmdCgpe1xyXG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKGFscGhQbHVzT25lLmNvbmNhdCgobnVtYk1pbnVzT25lKS50b1N0cmluZygpKSk7IC8vIGRvd24gbGVmdFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYWxwaE1pbnVzT25lID09IHVuZGVmaW5lZCAmJiBudW1iTWludXNPbmUgPCAxKXsgLy8gY29ybmVyIHVwIGxlZnRcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdHMgY29ybmVyIHVwIGxlZnQnKTtcclxuICAgICAgICAgICAgY2hlY2tSaWdodCgpO1xyXG4gICAgICAgICAgICBjaGVja0Rvd24oKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnRG93blJpZ2h0KCk7XHJcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFscGhQbHVzT25lID09IHVuZGVmaW5lZCAmJiBudW1iTWludXNPbmUgPCAxKXsgLy8gY29ybmVyIGJvdHRvbSBsZWZ0XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXRzIGNvcm5lciBib3R0b20gbGVmdCcpO1xyXG4gICAgICAgICAgICBjaGVja1JpZ2h0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrVXAoKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnVXBSaWdodCgpO1xyXG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhbHBoTWludXNPbmUgPT0gdW5kZWZpbmVkICYmIG51bWJQbHVzT25lID4gMTApeyAvLyBjb3JuZXIgdXAgcmlnaHQgXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXRzIGNvcm5lciB1cCByaWdodCcpO1xyXG4gICAgICAgICAgICBjaGVja0xlZnQoKTtcclxuICAgICAgICAgICAgY2hlY2tEb3duKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25MZWZ0KCk7XHJcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFscGhQbHVzT25lID09IHVuZGVmaW5lZCAmJiBudW1iUGx1c09uZSA+IDEwKXsgLy8gY29ybmVyIGJvdHRvbSByaWdodFxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0cyBjb3JuZXIgYm90dG9tIHJpZ2h0Jyk7XHJcbiAgICAgICAgICAgIGNoZWNrTGVmdCgpO1xyXG4gICAgICAgICAgICBjaGVja1VwKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ1VwTGVmdCgpO1xyXG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChudW1iTWludXNPbmUgPCAxKXtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdCBudW1iZXIgPSAwJyk7XHJcbiAgICAgICAgICAgIGNoZWNrUmlnaHQoKTtcclxuICAgICAgICAgICAgY2hlY2tVcCgpO1xyXG4gICAgICAgICAgICBjaGVja0Rvd24oKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnVXBSaWdodCgpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdEb3duUmlnaHQoKTtcclxuICAgICAgICAgICAgbWVyZ2VBcnJheSgpO1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihudW1iUGx1c09uZSA+IDEwKXtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdCBudW1iZXIgPiAxMCcpO1xyXG4gICAgICAgICAgICBjaGVja0xlZnQoKTtcclxuICAgICAgICAgICAgY2hlY2tVcCgpO1xyXG4gICAgICAgICAgICBjaGVja0Rvd24oKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnVXBMZWZ0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25MZWZ0KCk7XHJcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFscGhNaW51c09uZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0cyB1bmRlZmluZWQnKTtcclxuICAgICAgICAgICAgY2hlY2tMZWZ0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrUmlnaHQoKTtcclxuICAgICAgICAgICAgY2hlY2tEb3duKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25MZWZ0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25SaWdodCgpOyBcclxuICAgICAgICAgICAgbWVyZ2VBcnJheSgpO1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYWxwaFBsdXNPbmUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdHMgdW5kZWZpbmVkJyk7XHJcbiAgICAgICAgICAgIGNoZWNrTGVmdCgpO1xyXG4gICAgICAgICAgICBjaGVja1JpZ2h0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrVXAoKTsgXHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ1VwTGVmdCgpOyBcclxuICAgICAgICAgICAgY2hlY2tEaWFnVXBSaWdodCgpO1xyXG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgLy8gaG9yaXpvbnRhbCBjaGVja1xyXG4gICAgICAgICAgICAgICAgY2hlY2tMZWZ0KCk7XHJcbiAgICAgICAgICAgICAgICBjaGVja1JpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICAvLyB2ZXJ0aWNhbCBjaGVja1xyXG4gICAgICAgICAgICAgICAgY2hlY2tVcCgpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tEb3duKCk7XHJcbiAgICAgICAgICAgICAgICAvL2RpYWdvbmFsIGxlZnQgY2hlY2tcclxuICAgICAgICAgICAgICAgIGNoZWNrRGlhZ1VwTGVmdCgpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tEaWFnRG93bkxlZnQoKTtcclxuICAgICAgICAgICAgICAgIC8vZGlhZ29uYWwgcmlnaHQgY2hlY2tcclxuICAgICAgICAgICAgICAgIGNoZWNrRGlhZ1VwUmlnaHQoKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25SaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgbWVyZ2VBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBcclxuXHJcbiAgICB9KTtcclxuICAgIC8vIGNvbnNvbGUubG9nKG91dHB1dEFycmF5KTtcclxuICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdEFycmF5KTtcclxuICAgIHJldHVybiByZXN1bHRBcnJheVxyXG59XHJcblxyXG4vLyBsZXQgYXJyYXkxID0gWydhJywnYicsJ2MnXTtcclxuLy8gbGV0IGFycmF5MiA9IFsneicsJ2EnLCdzJ107XHJcblxyXG4vLyBsZXQgYXJyYXkzID0gYXJyYXkxLmNvbmNhdChhcnJheTIpO1xyXG4vLyBhcnJheTMgPSBbLi4ubmV3IFNldChbLi4uYXJyYXkxLC4uLmFycmF5Ml0pXVxyXG5cclxuLy8gY29uc29sZS5sb2coYXJyYXkzKTsgXHJcblxyXG4vLyBwbGFjZUdhcChbJzEwaiddKTtcclxuLy8gcGxhY2VHYXAoWycxMGMnLCAnMTBkJywgJzEwZSddKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBsYWNlR2FwIiwiZnVuY3Rpb24gcGxhY2VSYW5kb21pemVyKGxlbmcpe1xyXG4gICAgY29uc3QgTUFYX0dSSUQgPSAxMDsgLy8gbWF4aW11bSBncmlkIGxlbmd0aCBpcyAxMHgxMFxyXG4gICAgY29uc3QgcmFuZG9tQXhpcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpOyAvLyBvbmx5IHJldHVybiAwLzFcclxuICAgIGNvbnN0IGFycmF5ID0gW107XHJcbiAgICBjb25zdCBhbHBoYWJldCA9IFwiYWJjZGVmZ2hpalwiO1xyXG4gICAgY29uc3QgcmFuZG9tTnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKE1BWF9HUklEIC0gbGVuZykpICsgMTsgLy8gdGhpcyByYW5kb21pemVyIG51bWJlciBrZWVwIHlvdSBmcm9tIG92ZXJmbG93aW5nLCBwbHVzIG9uZSBzbyBpdCBzdGFydCBmcm9tIDEgbm90IDBcclxuICAgIGNvbnN0IHJhbmRvbUFscCA9IGFscGhhYmV0W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFscGhhYmV0LnN1YnN0cmluZygwLChNQVhfR1JJRCAtIGxlbmcpKS5sZW5ndGgpXTsgLy8gdGhpcyByYW5kb21pemVyIGtlZXBzIHlvdSBmcm9tIHZhbHVlIG1vcmUgdGhhbiBsZW5ndGhcclxuICAgIGxldCBhbHBoYU51bTtcclxuXHJcbiAgICBpZiAocmFuZG9tQXhpcyA9PT0gMCl7IC8vIFggYXhpcyBibG9ja3NcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8bGVuZzsgaSsrICl7XHJcbiAgICAgICAgICAgIGFscGhhTnVtID0gcmFuZG9tQWxwLmNvbmNhdCgocmFuZG9tTnVtYmVyICsgaSkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIGFycmF5LnB1c2goYWxwaGFOdW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhhcnJheSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmFuZG9tQXhpcyk7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5XHJcbiAgICB9XHJcbiAgICBlbHNlIHsgLy8gWSBheGlzIGJsb2Nrc1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDxsZW5nOyBpKysgKXtcclxuICAgICAgICAgICAgY29uc3QgYWxwTG9vcCA9IGFscGhhYmV0LmNoYXJBdChhbHBoYWJldC5pbmRleE9mKHJhbmRvbUFscCkgKyBpKTtcclxuICAgICAgICAgICAgYWxwaGFOdW0gPSBhbHBMb29wLmNvbmNhdCgocmFuZG9tTnVtYmVyKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgYXJyYXkucHVzaChhbHBoYU51bSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGFycmF5KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhyYW5kb21BeGlzKTtcclxuICAgICAgICByZXR1cm4gYXJyYXlcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBwbGFjZVJhbmRvbWl6ZXIiLCJcclxuLy8gY29uc3QgeW91ckdhbWVib2FyZCA9IGdhbWVib2FyZCgpO1xyXG4vLyBjb25zdCBodW1hbkdhbWVib2FyZCA9IGdhbWVib2FyZCgpO1xyXG4vLyBjb25zdCBBSUdhbWVib2FyZCA9IGdhbWVib2FyZCgpO1xyXG5cclxuY29uc3QgcGxheWVyID0gKCkgPT4ge1xyXG4gICAgLy8gcGxheWVyIHNob3VsZCB0YWtlIHR1cm5zIHBsYXlpbmcgdGhlIGdhbWUgYnkgYXR0YWNraW5nIG9wcG9uZW50J3MgZ2FtZWJvYXJkLlxyXG4gICAgbGV0IGF0dGFja1N0YXR1cyA9ICdPRkYnO1xyXG4gICAgLy8gcGxheWVyIGF0dGFja2luZyBzdGF0ZSBpcyBPTlxyXG4gICAgLy8gcGxheWVyIENIT09TRSB0aGUgY29vcmRpbmF0ZSBvZiBvcHBvbmVudCdzIGdhbWVib2FyZC5cclxuICAgIC8vIHBsYXllciBhdHRhY2tpbmcgc3RhdGUgaXMgT0ZGXHJcbiAgICAvLyBsZXQgeW91ckdhbWVib2FyZCA9IGdhbWVib2FyZCgpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0b2dnbGVBdHRhY2tPTiA6ICgpPT4gYXR0YWNrU3RhdHVzID0gXCJPTlwiLFxyXG4gICAgICAgIHRvZ2dsZUF0dGFja09GRiA6ICgpPT4gYXR0YWNrU3RhdHVzID0gXCJPRkZcIixcclxuICAgICAgICBjaGVja0F0dGFjazogKCk9PiB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGF0dGFja1N0YXR1cyk7IFxyXG4gICAgICAgICAgICByZXR1cm4gYXR0YWNrU3RhdHVzXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcclxuICAgIH1cclxufVxyXG5cclxuLy8gbGV0IHBsYXllID0gcGxheWVyKCk7XHJcblxyXG5cclxuLy8gcGxheWUuY2hlY2tBdHRhY2soKTtcclxuLy8gcGxheWUudG9nZ2xlQXR0YWNrT04oKTtcclxuLy8gcGxheWUuY2hlY2tBdHRhY2soKTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBwbGF5ZXI7IiwiXHJcbmNvbnN0IHNoaXBzID0gKGNvb3JkKSA9PnsgLy8gbGVuZ3RoIHdpbGwgYmUgZnJvbSBzaXplIG9mIHRoZSBzaGlwXHJcbiAgICAvLyBsZXQgY29vcmQgPSBsb2Muc3BsaXQoJywnKTtcclxuICAgIGxldCBoZWFsdGhCYXIgPSBjb29yZC5sZW5ndGg7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGxlbmd0aDogKCk9PntcclxuICAgICAgICAgICAgcmV0dXJuIGxlbiBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhpdDogKGxvYyk9PntcclxuICAgICAgICAgICAgLy9nZXQgdGhlIGF0dGNrIGhpdCBsb2NhdGlvblxyXG4gICAgICAgICAgICBpZiAoY29vcmQuaW5jbHVkZXMobG9jKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImF0dGFjayBtaXNzZWRcIilcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoY29vcmQuaW5jbHVkZXMobG9jKSA9PT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICBjb29yZCA9IGNvb3JkLmZpbHRlciggKHZhbCk9PntcclxuICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWwgIT09IGxvY1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBoZWFsdGhCYXIgPSBoZWFsdGhCYXIgLSAxO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9tYXJrIHBvc2l0aW9uIGluIGdhbWVib2FyZCBhcyBhIGhpdFxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInRoaXMgc2hpcCB0b29rIGhpdDogXCIgKyBudW0pXHJcbiAgICAgICAgICAgIC8vcmV0dXJuIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXNTdW5rOiAoKT0+e1xyXG4gICAgICAgICAgICAvL2NoZWNrIHRoZSBzaGlwIGlmIHN1bmtlbiB5ZXRcclxuICAgICAgICAgICAgaWYoaGVhbHRoQmFyIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzaGlwIGlzIGRlc3Ryb3llZCcpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICBcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2hpcCBpcyBzdGlsbCBpbnRhY3QnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIFxyXG4gICAgICAgIGhlYWx0aEJhciA6ICgpPT4ge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwidGhpcyBzaGlwIGhlYWx0aDogXCIgKyBoZWFsdGhCYXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gaGVhbHRoQmFyXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb2NhdGlvbjogKCk9PntcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhjb29yZClcclxuICAgICAgICAgICAgcmV0dXJuIGNvb3JkXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBjb25zdCBiaWdTaGlwID0gc2hpcHMoXCIzQSA0QSA1QSA2QSA3QVwiKTtcclxuLy8gY29uc3QgbWlkU2hpcDIgPSBzaGlwcyhcIjEyQSAxMkIgMTJDXCIpO1xyXG4vLyBjb25zdCBzbWFsbFNoaXAgPSBzaGlwcyhcIjRCXCIpO1xyXG5cclxuLy8gYmlnU2hpcC5sb2NhdGlvbigpO1xyXG4vLyBiaWdTaGlwLmhlYWx0aEJhcigpO1xyXG4vLyBiaWdTaGlwLmhpdChcIjNBXCIpO1xyXG4vLyBiaWdTaGlwLmxvY2F0aW9uKCk7XHJcbi8vIGJpZ1NoaXAuaGVhbHRoQmFyKCk7XHJcbi8vIGJpZ1NoaXAuaGl0KFwiOEFcIik7XHJcbi8vIGJpZ1NoaXAubG9jYXRpb24oKTtcclxuLy8gYmlnU2hpcC5oZWFsdGhCYXIoKTtcclxuLy8gYmlnU2hpcC5oaXQoXCI0QVwiKTtcclxuLy8gYmlnU2hpcC5oaXQoXCI1QVwiKTtcclxuLy8gYmlnU2hpcC5oaXQoXCI2QVwiKTtcclxuLy8gYmlnU2hpcC5sb2NhdGlvbigpO1xyXG4vLyBiaWdTaGlwLmhlYWx0aEJhcigpO1xyXG4vLyBiaWdTaGlwLmlzU3VuaygpO1xyXG4vLyBiaWdTaGlwLmhpdChcIjdBXCIpO1xyXG4vLyBiaWdTaGlwLmxvY2F0aW9uKCk7XHJcbi8vIGJpZ1NoaXAuaGVhbHRoQmFyKCk7XHJcbi8vIGJpZ1NoaXAuaXNTdW5rKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzaGlwcyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gaW4gdGhpcyBmaWxlIHdlIGFyZSBnb25uYSBnYXRoZXIgYWxsIHRoZSBjb21wb25lbnRzIG9mIEJhdHRsZXNoaXAgVGhlIEdhbWUgYW5kIHR1cm4gaXQgaW50byByZWFsIGdhbWVcclxuXHJcbi8vIHBsYXllci4gV2hhdCBkb2VzIHBsYXllciBkby5cclxuLy8gcGxheWVyIHN0YXJ0IHRoZSBnYW1lIGJ5IGNob29zaW5nIHdobyB5b3VyZSBwbGF5aW5nIHdpdGhcclxuLy8gcGxheWVyIGNob29zZSBpcyBpdCBnb25uYSBiZSB2cyBBSSBvciB2cyBIdW1hblxyXG4vLyBhdCB0aGlzIHBvaW50LCBpZiB5b3UgY2hvb3NlIEFJLiBBSSB3aWxsIGF1dG9tYXRpY2FsbHkgcGxhY2UgdGhlaXIgc2hpcHMgcmFuZG9tbHkgb24gZ2FtZWJvYXJkLlxyXG4vLyBwbGF5ZXIgY2hvb3NlIHRoZSBzaGlwcyBwbGFjZW1lbnQgYWNjcm9zcyB0aGUgZ2FtZWJvYXJkLlxyXG4vLyBzaGlwJ3MgcGxhY2VtZW50IGlzIGJhc2VkIG9uIG9uZSBydWxlIHRoYXQgdGhlcmUgaXMgYWx3YXlzIG9uZSBlbXB0eSBibG9jayBiZXR3ZWVuIG9uZSBhbmQgYW5vdGhlciBwbGFjZWQgc2hpcHNcclxuLy8gcGxheWVyIGhhdmUgYSBjaG9pY2UgdG8gcmFuZG9tbHkgcGxhY2UgdGhlIHNoaXBzIGJ5IGNsaWNraW5nIHRoZSByYW5kb20gYnV0dG9uLiBcclxuLy8gcGxheWVyIHBsYWNlbWVudCBvcmRlciBpcy4uIGZpcnN0IHlvdSBwbGFjZSBvbmUgYmlnIHNoaXAgKDUgaW4gbGVuZ3RoKSwgdGhlbiB0d28gbWlkIHNoaXAgKDMgaW4gbGVuZ3RoKSwgdGhlbiB0aHJlZSBzbWFsbCBzaGlwICgyIGluIGxlbmd0aCkgXHJcbi8vIGFmdGVyIGFsbCBzaGlwcyBhcmUgcGxhY2VkLCBnYW1lIGluaXRpYXRlIHRvIHN0YXJ0IGF0dGFja2luZyBieSBjaG9vc2luZyB0aGUgb3Bwb25lbnRzJ3MgZ2FtZWJvYXJkLiBUaGlzIHBoYXNlIHlvdSBjb3VsZCBoaXQgb3Bwb25lbnRzJ3Mgc2hpcC5cclxuLy8gYWZ0ZXIgeW91IGF0dGFjayBvcHBvbmVudCdzIHNoaXAsIGdhbWUgYXV0b21hdGljYWxseSBjaGFuZ2UgdG8gb3Bwb25lbnQncyB0dXJuLiBUaGlzIHRpbWUgT3Bwb25lbnQncyB3aWxsIGluaXRpYXRlIGF0dGFjayBwbGF5ZXIncyBnYW1lYm9hcmQgcmFuZG9tbHkuXHJcbi8vIFRoZSBBSSBkb2VzIG5vdCBoYXZlIHRvIGJlIHNtYXJ0LCBidXQgaXQgc2hvdWxkIGtub3cgd2hldGhlciBvciBub3QgYSBnaXZlbiBtb3ZlIGlzIGxlZ2FsLiAoaS5lLiBpdCBzaG91bGRu4oCZdCBzaG9vdCB0aGUgc2FtZSBjb29yZGluYXRlIHR3aWNlKS4gXHJcbi8vIEdhbWUgcmVwZWF0aW5nIHRoZSBwcmV2aW91cyBzdGVwIHVudGlsIG9uZSBvZiB0aGUgcGxheWVyL0FJIHNoaXBzIGFyZSBmdWxseSBjbGVhbmVkIChhbGwgZGVzdHJveWVkKVxyXG4vLyBnYW1lIGVuZGluZyBpZiBvbmUgb2YgdGhlIHBsYXllci9BSSB0b3RhbCBoZWFsdGhiYXIgKHNoaXBzKSBhcmUgPSAwLiBcclxuLy8gMVx0Q2Fycmllclx0NVxyXG4vLyAyXHRCYXR0bGVzaGlwXHQ0XHJcbi8vIDNcdENydWlzZXJcdDNcclxuLy8gNFx0U3VibWFyaW5lXHQzXHJcbi8vIDVcdERlc3Ryb3llclx0MlxyXG5cclxuXHJcbmltcG9ydCBwbGF5ZXIgZnJvbSBcIi4vcGxheWVyLmpzXCI7XHJcbmltcG9ydCBnYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCJcclxuaW1wb3J0IHNoaXBzIGZyb20gXCIuL3NoaXBzLmpzXCI7XHJcbmltcG9ydCBwbGFjZVJhbmRvbWl6ZXIgZnJvbSBcIi4vcGxhY2VSYW5kb21pemVyLmpzXCI7XHJcbmltcG9ydCBmaW5kQ29tbW9uRWxlbWVudHMgZnJvbSBcIi4vZmluZENvbW1vbkVsZW1lbnRzLmpzXCI7XHJcbmltcG9ydCBwbGFjZUdhcCBmcm9tIFwiLi9wbGFjZUdhcC5qc1wiO1xyXG5pbXBvcnQgY3JlYXRlR3JpZCBmcm9tIFwiLi9sYXlvdXRHcmlkLmpzXCI7XHJcbmltcG9ydCBsYXlvdXRHcmlkUGxhY2VkQ29sb3IgZnJvbSBcIi4vbGF5b3V0R3JpZFBsYWNlZENvbG9yLmpzXCI7XHJcbmltcG9ydCB7bWFya2VkQXR0YWNrLCByZXNldE1hcmtlZEF0dGFja30gZnJvbSBcIi4vbWFya2VkQXR0YWNrTW92ZS5qc1wiO1xyXG5pbXBvcnQgY2xlYXJDaGlsZCBmcm9tIFwiLi9jbGVhckNoaWxkLmpzXCI7XHJcblxyXG5jcmVhdGVHcmlkKCdBSScpO1xyXG5jcmVhdGVHcmlkKCdwbGF5ZXInKTtcclxuY29uc3QgUExBWUVST05FID0gcGxheWVyKCk7IFxyXG5jb25zdCBBSSA9IHBsYXllcigpO1xyXG5jb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuY29uc3QgQUlHYW1lYm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuY29uc3QgZ2FtZSA9IHN0YXJ0R2FtZSgpO1xyXG5cclxuZnVuY3Rpb24gc3RhcnRHYW1lKCl7XHJcbiAgICBmdW5jdGlvbiByYW5kb21QbGFjZW1lbnQoYm9hcmQsIHZhbCl7IC8vIHlvdSBjYW4gdXNlIHRoaXMgcmFuZG9tUGxhY2VtZW50IHdpdGggQUkgb3IgUGxheWVyXHJcbiAgICAgICAgbGV0IG5ld1NoaXBDb29yZCA9IHBsYWNlUmFuZG9taXplcih2YWwpO1xyXG4gICAgICAgIGxldCBuZXdTaGlwV2l0aEdhcCA9IHBsYWNlR2FwKG5ld1NoaXBDb29yZCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlUmFuZG9taXplV2l0aEdhcCgpe1xyXG4gICAgICAgICAgICBuZXdTaGlwQ29vcmQgPSBwbGFjZVJhbmRvbWl6ZXIodmFsKTtcclxuICAgICAgICAgICAgbmV3U2hpcFdpdGhHYXAgPSBwbGFjZUdhcChuZXdTaGlwQ29vcmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tBbmRBZGRFbGVtZW50cyhuZXdlc3QsIGN1cnJlbnQsIHZhbCl7XHJcbiAgICAgICAgICAgIGlmIChmaW5kQ29tbW9uRWxlbWVudHMobmV3ZXN0LCBjdXJyZW50KSA9PT0gZmFsc2UpeyAvLyBpZiB0aGVyZSBJUyBOT1QgY29tbW9uIGVsZW1lbnRzIGluc2lkZSBvZiBib3RoIGFycmF5IChub3QgY2xhc2hlZCksIHByb2NlZWQgdG8gYWRkIHRvIGdhbWVib2FyZFxyXG4gICAgICAgICAgICAgICAgYm9hcmQucGxhY2VtZW50KHNoaXBzKG5ld1NoaXBDb29yZCkpO1xyXG4gICAgICAgICAgICAgICAgYm9hcmQuYWRkR2FwTG9jYXRpb24ocGxhY2VHYXAobmV3U2hpcENvb3JkKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHsgLy8gaWYgdGhlcmUgSVMgY29tbW9uIGVsZW1lbnQgaW5zaWRlIGJvdGggYXJyYXksIHJhbmRvbWl6ZSB0aGUgc2hpcCBwbGFjZW1lbnQgYWdhaW4sIHRoZW4gcmVwZWF0IHRoaXMgZnVuY3Rpb25cclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdjbGFzaGVkIGluaXRpYXRlIHJlY3VyZXNlIGNoZWNrJyk7XHJcbiAgICAgICAgICAgICAgICByZVJhbmRvbWl6ZVdpdGhHYXAoKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrQW5kQWRkRWxlbWVudHMobmV3U2hpcENvb3JkLCBib2FyZC5hbGxHYXBMb2NhdGlvbiwgdmFsKTsgLy8gcmVwZWF0IHRoaXMgZnVuY3Rpb24gYWdhaW5cclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHN0YXJ0cyBoZXJlXHJcbiAgICAgICAgY2hlY2tBbmRBZGRFbGVtZW50cyhuZXdTaGlwV2l0aEdhcCwgYm9hcmQuYWxsR2FwTG9jYXRpb24sIHZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmFuZG9tQXR0YWNrKGJvYXJkLCB1c2VyKXtcclxuICAgICAgICBsZXQgbmV3QXR0YWNrQ29vcmQgPSBwbGFjZVJhbmRvbWl6ZXIoMSk7IC8vIG9ubHkgb25lIGdyaWQgcGVyIGF0dGFjayBhbGxvd2VkXHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gcmVOZXdBdHRhY2soKXtcclxuICAgICAgICAgICAgbmV3QXR0YWNrQ29vcmQgPSBwbGFjZVJhbmRvbWl6ZXIoMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjaGVja1JlcGVhdGVkQXR0YWNrKG5ld2VzdCwgY3VycmVudCwgdXNlcil7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld2VzdCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnQpO1xyXG4gICAgICAgICAgICBpZiAoIWN1cnJlbnQpe1xyXG4gICAgICAgICAgICAgICAgYm9hcmQucmVjZWl2ZUF0dGFjayhuZXdBdHRhY2tDb29yZCwgdXNlcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChmaW5kQ29tbW9uRWxlbWVudHMobmV3ZXN0LCBjdXJyZW50KSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgYm9hcmQucmVjZWl2ZUF0dGFjayhuZXdBdHRhY2tDb29yZCwgdXNlcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlTmV3QXR0YWNrKCk7XHJcbiAgICAgICAgICAgICAgICBjaGVja1JlcGVhdGVkQXR0YWNrKG5ld0F0dGFja0Nvb3JkLCBib2FyZC5hbGxSZWNlaXZlZEF0dGFja0xvY2F0aW9uLCB1c2VyKTtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNoZWNrUmVwZWF0ZWRBdHRhY2sobmV3QXR0YWNrQ29vcmQsIGJvYXJkLmFsbFJlY2VpdmVkQXR0YWNrTG9jYXRpb24sIHVzZXIpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRTaGlwUmFuZG9tKGJvYXJkKXtcclxuICAgICAgICAvLyBwbGFjZSB0aGUgYm9hcmQgeW91IHVzZSBhbmQgdGhlIGxlbmd0aCBvZiBzaGlwLCB0aGVuIHJhbmRvbVBsYWNlbWVudCgpIHdpbGwgcGxhY2UgaXQgcmFuZG9tbHkgaW5jbHVkaW5nIGdhcCBiZXR3ZWVuIHNoaXBzXHJcbiAgICAgICAgcmFuZG9tUGxhY2VtZW50KGJvYXJkLDUpOyBcclxuICAgICAgICByYW5kb21QbGFjZW1lbnQoYm9hcmQsNCk7XHJcbiAgICAgICAgcmFuZG9tUGxhY2VtZW50KGJvYXJkLDMpO1xyXG4gICAgICAgIHJhbmRvbVBsYWNlbWVudChib2FyZCwzKTtcclxuICAgICAgICByYW5kb21QbGFjZW1lbnQoYm9hcmQsMik7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBlbXB0eVRoZUdhbWVib2FyZChib2FyZCwgdXNlcil7XHJcbiAgICAgICAgYm9hcmQuZGVsZXRlQWxsU2hpcCgpO1xyXG4gICAgICAgIGxheW91dEdyaWRQbGFjZWRDb2xvcihib2FyZCwgdXNlcik7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBhdHRhY2tNb2RlKHVzZXIpe1xyXG4gICAgICAgIGNvbnN0IGdhbWVsYXlvdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt1c2VyfUdhbWVib2FyZGApOyAvLyBzdGlsbCBicm9rZSBldmVyeSBhdHRhY2sgbW9kZSBpcyBpbml0aWF0ZWQgb3ZlcjIgYWdhaW4gc28sIDR4IHN0YXJ0IGdhbWUgPSA0eCBhdHRhY2ttb2RlKClcclxuICAgICAgICBjb25zdCBhbGxHcmlkID0gZ2FtZWxheW91dC5xdWVyeVNlbGVjdG9yQWxsKCdkaXYnKTtcclxuICAgICAgICBhbGxHcmlkLmZvckVhY2goKGdyaWQpPT57XHJcbiAgICAgICAgICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYoIFBMQVlFUk9ORS5jaGVja0F0dGFjaygpID09IFwiT0ZGXCIgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9BSSBpbml0aWF0ZSBhdXRvIEF0dGFja1xyXG4gICAgICAgICAgICAgICAgICAgIFBMQVlFUk9ORS50b2dnbGVBdHRhY2tPTigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKFBMQVlFUk9ORS5jaGVja0F0dGFjaygpID09IFwiT05cIiApe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCBncmlkLmNsYXNzTmFtZSArICcgYXR0YWNrZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICBBSUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGdyaWQuY2xhc3NOYW1lLCAnQUknKTtcclxuICAgICAgICAgICAgICAgICAgICBBSUdhbWVib2FyZC5jaGVja1RvdGFsSGVhbHRoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZG9tQXR0YWNrKHBsYXllckdhbWVib2FyZCwgJ3BsYXllcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFBMQVlFUk9ORS50b2dnbGVBdHRhY2tPRkYoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBBSS50b2dnbGVBdHRhY2tPTigpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRvZ2dsZSBBSSBhdXRvIEF0dGFja1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBhdHRhY2tNb2RlKCdBSScpO1xyXG4gICAgLy8gYXR0YWNrTW9kZSgncGxheWVyJyk7XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIGF1dG9BdHRhY2tBSSgpe1xyXG4gICAgICAgIC8vIHBpY2sgcmFuZG9taXplZCBncmlkIGZyb20gbGF5b3V0XHJcbiAgICAgICAgLy8gY29uc3QgcmFuZG9tR3JpZCA9IHJhbmRvbVBsYWNlbWVudChwbGF5ZXJHYW1lYm9hcmQsIDEpO1xyXG4gICAgICAgIC8vIGxhdW5jaCBhdHRhY2soKSBvbiB0aGF0IGdyaWRcclxuICAgICAgICAvLyBwbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhyYW5kb21HcmlkKTtcclxuICAgICAgICAvLyBjaGVjayBnYW1lYm9hcmQucmVjZWl2ZUF0dGFjaygpXHJcbiAgICAgICAgLy8gaWYgbWlzc2VkIG9yIGhpdCByZWNlaXZlQXR0YWNrKCkgd2lsbCBzb3J0IGl0IG91dFxyXG4gICAgICAgIC8vIGNoZWNrIGdhbWVib2FyZC5hbGxMb2NhdGlvbigpIHRvIHNlZSBpZiBpdCBpcyBlbmRnYW1lIG9yIG5vdCBcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzdGFydFZzQUk6ICgpPT57XHJcbiAgICAgICAgICAgIGNsZWFyQ2hpbGQoJ0FJR2FtZWJvYXJkJyk7XHJcbiAgICAgICAgICAgIGNsZWFyQ2hpbGQoJ3BsYXllckdhbWVib2FyZCcpO1xyXG4gICAgICAgICAgICBjcmVhdGVHcmlkKCdBSScpO1xyXG4gICAgICAgICAgICBjcmVhdGVHcmlkKCdwbGF5ZXInKTtcclxuICAgICAgICAgICAgYXR0YWNrTW9kZSgnQUknKTtcclxuICAgICAgICAgICAgZW1wdHlUaGVHYW1lYm9hcmQocGxheWVyR2FtZWJvYXJkLCAncGxheWVyJyk7XHJcbiAgICAgICAgICAgIGVtcHR5VGhlR2FtZWJvYXJkKEFJR2FtZWJvYXJkLCAnQUknKTtcclxuICAgICAgICAgICAgcmVzZXRNYXJrZWRBdHRhY2soJ0FJJyk7XHJcbiAgICAgICAgICAgIHJlc2V0TWFya2VkQXR0YWNrKCdwbGF5ZXInKTtcclxuICAgICAgICAgICAgc2V0U2hpcFJhbmRvbShBSUdhbWVib2FyZCk7XHJcbiAgICAgICAgICAgIHNldFNoaXBSYW5kb20ocGxheWVyR2FtZWJvYXJkKTtcclxuICAgICAgICAgICAgbGF5b3V0R3JpZFBsYWNlZENvbG9yKHBsYXllckdhbWVib2FyZCwgJ3BsYXllcicpO1xyXG4gICAgICAgICAgICBQTEFZRVJPTkUudG9nZ2xlQXR0YWNrT04oKTtcclxuICAgICAgICAgICAgLy8gbGF5b3V0R3JpZFBsYWNlZENvbG9yKEFJR2FtZWJvYXJkLCAnQUknKTtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXN0YXJ0R2FtZTogKCk9PiB7XHJcbiAgICAgICAgICAgIGVtcHR5VGhlR2FtZWJvYXJkKHBsYXllckdhbWVib2FyZCwgJ3BsYXllcicpO1xyXG4gICAgICAgICAgICBlbXB0eVRoZUdhbWVib2FyZChBSUdhbWVib2FyZCwgJ0FJJyk7XHJcbiAgICAgICAgICAgIHJlc2V0TWFya2VkQXR0YWNrKCdBSScpO1xyXG4gICAgICAgICAgICByZXNldE1hcmtlZEF0dGFjaygncGxheWVyJyk7XHJcbiAgICAgICAgICAgIGNsZWFyQ2hpbGQoJ0FJR2FtZWJvYXJkJyk7XHJcbiAgICAgICAgICAgIGNsZWFyQ2hpbGQoJ3BsYXllckdhbWVib2FyZCcpO1xyXG4gICAgICAgICAgICBjcmVhdGVHcmlkKCdBSScpO1xyXG4gICAgICAgICAgICBjcmVhdGVHcmlkKCdwbGF5ZXInKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0YXJ0R2FtZUJ0bigpe1xyXG4gICAgY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnRHYW1lQnRuJyk7XHJcbiAgICBjb25zdCByZXN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3RhcnRCdG4nKTtcclxuXHJcbiAgICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1BsYXkgdGhlIGdhbWUhJyk7XHJcbiAgICAgICAgZ2FtZS5zdGFydFZzQUkoKTtcclxuICAgIH0pO1xyXG4gICAgcmVzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3Jlc3RhcnRlZCcpO1xyXG4gICAgICAgIGdhbWUucmVzdGFydEdhbWUoKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5zdGFydEdhbWVCdG4oKVxyXG5cclxuY29uc29sZS5sb2coJ0dhbWUgUmVhZHknKTtcclxuZXhwb3J0IHtQTEFZRVJPTkUsIHBsYXllckdhbWVib2FyZCwgQUksIEFJR2FtZWJvYXJkfSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==