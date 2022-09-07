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
        
        function AIPlaceShip(val){
            const coord = (0,_placeRandomizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(val);
            const shield = (0,_placeGap_js__WEBPACK_IMPORTED_MODULE_5__["default"])(coord);
            const ship = (0,_ships_js__WEBPACK_IMPORTED_MODULE_2__["default"])(coord);
            
            

        }   
        
        
        
        
        
        
        
        
        
        
        
        // let Carrier = placeRandomizer(5);
        // let Battleship = placeRandomizer(4);
        // let Cruiser = placeRandomizer(3);
        // let Destroyer = placeRandomizer(2);
        
        // function randomizeAgain(ship, num){
        //     ship = placeRandomizer(num);
        // }
        // function AIplaceShip(ship){
        //     AIGameboard.placement(ship);
        // }
        // function AIaddGap(ship){
        //     ship = placeGap(ship);
        // }

        // let CarrierPlusGap = placeGap(Carrier);
        // AIGameboard.placement(Carrier);

        
        

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LDBGQUEwRjtBQUMxRjtBQUNBO0FBQ0EsNERBQTREO0FBQzVELDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9maW5kQ29tbW9uRWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9sYXlvdXRHcmlkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxhY2VHYXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGFjZVJhbmRvbWl6ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tYWluZ2FtZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBmaW5kQ29tbW9uRWxlbWVudHMoYXJyMSwgYXJyMikge1xyXG4gICAgcmV0dXJuIGFycjEuc29tZShpdGVtID0+IGFycjIuaW5jbHVkZXMoaXRlbSkpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZpbmRDb21tb25FbGVtZW50cyIsIlxyXG5jb25zdCBnYW1lYm9hcmQgPSAoKT0+IHtcclxuICAgIGxldCBhbGxTaGlwID0gW107XHJcbiAgICBsZXQgdG90YWxIZWFsdGggPSAwO1xyXG4gICAgbGV0IGFsbExvY2F0aW9uID0gW107XHJcbiAgICBsZXQgYXR0YWNrTWlzc2VkID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gcmVmcmVzaEFsbExvY2F0aW9uKCl7XHJcbiAgICAgICAgbGV0IG5ld0xvY2F0aW9uID0gW107XHJcbiAgICAgICAgYWxsU2hpcC5mb3JFYWNoKChzaGlwKT0+e1xyXG4gICAgICAgICAgICBuZXdMb2NhdGlvbiA9IG5ld0xvY2F0aW9uLmNvbmNhdChzaGlwLmxvY2F0aW9uKCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFsbExvY2F0aW9uID0gbmV3TG9jYXRpb247XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBhdHRhY2tNaXNzZWRDb3VudGVyKGNvb3Ipe1xyXG4gICAgICAgIGF0dGFja01pc3NlZC5wdXNoKGNvb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vY29uc29sZS5sb2coJ2dhbWVib2FyZCBpcyBvbicpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwbGFjZW1lbnQ6IChzaGlwcyk9PnsgLy8gZG9udCBuZWVkIGNvb3Igc2luY2UgY29vcmRpbmF0ZSBzaG91bGQgYmUgaW5zaWRlIHRoZSBzaGlwKClcclxuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHRoZSBjb29yZGluYXRlIGlzIHZhbGlkLCB3aGljaCBtZWFucyBlbXB0eSBhbmQgb25lIGJsb2NrIGF3YXkgZnJvbSBhbm90aGVyIHNoaXBcclxuICAgICAgICAgICAgLy8gcGxhY2UgdGhlIHNoaXBzIG9uIHRoZSBjb29yZGluYXRlICAgICBcclxuICAgICAgICAgICAgYWxsU2hpcC5wdXNoKHNoaXBzKTtcclxuICAgICAgICAgICAgYWxsTG9jYXRpb24gPSBhbGxMb2NhdGlvbi5jb25jYXQoc2hpcHMubG9jYXRpb24oKSk7XHJcbiAgICAgICAgICAgIC8vIG1hcmtzIHRoZSBjb29yZGluYXRlIHdpdGggc2hpcHMnIG1hcmtzXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVjZWl2ZUF0dGFjazogKGNvb3IpPT57XHJcbiAgICAgICAgICAgIGlmKGFsbExvY2F0aW9uLmluY2x1ZGVzKGNvb3IpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQXR0YWNrIG1pc3NlZCcpXHJcbiAgICAgICAgICAgICAgICBhdHRhY2tNaXNzZWRDb3VudGVyKGNvb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBdHRhY2sgSGl0IScpXHJcbiAgICAgICAgICAgICAgICBhbGxTaGlwLmZvckVhY2goKHNoaXApPT57XHJcbiAgICAgICAgICAgICAgICAgICAgc2hpcC5oaXQoY29vcik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIHJlZnJlc2ggdGhlIGFsbExvY2F0aW9uIEFycmF5IHNvIHlvdSBjYW5ub3QgaGl0IHR3aWNlIG9uIHRoZSBzYW1lIGNvb3JkaW5hdGVcclxuICAgICAgICAgICAgICAgIHJlZnJlc2hBbGxMb2NhdGlvbigpXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIC8vIHRvZ2dsZSBjaGVja0FsbFNoaXAoKSB0byBtYWtlIHN1cmUgaWYgaXRzIG5vdCBlbmRnYW1lXHJcbiAgICAgICAgICAgIC8vIGlmIG5vdCBtYXJrcyB0aGUgY29vcmRpbmF0ZSB3aXRoIG1pc3NlZEF0dGFjaygpXHJcbiAgICAgICAgICAgIC8vcmV0dXJuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaGVja1RvdGFsSGVhbHRoOiAoKT0+e1xyXG4gICAgICAgICAgICAvLyBjaGVjayB0aGUgaGVhbHRoYmFyIG9mIGVhY2ggc2hpcHMgd2l0aCBzaGlwLmhlYWx0aGJhcigpXHJcbiAgICAgICAgICAgIGFsbFNoaXAuZm9yRWFjaCgoc2hpcCk9PntcclxuICAgICAgICAgICAgICAgIHNoaXAubG9jYXRpb24oKTsgXHJcbiAgICAgICAgICAgICAgICB0b3RhbEhlYWx0aCA9IHRvdGFsSGVhbHRoICsgc2hpcC5oZWFsdGhCYXIoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRvdGFsSGVhbHRoKTtcclxuICAgICAgICAgICAgLy8gaWYgYWxsIHRoZSBoZWFsdGhiYXIgaXMgMCB0aGVuIHRoZSBnYW1lIGlzIGVuZGVkXHJcbiAgICAgICAgICAgIGlmKHRvdGFsSGVhbHRoIDw9IDApe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHQU1FIE9WRVIgQUxMIE9GIFlPVVIgU0hJUFMgV1JFQ0tFRFwiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvdGFsSGVhbHRoXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0b3RhbEhlYWx0aFxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2hlY2tBbGxMb2NhdGlvbjogKCk9PntcclxuICAgICAgICAgICAgcmVmcmVzaEFsbExvY2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFsbExvY2F0aW9uKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFsbExvY2F0aW9uXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaGVja0F0dGFja01pc3NlZDogKCk9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYXR0YWNrTWlzc2VkKTtcclxuICAgICAgICAgICAgcmV0dXJuIGF0dGFja01pc3NlZFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdhbWVib2FyZDtcclxuXHJcbi8vIGNvbnN0IHBsYXlhID0gZ2FtZWJvYXJkKCk7XHJcbi8vIGNvbnN0IGJpZ1NoaXBDb29yID0gJzZCIDdCIDhCIDlCIDEwQic7XHJcbi8vIGNvbnN0IG1pZFNoaXBDb29yID0gJzRCIDRDIDREJztcclxuLy8gY29uc3QgbWlkU2hpcCA9IHNoaXBzKG1pZFNoaXBDb29yKTtcclxuLy8gY29uc3QgYmlnU2hpcCA9IHNoaXBzKGJpZ1NoaXBDb29yKTtcclxuXHJcbi8vIHBsYXlhLnBsYWNlbWVudChiaWdTaGlwKTtcclxuLy8gcGxheWEucGxhY2VtZW50KG1pZFNoaXApO1xyXG4vLyBwbGF5YS5yZWNlaXZlQXR0YWNrKFwiNEJcIik7ZGVidWdnZXJcclxuLy8gcGxheWEucmVjZWl2ZUF0dGFjayhcIjRDXCIpO2RlYnVnZ2VyXHJcbi8vIHBsYXlhLnJlY2VpdmVBdHRhY2soXCI0RFwiKTtkZWJ1Z2dlclxyXG4vLyBwbGF5YS5yZWNlaXZlQXR0YWNrKFwiM0JcIik7ZGVidWdnZXJcclxuLy8gcGxheWEuY2hlY2tBbGxMb2NhdGlvbigpO1xyXG4vLyBwbGF5YS5jaGVja0F0dGFja01pc3NlZCgpO1xyXG4vLyBwbGF5YS5jaGVja1RvdGFsSGVhbHRoKCk7IFxyXG4vLyByZXZpc2UgdGhpc1xyXG4vLyBwbGF5YS5wbGFjZW1lbnQoJzFBIDJBIDNBJywgc2hpcHMoMykpO1xyXG4vLyBwbGF5YS5wbGFjZW1lbnQoJzNCIDRCJywgc2hpcHMoMikpO1xyXG4vLyBwbGF5YS5wbGFjZW1lbnQoJzZCIDdCIDhCIDlCIDEwQicsIHNoaXBzKDUpKTtcclxuLy8gcGxheWEucGxhY2VtZW50KCc2RSA3RSA4RSA5RSAxMEUnLCBzaGlwcyg1KSk7IiwiXHJcbmZ1bmN0aW9uIGNyZWF0ZUdyaWQod2hvcyl7XHJcbiAgICBjb25zdCBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3dob3N9R2FtZWJvYXJkYCk7XHJcbiAgICBjb25zdCBNQVhfV0lEVEggPSAxMDtcclxuICAgIGNvbnN0IGFscGhhYmV0ID0gJ2FiY2RlZmdoaWonO1xyXG4gICAgY29uc3QgYWxwaEFycmF5ID0gYWxwaGFiZXQuc3BsaXQoJycpO1xyXG5cclxuICAgIGFscGhBcnJheS5mb3JFYWNoKChhbHApPT57XHJcbiAgICAgICAgZm9yIChsZXQgaT0xOyBpIDw9IE1BWF9XSURUSDsgaSsrICl7XHJcbiAgICAgICAgICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgZ3JpZC5jbGFzc05hbWU9YCR7aX0ke2FscH1gO1xyXG4gICAgICAgICAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGdyaWQuY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgIC8vIGNsaWNrZWQgdGhlIGdyaWRcclxuICAgICAgICAgICAgICAgIC8vIGluaXRpYXRlIGF0dGFjaygpIC8vIHRoZW4gQUkgYXR0YWNrIHlvdXJzIHRvb1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBsYXllci5hcHBlbmQoZ3JpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIC8vIGZvcihsZXQgaSA9IDA7IGkgPCBNQVhfV0lEVEg7IGkrKyl7XHJcbiAgICAvLyAgICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgLy8gfVxyXG5cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVHcmlkIiwiLy8gc2V0IGdhcCBieSBvbmUgYnkgb25lIGxvb3AgY2hlY2tcclxuXHJcbmZ1bmN0aW9uIHBsYWNlR2FwKG1haW5BcnJheSl7XHJcbiAgICBsZXQgb3V0cHV0QXJyYXkgPSBbXTtcclxuICAgIGxldCByZXN1bHRBcnJheSA9IFtdO1xyXG4gICAgY29uc3QgbnVtYmVyUGF0dCA9IC9bMC05XS9nO1xyXG4gICAgY29uc3QgYWxwaGFQYXR0ID0gL1thLXpBLVpdL2c7XHJcbiAgICBjb25zdCBhbHBoYWJldE1heCA9ICdhYmNkZWZnaGlqJztcclxuICAgIGNvbnN0IGFscEFycmF5ID0gYWxwaGFiZXRNYXguc3BsaXQoJycpO1xyXG4gICAgbWFpbkFycmF5LmZvckVhY2goKHZhbCk9PntcclxuICAgICAgICBjb25zdCBudW1iID0gcGFyc2VJbnQodmFsLm1hdGNoKG51bWJlclBhdHQpLmpvaW4oJycpKTtcclxuICAgICAgICBjb25zdCBhbHBoID0gdmFsLm1hdGNoKGFscGhhUGF0dCkuam9pbignJyk7XHJcbiAgICAgICAgY29uc3QgbnVtYk1pbnVzT25lID0gbnVtYiAtIDE7XHJcbiAgICAgICAgY29uc3QgbnVtYlBsdXNPbmUgPSBudW1iICsgMTtcclxuICAgICAgICBjb25zdCBhbHBoUGx1c09uZSA9IGFscEFycmF5WyhhbHBBcnJheS5pbmRleE9mKGFscGgpKSsxXTtcclxuICAgICAgICBjb25zdCBhbHBoTWludXNPbmUgPSBhbHBBcnJheVsoYWxwQXJyYXkuaW5kZXhPZihhbHBoKSktMV07XHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gbWVyZ2VBcnJheSgpe1xyXG4gICAgICAgICAgICAgIC8vIG1lcmdlIHRoZSBhcnJheVxyXG4gICAgICAgICAgICByZXN1bHRBcnJheSA9IHJlc3VsdEFycmF5LmNvbmNhdChvdXRwdXRBcnJheSk7XHJcbiAgICAgICAgICAgIHJlc3VsdEFycmF5ID0gWy4uLm5ldyBTZXQgKFsuLi5tYWluQXJyYXksLi4ub3V0cHV0QXJyYXldKV07ICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tSaWdodCgpe1xyXG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKChudW1iUGx1c09uZSkudG9TdHJpbmcoKS5jb25jYXQoYWxwaCkpOyAvLyByaWdodFxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBjaGVja0xlZnQoKXtcclxuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaCgobnVtYk1pbnVzT25lKS50b1N0cmluZygpLmNvbmNhdChhbHBoKSk7IC8vIGxlZnRcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tVcCgpe1xyXG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKChudW1iKS50b1N0cmluZygpLmNvbmNhdChhbHBoTWludXNPbmUpKTsgLy8gdXBcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tEb3duKCl7XHJcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goKG51bWIpLnRvU3RyaW5nKCkuY29uY2F0KGFscGhQbHVzT25lKSk7IC8vIGRvd25cclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tEaWFnVXBSaWdodCgpe1xyXG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKChudW1iUGx1c09uZSkudG9TdHJpbmcoKS5jb25jYXQoYWxwaE1pbnVzT25lKSk7IC8vIHVwIHJpZ2h0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrRGlhZ0Rvd25SaWdodCgpe1xyXG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKChudW1iUGx1c09uZSkudG9TdHJpbmcoKS5jb25jYXQoYWxwaFBsdXNPbmUpKTsgLy8gZG93biByaWdodFxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBjaGVja0RpYWdVcExlZnQoKXtcclxuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaCgobnVtYk1pbnVzT25lKS50b1N0cmluZygpLmNvbmNhdChhbHBoTWludXNPbmUpKTsgLy8gdXAgbGVmdFxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBjaGVja0RpYWdEb3duTGVmdCgpe1xyXG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKChudW1iTWludXNPbmUpLnRvU3RyaW5nKCkuY29uY2F0KGFscGhQbHVzT25lKSk7IC8vIGRvd24gbGVmdFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYWxwaE1pbnVzT25lID09IHVuZGVmaW5lZCAmJiBudW1iTWludXNPbmUgPCAxKXsgLy8gY29ybmVyIHVwIGxlZnRcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdHMgY29ybmVyIHVwIGxlZnQnKTtcclxuICAgICAgICAgICAgY2hlY2tSaWdodCgpO1xyXG4gICAgICAgICAgICBjaGVja0Rvd24oKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnRG93blJpZ2h0KCk7XHJcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFscGhQbHVzT25lID09IHVuZGVmaW5lZCAmJiBudW1iTWludXNPbmUgPCAxKXsgLy8gY29ybmVyIGJvdHRvbSBsZWZ0XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXRzIGNvcm5lciBib3R0b20gbGVmdCcpO1xyXG4gICAgICAgICAgICBjaGVja1JpZ2h0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrVXAoKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnVXBSaWdodCgpO1xyXG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhbHBoTWludXNPbmUgPT0gdW5kZWZpbmVkICYmIG51bWJQbHVzT25lID4gMTApeyAvLyBjb3JuZXIgdXAgcmlnaHQgXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXRzIGNvcm5lciB1cCByaWdodCcpO1xyXG4gICAgICAgICAgICBjaGVja0xlZnQoKTtcclxuICAgICAgICAgICAgY2hlY2tEb3duKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25MZWZ0KCk7XHJcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFscGhQbHVzT25lID09IHVuZGVmaW5lZCAmJiBudW1iUGx1c09uZSA+IDEwKXsgLy8gY29ybmVyIGJvdHRvbSByaWdodFxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0cyBjb3JuZXIgYm90dG9tIHJpZ2h0Jyk7XHJcbiAgICAgICAgICAgIGNoZWNrTGVmdCgpO1xyXG4gICAgICAgICAgICBjaGVja1VwKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ1VwTGVmdCgpO1xyXG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChudW1iTWludXNPbmUgPCAxKXtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdCBudW1iZXIgPSAwJyk7XHJcbiAgICAgICAgICAgIGNoZWNrUmlnaHQoKTtcclxuICAgICAgICAgICAgY2hlY2tVcCgpO1xyXG4gICAgICAgICAgICBjaGVja0Rvd24oKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnVXBSaWdodCgpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdEb3duUmlnaHQoKTtcclxuICAgICAgICAgICAgbWVyZ2VBcnJheSgpO1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihudW1iUGx1c09uZSA+IDEwKXtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdCBudW1iZXIgPiAxMCcpO1xyXG4gICAgICAgICAgICBjaGVja0xlZnQoKTtcclxuICAgICAgICAgICAgY2hlY2tVcCgpO1xyXG4gICAgICAgICAgICBjaGVja0Rvd24oKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnVXBMZWZ0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25MZWZ0KCk7XHJcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFscGhNaW51c09uZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0cyB1bmRlZmluZWQnKTtcclxuICAgICAgICAgICAgY2hlY2tMZWZ0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrUmlnaHQoKTtcclxuICAgICAgICAgICAgY2hlY2tEb3duKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25MZWZ0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25SaWdodCgpOyBcclxuICAgICAgICAgICAgbWVyZ2VBcnJheSgpO1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYWxwaFBsdXNPbmUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdHMgdW5kZWZpbmVkJyk7XHJcbiAgICAgICAgICAgIGNoZWNrTGVmdCgpO1xyXG4gICAgICAgICAgICBjaGVja1JpZ2h0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrVXAoKTsgXHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ1VwTGVmdCgpOyBcclxuICAgICAgICAgICAgY2hlY2tEaWFnVXBSaWdodCgpO1xyXG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgLy8gaG9yaXpvbnRhbCBjaGVja1xyXG4gICAgICAgICAgICAgICAgY2hlY2tMZWZ0KCk7XHJcbiAgICAgICAgICAgICAgICBjaGVja1JpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICAvLyB2ZXJ0aWNhbCBjaGVja1xyXG4gICAgICAgICAgICAgICAgY2hlY2tVcCgpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tEb3duKCk7XHJcbiAgICAgICAgICAgICAgICAvL2RpYWdvbmFsIGxlZnQgY2hlY2tcclxuICAgICAgICAgICAgICAgIGNoZWNrRGlhZ1VwTGVmdCgpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tEaWFnRG93bkxlZnQoKTtcclxuICAgICAgICAgICAgICAgIC8vZGlhZ29uYWwgcmlnaHQgY2hlY2tcclxuICAgICAgICAgICAgICAgIGNoZWNrRGlhZ1VwUmlnaHQoKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25SaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgbWVyZ2VBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBcclxuXHJcbiAgICB9KTtcclxuICAgIC8vIGNvbnNvbGUubG9nKG91dHB1dEFycmF5KTtcclxuICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdEFycmF5KTtcclxuICAgIHJldHVybiByZXN1bHRBcnJheVxyXG59XHJcblxyXG4vLyBsZXQgYXJyYXkxID0gWydhJywnYicsJ2MnXTtcclxuLy8gbGV0IGFycmF5MiA9IFsneicsJ2EnLCdzJ107XHJcblxyXG4vLyBsZXQgYXJyYXkzID0gYXJyYXkxLmNvbmNhdChhcnJheTIpO1xyXG4vLyBhcnJheTMgPSBbLi4ubmV3IFNldChbLi4uYXJyYXkxLC4uLmFycmF5Ml0pXVxyXG5cclxuLy8gY29uc29sZS5sb2coYXJyYXkzKTsgXHJcblxyXG4vLyBwbGFjZUdhcChbJzEwaiddKTtcclxuLy8gcGxhY2VHYXAoWycxMGMnLCAnMTBkJywgJzEwZSddKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBsYWNlR2FwIiwiZnVuY3Rpb24gcGxhY2VSYW5kb21pemVyKGxlbmcpe1xyXG4gICAgY29uc3QgTUFYX0dSSUQgPSAxMDsgLy8gbWF4aW11bSBncmlkIGxlbmd0aCBpcyAxMHgxMFxyXG4gICAgY29uc3QgcmFuZG9tQXhpcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpOyAvLyBvbmx5IHJldHVybiAwLzFcclxuICAgIGNvbnN0IGFycmF5ID0gW107XHJcbiAgICBjb25zdCBhbHBoYWJldCA9IFwiYWJjZGVmZ2hpalwiO1xyXG4gICAgY29uc3QgcmFuZG9tTnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKE1BWF9HUklEIC0gbGVuZykpICsgMTsgLy8gdGhpcyByYW5kb21pemVyIG51bWJlciBrZWVwIHlvdSBmcm9tIG92ZXJmbG93aW5nLCBwbHVzIG9uZSBzbyBpdCBzdGFydCBmcm9tIDEgbm90IDBcclxuICAgIGNvbnN0IHJhbmRvbUFscCA9IGFscGhhYmV0W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFscGhhYmV0LnN1YnN0cmluZygwLChNQVhfR1JJRCAtIGxlbmcpKS5sZW5ndGgpXTsgLy8gdGhpcyByYW5kb21pemVyIGtlZXBzIHlvdSBmcm9tIHZhbHVlIG1vcmUgdGhhbiBsZW5ndGhcclxuICAgIGxldCBhbHBoYU51bTtcclxuXHJcbiAgICBpZiAocmFuZG9tQXhpcyA9PT0gMCl7IC8vIFggYXhpcyBibG9ja3NcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8bGVuZzsgaSsrICl7XHJcbiAgICAgICAgICAgIGFscGhhTnVtID0gKHJhbmRvbU51bWJlciArIGkpLnRvU3RyaW5nKCkuY29uY2F0KHJhbmRvbUFscCk7XHJcbiAgICAgICAgICAgIGFycmF5LnB1c2goYWxwaGFOdW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhhcnJheSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmFuZG9tQXhpcyk7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5XHJcbiAgICB9XHJcbiAgICBlbHNlIHsgLy8gWSBheGlzIGJsb2Nrc1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDxsZW5nOyBpKysgKXtcclxuICAgICAgICAgICAgY29uc3QgYWxwTG9vcCA9IGFscGhhYmV0LmNoYXJBdChhbHBoYWJldC5pbmRleE9mKHJhbmRvbUFscCkgKyBpKTtcclxuICAgICAgICAgICAgYWxwaGFOdW0gPSAocmFuZG9tTnVtYmVyKS50b1N0cmluZygpLmNvbmNhdChhbHBMb29wKTtcclxuICAgICAgICAgICAgYXJyYXkucHVzaChhbHBoYU51bSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGFycmF5KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhyYW5kb21BeGlzKTtcclxuICAgICAgICByZXR1cm4gYXJyYXlcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBwbGFjZVJhbmRvbWl6ZXIiLCJcclxuLy8gY29uc3QgeW91ckdhbWVib2FyZCA9IGdhbWVib2FyZCgpO1xyXG4vLyBjb25zdCBodW1hbkdhbWVib2FyZCA9IGdhbWVib2FyZCgpO1xyXG4vLyBjb25zdCBBSUdhbWVib2FyZCA9IGdhbWVib2FyZCgpO1xyXG5cclxuY29uc3QgcGxheWVyID0gKCkgPT4ge1xyXG4gICAgLy8gcGxheWVyIHNob3VsZCB0YWtlIHR1cm5zIHBsYXlpbmcgdGhlIGdhbWUgYnkgYXR0YWNraW5nIG9wcG9uZW50J3MgZ2FtZWJvYXJkLlxyXG4gICAgbGV0IGF0dGFja1N0YXR1cyA9ICdPRkYnO1xyXG4gICAgLy8gcGxheWVyIGF0dGFja2luZyBzdGF0ZSBpcyBPTlxyXG4gICAgLy8gcGxheWVyIENIT09TRSB0aGUgY29vcmRpbmF0ZSBvZiBvcHBvbmVudCdzIGdhbWVib2FyZC5cclxuICAgIC8vIHBsYXllciBhdHRhY2tpbmcgc3RhdGUgaXMgT0ZGXHJcbiAgICAvLyBsZXQgeW91ckdhbWVib2FyZCA9IGdhbWVib2FyZCgpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0b2dnbGVBdHRhY2tPTiA6ICgpPT4gYXR0YWNrU3RhdHVzID0gXCJPTlwiLFxyXG4gICAgICAgIHRvZ2dsZUF0dGFja09GRiA6ICgpPT4gYXR0YWNrU3RhdHVzID0gXCJPRkZcIixcclxuICAgICAgICBjaGVja0F0dGFjazogKCk9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGF0dGFja1N0YXR1cyk7IFxyXG4gICAgICAgICAgICByZXR1cm4gYXR0YWNrU3RhdHVzXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcclxuICAgIH1cclxufVxyXG5cclxuLy8gbGV0IHBsYXllID0gcGxheWVyKCk7XHJcblxyXG5cclxuLy8gcGxheWUuY2hlY2tBdHRhY2soKTtcclxuLy8gcGxheWUudG9nZ2xlQXR0YWNrT04oKTtcclxuLy8gcGxheWUuY2hlY2tBdHRhY2soKTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBwbGF5ZXI7IiwiXHJcbmNvbnN0IHNoaXBzID0gKGxvYykgPT57IC8vIGxlbmd0aCB3aWxsIGJlIGZyb20gc2l6ZSBvZiB0aGUgc2hpcFxyXG4gICAgbGV0IGNvb3JkID0gbG9jLnNwbGl0KCcsJyk7XHJcbiAgICBsZXQgaGVhbHRoQmFyID0gY29vcmQubGVuZ3RoO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBsZW5ndGg6ICgpPT57XHJcbiAgICAgICAgICAgIHJldHVybiBsZW4gXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoaXQ6IChsb2MpPT57XHJcbiAgICAgICAgICAgIC8vZ2V0IHRoZSBhdHRjayBoaXQgbG9jYXRpb25cclxuICAgICAgICAgICAgaWYgKGNvb3JkLmluY2x1ZGVzKGxvYykgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJhdHRhY2sgbWlzc2VkXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGNvb3JkLmluY2x1ZGVzKGxvYykgPT09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgY29vcmQgPSBjb29yZC5maWx0ZXIoICh2YWwpPT57XHJcbiAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsICE9PSBsb2NcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaGVhbHRoQmFyID0gaGVhbHRoQmFyIC0gMTtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vbWFyayBwb3NpdGlvbiBpbiBnYW1lYm9hcmQgYXMgYSBoaXRcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ0aGlzIHNoaXAgdG9vayBoaXQ6IFwiICsgbnVtKVxyXG4gICAgICAgICAgICAvL3JldHVybiBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzU3VuazogKCk9PntcclxuICAgICAgICAgICAgLy9jaGVjayB0aGUgc2hpcCBpZiBzdW5rZW4geWV0XHJcbiAgICAgICAgICAgIGlmKGhlYWx0aEJhciA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2hpcCBpcyBkZXN0cm95ZWQnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAgXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NoaXAgaXMgc3RpbGwgaW50YWN0Jyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBcclxuICAgICAgICBoZWFsdGhCYXIgOiAoKT0+IHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInRoaXMgc2hpcCBoZWFsdGg6IFwiICsgaGVhbHRoQmFyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGhlYWx0aEJhclxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbG9jYXRpb246ICgpPT57XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coY29vcmQpXHJcbiAgICAgICAgICAgIHJldHVybiBjb29yZFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gY29uc3QgYmlnU2hpcCA9IHNoaXBzKFwiM0EgNEEgNUEgNkEgN0FcIik7XHJcbi8vIGNvbnN0IG1pZFNoaXAyID0gc2hpcHMoXCIxMkEgMTJCIDEyQ1wiKTtcclxuLy8gY29uc3Qgc21hbGxTaGlwID0gc2hpcHMoXCI0QlwiKTtcclxuXHJcbi8vIGJpZ1NoaXAubG9jYXRpb24oKTtcclxuLy8gYmlnU2hpcC5oZWFsdGhCYXIoKTtcclxuLy8gYmlnU2hpcC5oaXQoXCIzQVwiKTtcclxuLy8gYmlnU2hpcC5sb2NhdGlvbigpO1xyXG4vLyBiaWdTaGlwLmhlYWx0aEJhcigpO1xyXG4vLyBiaWdTaGlwLmhpdChcIjhBXCIpO1xyXG4vLyBiaWdTaGlwLmxvY2F0aW9uKCk7XHJcbi8vIGJpZ1NoaXAuaGVhbHRoQmFyKCk7XHJcbi8vIGJpZ1NoaXAuaGl0KFwiNEFcIik7XHJcbi8vIGJpZ1NoaXAuaGl0KFwiNUFcIik7XHJcbi8vIGJpZ1NoaXAuaGl0KFwiNkFcIik7XHJcbi8vIGJpZ1NoaXAubG9jYXRpb24oKTtcclxuLy8gYmlnU2hpcC5oZWFsdGhCYXIoKTtcclxuLy8gYmlnU2hpcC5pc1N1bmsoKTtcclxuLy8gYmlnU2hpcC5oaXQoXCI3QVwiKTtcclxuLy8gYmlnU2hpcC5sb2NhdGlvbigpO1xyXG4vLyBiaWdTaGlwLmhlYWx0aEJhcigpO1xyXG4vLyBiaWdTaGlwLmlzU3VuaygpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgc2hpcHMiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIGluIHRoaXMgZmlsZSB3ZSBhcmUgZ29ubmEgZ2F0aGVyIGFsbCB0aGUgY29tcG9uZW50cyBvZiBCYXR0bGVzaGlwIFRoZSBHYW1lIGFuZCB0dXJuIGl0IGludG8gcmVhbCBnYW1lXHJcblxyXG4vLyBwbGF5ZXIuIFdoYXQgZG9lcyBwbGF5ZXIgZG8uXHJcbi8vIHBsYXllciBzdGFydCB0aGUgZ2FtZSBieSBjaG9vc2luZyB3aG8geW91cmUgcGxheWluZyB3aXRoXHJcbi8vIHBsYXllciBjaG9vc2UgaXMgaXQgZ29ubmEgYmUgdnMgQUkgb3IgdnMgSHVtYW5cclxuLy8gYXQgdGhpcyBwb2ludCwgaWYgeW91IGNob29zZSBBSS4gQUkgd2lsbCBhdXRvbWF0aWNhbGx5IHBsYWNlIHRoZWlyIHNoaXBzIHJhbmRvbWx5IG9uIGdhbWVib2FyZC5cclxuLy8gcGxheWVyIGNob29zZSB0aGUgc2hpcHMgcGxhY2VtZW50IGFjY3Jvc3MgdGhlIGdhbWVib2FyZC5cclxuLy8gc2hpcCdzIHBsYWNlbWVudCBpcyBiYXNlZCBvbiBvbmUgcnVsZSB0aGF0IHRoZXJlIGlzIGFsd2F5cyBvbmUgZW1wdHkgYmxvY2sgYmV0d2VlbiBvbmUgYW5kIGFub3RoZXIgcGxhY2VkIHNoaXBzXHJcbi8vIHBsYXllciBoYXZlIGEgY2hvaWNlIHRvIHJhbmRvbWx5IHBsYWNlIHRoZSBzaGlwcyBieSBjbGlja2luZyB0aGUgcmFuZG9tIGJ1dHRvbi4gXHJcbi8vIHBsYXllciBwbGFjZW1lbnQgb3JkZXIgaXMuLiBmaXJzdCB5b3UgcGxhY2Ugb25lIGJpZyBzaGlwICg1IGluIGxlbmd0aCksIHRoZW4gdHdvIG1pZCBzaGlwICgzIGluIGxlbmd0aCksIHRoZW4gdGhyZWUgc21hbGwgc2hpcCAoMiBpbiBsZW5ndGgpIFxyXG4vLyBhZnRlciBhbGwgc2hpcHMgYXJlIHBsYWNlZCwgZ2FtZSBpbml0aWF0ZSB0byBzdGFydCBhdHRhY2tpbmcgYnkgY2hvb3NpbmcgdGhlIG9wcG9uZW50cydzIGdhbWVib2FyZC4gVGhpcyBwaGFzZSB5b3UgY291bGQgaGl0IG9wcG9uZW50cydzIHNoaXAuXHJcbi8vIGFmdGVyIHlvdSBhdHRhY2sgb3Bwb25lbnQncyBzaGlwLCBnYW1lIGF1dG9tYXRpY2FsbHkgY2hhbmdlIHRvIG9wcG9uZW50J3MgdHVybi4gVGhpcyB0aW1lIE9wcG9uZW50J3Mgd2lsbCBpbml0aWF0ZSBhdHRhY2sgcGxheWVyJ3MgZ2FtZWJvYXJkIHJhbmRvbWx5LlxyXG4vLyBUaGUgQUkgZG9lcyBub3QgaGF2ZSB0byBiZSBzbWFydCwgYnV0IGl0IHNob3VsZCBrbm93IHdoZXRoZXIgb3Igbm90IGEgZ2l2ZW4gbW92ZSBpcyBsZWdhbC4gKGkuZS4gaXQgc2hvdWxkbuKAmXQgc2hvb3QgdGhlIHNhbWUgY29vcmRpbmF0ZSB0d2ljZSkuIFxyXG4vLyBHYW1lIHJlcGVhdGluZyB0aGUgcHJldmlvdXMgc3RlcCB1bnRpbCBvbmUgb2YgdGhlIHBsYXllci9BSSBzaGlwcyBhcmUgZnVsbHkgY2xlYW5lZCAoYWxsIGRlc3Ryb3llZClcclxuLy8gZ2FtZSBlbmRpbmcgaWYgb25lIG9mIHRoZSBwbGF5ZXIvQUkgdG90YWwgaGVhbHRoYmFyIChzaGlwcykgYXJlID0gMC4gXHJcbi8vIDFcdENhcnJpZXJcdDVcclxuLy8gMlx0QmF0dGxlc2hpcFx0NFxyXG4vLyAzXHRDcnVpc2VyXHQzXHJcbi8vIDRcdFN1Ym1hcmluZVx0M1xyXG4vLyA1XHREZXN0cm95ZXJcdDJcclxuXHJcblxyXG5pbXBvcnQgcGxheWVyIGZyb20gXCIuL3BsYXllci5qc1wiO1xyXG5pbXBvcnQgZ2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZC5qc1wiXHJcbmltcG9ydCBzaGlwcyBmcm9tIFwiLi9zaGlwcy5qc1wiO1xyXG5pbXBvcnQgcGxhY2VSYW5kb21pemVyIGZyb20gXCIuL3BsYWNlUmFuZG9taXplci5qc1wiO1xyXG5pbXBvcnQgZmluZENvbW1vbkVsZW1lbnRzIGZyb20gXCIuL2ZpbmRDb21tb25FbGVtZW50cy5qc1wiO1xyXG5pbXBvcnQgcGxhY2VHYXAgZnJvbSBcIi4vcGxhY2VHYXAuanNcIjtcclxuaW1wb3J0IGNyZWF0ZUdyaWQgZnJvbSBcIi4vbGF5b3V0R3JpZC5qc1wiO1xyXG5cclxuXHJcbi8vIGNvbnNvbGUubG9nKFBMQVlFUk9ORSk7ZGVidWdnZXJcclxuLy8gY29uc29sZS5sb2cocGxheWVyR2FtZWJvYXJkKTtkZWJ1Z2dlclxyXG5cclxuY3JlYXRlR3JpZCgnQUknKTtcclxuY3JlYXRlR3JpZCgncGxheWVyJyk7XHJcblxyXG5mdW5jdGlvbiBzdGFydEdhbWUoKXtcclxuICAgIGNvbnN0IFBMQVlFUk9ORSA9IHBsYXllcigpO1xyXG4gICAgY29uc3QgQUkgPSBwbGF5ZXIoKTtcclxuICAgIGNvbnN0IHBsYXllckdhbWVib2FyZCA9IGdhbWVib2FyZCgpO1xyXG4gICAgY29uc3QgQUlHYW1lYm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBBSVBsYWNlbWVudCgpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIEFJUGxhY2VTaGlwKHZhbCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvb3JkID0gcGxhY2VSYW5kb21pemVyKHZhbCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNoaWVsZCA9IHBsYWNlR2FwKGNvb3JkKTtcclxuICAgICAgICAgICAgY29uc3Qgc2hpcCA9IHNoaXBzKGNvb3JkKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICB9ICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gbGV0IENhcnJpZXIgPSBwbGFjZVJhbmRvbWl6ZXIoNSk7XHJcbiAgICAgICAgLy8gbGV0IEJhdHRsZXNoaXAgPSBwbGFjZVJhbmRvbWl6ZXIoNCk7XHJcbiAgICAgICAgLy8gbGV0IENydWlzZXIgPSBwbGFjZVJhbmRvbWl6ZXIoMyk7XHJcbiAgICAgICAgLy8gbGV0IERlc3Ryb3llciA9IHBsYWNlUmFuZG9taXplcigyKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBmdW5jdGlvbiByYW5kb21pemVBZ2FpbihzaGlwLCBudW0pe1xyXG4gICAgICAgIC8vICAgICBzaGlwID0gcGxhY2VSYW5kb21pemVyKG51bSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGZ1bmN0aW9uIEFJcGxhY2VTaGlwKHNoaXApe1xyXG4gICAgICAgIC8vICAgICBBSUdhbWVib2FyZC5wbGFjZW1lbnQoc2hpcCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGZ1bmN0aW9uIEFJYWRkR2FwKHNoaXApe1xyXG4gICAgICAgIC8vICAgICBzaGlwID0gcGxhY2VHYXAoc2hpcCk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvLyBsZXQgQ2FycmllclBsdXNHYXAgPSBwbGFjZUdhcChDYXJyaWVyKTtcclxuICAgICAgICAvLyBBSUdhbWVib2FyZC5wbGFjZW1lbnQoQ2Fycmllcik7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICAvL2xldCBDYXJyaWVyQW5kR2FwID0gcGxhY2VHYXAoQ2Fycmllcik7XHJcblxyXG4gICAgICAgIC8vIGluaXRpYXRlIHJhbmRvbWl6ZXJcclxuICAgICAgICAvLyBhZGQgZ2FwIHRvIHJhbmRvbWl6ZXIgXHJcbiAgICAgICAgLy8gcGxhY2UgZmlyc3Qgc2hpcCBpbnNpZGUgZ2FtYm9hcmRcclxuICAgICAgICAvLyBpbml0aWF0ZSByYW5kb21pemVyXHJcbiAgICAgICAgLy8gY2hlY2sgaWYgaXRzIGNsYXNoaW5nIHdpdGggcGxhY2VkIHNoaXAgaW5zaWRlIHRoZSBnYW1lYm9hcmRcclxuICAgICAgICAvLyBpZiBpdHMgY2xhc2hpbmcsIHJlIGluaXRpYXRlIHJhbmRvbWl6ZXIsIHRoZW4gY2hlY2sgYWdhaW4uXHJcbiAgICAgICAgLy8gaWYgaXRzIG5vdCBjbGFzaGluZywgYWRkIGdhcCB0byBuZXcgc2hpcFxyXG4gICAgICAgIC8vIHBsYWNlIHNoaXAgaW5zaWRlIHRoZSBnYW1lYm9hcmRcclxuICAgICAgICBcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIGNvb3JkaW5hdGUgZmlyc3QsIHRoZW4gZ29pbmcgdXBcclxuICAgICAgICAvLyBjaGVjayB0aGUgcGxhY2VSYW5kb21pemVyLCBpZiBhbnkgZWxlbWVudCBmcm9tIGl0IHdpbGwgY2xhc2ggd2l0aCBjdXJyZW50IGFycmF5IG9mIHBsYWNlbWVudFxyXG4gICAgICAgIC8vIGNvbnN0IHNoaXBDb29yID0gJzFhLDJhLDNhLDRhLDVhJztcclxuICAgICAgIC8vIGNvbnN0IHNoaWVsZFNoaXAgPSBzaGllbGRTaGlwKHNoaXBDb29yKTtcclxuICAgICAgICAvLyBjb25zdCBmYWtlU2hpcCA9IHNoaXBzKHNoaXBDb29yKTtcclxuICAgICAgICAvLyBBSUdhbWVib2FyZC5wbGFjZW1lbnQoZmFrZVNoaXApO1xyXG4gICAgICAgIC8vQUlHYW1lYm9hcmQuY2hlY2tBbGxMb2NhdGlvbigpO1xyXG4gICAgICAgIC8vIGxldCBiaWdTaGlwQ29vciA9IHBsYWNlUmFuZG9taXplcig1KTsgLy8gZ2V0IGRhdGEgZnJvbSBET01cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhiaWdTaGlwQ29vcik7XHJcbiAgICAgICAgLy8gICAgIGJpZ1NoaXBDb29yID0gcGxhY2VSYW5kb21pemVyKDUpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGJpZ1NoaXBDb29yKSAgXHJcbiAgICAgICAgLy8gaWYgKGZpbmRDb21tb25FbGVtZW50cyhBSUdhbWVib2FyZC5jaGVja0FsbExvY2F0aW9uKCksIGJpZ1NoaXBDb29yKSA9PT0gdHJ1ZSl7IC8vIGluY2x1ZGluZyBcInRoZSBzaGllbGRcIiwgeW91IGNhbm5vdCBwbGFjZSB0aGUgZWxlbWVudHMgaW4gdGhhdCBhcmVhXHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCdDTEFTSEVEJyk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGxldCBiaWdTaGlwQ29vciA9IHBsYWNlUmFuZG9taXplcig1KS50b1N0cmluZygpOyAvLyBnZXQgZGF0YSBmcm9tIERPTVxyXG4gICAgICAgIC8vbGV0IGJpZ1NoaXAgPSBzaGlwcyhiaWdTaGlwQ29vcik7IC8vIGNvb3JkaW5hdGUgYXNzaWduIHRvIHNoaXBzKClcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhiaWdTaGlwLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIC8vQUlHYW1lYm9hcmQucGxhY2VtZW50KGJpZ1NoaXApO1xyXG4gICAgICAgIC8vQUlHYW1lYm9hcmQuY2hlY2tBbGxMb2NhdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdmVyc3VzQUk6ICgpPT57XHJcbiAgICAgICAgLy8gQUkgYXV0b21hdGljYWxseSBwbGFjZSB0aGUgc2hpcHMgXHJcbiAgICAgICAgLy8gQUkgcmFuZG9taXplciBwbGFjZW1lbnQgbWlyaXAgcmFuZG9tIGJ1dHRvbiBodW1hbiBwbGFjZW1lbnRcclxuICAgICAgICAvLyBBSUdhbWVib2FyZC5wbGFjZW1lbnQoKVxyXG4gICAgICAgIEFJUGxhY2VtZW50KCk7XHJcbiAgICAgICAgLy8gcGxheWVyIG1hbnVhbGx5IHBsYWNlIHRoZSBzaGlwXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vL3N0YXJ0R2FtZSgpLnZlcnN1c0FJKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9