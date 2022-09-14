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
            const coord = coor.toString();
            allReceivedAttackLocation.push(coord);
            
            if(allLocation.includes(coord) === false){
                console.log('Attack missed to:' + user)
                attackMissedCounter(coord);
                (0,_markedAttackMove_js__WEBPACK_IMPORTED_MODULE_0__.markedAttack)(user, coord);
                return 
            } 
            else {
                console.log('Attack Hit! to: ' + user)
                allShip.forEach((ship)=>{
                    ship.hit(coord);
                });
                // refresh the allLocation Array so you cannot hit twice on the same coordinate
                refreshAllLocation()
                if (allLocation.length < 1){
                    console.log('ALL SHIPS HAS BEEN DESTROYED, RIP TO: ' + user)
                    return
                }
                else {
                    (0,_markedAttackMove_js__WEBPACK_IMPORTED_MODULE_0__.markedHit)(user, coord);
                }
                // console.log(allLocation);
            } 
            // toggle checkAllShip() to make sure if its not endgame
            // if not marks the coordinate with missedAttack()
            //return
        },
        allReceivedAttackLocation,
        checkTotalHealth: ()=>{
            refreshAllLocation();
            totalHealth = allLocation.length;
            // if all the healthbar is 0 then the game is ended
            if(totalHealth <= 0){
                console.log("GAME OVER ALL OF YOUR SHIPS WRECKED");
                return
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
        // console.log(grid);
        // console.log(className);
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
/* harmony export */   "AIGameboard": () => (/* binding */ AIGameboard),
/* harmony export */   "playerGameboard": () => (/* binding */ playerGameboard)
/* harmony export */ });
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ "./src/gameboard.js");
/* harmony import */ var _ships_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ships.js */ "./src/ships.js");
/* harmony import */ var _placeRandomizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./placeRandomizer.js */ "./src/placeRandomizer.js");
/* harmony import */ var _findCommonElements_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./findCommonElements.js */ "./src/findCommonElements.js");
/* harmony import */ var _placeGap_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./placeGap.js */ "./src/placeGap.js");
/* harmony import */ var _layoutGrid_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./layoutGrid.js */ "./src/layoutGrid.js");
/* harmony import */ var _layoutGridPlacedColor_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./layoutGridPlacedColor.js */ "./src/layoutGridPlacedColor.js");
/* harmony import */ var _clearChild_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./clearChild.js */ "./src/clearChild.js");









(0,_layoutGrid_js__WEBPACK_IMPORTED_MODULE_5__["default"])('AI');
(0,_layoutGrid_js__WEBPACK_IMPORTED_MODULE_5__["default"])('player');
const playerGameboard = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
const AIGameboard = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
const game = startGame();

function startGame(){
    function randomPlacement(board, val){ // you can use this randomPlacement with AI or Player
        let newShipCoord = (0,_placeRandomizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(val);
        let newShipWithGap = (0,_placeGap_js__WEBPACK_IMPORTED_MODULE_4__["default"])(newShipCoord);

        function reRandomizeWithGap(){
            newShipCoord = (0,_placeRandomizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(val);
            newShipWithGap = (0,_placeGap_js__WEBPACK_IMPORTED_MODULE_4__["default"])(newShipCoord);
        }

        function checkAndAddElements(newest, current, val){
            if ((0,_findCommonElements_js__WEBPACK_IMPORTED_MODULE_3__["default"])(newest, current) === false){ // if there IS NOT common elements inside of both array (not clashed), proceed to add to gameboard
                board.placement((0,_ships_js__WEBPACK_IMPORTED_MODULE_1__["default"])(newShipCoord));
                board.addGapLocation((0,_placeGap_js__WEBPACK_IMPORTED_MODULE_4__["default"])(newShipCoord));
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
        let newAttackCoord = (0,_placeRandomizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(1); // only one grid per attack allowed
        
        function reNewAttack(){
            newAttackCoord = (0,_placeRandomizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(1);
        }

        function checkRepeatedAttack(newest, current, user){
            if (!current){
                board.receiveAttack(newAttackCoord, user);
                return
            }
            else if ((0,_findCommonElements_js__WEBPACK_IMPORTED_MODULE_3__["default"])(newest, current) === false){
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
        (0,_clearChild_js__WEBPACK_IMPORTED_MODULE_7__["default"])('AIGameboard');
        (0,_clearChild_js__WEBPACK_IMPORTED_MODULE_7__["default"])('playerGameboard');
        (0,_layoutGrid_js__WEBPACK_IMPORTED_MODULE_5__["default"])('AI');
        (0,_layoutGrid_js__WEBPACK_IMPORTED_MODULE_5__["default"])('player');
    }
    function attackMode(user){
        const gamelayout = document.querySelector(`.${user}Gameboard`); // still broke every attack mode is initiated over2 again so, 4x start game = 4x attackmode()
        const allGrid = gamelayout.querySelectorAll('div');
        allGrid.forEach((grid)=>{
            grid.addEventListener('click', ()=>{
                if(grid.classList.contains('attacked') || grid.classList.contains('hit')){
                    return
                }
                else{// console.log( grid.className + ' attacked');
                    if(AIGameboard.allLocation().length < 1){
                        return
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
            (0,_layoutGridPlacedColor_js__WEBPACK_IMPORTED_MODULE_6__["default"])(playerGameboard, 'player');
        },
        restartGame: ()=> {
            resetGameboard();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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L2NsZWFyQ2hpbGQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9maW5kQ29tbW9uRWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9sYXlvdXRHcmlkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbGF5b3V0R3JpZFBsYWNlZENvbG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbWFya2VkQXR0YWNrTW92ZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYWNlR2FwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxhY2VSYW5kb21pemVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbWFpbmdhbWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gY2xlYXJDaGlsZChwYXJlbnQpIHtcclxuICAgIGNvbnN0IGxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7cGFyZW50fWApXHJcbiAgICB3aGlsZSAobGF5ZXIuZmlyc3RDaGlsZCkge1xyXG4gICAgICBsYXllci5yZW1vdmVDaGlsZChsYXllci5maXJzdENoaWxkKTtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xlYXJDaGlsZDsiLCJmdW5jdGlvbiBmaW5kQ29tbW9uRWxlbWVudHMoYXJyMSwgYXJyMikge1xyXG4gICAgcmV0dXJuIGFycjEuc29tZShpdGVtID0+IGFycjIuaW5jbHVkZXMoaXRlbSkpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZpbmRDb21tb25FbGVtZW50cyIsImltcG9ydCB7IG1hcmtlZEF0dGFjaywgbWFya2VkSGl0IH0gZnJvbSBcIi4vbWFya2VkQXR0YWNrTW92ZS5qc1wiO1xyXG5cclxuY29uc3QgZ2FtZWJvYXJkID0gKCk9PiB7XHJcbiAgICBsZXQgYWxsU2hpcCA9IFtdO1xyXG4gICAgbGV0IHRvdGFsSGVhbHRoID0gMDtcclxuICAgIGxldCBhbGxMb2NhdGlvbiA9IFtdO1xyXG4gICAgbGV0IGF0dGFja01pc3NlZCA9IFtdO1xyXG4gICAgbGV0IGFsbEdhcExvY2F0aW9uID0gW107XHJcbiAgICBsZXQgYWxsUmVjZWl2ZWRBdHRhY2tMb2NhdGlvbiA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJlZnJlc2hBbGxMb2NhdGlvbigpe1xyXG4gICAgICAgIGxldCBuZXdMb2NhdGlvbiA9IFtdO1xyXG4gICAgICAgIGFsbFNoaXAuZm9yRWFjaCgoc2hpcCk9PntcclxuICAgICAgICAgICAgbmV3TG9jYXRpb24gPSBuZXdMb2NhdGlvbi5jb25jYXQoc2hpcC5sb2NhdGlvbigpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhbGxMb2NhdGlvbiA9IG5ld0xvY2F0aW9uO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gYXR0YWNrTWlzc2VkQ291bnRlcihjb29yKXtcclxuICAgICAgICBhdHRhY2tNaXNzZWQucHVzaChjb29yKTtcclxuICAgIH1cclxuXHJcbiAgICAvL2NvbnNvbGUubG9nKCdnYW1lYm9hcmQgaXMgb24nKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcGxhY2VtZW50OiAoc2hpcHMpPT57IC8vIGRvbnQgbmVlZCBjb29yIHNpbmNlIGNvb3JkaW5hdGUgc2hvdWxkIGJlIGluc2lkZSB0aGUgc2hpcCgpXHJcbiAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgY29vcmRpbmF0ZSBpcyB2YWxpZCwgd2hpY2ggbWVhbnMgZW1wdHkgYW5kIG9uZSBibG9jayBhd2F5IGZyb20gYW5vdGhlciBzaGlwXHJcbiAgICAgICAgICAgIC8vIHBsYWNlIHRoZSBzaGlwcyBvbiB0aGUgY29vcmRpbmF0ZSAgICAgXHJcbiAgICAgICAgICAgIGFsbFNoaXAucHVzaChzaGlwcyk7XHJcbiAgICAgICAgICAgIGFsbExvY2F0aW9uID0gYWxsTG9jYXRpb24uY29uY2F0KHNoaXBzLmxvY2F0aW9uKCkpO1xyXG4gICAgICAgICAgICAvLyBtYXJrcyB0aGUgY29vcmRpbmF0ZSB3aXRoIHNoaXBzJyBtYXJrc1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlY2VpdmVBdHRhY2s6IChjb29yLCB1c2VyKT0+e1xyXG4gICAgICAgICAgICBjb25zdCBjb29yZCA9IGNvb3IudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgYWxsUmVjZWl2ZWRBdHRhY2tMb2NhdGlvbi5wdXNoKGNvb3JkKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKGFsbExvY2F0aW9uLmluY2x1ZGVzKGNvb3JkKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0F0dGFjayBtaXNzZWQgdG86JyArIHVzZXIpXHJcbiAgICAgICAgICAgICAgICBhdHRhY2tNaXNzZWRDb3VudGVyKGNvb3JkKTtcclxuICAgICAgICAgICAgICAgIG1hcmtlZEF0dGFjayh1c2VyLCBjb29yZCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0F0dGFjayBIaXQhIHRvOiAnICsgdXNlcilcclxuICAgICAgICAgICAgICAgIGFsbFNoaXAuZm9yRWFjaCgoc2hpcCk9PntcclxuICAgICAgICAgICAgICAgICAgICBzaGlwLmhpdChjb29yZCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIHJlZnJlc2ggdGhlIGFsbExvY2F0aW9uIEFycmF5IHNvIHlvdSBjYW5ub3QgaGl0IHR3aWNlIG9uIHRoZSBzYW1lIGNvb3JkaW5hdGVcclxuICAgICAgICAgICAgICAgIHJlZnJlc2hBbGxMb2NhdGlvbigpXHJcbiAgICAgICAgICAgICAgICBpZiAoYWxsTG9jYXRpb24ubGVuZ3RoIDwgMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0FMTCBTSElQUyBIQVMgQkVFTiBERVNUUk9ZRUQsIFJJUCBUTzogJyArIHVzZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXJrZWRIaXQodXNlciwgY29vcmQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYWxsTG9jYXRpb24pO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAvLyB0b2dnbGUgY2hlY2tBbGxTaGlwKCkgdG8gbWFrZSBzdXJlIGlmIGl0cyBub3QgZW5kZ2FtZVxyXG4gICAgICAgICAgICAvLyBpZiBub3QgbWFya3MgdGhlIGNvb3JkaW5hdGUgd2l0aCBtaXNzZWRBdHRhY2soKVxyXG4gICAgICAgICAgICAvL3JldHVyblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWxsUmVjZWl2ZWRBdHRhY2tMb2NhdGlvbixcclxuICAgICAgICBjaGVja1RvdGFsSGVhbHRoOiAoKT0+e1xyXG4gICAgICAgICAgICByZWZyZXNoQWxsTG9jYXRpb24oKTtcclxuICAgICAgICAgICAgdG90YWxIZWFsdGggPSBhbGxMb2NhdGlvbi5sZW5ndGg7XHJcbiAgICAgICAgICAgIC8vIGlmIGFsbCB0aGUgaGVhbHRoYmFyIGlzIDAgdGhlbiB0aGUgZ2FtZSBpcyBlbmRlZFxyXG4gICAgICAgICAgICBpZih0b3RhbEhlYWx0aCA8PSAwKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR0FNRSBPVkVSIEFMTCBPRiBZT1VSIFNISVBTIFdSRUNLRURcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWxsTG9jYXRpb246ICgpPT57XHJcbiAgICAgICAgICAgIHJlZnJlc2hBbGxMb2NhdGlvbigpO1xyXG4gICAgICAgICAgICByZXR1cm4gYWxsTG9jYXRpb25cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoZWNrQWxsTG9jYXRpb246KCk9PntcclxuICAgICAgICAgICAgcmVmcmVzaEFsbExvY2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFsbExvY2F0aW9uKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFsbExvY2F0aW9uXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZWxldGVBbGxTaGlwOiAoKT0+IHtcclxuICAgICAgICAgICAgYWxsU2hpcC5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB0b3RhbEhlYWx0aCA9IDA7XHJcbiAgICAgICAgICAgIGFsbExvY2F0aW9uLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIGF0dGFja01pc3NlZC5sZW5ndGg9MDtcclxuICAgICAgICAgICAgYWxsR2FwTG9jYXRpb24ubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgYWxsUmVjZWl2ZWRBdHRhY2tMb2NhdGlvbi5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICByZWZyZXNoQWxsTG9jYXRpb24oKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFkZEdhcExvY2F0aW9uOiAoYXJyYXkpPT4ge1xyXG4gICAgICAgICAgICAvLyBnYXBMb2NhdGlvbi5wdXNoKGFycmF5KTtcclxuICAgICAgICAgICAgYXJyYXkuZm9yRWFjaCgoYXJyKT0+e1xyXG4gICAgICAgICAgICAgICAgYWxsR2FwTG9jYXRpb24ucHVzaChhcnIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCBcclxuICAgICAgICBjaGVja0dhcExvY2F0aW9uOiAoKT0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYWxsR2FwTG9jYXRpb24pO1xyXG4gICAgICAgICAgICByZXR1cm4gYWxsR2FwTG9jYXRpb25cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoZWNrQXR0YWNrTWlzc2VkOiAoKT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhdHRhY2tNaXNzZWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gYXR0YWNrTWlzc2VkXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhbGxHYXBMb2NhdGlvblxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnYW1lYm9hcmQ7XHJcblxyXG4vLyBjb25zdCBwbGF5YSA9IGdhbWVib2FyZCgpO1xyXG4vLyBjb25zdCBiaWdTaGlwQ29vciA9ICc2QiA3QiA4QiA5QiAxMEInO1xyXG4vLyBjb25zdCBtaWRTaGlwQ29vciA9ICc0QiA0QyA0RCc7XHJcbi8vIGNvbnN0IG1pZFNoaXAgPSBzaGlwcyhtaWRTaGlwQ29vcik7XHJcbi8vIGNvbnN0IGJpZ1NoaXAgPSBzaGlwcyhiaWdTaGlwQ29vcik7XHJcblxyXG4vLyBwbGF5YS5wbGFjZW1lbnQoYmlnU2hpcCk7XHJcbi8vIHBsYXlhLnBsYWNlbWVudChtaWRTaGlwKTtcclxuLy8gcGxheWEucmVjZWl2ZUF0dGFjayhcIjRCXCIpO2RlYnVnZ2VyXHJcbi8vIHBsYXlhLnJlY2VpdmVBdHRhY2soXCI0Q1wiKTtkZWJ1Z2dlclxyXG4vLyBwbGF5YS5yZWNlaXZlQXR0YWNrKFwiNERcIik7ZGVidWdnZXJcclxuLy8gcGxheWEucmVjZWl2ZUF0dGFjayhcIjNCXCIpO2RlYnVnZ2VyXHJcbi8vIHBsYXlhLmNoZWNrQWxsTG9jYXRpb24oKTtcclxuLy8gcGxheWEuY2hlY2tBdHRhY2tNaXNzZWQoKTtcclxuLy8gcGxheWEuY2hlY2tUb3RhbEhlYWx0aCgpOyBcclxuLy8gcmV2aXNlIHRoaXNcclxuLy8gcGxheWEucGxhY2VtZW50KCcxQSAyQSAzQScsIHNoaXBzKDMpKTtcclxuLy8gcGxheWEucGxhY2VtZW50KCczQiA0QicsIHNoaXBzKDIpKTtcclxuLy8gcGxheWEucGxhY2VtZW50KCc2QiA3QiA4QiA5QiAxMEInLCBzaGlwcyg1KSk7XHJcbi8vIHBsYXlhLnBsYWNlbWVudCgnNkUgN0UgOEUgOUUgMTBFJywgc2hpcHMoNSkpOyIsIlxyXG5mdW5jdGlvbiBjcmVhdGVHcmlkKHdob3Mpe1xyXG4gICAgY29uc3QgbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt3aG9zfUdhbWVib2FyZGApO1xyXG4gICAgY29uc3QgTUFYX1dJRFRIID0gMTA7XHJcbiAgICBjb25zdCBhbHBoYWJldCA9ICdhYmNkZWZnaGlqJztcclxuICAgIGNvbnN0IGFscGhBcnJheSA9IGFscGhhYmV0LnNwbGl0KCcnKTtcclxuXHJcbiAgICBhbHBoQXJyYXkuZm9yRWFjaCgoYWxwKT0+e1xyXG4gICAgICAgIGZvciAobGV0IGk9MTsgaSA8PSBNQVhfV0lEVEg7IGkrKyApe1xyXG4gICAgICAgICAgICBjb25zdCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGdyaWQuY2xhc3NOYW1lPWAke2FscH0ke2l9YDtcclxuICAgICAgICAgICAgLy8gZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhncmlkLmNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgIC8vICAgICAvLyBjbGlja2VkIHRoZSBncmlkXHJcbiAgICAgICAgICAgIC8vICAgICAvLyBpbml0aWF0ZSBhdHRhY2soKSAvLyB0aGVuIEFJIGF0dGFjayB5b3VycyB0b29cclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgIGxheWVyLmFwcGVuZChncmlkKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVHcmlkIiwiZnVuY3Rpb24gbGF5b3V0R3JpZFBsYWNlZENvbG9yKGdhbWVib2FyZCwgdXNlcil7XHJcbiAgICBsZXQgY3VycmVudEdhcCA9IGdhbWVib2FyZC5hbGxHYXBMb2NhdGlvbjtcclxuICAgIGxldCBjdXJyZW50U2hpcCA9IGdhbWVib2FyZC5hbGxMb2NhdGlvbigpO1xyXG4gICAgLy8gY29uc29sZS5sb2coY3VycmVudEdhcCk7XHJcbiAgICBpZiAoY3VycmVudEdhcC5sZW5ndGggPT09IDApe1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXQgYXJyYXkgZ2FwbG9jYXRpb24gZW1wdHknKVxyXG4gICAgICAgIGNvbnN0IGxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7dXNlcn1HYW1lYm9hcmRgKTtcclxuICAgICAgICBjb25zdCBnYXAgPSBsYXllci5xdWVyeVNlbGVjdG9yQWxsKCdkaXYnKTtcclxuICAgICAgICAgICAgZ2FwLmZvckVhY2goKGcpPT57XHJcbiAgICAgICAgICAgICAgICBnLmNsYXNzTGlzdC5yZW1vdmUoJ2dhcCcpO1xyXG4gICAgICAgICAgICAgICAgZy5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY3VycmVudEdhcC5mb3JFYWNoKChhcnJheUxvYyk9PntcclxuICAgICAgICAgICAgY29uc3QgbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt1c2VyfUdhbWVib2FyZGApO1xyXG4gICAgICAgICAgICBsZXQgZ2FwID0gbGF5ZXIucXVlcnlTZWxlY3RvcihgLiR7YXJyYXlMb2N9YCk7XHJcbiAgICAgICAgICAgIGdhcC5jbGFzc0xpc3QuYWRkKCdnYXAnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjdXJyZW50U2hpcC5mb3JFYWNoKChjdXJzaGlwKT0+e1xyXG4gICAgICAgICAgICBjb25zdCBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3VzZXJ9R2FtZWJvYXJkYCk7XHJcbiAgICAgICAgICAgIGxldCBzaGlwID0gbGF5ZXIucXVlcnlTZWxlY3RvcihgLiR7Y3Vyc2hpcH1gKTtcclxuICAgICAgICAgICAgc2hpcC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxheW91dEdyaWRQbGFjZWRDb2xvciIsImZ1bmN0aW9uIG1hcmtlZEF0dGFjayh1c2VyLCBjbGFzc05hbWUpe1xyXG4gICAgICAgIGNvbnN0IGdhbWVsYXlvdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt1c2VyfUdhbWVib2FyZGApO1xyXG4gICAgICAgIGNvbnN0IGdyaWQgPSBnYW1lbGF5b3V0LnF1ZXJ5U2VsZWN0b3IoYC4ke2NsYXNzTmFtZX1gKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhncmlkKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhjbGFzc05hbWUpO1xyXG4gICAgICAgIGdyaWQuY2xhc3NMaXN0LmFkZCgnYXR0YWNrZWQnKTtcclxuICAgICAgICByZXR1cm5cclxufVxyXG5mdW5jdGlvbiBtYXJrZWRIaXQodXNlciwgY2xhc3NOYW1lKXtcclxuICAgICAgICBjb25zdCBnYW1lbGF5b3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7dXNlcn1HYW1lYm9hcmRgKTtcclxuICAgICAgICBjb25zdCBncmlkID0gZ2FtZWxheW91dC5xdWVyeVNlbGVjdG9yKGAuJHtjbGFzc05hbWV9YCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coY2xhc3NOYW1lKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhncmlkKTtcclxuICAgICAgICBncmlkLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xyXG4gICAgICAgIHJldHVyblxyXG59XHJcblxyXG5mdW5jdGlvbiByZXNldE1hcmtlZEF0dGFjayh1c2VyKXtcclxuICAgICAgICBjb25zdCBnYW1lbGF5b3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7dXNlcn1HYW1lYm9hcmRgKTtcclxuICAgICAgICBjb25zdCBhbGxHcmlkID0gZ2FtZWxheW91dC5xdWVyeVNlbGVjdG9yQWxsKGBkaXZgKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhjbGFzc05hbWUpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGdyaWQpO1xyXG4gICAgICAgIGFsbEdyaWQuZm9yRWFjaCgoZ3JpZCk9PntcclxuICAgICAgICAgICAgICAgIGdyaWQuY2xhc3NMaXN0LnJlbW92ZSgnaGl0Jyk7XHJcbiAgICAgICAgICAgICAgICBncmlkLmNsYXNzTGlzdC5yZW1vdmUoJ2F0dGFja2VkJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuXHJcbn1cclxuZXhwb3J0IHttYXJrZWRBdHRhY2ssIG1hcmtlZEhpdCwgcmVzZXRNYXJrZWRBdHRhY2t9IiwiLy8gc2V0IGdhcCBieSBvbmUgYnkgb25lIGxvb3AgY2hlY2tcclxuXHJcbmZ1bmN0aW9uIHBsYWNlR2FwKG1haW5BcnJheSl7XHJcbiAgICBsZXQgb3V0cHV0QXJyYXkgPSBbXTtcclxuICAgIGxldCByZXN1bHRBcnJheSA9IFtdO1xyXG4gICAgY29uc3QgbnVtYmVyUGF0dCA9IC9bMC05XS9nO1xyXG4gICAgY29uc3QgYWxwaGFQYXR0ID0gL1thLXpBLVpdL2c7XHJcbiAgICBjb25zdCBhbHBoYWJldE1heCA9ICdhYmNkZWZnaGlqJztcclxuICAgIGNvbnN0IGFscEFycmF5ID0gYWxwaGFiZXRNYXguc3BsaXQoJycpO1xyXG4gICAgbWFpbkFycmF5LmZvckVhY2goKHZhbCk9PntcclxuICAgICAgICBjb25zdCBudW1iID0gcGFyc2VJbnQodmFsLm1hdGNoKG51bWJlclBhdHQpLmpvaW4oJycpKTtcclxuICAgICAgICBjb25zdCBhbHBoID0gdmFsLm1hdGNoKGFscGhhUGF0dCkuam9pbignJyk7XHJcbiAgICAgICAgY29uc3QgbnVtYk1pbnVzT25lID0gbnVtYiAtIDE7XHJcbiAgICAgICAgY29uc3QgbnVtYlBsdXNPbmUgPSBudW1iICsgMTtcclxuICAgICAgICBjb25zdCBhbHBoUGx1c09uZSA9IGFscEFycmF5WyhhbHBBcnJheS5pbmRleE9mKGFscGgpKSsxXTtcclxuICAgICAgICBjb25zdCBhbHBoTWludXNPbmUgPSBhbHBBcnJheVsoYWxwQXJyYXkuaW5kZXhPZihhbHBoKSktMV07XHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gbWVyZ2VBcnJheSgpe1xyXG4gICAgICAgICAgICAgIC8vIG1lcmdlIHRoZSBhcnJheVxyXG4gICAgICAgICAgICByZXN1bHRBcnJheSA9IHJlc3VsdEFycmF5LmNvbmNhdChvdXRwdXRBcnJheSk7XHJcbiAgICAgICAgICAgIHJlc3VsdEFycmF5ID0gWy4uLm5ldyBTZXQgKFsuLi5tYWluQXJyYXksLi4ub3V0cHV0QXJyYXldKV07ICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tSaWdodCgpe1xyXG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKGFscGguY29uY2F0KChudW1iUGx1c09uZSkudG9TdHJpbmcoKSkpOyAvLyByaWdodFxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBjaGVja0xlZnQoKXtcclxuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaChhbHBoLmNvbmNhdCgobnVtYk1pbnVzT25lKS50b1N0cmluZygpKSk7IC8vIGxlZnRcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tVcCgpe1xyXG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKGFscGhNaW51c09uZS5jb25jYXQoKG51bWIpLnRvU3RyaW5nKCkpKTsgLy8gdXBcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tEb3duKCl7XHJcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaFBsdXNPbmUuY29uY2F0KChudW1iKS50b1N0cmluZygpKSk7IC8vIGRvd25cclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tEaWFnVXBSaWdodCgpe1xyXG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKGFscGhNaW51c09uZS5jb25jYXQoKG51bWJQbHVzT25lKS50b1N0cmluZygpKSk7IC8vIHVwIHJpZ2h0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrRGlhZ0Rvd25SaWdodCgpe1xyXG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKGFscGhQbHVzT25lLmNvbmNhdCgobnVtYlBsdXNPbmUpLnRvU3RyaW5nKCkpKTsgLy8gZG93biByaWdodFxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBjaGVja0RpYWdVcExlZnQoKXtcclxuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaChhbHBoTWludXNPbmUuY29uY2F0KChudW1iTWludXNPbmUpLnRvU3RyaW5nKCkpKTsgLy8gdXAgbGVmdFxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBjaGVja0RpYWdEb3duTGVmdCgpe1xyXG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKGFscGhQbHVzT25lLmNvbmNhdCgobnVtYk1pbnVzT25lKS50b1N0cmluZygpKSk7IC8vIGRvd24gbGVmdFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYWxwaE1pbnVzT25lID09IHVuZGVmaW5lZCAmJiBudW1iTWludXNPbmUgPCAxKXsgLy8gY29ybmVyIHVwIGxlZnRcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdHMgY29ybmVyIHVwIGxlZnQnKTtcclxuICAgICAgICAgICAgY2hlY2tSaWdodCgpO1xyXG4gICAgICAgICAgICBjaGVja0Rvd24oKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnRG93blJpZ2h0KCk7XHJcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFscGhQbHVzT25lID09IHVuZGVmaW5lZCAmJiBudW1iTWludXNPbmUgPCAxKXsgLy8gY29ybmVyIGJvdHRvbSBsZWZ0XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXRzIGNvcm5lciBib3R0b20gbGVmdCcpO1xyXG4gICAgICAgICAgICBjaGVja1JpZ2h0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrVXAoKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnVXBSaWdodCgpO1xyXG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhbHBoTWludXNPbmUgPT0gdW5kZWZpbmVkICYmIG51bWJQbHVzT25lID4gMTApeyAvLyBjb3JuZXIgdXAgcmlnaHQgXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXRzIGNvcm5lciB1cCByaWdodCcpO1xyXG4gICAgICAgICAgICBjaGVja0xlZnQoKTtcclxuICAgICAgICAgICAgY2hlY2tEb3duKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25MZWZ0KCk7XHJcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFscGhQbHVzT25lID09IHVuZGVmaW5lZCAmJiBudW1iUGx1c09uZSA+IDEwKXsgLy8gY29ybmVyIGJvdHRvbSByaWdodFxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0cyBjb3JuZXIgYm90dG9tIHJpZ2h0Jyk7XHJcbiAgICAgICAgICAgIGNoZWNrTGVmdCgpO1xyXG4gICAgICAgICAgICBjaGVja1VwKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ1VwTGVmdCgpO1xyXG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChudW1iTWludXNPbmUgPCAxKXtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdCBudW1iZXIgPSAwJyk7XHJcbiAgICAgICAgICAgIGNoZWNrUmlnaHQoKTtcclxuICAgICAgICAgICAgY2hlY2tVcCgpO1xyXG4gICAgICAgICAgICBjaGVja0Rvd24oKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnVXBSaWdodCgpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdEb3duUmlnaHQoKTtcclxuICAgICAgICAgICAgbWVyZ2VBcnJheSgpO1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihudW1iUGx1c09uZSA+IDEwKXtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdCBudW1iZXIgPiAxMCcpO1xyXG4gICAgICAgICAgICBjaGVja0xlZnQoKTtcclxuICAgICAgICAgICAgY2hlY2tVcCgpO1xyXG4gICAgICAgICAgICBjaGVja0Rvd24oKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnVXBMZWZ0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25MZWZ0KCk7XHJcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFscGhNaW51c09uZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0cyB1bmRlZmluZWQnKTtcclxuICAgICAgICAgICAgY2hlY2tMZWZ0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrUmlnaHQoKTtcclxuICAgICAgICAgICAgY2hlY2tEb3duKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25MZWZ0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25SaWdodCgpOyBcclxuICAgICAgICAgICAgbWVyZ2VBcnJheSgpO1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYWxwaFBsdXNPbmUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdHMgdW5kZWZpbmVkJyk7XHJcbiAgICAgICAgICAgIGNoZWNrTGVmdCgpO1xyXG4gICAgICAgICAgICBjaGVja1JpZ2h0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrVXAoKTsgXHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ1VwTGVmdCgpOyBcclxuICAgICAgICAgICAgY2hlY2tEaWFnVXBSaWdodCgpO1xyXG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgLy8gaG9yaXpvbnRhbCBjaGVja1xyXG4gICAgICAgICAgICAgICAgY2hlY2tMZWZ0KCk7XHJcbiAgICAgICAgICAgICAgICBjaGVja1JpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICAvLyB2ZXJ0aWNhbCBjaGVja1xyXG4gICAgICAgICAgICAgICAgY2hlY2tVcCgpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tEb3duKCk7XHJcbiAgICAgICAgICAgICAgICAvL2RpYWdvbmFsIGxlZnQgY2hlY2tcclxuICAgICAgICAgICAgICAgIGNoZWNrRGlhZ1VwTGVmdCgpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tEaWFnRG93bkxlZnQoKTtcclxuICAgICAgICAgICAgICAgIC8vZGlhZ29uYWwgcmlnaHQgY2hlY2tcclxuICAgICAgICAgICAgICAgIGNoZWNrRGlhZ1VwUmlnaHQoKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25SaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgbWVyZ2VBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBcclxuXHJcbiAgICB9KTtcclxuICAgIC8vIGNvbnNvbGUubG9nKG91dHB1dEFycmF5KTtcclxuICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdEFycmF5KTtcclxuICAgIHJldHVybiByZXN1bHRBcnJheVxyXG59XHJcblxyXG4vLyBsZXQgYXJyYXkxID0gWydhJywnYicsJ2MnXTtcclxuLy8gbGV0IGFycmF5MiA9IFsneicsJ2EnLCdzJ107XHJcblxyXG4vLyBsZXQgYXJyYXkzID0gYXJyYXkxLmNvbmNhdChhcnJheTIpO1xyXG4vLyBhcnJheTMgPSBbLi4ubmV3IFNldChbLi4uYXJyYXkxLC4uLmFycmF5Ml0pXVxyXG5cclxuLy8gY29uc29sZS5sb2coYXJyYXkzKTsgXHJcblxyXG4vLyBwbGFjZUdhcChbJzEwaiddKTtcclxuLy8gcGxhY2VHYXAoWycxMGMnLCAnMTBkJywgJzEwZSddKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBsYWNlR2FwIiwiZnVuY3Rpb24gcGxhY2VSYW5kb21pemVyKGxlbmcpe1xyXG4gICAgY29uc3QgTUFYX0dSSUQgPSAxMDsgLy8gbWF4aW11bSBncmlkIGxlbmd0aCBpcyAxMHgxMFxyXG4gICAgY29uc3QgcmFuZG9tQXhpcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpOyAvLyBvbmx5IHJldHVybiAwLzFcclxuICAgIGNvbnN0IGFycmF5ID0gW107XHJcbiAgICBjb25zdCBhbHBoYWJldCA9IFwiYWJjZGVmZ2hpalwiO1xyXG4gICAgY29uc3QgcmFuZG9tTnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKE1BWF9HUklEIC0gbGVuZykpICsgMTsgLy8gdGhpcyByYW5kb21pemVyIG51bWJlciBrZWVwIHlvdSBmcm9tIG92ZXJmbG93aW5nLCBwbHVzIG9uZSBzbyBpdCBzdGFydCBmcm9tIDEgbm90IDBcclxuICAgIGNvbnN0IHJhbmRvbUFscCA9IGFscGhhYmV0W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFscGhhYmV0LnN1YnN0cmluZygwLChNQVhfR1JJRCAtIGxlbmcpKS5sZW5ndGgpXTsgLy8gdGhpcyByYW5kb21pemVyIGtlZXBzIHlvdSBmcm9tIHZhbHVlIG1vcmUgdGhhbiBsZW5ndGhcclxuICAgIGxldCBhbHBoYU51bTtcclxuXHJcbiAgICBpZiAocmFuZG9tQXhpcyA9PT0gMCl7IC8vIFggYXhpcyBibG9ja3NcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8bGVuZzsgaSsrICl7XHJcbiAgICAgICAgICAgIGFscGhhTnVtID0gcmFuZG9tQWxwLmNvbmNhdCgocmFuZG9tTnVtYmVyICsgaSkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIGFycmF5LnB1c2goYWxwaGFOdW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhhcnJheSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmFuZG9tQXhpcyk7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5XHJcbiAgICB9XHJcbiAgICBlbHNlIHsgLy8gWSBheGlzIGJsb2Nrc1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDxsZW5nOyBpKysgKXtcclxuICAgICAgICAgICAgY29uc3QgYWxwTG9vcCA9IGFscGhhYmV0LmNoYXJBdChhbHBoYWJldC5pbmRleE9mKHJhbmRvbUFscCkgKyBpKTtcclxuICAgICAgICAgICAgYWxwaGFOdW0gPSBhbHBMb29wLmNvbmNhdCgocmFuZG9tTnVtYmVyKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgYXJyYXkucHVzaChhbHBoYU51bSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGFycmF5KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhyYW5kb21BeGlzKTtcclxuICAgICAgICByZXR1cm4gYXJyYXlcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBwbGFjZVJhbmRvbWl6ZXIiLCJcclxuY29uc3Qgc2hpcHMgPSAoY29vcmQpID0+eyAvLyBsZW5ndGggd2lsbCBiZSBmcm9tIHNpemUgb2YgdGhlIHNoaXBcclxuICAgIC8vIGxldCBjb29yZCA9IGxvYy5zcGxpdCgnLCcpO1xyXG4gICAgbGV0IGhlYWx0aEJhciA9IGNvb3JkLmxlbmd0aDtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbGVuZ3RoOiAoKT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gbGVuIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGl0OiAobG9jKT0+e1xyXG4gICAgICAgICAgICAvL2dldCB0aGUgYXR0Y2sgaGl0IGxvY2F0aW9uXHJcbiAgICAgICAgICAgIGlmIChjb29yZC5pbmNsdWRlcyhsb2MpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiYXR0YWNrIG1pc3NlZFwiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihjb29yZC5pbmNsdWRlcyhsb2MpID09PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIGNvb3JkID0gY29vcmQuZmlsdGVyKCAodmFsKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbCAhPT0gbG9jXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGhlYWx0aEJhciA9IGhlYWx0aEJhciAtIDE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL21hcmsgcG9zaXRpb24gaW4gZ2FtZWJvYXJkIGFzIGEgaGl0XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidGhpcyBzaGlwIHRvb2sgaGl0OiBcIiArIG51bSlcclxuICAgICAgICAgICAgLy9yZXR1cm4gXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpc1N1bms6ICgpPT57XHJcbiAgICAgICAgICAgIC8vY2hlY2sgdGhlIHNoaXAgaWYgc3Vua2VuIHlldFxyXG4gICAgICAgICAgICBpZihoZWFsdGhCYXIgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NoaXAgaXMgZGVzdHJveWVkJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIFxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzaGlwIGlzIHN0aWxsIGludGFjdCcpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgXHJcbiAgICAgICAgaGVhbHRoQmFyIDogKCk9PiB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJ0aGlzIHNoaXAgaGVhbHRoOiBcIiArIGhlYWx0aEJhcik7XHJcbiAgICAgICAgICAgIHJldHVybiBoZWFsdGhCYXJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxvY2F0aW9uOiAoKT0+e1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGNvb3JkKVxyXG4gICAgICAgICAgICByZXR1cm4gY29vcmRcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGNvbnN0IGJpZ1NoaXAgPSBzaGlwcyhcIjNBIDRBIDVBIDZBIDdBXCIpO1xyXG4vLyBjb25zdCBtaWRTaGlwMiA9IHNoaXBzKFwiMTJBIDEyQiAxMkNcIik7XHJcbi8vIGNvbnN0IHNtYWxsU2hpcCA9IHNoaXBzKFwiNEJcIik7XHJcblxyXG4vLyBiaWdTaGlwLmxvY2F0aW9uKCk7XHJcbi8vIGJpZ1NoaXAuaGVhbHRoQmFyKCk7XHJcbi8vIGJpZ1NoaXAuaGl0KFwiM0FcIik7XHJcbi8vIGJpZ1NoaXAubG9jYXRpb24oKTtcclxuLy8gYmlnU2hpcC5oZWFsdGhCYXIoKTtcclxuLy8gYmlnU2hpcC5oaXQoXCI4QVwiKTtcclxuLy8gYmlnU2hpcC5sb2NhdGlvbigpO1xyXG4vLyBiaWdTaGlwLmhlYWx0aEJhcigpO1xyXG4vLyBiaWdTaGlwLmhpdChcIjRBXCIpO1xyXG4vLyBiaWdTaGlwLmhpdChcIjVBXCIpO1xyXG4vLyBiaWdTaGlwLmhpdChcIjZBXCIpO1xyXG4vLyBiaWdTaGlwLmxvY2F0aW9uKCk7XHJcbi8vIGJpZ1NoaXAuaGVhbHRoQmFyKCk7XHJcbi8vIGJpZ1NoaXAuaXNTdW5rKCk7XHJcbi8vIGJpZ1NoaXAuaGl0KFwiN0FcIik7XHJcbi8vIGJpZ1NoaXAubG9jYXRpb24oKTtcclxuLy8gYmlnU2hpcC5oZWFsdGhCYXIoKTtcclxuLy8gYmlnU2hpcC5pc1N1bmsoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNoaXBzIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgZ2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZC5qc1wiXHJcbmltcG9ydCBzaGlwcyBmcm9tIFwiLi9zaGlwcy5qc1wiO1xyXG5pbXBvcnQgcGxhY2VSYW5kb21pemVyIGZyb20gXCIuL3BsYWNlUmFuZG9taXplci5qc1wiO1xyXG5pbXBvcnQgZmluZENvbW1vbkVsZW1lbnRzIGZyb20gXCIuL2ZpbmRDb21tb25FbGVtZW50cy5qc1wiO1xyXG5pbXBvcnQgcGxhY2VHYXAgZnJvbSBcIi4vcGxhY2VHYXAuanNcIjtcclxuaW1wb3J0IGNyZWF0ZUdyaWQgZnJvbSBcIi4vbGF5b3V0R3JpZC5qc1wiO1xyXG5pbXBvcnQgbGF5b3V0R3JpZFBsYWNlZENvbG9yIGZyb20gXCIuL2xheW91dEdyaWRQbGFjZWRDb2xvci5qc1wiO1xyXG5pbXBvcnQgY2xlYXJDaGlsZCBmcm9tIFwiLi9jbGVhckNoaWxkLmpzXCI7XHJcblxyXG5jcmVhdGVHcmlkKCdBSScpO1xyXG5jcmVhdGVHcmlkKCdwbGF5ZXInKTtcclxuY29uc3QgcGxheWVyR2FtZWJvYXJkID0gZ2FtZWJvYXJkKCk7XHJcbmNvbnN0IEFJR2FtZWJvYXJkID0gZ2FtZWJvYXJkKCk7XHJcbmNvbnN0IGdhbWUgPSBzdGFydEdhbWUoKTtcclxuXHJcbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpe1xyXG4gICAgZnVuY3Rpb24gcmFuZG9tUGxhY2VtZW50KGJvYXJkLCB2YWwpeyAvLyB5b3UgY2FuIHVzZSB0aGlzIHJhbmRvbVBsYWNlbWVudCB3aXRoIEFJIG9yIFBsYXllclxyXG4gICAgICAgIGxldCBuZXdTaGlwQ29vcmQgPSBwbGFjZVJhbmRvbWl6ZXIodmFsKTtcclxuICAgICAgICBsZXQgbmV3U2hpcFdpdGhHYXAgPSBwbGFjZUdhcChuZXdTaGlwQ29vcmQpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiByZVJhbmRvbWl6ZVdpdGhHYXAoKXtcclxuICAgICAgICAgICAgbmV3U2hpcENvb3JkID0gcGxhY2VSYW5kb21pemVyKHZhbCk7XHJcbiAgICAgICAgICAgIG5ld1NoaXBXaXRoR2FwID0gcGxhY2VHYXAobmV3U2hpcENvb3JkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrQW5kQWRkRWxlbWVudHMobmV3ZXN0LCBjdXJyZW50LCB2YWwpe1xyXG4gICAgICAgICAgICBpZiAoZmluZENvbW1vbkVsZW1lbnRzKG5ld2VzdCwgY3VycmVudCkgPT09IGZhbHNlKXsgLy8gaWYgdGhlcmUgSVMgTk9UIGNvbW1vbiBlbGVtZW50cyBpbnNpZGUgb2YgYm90aCBhcnJheSAobm90IGNsYXNoZWQpLCBwcm9jZWVkIHRvIGFkZCB0byBnYW1lYm9hcmRcclxuICAgICAgICAgICAgICAgIGJvYXJkLnBsYWNlbWVudChzaGlwcyhuZXdTaGlwQ29vcmQpKTtcclxuICAgICAgICAgICAgICAgIGJvYXJkLmFkZEdhcExvY2F0aW9uKHBsYWNlR2FwKG5ld1NoaXBDb29yZCkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7IC8vIGlmIHRoZXJlIElTIGNvbW1vbiBlbGVtZW50IGluc2lkZSBib3RoIGFycmF5LCByYW5kb21pemUgdGhlIHNoaXAgcGxhY2VtZW50IGFnYWluLCB0aGVuIHJlcGVhdCB0aGlzIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgICAgICByZVJhbmRvbWl6ZVdpdGhHYXAoKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrQW5kQWRkRWxlbWVudHMobmV3U2hpcENvb3JkLCBib2FyZC5hbGxHYXBMb2NhdGlvbiwgdmFsKTsgLy8gcmVwZWF0IHRoaXMgZnVuY3Rpb24gYWdhaW5cclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHN0YXJ0cyBoZXJlXHJcbiAgICAgICAgY2hlY2tBbmRBZGRFbGVtZW50cyhuZXdTaGlwV2l0aEdhcCwgYm9hcmQuYWxsR2FwTG9jYXRpb24sIHZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmFuZG9tQXR0YWNrKGJvYXJkLCB1c2VyKXtcclxuICAgICAgICBsZXQgbmV3QXR0YWNrQ29vcmQgPSBwbGFjZVJhbmRvbWl6ZXIoMSk7IC8vIG9ubHkgb25lIGdyaWQgcGVyIGF0dGFjayBhbGxvd2VkXHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gcmVOZXdBdHRhY2soKXtcclxuICAgICAgICAgICAgbmV3QXR0YWNrQ29vcmQgPSBwbGFjZVJhbmRvbWl6ZXIoMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjaGVja1JlcGVhdGVkQXR0YWNrKG5ld2VzdCwgY3VycmVudCwgdXNlcil7XHJcbiAgICAgICAgICAgIGlmICghY3VycmVudCl7XHJcbiAgICAgICAgICAgICAgICBib2FyZC5yZWNlaXZlQXR0YWNrKG5ld0F0dGFja0Nvb3JkLCB1c2VyKTtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGZpbmRDb21tb25FbGVtZW50cyhuZXdlc3QsIGN1cnJlbnQpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICBib2FyZC5yZWNlaXZlQXR0YWNrKG5ld0F0dGFja0Nvb3JkLCB1c2VyKTtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVOZXdBdHRhY2soKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrUmVwZWF0ZWRBdHRhY2sobmV3QXR0YWNrQ29vcmQsIGJvYXJkLmFsbFJlY2VpdmVkQXR0YWNrTG9jYXRpb24sIHVzZXIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2hlY2tSZXBlYXRlZEF0dGFjayhuZXdBdHRhY2tDb29yZCwgYm9hcmQuYWxsUmVjZWl2ZWRBdHRhY2tMb2NhdGlvbiwgdXNlcik7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzZXRTaGlwUmFuZG9tKGJvYXJkKXtcclxuICAgICAgICAvLyBwbGFjZSB0aGUgYm9hcmQgeW91IHVzZSBhbmQgdGhlIGxlbmd0aCBvZiBzaGlwLCB0aGVuIHJhbmRvbVBsYWNlbWVudCgpIHdpbGwgcGxhY2UgaXQgcmFuZG9tbHkgaW5jbHVkaW5nIGdhcCBiZXR3ZWVuIHNoaXBzXHJcbiAgICAgICAgcmFuZG9tUGxhY2VtZW50KGJvYXJkLDUpOyBcclxuICAgICAgICByYW5kb21QbGFjZW1lbnQoYm9hcmQsNCk7XHJcbiAgICAgICAgcmFuZG9tUGxhY2VtZW50KGJvYXJkLDMpO1xyXG4gICAgICAgIHJhbmRvbVBsYWNlbWVudChib2FyZCwzKTtcclxuICAgICAgICByYW5kb21QbGFjZW1lbnQoYm9hcmQsMik7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiByZXNldEdhbWVib2FyZCgpe1xyXG4gICAgICAgIEFJR2FtZWJvYXJkLmRlbGV0ZUFsbFNoaXAoKTtcclxuICAgICAgICBwbGF5ZXJHYW1lYm9hcmQuZGVsZXRlQWxsU2hpcCgpO1xyXG4gICAgICAgIGNsZWFyQ2hpbGQoJ0FJR2FtZWJvYXJkJyk7XHJcbiAgICAgICAgY2xlYXJDaGlsZCgncGxheWVyR2FtZWJvYXJkJyk7XHJcbiAgICAgICAgY3JlYXRlR3JpZCgnQUknKTtcclxuICAgICAgICBjcmVhdGVHcmlkKCdwbGF5ZXInKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGF0dGFja01vZGUodXNlcil7XHJcbiAgICAgICAgY29uc3QgZ2FtZWxheW91dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3VzZXJ9R2FtZWJvYXJkYCk7IC8vIHN0aWxsIGJyb2tlIGV2ZXJ5IGF0dGFjayBtb2RlIGlzIGluaXRpYXRlZCBvdmVyMiBhZ2FpbiBzbywgNHggc3RhcnQgZ2FtZSA9IDR4IGF0dGFja21vZGUoKVxyXG4gICAgICAgIGNvbnN0IGFsbEdyaWQgPSBnYW1lbGF5b3V0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2RpdicpO1xyXG4gICAgICAgIGFsbEdyaWQuZm9yRWFjaCgoZ3JpZCk9PntcclxuICAgICAgICAgICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgICAgICAgICAgICBpZihncmlkLmNsYXNzTGlzdC5jb250YWlucygnYXR0YWNrZWQnKSB8fCBncmlkLmNsYXNzTGlzdC5jb250YWlucygnaGl0Jykpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXsvLyBjb25zb2xlLmxvZyggZ3JpZC5jbGFzc05hbWUgKyAnIGF0dGFja2VkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoQUlHYW1lYm9hcmQuYWxsTG9jYXRpb24oKS5sZW5ndGggPCAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFJR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soZ3JpZC5jbGFzc05hbWUsICdBSScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBBSUdhbWVib2FyZC5jaGVja1RvdGFsSGVhbHRoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbUF0dGFjayhwbGF5ZXJHYW1lYm9hcmQsICdwbGF5ZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGF0dGFja01vZGUoJ0FJJyk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzdGFydFZzQUk6ICgpPT57XHJcbiAgICAgICAgICAgIHJlc2V0R2FtZWJvYXJkKCk7XHJcbiAgICAgICAgICAgIGF0dGFja01vZGUoJ0FJJyk7XHJcbiAgICAgICAgICAgIHNldFNoaXBSYW5kb20oQUlHYW1lYm9hcmQpO1xyXG4gICAgICAgICAgICBzZXRTaGlwUmFuZG9tKHBsYXllckdhbWVib2FyZCk7XHJcbiAgICAgICAgICAgIGxheW91dEdyaWRQbGFjZWRDb2xvcihwbGF5ZXJHYW1lYm9hcmQsICdwbGF5ZXInKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlc3RhcnRHYW1lOiAoKT0+IHtcclxuICAgICAgICAgICAgcmVzZXRHYW1lYm9hcmQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0YXJ0R2FtZUJ0bigpe1xyXG4gICAgY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnRHYW1lQnRuJyk7XHJcbiAgICBjb25zdCByZXN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3RhcnRCdG4nKTtcclxuXHJcbiAgICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1BsYXkgdGhlIGdhbWUhJyk7XHJcbiAgICAgICAgZ2FtZS5zdGFydFZzQUkoKTtcclxuICAgIH0pO1xyXG4gICAgcmVzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3Jlc3RhcnRlZCcpO1xyXG4gICAgICAgIGdhbWUucmVzdGFydEdhbWUoKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5zdGFydEdhbWVCdG4oKVxyXG5cclxuY29uc29sZS5sb2coJ0dhbWUgUmVhZHknKTtcclxuZXhwb3J0IHtwbGF5ZXJHYW1lYm9hcmQsIEFJR2FtZWJvYXJkfSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==