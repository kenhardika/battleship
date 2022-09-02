/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

    console.log('gameboard is on');
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
    return {
        toggleAttackON : ()=> attackStatus = "ON",
        toggleAttackOFF : ()=> attackStatus = "OFF",
        checkAttack: ()=> {
            console.log(attackStatus); 
            return attackStatus
        }
    }
}

// let playe = player();


// playe.checkAttack();
// playe.toggleAttackON();
// playe.checkAttack();


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (player);

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




const PLAYERONE = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
const playerGameboard = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
const AIGameboard = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_1__["default"])();

// console.log(PLAYERONE);debugger
// console.log(playerGameboard);debugger

function startGame(){
    return {
        versusAI: ()=>{
        // AI automatically place the ships

        // player manually place the ship
        


        }
    }
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxTQUFTLEVBQUM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCLDZCQUE2QjtBQUM3Qiw2QkFBNkI7QUFDN0IsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDaEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxNQUFNOzs7Ozs7VUM3QnJCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDaUM7QUFDSztBQUN0QztBQUNBLGtCQUFrQixzREFBTTtBQUN4Qix3QkFBd0IseURBQVM7QUFDakMsb0JBQW9CLHlEQUFTO0FBQzdCO0FBQ0EsMEJBQTBCO0FBQzFCLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbWFpbmdhbWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNvbnN0IGdhbWVib2FyZCA9ICgpPT4ge1xyXG4gICAgbGV0IGFsbFNoaXAgPSBbXTtcclxuICAgIGxldCB0b3RhbEhlYWx0aCA9IDA7XHJcbiAgICBsZXQgYWxsTG9jYXRpb24gPSBbXTtcclxuICAgIGxldCBhdHRhY2tNaXNzZWQgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiByZWZyZXNoQWxsTG9jYXRpb24oKXtcclxuICAgICAgICBsZXQgbmV3TG9jYXRpb24gPSBbXTtcclxuICAgICAgICBhbGxTaGlwLmZvckVhY2goKHNoaXApPT57XHJcbiAgICAgICAgICAgIG5ld0xvY2F0aW9uID0gbmV3TG9jYXRpb24uY29uY2F0KHNoaXAubG9jYXRpb24oKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYWxsTG9jYXRpb24gPSBuZXdMb2NhdGlvbjtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGF0dGFja01pc3NlZENvdW50ZXIoY29vcil7XHJcbiAgICAgICAgYXR0YWNrTWlzc2VkLnB1c2goY29vcik7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2coJ2dhbWVib2FyZCBpcyBvbicpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwbGFjZW1lbnQ6IChzaGlwcyk9PnsgLy8gZG9udCBuZWVkIGNvb3Igc2luY2UgY29vcmRpbmF0ZSBzaG91bGQgYmUgaW5zaWRlIHRoZSBzaGlwKClcclxuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHRoZSBjb29yZGluYXRlIGlzIHZhbGlkLCB3aGljaCBtZWFucyBlbXB0eSBhbmQgb25lIGJsb2NrIGF3YXkgZnJvbSBhbm90aGVyIHNoaXBcclxuICAgICAgICAgICAgLy8gcGxhY2UgdGhlIHNoaXBzIG9uIHRoZSBjb29yZGluYXRlICAgICBcclxuICAgICAgICAgICAgYWxsU2hpcC5wdXNoKHNoaXBzKTtcclxuICAgICAgICAgICAgYWxsTG9jYXRpb24gPSBhbGxMb2NhdGlvbi5jb25jYXQoc2hpcHMubG9jYXRpb24oKSk7XHJcbiAgICAgICAgICAgIC8vIG1hcmtzIHRoZSBjb29yZGluYXRlIHdpdGggc2hpcHMnIG1hcmtzXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVjZWl2ZUF0dGFjazogKGNvb3IpPT57XHJcbiAgICAgICAgICAgIGlmKGFsbExvY2F0aW9uLmluY2x1ZGVzKGNvb3IpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQXR0YWNrIG1pc3NlZCcpXHJcbiAgICAgICAgICAgICAgICBhdHRhY2tNaXNzZWRDb3VudGVyKGNvb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBdHRhY2sgSGl0IScpXHJcbiAgICAgICAgICAgICAgICBhbGxTaGlwLmZvckVhY2goKHNoaXApPT57XHJcbiAgICAgICAgICAgICAgICAgICAgc2hpcC5oaXQoY29vcik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIHJlZnJlc2ggdGhlIGFsbExvY2F0aW9uIEFycmF5IHNvIHlvdSBjYW5ub3QgaGl0IHR3aWNlIG9uIHRoZSBzYW1lIGNvb3JkaW5hdGVcclxuICAgICAgICAgICAgICAgIHJlZnJlc2hBbGxMb2NhdGlvbigpXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIC8vIHRvZ2dsZSBjaGVja0FsbFNoaXAoKSB0byBtYWtlIHN1cmUgaWYgaXRzIG5vdCBlbmRnYW1lXHJcbiAgICAgICAgICAgIC8vIGlmIG5vdCBtYXJrcyB0aGUgY29vcmRpbmF0ZSB3aXRoIG1pc3NlZEF0dGFjaygpXHJcbiAgICAgICAgICAgIC8vcmV0dXJuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaGVja1RvdGFsSGVhbHRoOiAoKT0+e1xyXG4gICAgICAgICAgICAvLyBjaGVjayB0aGUgaGVhbHRoYmFyIG9mIGVhY2ggc2hpcHMgd2l0aCBzaGlwLmhlYWx0aGJhcigpXHJcbiAgICAgICAgICAgIGFsbFNoaXAuZm9yRWFjaCgoc2hpcCk9PntcclxuICAgICAgICAgICAgICAgIHNoaXAubG9jYXRpb24oKTsgXHJcbiAgICAgICAgICAgICAgICB0b3RhbEhlYWx0aCA9IHRvdGFsSGVhbHRoICsgc2hpcC5oZWFsdGhCYXIoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRvdGFsSGVhbHRoKTtcclxuICAgICAgICAgICAgLy8gaWYgYWxsIHRoZSBoZWFsdGhiYXIgaXMgMCB0aGVuIHRoZSBnYW1lIGlzIGVuZGVkXHJcbiAgICAgICAgICAgIGlmKHRvdGFsSGVhbHRoIDw9IDApe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHQU1FIE9WRVIgQUxMIE9GIFlPVVIgU0hJUFMgV1JFQ0tFRFwiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvdGFsSGVhbHRoXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0b3RhbEhlYWx0aFxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2hlY2tBbGxMb2NhdGlvbjogKCk9PntcclxuICAgICAgICAgICAgcmVmcmVzaEFsbExvY2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFsbExvY2F0aW9uKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFsbExvY2F0aW9uXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaGVja0F0dGFja01pc3NlZDogKCk9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYXR0YWNrTWlzc2VkKTtcclxuICAgICAgICAgICAgcmV0dXJuIGF0dGFja01pc3NlZFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdhbWVib2FyZDtcclxuXHJcbi8vIGNvbnN0IHBsYXlhID0gZ2FtZWJvYXJkKCk7XHJcbi8vIGNvbnN0IGJpZ1NoaXBDb29yID0gJzZCIDdCIDhCIDlCIDEwQic7XHJcbi8vIGNvbnN0IG1pZFNoaXBDb29yID0gJzRCIDRDIDREJztcclxuLy8gY29uc3QgbWlkU2hpcCA9IHNoaXBzKG1pZFNoaXBDb29yKTtcclxuLy8gY29uc3QgYmlnU2hpcCA9IHNoaXBzKGJpZ1NoaXBDb29yKTtcclxuXHJcbi8vIHBsYXlhLnBsYWNlbWVudChiaWdTaGlwKTtcclxuLy8gcGxheWEucGxhY2VtZW50KG1pZFNoaXApO1xyXG4vLyBwbGF5YS5yZWNlaXZlQXR0YWNrKFwiNEJcIik7ZGVidWdnZXJcclxuLy8gcGxheWEucmVjZWl2ZUF0dGFjayhcIjRDXCIpO2RlYnVnZ2VyXHJcbi8vIHBsYXlhLnJlY2VpdmVBdHRhY2soXCI0RFwiKTtkZWJ1Z2dlclxyXG4vLyBwbGF5YS5yZWNlaXZlQXR0YWNrKFwiM0JcIik7ZGVidWdnZXJcclxuLy8gcGxheWEuY2hlY2tBbGxMb2NhdGlvbigpO1xyXG4vLyBwbGF5YS5jaGVja0F0dGFja01pc3NlZCgpO1xyXG4vLyBwbGF5YS5jaGVja1RvdGFsSGVhbHRoKCk7IFxyXG4vLyByZXZpc2UgdGhpc1xyXG4vLyBwbGF5YS5wbGFjZW1lbnQoJzFBIDJBIDNBJywgc2hpcHMoMykpO1xyXG4vLyBwbGF5YS5wbGFjZW1lbnQoJzNCIDRCJywgc2hpcHMoMikpO1xyXG4vLyBwbGF5YS5wbGFjZW1lbnQoJzZCIDdCIDhCIDlCIDEwQicsIHNoaXBzKDUpKTtcclxuLy8gcGxheWEucGxhY2VtZW50KCc2RSA3RSA4RSA5RSAxMEUnLCBzaGlwcyg1KSk7IiwiXHJcbi8vIGNvbnN0IHlvdXJHYW1lYm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuLy8gY29uc3QgaHVtYW5HYW1lYm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuLy8gY29uc3QgQUlHYW1lYm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuXHJcbmNvbnN0IHBsYXllciA9ICgpID0+IHtcclxuICAgIC8vIHBsYXllciBzaG91bGQgdGFrZSB0dXJucyBwbGF5aW5nIHRoZSBnYW1lIGJ5IGF0dGFja2luZyBvcHBvbmVudCdzIGdhbWVib2FyZC5cclxuICAgIGxldCBhdHRhY2tTdGF0dXMgPSAnT0ZGJztcclxuICAgIC8vIHBsYXllciBhdHRhY2tpbmcgc3RhdGUgaXMgT05cclxuICAgIC8vIHBsYXllciBDSE9PU0UgdGhlIGNvb3JkaW5hdGUgb2Ygb3Bwb25lbnQncyBnYW1lYm9hcmQuXHJcbiAgICAvLyBwbGF5ZXIgYXR0YWNraW5nIHN0YXRlIGlzIE9GRlxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0b2dnbGVBdHRhY2tPTiA6ICgpPT4gYXR0YWNrU3RhdHVzID0gXCJPTlwiLFxyXG4gICAgICAgIHRvZ2dsZUF0dGFja09GRiA6ICgpPT4gYXR0YWNrU3RhdHVzID0gXCJPRkZcIixcclxuICAgICAgICBjaGVja0F0dGFjazogKCk9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGF0dGFja1N0YXR1cyk7IFxyXG4gICAgICAgICAgICByZXR1cm4gYXR0YWNrU3RhdHVzXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBsZXQgcGxheWUgPSBwbGF5ZXIoKTtcclxuXHJcblxyXG4vLyBwbGF5ZS5jaGVja0F0dGFjaygpO1xyXG4vLyBwbGF5ZS50b2dnbGVBdHRhY2tPTigpO1xyXG4vLyBwbGF5ZS5jaGVja0F0dGFjaygpO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBsYXllcjsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIGluIHRoaXMgZmlsZSB3ZSBhcmUgZ29ubmEgZ2F0aGVyIGFsbCB0aGUgY29tcG9uZW50cyBvZiBCYXR0bGVzaGlwIFRoZSBHYW1lIGFuZCB0dXJuIGl0IGludG8gcmVhbCBnYW1lXHJcblxyXG4vLyBwbGF5ZXIuIFdoYXQgZG9lcyBwbGF5ZXIgZG8uXHJcbi8vIHBsYXllciBzdGFydCB0aGUgZ2FtZSBieSBjaG9vc2luZyB3aG8geW91cmUgcGxheWluZyB3aXRoXHJcbi8vIHBsYXllciBjaG9vc2UgaXMgaXQgZ29ubmEgYmUgdnMgQUkgb3IgdnMgSHVtYW5cclxuLy8gYXQgdGhpcyBwb2ludCwgaWYgeW91IGNob29zZSBBSS4gQUkgd2lsbCBhdXRvbWF0aWNhbGx5IHBsYWNlIHRoZWlyIHNoaXBzIHJhbmRvbWx5IG9uIGdhbWVib2FyZC5cclxuLy8gcGxheWVyIGNob29zZSB0aGUgc2hpcHMgcGxhY2VtZW50IGFjY3Jvc3MgdGhlIGdhbWVib2FyZC5cclxuLy8gc2hpcCdzIHBsYWNlbWVudCBpcyBiYXNlZCBvbiBvbmUgcnVsZSB0aGF0IHRoZXJlIGlzIGFsd2F5cyBvbmUgZW1wdHkgYmxvY2sgYmV0d2VlbiBvbmUgYW5kIGFub3RoZXIgcGxhY2VkIHNoaXBzXHJcbi8vIHBsYXllciBoYXZlIGEgY2hvaWNlIHRvIHJhbmRvbWx5IHBsYWNlIHRoZSBzaGlwcyBieSBjbGlja2luZyB0aGUgcmFuZG9tIGJ1dHRvbi4gXHJcbi8vIHBsYXllciBwbGFjZW1lbnQgb3JkZXIgaXMuLiBmaXJzdCB5b3UgcGxhY2Ugb25lIGJpZyBzaGlwICg1IGluIGxlbmd0aCksIHRoZW4gdHdvIG1pZCBzaGlwICgzIGluIGxlbmd0aCksIHRoZW4gdGhyZWUgc21hbGwgc2hpcCAoMiBpbiBsZW5ndGgpIFxyXG4vLyBhZnRlciBhbGwgc2hpcHMgYXJlIHBsYWNlZCwgZ2FtZSBpbml0aWF0ZSB0byBzdGFydCBhdHRhY2tpbmcgYnkgY2hvb3NpbmcgdGhlIG9wcG9uZW50cydzIGdhbWVib2FyZC4gVGhpcyBwaGFzZSB5b3UgY291bGQgaGl0IG9wcG9uZW50cydzIHNoaXAuXHJcbi8vIGFmdGVyIHlvdSBhdHRhY2sgb3Bwb25lbnQncyBzaGlwLCBnYW1lIGF1dG9tYXRpY2FsbHkgY2hhbmdlIHRvIG9wcG9uZW50J3MgdHVybi4gVGhpcyB0aW1lIE9wcG9uZW50J3Mgd2lsbCBpbml0aWF0ZSBhdHRhY2sgcGxheWVyJ3MgZ2FtZWJvYXJkIHJhbmRvbWx5LlxyXG4vLyBUaGUgQUkgZG9lcyBub3QgaGF2ZSB0byBiZSBzbWFydCwgYnV0IGl0IHNob3VsZCBrbm93IHdoZXRoZXIgb3Igbm90IGEgZ2l2ZW4gbW92ZSBpcyBsZWdhbC4gKGkuZS4gaXQgc2hvdWxkbuKAmXQgc2hvb3QgdGhlIHNhbWUgY29vcmRpbmF0ZSB0d2ljZSkuIFxyXG4vLyBHYW1lIHJlcGVhdGluZyB0aGUgcHJldmlvdXMgc3RlcCB1bnRpbCBvbmUgb2YgdGhlIHBsYXllci9BSSBzaGlwcyBhcmUgZnVsbHkgY2xlYW5lZCAoYWxsIGRlc3Ryb3llZClcclxuLy8gZ2FtZSBlbmRpbmcgaWYgb25lIG9mIHRoZSBwbGF5ZXIvQUkgdG90YWwgaGVhbHRoYmFyIChzaGlwcykgYXJlID0gMC4gXHJcblxyXG5pbXBvcnQgcGxheWVyIGZyb20gXCIuL3BsYXllci5qc1wiO1xyXG5pbXBvcnQgZ2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZC5qc1wiXHJcblxyXG5jb25zdCBQTEFZRVJPTkUgPSBwbGF5ZXIoKTtcclxuY29uc3QgcGxheWVyR2FtZWJvYXJkID0gZ2FtZWJvYXJkKCk7XHJcbmNvbnN0IEFJR2FtZWJvYXJkID0gZ2FtZWJvYXJkKCk7XHJcblxyXG4vLyBjb25zb2xlLmxvZyhQTEFZRVJPTkUpO2RlYnVnZ2VyXHJcbi8vIGNvbnNvbGUubG9nKHBsYXllckdhbWVib2FyZCk7ZGVidWdnZXJcclxuXHJcbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB2ZXJzdXNBSTogKCk9PntcclxuICAgICAgICAvLyBBSSBhdXRvbWF0aWNhbGx5IHBsYWNlIHRoZSBzaGlwc1xyXG5cclxuICAgICAgICAvLyBwbGF5ZXIgbWFudWFsbHkgcGxhY2UgdGhlIHNoaXBcclxuICAgICAgICBcclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==