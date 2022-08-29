/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGZ1bmN0aW9uIHNoaXBzKCl7XG4vLyAgICAgY29uc29sZS5sb2coJ3NoaXBzIGhhcyBzYWlsZWQnKVxuLy8gfVxuLy8gc2hpcHMoKTtcblxuY29uc3Qgc2hpcHMgPSAobGVuKSA9PnsgLy8gbGVuZ3RoIHdpbGwgYmUgZnJvbSBcbiAgICBsZXQgaGVhbHRoQmFyID0gbGVuO1xuICAgIHJldHVybiB7XG4gICAgICAgIGxlbmd0aDogKCk9PntcbiAgICAgICAgICAgIHJldHVybiBsZW4gXG4gICAgICAgIH0sXG4gICAgICAgIGhpdDogKG51bSk9PntcbiAgICAgICAgICAgIC8vZ2V0IHRoZSBhdHRjayBoaXQgbG9jYXRpb25cbiAgICAgICAgICAgIC8vbWFyayBwb3NpdGlvbiBpbiBnYW1lYm9hcmQgYXMgYSBoaXRcbiAgICAgICAgICAgIGhlYWx0aEJhciA9IGhlYWx0aEJhciAtIG51bTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGhpcyBzaGlwIHRvb2sgaGl0OiBcIiArIG51bSlcbiAgICAgICAgICAgIHJldHVybiBcbiAgICAgICAgfSxcbiAgICAgICAgaXNTdW5rOiAoKT0+e1xuICAgICAgICAgICAgLy9jaGVjayB0aGUgc2hpcCBpZiBzdW5rZW4geWV0XG4gICAgICAgICAgICBpZihoZWFsdGhCYXIgPD0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzaGlwIGlzIGRlc3Ryb3llZCcpO1xuICAgICAgICAgICAgICAgIHJldHVybiAgXG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NoaXAgaXMgc3RpbGwgaW50YWN0Jyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBcbiAgICAgICAgaGVhbHRoQmFyIDogKCk9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMgc2hpcCBoZWFsdGg6IFwiICsgaGVhbHRoQmFyKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY29uc3QgYmlnU2hpcCA9IHNoaXBzKDUpO1xuY29uc3QgbWlkU2hpcCA9IHNoaXBzKDMpO1xuY29uc3QgbWlkU2hpcDIgPSBzaGlwcygzKTtcbmNvbnN0IHNtb2xsU2hpcCA9IHNoaXBzKDEpO1xuXG5iaWdTaGlwLmhpdCg1KTtcbmJpZ1NoaXAuaGVhbHRoQmFyKCk7XG5iaWdTaGlwLmlzU3VuaygpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==