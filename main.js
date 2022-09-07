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
            layer.append(grid);
        }
    })
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

const ships = (loc) =>{ // length will be from size of the ship
    let coord = loc.split(',');
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

function startGame(){
    const PLAYERONE = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    const AI = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    const playerGameboard = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
    const AIGameboard = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_1__["default"])();

    function AIPlacement(){
        let Carrier = (0,_placeRandomizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(5);
        let Battleship = (0,_placeRandomizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(4);
        let Cruiser = (0,_placeRandomizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(3);
        let Destroyer = (0,_placeRandomizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(2);
        
        function randomizeAgain(ship, num){
            ship = (0,_placeRandomizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(num);
        }
        function AIplaceShip(ship){
            AIGameboard.placement(ship);
        }
        function AIaddGap(ship){
            ship = (0,_placeGap_js__WEBPACK_IMPORTED_MODULE_5__["default"])(ship);
        }

        let CarrierPlusGap = (0,_placeGap_js__WEBPACK_IMPORTED_MODULE_5__["default"])(Carrier);
        AIGameboard.placement(Carrier);

        
        

        //let CarrierAndGap = placeGap(Carrier);

        // initiate randomizer
        // add gap to randomizer 
        // place first ship inside gamboard
        // initiate randomizer
        // check if its clashing with placed ship inside the gameboard
        // if its clashing, re initiate randomizer, then check again.
        // if its not clashing, add gap to new ship
        // place ship inside the gameboard
        









        // get the coordinate first, then going up
        // check the placeRandomizer, if any element from it will clash with current array of placement
        // const shipCoor = '1a,2a,3a,4a,5a';
       // const shieldShip = shieldShip(shipCoor);
        // const fakeShip = ships(shipCoor);
        // AIGameboard.placement(fakeShip);
        //AIGameboard.checkAllLocation();
        // let bigShipCoor = placeRandomizer(5); // get data from DOM
        // console.log(bigShipCoor);
        //     bigShipCoor = placeRandomizer(5);
        // console.log(bigShipCoor)  
        // if (findCommonElements(AIGameboard.checkAllLocation(), bigShipCoor) === true){ // including "the shield", you cannot place the elements in that area
        //     console.log('CLASHED');
        // }
        // let bigShipCoor = placeRandomizer(5).toString(); // get data from DOM
        //let bigShip = ships(bigShipCoor); // coordinate assign to ships()
        // console.log(bigShip.toString());
        //AIGameboard.placement(bigShip);
        //AIGameboard.checkAllLocation();
    }

    return {
        versusAI: ()=>{
        // AI automatically place the ships 
        // AI randomizer placement mirip random button human placement
        // AIGameboard.placement()
        AIPlacement();
        // player manually place the ship
        }
    }
}

//startGame().versusAI();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QiIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmluZENvbW1vbkVsZW1lbnRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbGF5b3V0R3JpZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYWNlR2FwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxhY2VSYW5kb21pemVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbWFpbmdhbWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZmluZENvbW1vbkVsZW1lbnRzKGFycjEsIGFycjIpIHtcclxuICAgIHJldHVybiBhcnIxLnNvbWUoaXRlbSA9PiBhcnIyLmluY2x1ZGVzKGl0ZW0pKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmaW5kQ29tbW9uRWxlbWVudHMiLCJcclxuY29uc3QgZ2FtZWJvYXJkID0gKCk9PiB7XHJcbiAgICBsZXQgYWxsU2hpcCA9IFtdO1xyXG4gICAgbGV0IHRvdGFsSGVhbHRoID0gMDtcclxuICAgIGxldCBhbGxMb2NhdGlvbiA9IFtdO1xyXG4gICAgbGV0IGF0dGFja01pc3NlZCA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJlZnJlc2hBbGxMb2NhdGlvbigpe1xyXG4gICAgICAgIGxldCBuZXdMb2NhdGlvbiA9IFtdO1xyXG4gICAgICAgIGFsbFNoaXAuZm9yRWFjaCgoc2hpcCk9PntcclxuICAgICAgICAgICAgbmV3TG9jYXRpb24gPSBuZXdMb2NhdGlvbi5jb25jYXQoc2hpcC5sb2NhdGlvbigpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhbGxMb2NhdGlvbiA9IG5ld0xvY2F0aW9uO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gYXR0YWNrTWlzc2VkQ291bnRlcihjb29yKXtcclxuICAgICAgICBhdHRhY2tNaXNzZWQucHVzaChjb29yKTtcclxuICAgIH1cclxuXHJcbiAgICAvL2NvbnNvbGUubG9nKCdnYW1lYm9hcmQgaXMgb24nKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcGxhY2VtZW50OiAoc2hpcHMpPT57IC8vIGRvbnQgbmVlZCBjb29yIHNpbmNlIGNvb3JkaW5hdGUgc2hvdWxkIGJlIGluc2lkZSB0aGUgc2hpcCgpXHJcbiAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgY29vcmRpbmF0ZSBpcyB2YWxpZCwgd2hpY2ggbWVhbnMgZW1wdHkgYW5kIG9uZSBibG9jayBhd2F5IGZyb20gYW5vdGhlciBzaGlwXHJcbiAgICAgICAgICAgIC8vIHBsYWNlIHRoZSBzaGlwcyBvbiB0aGUgY29vcmRpbmF0ZSAgICAgXHJcbiAgICAgICAgICAgIGFsbFNoaXAucHVzaChzaGlwcyk7XHJcbiAgICAgICAgICAgIGFsbExvY2F0aW9uID0gYWxsTG9jYXRpb24uY29uY2F0KHNoaXBzLmxvY2F0aW9uKCkpO1xyXG4gICAgICAgICAgICAvLyBtYXJrcyB0aGUgY29vcmRpbmF0ZSB3aXRoIHNoaXBzJyBtYXJrc1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlY2VpdmVBdHRhY2s6IChjb29yKT0+e1xyXG4gICAgICAgICAgICBpZihhbGxMb2NhdGlvbi5pbmNsdWRlcyhjb29yKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0F0dGFjayBtaXNzZWQnKVxyXG4gICAgICAgICAgICAgICAgYXR0YWNrTWlzc2VkQ291bnRlcihjb29yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQXR0YWNrIEhpdCEnKVxyXG4gICAgICAgICAgICAgICAgYWxsU2hpcC5mb3JFYWNoKChzaGlwKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHNoaXAuaGl0KGNvb3IpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyByZWZyZXNoIHRoZSBhbGxMb2NhdGlvbiBBcnJheSBzbyB5b3UgY2Fubm90IGhpdCB0d2ljZSBvbiB0aGUgc2FtZSBjb29yZGluYXRlXHJcbiAgICAgICAgICAgICAgICByZWZyZXNoQWxsTG9jYXRpb24oKVxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAvLyB0b2dnbGUgY2hlY2tBbGxTaGlwKCkgdG8gbWFrZSBzdXJlIGlmIGl0cyBub3QgZW5kZ2FtZVxyXG4gICAgICAgICAgICAvLyBpZiBub3QgbWFya3MgdGhlIGNvb3JkaW5hdGUgd2l0aCBtaXNzZWRBdHRhY2soKVxyXG4gICAgICAgICAgICAvL3JldHVyblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2hlY2tUb3RhbEhlYWx0aDogKCk9PntcclxuICAgICAgICAgICAgLy8gY2hlY2sgdGhlIGhlYWx0aGJhciBvZiBlYWNoIHNoaXBzIHdpdGggc2hpcC5oZWFsdGhiYXIoKVxyXG4gICAgICAgICAgICBhbGxTaGlwLmZvckVhY2goKHNoaXApPT57XHJcbiAgICAgICAgICAgICAgICBzaGlwLmxvY2F0aW9uKCk7IFxyXG4gICAgICAgICAgICAgICAgdG90YWxIZWFsdGggPSB0b3RhbEhlYWx0aCArIHNoaXAuaGVhbHRoQmFyKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0b3RhbEhlYWx0aCk7XHJcbiAgICAgICAgICAgIC8vIGlmIGFsbCB0aGUgaGVhbHRoYmFyIGlzIDAgdGhlbiB0aGUgZ2FtZSBpcyBlbmRlZFxyXG4gICAgICAgICAgICBpZih0b3RhbEhlYWx0aCA8PSAwKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR0FNRSBPVkVSIEFMTCBPRiBZT1VSIFNISVBTIFdSRUNLRURcIilcclxuICAgICAgICAgICAgICAgIHJldHVybiB0b3RhbEhlYWx0aFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG90YWxIZWFsdGhcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoZWNrQWxsTG9jYXRpb246ICgpPT57XHJcbiAgICAgICAgICAgIHJlZnJlc2hBbGxMb2NhdGlvbigpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhbGxMb2NhdGlvbik7XHJcbiAgICAgICAgICAgIHJldHVybiBhbGxMb2NhdGlvblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2hlY2tBdHRhY2tNaXNzZWQ6ICgpPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGF0dGFja01pc3NlZCk7XHJcbiAgICAgICAgICAgIHJldHVybiBhdHRhY2tNaXNzZWRcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnYW1lYm9hcmQ7XHJcblxyXG4vLyBjb25zdCBwbGF5YSA9IGdhbWVib2FyZCgpO1xyXG4vLyBjb25zdCBiaWdTaGlwQ29vciA9ICc2QiA3QiA4QiA5QiAxMEInO1xyXG4vLyBjb25zdCBtaWRTaGlwQ29vciA9ICc0QiA0QyA0RCc7XHJcbi8vIGNvbnN0IG1pZFNoaXAgPSBzaGlwcyhtaWRTaGlwQ29vcik7XHJcbi8vIGNvbnN0IGJpZ1NoaXAgPSBzaGlwcyhiaWdTaGlwQ29vcik7XHJcblxyXG4vLyBwbGF5YS5wbGFjZW1lbnQoYmlnU2hpcCk7XHJcbi8vIHBsYXlhLnBsYWNlbWVudChtaWRTaGlwKTtcclxuLy8gcGxheWEucmVjZWl2ZUF0dGFjayhcIjRCXCIpO2RlYnVnZ2VyXHJcbi8vIHBsYXlhLnJlY2VpdmVBdHRhY2soXCI0Q1wiKTtkZWJ1Z2dlclxyXG4vLyBwbGF5YS5yZWNlaXZlQXR0YWNrKFwiNERcIik7ZGVidWdnZXJcclxuLy8gcGxheWEucmVjZWl2ZUF0dGFjayhcIjNCXCIpO2RlYnVnZ2VyXHJcbi8vIHBsYXlhLmNoZWNrQWxsTG9jYXRpb24oKTtcclxuLy8gcGxheWEuY2hlY2tBdHRhY2tNaXNzZWQoKTtcclxuLy8gcGxheWEuY2hlY2tUb3RhbEhlYWx0aCgpOyBcclxuLy8gcmV2aXNlIHRoaXNcclxuLy8gcGxheWEucGxhY2VtZW50KCcxQSAyQSAzQScsIHNoaXBzKDMpKTtcclxuLy8gcGxheWEucGxhY2VtZW50KCczQiA0QicsIHNoaXBzKDIpKTtcclxuLy8gcGxheWEucGxhY2VtZW50KCc2QiA3QiA4QiA5QiAxMEInLCBzaGlwcyg1KSk7XHJcbi8vIHBsYXlhLnBsYWNlbWVudCgnNkUgN0UgOEUgOUUgMTBFJywgc2hpcHMoNSkpOyIsIlxyXG5mdW5jdGlvbiBjcmVhdGVHcmlkKHdob3Mpe1xyXG4gICAgY29uc3QgbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt3aG9zfUdhbWVib2FyZGApO1xyXG4gICAgY29uc3QgTUFYX1dJRFRIID0gMTA7XHJcbiAgICBjb25zdCBhbHBoYWJldCA9ICdhYmNkZWZnaGlqJztcclxuICAgIGNvbnN0IGFscGhBcnJheSA9IGFscGhhYmV0LnNwbGl0KCcnKTtcclxuXHJcbiAgICBhbHBoQXJyYXkuZm9yRWFjaCgoYWxwKT0+e1xyXG4gICAgICAgIGZvciAobGV0IGk9MTsgaSA8PSBNQVhfV0lEVEg7IGkrKyApe1xyXG4gICAgICAgICAgICBjb25zdCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGdyaWQuY2xhc3NOYW1lPWAke2l9JHthbHB9YDtcclxuICAgICAgICAgICAgbGF5ZXIuYXBwZW5kKGdyaWQpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICAvLyBmb3IobGV0IGkgPSAwOyBpIDwgTUFYX1dJRFRIOyBpKyspe1xyXG4gICAgLy8gICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIC8vIH1cclxuXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlR3JpZCIsIi8vIHNldCBnYXAgYnkgb25lIGJ5IG9uZSBsb29wIGNoZWNrXHJcblxyXG5mdW5jdGlvbiBwbGFjZUdhcChtYWluQXJyYXkpe1xyXG4gICAgbGV0IG91dHB1dEFycmF5ID0gW107XHJcbiAgICBsZXQgcmVzdWx0QXJyYXkgPSBbXTtcclxuICAgIGNvbnN0IG51bWJlclBhdHQgPSAvWzAtOV0vZztcclxuICAgIGNvbnN0IGFscGhhUGF0dCA9IC9bYS16QS1aXS9nO1xyXG4gICAgY29uc3QgYWxwaGFiZXRNYXggPSAnYWJjZGVmZ2hpaic7XHJcbiAgICBjb25zdCBhbHBBcnJheSA9IGFscGhhYmV0TWF4LnNwbGl0KCcnKTtcclxuICAgIG1haW5BcnJheS5mb3JFYWNoKCh2YWwpPT57XHJcbiAgICAgICAgY29uc3QgbnVtYiA9IHBhcnNlSW50KHZhbC5tYXRjaChudW1iZXJQYXR0KS5qb2luKCcnKSk7XHJcbiAgICAgICAgY29uc3QgYWxwaCA9IHZhbC5tYXRjaChhbHBoYVBhdHQpLmpvaW4oJycpO1xyXG4gICAgICAgIGNvbnN0IG51bWJNaW51c09uZSA9IG51bWIgLSAxO1xyXG4gICAgICAgIGNvbnN0IG51bWJQbHVzT25lID0gbnVtYiArIDE7XHJcbiAgICAgICAgY29uc3QgYWxwaFBsdXNPbmUgPSBhbHBBcnJheVsoYWxwQXJyYXkuaW5kZXhPZihhbHBoKSkrMV07XHJcbiAgICAgICAgY29uc3QgYWxwaE1pbnVzT25lID0gYWxwQXJyYXlbKGFscEFycmF5LmluZGV4T2YoYWxwaCkpLTFdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIG1lcmdlQXJyYXkoKXtcclxuICAgICAgICAgICAgICAvLyBtZXJnZSB0aGUgYXJyYXlcclxuICAgICAgICAgICAgcmVzdWx0QXJyYXkgPSByZXN1bHRBcnJheS5jb25jYXQob3V0cHV0QXJyYXkpO1xyXG4gICAgICAgICAgICByZXN1bHRBcnJheSA9IFsuLi5uZXcgU2V0IChbLi4ubWFpbkFycmF5LC4uLm91dHB1dEFycmF5XSldOyAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrUmlnaHQoKXtcclxuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaCgobnVtYlBsdXNPbmUpLnRvU3RyaW5nKCkuY29uY2F0KGFscGgpKTsgLy8gcmlnaHRcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tMZWZ0KCl7XHJcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goKG51bWJNaW51c09uZSkudG9TdHJpbmcoKS5jb25jYXQoYWxwaCkpOyAvLyBsZWZ0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrVXAoKXtcclxuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaCgobnVtYikudG9TdHJpbmcoKS5jb25jYXQoYWxwaE1pbnVzT25lKSk7IC8vIHVwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrRG93bigpe1xyXG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKChudW1iKS50b1N0cmluZygpLmNvbmNhdChhbHBoUGx1c09uZSkpOyAvLyBkb3duXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrRGlhZ1VwUmlnaHQoKXtcclxuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaCgobnVtYlBsdXNPbmUpLnRvU3RyaW5nKCkuY29uY2F0KGFscGhNaW51c09uZSkpOyAvLyB1cCByaWdodFxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBjaGVja0RpYWdEb3duUmlnaHQoKXtcclxuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaCgobnVtYlBsdXNPbmUpLnRvU3RyaW5nKCkuY29uY2F0KGFscGhQbHVzT25lKSk7IC8vIGRvd24gcmlnaHRcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tEaWFnVXBMZWZ0KCl7XHJcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goKG51bWJNaW51c09uZSkudG9TdHJpbmcoKS5jb25jYXQoYWxwaE1pbnVzT25lKSk7IC8vIHVwIGxlZnRcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tEaWFnRG93bkxlZnQoKXtcclxuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaCgobnVtYk1pbnVzT25lKS50b1N0cmluZygpLmNvbmNhdChhbHBoUGx1c09uZSkpOyAvLyBkb3duIGxlZnRcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFscGhNaW51c09uZSA9PSB1bmRlZmluZWQgJiYgbnVtYk1pbnVzT25lIDwgMSl7IC8vIGNvcm5lciB1cCBsZWZ0XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXRzIGNvcm5lciB1cCBsZWZ0Jyk7XHJcbiAgICAgICAgICAgIGNoZWNrUmlnaHQoKTtcclxuICAgICAgICAgICAgY2hlY2tEb3duKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25SaWdodCgpO1xyXG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhbHBoUGx1c09uZSA9PSB1bmRlZmluZWQgJiYgbnVtYk1pbnVzT25lIDwgMSl7IC8vIGNvcm5lciBib3R0b20gbGVmdFxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0cyBjb3JuZXIgYm90dG9tIGxlZnQnKTtcclxuICAgICAgICAgICAgY2hlY2tSaWdodCgpO1xyXG4gICAgICAgICAgICBjaGVja1VwKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ1VwUmlnaHQoKTtcclxuICAgICAgICAgICAgbWVyZ2VBcnJheSgpOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYWxwaE1pbnVzT25lID09IHVuZGVmaW5lZCAmJiBudW1iUGx1c09uZSA+IDEwKXsgLy8gY29ybmVyIHVwIHJpZ2h0IFxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0cyBjb3JuZXIgdXAgcmlnaHQnKTtcclxuICAgICAgICAgICAgY2hlY2tMZWZ0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrRG93bigpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdEb3duTGVmdCgpO1xyXG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhbHBoUGx1c09uZSA9PSB1bmRlZmluZWQgJiYgbnVtYlBsdXNPbmUgPiAxMCl7IC8vIGNvcm5lciBib3R0b20gcmlnaHRcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdHMgY29ybmVyIGJvdHRvbSByaWdodCcpO1xyXG4gICAgICAgICAgICBjaGVja0xlZnQoKTtcclxuICAgICAgICAgICAgY2hlY2tVcCgpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdVcExlZnQoKTtcclxuICAgICAgICAgICAgbWVyZ2VBcnJheSgpOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobnVtYk1pbnVzT25lIDwgMSl7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXQgbnVtYmVyID0gMCcpO1xyXG4gICAgICAgICAgICBjaGVja1JpZ2h0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrVXAoKTtcclxuICAgICAgICAgICAgY2hlY2tEb3duKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ1VwUmlnaHQoKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnRG93blJpZ2h0KCk7XHJcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYobnVtYlBsdXNPbmUgPiAxMCl7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXQgbnVtYmVyID4gMTAnKTtcclxuICAgICAgICAgICAgY2hlY2tMZWZ0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrVXAoKTtcclxuICAgICAgICAgICAgY2hlY2tEb3duKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ1VwTGVmdCgpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdEb3duTGVmdCgpO1xyXG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhbHBoTWludXNPbmUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdHMgdW5kZWZpbmVkJyk7XHJcbiAgICAgICAgICAgIGNoZWNrTGVmdCgpO1xyXG4gICAgICAgICAgICBjaGVja1JpZ2h0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrRG93bigpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdEb3duTGVmdCgpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdEb3duUmlnaHQoKTsgXHJcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFscGhQbHVzT25lID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXRzIHVuZGVmaW5lZCcpO1xyXG4gICAgICAgICAgICBjaGVja0xlZnQoKTtcclxuICAgICAgICAgICAgY2hlY2tSaWdodCgpO1xyXG4gICAgICAgICAgICBjaGVja1VwKCk7IFxyXG4gICAgICAgICAgICBjaGVja0RpYWdVcExlZnQoKTsgXHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ1VwUmlnaHQoKTtcclxuICAgICAgICAgICAgbWVyZ2VBcnJheSgpO1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vIGhvcml6b250YWwgY2hlY2tcclxuICAgICAgICAgICAgICAgIGNoZWNrTGVmdCgpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tSaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gdmVydGljYWwgY2hlY2tcclxuICAgICAgICAgICAgICAgIGNoZWNrVXAoKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrRG93bigpO1xyXG4gICAgICAgICAgICAgICAgLy9kaWFnb25hbCBsZWZ0IGNoZWNrXHJcbiAgICAgICAgICAgICAgICBjaGVja0RpYWdVcExlZnQoKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25MZWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAvL2RpYWdvbmFsIHJpZ2h0IGNoZWNrXHJcbiAgICAgICAgICAgICAgICBjaGVja0RpYWdVcFJpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICBjaGVja0RpYWdEb3duUmlnaHQoKTtcclxuICAgICAgICAgICAgICAgIG1lcmdlQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcblxyXG4gICAgfSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhvdXRwdXRBcnJheSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHRBcnJheSk7XHJcbiAgICByZXR1cm4gcmVzdWx0QXJyYXlcclxufVxyXG5cclxuLy8gbGV0IGFycmF5MSA9IFsnYScsJ2InLCdjJ107XHJcbi8vIGxldCBhcnJheTIgPSBbJ3onLCdhJywncyddO1xyXG5cclxuLy8gbGV0IGFycmF5MyA9IGFycmF5MS5jb25jYXQoYXJyYXkyKTtcclxuLy8gYXJyYXkzID0gWy4uLm5ldyBTZXQoWy4uLmFycmF5MSwuLi5hcnJheTJdKV1cclxuXHJcbi8vIGNvbnNvbGUubG9nKGFycmF5Myk7IFxyXG5cclxuLy8gcGxhY2VHYXAoWycxMGonXSk7XHJcbi8vIHBsYWNlR2FwKFsnMTBjJywgJzEwZCcsICcxMGUnXSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwbGFjZUdhcCIsImZ1bmN0aW9uIHBsYWNlUmFuZG9taXplcihsZW5nKXtcclxuICAgIGNvbnN0IE1BWF9HUklEID0gMTA7IC8vIG1heGltdW0gZ3JpZCBsZW5ndGggaXMgMTB4MTBcclxuICAgIGNvbnN0IHJhbmRvbUF4aXMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTsgLy8gb25seSByZXR1cm4gMC8xXHJcbiAgICBjb25zdCBhcnJheSA9IFtdO1xyXG4gICAgY29uc3QgYWxwaGFiZXQgPSBcImFiY2RlZmdoaWpcIjtcclxuICAgIGNvbnN0IHJhbmRvbU51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChNQVhfR1JJRCAtIGxlbmcpKSArIDE7IC8vIHRoaXMgcmFuZG9taXplciBudW1iZXIga2VlcCB5b3UgZnJvbSBvdmVyZmxvd2luZywgcGx1cyBvbmUgc28gaXQgc3RhcnQgZnJvbSAxIG5vdCAwXHJcbiAgICBjb25zdCByYW5kb21BbHAgPSBhbHBoYWJldFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhbHBoYWJldC5zdWJzdHJpbmcoMCwoTUFYX0dSSUQgLSBsZW5nKSkubGVuZ3RoKV07IC8vIHRoaXMgcmFuZG9taXplciBrZWVwcyB5b3UgZnJvbSB2YWx1ZSBtb3JlIHRoYW4gbGVuZ3RoXHJcbiAgICBsZXQgYWxwaGFOdW07XHJcblxyXG4gICAgaWYgKHJhbmRvbUF4aXMgPT09IDApeyAvLyBYIGF4aXMgYmxvY2tzXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPGxlbmc7IGkrKyApe1xyXG4gICAgICAgICAgICBhbHBoYU51bSA9IChyYW5kb21OdW1iZXIgKyBpKS50b1N0cmluZygpLmNvbmNhdChyYW5kb21BbHApO1xyXG4gICAgICAgICAgICBhcnJheS5wdXNoKGFscGhhTnVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYXJyYXkpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJhbmRvbUF4aXMpO1xyXG4gICAgICAgIHJldHVybiBhcnJheVxyXG4gICAgfVxyXG4gICAgZWxzZSB7IC8vIFkgYXhpcyBibG9ja3NcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8bGVuZzsgaSsrICl7XHJcbiAgICAgICAgICAgIGNvbnN0IGFscExvb3AgPSBhbHBoYWJldC5jaGFyQXQoYWxwaGFiZXQuaW5kZXhPZihyYW5kb21BbHApICsgaSk7XHJcbiAgICAgICAgICAgIGFscGhhTnVtID0gKHJhbmRvbU51bWJlcikudG9TdHJpbmcoKS5jb25jYXQoYWxwTG9vcCk7XHJcbiAgICAgICAgICAgIGFycmF5LnB1c2goYWxwaGFOdW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhhcnJheSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmFuZG9tQXhpcyk7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgcGxhY2VSYW5kb21pemVyIiwiXHJcbi8vIGNvbnN0IHlvdXJHYW1lYm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuLy8gY29uc3QgaHVtYW5HYW1lYm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuLy8gY29uc3QgQUlHYW1lYm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuXHJcbmNvbnN0IHBsYXllciA9ICgpID0+IHtcclxuICAgIC8vIHBsYXllciBzaG91bGQgdGFrZSB0dXJucyBwbGF5aW5nIHRoZSBnYW1lIGJ5IGF0dGFja2luZyBvcHBvbmVudCdzIGdhbWVib2FyZC5cclxuICAgIGxldCBhdHRhY2tTdGF0dXMgPSAnT0ZGJztcclxuICAgIC8vIHBsYXllciBhdHRhY2tpbmcgc3RhdGUgaXMgT05cclxuICAgIC8vIHBsYXllciBDSE9PU0UgdGhlIGNvb3JkaW5hdGUgb2Ygb3Bwb25lbnQncyBnYW1lYm9hcmQuXHJcbiAgICAvLyBwbGF5ZXIgYXR0YWNraW5nIHN0YXRlIGlzIE9GRlxyXG4gICAgLy8gbGV0IHlvdXJHYW1lYm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdG9nZ2xlQXR0YWNrT04gOiAoKT0+IGF0dGFja1N0YXR1cyA9IFwiT05cIixcclxuICAgICAgICB0b2dnbGVBdHRhY2tPRkYgOiAoKT0+IGF0dGFja1N0YXR1cyA9IFwiT0ZGXCIsXHJcbiAgICAgICAgY2hlY2tBdHRhY2s6ICgpPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhdHRhY2tTdGF0dXMpOyBcclxuICAgICAgICAgICAgcmV0dXJuIGF0dGFja1N0YXR1c1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGxldCBwbGF5ZSA9IHBsYXllcigpO1xyXG5cclxuXHJcbi8vIHBsYXllLmNoZWNrQXR0YWNrKCk7XHJcbi8vIHBsYXllLnRvZ2dsZUF0dGFja09OKCk7XHJcbi8vIHBsYXllLmNoZWNrQXR0YWNrKCk7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcGxheWVyOyIsIlxyXG5jb25zdCBzaGlwcyA9IChsb2MpID0+eyAvLyBsZW5ndGggd2lsbCBiZSBmcm9tIHNpemUgb2YgdGhlIHNoaXBcclxuICAgIGxldCBjb29yZCA9IGxvYy5zcGxpdCgnLCcpO1xyXG4gICAgbGV0IGhlYWx0aEJhciA9IGNvb3JkLmxlbmd0aDtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbGVuZ3RoOiAoKT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gbGVuIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGl0OiAobG9jKT0+e1xyXG4gICAgICAgICAgICAvL2dldCB0aGUgYXR0Y2sgaGl0IGxvY2F0aW9uXHJcbiAgICAgICAgICAgIGlmIChjb29yZC5pbmNsdWRlcyhsb2MpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiYXR0YWNrIG1pc3NlZFwiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihjb29yZC5pbmNsdWRlcyhsb2MpID09PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIGNvb3JkID0gY29vcmQuZmlsdGVyKCAodmFsKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbCAhPT0gbG9jXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGhlYWx0aEJhciA9IGhlYWx0aEJhciAtIDE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL21hcmsgcG9zaXRpb24gaW4gZ2FtZWJvYXJkIGFzIGEgaGl0XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidGhpcyBzaGlwIHRvb2sgaGl0OiBcIiArIG51bSlcclxuICAgICAgICAgICAgLy9yZXR1cm4gXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpc1N1bms6ICgpPT57XHJcbiAgICAgICAgICAgIC8vY2hlY2sgdGhlIHNoaXAgaWYgc3Vua2VuIHlldFxyXG4gICAgICAgICAgICBpZihoZWFsdGhCYXIgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NoaXAgaXMgZGVzdHJveWVkJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIFxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzaGlwIGlzIHN0aWxsIGludGFjdCcpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgXHJcbiAgICAgICAgaGVhbHRoQmFyIDogKCk9PiB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJ0aGlzIHNoaXAgaGVhbHRoOiBcIiArIGhlYWx0aEJhcik7XHJcbiAgICAgICAgICAgIHJldHVybiBoZWFsdGhCYXJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxvY2F0aW9uOiAoKT0+e1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGNvb3JkKVxyXG4gICAgICAgICAgICByZXR1cm4gY29vcmRcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGNvbnN0IGJpZ1NoaXAgPSBzaGlwcyhcIjNBIDRBIDVBIDZBIDdBXCIpO1xyXG4vLyBjb25zdCBtaWRTaGlwMiA9IHNoaXBzKFwiMTJBIDEyQiAxMkNcIik7XHJcbi8vIGNvbnN0IHNtYWxsU2hpcCA9IHNoaXBzKFwiNEJcIik7XHJcblxyXG4vLyBiaWdTaGlwLmxvY2F0aW9uKCk7XHJcbi8vIGJpZ1NoaXAuaGVhbHRoQmFyKCk7XHJcbi8vIGJpZ1NoaXAuaGl0KFwiM0FcIik7XHJcbi8vIGJpZ1NoaXAubG9jYXRpb24oKTtcclxuLy8gYmlnU2hpcC5oZWFsdGhCYXIoKTtcclxuLy8gYmlnU2hpcC5oaXQoXCI4QVwiKTtcclxuLy8gYmlnU2hpcC5sb2NhdGlvbigpO1xyXG4vLyBiaWdTaGlwLmhlYWx0aEJhcigpO1xyXG4vLyBiaWdTaGlwLmhpdChcIjRBXCIpO1xyXG4vLyBiaWdTaGlwLmhpdChcIjVBXCIpO1xyXG4vLyBiaWdTaGlwLmhpdChcIjZBXCIpO1xyXG4vLyBiaWdTaGlwLmxvY2F0aW9uKCk7XHJcbi8vIGJpZ1NoaXAuaGVhbHRoQmFyKCk7XHJcbi8vIGJpZ1NoaXAuaXNTdW5rKCk7XHJcbi8vIGJpZ1NoaXAuaGl0KFwiN0FcIik7XHJcbi8vIGJpZ1NoaXAubG9jYXRpb24oKTtcclxuLy8gYmlnU2hpcC5oZWFsdGhCYXIoKTtcclxuLy8gYmlnU2hpcC5pc1N1bmsoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNoaXBzIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBpbiB0aGlzIGZpbGUgd2UgYXJlIGdvbm5hIGdhdGhlciBhbGwgdGhlIGNvbXBvbmVudHMgb2YgQmF0dGxlc2hpcCBUaGUgR2FtZSBhbmQgdHVybiBpdCBpbnRvIHJlYWwgZ2FtZVxyXG5cclxuLy8gcGxheWVyLiBXaGF0IGRvZXMgcGxheWVyIGRvLlxyXG4vLyBwbGF5ZXIgc3RhcnQgdGhlIGdhbWUgYnkgY2hvb3Npbmcgd2hvIHlvdXJlIHBsYXlpbmcgd2l0aFxyXG4vLyBwbGF5ZXIgY2hvb3NlIGlzIGl0IGdvbm5hIGJlIHZzIEFJIG9yIHZzIEh1bWFuXHJcbi8vIGF0IHRoaXMgcG9pbnQsIGlmIHlvdSBjaG9vc2UgQUkuIEFJIHdpbGwgYXV0b21hdGljYWxseSBwbGFjZSB0aGVpciBzaGlwcyByYW5kb21seSBvbiBnYW1lYm9hcmQuXHJcbi8vIHBsYXllciBjaG9vc2UgdGhlIHNoaXBzIHBsYWNlbWVudCBhY2Nyb3NzIHRoZSBnYW1lYm9hcmQuXHJcbi8vIHNoaXAncyBwbGFjZW1lbnQgaXMgYmFzZWQgb24gb25lIHJ1bGUgdGhhdCB0aGVyZSBpcyBhbHdheXMgb25lIGVtcHR5IGJsb2NrIGJldHdlZW4gb25lIGFuZCBhbm90aGVyIHBsYWNlZCBzaGlwc1xyXG4vLyBwbGF5ZXIgaGF2ZSBhIGNob2ljZSB0byByYW5kb21seSBwbGFjZSB0aGUgc2hpcHMgYnkgY2xpY2tpbmcgdGhlIHJhbmRvbSBidXR0b24uIFxyXG4vLyBwbGF5ZXIgcGxhY2VtZW50IG9yZGVyIGlzLi4gZmlyc3QgeW91IHBsYWNlIG9uZSBiaWcgc2hpcCAoNSBpbiBsZW5ndGgpLCB0aGVuIHR3byBtaWQgc2hpcCAoMyBpbiBsZW5ndGgpLCB0aGVuIHRocmVlIHNtYWxsIHNoaXAgKDIgaW4gbGVuZ3RoKSBcclxuLy8gYWZ0ZXIgYWxsIHNoaXBzIGFyZSBwbGFjZWQsIGdhbWUgaW5pdGlhdGUgdG8gc3RhcnQgYXR0YWNraW5nIGJ5IGNob29zaW5nIHRoZSBvcHBvbmVudHMncyBnYW1lYm9hcmQuIFRoaXMgcGhhc2UgeW91IGNvdWxkIGhpdCBvcHBvbmVudHMncyBzaGlwLlxyXG4vLyBhZnRlciB5b3UgYXR0YWNrIG9wcG9uZW50J3Mgc2hpcCwgZ2FtZSBhdXRvbWF0aWNhbGx5IGNoYW5nZSB0byBvcHBvbmVudCdzIHR1cm4uIFRoaXMgdGltZSBPcHBvbmVudCdzIHdpbGwgaW5pdGlhdGUgYXR0YWNrIHBsYXllcidzIGdhbWVib2FyZCByYW5kb21seS5cclxuLy8gVGhlIEFJIGRvZXMgbm90IGhhdmUgdG8gYmUgc21hcnQsIGJ1dCBpdCBzaG91bGQga25vdyB3aGV0aGVyIG9yIG5vdCBhIGdpdmVuIG1vdmUgaXMgbGVnYWwuIChpLmUuIGl0IHNob3VsZG7igJl0IHNob290IHRoZSBzYW1lIGNvb3JkaW5hdGUgdHdpY2UpLiBcclxuLy8gR2FtZSByZXBlYXRpbmcgdGhlIHByZXZpb3VzIHN0ZXAgdW50aWwgb25lIG9mIHRoZSBwbGF5ZXIvQUkgc2hpcHMgYXJlIGZ1bGx5IGNsZWFuZWQgKGFsbCBkZXN0cm95ZWQpXHJcbi8vIGdhbWUgZW5kaW5nIGlmIG9uZSBvZiB0aGUgcGxheWVyL0FJIHRvdGFsIGhlYWx0aGJhciAoc2hpcHMpIGFyZSA9IDAuIFxyXG4vLyAxXHRDYXJyaWVyXHQ1XHJcbi8vIDJcdEJhdHRsZXNoaXBcdDRcclxuLy8gM1x0Q3J1aXNlclx0M1xyXG4vLyA0XHRTdWJtYXJpbmVcdDNcclxuLy8gNVx0RGVzdHJveWVyXHQyXHJcblxyXG5cclxuaW1wb3J0IHBsYXllciBmcm9tIFwiLi9wbGF5ZXIuanNcIjtcclxuaW1wb3J0IGdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmQuanNcIlxyXG5pbXBvcnQgc2hpcHMgZnJvbSBcIi4vc2hpcHMuanNcIjtcclxuaW1wb3J0IHBsYWNlUmFuZG9taXplciBmcm9tIFwiLi9wbGFjZVJhbmRvbWl6ZXIuanNcIjtcclxuaW1wb3J0IGZpbmRDb21tb25FbGVtZW50cyBmcm9tIFwiLi9maW5kQ29tbW9uRWxlbWVudHMuanNcIjtcclxuaW1wb3J0IHBsYWNlR2FwIGZyb20gXCIuL3BsYWNlR2FwLmpzXCI7XHJcbmltcG9ydCBjcmVhdGVHcmlkIGZyb20gXCIuL2xheW91dEdyaWQuanNcIjtcclxuXHJcblxyXG4vLyBjb25zb2xlLmxvZyhQTEFZRVJPTkUpO2RlYnVnZ2VyXHJcbi8vIGNvbnNvbGUubG9nKHBsYXllckdhbWVib2FyZCk7ZGVidWdnZXJcclxuXHJcbmNyZWF0ZUdyaWQoJ0FJJyk7XHJcbmNyZWF0ZUdyaWQoJ3BsYXllcicpO1xyXG5cclxuZnVuY3Rpb24gc3RhcnRHYW1lKCl7XHJcbiAgICBjb25zdCBQTEFZRVJPTkUgPSBwbGF5ZXIoKTtcclxuICAgIGNvbnN0IEFJID0gcGxheWVyKCk7XHJcbiAgICBjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuICAgIGNvbnN0IEFJR2FtZWJvYXJkID0gZ2FtZWJvYXJkKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gQUlQbGFjZW1lbnQoKXtcclxuICAgICAgICBsZXQgQ2FycmllciA9IHBsYWNlUmFuZG9taXplcig1KTtcclxuICAgICAgICBsZXQgQmF0dGxlc2hpcCA9IHBsYWNlUmFuZG9taXplcig0KTtcclxuICAgICAgICBsZXQgQ3J1aXNlciA9IHBsYWNlUmFuZG9taXplcigzKTtcclxuICAgICAgICBsZXQgRGVzdHJveWVyID0gcGxhY2VSYW5kb21pemVyKDIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIHJhbmRvbWl6ZUFnYWluKHNoaXAsIG51bSl7XHJcbiAgICAgICAgICAgIHNoaXAgPSBwbGFjZVJhbmRvbWl6ZXIobnVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gQUlwbGFjZVNoaXAoc2hpcCl7XHJcbiAgICAgICAgICAgIEFJR2FtZWJvYXJkLnBsYWNlbWVudChzaGlwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gQUlhZGRHYXAoc2hpcCl7XHJcbiAgICAgICAgICAgIHNoaXAgPSBwbGFjZUdhcChzaGlwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBDYXJyaWVyUGx1c0dhcCA9IHBsYWNlR2FwKENhcnJpZXIpO1xyXG4gICAgICAgIEFJR2FtZWJvYXJkLnBsYWNlbWVudChDYXJyaWVyKTtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIC8vbGV0IENhcnJpZXJBbmRHYXAgPSBwbGFjZUdhcChDYXJyaWVyKTtcclxuXHJcbiAgICAgICAgLy8gaW5pdGlhdGUgcmFuZG9taXplclxyXG4gICAgICAgIC8vIGFkZCBnYXAgdG8gcmFuZG9taXplciBcclxuICAgICAgICAvLyBwbGFjZSBmaXJzdCBzaGlwIGluc2lkZSBnYW1ib2FyZFxyXG4gICAgICAgIC8vIGluaXRpYXRlIHJhbmRvbWl6ZXJcclxuICAgICAgICAvLyBjaGVjayBpZiBpdHMgY2xhc2hpbmcgd2l0aCBwbGFjZWQgc2hpcCBpbnNpZGUgdGhlIGdhbWVib2FyZFxyXG4gICAgICAgIC8vIGlmIGl0cyBjbGFzaGluZywgcmUgaW5pdGlhdGUgcmFuZG9taXplciwgdGhlbiBjaGVjayBhZ2Fpbi5cclxuICAgICAgICAvLyBpZiBpdHMgbm90IGNsYXNoaW5nLCBhZGQgZ2FwIHRvIG5ldyBzaGlwXHJcbiAgICAgICAgLy8gcGxhY2Ugc2hpcCBpbnNpZGUgdGhlIGdhbWVib2FyZFxyXG4gICAgICAgIFxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgY29vcmRpbmF0ZSBmaXJzdCwgdGhlbiBnb2luZyB1cFxyXG4gICAgICAgIC8vIGNoZWNrIHRoZSBwbGFjZVJhbmRvbWl6ZXIsIGlmIGFueSBlbGVtZW50IGZyb20gaXQgd2lsbCBjbGFzaCB3aXRoIGN1cnJlbnQgYXJyYXkgb2YgcGxhY2VtZW50XHJcbiAgICAgICAgLy8gY29uc3Qgc2hpcENvb3IgPSAnMWEsMmEsM2EsNGEsNWEnO1xyXG4gICAgICAgLy8gY29uc3Qgc2hpZWxkU2hpcCA9IHNoaWVsZFNoaXAoc2hpcENvb3IpO1xyXG4gICAgICAgIC8vIGNvbnN0IGZha2VTaGlwID0gc2hpcHMoc2hpcENvb3IpO1xyXG4gICAgICAgIC8vIEFJR2FtZWJvYXJkLnBsYWNlbWVudChmYWtlU2hpcCk7XHJcbiAgICAgICAgLy9BSUdhbWVib2FyZC5jaGVja0FsbExvY2F0aW9uKCk7XHJcbiAgICAgICAgLy8gbGV0IGJpZ1NoaXBDb29yID0gcGxhY2VSYW5kb21pemVyKDUpOyAvLyBnZXQgZGF0YSBmcm9tIERPTVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGJpZ1NoaXBDb29yKTtcclxuICAgICAgICAvLyAgICAgYmlnU2hpcENvb3IgPSBwbGFjZVJhbmRvbWl6ZXIoNSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYmlnU2hpcENvb3IpICBcclxuICAgICAgICAvLyBpZiAoZmluZENvbW1vbkVsZW1lbnRzKEFJR2FtZWJvYXJkLmNoZWNrQWxsTG9jYXRpb24oKSwgYmlnU2hpcENvb3IpID09PSB0cnVlKXsgLy8gaW5jbHVkaW5nIFwidGhlIHNoaWVsZFwiLCB5b3UgY2Fubm90IHBsYWNlIHRoZSBlbGVtZW50cyBpbiB0aGF0IGFyZWFcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ0NMQVNIRUQnKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gbGV0IGJpZ1NoaXBDb29yID0gcGxhY2VSYW5kb21pemVyKDUpLnRvU3RyaW5nKCk7IC8vIGdldCBkYXRhIGZyb20gRE9NXHJcbiAgICAgICAgLy9sZXQgYmlnU2hpcCA9IHNoaXBzKGJpZ1NoaXBDb29yKTsgLy8gY29vcmRpbmF0ZSBhc3NpZ24gdG8gc2hpcHMoKVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGJpZ1NoaXAudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgLy9BSUdhbWVib2FyZC5wbGFjZW1lbnQoYmlnU2hpcCk7XHJcbiAgICAgICAgLy9BSUdhbWVib2FyZC5jaGVja0FsbExvY2F0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB2ZXJzdXNBSTogKCk9PntcclxuICAgICAgICAvLyBBSSBhdXRvbWF0aWNhbGx5IHBsYWNlIHRoZSBzaGlwcyBcclxuICAgICAgICAvLyBBSSByYW5kb21pemVyIHBsYWNlbWVudCBtaXJpcCByYW5kb20gYnV0dG9uIGh1bWFuIHBsYWNlbWVudFxyXG4gICAgICAgIC8vIEFJR2FtZWJvYXJkLnBsYWNlbWVudCgpXHJcbiAgICAgICAgQUlQbGFjZW1lbnQoKTtcclxuICAgICAgICAvLyBwbGF5ZXIgbWFudWFsbHkgcGxhY2UgdGhlIHNoaXBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vc3RhcnRHYW1lKCkudmVyc3VzQUkoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=