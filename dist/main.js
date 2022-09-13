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
                if (allLocation.length < 1){
                    console.log('ALL SHIPS HAS BEEN DESTROYED, RIP BOZO')
                }
                // console.log(allLocation);
            } 
            // toggle checkAllShip() to make sure if its not endgame
            // if not marks the coordinate with missedAttack()
            //return
        },
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

/***/ "./src/markedAttack.js":
/*!*****************************!*\
  !*** ./src/markedAttack.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function markedAttack(user, className){
        const gamelayout = document.querySelector(`.${user}Gameboard`);
        const grid = gamelayout.querySelector(`.${className}`);
        // console.log(className);
        // console.log(grid);
        grid.classList.add('attacked');
        return
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (markedAttack);

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
/* harmony import */ var _markedAttack_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./markedAttack.js */ "./src/markedAttack.js");
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
    function attackMode(user){
        const gamelayout = document.querySelector(`.${user}Gameboard`); // still broke every attack mode is initiated over2 again so, 4x start game = 4x attackmode()
        const allGrid = gamelayout.querySelectorAll('div');
        allGrid.forEach((grid)=>{
            grid.addEventListener('click', ()=>{
                if( PLAYERONE.checkAttack() == "OFF" ) {
                    return 
                }
                else if (PLAYERONE.checkAttack() == "ON" ){
                    console.log( grid.className + ' attacked');
                    AIGameboard.receiveAttack(grid.className);
                    AIGameboard.checkTotalHealth();
                    (0,_markedAttack_js__WEBPACK_IMPORTED_MODULE_8__["default"])('AI', grid.className);
                    // PLAYERONE.toggleAttackOFF();
                    // AI.toggleAttackON();
                    // toggle AI auto Attack
                    return
                } 
            });
        });
    }
    attackMode('AI');
    attackMode('player');
    
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
            PLAYERONE.toggleAttackON();
            // layoutGridPlacedColor(AIGameboard, 'AI');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVM7QUFDakMsb0JBQW9CLHlEQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQywyQkFBMkIsK0RBQWU7QUFDMUMsNkJBQTZCLHdEQUFRO0FBQ3JDO0FBQ0E7QUFDQSwyQkFBMkIsK0RBQWU7QUFDMUMsNkJBQTZCLHdEQUFRO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixrRUFBa0IsOEJBQThCO0FBQ2hFLGdDQUFnQyxxREFBSztBQUNyQyxxQ0FBcUMsd0RBQVE7QUFDN0M7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0EsOEVBQThFO0FBQzlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxxRUFBcUI7QUFDN0I7QUFDQTtBQUNBLHNEQUFzRCxLQUFLLGFBQWE7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNERBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxxRUFBcUI7QUFDakM7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZpbmRDb21tb25FbGVtZW50cy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2xheW91dEdyaWQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9sYXlvdXRHcmlkUGxhY2VkQ29sb3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tYXJrZWRBdHRhY2suanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGFjZUdhcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYWNlUmFuZG9taXplci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21haW5nYW1lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGZpbmRDb21tb25FbGVtZW50cyhhcnIxLCBhcnIyKSB7XHJcbiAgICByZXR1cm4gYXJyMS5zb21lKGl0ZW0gPT4gYXJyMi5pbmNsdWRlcyhpdGVtKSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZmluZENvbW1vbkVsZW1lbnRzIiwiXHJcbmNvbnN0IGdhbWVib2FyZCA9ICgpPT4ge1xyXG4gICAgbGV0IGFsbFNoaXAgPSBbXTtcclxuICAgIGxldCB0b3RhbEhlYWx0aCA9IDA7XHJcbiAgICBsZXQgYWxsTG9jYXRpb24gPSBbXTtcclxuICAgIGxldCBhdHRhY2tNaXNzZWQgPSBbXTtcclxuICAgIGxldCBhbGxHYXBMb2NhdGlvbiA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJlZnJlc2hBbGxMb2NhdGlvbigpe1xyXG4gICAgICAgIGxldCBuZXdMb2NhdGlvbiA9IFtdO1xyXG4gICAgICAgIGFsbFNoaXAuZm9yRWFjaCgoc2hpcCk9PntcclxuICAgICAgICAgICAgbmV3TG9jYXRpb24gPSBuZXdMb2NhdGlvbi5jb25jYXQoc2hpcC5sb2NhdGlvbigpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhbGxMb2NhdGlvbiA9IG5ld0xvY2F0aW9uO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gYXR0YWNrTWlzc2VkQ291bnRlcihjb29yKXtcclxuICAgICAgICBhdHRhY2tNaXNzZWQucHVzaChjb29yKTtcclxuICAgIH1cclxuXHJcbiAgICAvL2NvbnNvbGUubG9nKCdnYW1lYm9hcmQgaXMgb24nKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcGxhY2VtZW50OiAoc2hpcHMpPT57IC8vIGRvbnQgbmVlZCBjb29yIHNpbmNlIGNvb3JkaW5hdGUgc2hvdWxkIGJlIGluc2lkZSB0aGUgc2hpcCgpXHJcbiAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgY29vcmRpbmF0ZSBpcyB2YWxpZCwgd2hpY2ggbWVhbnMgZW1wdHkgYW5kIG9uZSBibG9jayBhd2F5IGZyb20gYW5vdGhlciBzaGlwXHJcbiAgICAgICAgICAgIC8vIHBsYWNlIHRoZSBzaGlwcyBvbiB0aGUgY29vcmRpbmF0ZSAgICAgXHJcbiAgICAgICAgICAgIGFsbFNoaXAucHVzaChzaGlwcyk7XHJcbiAgICAgICAgICAgIGFsbExvY2F0aW9uID0gYWxsTG9jYXRpb24uY29uY2F0KHNoaXBzLmxvY2F0aW9uKCkpO1xyXG4gICAgICAgICAgICAvLyBtYXJrcyB0aGUgY29vcmRpbmF0ZSB3aXRoIHNoaXBzJyBtYXJrc1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlY2VpdmVBdHRhY2s6IChjb29yKT0+e1xyXG4gICAgICAgICAgICBpZihhbGxMb2NhdGlvbi5pbmNsdWRlcyhjb29yKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0F0dGFjayBtaXNzZWQnKVxyXG4gICAgICAgICAgICAgICAgYXR0YWNrTWlzc2VkQ291bnRlcihjb29yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQXR0YWNrIEhpdCEnKVxyXG4gICAgICAgICAgICAgICAgYWxsU2hpcC5mb3JFYWNoKChzaGlwKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHNoaXAuaGl0KGNvb3IpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyByZWZyZXNoIHRoZSBhbGxMb2NhdGlvbiBBcnJheSBzbyB5b3UgY2Fubm90IGhpdCB0d2ljZSBvbiB0aGUgc2FtZSBjb29yZGluYXRlXHJcbiAgICAgICAgICAgICAgICByZWZyZXNoQWxsTG9jYXRpb24oKVxyXG4gICAgICAgICAgICAgICAgaWYgKGFsbExvY2F0aW9uLmxlbmd0aCA8IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBTEwgU0hJUFMgSEFTIEJFRU4gREVTVFJPWUVELCBSSVAgQk9aTycpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhhbGxMb2NhdGlvbik7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIC8vIHRvZ2dsZSBjaGVja0FsbFNoaXAoKSB0byBtYWtlIHN1cmUgaWYgaXRzIG5vdCBlbmRnYW1lXHJcbiAgICAgICAgICAgIC8vIGlmIG5vdCBtYXJrcyB0aGUgY29vcmRpbmF0ZSB3aXRoIG1pc3NlZEF0dGFjaygpXHJcbiAgICAgICAgICAgIC8vcmV0dXJuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaGVja1RvdGFsSGVhbHRoOiAoKT0+e1xyXG4gICAgICAgICAgICAvLyBjaGVjayB0aGUgaGVhbHRoYmFyIG9mIGVhY2ggc2hpcHMgd2l0aCBzaGlwLmhlYWx0aGJhcigpXHJcbiAgICAgICAgICAgIC8vIGFsbFNoaXAuZm9yRWFjaCgoc2hpcCk9PntcclxuICAgICAgICAgICAgLy8gICAgIHNoaXAubG9jYXRpb24oKTsgXHJcbiAgICAgICAgICAgIC8vICAgICB0b3RhbEhlYWx0aCA9IHRvdGFsSGVhbHRoICsgc2hpcC5oZWFsdGhCYXIoKTtcclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRvdGFsSGVhbHRoKTtcclxuICAgICAgICAgICAgcmVmcmVzaEFsbExvY2F0aW9uKCk7XHJcbiAgICAgICAgICAgIHRvdGFsSGVhbHRoID0gYWxsTG9jYXRpb24ubGVuZ3RoO1xyXG4gICAgICAgICAgICAvLyBpZiBhbGwgdGhlIGhlYWx0aGJhciBpcyAwIHRoZW4gdGhlIGdhbWUgaXMgZW5kZWRcclxuICAgICAgICAgICAgaWYodG90YWxIZWFsdGggPD0gMCl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdBTUUgT1ZFUiBBTEwgT0YgWU9VUiBTSElQUyBXUkVDS0VEXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhbGxMb2NhdGlvbjogKCk9PntcclxuICAgICAgICAgICAgcmVmcmVzaEFsbExvY2F0aW9uKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBhbGxMb2NhdGlvblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2hlY2tBbGxMb2NhdGlvbjooKT0+e1xyXG4gICAgICAgICAgICByZWZyZXNoQWxsTG9jYXRpb24oKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYWxsTG9jYXRpb24pO1xyXG4gICAgICAgICAgICByZXR1cm4gYWxsTG9jYXRpb25cclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlbGV0ZUFsbFNoaXA6ICgpPT4ge1xyXG4gICAgICAgICAgICBhbGxTaGlwLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIHRvdGFsSGVhbHRoID0gMDtcclxuICAgICAgICAgICAgYWxsTG9jYXRpb24ubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgYXR0YWNrTWlzc2VkLmxlbmd0aD0wO1xyXG4gICAgICAgICAgICBhbGxHYXBMb2NhdGlvbi5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICByZWZyZXNoQWxsTG9jYXRpb24oKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFkZEdhcExvY2F0aW9uOiAoYXJyYXkpPT4ge1xyXG4gICAgICAgICAgICAvLyBnYXBMb2NhdGlvbi5wdXNoKGFycmF5KTtcclxuICAgICAgICAgICAgYXJyYXkuZm9yRWFjaCgoYXJyKT0+e1xyXG4gICAgICAgICAgICAgICAgYWxsR2FwTG9jYXRpb24ucHVzaChhcnIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCBcclxuICAgICAgICBjaGVja0dhcExvY2F0aW9uOiAoKT0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYWxsR2FwTG9jYXRpb24pO1xyXG4gICAgICAgICAgICByZXR1cm4gYWxsR2FwTG9jYXRpb25cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoZWNrQXR0YWNrTWlzc2VkOiAoKT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhdHRhY2tNaXNzZWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gYXR0YWNrTWlzc2VkXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhbGxHYXBMb2NhdGlvblxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnYW1lYm9hcmQ7XHJcblxyXG4vLyBjb25zdCBwbGF5YSA9IGdhbWVib2FyZCgpO1xyXG4vLyBjb25zdCBiaWdTaGlwQ29vciA9ICc2QiA3QiA4QiA5QiAxMEInO1xyXG4vLyBjb25zdCBtaWRTaGlwQ29vciA9ICc0QiA0QyA0RCc7XHJcbi8vIGNvbnN0IG1pZFNoaXAgPSBzaGlwcyhtaWRTaGlwQ29vcik7XHJcbi8vIGNvbnN0IGJpZ1NoaXAgPSBzaGlwcyhiaWdTaGlwQ29vcik7XHJcblxyXG4vLyBwbGF5YS5wbGFjZW1lbnQoYmlnU2hpcCk7XHJcbi8vIHBsYXlhLnBsYWNlbWVudChtaWRTaGlwKTtcclxuLy8gcGxheWEucmVjZWl2ZUF0dGFjayhcIjRCXCIpO2RlYnVnZ2VyXHJcbi8vIHBsYXlhLnJlY2VpdmVBdHRhY2soXCI0Q1wiKTtkZWJ1Z2dlclxyXG4vLyBwbGF5YS5yZWNlaXZlQXR0YWNrKFwiNERcIik7ZGVidWdnZXJcclxuLy8gcGxheWEucmVjZWl2ZUF0dGFjayhcIjNCXCIpO2RlYnVnZ2VyXHJcbi8vIHBsYXlhLmNoZWNrQWxsTG9jYXRpb24oKTtcclxuLy8gcGxheWEuY2hlY2tBdHRhY2tNaXNzZWQoKTtcclxuLy8gcGxheWEuY2hlY2tUb3RhbEhlYWx0aCgpOyBcclxuLy8gcmV2aXNlIHRoaXNcclxuLy8gcGxheWEucGxhY2VtZW50KCcxQSAyQSAzQScsIHNoaXBzKDMpKTtcclxuLy8gcGxheWEucGxhY2VtZW50KCczQiA0QicsIHNoaXBzKDIpKTtcclxuLy8gcGxheWEucGxhY2VtZW50KCc2QiA3QiA4QiA5QiAxMEInLCBzaGlwcyg1KSk7XHJcbi8vIHBsYXlhLnBsYWNlbWVudCgnNkUgN0UgOEUgOUUgMTBFJywgc2hpcHMoNSkpOyIsIlxyXG5mdW5jdGlvbiBjcmVhdGVHcmlkKHdob3Mpe1xyXG4gICAgY29uc3QgbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt3aG9zfUdhbWVib2FyZGApO1xyXG4gICAgY29uc3QgTUFYX1dJRFRIID0gMTA7XHJcbiAgICBjb25zdCBhbHBoYWJldCA9ICdhYmNkZWZnaGlqJztcclxuICAgIGNvbnN0IGFscGhBcnJheSA9IGFscGhhYmV0LnNwbGl0KCcnKTtcclxuXHJcbiAgICBhbHBoQXJyYXkuZm9yRWFjaCgoYWxwKT0+e1xyXG4gICAgICAgIGZvciAobGV0IGk9MTsgaSA8PSBNQVhfV0lEVEg7IGkrKyApe1xyXG4gICAgICAgICAgICBjb25zdCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGdyaWQuY2xhc3NOYW1lPWAke2FscH0ke2l9YDtcclxuICAgICAgICAgICAgLy8gZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhncmlkLmNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgIC8vICAgICAvLyBjbGlja2VkIHRoZSBncmlkXHJcbiAgICAgICAgICAgIC8vICAgICAvLyBpbml0aWF0ZSBhdHRhY2soKSAvLyB0aGVuIEFJIGF0dGFjayB5b3VycyB0b29cclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgIGxheWVyLmFwcGVuZChncmlkKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVHcmlkIiwiZnVuY3Rpb24gbGF5b3V0R3JpZFBsYWNlZENvbG9yKGdhbWVib2FyZCwgdXNlcil7XHJcbiAgICBsZXQgY3VycmVudEdhcCA9IGdhbWVib2FyZC5hbGxHYXBMb2NhdGlvbjtcclxuICAgIGxldCBjdXJyZW50U2hpcCA9IGdhbWVib2FyZC5hbGxMb2NhdGlvbigpO1xyXG4gICAgLy8gY29uc29sZS5sb2coY3VycmVudEdhcCk7XHJcbiAgICBpZiAoY3VycmVudEdhcC5sZW5ndGggPT09IDApe1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXQgYXJyYXkgZ2FwbG9jYXRpb24gZW1wdHknKVxyXG4gICAgICAgIGNvbnN0IGxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7dXNlcn1HYW1lYm9hcmRgKTtcclxuICAgICAgICBjb25zdCBnYXAgPSBsYXllci5xdWVyeVNlbGVjdG9yQWxsKCdkaXYnKTtcclxuICAgICAgICAgICAgZ2FwLmZvckVhY2goKGcpPT57XHJcbiAgICAgICAgICAgICAgICBnLmNsYXNzTGlzdC5yZW1vdmUoJ2dhcCcpO1xyXG4gICAgICAgICAgICAgICAgZy5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY3VycmVudEdhcC5mb3JFYWNoKChhcnJheUxvYyk9PntcclxuICAgICAgICAgICAgY29uc3QgbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt1c2VyfUdhbWVib2FyZGApO1xyXG4gICAgICAgICAgICBsZXQgZ2FwID0gbGF5ZXIucXVlcnlTZWxlY3RvcihgLiR7YXJyYXlMb2N9YCk7XHJcbiAgICAgICAgICAgIGdhcC5jbGFzc0xpc3QuYWRkKCdnYXAnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjdXJyZW50U2hpcC5mb3JFYWNoKChjdXJzaGlwKT0+e1xyXG4gICAgICAgICAgICBjb25zdCBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3VzZXJ9R2FtZWJvYXJkYCk7XHJcbiAgICAgICAgICAgIGxldCBzaGlwID0gbGF5ZXIucXVlcnlTZWxlY3RvcihgLiR7Y3Vyc2hpcH1gKTtcclxuICAgICAgICAgICAgc2hpcC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxheW91dEdyaWRQbGFjZWRDb2xvciIsImZ1bmN0aW9uIG1hcmtlZEF0dGFjayh1c2VyLCBjbGFzc05hbWUpe1xyXG4gICAgICAgIGNvbnN0IGdhbWVsYXlvdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt1c2VyfUdhbWVib2FyZGApO1xyXG4gICAgICAgIGNvbnN0IGdyaWQgPSBnYW1lbGF5b3V0LnF1ZXJ5U2VsZWN0b3IoYC4ke2NsYXNzTmFtZX1gKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhjbGFzc05hbWUpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGdyaWQpO1xyXG4gICAgICAgIGdyaWQuY2xhc3NMaXN0LmFkZCgnYXR0YWNrZWQnKTtcclxuICAgICAgICByZXR1cm5cclxufVxyXG5leHBvcnQgZGVmYXVsdCBtYXJrZWRBdHRhY2siLCIvLyBzZXQgZ2FwIGJ5IG9uZSBieSBvbmUgbG9vcCBjaGVja1xyXG5cclxuZnVuY3Rpb24gcGxhY2VHYXAobWFpbkFycmF5KXtcclxuICAgIGxldCBvdXRwdXRBcnJheSA9IFtdO1xyXG4gICAgbGV0IHJlc3VsdEFycmF5ID0gW107XHJcbiAgICBjb25zdCBudW1iZXJQYXR0ID0gL1swLTldL2c7XHJcbiAgICBjb25zdCBhbHBoYVBhdHQgPSAvW2EtekEtWl0vZztcclxuICAgIGNvbnN0IGFscGhhYmV0TWF4ID0gJ2FiY2RlZmdoaWonO1xyXG4gICAgY29uc3QgYWxwQXJyYXkgPSBhbHBoYWJldE1heC5zcGxpdCgnJyk7XHJcbiAgICBtYWluQXJyYXkuZm9yRWFjaCgodmFsKT0+e1xyXG4gICAgICAgIGNvbnN0IG51bWIgPSBwYXJzZUludCh2YWwubWF0Y2gobnVtYmVyUGF0dCkuam9pbignJykpO1xyXG4gICAgICAgIGNvbnN0IGFscGggPSB2YWwubWF0Y2goYWxwaGFQYXR0KS5qb2luKCcnKTtcclxuICAgICAgICBjb25zdCBudW1iTWludXNPbmUgPSBudW1iIC0gMTtcclxuICAgICAgICBjb25zdCBudW1iUGx1c09uZSA9IG51bWIgKyAxO1xyXG4gICAgICAgIGNvbnN0IGFscGhQbHVzT25lID0gYWxwQXJyYXlbKGFscEFycmF5LmluZGV4T2YoYWxwaCkpKzFdO1xyXG4gICAgICAgIGNvbnN0IGFscGhNaW51c09uZSA9IGFscEFycmF5WyhhbHBBcnJheS5pbmRleE9mKGFscGgpKS0xXTtcclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBtZXJnZUFycmF5KCl7XHJcbiAgICAgICAgICAgICAgLy8gbWVyZ2UgdGhlIGFycmF5XHJcbiAgICAgICAgICAgIHJlc3VsdEFycmF5ID0gcmVzdWx0QXJyYXkuY29uY2F0KG91dHB1dEFycmF5KTtcclxuICAgICAgICAgICAgcmVzdWx0QXJyYXkgPSBbLi4ubmV3IFNldCAoWy4uLm1haW5BcnJheSwuLi5vdXRwdXRBcnJheV0pXTsgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBjaGVja1JpZ2h0KCl7XHJcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaC5jb25jYXQoKG51bWJQbHVzT25lKS50b1N0cmluZygpKSk7IC8vIHJpZ2h0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrTGVmdCgpe1xyXG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKGFscGguY29uY2F0KChudW1iTWludXNPbmUpLnRvU3RyaW5nKCkpKTsgLy8gbGVmdFxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBjaGVja1VwKCl7XHJcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaE1pbnVzT25lLmNvbmNhdCgobnVtYikudG9TdHJpbmcoKSkpOyAvLyB1cFxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBjaGVja0Rvd24oKXtcclxuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaChhbHBoUGx1c09uZS5jb25jYXQoKG51bWIpLnRvU3RyaW5nKCkpKTsgLy8gZG93blxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBjaGVja0RpYWdVcFJpZ2h0KCl7XHJcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaE1pbnVzT25lLmNvbmNhdCgobnVtYlBsdXNPbmUpLnRvU3RyaW5nKCkpKTsgLy8gdXAgcmlnaHRcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tEaWFnRG93blJpZ2h0KCl7XHJcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaFBsdXNPbmUuY29uY2F0KChudW1iUGx1c09uZSkudG9TdHJpbmcoKSkpOyAvLyBkb3duIHJpZ2h0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrRGlhZ1VwTGVmdCgpe1xyXG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKGFscGhNaW51c09uZS5jb25jYXQoKG51bWJNaW51c09uZSkudG9TdHJpbmcoKSkpOyAvLyB1cCBsZWZ0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrRGlhZ0Rvd25MZWZ0KCl7XHJcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaFBsdXNPbmUuY29uY2F0KChudW1iTWludXNPbmUpLnRvU3RyaW5nKCkpKTsgLy8gZG93biBsZWZ0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhbHBoTWludXNPbmUgPT0gdW5kZWZpbmVkICYmIG51bWJNaW51c09uZSA8IDEpeyAvLyBjb3JuZXIgdXAgbGVmdFxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0cyBjb3JuZXIgdXAgbGVmdCcpO1xyXG4gICAgICAgICAgICBjaGVja1JpZ2h0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrRG93bigpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdEb3duUmlnaHQoKTtcclxuICAgICAgICAgICAgbWVyZ2VBcnJheSgpOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYWxwaFBsdXNPbmUgPT0gdW5kZWZpbmVkICYmIG51bWJNaW51c09uZSA8IDEpeyAvLyBjb3JuZXIgYm90dG9tIGxlZnRcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdHMgY29ybmVyIGJvdHRvbSBsZWZ0Jyk7XHJcbiAgICAgICAgICAgIGNoZWNrUmlnaHQoKTtcclxuICAgICAgICAgICAgY2hlY2tVcCgpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdVcFJpZ2h0KCk7XHJcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFscGhNaW51c09uZSA9PSB1bmRlZmluZWQgJiYgbnVtYlBsdXNPbmUgPiAxMCl7IC8vIGNvcm5lciB1cCByaWdodCBcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdHMgY29ybmVyIHVwIHJpZ2h0Jyk7XHJcbiAgICAgICAgICAgIGNoZWNrTGVmdCgpO1xyXG4gICAgICAgICAgICBjaGVja0Rvd24oKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnRG93bkxlZnQoKTtcclxuICAgICAgICAgICAgbWVyZ2VBcnJheSgpOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYWxwaFBsdXNPbmUgPT0gdW5kZWZpbmVkICYmIG51bWJQbHVzT25lID4gMTApeyAvLyBjb3JuZXIgYm90dG9tIHJpZ2h0XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXRzIGNvcm5lciBib3R0b20gcmlnaHQnKTtcclxuICAgICAgICAgICAgY2hlY2tMZWZ0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrVXAoKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnVXBMZWZ0KCk7XHJcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG51bWJNaW51c09uZSA8IDEpe1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0IG51bWJlciA9IDAnKTtcclxuICAgICAgICAgICAgY2hlY2tSaWdodCgpO1xyXG4gICAgICAgICAgICBjaGVja1VwKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRG93bigpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdVcFJpZ2h0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25SaWdodCgpO1xyXG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKG51bWJQbHVzT25lID4gMTApe1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0IG51bWJlciA+IDEwJyk7XHJcbiAgICAgICAgICAgIGNoZWNrTGVmdCgpO1xyXG4gICAgICAgICAgICBjaGVja1VwKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRG93bigpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdVcExlZnQoKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnRG93bkxlZnQoKTtcclxuICAgICAgICAgICAgbWVyZ2VBcnJheSgpO1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYWxwaE1pbnVzT25lID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXRzIHVuZGVmaW5lZCcpO1xyXG4gICAgICAgICAgICBjaGVja0xlZnQoKTtcclxuICAgICAgICAgICAgY2hlY2tSaWdodCgpO1xyXG4gICAgICAgICAgICBjaGVja0Rvd24oKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnRG93bkxlZnQoKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnRG93blJpZ2h0KCk7IFxyXG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhbHBoUGx1c09uZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0cyB1bmRlZmluZWQnKTtcclxuICAgICAgICAgICAgY2hlY2tMZWZ0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrUmlnaHQoKTtcclxuICAgICAgICAgICAgY2hlY2tVcCgpOyBcclxuICAgICAgICAgICAgY2hlY2tEaWFnVXBMZWZ0KCk7IFxyXG4gICAgICAgICAgICBjaGVja0RpYWdVcFJpZ2h0KCk7XHJcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAvLyBob3Jpem9udGFsIGNoZWNrXHJcbiAgICAgICAgICAgICAgICBjaGVja0xlZnQoKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrUmlnaHQoKTtcclxuICAgICAgICAgICAgICAgIC8vIHZlcnRpY2FsIGNoZWNrXHJcbiAgICAgICAgICAgICAgICBjaGVja1VwKCk7XHJcbiAgICAgICAgICAgICAgICBjaGVja0Rvd24oKTtcclxuICAgICAgICAgICAgICAgIC8vZGlhZ29uYWwgbGVmdCBjaGVja1xyXG4gICAgICAgICAgICAgICAgY2hlY2tEaWFnVXBMZWZ0KCk7XHJcbiAgICAgICAgICAgICAgICBjaGVja0RpYWdEb3duTGVmdCgpO1xyXG4gICAgICAgICAgICAgICAgLy9kaWFnb25hbCByaWdodCBjaGVja1xyXG4gICAgICAgICAgICAgICAgY2hlY2tEaWFnVXBSaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tEaWFnRG93blJpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICBtZXJnZUFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG5cclxuICAgIH0pO1xyXG4gICAgLy8gY29uc29sZS5sb2cob3V0cHV0QXJyYXkpO1xyXG4gICAgLy8gY29uc29sZS5sb2cocmVzdWx0QXJyYXkpO1xyXG4gICAgcmV0dXJuIHJlc3VsdEFycmF5XHJcbn1cclxuXHJcbi8vIGxldCBhcnJheTEgPSBbJ2EnLCdiJywnYyddO1xyXG4vLyBsZXQgYXJyYXkyID0gWyd6JywnYScsJ3MnXTtcclxuXHJcbi8vIGxldCBhcnJheTMgPSBhcnJheTEuY29uY2F0KGFycmF5Mik7XHJcbi8vIGFycmF5MyA9IFsuLi5uZXcgU2V0KFsuLi5hcnJheTEsLi4uYXJyYXkyXSldXHJcblxyXG4vLyBjb25zb2xlLmxvZyhhcnJheTMpOyBcclxuXHJcbi8vIHBsYWNlR2FwKFsnMTBqJ10pO1xyXG4vLyBwbGFjZUdhcChbJzEwYycsICcxMGQnLCAnMTBlJ10pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcGxhY2VHYXAiLCJmdW5jdGlvbiBwbGFjZVJhbmRvbWl6ZXIobGVuZyl7XHJcbiAgICBjb25zdCBNQVhfR1JJRCA9IDEwOyAvLyBtYXhpbXVtIGdyaWQgbGVuZ3RoIGlzIDEweDEwXHJcbiAgICBjb25zdCByYW5kb21BeGlzID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7IC8vIG9ubHkgcmV0dXJuIDAvMVxyXG4gICAgY29uc3QgYXJyYXkgPSBbXTtcclxuICAgIGNvbnN0IGFscGhhYmV0ID0gXCJhYmNkZWZnaGlqXCI7XHJcbiAgICBjb25zdCByYW5kb21OdW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoTUFYX0dSSUQgLSBsZW5nKSkgKyAxOyAvLyB0aGlzIHJhbmRvbWl6ZXIgbnVtYmVyIGtlZXAgeW91IGZyb20gb3ZlcmZsb3dpbmcsIHBsdXMgb25lIHNvIGl0IHN0YXJ0IGZyb20gMSBub3QgMFxyXG4gICAgY29uc3QgcmFuZG9tQWxwID0gYWxwaGFiZXRbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYWxwaGFiZXQuc3Vic3RyaW5nKDAsKE1BWF9HUklEIC0gbGVuZykpLmxlbmd0aCldOyAvLyB0aGlzIHJhbmRvbWl6ZXIga2VlcHMgeW91IGZyb20gdmFsdWUgbW9yZSB0aGFuIGxlbmd0aFxyXG4gICAgbGV0IGFscGhhTnVtO1xyXG5cclxuICAgIGlmIChyYW5kb21BeGlzID09PSAwKXsgLy8gWCBheGlzIGJsb2Nrc1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDxsZW5nOyBpKysgKXtcclxuICAgICAgICAgICAgYWxwaGFOdW0gPSByYW5kb21BbHAuY29uY2F0KChyYW5kb21OdW1iZXIgKyBpKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgYXJyYXkucHVzaChhbHBoYU51bSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGFycmF5KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhyYW5kb21BeGlzKTtcclxuICAgICAgICByZXR1cm4gYXJyYXlcclxuICAgIH1cclxuICAgIGVsc2UgeyAvLyBZIGF4aXMgYmxvY2tzXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPGxlbmc7IGkrKyApe1xyXG4gICAgICAgICAgICBjb25zdCBhbHBMb29wID0gYWxwaGFiZXQuY2hhckF0KGFscGhhYmV0LmluZGV4T2YocmFuZG9tQWxwKSArIGkpO1xyXG4gICAgICAgICAgICBhbHBoYU51bSA9IGFscExvb3AuY29uY2F0KChyYW5kb21OdW1iZXIpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICBhcnJheS5wdXNoKGFscGhhTnVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYXJyYXkpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJhbmRvbUF4aXMpO1xyXG4gICAgICAgIHJldHVybiBhcnJheVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IHBsYWNlUmFuZG9taXplciIsIlxyXG4vLyBjb25zdCB5b3VyR2FtZWJvYXJkID0gZ2FtZWJvYXJkKCk7XHJcbi8vIGNvbnN0IGh1bWFuR2FtZWJvYXJkID0gZ2FtZWJvYXJkKCk7XHJcbi8vIGNvbnN0IEFJR2FtZWJvYXJkID0gZ2FtZWJvYXJkKCk7XHJcblxyXG5jb25zdCBwbGF5ZXIgPSAoKSA9PiB7XHJcbiAgICAvLyBwbGF5ZXIgc2hvdWxkIHRha2UgdHVybnMgcGxheWluZyB0aGUgZ2FtZSBieSBhdHRhY2tpbmcgb3Bwb25lbnQncyBnYW1lYm9hcmQuXHJcbiAgICBsZXQgYXR0YWNrU3RhdHVzID0gJ09GRic7XHJcbiAgICAvLyBwbGF5ZXIgYXR0YWNraW5nIHN0YXRlIGlzIE9OXHJcbiAgICAvLyBwbGF5ZXIgQ0hPT1NFIHRoZSBjb29yZGluYXRlIG9mIG9wcG9uZW50J3MgZ2FtZWJvYXJkLlxyXG4gICAgLy8gcGxheWVyIGF0dGFja2luZyBzdGF0ZSBpcyBPRkZcclxuICAgIC8vIGxldCB5b3VyR2FtZWJvYXJkID0gZ2FtZWJvYXJkKCk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHRvZ2dsZUF0dGFja09OIDogKCk9PiBhdHRhY2tTdGF0dXMgPSBcIk9OXCIsXHJcbiAgICAgICAgdG9nZ2xlQXR0YWNrT0ZGIDogKCk9PiBhdHRhY2tTdGF0dXMgPSBcIk9GRlwiLFxyXG4gICAgICAgIGNoZWNrQXR0YWNrOiAoKT0+IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYXR0YWNrU3RhdHVzKTsgXHJcbiAgICAgICAgICAgIHJldHVybiBhdHRhY2tTdGF0dXNcclxuICAgICAgICB9LFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBsZXQgcGxheWUgPSBwbGF5ZXIoKTtcclxuXHJcblxyXG4vLyBwbGF5ZS5jaGVja0F0dGFjaygpO1xyXG4vLyBwbGF5ZS50b2dnbGVBdHRhY2tPTigpO1xyXG4vLyBwbGF5ZS5jaGVja0F0dGFjaygpO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBsYXllcjsiLCJcclxuY29uc3Qgc2hpcHMgPSAoY29vcmQpID0+eyAvLyBsZW5ndGggd2lsbCBiZSBmcm9tIHNpemUgb2YgdGhlIHNoaXBcclxuICAgIC8vIGxldCBjb29yZCA9IGxvYy5zcGxpdCgnLCcpO1xyXG4gICAgbGV0IGhlYWx0aEJhciA9IGNvb3JkLmxlbmd0aDtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbGVuZ3RoOiAoKT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gbGVuIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGl0OiAobG9jKT0+e1xyXG4gICAgICAgICAgICAvL2dldCB0aGUgYXR0Y2sgaGl0IGxvY2F0aW9uXHJcbiAgICAgICAgICAgIGlmIChjb29yZC5pbmNsdWRlcyhsb2MpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiYXR0YWNrIG1pc3NlZFwiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihjb29yZC5pbmNsdWRlcyhsb2MpID09PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIGNvb3JkID0gY29vcmQuZmlsdGVyKCAodmFsKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbCAhPT0gbG9jXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGhlYWx0aEJhciA9IGhlYWx0aEJhciAtIDE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL21hcmsgcG9zaXRpb24gaW4gZ2FtZWJvYXJkIGFzIGEgaGl0XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidGhpcyBzaGlwIHRvb2sgaGl0OiBcIiArIG51bSlcclxuICAgICAgICAgICAgLy9yZXR1cm4gXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpc1N1bms6ICgpPT57XHJcbiAgICAgICAgICAgIC8vY2hlY2sgdGhlIHNoaXAgaWYgc3Vua2VuIHlldFxyXG4gICAgICAgICAgICBpZihoZWFsdGhCYXIgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NoaXAgaXMgZGVzdHJveWVkJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIFxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzaGlwIGlzIHN0aWxsIGludGFjdCcpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgXHJcbiAgICAgICAgaGVhbHRoQmFyIDogKCk9PiB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJ0aGlzIHNoaXAgaGVhbHRoOiBcIiArIGhlYWx0aEJhcik7XHJcbiAgICAgICAgICAgIHJldHVybiBoZWFsdGhCYXJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxvY2F0aW9uOiAoKT0+e1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGNvb3JkKVxyXG4gICAgICAgICAgICByZXR1cm4gY29vcmRcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGNvbnN0IGJpZ1NoaXAgPSBzaGlwcyhcIjNBIDRBIDVBIDZBIDdBXCIpO1xyXG4vLyBjb25zdCBtaWRTaGlwMiA9IHNoaXBzKFwiMTJBIDEyQiAxMkNcIik7XHJcbi8vIGNvbnN0IHNtYWxsU2hpcCA9IHNoaXBzKFwiNEJcIik7XHJcblxyXG4vLyBiaWdTaGlwLmxvY2F0aW9uKCk7XHJcbi8vIGJpZ1NoaXAuaGVhbHRoQmFyKCk7XHJcbi8vIGJpZ1NoaXAuaGl0KFwiM0FcIik7XHJcbi8vIGJpZ1NoaXAubG9jYXRpb24oKTtcclxuLy8gYmlnU2hpcC5oZWFsdGhCYXIoKTtcclxuLy8gYmlnU2hpcC5oaXQoXCI4QVwiKTtcclxuLy8gYmlnU2hpcC5sb2NhdGlvbigpO1xyXG4vLyBiaWdTaGlwLmhlYWx0aEJhcigpO1xyXG4vLyBiaWdTaGlwLmhpdChcIjRBXCIpO1xyXG4vLyBiaWdTaGlwLmhpdChcIjVBXCIpO1xyXG4vLyBiaWdTaGlwLmhpdChcIjZBXCIpO1xyXG4vLyBiaWdTaGlwLmxvY2F0aW9uKCk7XHJcbi8vIGJpZ1NoaXAuaGVhbHRoQmFyKCk7XHJcbi8vIGJpZ1NoaXAuaXNTdW5rKCk7XHJcbi8vIGJpZ1NoaXAuaGl0KFwiN0FcIik7XHJcbi8vIGJpZ1NoaXAubG9jYXRpb24oKTtcclxuLy8gYmlnU2hpcC5oZWFsdGhCYXIoKTtcclxuLy8gYmlnU2hpcC5pc1N1bmsoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNoaXBzIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBpbiB0aGlzIGZpbGUgd2UgYXJlIGdvbm5hIGdhdGhlciBhbGwgdGhlIGNvbXBvbmVudHMgb2YgQmF0dGxlc2hpcCBUaGUgR2FtZSBhbmQgdHVybiBpdCBpbnRvIHJlYWwgZ2FtZVxyXG5cclxuLy8gcGxheWVyLiBXaGF0IGRvZXMgcGxheWVyIGRvLlxyXG4vLyBwbGF5ZXIgc3RhcnQgdGhlIGdhbWUgYnkgY2hvb3Npbmcgd2hvIHlvdXJlIHBsYXlpbmcgd2l0aFxyXG4vLyBwbGF5ZXIgY2hvb3NlIGlzIGl0IGdvbm5hIGJlIHZzIEFJIG9yIHZzIEh1bWFuXHJcbi8vIGF0IHRoaXMgcG9pbnQsIGlmIHlvdSBjaG9vc2UgQUkuIEFJIHdpbGwgYXV0b21hdGljYWxseSBwbGFjZSB0aGVpciBzaGlwcyByYW5kb21seSBvbiBnYW1lYm9hcmQuXHJcbi8vIHBsYXllciBjaG9vc2UgdGhlIHNoaXBzIHBsYWNlbWVudCBhY2Nyb3NzIHRoZSBnYW1lYm9hcmQuXHJcbi8vIHNoaXAncyBwbGFjZW1lbnQgaXMgYmFzZWQgb24gb25lIHJ1bGUgdGhhdCB0aGVyZSBpcyBhbHdheXMgb25lIGVtcHR5IGJsb2NrIGJldHdlZW4gb25lIGFuZCBhbm90aGVyIHBsYWNlZCBzaGlwc1xyXG4vLyBwbGF5ZXIgaGF2ZSBhIGNob2ljZSB0byByYW5kb21seSBwbGFjZSB0aGUgc2hpcHMgYnkgY2xpY2tpbmcgdGhlIHJhbmRvbSBidXR0b24uIFxyXG4vLyBwbGF5ZXIgcGxhY2VtZW50IG9yZGVyIGlzLi4gZmlyc3QgeW91IHBsYWNlIG9uZSBiaWcgc2hpcCAoNSBpbiBsZW5ndGgpLCB0aGVuIHR3byBtaWQgc2hpcCAoMyBpbiBsZW5ndGgpLCB0aGVuIHRocmVlIHNtYWxsIHNoaXAgKDIgaW4gbGVuZ3RoKSBcclxuLy8gYWZ0ZXIgYWxsIHNoaXBzIGFyZSBwbGFjZWQsIGdhbWUgaW5pdGlhdGUgdG8gc3RhcnQgYXR0YWNraW5nIGJ5IGNob29zaW5nIHRoZSBvcHBvbmVudHMncyBnYW1lYm9hcmQuIFRoaXMgcGhhc2UgeW91IGNvdWxkIGhpdCBvcHBvbmVudHMncyBzaGlwLlxyXG4vLyBhZnRlciB5b3UgYXR0YWNrIG9wcG9uZW50J3Mgc2hpcCwgZ2FtZSBhdXRvbWF0aWNhbGx5IGNoYW5nZSB0byBvcHBvbmVudCdzIHR1cm4uIFRoaXMgdGltZSBPcHBvbmVudCdzIHdpbGwgaW5pdGlhdGUgYXR0YWNrIHBsYXllcidzIGdhbWVib2FyZCByYW5kb21seS5cclxuLy8gVGhlIEFJIGRvZXMgbm90IGhhdmUgdG8gYmUgc21hcnQsIGJ1dCBpdCBzaG91bGQga25vdyB3aGV0aGVyIG9yIG5vdCBhIGdpdmVuIG1vdmUgaXMgbGVnYWwuIChpLmUuIGl0IHNob3VsZG7igJl0IHNob290IHRoZSBzYW1lIGNvb3JkaW5hdGUgdHdpY2UpLiBcclxuLy8gR2FtZSByZXBlYXRpbmcgdGhlIHByZXZpb3VzIHN0ZXAgdW50aWwgb25lIG9mIHRoZSBwbGF5ZXIvQUkgc2hpcHMgYXJlIGZ1bGx5IGNsZWFuZWQgKGFsbCBkZXN0cm95ZWQpXHJcbi8vIGdhbWUgZW5kaW5nIGlmIG9uZSBvZiB0aGUgcGxheWVyL0FJIHRvdGFsIGhlYWx0aGJhciAoc2hpcHMpIGFyZSA9IDAuIFxyXG4vLyAxXHRDYXJyaWVyXHQ1XHJcbi8vIDJcdEJhdHRsZXNoaXBcdDRcclxuLy8gM1x0Q3J1aXNlclx0M1xyXG4vLyA0XHRTdWJtYXJpbmVcdDNcclxuLy8gNVx0RGVzdHJveWVyXHQyXHJcblxyXG5cclxuaW1wb3J0IHBsYXllciBmcm9tIFwiLi9wbGF5ZXIuanNcIjtcclxuaW1wb3J0IGdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmQuanNcIlxyXG5pbXBvcnQgc2hpcHMgZnJvbSBcIi4vc2hpcHMuanNcIjtcclxuaW1wb3J0IHBsYWNlUmFuZG9taXplciBmcm9tIFwiLi9wbGFjZVJhbmRvbWl6ZXIuanNcIjtcclxuaW1wb3J0IGZpbmRDb21tb25FbGVtZW50cyBmcm9tIFwiLi9maW5kQ29tbW9uRWxlbWVudHMuanNcIjtcclxuaW1wb3J0IHBsYWNlR2FwIGZyb20gXCIuL3BsYWNlR2FwLmpzXCI7XHJcbmltcG9ydCBjcmVhdGVHcmlkIGZyb20gXCIuL2xheW91dEdyaWQuanNcIjtcclxuaW1wb3J0IGxheW91dEdyaWRQbGFjZWRDb2xvciBmcm9tIFwiLi9sYXlvdXRHcmlkUGxhY2VkQ29sb3IuanNcIjtcclxuaW1wb3J0IG1hcmtlZEF0dGFjayBmcm9tIFwiLi9tYXJrZWRBdHRhY2suanNcIjtcclxuXHJcbmNyZWF0ZUdyaWQoJ0FJJyk7XHJcbmNyZWF0ZUdyaWQoJ3BsYXllcicpO1xyXG5jb25zdCBQTEFZRVJPTkUgPSBwbGF5ZXIoKTsgXHJcbmNvbnN0IEFJID0gcGxheWVyKCk7XHJcbmNvbnN0IHBsYXllckdhbWVib2FyZCA9IGdhbWVib2FyZCgpO1xyXG5jb25zdCBBSUdhbWVib2FyZCA9IGdhbWVib2FyZCgpO1xyXG5jb25zdCBnYW1lID0gc3RhcnRHYW1lKCk7XHJcblxyXG5mdW5jdGlvbiBzdGFydEdhbWUoKXtcclxuICAgIGZ1bmN0aW9uIHJhbmRvbVBsYWNlbWVudChib2FyZCwgdmFsKXsgLy8geW91IGNhbiB1c2UgdGhpcyByYW5kb21QbGFjZW1lbnQgd2l0aCBBSSBvciBQbGF5ZXJcclxuICAgICAgICBsZXQgbmV3U2hpcENvb3JkID0gcGxhY2VSYW5kb21pemVyKHZhbCk7XHJcbiAgICAgICAgbGV0IG5ld1NoaXBXaXRoR2FwID0gcGxhY2VHYXAobmV3U2hpcENvb3JkKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVSYW5kb21pemVXaXRoR2FwKCl7XHJcbiAgICAgICAgICAgIG5ld1NoaXBDb29yZCA9IHBsYWNlUmFuZG9taXplcih2YWwpO1xyXG4gICAgICAgICAgICBuZXdTaGlwV2l0aEdhcCA9IHBsYWNlR2FwKG5ld1NoaXBDb29yZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjaGVja0FuZEFkZEVsZW1lbnRzKG5ld2VzdCwgY3VycmVudCwgdmFsKXtcclxuICAgICAgICAgICAgaWYgKGZpbmRDb21tb25FbGVtZW50cyhuZXdlc3QsIGN1cnJlbnQpID09PSBmYWxzZSl7IC8vIGlmIHRoZXJlIElTIE5PVCBjb21tb24gZWxlbWVudHMgaW5zaWRlIG9mIGJvdGggYXJyYXkgKG5vdCBjbGFzaGVkKSwgcHJvY2VlZCB0byBhZGQgdG8gZ2FtZWJvYXJkXHJcbiAgICAgICAgICAgICAgICBib2FyZC5wbGFjZW1lbnQoc2hpcHMobmV3U2hpcENvb3JkKSk7XHJcbiAgICAgICAgICAgICAgICBib2FyZC5hZGRHYXBMb2NhdGlvbihwbGFjZUdhcChuZXdTaGlwQ29vcmQpKTtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgeyAvLyBpZiB0aGVyZSBJUyBjb21tb24gZWxlbWVudCBpbnNpZGUgYm90aCBhcnJheSwgcmFuZG9taXplIHRoZSBzaGlwIHBsYWNlbWVudCBhZ2FpbiwgdGhlbiByZXBlYXQgdGhpcyBmdW5jdGlvblxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2NsYXNoZWQgaW5pdGlhdGUgcmVjdXJlc2UgY2hlY2snKTtcclxuICAgICAgICAgICAgICAgIHJlUmFuZG9taXplV2l0aEdhcCgpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tBbmRBZGRFbGVtZW50cyhuZXdTaGlwQ29vcmQsIGJvYXJkLmFsbEdhcExvY2F0aW9uLCB2YWwpOyAvLyByZXBlYXQgdGhpcyBmdW5jdGlvbiBhZ2FpblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc3RhcnRzIGhlcmVcclxuICAgICAgICBjaGVja0FuZEFkZEVsZW1lbnRzKG5ld1NoaXBXaXRoR2FwLCBib2FyZC5hbGxHYXBMb2NhdGlvbiwgdmFsKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHNldFNoaXBSYW5kb20oYm9hcmQpe1xyXG4gICAgICAgIC8vIHBsYWNlIHRoZSBib2FyZCB5b3UgdXNlIGFuZCB0aGUgbGVuZ3RoIG9mIHNoaXAsIHRoZW4gcmFuZG9tUGxhY2VtZW50KCkgd2lsbCBwbGFjZSBpdCByYW5kb21seSBpbmNsdWRpbmcgZ2FwIGJldHdlZW4gc2hpcHNcclxuICAgICAgICByYW5kb21QbGFjZW1lbnQoYm9hcmQsNSk7IFxyXG4gICAgICAgIHJhbmRvbVBsYWNlbWVudChib2FyZCw0KTtcclxuICAgICAgICByYW5kb21QbGFjZW1lbnQoYm9hcmQsMyk7XHJcbiAgICAgICAgcmFuZG9tUGxhY2VtZW50KGJvYXJkLDMpO1xyXG4gICAgICAgIHJhbmRvbVBsYWNlbWVudChib2FyZCwyKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGVtcHR5VGhlR2FtZWJvYXJkKGJvYXJkLCB1c2VyKXtcclxuICAgICAgICBib2FyZC5kZWxldGVBbGxTaGlwKCk7XHJcbiAgICAgICAgbGF5b3V0R3JpZFBsYWNlZENvbG9yKGJvYXJkLCB1c2VyKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGF0dGFja01vZGUodXNlcil7XHJcbiAgICAgICAgY29uc3QgZ2FtZWxheW91dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3VzZXJ9R2FtZWJvYXJkYCk7IC8vIHN0aWxsIGJyb2tlIGV2ZXJ5IGF0dGFjayBtb2RlIGlzIGluaXRpYXRlZCBvdmVyMiBhZ2FpbiBzbywgNHggc3RhcnQgZ2FtZSA9IDR4IGF0dGFja21vZGUoKVxyXG4gICAgICAgIGNvbnN0IGFsbEdyaWQgPSBnYW1lbGF5b3V0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2RpdicpO1xyXG4gICAgICAgIGFsbEdyaWQuZm9yRWFjaCgoZ3JpZCk9PntcclxuICAgICAgICAgICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgICAgICAgICAgICBpZiggUExBWUVST05FLmNoZWNrQXR0YWNrKCkgPT0gXCJPRkZcIiApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChQTEFZRVJPTkUuY2hlY2tBdHRhY2soKSA9PSBcIk9OXCIgKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggZ3JpZC5jbGFzc05hbWUgKyAnIGF0dGFja2VkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgQUlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhncmlkLmNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgQUlHYW1lYm9hcmQuY2hlY2tUb3RhbEhlYWx0aCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmtlZEF0dGFjaygnQUknLCBncmlkLmNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUExBWUVST05FLnRvZ2dsZUF0dGFja09GRigpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFJLnRvZ2dsZUF0dGFja09OKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdG9nZ2xlIEFJIGF1dG8gQXR0YWNrXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGF0dGFja01vZGUoJ0FJJyk7XHJcbiAgICBhdHRhY2tNb2RlKCdwbGF5ZXInKTtcclxuICAgIFxyXG4gICAgZnVuY3Rpb24gYXV0b0F0dGFja0FJKCl7XHJcbiAgICAgICAgLy8gcGljayByYW5kb21pemVkIGdyaWQgZnJvbSBsYXlvdXRcclxuICAgICAgICAvLyBsYXVuY2ggYXR0YWNrKCkgb24gdGhhdCBncmlkXHJcbiAgICAgICAgLy8gY2hlY2sgZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soKVxyXG4gICAgICAgIC8vIGlmIG1pc3NlZCBvciBoaXQgcmVjZWl2ZUF0dGFjaygpIHdpbGwgc29ydCBpdCBvdXRcclxuICAgICAgICAvLyBjaGVjayBnYW1lYm9hcmQuYWxsTG9jYXRpb24oKSB0byBzZWUgaWYgaXQgaXMgZW5kZ2FtZSBvciBub3QgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc3RhcnRWc0FJOiAoKT0+e1xyXG4gICAgICAgICAgICBlbXB0eVRoZUdhbWVib2FyZChwbGF5ZXJHYW1lYm9hcmQsICdwbGF5ZXInKTtcclxuICAgICAgICAgICAgZW1wdHlUaGVHYW1lYm9hcmQoQUlHYW1lYm9hcmQsICdBSScpO1xyXG4gICAgICAgICAgICBzZXRTaGlwUmFuZG9tKEFJR2FtZWJvYXJkKTtcclxuICAgICAgICAgICAgc2V0U2hpcFJhbmRvbShwbGF5ZXJHYW1lYm9hcmQpO1xyXG4gICAgICAgICAgICBsYXlvdXRHcmlkUGxhY2VkQ29sb3IocGxheWVyR2FtZWJvYXJkLCAncGxheWVyJyk7XHJcbiAgICAgICAgICAgIFBMQVlFUk9ORS50b2dnbGVBdHRhY2tPTigpO1xyXG4gICAgICAgICAgICAvLyBsYXlvdXRHcmlkUGxhY2VkQ29sb3IoQUlHYW1lYm9hcmQsICdBSScpO1xyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlc3RhcnRHYW1lOiAoKT0+IHtcclxuICAgICAgICAgICAgZW1wdHlUaGVHYW1lYm9hcmQocGxheWVyR2FtZWJvYXJkLCAncGxheWVyJyk7XHJcbiAgICAgICAgICAgIGVtcHR5VGhlR2FtZWJvYXJkKEFJR2FtZWJvYXJkLCAnQUknKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0YXJ0R2FtZUJ0bigpe1xyXG4gICAgY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnRHYW1lQnRuJyk7XHJcbiAgICBjb25zdCByZXN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3RhcnRCdG4nKTtcclxuXHJcbiAgICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1BsYXkgdGhlIGdhbWUhJyk7XHJcbiAgICAgICAgZ2FtZS5zdGFydFZzQUkoKTtcclxuICAgIH0pO1xyXG4gICAgcmVzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3Jlc3RhcnRlZCcpO1xyXG4gICAgICAgIGdhbWUucmVzdGFydEdhbWUoKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5zdGFydEdhbWVCdG4oKVxyXG5cclxuY29uc29sZS5sb2coJ0dhbWUgUmVhZHknKTtcclxuZXhwb3J0IHtQTEFZRVJPTkUsIHBsYXllckdhbWVib2FyZCwgQUksIEFJR2FtZWJvYXJkfSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==