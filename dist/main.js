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
                else{
                    if(AIGameboard.allLocation().length < 1){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDBEQUFVO0FBQ2xCLFFBQVEsMERBQVU7QUFDbEIsUUFBUSwwREFBVTtBQUNsQixRQUFRLDBEQUFVO0FBQ2xCO0FBQ0E7QUFDQSxzREFBc0QsS0FBSyxhQUFhO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVkscUVBQXFCO0FBQ2pDLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY2xlYXJDaGlsZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZpbmRDb21tb25FbGVtZW50cy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2xheW91dEdyaWQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9sYXlvdXRHcmlkUGxhY2VkQ29sb3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tYXJrZWRBdHRhY2tNb3ZlLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxhY2VHYXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGFjZVJhbmRvbWl6ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tYWluZ2FtZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBjbGVhckNoaWxkKHBhcmVudCkge1xyXG4gICAgY29uc3QgbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtwYXJlbnR9YClcclxuICAgIHdoaWxlIChsYXllci5maXJzdENoaWxkKSB7XHJcbiAgICAgIGxheWVyLnJlbW92ZUNoaWxkKGxheWVyLmZpcnN0Q2hpbGQpO1xyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICBleHBvcnQgZGVmYXVsdCBjbGVhckNoaWxkOyIsImZ1bmN0aW9uIGZpbmRDb21tb25FbGVtZW50cyhhcnIxLCBhcnIyKSB7XHJcbiAgICByZXR1cm4gYXJyMS5zb21lKGl0ZW0gPT4gYXJyMi5pbmNsdWRlcyhpdGVtKSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZmluZENvbW1vbkVsZW1lbnRzIiwiaW1wb3J0IHsgbWFya2VkQXR0YWNrLCBtYXJrZWRIaXQgfSBmcm9tIFwiLi9tYXJrZWRBdHRhY2tNb3ZlLmpzXCI7XHJcblxyXG5jb25zdCBnYW1lYm9hcmQgPSAoKT0+IHtcclxuICAgIGxldCBhbGxTaGlwID0gW107XHJcbiAgICBsZXQgdG90YWxIZWFsdGggPSAwO1xyXG4gICAgbGV0IGFsbExvY2F0aW9uID0gW107XHJcbiAgICBsZXQgYXR0YWNrTWlzc2VkID0gW107XHJcbiAgICBsZXQgYWxsR2FwTG9jYXRpb24gPSBbXTtcclxuICAgIGxldCBhbGxSZWNlaXZlZEF0dGFja0xvY2F0aW9uID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gcmVmcmVzaEFsbExvY2F0aW9uKCl7XHJcbiAgICAgICAgbGV0IG5ld0xvY2F0aW9uID0gW107XHJcbiAgICAgICAgYWxsU2hpcC5mb3JFYWNoKChzaGlwKT0+e1xyXG4gICAgICAgICAgICBuZXdMb2NhdGlvbiA9IG5ld0xvY2F0aW9uLmNvbmNhdChzaGlwLmxvY2F0aW9uKCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFsbExvY2F0aW9uID0gbmV3TG9jYXRpb247XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBhdHRhY2tNaXNzZWRDb3VudGVyKGNvb3Ipe1xyXG4gICAgICAgIGF0dGFja01pc3NlZC5wdXNoKGNvb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vY29uc29sZS5sb2coJ2dhbWVib2FyZCBpcyBvbicpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwbGFjZW1lbnQ6IChzaGlwcyk9PnsgLy8gZG9udCBuZWVkIGNvb3Igc2luY2UgY29vcmRpbmF0ZSBzaG91bGQgYmUgaW5zaWRlIHRoZSBzaGlwKClcclxuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHRoZSBjb29yZGluYXRlIGlzIHZhbGlkLCB3aGljaCBtZWFucyBlbXB0eSBhbmQgb25lIGJsb2NrIGF3YXkgZnJvbSBhbm90aGVyIHNoaXBcclxuICAgICAgICAgICAgLy8gcGxhY2UgdGhlIHNoaXBzIG9uIHRoZSBjb29yZGluYXRlICAgICBcclxuICAgICAgICAgICAgYWxsU2hpcC5wdXNoKHNoaXBzKTtcclxuICAgICAgICAgICAgYWxsTG9jYXRpb24gPSBhbGxMb2NhdGlvbi5jb25jYXQoc2hpcHMubG9jYXRpb24oKSk7XHJcbiAgICAgICAgICAgIC8vIG1hcmtzIHRoZSBjb29yZGluYXRlIHdpdGggc2hpcHMnIG1hcmtzXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVjZWl2ZUF0dGFjazogKGNvb3IsIHVzZXIpPT57XHJcbiAgICAgICAgICAgIGNvbnN0IGNvb3JkID0gY29vci50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBhbGxSZWNlaXZlZEF0dGFja0xvY2F0aW9uLnB1c2goY29vcmQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoYWxsTG9jYXRpb24uaW5jbHVkZXMoY29vcmQpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQXR0YWNrIG1pc3NlZCB0bzonICsgdXNlcilcclxuICAgICAgICAgICAgICAgIGF0dGFja01pc3NlZENvdW50ZXIoY29vcmQpO1xyXG4gICAgICAgICAgICAgICAgbWFya2VkQXR0YWNrKHVzZXIsIGNvb3JkKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQXR0YWNrIEhpdCEgdG86ICcgKyB1c2VyKVxyXG4gICAgICAgICAgICAgICAgYWxsU2hpcC5mb3JFYWNoKChzaGlwKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHNoaXAuaGl0KGNvb3JkKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gcmVmcmVzaCB0aGUgYWxsTG9jYXRpb24gQXJyYXkgc28geW91IGNhbm5vdCBoaXQgdHdpY2Ugb24gdGhlIHNhbWUgY29vcmRpbmF0ZVxyXG4gICAgICAgICAgICAgICAgcmVmcmVzaEFsbExvY2F0aW9uKClcclxuICAgICAgICAgICAgICAgIGlmIChhbGxMb2NhdGlvbi5sZW5ndGggPCAxKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQUxMIFNISVBTIEhBUyBCRUVOIERFU1RST1lFRCwgUklQIFRPOiAnICsgdXNlcilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmtlZEhpdCh1c2VyLCBjb29yZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhhbGxMb2NhdGlvbik7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhbGxSZWNlaXZlZEF0dGFja0xvY2F0aW9uLFxyXG4gICAgICAgIGNoZWNrVG90YWxIZWFsdGg6ICgpPT57XHJcbiAgICAgICAgICAgIHJlZnJlc2hBbGxMb2NhdGlvbigpO1xyXG4gICAgICAgICAgICB0b3RhbEhlYWx0aCA9IGFsbExvY2F0aW9uLmxlbmd0aDtcclxuICAgICAgICAgICAgLy8gaWYgYWxsIHRoZSBoZWFsdGhiYXIgaXMgMCB0aGVuIHRoZSBnYW1lIGlzIGVuZGVkXHJcbiAgICAgICAgICAgIGlmKHRvdGFsSGVhbHRoIDw9IDApe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHQU1FIE9WRVIgQUxMIE9GIFlPVVIgU0hJUFMgV1JFQ0tFRFwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhbGxMb2NhdGlvbjogKCk9PntcclxuICAgICAgICAgICAgcmVmcmVzaEFsbExvY2F0aW9uKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBhbGxMb2NhdGlvblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2hlY2tBbGxMb2NhdGlvbjooKT0+e1xyXG4gICAgICAgICAgICByZWZyZXNoQWxsTG9jYXRpb24oKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYWxsTG9jYXRpb24pO1xyXG4gICAgICAgICAgICByZXR1cm4gYWxsTG9jYXRpb25cclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlbGV0ZUFsbFNoaXA6ICgpPT4ge1xyXG4gICAgICAgICAgICBhbGxTaGlwLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIHRvdGFsSGVhbHRoID0gMDtcclxuICAgICAgICAgICAgYWxsTG9jYXRpb24ubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgYXR0YWNrTWlzc2VkLmxlbmd0aD0wO1xyXG4gICAgICAgICAgICBhbGxHYXBMb2NhdGlvbi5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICBhbGxSZWNlaXZlZEF0dGFja0xvY2F0aW9uLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIHJlZnJlc2hBbGxMb2NhdGlvbigpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWRkR2FwTG9jYXRpb246IChhcnJheSk9PiB7XHJcbiAgICAgICAgICAgIC8vIGdhcExvY2F0aW9uLnB1c2goYXJyYXkpO1xyXG4gICAgICAgICAgICBhcnJheS5mb3JFYWNoKChhcnIpPT57XHJcbiAgICAgICAgICAgICAgICBhbGxHYXBMb2NhdGlvbi5wdXNoKGFycik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIFxyXG4gICAgICAgIGNoZWNrR2FwTG9jYXRpb246ICgpPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhbGxHYXBMb2NhdGlvbik7XHJcbiAgICAgICAgICAgIHJldHVybiBhbGxHYXBMb2NhdGlvblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2hlY2tBdHRhY2tNaXNzZWQ6ICgpPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGF0dGFja01pc3NlZCk7XHJcbiAgICAgICAgICAgIHJldHVybiBhdHRhY2tNaXNzZWRcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFsbEdhcExvY2F0aW9uXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgZ2FtZWJvYXJkOyIsIlxyXG5mdW5jdGlvbiBjcmVhdGVHcmlkKHdob3Mpe1xyXG4gICAgY29uc3QgbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt3aG9zfUdhbWVib2FyZGApO1xyXG4gICAgY29uc3QgTUFYX1dJRFRIID0gMTA7XHJcbiAgICBjb25zdCBhbHBoYWJldCA9ICdhYmNkZWZnaGlqJztcclxuICAgIGNvbnN0IGFscGhBcnJheSA9IGFscGhhYmV0LnNwbGl0KCcnKTtcclxuXHJcbiAgICBhbHBoQXJyYXkuZm9yRWFjaCgoYWxwKT0+e1xyXG4gICAgICAgIGZvciAobGV0IGk9MTsgaSA8PSBNQVhfV0lEVEg7IGkrKyApe1xyXG4gICAgICAgICAgICBjb25zdCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGdyaWQuY2xhc3NOYW1lPWAke2FscH0ke2l9YDtcclxuICAgICAgICAgICAgbGF5ZXIuYXBwZW5kKGdyaWQpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUdyaWQiLCJmdW5jdGlvbiBsYXlvdXRHcmlkUGxhY2VkQ29sb3IoZ2FtZWJvYXJkLCB1c2VyKXtcclxuICAgIGxldCBjdXJyZW50R2FwID0gZ2FtZWJvYXJkLmFsbEdhcExvY2F0aW9uO1xyXG4gICAgbGV0IGN1cnJlbnRTaGlwID0gZ2FtZWJvYXJkLmFsbExvY2F0aW9uKCk7XHJcbiAgICBpZiAoY3VycmVudEdhcC5sZW5ndGggPT09IDApe1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXQgYXJyYXkgZ2FwbG9jYXRpb24gZW1wdHknKVxyXG4gICAgICAgIGNvbnN0IGxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7dXNlcn1HYW1lYm9hcmRgKTtcclxuICAgICAgICBjb25zdCBnYXAgPSBsYXllci5xdWVyeVNlbGVjdG9yQWxsKCdkaXYnKTtcclxuICAgICAgICAgICAgZ2FwLmZvckVhY2goKGcpPT57XHJcbiAgICAgICAgICAgICAgICBnLmNsYXNzTGlzdC5yZW1vdmUoJ2dhcCcpO1xyXG4gICAgICAgICAgICAgICAgZy5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY3VycmVudEdhcC5mb3JFYWNoKChhcnJheUxvYyk9PntcclxuICAgICAgICAgICAgY29uc3QgbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt1c2VyfUdhbWVib2FyZGApO1xyXG4gICAgICAgICAgICBsZXQgZ2FwID0gbGF5ZXIucXVlcnlTZWxlY3RvcihgLiR7YXJyYXlMb2N9YCk7XHJcbiAgICAgICAgICAgIGdhcC5jbGFzc0xpc3QuYWRkKCdnYXAnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjdXJyZW50U2hpcC5mb3JFYWNoKChjdXJzaGlwKT0+e1xyXG4gICAgICAgICAgICBjb25zdCBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3VzZXJ9R2FtZWJvYXJkYCk7XHJcbiAgICAgICAgICAgIGxldCBzaGlwID0gbGF5ZXIucXVlcnlTZWxlY3RvcihgLiR7Y3Vyc2hpcH1gKTtcclxuICAgICAgICAgICAgc2hpcC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxheW91dEdyaWRQbGFjZWRDb2xvciIsImZ1bmN0aW9uIG1hcmtlZEF0dGFjayh1c2VyLCBjbGFzc05hbWUpe1xyXG4gICAgICAgIGNvbnN0IGdhbWVsYXlvdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt1c2VyfUdhbWVib2FyZGApO1xyXG4gICAgICAgIGNvbnN0IGdyaWQgPSBnYW1lbGF5b3V0LnF1ZXJ5U2VsZWN0b3IoYC4ke2NsYXNzTmFtZX1gKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhncmlkKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhjbGFzc05hbWUpO1xyXG4gICAgICAgIGdyaWQuY2xhc3NMaXN0LmFkZCgnYXR0YWNrZWQnKTtcclxuICAgICAgICByZXR1cm5cclxufVxyXG5mdW5jdGlvbiBtYXJrZWRIaXQodXNlciwgY2xhc3NOYW1lKXtcclxuICAgICAgICBjb25zdCBnYW1lbGF5b3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7dXNlcn1HYW1lYm9hcmRgKTtcclxuICAgICAgICBjb25zdCBncmlkID0gZ2FtZWxheW91dC5xdWVyeVNlbGVjdG9yKGAuJHtjbGFzc05hbWV9YCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coY2xhc3NOYW1lKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhncmlkKTtcclxuICAgICAgICBncmlkLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xyXG4gICAgICAgIHJldHVyblxyXG59XHJcblxyXG5mdW5jdGlvbiByZXNldE1hcmtlZEF0dGFjayh1c2VyKXtcclxuICAgICAgICBjb25zdCBnYW1lbGF5b3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7dXNlcn1HYW1lYm9hcmRgKTtcclxuICAgICAgICBjb25zdCBhbGxHcmlkID0gZ2FtZWxheW91dC5xdWVyeVNlbGVjdG9yQWxsKGBkaXZgKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhjbGFzc05hbWUpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGdyaWQpO1xyXG4gICAgICAgIGFsbEdyaWQuZm9yRWFjaCgoZ3JpZCk9PntcclxuICAgICAgICAgICAgICAgIGdyaWQuY2xhc3NMaXN0LnJlbW92ZSgnaGl0Jyk7XHJcbiAgICAgICAgICAgICAgICBncmlkLmNsYXNzTGlzdC5yZW1vdmUoJ2F0dGFja2VkJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuXHJcbn1cclxuZXhwb3J0IHttYXJrZWRBdHRhY2ssIG1hcmtlZEhpdCwgcmVzZXRNYXJrZWRBdHRhY2t9IiwiLy8gc2V0IGdhcCBieSBvbmUgYnkgb25lIGxvb3AgY2hlY2tcclxuXHJcbmZ1bmN0aW9uIHBsYWNlR2FwKG1haW5BcnJheSl7XHJcbiAgICBsZXQgb3V0cHV0QXJyYXkgPSBbXTtcclxuICAgIGxldCByZXN1bHRBcnJheSA9IFtdO1xyXG4gICAgY29uc3QgbnVtYmVyUGF0dCA9IC9bMC05XS9nO1xyXG4gICAgY29uc3QgYWxwaGFQYXR0ID0gL1thLXpBLVpdL2c7XHJcbiAgICBjb25zdCBhbHBoYWJldE1heCA9ICdhYmNkZWZnaGlqJztcclxuICAgIGNvbnN0IGFscEFycmF5ID0gYWxwaGFiZXRNYXguc3BsaXQoJycpO1xyXG4gICAgbWFpbkFycmF5LmZvckVhY2goKHZhbCk9PntcclxuICAgICAgICBjb25zdCBudW1iID0gcGFyc2VJbnQodmFsLm1hdGNoKG51bWJlclBhdHQpLmpvaW4oJycpKTtcclxuICAgICAgICBjb25zdCBhbHBoID0gdmFsLm1hdGNoKGFscGhhUGF0dCkuam9pbignJyk7XHJcbiAgICAgICAgY29uc3QgbnVtYk1pbnVzT25lID0gbnVtYiAtIDE7XHJcbiAgICAgICAgY29uc3QgbnVtYlBsdXNPbmUgPSBudW1iICsgMTtcclxuICAgICAgICBjb25zdCBhbHBoUGx1c09uZSA9IGFscEFycmF5WyhhbHBBcnJheS5pbmRleE9mKGFscGgpKSsxXTtcclxuICAgICAgICBjb25zdCBhbHBoTWludXNPbmUgPSBhbHBBcnJheVsoYWxwQXJyYXkuaW5kZXhPZihhbHBoKSktMV07XHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gbWVyZ2VBcnJheSgpe1xyXG4gICAgICAgICAgICAgIC8vIG1lcmdlIHRoZSBhcnJheVxyXG4gICAgICAgICAgICByZXN1bHRBcnJheSA9IHJlc3VsdEFycmF5LmNvbmNhdChvdXRwdXRBcnJheSk7XHJcbiAgICAgICAgICAgIHJlc3VsdEFycmF5ID0gWy4uLm5ldyBTZXQgKFsuLi5tYWluQXJyYXksLi4ub3V0cHV0QXJyYXldKV07ICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tSaWdodCgpe1xyXG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKGFscGguY29uY2F0KChudW1iUGx1c09uZSkudG9TdHJpbmcoKSkpOyAvLyByaWdodFxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBjaGVja0xlZnQoKXtcclxuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaChhbHBoLmNvbmNhdCgobnVtYk1pbnVzT25lKS50b1N0cmluZygpKSk7IC8vIGxlZnRcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tVcCgpe1xyXG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKGFscGhNaW51c09uZS5jb25jYXQoKG51bWIpLnRvU3RyaW5nKCkpKTsgLy8gdXBcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tEb3duKCl7XHJcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaFBsdXNPbmUuY29uY2F0KChudW1iKS50b1N0cmluZygpKSk7IC8vIGRvd25cclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tEaWFnVXBSaWdodCgpe1xyXG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKGFscGhNaW51c09uZS5jb25jYXQoKG51bWJQbHVzT25lKS50b1N0cmluZygpKSk7IC8vIHVwIHJpZ2h0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrRGlhZ0Rvd25SaWdodCgpe1xyXG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKGFscGhQbHVzT25lLmNvbmNhdCgobnVtYlBsdXNPbmUpLnRvU3RyaW5nKCkpKTsgLy8gZG93biByaWdodFxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBjaGVja0RpYWdVcExlZnQoKXtcclxuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaChhbHBoTWludXNPbmUuY29uY2F0KChudW1iTWludXNPbmUpLnRvU3RyaW5nKCkpKTsgLy8gdXAgbGVmdFxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBjaGVja0RpYWdEb3duTGVmdCgpe1xyXG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKGFscGhQbHVzT25lLmNvbmNhdCgobnVtYk1pbnVzT25lKS50b1N0cmluZygpKSk7IC8vIGRvd24gbGVmdFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYWxwaE1pbnVzT25lID09IHVuZGVmaW5lZCAmJiBudW1iTWludXNPbmUgPCAxKXsgLy8gY29ybmVyIHVwIGxlZnRcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdHMgY29ybmVyIHVwIGxlZnQnKTtcclxuICAgICAgICAgICAgY2hlY2tSaWdodCgpO1xyXG4gICAgICAgICAgICBjaGVja0Rvd24oKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnRG93blJpZ2h0KCk7XHJcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFscGhQbHVzT25lID09IHVuZGVmaW5lZCAmJiBudW1iTWludXNPbmUgPCAxKXsgLy8gY29ybmVyIGJvdHRvbSBsZWZ0XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXRzIGNvcm5lciBib3R0b20gbGVmdCcpO1xyXG4gICAgICAgICAgICBjaGVja1JpZ2h0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrVXAoKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnVXBSaWdodCgpO1xyXG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhbHBoTWludXNPbmUgPT0gdW5kZWZpbmVkICYmIG51bWJQbHVzT25lID4gMTApeyAvLyBjb3JuZXIgdXAgcmlnaHQgXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXRzIGNvcm5lciB1cCByaWdodCcpO1xyXG4gICAgICAgICAgICBjaGVja0xlZnQoKTtcclxuICAgICAgICAgICAgY2hlY2tEb3duKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25MZWZ0KCk7XHJcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFscGhQbHVzT25lID09IHVuZGVmaW5lZCAmJiBudW1iUGx1c09uZSA+IDEwKXsgLy8gY29ybmVyIGJvdHRvbSByaWdodFxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0cyBjb3JuZXIgYm90dG9tIHJpZ2h0Jyk7XHJcbiAgICAgICAgICAgIGNoZWNrTGVmdCgpO1xyXG4gICAgICAgICAgICBjaGVja1VwKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ1VwTGVmdCgpO1xyXG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChudW1iTWludXNPbmUgPCAxKXtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdCBudW1iZXIgPSAwJyk7XHJcbiAgICAgICAgICAgIGNoZWNrUmlnaHQoKTtcclxuICAgICAgICAgICAgY2hlY2tVcCgpO1xyXG4gICAgICAgICAgICBjaGVja0Rvd24oKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnVXBSaWdodCgpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdEb3duUmlnaHQoKTtcclxuICAgICAgICAgICAgbWVyZ2VBcnJheSgpO1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihudW1iUGx1c09uZSA+IDEwKXtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdCBudW1iZXIgPiAxMCcpO1xyXG4gICAgICAgICAgICBjaGVja0xlZnQoKTtcclxuICAgICAgICAgICAgY2hlY2tVcCgpO1xyXG4gICAgICAgICAgICBjaGVja0Rvd24oKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnVXBMZWZ0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25MZWZ0KCk7XHJcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFscGhNaW51c09uZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0cyB1bmRlZmluZWQnKTtcclxuICAgICAgICAgICAgY2hlY2tMZWZ0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrUmlnaHQoKTtcclxuICAgICAgICAgICAgY2hlY2tEb3duKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25MZWZ0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25SaWdodCgpOyBcclxuICAgICAgICAgICAgbWVyZ2VBcnJheSgpO1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYWxwaFBsdXNPbmUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdHMgdW5kZWZpbmVkJyk7XHJcbiAgICAgICAgICAgIGNoZWNrTGVmdCgpO1xyXG4gICAgICAgICAgICBjaGVja1JpZ2h0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrVXAoKTsgXHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ1VwTGVmdCgpOyBcclxuICAgICAgICAgICAgY2hlY2tEaWFnVXBSaWdodCgpO1xyXG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgLy8gaG9yaXpvbnRhbCBjaGVja1xyXG4gICAgICAgICAgICAgICAgY2hlY2tMZWZ0KCk7XHJcbiAgICAgICAgICAgICAgICBjaGVja1JpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICAvLyB2ZXJ0aWNhbCBjaGVja1xyXG4gICAgICAgICAgICAgICAgY2hlY2tVcCgpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tEb3duKCk7XHJcbiAgICAgICAgICAgICAgICAvL2RpYWdvbmFsIGxlZnQgY2hlY2tcclxuICAgICAgICAgICAgICAgIGNoZWNrRGlhZ1VwTGVmdCgpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tEaWFnRG93bkxlZnQoKTtcclxuICAgICAgICAgICAgICAgIC8vZGlhZ29uYWwgcmlnaHQgY2hlY2tcclxuICAgICAgICAgICAgICAgIGNoZWNrRGlhZ1VwUmlnaHQoKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25SaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgbWVyZ2VBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBcclxuXHJcbiAgICB9KTtcclxuICAgIC8vIGNvbnNvbGUubG9nKG91dHB1dEFycmF5KTtcclxuICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdEFycmF5KTtcclxuICAgIHJldHVybiByZXN1bHRBcnJheVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwbGFjZUdhcCIsImZ1bmN0aW9uIHBsYWNlUmFuZG9taXplcihsZW5nKXtcclxuICAgIGNvbnN0IE1BWF9HUklEID0gMTA7IC8vIG1heGltdW0gZ3JpZCBsZW5ndGggaXMgMTB4MTBcclxuICAgIGNvbnN0IHJhbmRvbUF4aXMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTsgLy8gb25seSByZXR1cm4gMC8xXHJcbiAgICBjb25zdCBhcnJheSA9IFtdO1xyXG4gICAgY29uc3QgYWxwaGFiZXQgPSBcImFiY2RlZmdoaWpcIjtcclxuICAgIGNvbnN0IHJhbmRvbU51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChNQVhfR1JJRCAtIGxlbmcpKSArIDE7IC8vIHRoaXMgcmFuZG9taXplciBudW1iZXIga2VlcCB5b3UgZnJvbSBvdmVyZmxvd2luZywgcGx1cyBvbmUgc28gaXQgc3RhcnQgZnJvbSAxIG5vdCAwXHJcbiAgICBjb25zdCByYW5kb21BbHAgPSBhbHBoYWJldFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhbHBoYWJldC5zdWJzdHJpbmcoMCwoTUFYX0dSSUQgLSBsZW5nKSkubGVuZ3RoKV07IC8vIHRoaXMgcmFuZG9taXplciBrZWVwcyB5b3UgZnJvbSB2YWx1ZSBtb3JlIHRoYW4gbGVuZ3RoXHJcbiAgICBsZXQgYWxwaGFOdW07XHJcblxyXG4gICAgaWYgKHJhbmRvbUF4aXMgPT09IDApeyAvLyBYIGF4aXMgYmxvY2tzXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPGxlbmc7IGkrKyApe1xyXG4gICAgICAgICAgICBhbHBoYU51bSA9IHJhbmRvbUFscC5jb25jYXQoKHJhbmRvbU51bWJlciArIGkpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICBhcnJheS5wdXNoKGFscGhhTnVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYXJyYXkpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJhbmRvbUF4aXMpO1xyXG4gICAgICAgIHJldHVybiBhcnJheVxyXG4gICAgfVxyXG4gICAgZWxzZSB7IC8vIFkgYXhpcyBibG9ja3NcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8bGVuZzsgaSsrICl7XHJcbiAgICAgICAgICAgIGNvbnN0IGFscExvb3AgPSBhbHBoYWJldC5jaGFyQXQoYWxwaGFiZXQuaW5kZXhPZihyYW5kb21BbHApICsgaSk7XHJcbiAgICAgICAgICAgIGFscGhhTnVtID0gYWxwTG9vcC5jb25jYXQoKHJhbmRvbU51bWJlcikudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIGFycmF5LnB1c2goYWxwaGFOdW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhhcnJheSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmFuZG9tQXhpcyk7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgcGxhY2VSYW5kb21pemVyIiwiXHJcbmNvbnN0IHNoaXBzID0gKGNvb3JkKSA9PnsgLy8gbGVuZ3RoIHdpbGwgYmUgZnJvbSBzaXplIG9mIHRoZSBzaGlwXHJcbiAgICAvLyBsZXQgY29vcmQgPSBsb2Muc3BsaXQoJywnKTtcclxuICAgIGxldCBoZWFsdGhCYXIgPSBjb29yZC5sZW5ndGg7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGxlbmd0aDogKCk9PntcclxuICAgICAgICAgICAgcmV0dXJuIGxlbiBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhpdDogKGxvYyk9PntcclxuICAgICAgICAgICAgLy9nZXQgdGhlIGF0dGNrIGhpdCBsb2NhdGlvblxyXG4gICAgICAgICAgICBpZiAoY29vcmQuaW5jbHVkZXMobG9jKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImF0dGFjayBtaXNzZWRcIilcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoY29vcmQuaW5jbHVkZXMobG9jKSA9PT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICBjb29yZCA9IGNvb3JkLmZpbHRlciggKHZhbCk9PntcclxuICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWwgIT09IGxvY1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBoZWFsdGhCYXIgPSBoZWFsdGhCYXIgLSAxO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzU3VuazogKCk9PntcclxuICAgICAgICAgICAgLy9jaGVjayB0aGUgc2hpcCBpZiBzdW5rZW4geWV0XHJcbiAgICAgICAgICAgIGlmKGhlYWx0aEJhciA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2hpcCBpcyBkZXN0cm95ZWQnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAgXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NoaXAgaXMgc3RpbGwgaW50YWN0Jyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBcclxuICAgICAgICBoZWFsdGhCYXIgOiAoKT0+IHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInRoaXMgc2hpcCBoZWFsdGg6IFwiICsgaGVhbHRoQmFyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGhlYWx0aEJhclxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbG9jYXRpb246ICgpPT57XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coY29vcmQpXHJcbiAgICAgICAgICAgIHJldHVybiBjb29yZFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgc2hpcHMiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBnYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCJcclxuaW1wb3J0IHNoaXBzIGZyb20gXCIuL3NoaXBzLmpzXCI7XHJcbmltcG9ydCBwbGFjZVJhbmRvbWl6ZXIgZnJvbSBcIi4vcGxhY2VSYW5kb21pemVyLmpzXCI7XHJcbmltcG9ydCBmaW5kQ29tbW9uRWxlbWVudHMgZnJvbSBcIi4vZmluZENvbW1vbkVsZW1lbnRzLmpzXCI7XHJcbmltcG9ydCBwbGFjZUdhcCBmcm9tIFwiLi9wbGFjZUdhcC5qc1wiO1xyXG5pbXBvcnQgY3JlYXRlR3JpZCBmcm9tIFwiLi9sYXlvdXRHcmlkLmpzXCI7XHJcbmltcG9ydCBsYXlvdXRHcmlkUGxhY2VkQ29sb3IgZnJvbSBcIi4vbGF5b3V0R3JpZFBsYWNlZENvbG9yLmpzXCI7XHJcbmltcG9ydCBjbGVhckNoaWxkIGZyb20gXCIuL2NsZWFyQ2hpbGQuanNcIjtcclxuXHJcbmNyZWF0ZUdyaWQoJ0FJJyk7XHJcbmNyZWF0ZUdyaWQoJ3BsYXllcicpO1xyXG5jb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuY29uc3QgQUlHYW1lYm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuY29uc3QgZ2FtZSA9IHN0YXJ0R2FtZSgpO1xyXG5cclxuZnVuY3Rpb24gc3RhcnRHYW1lKCl7XHJcbiAgICBmdW5jdGlvbiByYW5kb21QbGFjZW1lbnQoYm9hcmQsIHZhbCl7IC8vIHlvdSBjYW4gdXNlIHRoaXMgcmFuZG9tUGxhY2VtZW50IHdpdGggQUkgb3IgUGxheWVyXHJcbiAgICAgICAgbGV0IG5ld1NoaXBDb29yZCA9IHBsYWNlUmFuZG9taXplcih2YWwpO1xyXG4gICAgICAgIGxldCBuZXdTaGlwV2l0aEdhcCA9IHBsYWNlR2FwKG5ld1NoaXBDb29yZCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlUmFuZG9taXplV2l0aEdhcCgpe1xyXG4gICAgICAgICAgICBuZXdTaGlwQ29vcmQgPSBwbGFjZVJhbmRvbWl6ZXIodmFsKTtcclxuICAgICAgICAgICAgbmV3U2hpcFdpdGhHYXAgPSBwbGFjZUdhcChuZXdTaGlwQ29vcmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tBbmRBZGRFbGVtZW50cyhuZXdlc3QsIGN1cnJlbnQsIHZhbCl7XHJcbiAgICAgICAgICAgIGlmIChmaW5kQ29tbW9uRWxlbWVudHMobmV3ZXN0LCBjdXJyZW50KSA9PT0gZmFsc2UpeyAvLyBpZiB0aGVyZSBJUyBOT1QgY29tbW9uIGVsZW1lbnRzIGluc2lkZSBvZiBib3RoIGFycmF5IChub3QgY2xhc2hlZCksIHByb2NlZWQgdG8gYWRkIHRvIGdhbWVib2FyZFxyXG4gICAgICAgICAgICAgICAgYm9hcmQucGxhY2VtZW50KHNoaXBzKG5ld1NoaXBDb29yZCkpO1xyXG4gICAgICAgICAgICAgICAgYm9hcmQuYWRkR2FwTG9jYXRpb24ocGxhY2VHYXAobmV3U2hpcENvb3JkKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHsgLy8gaWYgdGhlcmUgSVMgY29tbW9uIGVsZW1lbnQgaW5zaWRlIGJvdGggYXJyYXksIHJhbmRvbWl6ZSB0aGUgc2hpcCBwbGFjZW1lbnQgYWdhaW4sIHRoZW4gcmVwZWF0IHRoaXMgZnVuY3Rpb25cclxuICAgICAgICAgICAgICAgIHJlUmFuZG9taXplV2l0aEdhcCgpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tBbmRBZGRFbGVtZW50cyhuZXdTaGlwQ29vcmQsIGJvYXJkLmFsbEdhcExvY2F0aW9uLCB2YWwpOyAvLyByZXBlYXQgdGhpcyBmdW5jdGlvbiBhZ2FpblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc3RhcnRzIGhlcmVcclxuICAgICAgICBjaGVja0FuZEFkZEVsZW1lbnRzKG5ld1NoaXBXaXRoR2FwLCBib2FyZC5hbGxHYXBMb2NhdGlvbiwgdmFsKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByYW5kb21BdHRhY2soYm9hcmQsIHVzZXIpe1xyXG4gICAgICAgIGxldCBuZXdBdHRhY2tDb29yZCA9IHBsYWNlUmFuZG9taXplcigxKTsgLy8gb25seSBvbmUgZ3JpZCBwZXIgYXR0YWNrIGFsbG93ZWRcclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiByZU5ld0F0dGFjaygpe1xyXG4gICAgICAgICAgICBuZXdBdHRhY2tDb29yZCA9IHBsYWNlUmFuZG9taXplcigxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrUmVwZWF0ZWRBdHRhY2sobmV3ZXN0LCBjdXJyZW50LCB1c2VyKXtcclxuICAgICAgICAgICAgaWYgKCFjdXJyZW50KXtcclxuICAgICAgICAgICAgICAgIGJvYXJkLnJlY2VpdmVBdHRhY2sobmV3QXR0YWNrQ29vcmQsIHVzZXIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZmluZENvbW1vbkVsZW1lbnRzKG5ld2VzdCwgY3VycmVudCkgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgIGJvYXJkLnJlY2VpdmVBdHRhY2sobmV3QXR0YWNrQ29vcmQsIHVzZXIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZU5ld0F0dGFjaygpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tSZXBlYXRlZEF0dGFjayhuZXdBdHRhY2tDb29yZCwgYm9hcmQuYWxsUmVjZWl2ZWRBdHRhY2tMb2NhdGlvbiwgdXNlcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjaGVja1JlcGVhdGVkQXR0YWNrKG5ld0F0dGFja0Nvb3JkLCBib2FyZC5hbGxSZWNlaXZlZEF0dGFja0xvY2F0aW9uLCB1c2VyKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHNldFNoaXBSYW5kb20oYm9hcmQpe1xyXG4gICAgICAgIC8vIHBsYWNlIHRoZSBib2FyZCB5b3UgdXNlIGFuZCB0aGUgbGVuZ3RoIG9mIHNoaXAsIHRoZW4gcmFuZG9tUGxhY2VtZW50KCkgd2lsbCBwbGFjZSBpdCByYW5kb21seSBpbmNsdWRpbmcgZ2FwIGJldHdlZW4gc2hpcHNcclxuICAgICAgICByYW5kb21QbGFjZW1lbnQoYm9hcmQsNSk7IFxyXG4gICAgICAgIHJhbmRvbVBsYWNlbWVudChib2FyZCw0KTtcclxuICAgICAgICByYW5kb21QbGFjZW1lbnQoYm9hcmQsMyk7XHJcbiAgICAgICAgcmFuZG9tUGxhY2VtZW50KGJvYXJkLDMpO1xyXG4gICAgICAgIHJhbmRvbVBsYWNlbWVudChib2FyZCwyKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHJlc2V0R2FtZWJvYXJkKCl7XHJcbiAgICAgICAgQUlHYW1lYm9hcmQuZGVsZXRlQWxsU2hpcCgpO1xyXG4gICAgICAgIHBsYXllckdhbWVib2FyZC5kZWxldGVBbGxTaGlwKCk7XHJcbiAgICAgICAgY2xlYXJDaGlsZCgnQUlHYW1lYm9hcmQnKTtcclxuICAgICAgICBjbGVhckNoaWxkKCdwbGF5ZXJHYW1lYm9hcmQnKTtcclxuICAgICAgICBjcmVhdGVHcmlkKCdBSScpO1xyXG4gICAgICAgIGNyZWF0ZUdyaWQoJ3BsYXllcicpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gYXR0YWNrTW9kZSh1c2VyKXtcclxuICAgICAgICBjb25zdCBnYW1lbGF5b3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7dXNlcn1HYW1lYm9hcmRgKTsgLy8gc3RpbGwgYnJva2UgZXZlcnkgYXR0YWNrIG1vZGUgaXMgaW5pdGlhdGVkIG92ZXIyIGFnYWluIHNvLCA0eCBzdGFydCBnYW1lID0gNHggYXR0YWNrbW9kZSgpXHJcbiAgICAgICAgY29uc3QgYWxsR3JpZCA9IGdhbWVsYXlvdXQucXVlcnlTZWxlY3RvckFsbCgnZGl2Jyk7XHJcbiAgICAgICAgYWxsR3JpZC5mb3JFYWNoKChncmlkKT0+e1xyXG4gICAgICAgICAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcclxuICAgICAgICAgICAgICAgIGlmKGdyaWQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhdHRhY2tlZCcpIHx8IGdyaWQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaXQnKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKEFJR2FtZWJvYXJkLmFsbExvY2F0aW9uKCkubGVuZ3RoIDwgMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAvLyBHQU1FIEVORFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBBSUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGdyaWQuY2xhc3NOYW1lLCAnQUknKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQUlHYW1lYm9hcmQuY2hlY2tUb3RhbEhlYWx0aCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5kb21BdHRhY2socGxheWVyR2FtZWJvYXJkLCAncGxheWVyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBhdHRhY2tNb2RlKCdBSScpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc3RhcnRWc0FJOiAoKT0+e1xyXG4gICAgICAgICAgICByZXNldEdhbWVib2FyZCgpO1xyXG4gICAgICAgICAgICBhdHRhY2tNb2RlKCdBSScpO1xyXG4gICAgICAgICAgICBzZXRTaGlwUmFuZG9tKEFJR2FtZWJvYXJkKTtcclxuICAgICAgICAgICAgc2V0U2hpcFJhbmRvbShwbGF5ZXJHYW1lYm9hcmQpO1xyXG4gICAgICAgICAgICBsYXlvdXRHcmlkUGxhY2VkQ29sb3IocGxheWVyR2FtZWJvYXJkLCAncGxheWVyJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXN0YXJ0R2FtZTogKCk9PiB7XHJcbiAgICAgICAgICAgIHJlc2V0R2FtZWJvYXJkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzdGFydEdhbWVCdG4oKXtcclxuICAgIGNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXJ0R2FtZUJ0bicpO1xyXG4gICAgY29uc3QgcmVzdGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXN0YXJ0QnRuJyk7XHJcblxyXG4gICAgc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdQbGF5IHRoZSBnYW1lIScpO1xyXG4gICAgICAgIGdhbWUuc3RhcnRWc0FJKCk7XHJcbiAgICB9KTtcclxuICAgIHJlc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdyZXN0YXJ0ZWQnKTtcclxuICAgICAgICBnYW1lLnJlc3RhcnRHYW1lKCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuc3RhcnRHYW1lQnRuKClcclxuXHJcbmNvbnNvbGUubG9nKCdHYW1lIFJlYWR5Jyk7XHJcbmV4cG9ydCB7cGxheWVyR2FtZWJvYXJkLCBBSUdhbWVib2FyZH0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=