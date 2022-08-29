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
/* harmony export */   "ships": () => (/* binding */ ships)
/* harmony export */ });
// function ships(){
//     console.log('ships has sailed')
// }
// ships();

const ships = (len) =>{ // length will be from 
    let healthBar = len;
    return {
        length: ()=>{
            return len 
        },
        hit: (num)=>{
            //get the attck hit location
            //mark position in gameboard as a hit
            healthBar = healthBar - num;
            console.log("this ship took hit: " + num)
            return 
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
        }
    }
}

const bigShip = ships(5);
const midShip = ships(3);
const midShip2 = ships(3);
const smollShip = ships(1);

bigShip.hit(5);
bigShip.healthBar();
bigShip.isSunk();


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXBzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gZnVuY3Rpb24gc2hpcHMoKXtcbi8vICAgICBjb25zb2xlLmxvZygnc2hpcHMgaGFzIHNhaWxlZCcpXG4vLyB9XG4vLyBzaGlwcygpO1xuXG5jb25zdCBzaGlwcyA9IChsZW4pID0+eyAvLyBsZW5ndGggd2lsbCBiZSBmcm9tIFxuICAgIGxldCBoZWFsdGhCYXIgPSBsZW47XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbGVuZ3RoOiAoKT0+e1xuICAgICAgICAgICAgcmV0dXJuIGxlbiBcbiAgICAgICAgfSxcbiAgICAgICAgaGl0OiAobnVtKT0+e1xuICAgICAgICAgICAgLy9nZXQgdGhlIGF0dGNrIGhpdCBsb2NhdGlvblxuICAgICAgICAgICAgLy9tYXJrIHBvc2l0aW9uIGluIGdhbWVib2FyZCBhcyBhIGhpdFxuICAgICAgICAgICAgaGVhbHRoQmFyID0gaGVhbHRoQmFyIC0gbnVtO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzIHNoaXAgdG9vayBoaXQ6IFwiICsgbnVtKVxuICAgICAgICAgICAgcmV0dXJuIFxuICAgICAgICB9LFxuICAgICAgICBpc1N1bms6ICgpPT57XG4gICAgICAgICAgICAvL2NoZWNrIHRoZSBzaGlwIGlmIHN1bmtlbiB5ZXRcbiAgICAgICAgICAgIGlmKGhlYWx0aEJhciA8PSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NoaXAgaXMgZGVzdHJveWVkJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICBcbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2hpcCBpcyBzdGlsbCBpbnRhY3QnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIFxuICAgICAgICBoZWFsdGhCYXIgOiAoKT0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGhpcyBzaGlwIGhlYWx0aDogXCIgKyBoZWFsdGhCYXIpO1xuICAgICAgICAgICAgcmV0dXJuIGhlYWx0aEJhclxuICAgICAgICB9XG4gICAgfVxufVxuXG5jb25zdCBiaWdTaGlwID0gc2hpcHMoNSk7XG5jb25zdCBtaWRTaGlwID0gc2hpcHMoMyk7XG5jb25zdCBtaWRTaGlwMiA9IHNoaXBzKDMpO1xuY29uc3Qgc21vbGxTaGlwID0gc2hpcHMoMSk7XG5cbmJpZ1NoaXAuaGl0KDUpO1xuYmlnU2hpcC5oZWFsdGhCYXIoKTtcbmJpZ1NoaXAuaXNTdW5rKCk7XG5cbmV4cG9ydCB7c2hpcHN9Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9