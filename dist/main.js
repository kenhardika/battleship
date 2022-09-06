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

function startGame(){
    const PLAYERONE = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    const AI = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    const playerGameboard = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
    const AIGameboard = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_1__["default"])();

    function AIPlacement(){
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

startGame().versusAI();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBR2lDO0FBQ0s7QUFDUDtBQUNvQjtBQUNNOzs7QUFHekQsMEJBQTBCO0FBQzFCLGdDQUFnQzs7QUFFaEM7QUFDQSxzQkFBc0Isc0RBQU07QUFDNUIsZUFBZSxzREFBTTtBQUNyQiw0QkFBNEIseURBQVM7QUFDckMsd0JBQXdCLHlEQUFTOztBQUVqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBLDBGQUEwRjtBQUMxRjtBQUNBO0FBQ0EsNERBQTREO0FBQzVELDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1QiIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmluZENvbW1vbkVsZW1lbnRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxhY2VSYW5kb21pemVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbWFpbmdhbWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZmluZENvbW1vbkVsZW1lbnRzKGFycjEsIGFycjIpIHtcbiAgICByZXR1cm4gYXJyMS5zb21lKGl0ZW0gPT4gYXJyMi5pbmNsdWRlcyhpdGVtKSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgZmluZENvbW1vbkVsZW1lbnRzIiwiXG5jb25zdCBnYW1lYm9hcmQgPSAoKT0+IHtcbiAgICBsZXQgYWxsU2hpcCA9IFtdO1xuICAgIGxldCB0b3RhbEhlYWx0aCA9IDA7XG4gICAgbGV0IGFsbExvY2F0aW9uID0gW107XG4gICAgbGV0IGF0dGFja01pc3NlZCA9IFtdO1xuXG4gICAgZnVuY3Rpb24gcmVmcmVzaEFsbExvY2F0aW9uKCl7XG4gICAgICAgIGxldCBuZXdMb2NhdGlvbiA9IFtdO1xuICAgICAgICBhbGxTaGlwLmZvckVhY2goKHNoaXApPT57XG4gICAgICAgICAgICBuZXdMb2NhdGlvbiA9IG5ld0xvY2F0aW9uLmNvbmNhdChzaGlwLmxvY2F0aW9uKCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgYWxsTG9jYXRpb24gPSBuZXdMb2NhdGlvbjtcbiAgICB9XG4gICAgZnVuY3Rpb24gYXR0YWNrTWlzc2VkQ291bnRlcihjb29yKXtcbiAgICAgICAgYXR0YWNrTWlzc2VkLnB1c2goY29vcik7XG4gICAgfVxuXG4gICAgLy9jb25zb2xlLmxvZygnZ2FtZWJvYXJkIGlzIG9uJyk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGxhY2VtZW50OiAoc2hpcHMpPT57IC8vIGRvbnQgbmVlZCBjb29yIHNpbmNlIGNvb3JkaW5hdGUgc2hvdWxkIGJlIGluc2lkZSB0aGUgc2hpcCgpXG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgdGhlIGNvb3JkaW5hdGUgaXMgdmFsaWQsIHdoaWNoIG1lYW5zIGVtcHR5IGFuZCBvbmUgYmxvY2sgYXdheSBmcm9tIGFub3RoZXIgc2hpcFxuICAgICAgICAgICAgLy8gcGxhY2UgdGhlIHNoaXBzIG9uIHRoZSBjb29yZGluYXRlICAgICBcbiAgICAgICAgICAgIGFsbFNoaXAucHVzaChzaGlwcyk7XG4gICAgICAgICAgICBhbGxMb2NhdGlvbiA9IGFsbExvY2F0aW9uLmNvbmNhdChzaGlwcy5sb2NhdGlvbigpKTtcbiAgICAgICAgICAgIC8vIG1hcmtzIHRoZSBjb29yZGluYXRlIHdpdGggc2hpcHMnIG1hcmtzXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfSxcbiAgICAgICAgcmVjZWl2ZUF0dGFjazogKGNvb3IpPT57XG4gICAgICAgICAgICBpZihhbGxMb2NhdGlvbi5pbmNsdWRlcyhjb29yKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBdHRhY2sgbWlzc2VkJylcbiAgICAgICAgICAgICAgICBhdHRhY2tNaXNzZWRDb3VudGVyKGNvb3IpO1xuICAgICAgICAgICAgICAgIHJldHVybiBcbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQXR0YWNrIEhpdCEnKVxuICAgICAgICAgICAgICAgIGFsbFNoaXAuZm9yRWFjaCgoc2hpcCk9PntcbiAgICAgICAgICAgICAgICAgICAgc2hpcC5oaXQoY29vcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gcmVmcmVzaCB0aGUgYWxsTG9jYXRpb24gQXJyYXkgc28geW91IGNhbm5vdCBoaXQgdHdpY2Ugb24gdGhlIHNhbWUgY29vcmRpbmF0ZVxuICAgICAgICAgICAgICAgIHJlZnJlc2hBbGxMb2NhdGlvbigpXG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgLy8gdG9nZ2xlIGNoZWNrQWxsU2hpcCgpIHRvIG1ha2Ugc3VyZSBpZiBpdHMgbm90IGVuZGdhbWVcbiAgICAgICAgICAgIC8vIGlmIG5vdCBtYXJrcyB0aGUgY29vcmRpbmF0ZSB3aXRoIG1pc3NlZEF0dGFjaygpXG4gICAgICAgICAgICAvL3JldHVyblxuICAgICAgICB9LFxuICAgICAgICBjaGVja1RvdGFsSGVhbHRoOiAoKT0+e1xuICAgICAgICAgICAgLy8gY2hlY2sgdGhlIGhlYWx0aGJhciBvZiBlYWNoIHNoaXBzIHdpdGggc2hpcC5oZWFsdGhiYXIoKVxuICAgICAgICAgICAgYWxsU2hpcC5mb3JFYWNoKChzaGlwKT0+e1xuICAgICAgICAgICAgICAgIHNoaXAubG9jYXRpb24oKTsgXG4gICAgICAgICAgICAgICAgdG90YWxIZWFsdGggPSB0b3RhbEhlYWx0aCArIHNoaXAuaGVhbHRoQmFyKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRvdGFsSGVhbHRoKTtcbiAgICAgICAgICAgIC8vIGlmIGFsbCB0aGUgaGVhbHRoYmFyIGlzIDAgdGhlbiB0aGUgZ2FtZSBpcyBlbmRlZFxuICAgICAgICAgICAgaWYodG90YWxIZWFsdGggPD0gMCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHQU1FIE9WRVIgQUxMIE9GIFlPVVIgU0hJUFMgV1JFQ0tFRFwiKVxuICAgICAgICAgICAgICAgIHJldHVybiB0b3RhbEhlYWx0aFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG90YWxIZWFsdGhcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH0sXG4gICAgICAgIGNoZWNrQWxsTG9jYXRpb246ICgpPT57XG4gICAgICAgICAgICByZWZyZXNoQWxsTG9jYXRpb24oKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFsbExvY2F0aW9uKTtcbiAgICAgICAgICAgIHJldHVybiBhbGxMb2NhdGlvblxuICAgICAgICB9LFxuICAgICAgICBjaGVja0F0dGFja01pc3NlZDogKCk9PntcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGF0dGFja01pc3NlZCk7XG4gICAgICAgICAgICByZXR1cm4gYXR0YWNrTWlzc2VkXG4gICAgICAgIH1cblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2FtZWJvYXJkO1xuXG4vLyBjb25zdCBwbGF5YSA9IGdhbWVib2FyZCgpO1xuLy8gY29uc3QgYmlnU2hpcENvb3IgPSAnNkIgN0IgOEIgOUIgMTBCJztcbi8vIGNvbnN0IG1pZFNoaXBDb29yID0gJzRCIDRDIDREJztcbi8vIGNvbnN0IG1pZFNoaXAgPSBzaGlwcyhtaWRTaGlwQ29vcik7XG4vLyBjb25zdCBiaWdTaGlwID0gc2hpcHMoYmlnU2hpcENvb3IpO1xuXG4vLyBwbGF5YS5wbGFjZW1lbnQoYmlnU2hpcCk7XG4vLyBwbGF5YS5wbGFjZW1lbnQobWlkU2hpcCk7XG4vLyBwbGF5YS5yZWNlaXZlQXR0YWNrKFwiNEJcIik7ZGVidWdnZXJcbi8vIHBsYXlhLnJlY2VpdmVBdHRhY2soXCI0Q1wiKTtkZWJ1Z2dlclxuLy8gcGxheWEucmVjZWl2ZUF0dGFjayhcIjREXCIpO2RlYnVnZ2VyXG4vLyBwbGF5YS5yZWNlaXZlQXR0YWNrKFwiM0JcIik7ZGVidWdnZXJcbi8vIHBsYXlhLmNoZWNrQWxsTG9jYXRpb24oKTtcbi8vIHBsYXlhLmNoZWNrQXR0YWNrTWlzc2VkKCk7XG4vLyBwbGF5YS5jaGVja1RvdGFsSGVhbHRoKCk7IFxuLy8gcmV2aXNlIHRoaXNcbi8vIHBsYXlhLnBsYWNlbWVudCgnMUEgMkEgM0EnLCBzaGlwcygzKSk7XG4vLyBwbGF5YS5wbGFjZW1lbnQoJzNCIDRCJywgc2hpcHMoMikpO1xuLy8gcGxheWEucGxhY2VtZW50KCc2QiA3QiA4QiA5QiAxMEInLCBzaGlwcyg1KSk7XG4vLyBwbGF5YS5wbGFjZW1lbnQoJzZFIDdFIDhFIDlFIDEwRScsIHNoaXBzKDUpKTsiLCJmdW5jdGlvbiBwbGFjZVJhbmRvbWl6ZXIobGVuZyl7XG4gICAgY29uc3QgTUFYX0dSSUQgPSAxMDsgLy8gbWF4aW11bSBncmlkIGxlbmd0aCBpcyAxMHgxMFxuICAgIGNvbnN0IHJhbmRvbUF4aXMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTsgLy8gb25seSByZXR1cm4gMC8xXG4gICAgY29uc3QgYXJyYXkgPSBbXTtcbiAgICBjb25zdCBhbHBoYWJldCA9IFwiYWJjZGVmZ2hpalwiO1xuICAgIGNvbnN0IHJhbmRvbU51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChNQVhfR1JJRCAtIGxlbmcpKSArIDE7IC8vIHRoaXMgcmFuZG9taXplciBudW1iZXIga2VlcCB5b3UgZnJvbSBvdmVyZmxvd2luZywgcGx1cyBvbmUgc28gaXQgc3RhcnQgZnJvbSAxIG5vdCAwXG4gICAgY29uc3QgcmFuZG9tQWxwID0gYWxwaGFiZXRbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYWxwaGFiZXQuc3Vic3RyaW5nKDAsKE1BWF9HUklEIC0gbGVuZykpLmxlbmd0aCldOyAvLyB0aGlzIHJhbmRvbWl6ZXIga2VlcHMgeW91IGZyb20gdmFsdWUgbW9yZSB0aGFuIGxlbmd0aFxuICAgIGxldCBhbHBoYU51bTtcblxuICAgIGlmIChyYW5kb21BeGlzID09PSAwKXsgLy8gWCBheGlzIGJsb2Nrc1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8bGVuZzsgaSsrICl7XG4gICAgICAgICAgICBhbHBoYU51bSA9IChyYW5kb21OdW1iZXIgKyBpKS50b1N0cmluZygpLmNvbmNhdChyYW5kb21BbHApO1xuICAgICAgICAgICAgYXJyYXkucHVzaChhbHBoYU51bSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coYXJyYXkpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhyYW5kb21BeGlzKTtcbiAgICAgICAgcmV0dXJuIGFycmF5XG4gICAgfVxuICAgIGVsc2UgeyAvLyBZIGF4aXMgYmxvY2tzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDxsZW5nOyBpKysgKXtcbiAgICAgICAgICAgIGNvbnN0IGFscExvb3AgPSBhbHBoYWJldC5jaGFyQXQoYWxwaGFiZXQuaW5kZXhPZihyYW5kb21BbHApICsgaSk7XG4gICAgICAgICAgICBhbHBoYU51bSA9IChyYW5kb21OdW1iZXIpLnRvU3RyaW5nKCkuY29uY2F0KGFscExvb3ApO1xuICAgICAgICAgICAgYXJyYXkucHVzaChhbHBoYU51bSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coYXJyYXkpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhyYW5kb21BeGlzKTtcbiAgICAgICAgcmV0dXJuIGFycmF5XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgcGxhY2VSYW5kb21pemVyIiwiXG4vLyBjb25zdCB5b3VyR2FtZWJvYXJkID0gZ2FtZWJvYXJkKCk7XG4vLyBjb25zdCBodW1hbkdhbWVib2FyZCA9IGdhbWVib2FyZCgpO1xuLy8gY29uc3QgQUlHYW1lYm9hcmQgPSBnYW1lYm9hcmQoKTtcblxuY29uc3QgcGxheWVyID0gKCkgPT4ge1xuICAgIC8vIHBsYXllciBzaG91bGQgdGFrZSB0dXJucyBwbGF5aW5nIHRoZSBnYW1lIGJ5IGF0dGFja2luZyBvcHBvbmVudCdzIGdhbWVib2FyZC5cbiAgICBsZXQgYXR0YWNrU3RhdHVzID0gJ09GRic7XG4gICAgLy8gcGxheWVyIGF0dGFja2luZyBzdGF0ZSBpcyBPTlxuICAgIC8vIHBsYXllciBDSE9PU0UgdGhlIGNvb3JkaW5hdGUgb2Ygb3Bwb25lbnQncyBnYW1lYm9hcmQuXG4gICAgLy8gcGxheWVyIGF0dGFja2luZyBzdGF0ZSBpcyBPRkZcbiAgICAvLyBsZXQgeW91ckdhbWVib2FyZCA9IGdhbWVib2FyZCgpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHRvZ2dsZUF0dGFja09OIDogKCk9PiBhdHRhY2tTdGF0dXMgPSBcIk9OXCIsXG4gICAgICAgIHRvZ2dsZUF0dGFja09GRiA6ICgpPT4gYXR0YWNrU3RhdHVzID0gXCJPRkZcIixcbiAgICAgICAgY2hlY2tBdHRhY2s6ICgpPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYXR0YWNrU3RhdHVzKTsgXG4gICAgICAgICAgICByZXR1cm4gYXR0YWNrU3RhdHVzXG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgIH1cbn1cblxuLy8gbGV0IHBsYXllID0gcGxheWVyKCk7XG5cblxuLy8gcGxheWUuY2hlY2tBdHRhY2soKTtcbi8vIHBsYXllLnRvZ2dsZUF0dGFja09OKCk7XG4vLyBwbGF5ZS5jaGVja0F0dGFjaygpO1xuXG5cbmV4cG9ydCBkZWZhdWx0IHBsYXllcjsiLCJcbmNvbnN0IHNoaXBzID0gKGxvYykgPT57IC8vIGxlbmd0aCB3aWxsIGJlIGZyb20gc2l6ZSBvZiB0aGUgc2hpcFxuICAgIGxldCBjb29yZCA9IGxvYy5zcGxpdCgnLCcpO1xuICAgIGxldCBoZWFsdGhCYXIgPSBjb29yZC5sZW5ndGg7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbGVuZ3RoOiAoKT0+e1xuICAgICAgICAgICAgcmV0dXJuIGxlbiBcbiAgICAgICAgfSxcbiAgICAgICAgaGl0OiAobG9jKT0+e1xuICAgICAgICAgICAgLy9nZXQgdGhlIGF0dGNrIGhpdCBsb2NhdGlvblxuICAgICAgICAgICAgaWYgKGNvb3JkLmluY2x1ZGVzKGxvYykgPT09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiYXR0YWNrIG1pc3NlZFwiKVxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihjb29yZC5pbmNsdWRlcyhsb2MpID09PSB0cnVlKXtcbiAgICAgICAgICAgICAgICBjb29yZCA9IGNvb3JkLmZpbHRlciggKHZhbCk9PntcbiAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsICE9PSBsb2NcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBoZWFsdGhCYXIgPSBoZWFsdGhCYXIgLSAxO1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9tYXJrIHBvc2l0aW9uIGluIGdhbWVib2FyZCBhcyBhIGhpdFxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ0aGlzIHNoaXAgdG9vayBoaXQ6IFwiICsgbnVtKVxuICAgICAgICAgICAgLy9yZXR1cm4gXG4gICAgICAgIH0sXG4gICAgICAgIGlzU3VuazogKCk9PntcbiAgICAgICAgICAgIC8vY2hlY2sgdGhlIHNoaXAgaWYgc3Vua2VuIHlldFxuICAgICAgICAgICAgaWYoaGVhbHRoQmFyIDw9IDApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2hpcCBpcyBkZXN0cm95ZWQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gIFxuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzaGlwIGlzIHN0aWxsIGludGFjdCcpO1xuICAgICAgICAgICAgICAgIHJldHVybiBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgXG4gICAgICAgIGhlYWx0aEJhciA6ICgpPT4ge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInRoaXMgc2hpcCBoZWFsdGg6IFwiICsgaGVhbHRoQmFyKTtcbiAgICAgICAgICAgIHJldHVybiBoZWFsdGhCYXJcbiAgICAgICAgfSxcbiAgICAgICAgbG9jYXRpb246ICgpPT57XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGNvb3JkKVxuICAgICAgICAgICAgcmV0dXJuIGNvb3JkXG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIGNvbnN0IGJpZ1NoaXAgPSBzaGlwcyhcIjNBIDRBIDVBIDZBIDdBXCIpO1xuLy8gY29uc3QgbWlkU2hpcDIgPSBzaGlwcyhcIjEyQSAxMkIgMTJDXCIpO1xuLy8gY29uc3Qgc21hbGxTaGlwID0gc2hpcHMoXCI0QlwiKTtcblxuLy8gYmlnU2hpcC5sb2NhdGlvbigpO1xuLy8gYmlnU2hpcC5oZWFsdGhCYXIoKTtcbi8vIGJpZ1NoaXAuaGl0KFwiM0FcIik7XG4vLyBiaWdTaGlwLmxvY2F0aW9uKCk7XG4vLyBiaWdTaGlwLmhlYWx0aEJhcigpO1xuLy8gYmlnU2hpcC5oaXQoXCI4QVwiKTtcbi8vIGJpZ1NoaXAubG9jYXRpb24oKTtcbi8vIGJpZ1NoaXAuaGVhbHRoQmFyKCk7XG4vLyBiaWdTaGlwLmhpdChcIjRBXCIpO1xuLy8gYmlnU2hpcC5oaXQoXCI1QVwiKTtcbi8vIGJpZ1NoaXAuaGl0KFwiNkFcIik7XG4vLyBiaWdTaGlwLmxvY2F0aW9uKCk7XG4vLyBiaWdTaGlwLmhlYWx0aEJhcigpO1xuLy8gYmlnU2hpcC5pc1N1bmsoKTtcbi8vIGJpZ1NoaXAuaGl0KFwiN0FcIik7XG4vLyBiaWdTaGlwLmxvY2F0aW9uKCk7XG4vLyBiaWdTaGlwLmhlYWx0aEJhcigpO1xuLy8gYmlnU2hpcC5pc1N1bmsoKTtcblxuZXhwb3J0IGRlZmF1bHQgc2hpcHMiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIGluIHRoaXMgZmlsZSB3ZSBhcmUgZ29ubmEgZ2F0aGVyIGFsbCB0aGUgY29tcG9uZW50cyBvZiBCYXR0bGVzaGlwIFRoZSBHYW1lIGFuZCB0dXJuIGl0IGludG8gcmVhbCBnYW1lXG5cbi8vIHBsYXllci4gV2hhdCBkb2VzIHBsYXllciBkby5cbi8vIHBsYXllciBzdGFydCB0aGUgZ2FtZSBieSBjaG9vc2luZyB3aG8geW91cmUgcGxheWluZyB3aXRoXG4vLyBwbGF5ZXIgY2hvb3NlIGlzIGl0IGdvbm5hIGJlIHZzIEFJIG9yIHZzIEh1bWFuXG4vLyBhdCB0aGlzIHBvaW50LCBpZiB5b3UgY2hvb3NlIEFJLiBBSSB3aWxsIGF1dG9tYXRpY2FsbHkgcGxhY2UgdGhlaXIgc2hpcHMgcmFuZG9tbHkgb24gZ2FtZWJvYXJkLlxuLy8gcGxheWVyIGNob29zZSB0aGUgc2hpcHMgcGxhY2VtZW50IGFjY3Jvc3MgdGhlIGdhbWVib2FyZC5cbi8vIHNoaXAncyBwbGFjZW1lbnQgaXMgYmFzZWQgb24gb25lIHJ1bGUgdGhhdCB0aGVyZSBpcyBhbHdheXMgb25lIGVtcHR5IGJsb2NrIGJldHdlZW4gb25lIGFuZCBhbm90aGVyIHBsYWNlZCBzaGlwc1xuLy8gcGxheWVyIGhhdmUgYSBjaG9pY2UgdG8gcmFuZG9tbHkgcGxhY2UgdGhlIHNoaXBzIGJ5IGNsaWNraW5nIHRoZSByYW5kb20gYnV0dG9uLiBcbi8vIHBsYXllciBwbGFjZW1lbnQgb3JkZXIgaXMuLiBmaXJzdCB5b3UgcGxhY2Ugb25lIGJpZyBzaGlwICg1IGluIGxlbmd0aCksIHRoZW4gdHdvIG1pZCBzaGlwICgzIGluIGxlbmd0aCksIHRoZW4gdGhyZWUgc21hbGwgc2hpcCAoMiBpbiBsZW5ndGgpIFxuLy8gYWZ0ZXIgYWxsIHNoaXBzIGFyZSBwbGFjZWQsIGdhbWUgaW5pdGlhdGUgdG8gc3RhcnQgYXR0YWNraW5nIGJ5IGNob29zaW5nIHRoZSBvcHBvbmVudHMncyBnYW1lYm9hcmQuIFRoaXMgcGhhc2UgeW91IGNvdWxkIGhpdCBvcHBvbmVudHMncyBzaGlwLlxuLy8gYWZ0ZXIgeW91IGF0dGFjayBvcHBvbmVudCdzIHNoaXAsIGdhbWUgYXV0b21hdGljYWxseSBjaGFuZ2UgdG8gb3Bwb25lbnQncyB0dXJuLiBUaGlzIHRpbWUgT3Bwb25lbnQncyB3aWxsIGluaXRpYXRlIGF0dGFjayBwbGF5ZXIncyBnYW1lYm9hcmQgcmFuZG9tbHkuXG4vLyBUaGUgQUkgZG9lcyBub3QgaGF2ZSB0byBiZSBzbWFydCwgYnV0IGl0IHNob3VsZCBrbm93IHdoZXRoZXIgb3Igbm90IGEgZ2l2ZW4gbW92ZSBpcyBsZWdhbC4gKGkuZS4gaXQgc2hvdWxkbuKAmXQgc2hvb3QgdGhlIHNhbWUgY29vcmRpbmF0ZSB0d2ljZSkuIFxuLy8gR2FtZSByZXBlYXRpbmcgdGhlIHByZXZpb3VzIHN0ZXAgdW50aWwgb25lIG9mIHRoZSBwbGF5ZXIvQUkgc2hpcHMgYXJlIGZ1bGx5IGNsZWFuZWQgKGFsbCBkZXN0cm95ZWQpXG4vLyBnYW1lIGVuZGluZyBpZiBvbmUgb2YgdGhlIHBsYXllci9BSSB0b3RhbCBoZWFsdGhiYXIgKHNoaXBzKSBhcmUgPSAwLiBcbi8vIDFcdENhcnJpZXJcdDVcbi8vIDJcdEJhdHRsZXNoaXBcdDRcbi8vIDNcdENydWlzZXJcdDNcbi8vIDRcdFN1Ym1hcmluZVx0M1xuLy8gNVx0RGVzdHJveWVyXHQyXG5cblxuaW1wb3J0IHBsYXllciBmcm9tIFwiLi9wbGF5ZXIuanNcIjtcbmltcG9ydCBnYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCJcbmltcG9ydCBzaGlwcyBmcm9tIFwiLi9zaGlwcy5qc1wiO1xuaW1wb3J0IHBsYWNlUmFuZG9taXplciBmcm9tIFwiLi9wbGFjZVJhbmRvbWl6ZXIuanNcIjtcbmltcG9ydCBmaW5kQ29tbW9uRWxlbWVudHMgZnJvbSBcIi4vZmluZENvbW1vbkVsZW1lbnRzLmpzXCI7XG5cblxuLy8gY29uc29sZS5sb2coUExBWUVST05FKTtkZWJ1Z2dlclxuLy8gY29uc29sZS5sb2cocGxheWVyR2FtZWJvYXJkKTtkZWJ1Z2dlclxuXG5mdW5jdGlvbiBzdGFydEdhbWUoKXtcbiAgICBjb25zdCBQTEFZRVJPTkUgPSBwbGF5ZXIoKTtcbiAgICBjb25zdCBBSSA9IHBsYXllcigpO1xuICAgIGNvbnN0IHBsYXllckdhbWVib2FyZCA9IGdhbWVib2FyZCgpO1xuICAgIGNvbnN0IEFJR2FtZWJvYXJkID0gZ2FtZWJvYXJkKCk7XG5cbiAgICBmdW5jdGlvbiBBSVBsYWNlbWVudCgpe1xuICAgICAgICAvLyBnZXQgdGhlIGNvb3JkaW5hdGUgZmlyc3QsIHRoZW4gZ29pbmcgdXBcbiAgICAgICAgLy8gY2hlY2sgdGhlIHBsYWNlUmFuZG9taXplciwgaWYgYW55IGVsZW1lbnQgZnJvbSBpdCB3aWxsIGNsYXNoIHdpdGggY3VycmVudCBhcnJheSBvZiBwbGFjZW1lbnRcbiAgICAgICAgLy8gY29uc3Qgc2hpcENvb3IgPSAnMWEsMmEsM2EsNGEsNWEnO1xuICAgICAgIC8vIGNvbnN0IHNoaWVsZFNoaXAgPSBzaGllbGRTaGlwKHNoaXBDb29yKTtcbiAgICAgICAgLy8gY29uc3QgZmFrZVNoaXAgPSBzaGlwcyhzaGlwQ29vcik7XG4gICAgICAgIC8vIEFJR2FtZWJvYXJkLnBsYWNlbWVudChmYWtlU2hpcCk7XG4gICAgICAgIC8vQUlHYW1lYm9hcmQuY2hlY2tBbGxMb2NhdGlvbigpO1xuICAgICAgICAvLyBsZXQgYmlnU2hpcENvb3IgPSBwbGFjZVJhbmRvbWl6ZXIoNSk7IC8vIGdldCBkYXRhIGZyb20gRE9NXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGJpZ1NoaXBDb29yKTtcbiAgICAgICAgLy8gICAgIGJpZ1NoaXBDb29yID0gcGxhY2VSYW5kb21pemVyKDUpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhiaWdTaGlwQ29vcikgIFxuICAgICAgICAvLyBpZiAoZmluZENvbW1vbkVsZW1lbnRzKEFJR2FtZWJvYXJkLmNoZWNrQWxsTG9jYXRpb24oKSwgYmlnU2hpcENvb3IpID09PSB0cnVlKXsgLy8gaW5jbHVkaW5nIFwidGhlIHNoaWVsZFwiLCB5b3UgY2Fubm90IHBsYWNlIHRoZSBlbGVtZW50cyBpbiB0aGF0IGFyZWFcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCdDTEFTSEVEJyk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gbGV0IGJpZ1NoaXBDb29yID0gcGxhY2VSYW5kb21pemVyKDUpLnRvU3RyaW5nKCk7IC8vIGdldCBkYXRhIGZyb20gRE9NXG4gICAgICAgIC8vbGV0IGJpZ1NoaXAgPSBzaGlwcyhiaWdTaGlwQ29vcik7IC8vIGNvb3JkaW5hdGUgYXNzaWduIHRvIHNoaXBzKClcbiAgICAgICAgLy8gY29uc29sZS5sb2coYmlnU2hpcC50b1N0cmluZygpKTtcbiAgICAgICAgLy9BSUdhbWVib2FyZC5wbGFjZW1lbnQoYmlnU2hpcCk7XG4gICAgICAgIC8vQUlHYW1lYm9hcmQuY2hlY2tBbGxMb2NhdGlvbigpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHZlcnN1c0FJOiAoKT0+e1xuICAgICAgICAvLyBBSSBhdXRvbWF0aWNhbGx5IHBsYWNlIHRoZSBzaGlwcyBcbiAgICAgICAgLy8gQUkgcmFuZG9taXplciBwbGFjZW1lbnQgbWlyaXAgcmFuZG9tIGJ1dHRvbiBodW1hbiBwbGFjZW1lbnRcbiAgICAgICAgLy8gQUlHYW1lYm9hcmQucGxhY2VtZW50KClcbiAgICAgICAgQUlQbGFjZW1lbnQoKTtcbiAgICAgICAgLy8gcGxheWVyIG1hbnVhbGx5IHBsYWNlIHRoZSBzaGlwXG4gICAgICAgIH1cbiAgICB9XG59XG5cbnN0YXJ0R2FtZSgpLnZlcnN1c0FJKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9