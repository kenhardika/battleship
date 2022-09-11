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
    let gapLocation = [];

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
                gapLocation.push(arr);
            });
        }, 
        checkGapLocation: ()=> {
            console.log(gapLocation);
            return gapLocation
        },
        checkAttackMissed: ()=>{
            console.log(attackMissed);
            return attackMissed
        },
        gapLocation,
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

/***/ "./src/layoutGridPlacedColor.js":
/*!**************************************!*\
  !*** ./src/layoutGridPlacedColor.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _maingame__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./maingame */ "./src/maingame.js");


function layoutGridPlacedColor(gameboard, user){
    let currentGap = gameboard.gapLocation;
    let currentShip = gameboard.checkAllLocation();
    // console.log(currentGap);
    if (!currentGap){
        return
    }
    else {
        currentGap.forEach((arrayLoc)=>{
                let layer = document.querySelector(`.${user}Gameboard`);
                let gap = layer.querySelector(`.${arrayLoc}`);
                gap.classList.add('gap');
            // let layer = document.querySelector(`.${loc}`);
            // layer.classList.add('placed');
        });

        currentShip.forEach((curship)=>{
            let layer = document.querySelector(`.${user}Gameboard`);
            let ship = layer.querySelector(`.${curship}`);
            ship.classList.add('ship');
        });
        // console.log(currentShip);

    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (layoutGridPlacedColor);

/***/ }),

/***/ "./src/maingame.js":
/*!*************************!*\
  !*** ./src/maingame.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
    let totalGap = [];
    function AIPlacement(val){
        let newShipCoord = (0,_placeRandomizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(val);
        let newShipWithGap = (0,_placeGap_js__WEBPACK_IMPORTED_MODULE_5__["default"])(newShipCoord);

        function AIPlaceShip(ship){
            AIGameboard.placement((0,_ships_js__WEBPACK_IMPORTED_MODULE_2__["default"])(ship));
        }

        function AIPlaceGap(ship){
            AIGameboard.addGapLocation(
                (0,_placeGap_js__WEBPACK_IMPORTED_MODULE_5__["default"])(ship)
            );
        }

        function addTotalGap(){
            // merge the array
          totalGap = totalGap.concat(newShipWithGap);
          totalGap = [...new Set ([...newShipWithGap])];  
        //   console.log('total gap under me')
        //   console.log(totalGap);
        }

        function checkCommonElements(newest, current, val){
            if ((0,_findCommonElements_js__WEBPACK_IMPORTED_MODULE_4__["default"])(newest, current) === true){
                console.log('clashed initiate recurese check')
                newShipCoord = (0,_placeRandomizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(val);
                newShipWithGap = (0,_placeGap_js__WEBPACK_IMPORTED_MODULE_5__["default"])(newShipCoord);
                checkCommonElements(newShipCoord, AIGameboard.gapLocation, val);
            }
            else {
                AIPlaceShip(newShipCoord);
                AIPlaceGap(newShipCoord);
                addTotalGap();
                // add total gap
            }
        }

        // starts here
        // changing into include the gap
        console.log('totalGap and Gap location under me')
        console.log(totalGap);
        console.log(AIGameboard.gapLocation);
        if((0,_findCommonElements_js__WEBPACK_IMPORTED_MODULE_4__["default"])(newShipWithGap, AIGameboard.gapLocation) === true){
            console.log('clashed: reset initialize');
            newShipCoord = (0,_placeRandomizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(val);
            newShipWithGap = (0,_placeGap_js__WEBPACK_IMPORTED_MODULE_5__["default"])(newShipCoord);
            checkCommonElements(newShipWithGap, AIGameboard.gapLocation, val);
            // CarrierGap = placeGap(newShipCoord);
        } else {
            AIPlaceShip(newShipCoord);
            AIPlaceGap(newShipCoord);
            addTotalGap();
            // add totalgap 
        }
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



//startGame().versusAI();

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/maingame.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWU7Ozs7Ozs7Ozs7Ozs7O0FDSmY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsU0FBUyxFQUFDO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3Qiw2QkFBNkI7QUFDN0IsNkJBQTZCO0FBQzdCLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzVHQTtBQUNBO0FBQ0EsNkNBQTZDLEtBQUs7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixnQkFBZ0I7QUFDdEM7QUFDQSw4QkFBOEIsSUFBSSxFQUFFLEVBQUU7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLEtBQUs7QUFDTCxzQkFBc0IsZUFBZTtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlOzs7Ozs7Ozs7Ozs7Ozs7QUN4QjBCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELEtBQUs7QUFDNUQsa0RBQWtELFNBQVM7QUFDM0Q7QUFDQSxzREFBc0QsSUFBSTtBQUMxRDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsbURBQW1ELEtBQUs7QUFDeEQsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUJmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2lDO0FBQ0s7QUFDUDtBQUNvQjtBQUNNO0FBQ3BCO0FBQ0k7QUFDc0I7QUFDL0Q7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQixnQ0FBZ0M7QUFDaEM7QUFDQSwwREFBVTtBQUNWLDBEQUFVO0FBQ1Ysa0JBQWtCLHNEQUFNO0FBQ3hCLFdBQVcsc0RBQU07QUFDakIsd0JBQXdCLHlEQUFTO0FBQ2pDLG9CQUFvQix5REFBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQiwrREFBZTtBQUMxQyw2QkFBNkIsd0RBQVE7QUFDckM7QUFDQTtBQUNBLGtDQUFrQyxxREFBSztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix3REFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isa0VBQWtCO0FBQ2xDO0FBQ0EsK0JBQStCLCtEQUFlO0FBQzlDLGlDQUFpQyx3REFBUTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGtFQUFrQjtBQUM3QjtBQUNBLDJCQUEyQiwrREFBZTtBQUMxQyw2QkFBNkIsd0RBQVE7QUFDckM7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUVBQXFCO0FBQ3JCO0FBQ29EO0FBQ3BEO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDckhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxRUFBcUU7QUFDckU7QUFDQTtBQUNBLHNFQUFzRTtBQUN0RTtBQUNBO0FBQ0Esc0VBQXNFO0FBQ3RFO0FBQ0E7QUFDQSxxRUFBcUU7QUFDckU7QUFDQTtBQUNBLDZFQUE2RTtBQUM3RTtBQUNBO0FBQ0EsNEVBQTRFO0FBQzVFO0FBQ0E7QUFDQSw4RUFBOEU7QUFDOUU7QUFDQTtBQUNBLDZFQUE2RTtBQUM3RTtBQUNBLDREQUE0RDtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRUFBZ0U7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdFQUFnRTtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWU7Ozs7Ozs7Ozs7Ozs7O0FDdEpmO0FBQ0EseUJBQXlCO0FBQ3pCLHNEQUFzRDtBQUN0RDtBQUNBO0FBQ0EsNEVBQTRFO0FBQzVFLDRHQUE0RztBQUM1RztBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCLHdCQUF3QixTQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLHdCQUF3QixTQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlOzs7Ozs7Ozs7Ozs7OztBQzdCZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsTUFBTTs7Ozs7Ozs7Ozs7Ozs7QUMvQnJCO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWU7Ozs7OztVQ3RFZjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmluZENvbW1vbkVsZW1lbnRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbGF5b3V0R3JpZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2xheW91dEdyaWRQbGFjZWRDb2xvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21haW5nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxhY2VHYXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGFjZVJhbmRvbWl6ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGZpbmRDb21tb25FbGVtZW50cyhhcnIxLCBhcnIyKSB7XHJcbiAgICByZXR1cm4gYXJyMS5zb21lKGl0ZW0gPT4gYXJyMi5pbmNsdWRlcyhpdGVtKSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZmluZENvbW1vbkVsZW1lbnRzIiwiXHJcbmNvbnN0IGdhbWVib2FyZCA9ICgpPT4ge1xyXG4gICAgbGV0IGFsbFNoaXAgPSBbXTtcclxuICAgIGxldCB0b3RhbEhlYWx0aCA9IDA7XHJcbiAgICBsZXQgYWxsTG9jYXRpb24gPSBbXTtcclxuICAgIGxldCBhdHRhY2tNaXNzZWQgPSBbXTtcclxuICAgIGxldCBnYXBMb2NhdGlvbiA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJlZnJlc2hBbGxMb2NhdGlvbigpe1xyXG4gICAgICAgIGxldCBuZXdMb2NhdGlvbiA9IFtdO1xyXG4gICAgICAgIGFsbFNoaXAuZm9yRWFjaCgoc2hpcCk9PntcclxuICAgICAgICAgICAgbmV3TG9jYXRpb24gPSBuZXdMb2NhdGlvbi5jb25jYXQoc2hpcC5sb2NhdGlvbigpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhbGxMb2NhdGlvbiA9IG5ld0xvY2F0aW9uO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gYXR0YWNrTWlzc2VkQ291bnRlcihjb29yKXtcclxuICAgICAgICBhdHRhY2tNaXNzZWQucHVzaChjb29yKTtcclxuICAgIH1cclxuXHJcbiAgICAvL2NvbnNvbGUubG9nKCdnYW1lYm9hcmQgaXMgb24nKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcGxhY2VtZW50OiAoc2hpcHMpPT57IC8vIGRvbnQgbmVlZCBjb29yIHNpbmNlIGNvb3JkaW5hdGUgc2hvdWxkIGJlIGluc2lkZSB0aGUgc2hpcCgpXHJcbiAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgY29vcmRpbmF0ZSBpcyB2YWxpZCwgd2hpY2ggbWVhbnMgZW1wdHkgYW5kIG9uZSBibG9jayBhd2F5IGZyb20gYW5vdGhlciBzaGlwXHJcbiAgICAgICAgICAgIC8vIHBsYWNlIHRoZSBzaGlwcyBvbiB0aGUgY29vcmRpbmF0ZSAgICAgXHJcbiAgICAgICAgICAgIGFsbFNoaXAucHVzaChzaGlwcyk7XHJcbiAgICAgICAgICAgIGFsbExvY2F0aW9uID0gYWxsTG9jYXRpb24uY29uY2F0KHNoaXBzLmxvY2F0aW9uKCkpO1xyXG4gICAgICAgICAgICAvLyBtYXJrcyB0aGUgY29vcmRpbmF0ZSB3aXRoIHNoaXBzJyBtYXJrc1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlY2VpdmVBdHRhY2s6IChjb29yKT0+e1xyXG4gICAgICAgICAgICBpZihhbGxMb2NhdGlvbi5pbmNsdWRlcyhjb29yKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0F0dGFjayBtaXNzZWQnKVxyXG4gICAgICAgICAgICAgICAgYXR0YWNrTWlzc2VkQ291bnRlcihjb29yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQXR0YWNrIEhpdCEnKVxyXG4gICAgICAgICAgICAgICAgYWxsU2hpcC5mb3JFYWNoKChzaGlwKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHNoaXAuaGl0KGNvb3IpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyByZWZyZXNoIHRoZSBhbGxMb2NhdGlvbiBBcnJheSBzbyB5b3UgY2Fubm90IGhpdCB0d2ljZSBvbiB0aGUgc2FtZSBjb29yZGluYXRlXHJcbiAgICAgICAgICAgICAgICByZWZyZXNoQWxsTG9jYXRpb24oKVxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAvLyB0b2dnbGUgY2hlY2tBbGxTaGlwKCkgdG8gbWFrZSBzdXJlIGlmIGl0cyBub3QgZW5kZ2FtZVxyXG4gICAgICAgICAgICAvLyBpZiBub3QgbWFya3MgdGhlIGNvb3JkaW5hdGUgd2l0aCBtaXNzZWRBdHRhY2soKVxyXG4gICAgICAgICAgICAvL3JldHVyblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2hlY2tUb3RhbEhlYWx0aDogKCk9PntcclxuICAgICAgICAgICAgLy8gY2hlY2sgdGhlIGhlYWx0aGJhciBvZiBlYWNoIHNoaXBzIHdpdGggc2hpcC5oZWFsdGhiYXIoKVxyXG4gICAgICAgICAgICBhbGxTaGlwLmZvckVhY2goKHNoaXApPT57XHJcbiAgICAgICAgICAgICAgICBzaGlwLmxvY2F0aW9uKCk7IFxyXG4gICAgICAgICAgICAgICAgdG90YWxIZWFsdGggPSB0b3RhbEhlYWx0aCArIHNoaXAuaGVhbHRoQmFyKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0b3RhbEhlYWx0aCk7XHJcbiAgICAgICAgICAgIC8vIGlmIGFsbCB0aGUgaGVhbHRoYmFyIGlzIDAgdGhlbiB0aGUgZ2FtZSBpcyBlbmRlZFxyXG4gICAgICAgICAgICBpZih0b3RhbEhlYWx0aCA8PSAwKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR0FNRSBPVkVSIEFMTCBPRiBZT1VSIFNISVBTIFdSRUNLRURcIilcclxuICAgICAgICAgICAgICAgIHJldHVybiB0b3RhbEhlYWx0aFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG90YWxIZWFsdGhcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoZWNrQWxsTG9jYXRpb246ICgpPT57XHJcbiAgICAgICAgICAgIHJlZnJlc2hBbGxMb2NhdGlvbigpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhbGxMb2NhdGlvbik7XHJcbiAgICAgICAgICAgIHJldHVybiBhbGxMb2NhdGlvblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWRkR2FwTG9jYXRpb246IChhcnJheSk9PiB7XHJcbiAgICAgICAgICAgIC8vIGdhcExvY2F0aW9uLnB1c2goYXJyYXkpO1xyXG4gICAgICAgICAgICBhcnJheS5mb3JFYWNoKChhcnIpPT57XHJcbiAgICAgICAgICAgICAgICBnYXBMb2NhdGlvbi5wdXNoKGFycik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIFxyXG4gICAgICAgIGNoZWNrR2FwTG9jYXRpb246ICgpPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhnYXBMb2NhdGlvbik7XHJcbiAgICAgICAgICAgIHJldHVybiBnYXBMb2NhdGlvblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2hlY2tBdHRhY2tNaXNzZWQ6ICgpPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGF0dGFja01pc3NlZCk7XHJcbiAgICAgICAgICAgIHJldHVybiBhdHRhY2tNaXNzZWRcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdhcExvY2F0aW9uLFxyXG4gICAgICAgIGFsbExvY2F0aW9uXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdhbWVib2FyZDtcclxuXHJcbi8vIGNvbnN0IHBsYXlhID0gZ2FtZWJvYXJkKCk7XHJcbi8vIGNvbnN0IGJpZ1NoaXBDb29yID0gJzZCIDdCIDhCIDlCIDEwQic7XHJcbi8vIGNvbnN0IG1pZFNoaXBDb29yID0gJzRCIDRDIDREJztcclxuLy8gY29uc3QgbWlkU2hpcCA9IHNoaXBzKG1pZFNoaXBDb29yKTtcclxuLy8gY29uc3QgYmlnU2hpcCA9IHNoaXBzKGJpZ1NoaXBDb29yKTtcclxuXHJcbi8vIHBsYXlhLnBsYWNlbWVudChiaWdTaGlwKTtcclxuLy8gcGxheWEucGxhY2VtZW50KG1pZFNoaXApO1xyXG4vLyBwbGF5YS5yZWNlaXZlQXR0YWNrKFwiNEJcIik7ZGVidWdnZXJcclxuLy8gcGxheWEucmVjZWl2ZUF0dGFjayhcIjRDXCIpO2RlYnVnZ2VyXHJcbi8vIHBsYXlhLnJlY2VpdmVBdHRhY2soXCI0RFwiKTtkZWJ1Z2dlclxyXG4vLyBwbGF5YS5yZWNlaXZlQXR0YWNrKFwiM0JcIik7ZGVidWdnZXJcclxuLy8gcGxheWEuY2hlY2tBbGxMb2NhdGlvbigpO1xyXG4vLyBwbGF5YS5jaGVja0F0dGFja01pc3NlZCgpO1xyXG4vLyBwbGF5YS5jaGVja1RvdGFsSGVhbHRoKCk7IFxyXG4vLyByZXZpc2UgdGhpc1xyXG4vLyBwbGF5YS5wbGFjZW1lbnQoJzFBIDJBIDNBJywgc2hpcHMoMykpO1xyXG4vLyBwbGF5YS5wbGFjZW1lbnQoJzNCIDRCJywgc2hpcHMoMikpO1xyXG4vLyBwbGF5YS5wbGFjZW1lbnQoJzZCIDdCIDhCIDlCIDEwQicsIHNoaXBzKDUpKTtcclxuLy8gcGxheWEucGxhY2VtZW50KCc2RSA3RSA4RSA5RSAxMEUnLCBzaGlwcyg1KSk7IiwiXHJcbmZ1bmN0aW9uIGNyZWF0ZUdyaWQod2hvcyl7XHJcbiAgICBjb25zdCBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3dob3N9R2FtZWJvYXJkYCk7XHJcbiAgICBjb25zdCBNQVhfV0lEVEggPSAxMDtcclxuICAgIGNvbnN0IGFscGhhYmV0ID0gJ2FiY2RlZmdoaWonO1xyXG4gICAgY29uc3QgYWxwaEFycmF5ID0gYWxwaGFiZXQuc3BsaXQoJycpO1xyXG5cclxuICAgIGFscGhBcnJheS5mb3JFYWNoKChhbHApPT57XHJcbiAgICAgICAgZm9yIChsZXQgaT0xOyBpIDw9IE1BWF9XSURUSDsgaSsrICl7XHJcbiAgICAgICAgICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgZ3JpZC5jbGFzc05hbWU9YCR7YWxwfSR7aX1gO1xyXG4gICAgICAgICAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGdyaWQuY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgIC8vIGNsaWNrZWQgdGhlIGdyaWRcclxuICAgICAgICAgICAgICAgIC8vIGluaXRpYXRlIGF0dGFjaygpIC8vIHRoZW4gQUkgYXR0YWNrIHlvdXJzIHRvb1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBsYXllci5hcHBlbmQoZ3JpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvLyBmb3IobGV0IGkgPSAwOyBpIDwgTUFYX1dJRFRIOyBpKyspe1xyXG4gICAgLy8gICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIC8vIH1cclxuXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlR3JpZCIsImltcG9ydCB7IEFJR2FtZWJvYXJkIH0gZnJvbSBcIi4vbWFpbmdhbWVcIjtcclxuXHJcbmZ1bmN0aW9uIGxheW91dEdyaWRQbGFjZWRDb2xvcihnYW1lYm9hcmQsIHVzZXIpe1xyXG4gICAgbGV0IGN1cnJlbnRHYXAgPSBnYW1lYm9hcmQuZ2FwTG9jYXRpb247XHJcbiAgICBsZXQgY3VycmVudFNoaXAgPSBnYW1lYm9hcmQuY2hlY2tBbGxMb2NhdGlvbigpO1xyXG4gICAgLy8gY29uc29sZS5sb2coY3VycmVudEdhcCk7XHJcbiAgICBpZiAoIWN1cnJlbnRHYXApe1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY3VycmVudEdhcC5mb3JFYWNoKChhcnJheUxvYyk9PntcclxuICAgICAgICAgICAgICAgIGxldCBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3VzZXJ9R2FtZWJvYXJkYCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZ2FwID0gbGF5ZXIucXVlcnlTZWxlY3RvcihgLiR7YXJyYXlMb2N9YCk7XHJcbiAgICAgICAgICAgICAgICBnYXAuY2xhc3NMaXN0LmFkZCgnZ2FwJyk7XHJcbiAgICAgICAgICAgIC8vIGxldCBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2xvY31gKTtcclxuICAgICAgICAgICAgLy8gbGF5ZXIuY2xhc3NMaXN0LmFkZCgncGxhY2VkJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGN1cnJlbnRTaGlwLmZvckVhY2goKGN1cnNoaXApPT57XHJcbiAgICAgICAgICAgIGxldCBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3VzZXJ9R2FtZWJvYXJkYCk7XHJcbiAgICAgICAgICAgIGxldCBzaGlwID0gbGF5ZXIucXVlcnlTZWxlY3RvcihgLiR7Y3Vyc2hpcH1gKTtcclxuICAgICAgICAgICAgc2hpcC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coY3VycmVudFNoaXApO1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbGF5b3V0R3JpZFBsYWNlZENvbG9yIiwiLy8gaW4gdGhpcyBmaWxlIHdlIGFyZSBnb25uYSBnYXRoZXIgYWxsIHRoZSBjb21wb25lbnRzIG9mIEJhdHRsZXNoaXAgVGhlIEdhbWUgYW5kIHR1cm4gaXQgaW50byByZWFsIGdhbWVcclxuXHJcbi8vIHBsYXllci4gV2hhdCBkb2VzIHBsYXllciBkby5cclxuLy8gcGxheWVyIHN0YXJ0IHRoZSBnYW1lIGJ5IGNob29zaW5nIHdobyB5b3VyZSBwbGF5aW5nIHdpdGhcclxuLy8gcGxheWVyIGNob29zZSBpcyBpdCBnb25uYSBiZSB2cyBBSSBvciB2cyBIdW1hblxyXG4vLyBhdCB0aGlzIHBvaW50LCBpZiB5b3UgY2hvb3NlIEFJLiBBSSB3aWxsIGF1dG9tYXRpY2FsbHkgcGxhY2UgdGhlaXIgc2hpcHMgcmFuZG9tbHkgb24gZ2FtZWJvYXJkLlxyXG4vLyBwbGF5ZXIgY2hvb3NlIHRoZSBzaGlwcyBwbGFjZW1lbnQgYWNjcm9zcyB0aGUgZ2FtZWJvYXJkLlxyXG4vLyBzaGlwJ3MgcGxhY2VtZW50IGlzIGJhc2VkIG9uIG9uZSBydWxlIHRoYXQgdGhlcmUgaXMgYWx3YXlzIG9uZSBlbXB0eSBibG9jayBiZXR3ZWVuIG9uZSBhbmQgYW5vdGhlciBwbGFjZWQgc2hpcHNcclxuLy8gcGxheWVyIGhhdmUgYSBjaG9pY2UgdG8gcmFuZG9tbHkgcGxhY2UgdGhlIHNoaXBzIGJ5IGNsaWNraW5nIHRoZSByYW5kb20gYnV0dG9uLiBcclxuLy8gcGxheWVyIHBsYWNlbWVudCBvcmRlciBpcy4uIGZpcnN0IHlvdSBwbGFjZSBvbmUgYmlnIHNoaXAgKDUgaW4gbGVuZ3RoKSwgdGhlbiB0d28gbWlkIHNoaXAgKDMgaW4gbGVuZ3RoKSwgdGhlbiB0aHJlZSBzbWFsbCBzaGlwICgyIGluIGxlbmd0aCkgXHJcbi8vIGFmdGVyIGFsbCBzaGlwcyBhcmUgcGxhY2VkLCBnYW1lIGluaXRpYXRlIHRvIHN0YXJ0IGF0dGFja2luZyBieSBjaG9vc2luZyB0aGUgb3Bwb25lbnRzJ3MgZ2FtZWJvYXJkLiBUaGlzIHBoYXNlIHlvdSBjb3VsZCBoaXQgb3Bwb25lbnRzJ3Mgc2hpcC5cclxuLy8gYWZ0ZXIgeW91IGF0dGFjayBvcHBvbmVudCdzIHNoaXAsIGdhbWUgYXV0b21hdGljYWxseSBjaGFuZ2UgdG8gb3Bwb25lbnQncyB0dXJuLiBUaGlzIHRpbWUgT3Bwb25lbnQncyB3aWxsIGluaXRpYXRlIGF0dGFjayBwbGF5ZXIncyBnYW1lYm9hcmQgcmFuZG9tbHkuXHJcbi8vIFRoZSBBSSBkb2VzIG5vdCBoYXZlIHRvIGJlIHNtYXJ0LCBidXQgaXQgc2hvdWxkIGtub3cgd2hldGhlciBvciBub3QgYSBnaXZlbiBtb3ZlIGlzIGxlZ2FsLiAoaS5lLiBpdCBzaG91bGRu4oCZdCBzaG9vdCB0aGUgc2FtZSBjb29yZGluYXRlIHR3aWNlKS4gXHJcbi8vIEdhbWUgcmVwZWF0aW5nIHRoZSBwcmV2aW91cyBzdGVwIHVudGlsIG9uZSBvZiB0aGUgcGxheWVyL0FJIHNoaXBzIGFyZSBmdWxseSBjbGVhbmVkIChhbGwgZGVzdHJveWVkKVxyXG4vLyBnYW1lIGVuZGluZyBpZiBvbmUgb2YgdGhlIHBsYXllci9BSSB0b3RhbCBoZWFsdGhiYXIgKHNoaXBzKSBhcmUgPSAwLiBcclxuLy8gMVx0Q2Fycmllclx0NVxyXG4vLyAyXHRCYXR0bGVzaGlwXHQ0XHJcbi8vIDNcdENydWlzZXJcdDNcclxuLy8gNFx0U3VibWFyaW5lXHQzXHJcbi8vIDVcdERlc3Ryb3llclx0MlxyXG5cclxuXHJcbmltcG9ydCBwbGF5ZXIgZnJvbSBcIi4vcGxheWVyLmpzXCI7XHJcbmltcG9ydCBnYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCJcclxuaW1wb3J0IHNoaXBzIGZyb20gXCIuL3NoaXBzLmpzXCI7XHJcbmltcG9ydCBwbGFjZVJhbmRvbWl6ZXIgZnJvbSBcIi4vcGxhY2VSYW5kb21pemVyLmpzXCI7XHJcbmltcG9ydCBmaW5kQ29tbW9uRWxlbWVudHMgZnJvbSBcIi4vZmluZENvbW1vbkVsZW1lbnRzLmpzXCI7XHJcbmltcG9ydCBwbGFjZUdhcCBmcm9tIFwiLi9wbGFjZUdhcC5qc1wiO1xyXG5pbXBvcnQgY3JlYXRlR3JpZCBmcm9tIFwiLi9sYXlvdXRHcmlkLmpzXCI7XHJcbmltcG9ydCBsYXlvdXRHcmlkUGxhY2VkQ29sb3IgZnJvbSBcIi4vbGF5b3V0R3JpZFBsYWNlZENvbG9yLmpzXCI7XHJcblxyXG5cclxuLy8gY29uc29sZS5sb2coUExBWUVST05FKTtkZWJ1Z2dlclxyXG4vLyBjb25zb2xlLmxvZyhwbGF5ZXJHYW1lYm9hcmQpO2RlYnVnZ2VyXHJcblxyXG5jcmVhdGVHcmlkKCdBSScpO1xyXG5jcmVhdGVHcmlkKCdwbGF5ZXInKTtcclxuY29uc3QgUExBWUVST05FID0gcGxheWVyKCk7IFxyXG5jb25zdCBBSSA9IHBsYXllcigpO1xyXG5jb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuY29uc3QgQUlHYW1lYm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuXHJcbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpe1xyXG4gICAgbGV0IHRvdGFsR2FwID0gW107XHJcbiAgICBmdW5jdGlvbiBBSVBsYWNlbWVudCh2YWwpe1xyXG4gICAgICAgIGxldCBuZXdTaGlwQ29vcmQgPSBwbGFjZVJhbmRvbWl6ZXIodmFsKTtcclxuICAgICAgICBsZXQgbmV3U2hpcFdpdGhHYXAgPSBwbGFjZUdhcChuZXdTaGlwQ29vcmQpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBBSVBsYWNlU2hpcChzaGlwKXtcclxuICAgICAgICAgICAgQUlHYW1lYm9hcmQucGxhY2VtZW50KHNoaXBzKHNoaXApKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIEFJUGxhY2VHYXAoc2hpcCl7XHJcbiAgICAgICAgICAgIEFJR2FtZWJvYXJkLmFkZEdhcExvY2F0aW9uKFxyXG4gICAgICAgICAgICAgICAgcGxhY2VHYXAoc2hpcClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZFRvdGFsR2FwKCl7XHJcbiAgICAgICAgICAgIC8vIG1lcmdlIHRoZSBhcnJheVxyXG4gICAgICAgICAgdG90YWxHYXAgPSB0b3RhbEdhcC5jb25jYXQobmV3U2hpcFdpdGhHYXApO1xyXG4gICAgICAgICAgdG90YWxHYXAgPSBbLi4ubmV3IFNldCAoWy4uLm5ld1NoaXBXaXRoR2FwXSldOyAgXHJcbiAgICAgICAgLy8gICBjb25zb2xlLmxvZygndG90YWwgZ2FwIHVuZGVyIG1lJylcclxuICAgICAgICAvLyAgIGNvbnNvbGUubG9nKHRvdGFsR2FwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrQ29tbW9uRWxlbWVudHMobmV3ZXN0LCBjdXJyZW50LCB2YWwpe1xyXG4gICAgICAgICAgICBpZiAoZmluZENvbW1vbkVsZW1lbnRzKG5ld2VzdCwgY3VycmVudCkgPT09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NsYXNoZWQgaW5pdGlhdGUgcmVjdXJlc2UgY2hlY2snKVxyXG4gICAgICAgICAgICAgICAgbmV3U2hpcENvb3JkID0gcGxhY2VSYW5kb21pemVyKHZhbCk7XHJcbiAgICAgICAgICAgICAgICBuZXdTaGlwV2l0aEdhcCA9IHBsYWNlR2FwKG5ld1NoaXBDb29yZCk7XHJcbiAgICAgICAgICAgICAgICBjaGVja0NvbW1vbkVsZW1lbnRzKG5ld1NoaXBDb29yZCwgQUlHYW1lYm9hcmQuZ2FwTG9jYXRpb24sIHZhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBBSVBsYWNlU2hpcChuZXdTaGlwQ29vcmQpO1xyXG4gICAgICAgICAgICAgICAgQUlQbGFjZUdhcChuZXdTaGlwQ29vcmQpO1xyXG4gICAgICAgICAgICAgICAgYWRkVG90YWxHYXAoKTtcclxuICAgICAgICAgICAgICAgIC8vIGFkZCB0b3RhbCBnYXBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gc3RhcnRzIGhlcmVcclxuICAgICAgICAvLyBjaGFuZ2luZyBpbnRvIGluY2x1ZGUgdGhlIGdhcFxyXG4gICAgICAgIGNvbnNvbGUubG9nKCd0b3RhbEdhcCBhbmQgR2FwIGxvY2F0aW9uIHVuZGVyIG1lJylcclxuICAgICAgICBjb25zb2xlLmxvZyh0b3RhbEdhcCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coQUlHYW1lYm9hcmQuZ2FwTG9jYXRpb24pO1xyXG4gICAgICAgIGlmKGZpbmRDb21tb25FbGVtZW50cyhuZXdTaGlwV2l0aEdhcCwgQUlHYW1lYm9hcmQuZ2FwTG9jYXRpb24pID09PSB0cnVlKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NsYXNoZWQ6IHJlc2V0IGluaXRpYWxpemUnKTtcclxuICAgICAgICAgICAgbmV3U2hpcENvb3JkID0gcGxhY2VSYW5kb21pemVyKHZhbCk7XHJcbiAgICAgICAgICAgIG5ld1NoaXBXaXRoR2FwID0gcGxhY2VHYXAobmV3U2hpcENvb3JkKTtcclxuICAgICAgICAgICAgY2hlY2tDb21tb25FbGVtZW50cyhuZXdTaGlwV2l0aEdhcCwgQUlHYW1lYm9hcmQuZ2FwTG9jYXRpb24sIHZhbCk7XHJcbiAgICAgICAgICAgIC8vIENhcnJpZXJHYXAgPSBwbGFjZUdhcChuZXdTaGlwQ29vcmQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEFJUGxhY2VTaGlwKG5ld1NoaXBDb29yZCk7XHJcbiAgICAgICAgICAgIEFJUGxhY2VHYXAobmV3U2hpcENvb3JkKTtcclxuICAgICAgICAgICAgYWRkVG90YWxHYXAoKTtcclxuICAgICAgICAgICAgLy8gYWRkIHRvdGFsZ2FwIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHZlcnN1c0FJOiAoKT0+e1xyXG4gICAgICAgICAgICBBSVBsYWNlbWVudCg1KTtcclxuICAgICAgICAgICAgQUlQbGFjZW1lbnQoNCk7XHJcbiAgICAgICAgICAgIEFJUGxhY2VtZW50KDMpO1xyXG4gICAgICAgICAgICBBSVBsYWNlbWVudCgzKTtcclxuICAgICAgICAgICAgQUlQbGFjZW1lbnQoMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbnN0YXJ0R2FtZSgpLnZlcnN1c0FJKCk7XHJcbkFJR2FtZWJvYXJkLmNoZWNrQWxsTG9jYXRpb24oKTtcclxuQUlHYW1lYm9hcmQuY2hlY2tUb3RhbEhlYWx0aCgpO1xyXG5sYXlvdXRHcmlkUGxhY2VkQ29sb3IoQUlHYW1lYm9hcmQsICdBSScpO1xyXG5cclxuZXhwb3J0IHtQTEFZRVJPTkUsIHBsYXllckdhbWVib2FyZCwgQUksIEFJR2FtZWJvYXJkfVxyXG5cclxuLy9zdGFydEdhbWUoKS52ZXJzdXNBSSgpOyIsIi8vIHNldCBnYXAgYnkgb25lIGJ5IG9uZSBsb29wIGNoZWNrXHJcblxyXG5mdW5jdGlvbiBwbGFjZUdhcChtYWluQXJyYXkpe1xyXG4gICAgbGV0IG91dHB1dEFycmF5ID0gW107XHJcbiAgICBsZXQgcmVzdWx0QXJyYXkgPSBbXTtcclxuICAgIGNvbnN0IG51bWJlclBhdHQgPSAvWzAtOV0vZztcclxuICAgIGNvbnN0IGFscGhhUGF0dCA9IC9bYS16QS1aXS9nO1xyXG4gICAgY29uc3QgYWxwaGFiZXRNYXggPSAnYWJjZGVmZ2hpaic7XHJcbiAgICBjb25zdCBhbHBBcnJheSA9IGFscGhhYmV0TWF4LnNwbGl0KCcnKTtcclxuICAgIG1haW5BcnJheS5mb3JFYWNoKCh2YWwpPT57XHJcbiAgICAgICAgY29uc3QgbnVtYiA9IHBhcnNlSW50KHZhbC5tYXRjaChudW1iZXJQYXR0KS5qb2luKCcnKSk7XHJcbiAgICAgICAgY29uc3QgYWxwaCA9IHZhbC5tYXRjaChhbHBoYVBhdHQpLmpvaW4oJycpO1xyXG4gICAgICAgIGNvbnN0IG51bWJNaW51c09uZSA9IG51bWIgLSAxO1xyXG4gICAgICAgIGNvbnN0IG51bWJQbHVzT25lID0gbnVtYiArIDE7XHJcbiAgICAgICAgY29uc3QgYWxwaFBsdXNPbmUgPSBhbHBBcnJheVsoYWxwQXJyYXkuaW5kZXhPZihhbHBoKSkrMV07XHJcbiAgICAgICAgY29uc3QgYWxwaE1pbnVzT25lID0gYWxwQXJyYXlbKGFscEFycmF5LmluZGV4T2YoYWxwaCkpLTFdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIG1lcmdlQXJyYXkoKXtcclxuICAgICAgICAgICAgICAvLyBtZXJnZSB0aGUgYXJyYXlcclxuICAgICAgICAgICAgcmVzdWx0QXJyYXkgPSByZXN1bHRBcnJheS5jb25jYXQob3V0cHV0QXJyYXkpO1xyXG4gICAgICAgICAgICByZXN1bHRBcnJheSA9IFsuLi5uZXcgU2V0IChbLi4ubWFpbkFycmF5LC4uLm91dHB1dEFycmF5XSldOyAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrUmlnaHQoKXtcclxuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaChhbHBoLmNvbmNhdCgobnVtYlBsdXNPbmUpLnRvU3RyaW5nKCkpKTsgLy8gcmlnaHRcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tMZWZ0KCl7XHJcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaC5jb25jYXQoKG51bWJNaW51c09uZSkudG9TdHJpbmcoKSkpOyAvLyBsZWZ0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrVXAoKXtcclxuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaChhbHBoTWludXNPbmUuY29uY2F0KChudW1iKS50b1N0cmluZygpKSk7IC8vIHVwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrRG93bigpe1xyXG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKGFscGhQbHVzT25lLmNvbmNhdCgobnVtYikudG9TdHJpbmcoKSkpOyAvLyBkb3duXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrRGlhZ1VwUmlnaHQoKXtcclxuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaChhbHBoTWludXNPbmUuY29uY2F0KChudW1iUGx1c09uZSkudG9TdHJpbmcoKSkpOyAvLyB1cCByaWdodFxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBjaGVja0RpYWdEb3duUmlnaHQoKXtcclxuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaChhbHBoUGx1c09uZS5jb25jYXQoKG51bWJQbHVzT25lKS50b1N0cmluZygpKSk7IC8vIGRvd24gcmlnaHRcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tEaWFnVXBMZWZ0KCl7XHJcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaE1pbnVzT25lLmNvbmNhdCgobnVtYk1pbnVzT25lKS50b1N0cmluZygpKSk7IC8vIHVwIGxlZnRcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tEaWFnRG93bkxlZnQoKXtcclxuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaChhbHBoUGx1c09uZS5jb25jYXQoKG51bWJNaW51c09uZSkudG9TdHJpbmcoKSkpOyAvLyBkb3duIGxlZnRcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFscGhNaW51c09uZSA9PSB1bmRlZmluZWQgJiYgbnVtYk1pbnVzT25lIDwgMSl7IC8vIGNvcm5lciB1cCBsZWZ0XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXRzIGNvcm5lciB1cCBsZWZ0Jyk7XHJcbiAgICAgICAgICAgIGNoZWNrUmlnaHQoKTtcclxuICAgICAgICAgICAgY2hlY2tEb3duKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25SaWdodCgpO1xyXG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhbHBoUGx1c09uZSA9PSB1bmRlZmluZWQgJiYgbnVtYk1pbnVzT25lIDwgMSl7IC8vIGNvcm5lciBib3R0b20gbGVmdFxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0cyBjb3JuZXIgYm90dG9tIGxlZnQnKTtcclxuICAgICAgICAgICAgY2hlY2tSaWdodCgpO1xyXG4gICAgICAgICAgICBjaGVja1VwKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ1VwUmlnaHQoKTtcclxuICAgICAgICAgICAgbWVyZ2VBcnJheSgpOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYWxwaE1pbnVzT25lID09IHVuZGVmaW5lZCAmJiBudW1iUGx1c09uZSA+IDEwKXsgLy8gY29ybmVyIHVwIHJpZ2h0IFxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0cyBjb3JuZXIgdXAgcmlnaHQnKTtcclxuICAgICAgICAgICAgY2hlY2tMZWZ0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrRG93bigpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdEb3duTGVmdCgpO1xyXG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhbHBoUGx1c09uZSA9PSB1bmRlZmluZWQgJiYgbnVtYlBsdXNPbmUgPiAxMCl7IC8vIGNvcm5lciBib3R0b20gcmlnaHRcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdHMgY29ybmVyIGJvdHRvbSByaWdodCcpO1xyXG4gICAgICAgICAgICBjaGVja0xlZnQoKTtcclxuICAgICAgICAgICAgY2hlY2tVcCgpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdVcExlZnQoKTtcclxuICAgICAgICAgICAgbWVyZ2VBcnJheSgpOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobnVtYk1pbnVzT25lIDwgMSl7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXQgbnVtYmVyID0gMCcpO1xyXG4gICAgICAgICAgICBjaGVja1JpZ2h0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrVXAoKTtcclxuICAgICAgICAgICAgY2hlY2tEb3duKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ1VwUmlnaHQoKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnRG93blJpZ2h0KCk7XHJcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYobnVtYlBsdXNPbmUgPiAxMCl7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXQgbnVtYmVyID4gMTAnKTtcclxuICAgICAgICAgICAgY2hlY2tMZWZ0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrVXAoKTtcclxuICAgICAgICAgICAgY2hlY2tEb3duKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ1VwTGVmdCgpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdEb3duTGVmdCgpO1xyXG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhbHBoTWludXNPbmUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdHMgdW5kZWZpbmVkJyk7XHJcbiAgICAgICAgICAgIGNoZWNrTGVmdCgpO1xyXG4gICAgICAgICAgICBjaGVja1JpZ2h0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrRG93bigpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdEb3duTGVmdCgpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdEb3duUmlnaHQoKTsgXHJcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFscGhQbHVzT25lID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXRzIHVuZGVmaW5lZCcpO1xyXG4gICAgICAgICAgICBjaGVja0xlZnQoKTtcclxuICAgICAgICAgICAgY2hlY2tSaWdodCgpO1xyXG4gICAgICAgICAgICBjaGVja1VwKCk7IFxyXG4gICAgICAgICAgICBjaGVja0RpYWdVcExlZnQoKTsgXHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ1VwUmlnaHQoKTtcclxuICAgICAgICAgICAgbWVyZ2VBcnJheSgpO1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vIGhvcml6b250YWwgY2hlY2tcclxuICAgICAgICAgICAgICAgIGNoZWNrTGVmdCgpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tSaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gdmVydGljYWwgY2hlY2tcclxuICAgICAgICAgICAgICAgIGNoZWNrVXAoKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrRG93bigpO1xyXG4gICAgICAgICAgICAgICAgLy9kaWFnb25hbCBsZWZ0IGNoZWNrXHJcbiAgICAgICAgICAgICAgICBjaGVja0RpYWdVcExlZnQoKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25MZWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAvL2RpYWdvbmFsIHJpZ2h0IGNoZWNrXHJcbiAgICAgICAgICAgICAgICBjaGVja0RpYWdVcFJpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICBjaGVja0RpYWdEb3duUmlnaHQoKTtcclxuICAgICAgICAgICAgICAgIG1lcmdlQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcblxyXG4gICAgfSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhvdXRwdXRBcnJheSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHRBcnJheSk7XHJcbiAgICByZXR1cm4gcmVzdWx0QXJyYXlcclxufVxyXG5cclxuLy8gbGV0IGFycmF5MSA9IFsnYScsJ2InLCdjJ107XHJcbi8vIGxldCBhcnJheTIgPSBbJ3onLCdhJywncyddO1xyXG5cclxuLy8gbGV0IGFycmF5MyA9IGFycmF5MS5jb25jYXQoYXJyYXkyKTtcclxuLy8gYXJyYXkzID0gWy4uLm5ldyBTZXQoWy4uLmFycmF5MSwuLi5hcnJheTJdKV1cclxuXHJcbi8vIGNvbnNvbGUubG9nKGFycmF5Myk7IFxyXG5cclxuLy8gcGxhY2VHYXAoWycxMGonXSk7XHJcbi8vIHBsYWNlR2FwKFsnMTBjJywgJzEwZCcsICcxMGUnXSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwbGFjZUdhcCIsImZ1bmN0aW9uIHBsYWNlUmFuZG9taXplcihsZW5nKXtcclxuICAgIGNvbnN0IE1BWF9HUklEID0gMTA7IC8vIG1heGltdW0gZ3JpZCBsZW5ndGggaXMgMTB4MTBcclxuICAgIGNvbnN0IHJhbmRvbUF4aXMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTsgLy8gb25seSByZXR1cm4gMC8xXHJcbiAgICBjb25zdCBhcnJheSA9IFtdO1xyXG4gICAgY29uc3QgYWxwaGFiZXQgPSBcImFiY2RlZmdoaWpcIjtcclxuICAgIGNvbnN0IHJhbmRvbU51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChNQVhfR1JJRCAtIGxlbmcpKSArIDE7IC8vIHRoaXMgcmFuZG9taXplciBudW1iZXIga2VlcCB5b3UgZnJvbSBvdmVyZmxvd2luZywgcGx1cyBvbmUgc28gaXQgc3RhcnQgZnJvbSAxIG5vdCAwXHJcbiAgICBjb25zdCByYW5kb21BbHAgPSBhbHBoYWJldFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhbHBoYWJldC5zdWJzdHJpbmcoMCwoTUFYX0dSSUQgLSBsZW5nKSkubGVuZ3RoKV07IC8vIHRoaXMgcmFuZG9taXplciBrZWVwcyB5b3UgZnJvbSB2YWx1ZSBtb3JlIHRoYW4gbGVuZ3RoXHJcbiAgICBsZXQgYWxwaGFOdW07XHJcblxyXG4gICAgaWYgKHJhbmRvbUF4aXMgPT09IDApeyAvLyBYIGF4aXMgYmxvY2tzXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPGxlbmc7IGkrKyApe1xyXG4gICAgICAgICAgICBhbHBoYU51bSA9IHJhbmRvbUFscC5jb25jYXQoKHJhbmRvbU51bWJlciArIGkpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICBhcnJheS5wdXNoKGFscGhhTnVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYXJyYXkpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJhbmRvbUF4aXMpO1xyXG4gICAgICAgIHJldHVybiBhcnJheVxyXG4gICAgfVxyXG4gICAgZWxzZSB7IC8vIFkgYXhpcyBibG9ja3NcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8bGVuZzsgaSsrICl7XHJcbiAgICAgICAgICAgIGNvbnN0IGFscExvb3AgPSBhbHBoYWJldC5jaGFyQXQoYWxwaGFiZXQuaW5kZXhPZihyYW5kb21BbHApICsgaSk7XHJcbiAgICAgICAgICAgIGFscGhhTnVtID0gYWxwTG9vcC5jb25jYXQoKHJhbmRvbU51bWJlcikudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIGFycmF5LnB1c2goYWxwaGFOdW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhhcnJheSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmFuZG9tQXhpcyk7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgcGxhY2VSYW5kb21pemVyIiwiXHJcbi8vIGNvbnN0IHlvdXJHYW1lYm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuLy8gY29uc3QgaHVtYW5HYW1lYm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuLy8gY29uc3QgQUlHYW1lYm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuXHJcbmNvbnN0IHBsYXllciA9ICgpID0+IHtcclxuICAgIC8vIHBsYXllciBzaG91bGQgdGFrZSB0dXJucyBwbGF5aW5nIHRoZSBnYW1lIGJ5IGF0dGFja2luZyBvcHBvbmVudCdzIGdhbWVib2FyZC5cclxuICAgIGxldCBhdHRhY2tTdGF0dXMgPSAnT0ZGJztcclxuICAgIC8vIHBsYXllciBhdHRhY2tpbmcgc3RhdGUgaXMgT05cclxuICAgIC8vIHBsYXllciBDSE9PU0UgdGhlIGNvb3JkaW5hdGUgb2Ygb3Bwb25lbnQncyBnYW1lYm9hcmQuXHJcbiAgICAvLyBwbGF5ZXIgYXR0YWNraW5nIHN0YXRlIGlzIE9GRlxyXG4gICAgLy8gbGV0IHlvdXJHYW1lYm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdG9nZ2xlQXR0YWNrT04gOiAoKT0+IGF0dGFja1N0YXR1cyA9IFwiT05cIixcclxuICAgICAgICB0b2dnbGVBdHRhY2tPRkYgOiAoKT0+IGF0dGFja1N0YXR1cyA9IFwiT0ZGXCIsXHJcbiAgICAgICAgY2hlY2tBdHRhY2s6ICgpPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhdHRhY2tTdGF0dXMpOyBcclxuICAgICAgICAgICAgcmV0dXJuIGF0dGFja1N0YXR1c1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGxldCBwbGF5ZSA9IHBsYXllcigpO1xyXG5cclxuXHJcbi8vIHBsYXllLmNoZWNrQXR0YWNrKCk7XHJcbi8vIHBsYXllLnRvZ2dsZUF0dGFja09OKCk7XHJcbi8vIHBsYXllLmNoZWNrQXR0YWNrKCk7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcGxheWVyOyIsIlxyXG5jb25zdCBzaGlwcyA9IChjb29yZCkgPT57IC8vIGxlbmd0aCB3aWxsIGJlIGZyb20gc2l6ZSBvZiB0aGUgc2hpcFxyXG4gICAgLy8gbGV0IGNvb3JkID0gbG9jLnNwbGl0KCcsJyk7XHJcbiAgICBsZXQgaGVhbHRoQmFyID0gY29vcmQubGVuZ3RoO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBsZW5ndGg6ICgpPT57XHJcbiAgICAgICAgICAgIHJldHVybiBsZW4gXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoaXQ6IChsb2MpPT57XHJcbiAgICAgICAgICAgIC8vZ2V0IHRoZSBhdHRjayBoaXQgbG9jYXRpb25cclxuICAgICAgICAgICAgaWYgKGNvb3JkLmluY2x1ZGVzKGxvYykgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJhdHRhY2sgbWlzc2VkXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGNvb3JkLmluY2x1ZGVzKGxvYykgPT09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgY29vcmQgPSBjb29yZC5maWx0ZXIoICh2YWwpPT57XHJcbiAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsICE9PSBsb2NcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaGVhbHRoQmFyID0gaGVhbHRoQmFyIC0gMTtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vbWFyayBwb3NpdGlvbiBpbiBnYW1lYm9hcmQgYXMgYSBoaXRcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ0aGlzIHNoaXAgdG9vayBoaXQ6IFwiICsgbnVtKVxyXG4gICAgICAgICAgICAvL3JldHVybiBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzU3VuazogKCk9PntcclxuICAgICAgICAgICAgLy9jaGVjayB0aGUgc2hpcCBpZiBzdW5rZW4geWV0XHJcbiAgICAgICAgICAgIGlmKGhlYWx0aEJhciA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2hpcCBpcyBkZXN0cm95ZWQnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAgXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NoaXAgaXMgc3RpbGwgaW50YWN0Jyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBcclxuICAgICAgICBoZWFsdGhCYXIgOiAoKT0+IHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInRoaXMgc2hpcCBoZWFsdGg6IFwiICsgaGVhbHRoQmFyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGhlYWx0aEJhclxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbG9jYXRpb246ICgpPT57XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coY29vcmQpXHJcbiAgICAgICAgICAgIHJldHVybiBjb29yZFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gY29uc3QgYmlnU2hpcCA9IHNoaXBzKFwiM0EgNEEgNUEgNkEgN0FcIik7XHJcbi8vIGNvbnN0IG1pZFNoaXAyID0gc2hpcHMoXCIxMkEgMTJCIDEyQ1wiKTtcclxuLy8gY29uc3Qgc21hbGxTaGlwID0gc2hpcHMoXCI0QlwiKTtcclxuXHJcbi8vIGJpZ1NoaXAubG9jYXRpb24oKTtcclxuLy8gYmlnU2hpcC5oZWFsdGhCYXIoKTtcclxuLy8gYmlnU2hpcC5oaXQoXCIzQVwiKTtcclxuLy8gYmlnU2hpcC5sb2NhdGlvbigpO1xyXG4vLyBiaWdTaGlwLmhlYWx0aEJhcigpO1xyXG4vLyBiaWdTaGlwLmhpdChcIjhBXCIpO1xyXG4vLyBiaWdTaGlwLmxvY2F0aW9uKCk7XHJcbi8vIGJpZ1NoaXAuaGVhbHRoQmFyKCk7XHJcbi8vIGJpZ1NoaXAuaGl0KFwiNEFcIik7XHJcbi8vIGJpZ1NoaXAuaGl0KFwiNUFcIik7XHJcbi8vIGJpZ1NoaXAuaGl0KFwiNkFcIik7XHJcbi8vIGJpZ1NoaXAubG9jYXRpb24oKTtcclxuLy8gYmlnU2hpcC5oZWFsdGhCYXIoKTtcclxuLy8gYmlnU2hpcC5pc1N1bmsoKTtcclxuLy8gYmlnU2hpcC5oaXQoXCI3QVwiKTtcclxuLy8gYmlnU2hpcC5sb2NhdGlvbigpO1xyXG4vLyBiaWdTaGlwLmhlYWx0aEJhcigpO1xyXG4vLyBiaWdTaGlwLmlzU3VuaygpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgc2hpcHMiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL21haW5nYW1lLmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9