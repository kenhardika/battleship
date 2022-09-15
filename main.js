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

/***/ "./src/popUpGameEnd.js":
/*!*****************************!*\
  !*** ./src/popUpGameEnd.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function popUpGameEnd(){
    const layer = document.querySelector('.gameboard');
    const layerPopUp = document.createElement('div');
    const layerText = document.createElement('div');
    const layerBtn = document.createElement('div');
    const text = document.createElement('p');
    const btn = document.createElement('button');
    text.textContent = 'Congrats For The Win'
    btn.textContent = 'OK';
    text.id ='textPopUp';
    btn.id = 'btnPopUp';
    layerText.className='layerTextPopUp';
    layerBtn.className='layerBtnPopUp';
    layerPopUp.className='layerPopUp';
    layerPopUp.classList.add('deactive');
    
    layerText.append(text);
    layerBtn.append(btn);
    layerPopUp.append(layerText, layerBtn);
    layer.append(layerPopUp);

    btn.onclick = ()=>{
        layerPopUp.classList.remove('active');
        layerPopUp.classList.add('deactive');
    }
    return {
        active: ()=> {
            layerPopUp.classList.remove('deactive');
            layerPopUp.classList.add('active');
            // layerPopUp.style.opacity='1';
        },
        deactive: ()=> {
            // layerPopUp.style.opacity='0';
            layerPopUp.classList.remove('active');
            layerPopUp.classList.add('deactive');
        }
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (popUpGameEnd);

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
/* harmony import */ var _popUpGameEnd_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./popUpGameEnd.js */ "./src/popUpGameEnd.js");










(0,_layoutGrid_js__WEBPACK_IMPORTED_MODULE_5__["default"])('AI');
(0,_layoutGrid_js__WEBPACK_IMPORTED_MODULE_5__["default"])('player');
const playerGameboard = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
const AIGameboard = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
const game = startGame();
const gameEnd = (0,_popUpGameEnd_js__WEBPACK_IMPORTED_MODULE_8__["default"])();

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
                    if(AIGameboard.allLocation().length < 1 || playerGameboard.allLocation().length < 1){
                        gameEnd.active();
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
    const randomPlaceBtn = document.querySelector('#randomPlaceBtn');

    startBtn.addEventListener('click', ()=>{
        console.log('Play the game!');
        game.startVsAI();
    });
    restartBtn.addEventListener('click', ()=>{
        console.log('restarted');
        game.restartGame();
    });
    randomPlaceBtn.addEventListener('click', ()=>{
        console.log('randomize');
        // popUpGameEnd().active();
    });
}

startGameBtn()

console.log('Game Ready');

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNyQyxxQ0FBcUMsd0RBQVE7QUFDN0M7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBLDhFQUE4RTtBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLCtEQUFlLEtBQUs7QUFDakQ7QUFDQTtBQUNBLDZCQUE2QiwrREFBZTtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixrRUFBa0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDBEQUFVO0FBQ2xCLFFBQVEsMERBQVU7QUFDbEIsUUFBUSwwREFBVTtBQUNsQixRQUFRLDBEQUFVO0FBQ2xCO0FBQ0E7QUFDQSxzREFBc0QsS0FBSyxhQUFhO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxxRUFBcUI7QUFDakMsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jbGVhckNoaWxkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmluZENvbW1vbkVsZW1lbnRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbGF5b3V0R3JpZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2xheW91dEdyaWRQbGFjZWRDb2xvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21hcmtlZEF0dGFja01vdmUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGFjZUdhcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYWNlUmFuZG9taXplci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BvcFVwR2FtZUVuZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21haW5nYW1lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGNsZWFyQ2hpbGQocGFyZW50KSB7XHJcbiAgICBjb25zdCBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3BhcmVudH1gKVxyXG4gICAgd2hpbGUgKGxheWVyLmZpcnN0Q2hpbGQpIHtcclxuICAgICAgbGF5ZXIucmVtb3ZlQ2hpbGQobGF5ZXIuZmlyc3RDaGlsZCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsZWFyQ2hpbGQ7IiwiZnVuY3Rpb24gZmluZENvbW1vbkVsZW1lbnRzKGFycjEsIGFycjIpIHtcclxuICAgIHJldHVybiBhcnIxLnNvbWUoaXRlbSA9PiBhcnIyLmluY2x1ZGVzKGl0ZW0pKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmaW5kQ29tbW9uRWxlbWVudHMiLCJpbXBvcnQgeyBtYXJrZWRBdHRhY2ssIG1hcmtlZEhpdCB9IGZyb20gXCIuL21hcmtlZEF0dGFja01vdmUuanNcIjtcclxuXHJcbmNvbnN0IGdhbWVib2FyZCA9ICgpPT4ge1xyXG4gICAgbGV0IGFsbFNoaXAgPSBbXTtcclxuICAgIGxldCB0b3RhbEhlYWx0aCA9IDA7XHJcbiAgICBsZXQgYWxsTG9jYXRpb24gPSBbXTtcclxuICAgIGxldCBhdHRhY2tNaXNzZWQgPSBbXTtcclxuICAgIGxldCBhbGxHYXBMb2NhdGlvbiA9IFtdO1xyXG4gICAgbGV0IGFsbFJlY2VpdmVkQXR0YWNrTG9jYXRpb24gPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiByZWZyZXNoQWxsTG9jYXRpb24oKXtcclxuICAgICAgICBsZXQgbmV3TG9jYXRpb24gPSBbXTtcclxuICAgICAgICBhbGxTaGlwLmZvckVhY2goKHNoaXApPT57XHJcbiAgICAgICAgICAgIG5ld0xvY2F0aW9uID0gbmV3TG9jYXRpb24uY29uY2F0KHNoaXAubG9jYXRpb24oKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYWxsTG9jYXRpb24gPSBuZXdMb2NhdGlvbjtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGF0dGFja01pc3NlZENvdW50ZXIoY29vcil7XHJcbiAgICAgICAgYXR0YWNrTWlzc2VkLnB1c2goY29vcik7XHJcbiAgICB9XHJcblxyXG4gICAgLy9jb25zb2xlLmxvZygnZ2FtZWJvYXJkIGlzIG9uJyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHBsYWNlbWVudDogKHNoaXBzKT0+eyAvLyBkb250IG5lZWQgY29vciBzaW5jZSBjb29yZGluYXRlIHNob3VsZCBiZSBpbnNpZGUgdGhlIHNoaXAoKVxyXG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgdGhlIGNvb3JkaW5hdGUgaXMgdmFsaWQsIHdoaWNoIG1lYW5zIGVtcHR5IGFuZCBvbmUgYmxvY2sgYXdheSBmcm9tIGFub3RoZXIgc2hpcFxyXG4gICAgICAgICAgICAvLyBwbGFjZSB0aGUgc2hpcHMgb24gdGhlIGNvb3JkaW5hdGUgICAgIFxyXG4gICAgICAgICAgICBhbGxTaGlwLnB1c2goc2hpcHMpO1xyXG4gICAgICAgICAgICBhbGxMb2NhdGlvbiA9IGFsbExvY2F0aW9uLmNvbmNhdChzaGlwcy5sb2NhdGlvbigpKTtcclxuICAgICAgICAgICAgLy8gbWFya3MgdGhlIGNvb3JkaW5hdGUgd2l0aCBzaGlwcycgbWFya3NcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZWNlaXZlQXR0YWNrOiAoY29vciwgdXNlcik9PntcclxuICAgICAgICAgICAgY29uc3QgY29vcmQgPSBjb29yLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIGFsbFJlY2VpdmVkQXR0YWNrTG9jYXRpb24ucHVzaChjb29yZCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihhbGxMb2NhdGlvbi5pbmNsdWRlcyhjb29yZCkgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBdHRhY2sgbWlzc2VkIHRvOicgKyB1c2VyKVxyXG4gICAgICAgICAgICAgICAgYXR0YWNrTWlzc2VkQ291bnRlcihjb29yZCk7XHJcbiAgICAgICAgICAgICAgICBtYXJrZWRBdHRhY2sodXNlciwgY29vcmQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBdHRhY2sgSGl0ISB0bzogJyArIHVzZXIpXHJcbiAgICAgICAgICAgICAgICBhbGxTaGlwLmZvckVhY2goKHNoaXApPT57XHJcbiAgICAgICAgICAgICAgICAgICAgc2hpcC5oaXQoY29vcmQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyByZWZyZXNoIHRoZSBhbGxMb2NhdGlvbiBBcnJheSBzbyB5b3UgY2Fubm90IGhpdCB0d2ljZSBvbiB0aGUgc2FtZSBjb29yZGluYXRlXHJcbiAgICAgICAgICAgICAgICByZWZyZXNoQWxsTG9jYXRpb24oKVxyXG4gICAgICAgICAgICAgICAgaWYgKGFsbExvY2F0aW9uLmxlbmd0aCA8IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBTEwgU0hJUFMgSEFTIEJFRU4gREVTVFJPWUVELCBSSVAgVE86ICcgKyB1c2VyKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFya2VkSGl0KHVzZXIsIGNvb3JkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGFsbExvY2F0aW9uKTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFsbFJlY2VpdmVkQXR0YWNrTG9jYXRpb24sXHJcbiAgICAgICAgY2hlY2tUb3RhbEhlYWx0aDogKCk9PntcclxuICAgICAgICAgICAgcmVmcmVzaEFsbExvY2F0aW9uKCk7XHJcbiAgICAgICAgICAgIHRvdGFsSGVhbHRoID0gYWxsTG9jYXRpb24ubGVuZ3RoO1xyXG4gICAgICAgICAgICAvLyBpZiBhbGwgdGhlIGhlYWx0aGJhciBpcyAwIHRoZW4gdGhlIGdhbWUgaXMgZW5kZWRcclxuICAgICAgICAgICAgaWYodG90YWxIZWFsdGggPD0gMCl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdBTUUgT1ZFUiBBTEwgT0YgWU9VUiBTSElQUyBXUkVDS0VEXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFsbExvY2F0aW9uOiAoKT0+e1xyXG4gICAgICAgICAgICByZWZyZXNoQWxsTG9jYXRpb24oKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFsbExvY2F0aW9uXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaGVja0FsbExvY2F0aW9uOigpPT57XHJcbiAgICAgICAgICAgIHJlZnJlc2hBbGxMb2NhdGlvbigpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhbGxMb2NhdGlvbik7XHJcbiAgICAgICAgICAgIHJldHVybiBhbGxMb2NhdGlvblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVsZXRlQWxsU2hpcDogKCk9PiB7XHJcbiAgICAgICAgICAgIGFsbFNoaXAubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgdG90YWxIZWFsdGggPSAwO1xyXG4gICAgICAgICAgICBhbGxMb2NhdGlvbi5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICBhdHRhY2tNaXNzZWQubGVuZ3RoPTA7XHJcbiAgICAgICAgICAgIGFsbEdhcExvY2F0aW9uLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIGFsbFJlY2VpdmVkQXR0YWNrTG9jYXRpb24ubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgcmVmcmVzaEFsbExvY2F0aW9uKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhZGRHYXBMb2NhdGlvbjogKGFycmF5KT0+IHtcclxuICAgICAgICAgICAgLy8gZ2FwTG9jYXRpb24ucHVzaChhcnJheSk7XHJcbiAgICAgICAgICAgIGFycmF5LmZvckVhY2goKGFycik9PntcclxuICAgICAgICAgICAgICAgIGFsbEdhcExvY2F0aW9uLnB1c2goYXJyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgXHJcbiAgICAgICAgY2hlY2tHYXBMb2NhdGlvbjogKCk9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFsbEdhcExvY2F0aW9uKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFsbEdhcExvY2F0aW9uXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaGVja0F0dGFja01pc3NlZDogKCk9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYXR0YWNrTWlzc2VkKTtcclxuICAgICAgICAgICAgcmV0dXJuIGF0dGFja01pc3NlZFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWxsR2FwTG9jYXRpb25cclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBnYW1lYm9hcmQ7IiwiXHJcbmZ1bmN0aW9uIGNyZWF0ZUdyaWQod2hvcyl7XHJcbiAgICBjb25zdCBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3dob3N9R2FtZWJvYXJkYCk7XHJcbiAgICBjb25zdCBNQVhfV0lEVEggPSAxMDtcclxuICAgIGNvbnN0IGFscGhhYmV0ID0gJ2FiY2RlZmdoaWonO1xyXG4gICAgY29uc3QgYWxwaEFycmF5ID0gYWxwaGFiZXQuc3BsaXQoJycpO1xyXG5cclxuICAgIGFscGhBcnJheS5mb3JFYWNoKChhbHApPT57XHJcbiAgICAgICAgZm9yIChsZXQgaT0xOyBpIDw9IE1BWF9XSURUSDsgaSsrICl7XHJcbiAgICAgICAgICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgZ3JpZC5jbGFzc05hbWU9YCR7YWxwfSR7aX1gO1xyXG4gICAgICAgICAgICBsYXllci5hcHBlbmQoZ3JpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlR3JpZCIsImZ1bmN0aW9uIGxheW91dEdyaWRQbGFjZWRDb2xvcihnYW1lYm9hcmQsIHVzZXIpe1xyXG4gICAgbGV0IGN1cnJlbnRHYXAgPSBnYW1lYm9hcmQuYWxsR2FwTG9jYXRpb247XHJcbiAgICBsZXQgY3VycmVudFNoaXAgPSBnYW1lYm9hcmQuYWxsTG9jYXRpb24oKTtcclxuICAgIGlmIChjdXJyZW50R2FwLmxlbmd0aCA9PT0gMCl7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdCBhcnJheSBnYXBsb2NhdGlvbiBlbXB0eScpXHJcbiAgICAgICAgY29uc3QgbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt1c2VyfUdhbWVib2FyZGApO1xyXG4gICAgICAgIGNvbnN0IGdhcCA9IGxheWVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2RpdicpO1xyXG4gICAgICAgICAgICBnYXAuZm9yRWFjaCgoZyk9PntcclxuICAgICAgICAgICAgICAgIGcuY2xhc3NMaXN0LnJlbW92ZSgnZ2FwJyk7XHJcbiAgICAgICAgICAgICAgICBnLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjdXJyZW50R2FwLmZvckVhY2goKGFycmF5TG9jKT0+e1xyXG4gICAgICAgICAgICBjb25zdCBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3VzZXJ9R2FtZWJvYXJkYCk7XHJcbiAgICAgICAgICAgIGxldCBnYXAgPSBsYXllci5xdWVyeVNlbGVjdG9yKGAuJHthcnJheUxvY31gKTtcclxuICAgICAgICAgICAgZ2FwLmNsYXNzTGlzdC5hZGQoJ2dhcCcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGN1cnJlbnRTaGlwLmZvckVhY2goKGN1cnNoaXApPT57XHJcbiAgICAgICAgICAgIGNvbnN0IGxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7dXNlcn1HYW1lYm9hcmRgKTtcclxuICAgICAgICAgICAgbGV0IHNoaXAgPSBsYXllci5xdWVyeVNlbGVjdG9yKGAuJHtjdXJzaGlwfWApO1xyXG4gICAgICAgICAgICBzaGlwLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbGF5b3V0R3JpZFBsYWNlZENvbG9yIiwiZnVuY3Rpb24gbWFya2VkQXR0YWNrKHVzZXIsIGNsYXNzTmFtZSl7XHJcbiAgICAgICAgY29uc3QgZ2FtZWxheW91dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3VzZXJ9R2FtZWJvYXJkYCk7XHJcbiAgICAgICAgY29uc3QgZ3JpZCA9IGdhbWVsYXlvdXQucXVlcnlTZWxlY3RvcihgLiR7Y2xhc3NOYW1lfWApO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGdyaWQpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgZ3JpZC5jbGFzc0xpc3QuYWRkKCdhdHRhY2tlZCcpO1xyXG4gICAgICAgIHJldHVyblxyXG59XHJcbmZ1bmN0aW9uIG1hcmtlZEhpdCh1c2VyLCBjbGFzc05hbWUpe1xyXG4gICAgICAgIGNvbnN0IGdhbWVsYXlvdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt1c2VyfUdhbWVib2FyZGApO1xyXG4gICAgICAgIGNvbnN0IGdyaWQgPSBnYW1lbGF5b3V0LnF1ZXJ5U2VsZWN0b3IoYC4ke2NsYXNzTmFtZX1gKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhjbGFzc05hbWUpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGdyaWQpO1xyXG4gICAgICAgIGdyaWQuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XHJcbiAgICAgICAgcmV0dXJuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlc2V0TWFya2VkQXR0YWNrKHVzZXIpe1xyXG4gICAgICAgIGNvbnN0IGdhbWVsYXlvdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt1c2VyfUdhbWVib2FyZGApO1xyXG4gICAgICAgIGNvbnN0IGFsbEdyaWQgPSBnYW1lbGF5b3V0LnF1ZXJ5U2VsZWN0b3JBbGwoYGRpdmApO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coZ3JpZCk7XHJcbiAgICAgICAgYWxsR3JpZC5mb3JFYWNoKChncmlkKT0+e1xyXG4gICAgICAgICAgICAgICAgZ3JpZC5jbGFzc0xpc3QucmVtb3ZlKCdoaXQnKTtcclxuICAgICAgICAgICAgICAgIGdyaWQuY2xhc3NMaXN0LnJlbW92ZSgnYXR0YWNrZWQnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm5cclxufVxyXG5leHBvcnQge21hcmtlZEF0dGFjaywgbWFya2VkSGl0LCByZXNldE1hcmtlZEF0dGFja30iLCIvLyBzZXQgZ2FwIGJ5IG9uZSBieSBvbmUgbG9vcCBjaGVja1xyXG5cclxuZnVuY3Rpb24gcGxhY2VHYXAobWFpbkFycmF5KXtcclxuICAgIGxldCBvdXRwdXRBcnJheSA9IFtdO1xyXG4gICAgbGV0IHJlc3VsdEFycmF5ID0gW107XHJcbiAgICBjb25zdCBudW1iZXJQYXR0ID0gL1swLTldL2c7XHJcbiAgICBjb25zdCBhbHBoYVBhdHQgPSAvW2EtekEtWl0vZztcclxuICAgIGNvbnN0IGFscGhhYmV0TWF4ID0gJ2FiY2RlZmdoaWonO1xyXG4gICAgY29uc3QgYWxwQXJyYXkgPSBhbHBoYWJldE1heC5zcGxpdCgnJyk7XHJcbiAgICBtYWluQXJyYXkuZm9yRWFjaCgodmFsKT0+e1xyXG4gICAgICAgIGNvbnN0IG51bWIgPSBwYXJzZUludCh2YWwubWF0Y2gobnVtYmVyUGF0dCkuam9pbignJykpO1xyXG4gICAgICAgIGNvbnN0IGFscGggPSB2YWwubWF0Y2goYWxwaGFQYXR0KS5qb2luKCcnKTtcclxuICAgICAgICBjb25zdCBudW1iTWludXNPbmUgPSBudW1iIC0gMTtcclxuICAgICAgICBjb25zdCBudW1iUGx1c09uZSA9IG51bWIgKyAxO1xyXG4gICAgICAgIGNvbnN0IGFscGhQbHVzT25lID0gYWxwQXJyYXlbKGFscEFycmF5LmluZGV4T2YoYWxwaCkpKzFdO1xyXG4gICAgICAgIGNvbnN0IGFscGhNaW51c09uZSA9IGFscEFycmF5WyhhbHBBcnJheS5pbmRleE9mKGFscGgpKS0xXTtcclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBtZXJnZUFycmF5KCl7XHJcbiAgICAgICAgICAgICAgLy8gbWVyZ2UgdGhlIGFycmF5XHJcbiAgICAgICAgICAgIHJlc3VsdEFycmF5ID0gcmVzdWx0QXJyYXkuY29uY2F0KG91dHB1dEFycmF5KTtcclxuICAgICAgICAgICAgcmVzdWx0QXJyYXkgPSBbLi4ubmV3IFNldCAoWy4uLm1haW5BcnJheSwuLi5vdXRwdXRBcnJheV0pXTsgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBjaGVja1JpZ2h0KCl7XHJcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaC5jb25jYXQoKG51bWJQbHVzT25lKS50b1N0cmluZygpKSk7IC8vIHJpZ2h0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrTGVmdCgpe1xyXG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKGFscGguY29uY2F0KChudW1iTWludXNPbmUpLnRvU3RyaW5nKCkpKTsgLy8gbGVmdFxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBjaGVja1VwKCl7XHJcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaE1pbnVzT25lLmNvbmNhdCgobnVtYikudG9TdHJpbmcoKSkpOyAvLyB1cFxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBjaGVja0Rvd24oKXtcclxuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaChhbHBoUGx1c09uZS5jb25jYXQoKG51bWIpLnRvU3RyaW5nKCkpKTsgLy8gZG93blxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBjaGVja0RpYWdVcFJpZ2h0KCl7XHJcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaE1pbnVzT25lLmNvbmNhdCgobnVtYlBsdXNPbmUpLnRvU3RyaW5nKCkpKTsgLy8gdXAgcmlnaHRcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tEaWFnRG93blJpZ2h0KCl7XHJcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaFBsdXNPbmUuY29uY2F0KChudW1iUGx1c09uZSkudG9TdHJpbmcoKSkpOyAvLyBkb3duIHJpZ2h0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrRGlhZ1VwTGVmdCgpe1xyXG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKGFscGhNaW51c09uZS5jb25jYXQoKG51bWJNaW51c09uZSkudG9TdHJpbmcoKSkpOyAvLyB1cCBsZWZ0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrRGlhZ0Rvd25MZWZ0KCl7XHJcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaFBsdXNPbmUuY29uY2F0KChudW1iTWludXNPbmUpLnRvU3RyaW5nKCkpKTsgLy8gZG93biBsZWZ0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhbHBoTWludXNPbmUgPT0gdW5kZWZpbmVkICYmIG51bWJNaW51c09uZSA8IDEpeyAvLyBjb3JuZXIgdXAgbGVmdFxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0cyBjb3JuZXIgdXAgbGVmdCcpO1xyXG4gICAgICAgICAgICBjaGVja1JpZ2h0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrRG93bigpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdEb3duUmlnaHQoKTtcclxuICAgICAgICAgICAgbWVyZ2VBcnJheSgpOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYWxwaFBsdXNPbmUgPT0gdW5kZWZpbmVkICYmIG51bWJNaW51c09uZSA8IDEpeyAvLyBjb3JuZXIgYm90dG9tIGxlZnRcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdHMgY29ybmVyIGJvdHRvbSBsZWZ0Jyk7XHJcbiAgICAgICAgICAgIGNoZWNrUmlnaHQoKTtcclxuICAgICAgICAgICAgY2hlY2tVcCgpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdVcFJpZ2h0KCk7XHJcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFscGhNaW51c09uZSA9PSB1bmRlZmluZWQgJiYgbnVtYlBsdXNPbmUgPiAxMCl7IC8vIGNvcm5lciB1cCByaWdodCBcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdHMgY29ybmVyIHVwIHJpZ2h0Jyk7XHJcbiAgICAgICAgICAgIGNoZWNrTGVmdCgpO1xyXG4gICAgICAgICAgICBjaGVja0Rvd24oKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnRG93bkxlZnQoKTtcclxuICAgICAgICAgICAgbWVyZ2VBcnJheSgpOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYWxwaFBsdXNPbmUgPT0gdW5kZWZpbmVkICYmIG51bWJQbHVzT25lID4gMTApeyAvLyBjb3JuZXIgYm90dG9tIHJpZ2h0XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXRzIGNvcm5lciBib3R0b20gcmlnaHQnKTtcclxuICAgICAgICAgICAgY2hlY2tMZWZ0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrVXAoKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnVXBMZWZ0KCk7XHJcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG51bWJNaW51c09uZSA8IDEpe1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0IG51bWJlciA9IDAnKTtcclxuICAgICAgICAgICAgY2hlY2tSaWdodCgpO1xyXG4gICAgICAgICAgICBjaGVja1VwKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRG93bigpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdVcFJpZ2h0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25SaWdodCgpO1xyXG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKG51bWJQbHVzT25lID4gMTApe1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0IG51bWJlciA+IDEwJyk7XHJcbiAgICAgICAgICAgIGNoZWNrTGVmdCgpO1xyXG4gICAgICAgICAgICBjaGVja1VwKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRG93bigpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdVcExlZnQoKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnRG93bkxlZnQoKTtcclxuICAgICAgICAgICAgbWVyZ2VBcnJheSgpO1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYWxwaE1pbnVzT25lID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXRzIHVuZGVmaW5lZCcpO1xyXG4gICAgICAgICAgICBjaGVja0xlZnQoKTtcclxuICAgICAgICAgICAgY2hlY2tSaWdodCgpO1xyXG4gICAgICAgICAgICBjaGVja0Rvd24oKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnRG93bkxlZnQoKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnRG93blJpZ2h0KCk7IFxyXG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhbHBoUGx1c09uZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0cyB1bmRlZmluZWQnKTtcclxuICAgICAgICAgICAgY2hlY2tMZWZ0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrUmlnaHQoKTtcclxuICAgICAgICAgICAgY2hlY2tVcCgpOyBcclxuICAgICAgICAgICAgY2hlY2tEaWFnVXBMZWZ0KCk7IFxyXG4gICAgICAgICAgICBjaGVja0RpYWdVcFJpZ2h0KCk7XHJcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAvLyBob3Jpem9udGFsIGNoZWNrXHJcbiAgICAgICAgICAgICAgICBjaGVja0xlZnQoKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrUmlnaHQoKTtcclxuICAgICAgICAgICAgICAgIC8vIHZlcnRpY2FsIGNoZWNrXHJcbiAgICAgICAgICAgICAgICBjaGVja1VwKCk7XHJcbiAgICAgICAgICAgICAgICBjaGVja0Rvd24oKTtcclxuICAgICAgICAgICAgICAgIC8vZGlhZ29uYWwgbGVmdCBjaGVja1xyXG4gICAgICAgICAgICAgICAgY2hlY2tEaWFnVXBMZWZ0KCk7XHJcbiAgICAgICAgICAgICAgICBjaGVja0RpYWdEb3duTGVmdCgpO1xyXG4gICAgICAgICAgICAgICAgLy9kaWFnb25hbCByaWdodCBjaGVja1xyXG4gICAgICAgICAgICAgICAgY2hlY2tEaWFnVXBSaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tEaWFnRG93blJpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICBtZXJnZUFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG5cclxuICAgIH0pO1xyXG4gICAgLy8gY29uc29sZS5sb2cob3V0cHV0QXJyYXkpO1xyXG4gICAgLy8gY29uc29sZS5sb2cocmVzdWx0QXJyYXkpO1xyXG4gICAgcmV0dXJuIHJlc3VsdEFycmF5XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBsYWNlR2FwIiwiZnVuY3Rpb24gcGxhY2VSYW5kb21pemVyKGxlbmcpe1xyXG4gICAgY29uc3QgTUFYX0dSSUQgPSAxMDsgLy8gbWF4aW11bSBncmlkIGxlbmd0aCBpcyAxMHgxMFxyXG4gICAgY29uc3QgcmFuZG9tQXhpcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpOyAvLyBvbmx5IHJldHVybiAwLzFcclxuICAgIGNvbnN0IGFycmF5ID0gW107XHJcbiAgICBjb25zdCBhbHBoYWJldCA9IFwiYWJjZGVmZ2hpalwiO1xyXG4gICAgY29uc3QgcmFuZG9tTnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKE1BWF9HUklEIC0gbGVuZykpICsgMTsgLy8gdGhpcyByYW5kb21pemVyIG51bWJlciBrZWVwIHlvdSBmcm9tIG92ZXJmbG93aW5nLCBwbHVzIG9uZSBzbyBpdCBzdGFydCBmcm9tIDEgbm90IDBcclxuICAgIGNvbnN0IHJhbmRvbUFscCA9IGFscGhhYmV0W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFscGhhYmV0LnN1YnN0cmluZygwLChNQVhfR1JJRCAtIGxlbmcpKS5sZW5ndGgpXTsgLy8gdGhpcyByYW5kb21pemVyIGtlZXBzIHlvdSBmcm9tIHZhbHVlIG1vcmUgdGhhbiBsZW5ndGhcclxuICAgIGxldCBhbHBoYU51bTtcclxuXHJcbiAgICBpZiAocmFuZG9tQXhpcyA9PT0gMCl7IC8vIFggYXhpcyBibG9ja3NcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8bGVuZzsgaSsrICl7XHJcbiAgICAgICAgICAgIGFscGhhTnVtID0gcmFuZG9tQWxwLmNvbmNhdCgocmFuZG9tTnVtYmVyICsgaSkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIGFycmF5LnB1c2goYWxwaGFOdW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhhcnJheSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmFuZG9tQXhpcyk7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5XHJcbiAgICB9XHJcbiAgICBlbHNlIHsgLy8gWSBheGlzIGJsb2Nrc1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDxsZW5nOyBpKysgKXtcclxuICAgICAgICAgICAgY29uc3QgYWxwTG9vcCA9IGFscGhhYmV0LmNoYXJBdChhbHBoYWJldC5pbmRleE9mKHJhbmRvbUFscCkgKyBpKTtcclxuICAgICAgICAgICAgYWxwaGFOdW0gPSBhbHBMb29wLmNvbmNhdCgocmFuZG9tTnVtYmVyKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgYXJyYXkucHVzaChhbHBoYU51bSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGFycmF5KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhyYW5kb21BeGlzKTtcclxuICAgICAgICByZXR1cm4gYXJyYXlcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBwbGFjZVJhbmRvbWl6ZXIiLCJcclxuZnVuY3Rpb24gcG9wVXBHYW1lRW5kKCl7XHJcbiAgICBjb25zdCBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmQnKTtcclxuICAgIGNvbnN0IGxheWVyUG9wVXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IGxheWVyVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29uc3QgbGF5ZXJCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRleHQudGV4dENvbnRlbnQgPSAnQ29uZ3JhdHMgRm9yIFRoZSBXaW4nXHJcbiAgICBidG4udGV4dENvbnRlbnQgPSAnT0snO1xyXG4gICAgdGV4dC5pZCA9J3RleHRQb3BVcCc7XHJcbiAgICBidG4uaWQgPSAnYnRuUG9wVXAnO1xyXG4gICAgbGF5ZXJUZXh0LmNsYXNzTmFtZT0nbGF5ZXJUZXh0UG9wVXAnO1xyXG4gICAgbGF5ZXJCdG4uY2xhc3NOYW1lPSdsYXllckJ0blBvcFVwJztcclxuICAgIGxheWVyUG9wVXAuY2xhc3NOYW1lPSdsYXllclBvcFVwJztcclxuICAgIGxheWVyUG9wVXAuY2xhc3NMaXN0LmFkZCgnZGVhY3RpdmUnKTtcclxuICAgIFxyXG4gICAgbGF5ZXJUZXh0LmFwcGVuZCh0ZXh0KTtcclxuICAgIGxheWVyQnRuLmFwcGVuZChidG4pO1xyXG4gICAgbGF5ZXJQb3BVcC5hcHBlbmQobGF5ZXJUZXh0LCBsYXllckJ0bik7XHJcbiAgICBsYXllci5hcHBlbmQobGF5ZXJQb3BVcCk7XHJcblxyXG4gICAgYnRuLm9uY2xpY2sgPSAoKT0+e1xyXG4gICAgICAgIGxheWVyUG9wVXAuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgbGF5ZXJQb3BVcC5jbGFzc0xpc3QuYWRkKCdkZWFjdGl2ZScpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhY3RpdmU6ICgpPT4ge1xyXG4gICAgICAgICAgICBsYXllclBvcFVwLmNsYXNzTGlzdC5yZW1vdmUoJ2RlYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGxheWVyUG9wVXAuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIC8vIGxheWVyUG9wVXAuc3R5bGUub3BhY2l0eT0nMSc7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZWFjdGl2ZTogKCk9PiB7XHJcbiAgICAgICAgICAgIC8vIGxheWVyUG9wVXAuc3R5bGUub3BhY2l0eT0nMCc7XHJcbiAgICAgICAgICAgIGxheWVyUG9wVXAuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGxheWVyUG9wVXAuY2xhc3NMaXN0LmFkZCgnZGVhY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBvcFVwR2FtZUVuZCIsIlxyXG5jb25zdCBzaGlwcyA9IChjb29yZCkgPT57IC8vIGxlbmd0aCB3aWxsIGJlIGZyb20gc2l6ZSBvZiB0aGUgc2hpcFxyXG4gICAgLy8gbGV0IGNvb3JkID0gbG9jLnNwbGl0KCcsJyk7XHJcbiAgICBsZXQgaGVhbHRoQmFyID0gY29vcmQubGVuZ3RoO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBsZW5ndGg6ICgpPT57XHJcbiAgICAgICAgICAgIHJldHVybiBsZW4gXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoaXQ6IChsb2MpPT57XHJcbiAgICAgICAgICAgIC8vZ2V0IHRoZSBhdHRjayBoaXQgbG9jYXRpb25cclxuICAgICAgICAgICAgaWYgKGNvb3JkLmluY2x1ZGVzKGxvYykgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJhdHRhY2sgbWlzc2VkXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGNvb3JkLmluY2x1ZGVzKGxvYykgPT09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgY29vcmQgPSBjb29yZC5maWx0ZXIoICh2YWwpPT57XHJcbiAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsICE9PSBsb2NcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaGVhbHRoQmFyID0gaGVhbHRoQmFyIC0gMTtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpc1N1bms6ICgpPT57XHJcbiAgICAgICAgICAgIC8vY2hlY2sgdGhlIHNoaXAgaWYgc3Vua2VuIHlldFxyXG4gICAgICAgICAgICBpZihoZWFsdGhCYXIgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NoaXAgaXMgZGVzdHJveWVkJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIFxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzaGlwIGlzIHN0aWxsIGludGFjdCcpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgXHJcbiAgICAgICAgaGVhbHRoQmFyIDogKCk9PiB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJ0aGlzIHNoaXAgaGVhbHRoOiBcIiArIGhlYWx0aEJhcik7XHJcbiAgICAgICAgICAgIHJldHVybiBoZWFsdGhCYXJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxvY2F0aW9uOiAoKT0+e1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGNvb3JkKVxyXG4gICAgICAgICAgICByZXR1cm4gY29vcmRcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNoaXBzIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgZ2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZC5qc1wiXHJcbmltcG9ydCBzaGlwcyBmcm9tIFwiLi9zaGlwcy5qc1wiO1xyXG5pbXBvcnQgcGxhY2VSYW5kb21pemVyIGZyb20gXCIuL3BsYWNlUmFuZG9taXplci5qc1wiO1xyXG5pbXBvcnQgZmluZENvbW1vbkVsZW1lbnRzIGZyb20gXCIuL2ZpbmRDb21tb25FbGVtZW50cy5qc1wiO1xyXG5pbXBvcnQgcGxhY2VHYXAgZnJvbSBcIi4vcGxhY2VHYXAuanNcIjtcclxuaW1wb3J0IGNyZWF0ZUdyaWQgZnJvbSBcIi4vbGF5b3V0R3JpZC5qc1wiO1xyXG5pbXBvcnQgbGF5b3V0R3JpZFBsYWNlZENvbG9yIGZyb20gXCIuL2xheW91dEdyaWRQbGFjZWRDb2xvci5qc1wiO1xyXG5pbXBvcnQgY2xlYXJDaGlsZCBmcm9tIFwiLi9jbGVhckNoaWxkLmpzXCI7XHJcbmltcG9ydCBwb3BVcEdhbWVFbmQgZnJvbSBcIi4vcG9wVXBHYW1lRW5kLmpzXCI7XHJcblxyXG5jcmVhdGVHcmlkKCdBSScpO1xyXG5jcmVhdGVHcmlkKCdwbGF5ZXInKTtcclxuY29uc3QgcGxheWVyR2FtZWJvYXJkID0gZ2FtZWJvYXJkKCk7XHJcbmNvbnN0IEFJR2FtZWJvYXJkID0gZ2FtZWJvYXJkKCk7XHJcbmNvbnN0IGdhbWUgPSBzdGFydEdhbWUoKTtcclxuY29uc3QgZ2FtZUVuZCA9IHBvcFVwR2FtZUVuZCgpO1xyXG5cclxuZnVuY3Rpb24gc3RhcnRHYW1lKCl7XHJcbiAgICBmdW5jdGlvbiByYW5kb21QbGFjZW1lbnQoYm9hcmQsIHZhbCl7IC8vIHlvdSBjYW4gdXNlIHRoaXMgcmFuZG9tUGxhY2VtZW50IHdpdGggQUkgb3IgUGxheWVyXHJcbiAgICAgICAgbGV0IG5ld1NoaXBDb29yZCA9IHBsYWNlUmFuZG9taXplcih2YWwpO1xyXG4gICAgICAgIGxldCBuZXdTaGlwV2l0aEdhcCA9IHBsYWNlR2FwKG5ld1NoaXBDb29yZCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlUmFuZG9taXplV2l0aEdhcCgpe1xyXG4gICAgICAgICAgICBuZXdTaGlwQ29vcmQgPSBwbGFjZVJhbmRvbWl6ZXIodmFsKTtcclxuICAgICAgICAgICAgbmV3U2hpcFdpdGhHYXAgPSBwbGFjZUdhcChuZXdTaGlwQ29vcmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tBbmRBZGRFbGVtZW50cyhuZXdlc3QsIGN1cnJlbnQsIHZhbCl7XHJcbiAgICAgICAgICAgIGlmIChmaW5kQ29tbW9uRWxlbWVudHMobmV3ZXN0LCBjdXJyZW50KSA9PT0gZmFsc2UpeyAvLyBpZiB0aGVyZSBJUyBOT1QgY29tbW9uIGVsZW1lbnRzIGluc2lkZSBvZiBib3RoIGFycmF5IChub3QgY2xhc2hlZCksIHByb2NlZWQgdG8gYWRkIHRvIGdhbWVib2FyZFxyXG4gICAgICAgICAgICAgICAgYm9hcmQucGxhY2VtZW50KHNoaXBzKG5ld1NoaXBDb29yZCkpO1xyXG4gICAgICAgICAgICAgICAgYm9hcmQuYWRkR2FwTG9jYXRpb24ocGxhY2VHYXAobmV3U2hpcENvb3JkKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHsgLy8gaWYgdGhlcmUgSVMgY29tbW9uIGVsZW1lbnQgaW5zaWRlIGJvdGggYXJyYXksIHJhbmRvbWl6ZSB0aGUgc2hpcCBwbGFjZW1lbnQgYWdhaW4sIHRoZW4gcmVwZWF0IHRoaXMgZnVuY3Rpb25cclxuICAgICAgICAgICAgICAgIHJlUmFuZG9taXplV2l0aEdhcCgpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tBbmRBZGRFbGVtZW50cyhuZXdTaGlwQ29vcmQsIGJvYXJkLmFsbEdhcExvY2F0aW9uLCB2YWwpOyAvLyByZXBlYXQgdGhpcyBmdW5jdGlvbiBhZ2FpblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc3RhcnRzIGhlcmVcclxuICAgICAgICBjaGVja0FuZEFkZEVsZW1lbnRzKG5ld1NoaXBXaXRoR2FwLCBib2FyZC5hbGxHYXBMb2NhdGlvbiwgdmFsKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByYW5kb21BdHRhY2soYm9hcmQsIHVzZXIpe1xyXG4gICAgICAgIGxldCBuZXdBdHRhY2tDb29yZCA9IHBsYWNlUmFuZG9taXplcigxKTsgLy8gb25seSBvbmUgZ3JpZCBwZXIgYXR0YWNrIGFsbG93ZWRcclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiByZU5ld0F0dGFjaygpe1xyXG4gICAgICAgICAgICBuZXdBdHRhY2tDb29yZCA9IHBsYWNlUmFuZG9taXplcigxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrUmVwZWF0ZWRBdHRhY2sobmV3ZXN0LCBjdXJyZW50LCB1c2VyKXtcclxuICAgICAgICAgICAgaWYgKCFjdXJyZW50KXtcclxuICAgICAgICAgICAgICAgIGJvYXJkLnJlY2VpdmVBdHRhY2sobmV3QXR0YWNrQ29vcmQsIHVzZXIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZmluZENvbW1vbkVsZW1lbnRzKG5ld2VzdCwgY3VycmVudCkgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgIGJvYXJkLnJlY2VpdmVBdHRhY2sobmV3QXR0YWNrQ29vcmQsIHVzZXIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZU5ld0F0dGFjaygpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tSZXBlYXRlZEF0dGFjayhuZXdBdHRhY2tDb29yZCwgYm9hcmQuYWxsUmVjZWl2ZWRBdHRhY2tMb2NhdGlvbiwgdXNlcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjaGVja1JlcGVhdGVkQXR0YWNrKG5ld0F0dGFja0Nvb3JkLCBib2FyZC5hbGxSZWNlaXZlZEF0dGFja0xvY2F0aW9uLCB1c2VyKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHNldFNoaXBSYW5kb20oYm9hcmQpe1xyXG4gICAgICAgIC8vIHBsYWNlIHRoZSBib2FyZCB5b3UgdXNlIGFuZCB0aGUgbGVuZ3RoIG9mIHNoaXAsIHRoZW4gcmFuZG9tUGxhY2VtZW50KCkgd2lsbCBwbGFjZSBpdCByYW5kb21seSBpbmNsdWRpbmcgZ2FwIGJldHdlZW4gc2hpcHNcclxuICAgICAgICByYW5kb21QbGFjZW1lbnQoYm9hcmQsNSk7IFxyXG4gICAgICAgIHJhbmRvbVBsYWNlbWVudChib2FyZCw0KTtcclxuICAgICAgICByYW5kb21QbGFjZW1lbnQoYm9hcmQsMyk7XHJcbiAgICAgICAgcmFuZG9tUGxhY2VtZW50KGJvYXJkLDMpO1xyXG4gICAgICAgIHJhbmRvbVBsYWNlbWVudChib2FyZCwyKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHJlc2V0R2FtZWJvYXJkKCl7XHJcbiAgICAgICAgQUlHYW1lYm9hcmQuZGVsZXRlQWxsU2hpcCgpO1xyXG4gICAgICAgIHBsYXllckdhbWVib2FyZC5kZWxldGVBbGxTaGlwKCk7XHJcbiAgICAgICAgY2xlYXJDaGlsZCgnQUlHYW1lYm9hcmQnKTtcclxuICAgICAgICBjbGVhckNoaWxkKCdwbGF5ZXJHYW1lYm9hcmQnKTtcclxuICAgICAgICBjcmVhdGVHcmlkKCdBSScpO1xyXG4gICAgICAgIGNyZWF0ZUdyaWQoJ3BsYXllcicpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gYXR0YWNrTW9kZSh1c2VyKXtcclxuICAgICAgICBjb25zdCBnYW1lbGF5b3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7dXNlcn1HYW1lYm9hcmRgKTsgLy8gc3RpbGwgYnJva2UgZXZlcnkgYXR0YWNrIG1vZGUgaXMgaW5pdGlhdGVkIG92ZXIyIGFnYWluIHNvLCA0eCBzdGFydCBnYW1lID0gNHggYXR0YWNrbW9kZSgpXHJcbiAgICAgICAgY29uc3QgYWxsR3JpZCA9IGdhbWVsYXlvdXQucXVlcnlTZWxlY3RvckFsbCgnZGl2Jyk7XHJcbiAgICAgICAgYWxsR3JpZC5mb3JFYWNoKChncmlkKT0+e1xyXG4gICAgICAgICAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcclxuICAgICAgICAgICAgICAgIGlmKGdyaWQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhdHRhY2tlZCcpIHx8IGdyaWQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaXQnKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKEFJR2FtZWJvYXJkLmFsbExvY2F0aW9uKCkubGVuZ3RoIDwgMSB8fCBwbGF5ZXJHYW1lYm9hcmQuYWxsTG9jYXRpb24oKS5sZW5ndGggPCAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZUVuZC5hY3RpdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC8vIEdBTUUgRU5EXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFJR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soZ3JpZC5jbGFzc05hbWUsICdBSScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBBSUdhbWVib2FyZC5jaGVja1RvdGFsSGVhbHRoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbUF0dGFjayhwbGF5ZXJHYW1lYm9hcmQsICdwbGF5ZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGF0dGFja01vZGUoJ0FJJyk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzdGFydFZzQUk6ICgpPT57XHJcbiAgICAgICAgICAgIHJlc2V0R2FtZWJvYXJkKCk7XHJcbiAgICAgICAgICAgIGF0dGFja01vZGUoJ0FJJyk7XHJcbiAgICAgICAgICAgIHNldFNoaXBSYW5kb20oQUlHYW1lYm9hcmQpO1xyXG4gICAgICAgICAgICBzZXRTaGlwUmFuZG9tKHBsYXllckdhbWVib2FyZCk7XHJcbiAgICAgICAgICAgIGxheW91dEdyaWRQbGFjZWRDb2xvcihwbGF5ZXJHYW1lYm9hcmQsICdwbGF5ZXInKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlc3RhcnRHYW1lOiAoKT0+IHtcclxuICAgICAgICAgICAgcmVzZXRHYW1lYm9hcmQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0YXJ0R2FtZUJ0bigpe1xyXG4gICAgY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnRHYW1lQnRuJyk7XHJcbiAgICBjb25zdCByZXN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3RhcnRCdG4nKTtcclxuICAgIGNvbnN0IHJhbmRvbVBsYWNlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JhbmRvbVBsYWNlQnRuJyk7XHJcblxyXG4gICAgc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdQbGF5IHRoZSBnYW1lIScpO1xyXG4gICAgICAgIGdhbWUuc3RhcnRWc0FJKCk7XHJcbiAgICB9KTtcclxuICAgIHJlc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdyZXN0YXJ0ZWQnKTtcclxuICAgICAgICBnYW1lLnJlc3RhcnRHYW1lKCk7XHJcbiAgICB9KTtcclxuICAgIHJhbmRvbVBsYWNlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcclxuICAgICAgICBjb25zb2xlLmxvZygncmFuZG9taXplJyk7XHJcbiAgICAgICAgLy8gcG9wVXBHYW1lRW5kKCkuYWN0aXZlKCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuc3RhcnRHYW1lQnRuKClcclxuXHJcbmNvbnNvbGUubG9nKCdHYW1lIFJlYWR5Jyk7XHJcbmV4cG9ydCB7cGxheWVyR2FtZWJvYXJkLCBBSUdhbWVib2FyZH0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=