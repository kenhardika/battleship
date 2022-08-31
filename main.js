/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/*!**********************!*\
  !*** ./src/ships.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

const ships = (loc) =>{ // length will be from size of the ship
    let coord = loc.split(' ');
    let healthBar = coord.length;
    return {
        length: ()=>{
            return len 
        },
        hit: (loc)=>{
            //get the attck hit location
            if (coord.includes(loc) === false){
                console.log("attack missed")
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
            console.log("this ship health: " + healthBar);
            return healthBar
        },
        location: ()=>{
            console.log(coord)
            return coord
        }
    }
}

const bigShip = ships("3A 4A 5A 6A 7A");
const midShip2 = ships("12A 12B 12C");
const smallShip = ships("4B");

bigShip.location();
bigShip.healthBar();
bigShip.hit("3A");
bigShip.location();
bigShip.healthBar();
bigShip.hit("8A");
bigShip.location();
bigShip.healthBar();
bigShip.hit("4A");
bigShip.hit("5A");
bigShip.hit("6A");
bigShip.location();
bigShip.healthBar();
bigShip.isSunk();
bigShip.hit("7A");
bigShip.location();
bigShip.healthBar();
bigShip.isSunk();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ships);
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNMQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxPIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcbmNvbnN0IHNoaXBzID0gKGxvYykgPT57IC8vIGxlbmd0aCB3aWxsIGJlIGZyb20gc2l6ZSBvZiB0aGUgc2hpcFxuICAgIGxldCBjb29yZCA9IGxvYy5zcGxpdCgnICcpO1xuICAgIGxldCBoZWFsdGhCYXIgPSBjb29yZC5sZW5ndGg7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbGVuZ3RoOiAoKT0+e1xuICAgICAgICAgICAgcmV0dXJuIGxlbiBcbiAgICAgICAgfSxcbiAgICAgICAgaGl0OiAobG9jKT0+e1xuICAgICAgICAgICAgLy9nZXQgdGhlIGF0dGNrIGhpdCBsb2NhdGlvblxuICAgICAgICAgICAgaWYgKGNvb3JkLmluY2x1ZGVzKGxvYykgPT09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImF0dGFjayBtaXNzZWRcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGNvb3JkLmluY2x1ZGVzKGxvYykgPT09IHRydWUpe1xuICAgICAgICAgICAgICAgIGNvb3JkID0gY29vcmQuZmlsdGVyKCAodmFsKT0+e1xuICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWwgIT09IGxvY1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGhlYWx0aEJhciA9IGhlYWx0aEJhciAtIDE7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL21hcmsgcG9zaXRpb24gaW4gZ2FtZWJvYXJkIGFzIGEgaGl0XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInRoaXMgc2hpcCB0b29rIGhpdDogXCIgKyBudW0pXG4gICAgICAgICAgICAvL3JldHVybiBcbiAgICAgICAgfSxcbiAgICAgICAgaXNTdW5rOiAoKT0+e1xuICAgICAgICAgICAgLy9jaGVjayB0aGUgc2hpcCBpZiBzdW5rZW4geWV0XG4gICAgICAgICAgICBpZihoZWFsdGhCYXIgPD0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzaGlwIGlzIGRlc3Ryb3llZCcpO1xuICAgICAgICAgICAgICAgIHJldHVybiAgXG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NoaXAgaXMgc3RpbGwgaW50YWN0Jyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBcbiAgICAgICAgaGVhbHRoQmFyIDogKCk9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMgc2hpcCBoZWFsdGg6IFwiICsgaGVhbHRoQmFyKTtcbiAgICAgICAgICAgIHJldHVybiBoZWFsdGhCYXJcbiAgICAgICAgfSxcbiAgICAgICAgbG9jYXRpb246ICgpPT57XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjb29yZClcbiAgICAgICAgICAgIHJldHVybiBjb29yZFxuICAgICAgICB9XG4gICAgfVxufVxuXG5jb25zdCBiaWdTaGlwID0gc2hpcHMoXCIzQSA0QSA1QSA2QSA3QVwiKTtcbmNvbnN0IG1pZFNoaXAyID0gc2hpcHMoXCIxMkEgMTJCIDEyQ1wiKTtcbmNvbnN0IHNtYWxsU2hpcCA9IHNoaXBzKFwiNEJcIik7XG5cbmJpZ1NoaXAubG9jYXRpb24oKTtcbmJpZ1NoaXAuaGVhbHRoQmFyKCk7XG5iaWdTaGlwLmhpdChcIjNBXCIpO1xuYmlnU2hpcC5sb2NhdGlvbigpO1xuYmlnU2hpcC5oZWFsdGhCYXIoKTtcbmJpZ1NoaXAuaGl0KFwiOEFcIik7XG5iaWdTaGlwLmxvY2F0aW9uKCk7XG5iaWdTaGlwLmhlYWx0aEJhcigpO1xuYmlnU2hpcC5oaXQoXCI0QVwiKTtcbmJpZ1NoaXAuaGl0KFwiNUFcIik7XG5iaWdTaGlwLmhpdChcIjZBXCIpO1xuYmlnU2hpcC5sb2NhdGlvbigpO1xuYmlnU2hpcC5oZWFsdGhCYXIoKTtcbmJpZ1NoaXAuaXNTdW5rKCk7XG5iaWdTaGlwLmhpdChcIjdBXCIpO1xuYmlnU2hpcC5sb2NhdGlvbigpO1xuYmlnU2hpcC5oZWFsdGhCYXIoKTtcbmJpZ1NoaXAuaXNTdW5rKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHNoaXBzIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9