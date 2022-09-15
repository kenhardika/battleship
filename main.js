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
/* harmony import */ var _maingame_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./maingame.js */ "./src/maingame.js");
/* harmony import */ var _markedAttackMove_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./markedAttackMove.js */ "./src/markedAttackMove.js");



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
                (0,_markedAttackMove_js__WEBPACK_IMPORTED_MODULE_1__.markedAttack)(user, coord);
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
                    console.log('ALL SHIPS HAS BEEN DESTROYED, RIP TO: ' + user);
                    _maingame_js__WEBPACK_IMPORTED_MODULE_0__.gameEnd.active();
                    return
                }
                else {
                    (0,_markedAttackMove_js__WEBPACK_IMPORTED_MODULE_1__.markedHit)(user, coord);
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

/***/ "./src/maingame.js":
/*!*************************!*\
  !*** ./src/maingame.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AIGameboard": () => (/* binding */ AIGameboard),
/* harmony export */   "game": () => (/* binding */ game),
/* harmony export */   "gameEnd": () => (/* binding */ gameEnd),
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
                        // gameEnd.active(); // telat nih, a bit too late, need another click before initiate
                        // game.restartGame();
                        return // GAME END
                    }
                    else if(AIGameboard.allLocation().length > 1 || playerGameboard.allLocation().length > 1){
                        AIGameboard.receiveAttack(grid.className, 'AI');
                        AIGameboard.checkTotalHealth();
                        randomAttack(playerGameboard, 'player');
                        return
                    }
                }
            });
        });
    }

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
        // game.restartGame();
    });
    randomPlaceBtn.addEventListener('click', ()=>{
        console.log('randomize');
        gameEnd.active();
        // popUpGameEnd().active();
    });
}

startGameBtn()

console.log('Game Ready');


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
/* harmony import */ var _maingame__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./maingame */ "./src/maingame.js");


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
        _maingame__WEBPACK_IMPORTED_MODULE_0__.game.restartGame();
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/maingame.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDBEQUFVO0FBQ2xCLFFBQVEsMERBQVU7QUFDbEIsUUFBUSwwREFBVTtBQUNsQixRQUFRLDBEQUFVO0FBQ2xCO0FBQ0E7QUFDQSxzREFBc0QsS0FBSyxhQUFhO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHFFQUFxQjtBQUNqQyxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoSkE7QUFDQSxzREFBc0QsS0FBSztBQUMzRCxrREFBa0QsVUFBVTtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsS0FBSztBQUMzRCxrREFBa0QsVUFBVTtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxLQUFLO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmluZENvbW1vbkVsZW1lbnRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbGF5b3V0R3JpZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2xheW91dEdyaWRQbGFjZWRDb2xvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21haW5nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbWFya2VkQXR0YWNrTW92ZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYWNlR2FwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxhY2VSYW5kb21pemVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcG9wVXBHYW1lRW5kLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBjbGVhckNoaWxkKHBhcmVudCkge1xyXG4gICAgY29uc3QgbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtwYXJlbnR9YClcclxuICAgIHdoaWxlIChsYXllci5maXJzdENoaWxkKSB7XHJcbiAgICAgIGxheWVyLnJlbW92ZUNoaWxkKGxheWVyLmZpcnN0Q2hpbGQpO1xyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICBleHBvcnQgZGVmYXVsdCBjbGVhckNoaWxkOyIsImZ1bmN0aW9uIGZpbmRDb21tb25FbGVtZW50cyhhcnIxLCBhcnIyKSB7XHJcbiAgICByZXR1cm4gYXJyMS5zb21lKGl0ZW0gPT4gYXJyMi5pbmNsdWRlcyhpdGVtKSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZmluZENvbW1vbkVsZW1lbnRzIiwiaW1wb3J0IHsgZ2FtZSwgZ2FtZUVuZCB9IGZyb20gXCIuL21haW5nYW1lLmpzXCI7XHJcbmltcG9ydCB7IG1hcmtlZEF0dGFjaywgbWFya2VkSGl0IH0gZnJvbSBcIi4vbWFya2VkQXR0YWNrTW92ZS5qc1wiO1xyXG5cclxuY29uc3QgZ2FtZWJvYXJkID0gKCk9PiB7XHJcbiAgICBsZXQgYWxsU2hpcCA9IFtdO1xyXG4gICAgbGV0IHRvdGFsSGVhbHRoID0gMDtcclxuICAgIGxldCBhbGxMb2NhdGlvbiA9IFtdO1xyXG4gICAgbGV0IGF0dGFja01pc3NlZCA9IFtdO1xyXG4gICAgbGV0IGFsbEdhcExvY2F0aW9uID0gW107XHJcbiAgICBsZXQgYWxsUmVjZWl2ZWRBdHRhY2tMb2NhdGlvbiA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJlZnJlc2hBbGxMb2NhdGlvbigpe1xyXG4gICAgICAgIGxldCBuZXdMb2NhdGlvbiA9IFtdO1xyXG4gICAgICAgIGFsbFNoaXAuZm9yRWFjaCgoc2hpcCk9PntcclxuICAgICAgICAgICAgbmV3TG9jYXRpb24gPSBuZXdMb2NhdGlvbi5jb25jYXQoc2hpcC5sb2NhdGlvbigpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhbGxMb2NhdGlvbiA9IG5ld0xvY2F0aW9uO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gYXR0YWNrTWlzc2VkQ291bnRlcihjb29yKXtcclxuICAgICAgICBhdHRhY2tNaXNzZWQucHVzaChjb29yKTtcclxuICAgIH1cclxuXHJcbiAgICAvL2NvbnNvbGUubG9nKCdnYW1lYm9hcmQgaXMgb24nKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcGxhY2VtZW50OiAoc2hpcHMpPT57IC8vIGRvbnQgbmVlZCBjb29yIHNpbmNlIGNvb3JkaW5hdGUgc2hvdWxkIGJlIGluc2lkZSB0aGUgc2hpcCgpXHJcbiAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgY29vcmRpbmF0ZSBpcyB2YWxpZCwgd2hpY2ggbWVhbnMgZW1wdHkgYW5kIG9uZSBibG9jayBhd2F5IGZyb20gYW5vdGhlciBzaGlwXHJcbiAgICAgICAgICAgIC8vIHBsYWNlIHRoZSBzaGlwcyBvbiB0aGUgY29vcmRpbmF0ZSAgICAgXHJcbiAgICAgICAgICAgIGFsbFNoaXAucHVzaChzaGlwcyk7XHJcbiAgICAgICAgICAgIGFsbExvY2F0aW9uID0gYWxsTG9jYXRpb24uY29uY2F0KHNoaXBzLmxvY2F0aW9uKCkpO1xyXG4gICAgICAgICAgICAvLyBtYXJrcyB0aGUgY29vcmRpbmF0ZSB3aXRoIHNoaXBzJyBtYXJrc1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlY2VpdmVBdHRhY2s6IChjb29yLCB1c2VyKT0+e1xyXG4gICAgICAgICAgICBjb25zdCBjb29yZCA9IGNvb3IudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgYWxsUmVjZWl2ZWRBdHRhY2tMb2NhdGlvbi5wdXNoKGNvb3JkKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKGFsbExvY2F0aW9uLmluY2x1ZGVzKGNvb3JkKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0F0dGFjayBtaXNzZWQgdG86JyArIHVzZXIpXHJcbiAgICAgICAgICAgICAgICBhdHRhY2tNaXNzZWRDb3VudGVyKGNvb3JkKTtcclxuICAgICAgICAgICAgICAgIG1hcmtlZEF0dGFjayh1c2VyLCBjb29yZCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0F0dGFjayBIaXQhIHRvOiAnICsgdXNlcilcclxuICAgICAgICAgICAgICAgIGFsbFNoaXAuZm9yRWFjaCgoc2hpcCk9PntcclxuICAgICAgICAgICAgICAgICAgICBzaGlwLmhpdChjb29yZCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIHJlZnJlc2ggdGhlIGFsbExvY2F0aW9uIEFycmF5IHNvIHlvdSBjYW5ub3QgaGl0IHR3aWNlIG9uIHRoZSBzYW1lIGNvb3JkaW5hdGVcclxuICAgICAgICAgICAgICAgIHJlZnJlc2hBbGxMb2NhdGlvbigpXHJcbiAgICAgICAgICAgICAgICBpZiAoYWxsTG9jYXRpb24ubGVuZ3RoIDwgMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0FMTCBTSElQUyBIQVMgQkVFTiBERVNUUk9ZRUQsIFJJUCBUTzogJyArIHVzZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVFbmQuYWN0aXZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXJrZWRIaXQodXNlciwgY29vcmQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYWxsTG9jYXRpb24pO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWxsUmVjZWl2ZWRBdHRhY2tMb2NhdGlvbixcclxuICAgICAgICBjaGVja1RvdGFsSGVhbHRoOiAoKT0+e1xyXG4gICAgICAgICAgICByZWZyZXNoQWxsTG9jYXRpb24oKTtcclxuICAgICAgICAgICAgdG90YWxIZWFsdGggPSBhbGxMb2NhdGlvbi5sZW5ndGg7XHJcbiAgICAgICAgICAgIC8vIGlmIGFsbCB0aGUgaGVhbHRoYmFyIGlzIDAgdGhlbiB0aGUgZ2FtZSBpcyBlbmRlZFxyXG4gICAgICAgICAgICBpZih0b3RhbEhlYWx0aCA8PSAwKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR0FNRSBPVkVSIEFMTCBPRiBZT1VSIFNISVBTIFdSRUNLRURcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWxsTG9jYXRpb246ICgpPT57XHJcbiAgICAgICAgICAgIHJlZnJlc2hBbGxMb2NhdGlvbigpO1xyXG4gICAgICAgICAgICByZXR1cm4gYWxsTG9jYXRpb25cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoZWNrQWxsTG9jYXRpb246KCk9PntcclxuICAgICAgICAgICAgcmVmcmVzaEFsbExvY2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFsbExvY2F0aW9uKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFsbExvY2F0aW9uXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZWxldGVBbGxTaGlwOiAoKT0+IHtcclxuICAgICAgICAgICAgYWxsU2hpcC5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB0b3RhbEhlYWx0aCA9IDA7XHJcbiAgICAgICAgICAgIGFsbExvY2F0aW9uLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIGF0dGFja01pc3NlZC5sZW5ndGg9MDtcclxuICAgICAgICAgICAgYWxsR2FwTG9jYXRpb24ubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgYWxsUmVjZWl2ZWRBdHRhY2tMb2NhdGlvbi5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICByZWZyZXNoQWxsTG9jYXRpb24oKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFkZEdhcExvY2F0aW9uOiAoYXJyYXkpPT4ge1xyXG4gICAgICAgICAgICAvLyBnYXBMb2NhdGlvbi5wdXNoKGFycmF5KTtcclxuICAgICAgICAgICAgYXJyYXkuZm9yRWFjaCgoYXJyKT0+e1xyXG4gICAgICAgICAgICAgICAgYWxsR2FwTG9jYXRpb24ucHVzaChhcnIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCBcclxuICAgICAgICBjaGVja0dhcExvY2F0aW9uOiAoKT0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYWxsR2FwTG9jYXRpb24pO1xyXG4gICAgICAgICAgICByZXR1cm4gYWxsR2FwTG9jYXRpb25cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoZWNrQXR0YWNrTWlzc2VkOiAoKT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhdHRhY2tNaXNzZWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gYXR0YWNrTWlzc2VkXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhbGxHYXBMb2NhdGlvblxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGdhbWVib2FyZDsiLCJcclxuZnVuY3Rpb24gY3JlYXRlR3JpZCh3aG9zKXtcclxuICAgIGNvbnN0IGxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7d2hvc31HYW1lYm9hcmRgKTtcclxuICAgIGNvbnN0IE1BWF9XSURUSCA9IDEwO1xyXG4gICAgY29uc3QgYWxwaGFiZXQgPSAnYWJjZGVmZ2hpaic7XHJcbiAgICBjb25zdCBhbHBoQXJyYXkgPSBhbHBoYWJldC5zcGxpdCgnJyk7XHJcblxyXG4gICAgYWxwaEFycmF5LmZvckVhY2goKGFscCk9PntcclxuICAgICAgICBmb3IgKGxldCBpPTE7IGkgPD0gTUFYX1dJRFRIOyBpKysgKXtcclxuICAgICAgICAgICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBncmlkLmNsYXNzTmFtZT1gJHthbHB9JHtpfWA7XHJcbiAgICAgICAgICAgIGxheWVyLmFwcGVuZChncmlkKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVHcmlkIiwiZnVuY3Rpb24gbGF5b3V0R3JpZFBsYWNlZENvbG9yKGdhbWVib2FyZCwgdXNlcil7XHJcbiAgICBsZXQgY3VycmVudEdhcCA9IGdhbWVib2FyZC5hbGxHYXBMb2NhdGlvbjtcclxuICAgIGxldCBjdXJyZW50U2hpcCA9IGdhbWVib2FyZC5hbGxMb2NhdGlvbigpO1xyXG4gICAgaWYgKGN1cnJlbnRHYXAubGVuZ3RoID09PSAwKXtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0IGFycmF5IGdhcGxvY2F0aW9uIGVtcHR5JylcclxuICAgICAgICBjb25zdCBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3VzZXJ9R2FtZWJvYXJkYCk7XHJcbiAgICAgICAgY29uc3QgZ2FwID0gbGF5ZXIucXVlcnlTZWxlY3RvckFsbCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGdhcC5mb3JFYWNoKChnKT0+e1xyXG4gICAgICAgICAgICAgICAgZy5jbGFzc0xpc3QucmVtb3ZlKCdnYXAnKTtcclxuICAgICAgICAgICAgICAgIGcuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGN1cnJlbnRHYXAuZm9yRWFjaCgoYXJyYXlMb2MpPT57XHJcbiAgICAgICAgICAgIGNvbnN0IGxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7dXNlcn1HYW1lYm9hcmRgKTtcclxuICAgICAgICAgICAgbGV0IGdhcCA9IGxheWVyLnF1ZXJ5U2VsZWN0b3IoYC4ke2FycmF5TG9jfWApO1xyXG4gICAgICAgICAgICBnYXAuY2xhc3NMaXN0LmFkZCgnZ2FwJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY3VycmVudFNoaXAuZm9yRWFjaCgoY3Vyc2hpcCk9PntcclxuICAgICAgICAgICAgY29uc3QgbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt1c2VyfUdhbWVib2FyZGApO1xyXG4gICAgICAgICAgICBsZXQgc2hpcCA9IGxheWVyLnF1ZXJ5U2VsZWN0b3IoYC4ke2N1cnNoaXB9YCk7XHJcbiAgICAgICAgICAgIHNoaXAuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsYXlvdXRHcmlkUGxhY2VkQ29sb3IiLCJpbXBvcnQgZ2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZC5qc1wiXHJcbmltcG9ydCBzaGlwcyBmcm9tIFwiLi9zaGlwcy5qc1wiO1xyXG5pbXBvcnQgcGxhY2VSYW5kb21pemVyIGZyb20gXCIuL3BsYWNlUmFuZG9taXplci5qc1wiO1xyXG5pbXBvcnQgZmluZENvbW1vbkVsZW1lbnRzIGZyb20gXCIuL2ZpbmRDb21tb25FbGVtZW50cy5qc1wiO1xyXG5pbXBvcnQgcGxhY2VHYXAgZnJvbSBcIi4vcGxhY2VHYXAuanNcIjtcclxuaW1wb3J0IGNyZWF0ZUdyaWQgZnJvbSBcIi4vbGF5b3V0R3JpZC5qc1wiO1xyXG5pbXBvcnQgbGF5b3V0R3JpZFBsYWNlZENvbG9yIGZyb20gXCIuL2xheW91dEdyaWRQbGFjZWRDb2xvci5qc1wiO1xyXG5pbXBvcnQgY2xlYXJDaGlsZCBmcm9tIFwiLi9jbGVhckNoaWxkLmpzXCI7XHJcbmltcG9ydCBwb3BVcEdhbWVFbmQgZnJvbSBcIi4vcG9wVXBHYW1lRW5kLmpzXCI7XHJcblxyXG5jcmVhdGVHcmlkKCdBSScpO1xyXG5jcmVhdGVHcmlkKCdwbGF5ZXInKTtcclxuY29uc3QgcGxheWVyR2FtZWJvYXJkID0gZ2FtZWJvYXJkKCk7XHJcbmNvbnN0IEFJR2FtZWJvYXJkID0gZ2FtZWJvYXJkKCk7XHJcbmNvbnN0IGdhbWUgPSBzdGFydEdhbWUoKTtcclxuY29uc3QgZ2FtZUVuZCA9IHBvcFVwR2FtZUVuZCgpO1xyXG5cclxuZnVuY3Rpb24gc3RhcnRHYW1lKCl7XHJcbiAgICBmdW5jdGlvbiByYW5kb21QbGFjZW1lbnQoYm9hcmQsIHZhbCl7IC8vIHlvdSBjYW4gdXNlIHRoaXMgcmFuZG9tUGxhY2VtZW50IHdpdGggQUkgb3IgUGxheWVyXHJcbiAgICAgICAgbGV0IG5ld1NoaXBDb29yZCA9IHBsYWNlUmFuZG9taXplcih2YWwpO1xyXG4gICAgICAgIGxldCBuZXdTaGlwV2l0aEdhcCA9IHBsYWNlR2FwKG5ld1NoaXBDb29yZCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlUmFuZG9taXplV2l0aEdhcCgpe1xyXG4gICAgICAgICAgICBuZXdTaGlwQ29vcmQgPSBwbGFjZVJhbmRvbWl6ZXIodmFsKTtcclxuICAgICAgICAgICAgbmV3U2hpcFdpdGhHYXAgPSBwbGFjZUdhcChuZXdTaGlwQ29vcmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tBbmRBZGRFbGVtZW50cyhuZXdlc3QsIGN1cnJlbnQsIHZhbCl7XHJcbiAgICAgICAgICAgIGlmIChmaW5kQ29tbW9uRWxlbWVudHMobmV3ZXN0LCBjdXJyZW50KSA9PT0gZmFsc2UpeyAvLyBpZiB0aGVyZSBJUyBOT1QgY29tbW9uIGVsZW1lbnRzIGluc2lkZSBvZiBib3RoIGFycmF5IChub3QgY2xhc2hlZCksIHByb2NlZWQgdG8gYWRkIHRvIGdhbWVib2FyZFxyXG4gICAgICAgICAgICAgICAgYm9hcmQucGxhY2VtZW50KHNoaXBzKG5ld1NoaXBDb29yZCkpO1xyXG4gICAgICAgICAgICAgICAgYm9hcmQuYWRkR2FwTG9jYXRpb24ocGxhY2VHYXAobmV3U2hpcENvb3JkKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHsgLy8gaWYgdGhlcmUgSVMgY29tbW9uIGVsZW1lbnQgaW5zaWRlIGJvdGggYXJyYXksIHJhbmRvbWl6ZSB0aGUgc2hpcCBwbGFjZW1lbnQgYWdhaW4sIHRoZW4gcmVwZWF0IHRoaXMgZnVuY3Rpb25cclxuICAgICAgICAgICAgICAgIHJlUmFuZG9taXplV2l0aEdhcCgpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tBbmRBZGRFbGVtZW50cyhuZXdTaGlwQ29vcmQsIGJvYXJkLmFsbEdhcExvY2F0aW9uLCB2YWwpOyAvLyByZXBlYXQgdGhpcyBmdW5jdGlvbiBhZ2FpblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc3RhcnRzIGhlcmVcclxuICAgICAgICBjaGVja0FuZEFkZEVsZW1lbnRzKG5ld1NoaXBXaXRoR2FwLCBib2FyZC5hbGxHYXBMb2NhdGlvbiwgdmFsKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByYW5kb21BdHRhY2soYm9hcmQsIHVzZXIpe1xyXG4gICAgICAgIGxldCBuZXdBdHRhY2tDb29yZCA9IHBsYWNlUmFuZG9taXplcigxKTsgLy8gb25seSBvbmUgZ3JpZCBwZXIgYXR0YWNrIGFsbG93ZWRcclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiByZU5ld0F0dGFjaygpe1xyXG4gICAgICAgICAgICBuZXdBdHRhY2tDb29yZCA9IHBsYWNlUmFuZG9taXplcigxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrUmVwZWF0ZWRBdHRhY2sobmV3ZXN0LCBjdXJyZW50LCB1c2VyKXtcclxuICAgICAgICAgICAgaWYgKCFjdXJyZW50KXtcclxuICAgICAgICAgICAgICAgIGJvYXJkLnJlY2VpdmVBdHRhY2sobmV3QXR0YWNrQ29vcmQsIHVzZXIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZmluZENvbW1vbkVsZW1lbnRzKG5ld2VzdCwgY3VycmVudCkgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgIGJvYXJkLnJlY2VpdmVBdHRhY2sobmV3QXR0YWNrQ29vcmQsIHVzZXIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZU5ld0F0dGFjaygpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tSZXBlYXRlZEF0dGFjayhuZXdBdHRhY2tDb29yZCwgYm9hcmQuYWxsUmVjZWl2ZWRBdHRhY2tMb2NhdGlvbiwgdXNlcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjaGVja1JlcGVhdGVkQXR0YWNrKG5ld0F0dGFja0Nvb3JkLCBib2FyZC5hbGxSZWNlaXZlZEF0dGFja0xvY2F0aW9uLCB1c2VyKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHNldFNoaXBSYW5kb20oYm9hcmQpe1xyXG4gICAgICAgIC8vIHBsYWNlIHRoZSBib2FyZCB5b3UgdXNlIGFuZCB0aGUgbGVuZ3RoIG9mIHNoaXAsIHRoZW4gcmFuZG9tUGxhY2VtZW50KCkgd2lsbCBwbGFjZSBpdCByYW5kb21seSBpbmNsdWRpbmcgZ2FwIGJldHdlZW4gc2hpcHNcclxuICAgICAgICByYW5kb21QbGFjZW1lbnQoYm9hcmQsNSk7IFxyXG4gICAgICAgIHJhbmRvbVBsYWNlbWVudChib2FyZCw0KTtcclxuICAgICAgICByYW5kb21QbGFjZW1lbnQoYm9hcmQsMyk7XHJcbiAgICAgICAgcmFuZG9tUGxhY2VtZW50KGJvYXJkLDMpO1xyXG4gICAgICAgIHJhbmRvbVBsYWNlbWVudChib2FyZCwyKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHJlc2V0R2FtZWJvYXJkKCl7XHJcbiAgICAgICAgQUlHYW1lYm9hcmQuZGVsZXRlQWxsU2hpcCgpO1xyXG4gICAgICAgIHBsYXllckdhbWVib2FyZC5kZWxldGVBbGxTaGlwKCk7XHJcbiAgICAgICAgY2xlYXJDaGlsZCgnQUlHYW1lYm9hcmQnKTtcclxuICAgICAgICBjbGVhckNoaWxkKCdwbGF5ZXJHYW1lYm9hcmQnKTtcclxuICAgICAgICBjcmVhdGVHcmlkKCdBSScpO1xyXG4gICAgICAgIGNyZWF0ZUdyaWQoJ3BsYXllcicpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gYXR0YWNrTW9kZSh1c2VyKXtcclxuICAgICAgICBjb25zdCBnYW1lbGF5b3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7dXNlcn1HYW1lYm9hcmRgKTsgLy8gc3RpbGwgYnJva2UgZXZlcnkgYXR0YWNrIG1vZGUgaXMgaW5pdGlhdGVkIG92ZXIyIGFnYWluIHNvLCA0eCBzdGFydCBnYW1lID0gNHggYXR0YWNrbW9kZSgpXHJcbiAgICAgICAgY29uc3QgYWxsR3JpZCA9IGdhbWVsYXlvdXQucXVlcnlTZWxlY3RvckFsbCgnZGl2Jyk7XHJcbiAgICAgICAgYWxsR3JpZC5mb3JFYWNoKChncmlkKT0+e1xyXG4gICAgICAgICAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcclxuICAgICAgICAgICAgICAgIGlmKGdyaWQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhdHRhY2tlZCcpIHx8IGdyaWQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaXQnKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKEFJR2FtZWJvYXJkLmFsbExvY2F0aW9uKCkubGVuZ3RoIDwgMSB8fCBwbGF5ZXJHYW1lYm9hcmQuYWxsTG9jYXRpb24oKS5sZW5ndGggPCAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2FtZUVuZC5hY3RpdmUoKTsgLy8gdGVsYXQgbmloLCBhIGJpdCB0b28gbGF0ZSwgbmVlZCBhbm90aGVyIGNsaWNrIGJlZm9yZSBpbml0aWF0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBnYW1lLnJlc3RhcnRHYW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAvLyBHQU1FIEVORFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKEFJR2FtZWJvYXJkLmFsbExvY2F0aW9uKCkubGVuZ3RoID4gMSB8fCBwbGF5ZXJHYW1lYm9hcmQuYWxsTG9jYXRpb24oKS5sZW5ndGggPiAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQUlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhncmlkLmNsYXNzTmFtZSwgJ0FJJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFJR2FtZWJvYXJkLmNoZWNrVG90YWxIZWFsdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZG9tQXR0YWNrKHBsYXllckdhbWVib2FyZCwgJ3BsYXllcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc3RhcnRWc0FJOiAoKT0+e1xyXG4gICAgICAgICAgICByZXNldEdhbWVib2FyZCgpO1xyXG4gICAgICAgICAgICBhdHRhY2tNb2RlKCdBSScpO1xyXG4gICAgICAgICAgICBzZXRTaGlwUmFuZG9tKEFJR2FtZWJvYXJkKTtcclxuICAgICAgICAgICAgc2V0U2hpcFJhbmRvbShwbGF5ZXJHYW1lYm9hcmQpO1xyXG4gICAgICAgICAgICBsYXlvdXRHcmlkUGxhY2VkQ29sb3IocGxheWVyR2FtZWJvYXJkLCAncGxheWVyJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXN0YXJ0R2FtZTogKCk9PiB7XHJcbiAgICAgICAgICAgIHJlc2V0R2FtZWJvYXJkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzdGFydEdhbWVCdG4oKXtcclxuICAgIGNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXJ0R2FtZUJ0bicpO1xyXG4gICAgY29uc3QgcmVzdGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXN0YXJ0QnRuJyk7XHJcbiAgICBjb25zdCByYW5kb21QbGFjZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyYW5kb21QbGFjZUJ0bicpO1xyXG5cclxuICAgIHN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcclxuICAgICAgICBjb25zb2xlLmxvZygnUGxheSB0aGUgZ2FtZSEnKTtcclxuICAgICAgICBnYW1lLnN0YXJ0VnNBSSgpO1xyXG4gICAgfSk7XHJcbiAgICByZXN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcclxuICAgICAgICBjb25zb2xlLmxvZygncmVzdGFydGVkJyk7XHJcbiAgICAgICAgLy8gZ2FtZS5yZXN0YXJ0R2FtZSgpO1xyXG4gICAgfSk7XHJcbiAgICByYW5kb21QbGFjZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3JhbmRvbWl6ZScpO1xyXG4gICAgICAgIGdhbWVFbmQuYWN0aXZlKCk7XHJcbiAgICAgICAgLy8gcG9wVXBHYW1lRW5kKCkuYWN0aXZlKCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuc3RhcnRHYW1lQnRuKClcclxuXHJcbmNvbnNvbGUubG9nKCdHYW1lIFJlYWR5Jyk7XHJcbmV4cG9ydCB7cGxheWVyR2FtZWJvYXJkLCBBSUdhbWVib2FyZCwgZ2FtZSwgZ2FtZUVuZH0iLCJmdW5jdGlvbiBtYXJrZWRBdHRhY2sodXNlciwgY2xhc3NOYW1lKXtcclxuICAgICAgICBjb25zdCBnYW1lbGF5b3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7dXNlcn1HYW1lYm9hcmRgKTtcclxuICAgICAgICBjb25zdCBncmlkID0gZ2FtZWxheW91dC5xdWVyeVNlbGVjdG9yKGAuJHtjbGFzc05hbWV9YCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coZ3JpZCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coY2xhc3NOYW1lKTtcclxuICAgICAgICBncmlkLmNsYXNzTGlzdC5hZGQoJ2F0dGFja2VkJyk7XHJcbiAgICAgICAgcmV0dXJuXHJcbn1cclxuZnVuY3Rpb24gbWFya2VkSGl0KHVzZXIsIGNsYXNzTmFtZSl7XHJcbiAgICAgICAgY29uc3QgZ2FtZWxheW91dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3VzZXJ9R2FtZWJvYXJkYCk7XHJcbiAgICAgICAgY29uc3QgZ3JpZCA9IGdhbWVsYXlvdXQucXVlcnlTZWxlY3RvcihgLiR7Y2xhc3NOYW1lfWApO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coZ3JpZCk7XHJcbiAgICAgICAgZ3JpZC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcclxuICAgICAgICByZXR1cm5cclxufVxyXG5cclxuZnVuY3Rpb24gcmVzZXRNYXJrZWRBdHRhY2sodXNlcil7XHJcbiAgICAgICAgY29uc3QgZ2FtZWxheW91dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3VzZXJ9R2FtZWJvYXJkYCk7XHJcbiAgICAgICAgY29uc3QgYWxsR3JpZCA9IGdhbWVsYXlvdXQucXVlcnlTZWxlY3RvckFsbChgZGl2YCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coY2xhc3NOYW1lKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhncmlkKTtcclxuICAgICAgICBhbGxHcmlkLmZvckVhY2goKGdyaWQpPT57XHJcbiAgICAgICAgICAgICAgICBncmlkLmNsYXNzTGlzdC5yZW1vdmUoJ2hpdCcpO1xyXG4gICAgICAgICAgICAgICAgZ3JpZC5jbGFzc0xpc3QucmVtb3ZlKCdhdHRhY2tlZCcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVyblxyXG59XHJcbmV4cG9ydCB7bWFya2VkQXR0YWNrLCBtYXJrZWRIaXQsIHJlc2V0TWFya2VkQXR0YWNrfSIsIi8vIHNldCBnYXAgYnkgb25lIGJ5IG9uZSBsb29wIGNoZWNrXHJcblxyXG5mdW5jdGlvbiBwbGFjZUdhcChtYWluQXJyYXkpe1xyXG4gICAgbGV0IG91dHB1dEFycmF5ID0gW107XHJcbiAgICBsZXQgcmVzdWx0QXJyYXkgPSBbXTtcclxuICAgIGNvbnN0IG51bWJlclBhdHQgPSAvWzAtOV0vZztcclxuICAgIGNvbnN0IGFscGhhUGF0dCA9IC9bYS16QS1aXS9nO1xyXG4gICAgY29uc3QgYWxwaGFiZXRNYXggPSAnYWJjZGVmZ2hpaic7XHJcbiAgICBjb25zdCBhbHBBcnJheSA9IGFscGhhYmV0TWF4LnNwbGl0KCcnKTtcclxuICAgIG1haW5BcnJheS5mb3JFYWNoKCh2YWwpPT57XHJcbiAgICAgICAgY29uc3QgbnVtYiA9IHBhcnNlSW50KHZhbC5tYXRjaChudW1iZXJQYXR0KS5qb2luKCcnKSk7XHJcbiAgICAgICAgY29uc3QgYWxwaCA9IHZhbC5tYXRjaChhbHBoYVBhdHQpLmpvaW4oJycpO1xyXG4gICAgICAgIGNvbnN0IG51bWJNaW51c09uZSA9IG51bWIgLSAxO1xyXG4gICAgICAgIGNvbnN0IG51bWJQbHVzT25lID0gbnVtYiArIDE7XHJcbiAgICAgICAgY29uc3QgYWxwaFBsdXNPbmUgPSBhbHBBcnJheVsoYWxwQXJyYXkuaW5kZXhPZihhbHBoKSkrMV07XHJcbiAgICAgICAgY29uc3QgYWxwaE1pbnVzT25lID0gYWxwQXJyYXlbKGFscEFycmF5LmluZGV4T2YoYWxwaCkpLTFdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIG1lcmdlQXJyYXkoKXtcclxuICAgICAgICAgICAgICAvLyBtZXJnZSB0aGUgYXJyYXlcclxuICAgICAgICAgICAgcmVzdWx0QXJyYXkgPSByZXN1bHRBcnJheS5jb25jYXQob3V0cHV0QXJyYXkpO1xyXG4gICAgICAgICAgICByZXN1bHRBcnJheSA9IFsuLi5uZXcgU2V0IChbLi4ubWFpbkFycmF5LC4uLm91dHB1dEFycmF5XSldOyAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrUmlnaHQoKXtcclxuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaChhbHBoLmNvbmNhdCgobnVtYlBsdXNPbmUpLnRvU3RyaW5nKCkpKTsgLy8gcmlnaHRcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tMZWZ0KCl7XHJcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaC5jb25jYXQoKG51bWJNaW51c09uZSkudG9TdHJpbmcoKSkpOyAvLyBsZWZ0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrVXAoKXtcclxuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaChhbHBoTWludXNPbmUuY29uY2F0KChudW1iKS50b1N0cmluZygpKSk7IC8vIHVwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrRG93bigpe1xyXG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKGFscGhQbHVzT25lLmNvbmNhdCgobnVtYikudG9TdHJpbmcoKSkpOyAvLyBkb3duXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrRGlhZ1VwUmlnaHQoKXtcclxuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaChhbHBoTWludXNPbmUuY29uY2F0KChudW1iUGx1c09uZSkudG9TdHJpbmcoKSkpOyAvLyB1cCByaWdodFxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBjaGVja0RpYWdEb3duUmlnaHQoKXtcclxuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaChhbHBoUGx1c09uZS5jb25jYXQoKG51bWJQbHVzT25lKS50b1N0cmluZygpKSk7IC8vIGRvd24gcmlnaHRcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tEaWFnVXBMZWZ0KCl7XHJcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaE1pbnVzT25lLmNvbmNhdCgobnVtYk1pbnVzT25lKS50b1N0cmluZygpKSk7IC8vIHVwIGxlZnRcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tEaWFnRG93bkxlZnQoKXtcclxuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaChhbHBoUGx1c09uZS5jb25jYXQoKG51bWJNaW51c09uZSkudG9TdHJpbmcoKSkpOyAvLyBkb3duIGxlZnRcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFscGhNaW51c09uZSA9PSB1bmRlZmluZWQgJiYgbnVtYk1pbnVzT25lIDwgMSl7IC8vIGNvcm5lciB1cCBsZWZ0XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXRzIGNvcm5lciB1cCBsZWZ0Jyk7XHJcbiAgICAgICAgICAgIGNoZWNrUmlnaHQoKTtcclxuICAgICAgICAgICAgY2hlY2tEb3duKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25SaWdodCgpO1xyXG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhbHBoUGx1c09uZSA9PSB1bmRlZmluZWQgJiYgbnVtYk1pbnVzT25lIDwgMSl7IC8vIGNvcm5lciBib3R0b20gbGVmdFxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0cyBjb3JuZXIgYm90dG9tIGxlZnQnKTtcclxuICAgICAgICAgICAgY2hlY2tSaWdodCgpO1xyXG4gICAgICAgICAgICBjaGVja1VwKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ1VwUmlnaHQoKTtcclxuICAgICAgICAgICAgbWVyZ2VBcnJheSgpOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYWxwaE1pbnVzT25lID09IHVuZGVmaW5lZCAmJiBudW1iUGx1c09uZSA+IDEwKXsgLy8gY29ybmVyIHVwIHJpZ2h0IFxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0cyBjb3JuZXIgdXAgcmlnaHQnKTtcclxuICAgICAgICAgICAgY2hlY2tMZWZ0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrRG93bigpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdEb3duTGVmdCgpO1xyXG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhbHBoUGx1c09uZSA9PSB1bmRlZmluZWQgJiYgbnVtYlBsdXNPbmUgPiAxMCl7IC8vIGNvcm5lciBib3R0b20gcmlnaHRcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdHMgY29ybmVyIGJvdHRvbSByaWdodCcpO1xyXG4gICAgICAgICAgICBjaGVja0xlZnQoKTtcclxuICAgICAgICAgICAgY2hlY2tVcCgpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdVcExlZnQoKTtcclxuICAgICAgICAgICAgbWVyZ2VBcnJheSgpOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobnVtYk1pbnVzT25lIDwgMSl7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXQgbnVtYmVyID0gMCcpO1xyXG4gICAgICAgICAgICBjaGVja1JpZ2h0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrVXAoKTtcclxuICAgICAgICAgICAgY2hlY2tEb3duKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ1VwUmlnaHQoKTtcclxuICAgICAgICAgICAgY2hlY2tEaWFnRG93blJpZ2h0KCk7XHJcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYobnVtYlBsdXNPbmUgPiAxMCl7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXQgbnVtYmVyID4gMTAnKTtcclxuICAgICAgICAgICAgY2hlY2tMZWZ0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrVXAoKTtcclxuICAgICAgICAgICAgY2hlY2tEb3duKCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ1VwTGVmdCgpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdEb3duTGVmdCgpO1xyXG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhbHBoTWludXNPbmUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdHMgdW5kZWZpbmVkJyk7XHJcbiAgICAgICAgICAgIGNoZWNrTGVmdCgpO1xyXG4gICAgICAgICAgICBjaGVja1JpZ2h0KCk7XHJcbiAgICAgICAgICAgIGNoZWNrRG93bigpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdEb3duTGVmdCgpO1xyXG4gICAgICAgICAgICBjaGVja0RpYWdEb3duUmlnaHQoKTsgXHJcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFscGhQbHVzT25lID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXRzIHVuZGVmaW5lZCcpO1xyXG4gICAgICAgICAgICBjaGVja0xlZnQoKTtcclxuICAgICAgICAgICAgY2hlY2tSaWdodCgpO1xyXG4gICAgICAgICAgICBjaGVja1VwKCk7IFxyXG4gICAgICAgICAgICBjaGVja0RpYWdVcExlZnQoKTsgXHJcbiAgICAgICAgICAgIGNoZWNrRGlhZ1VwUmlnaHQoKTtcclxuICAgICAgICAgICAgbWVyZ2VBcnJheSgpO1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vIGhvcml6b250YWwgY2hlY2tcclxuICAgICAgICAgICAgICAgIGNoZWNrTGVmdCgpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tSaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gdmVydGljYWwgY2hlY2tcclxuICAgICAgICAgICAgICAgIGNoZWNrVXAoKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrRG93bigpO1xyXG4gICAgICAgICAgICAgICAgLy9kaWFnb25hbCBsZWZ0IGNoZWNrXHJcbiAgICAgICAgICAgICAgICBjaGVja0RpYWdVcExlZnQoKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25MZWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAvL2RpYWdvbmFsIHJpZ2h0IGNoZWNrXHJcbiAgICAgICAgICAgICAgICBjaGVja0RpYWdVcFJpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICBjaGVja0RpYWdEb3duUmlnaHQoKTtcclxuICAgICAgICAgICAgICAgIG1lcmdlQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcblxyXG4gICAgfSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhvdXRwdXRBcnJheSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHRBcnJheSk7XHJcbiAgICByZXR1cm4gcmVzdWx0QXJyYXlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcGxhY2VHYXAiLCJmdW5jdGlvbiBwbGFjZVJhbmRvbWl6ZXIobGVuZyl7XHJcbiAgICBjb25zdCBNQVhfR1JJRCA9IDEwOyAvLyBtYXhpbXVtIGdyaWQgbGVuZ3RoIGlzIDEweDEwXHJcbiAgICBjb25zdCByYW5kb21BeGlzID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7IC8vIG9ubHkgcmV0dXJuIDAvMVxyXG4gICAgY29uc3QgYXJyYXkgPSBbXTtcclxuICAgIGNvbnN0IGFscGhhYmV0ID0gXCJhYmNkZWZnaGlqXCI7XHJcbiAgICBjb25zdCByYW5kb21OdW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoTUFYX0dSSUQgLSBsZW5nKSkgKyAxOyAvLyB0aGlzIHJhbmRvbWl6ZXIgbnVtYmVyIGtlZXAgeW91IGZyb20gb3ZlcmZsb3dpbmcsIHBsdXMgb25lIHNvIGl0IHN0YXJ0IGZyb20gMSBub3QgMFxyXG4gICAgY29uc3QgcmFuZG9tQWxwID0gYWxwaGFiZXRbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYWxwaGFiZXQuc3Vic3RyaW5nKDAsKE1BWF9HUklEIC0gbGVuZykpLmxlbmd0aCldOyAvLyB0aGlzIHJhbmRvbWl6ZXIga2VlcHMgeW91IGZyb20gdmFsdWUgbW9yZSB0aGFuIGxlbmd0aFxyXG4gICAgbGV0IGFscGhhTnVtO1xyXG5cclxuICAgIGlmIChyYW5kb21BeGlzID09PSAwKXsgLy8gWCBheGlzIGJsb2Nrc1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDxsZW5nOyBpKysgKXtcclxuICAgICAgICAgICAgYWxwaGFOdW0gPSByYW5kb21BbHAuY29uY2F0KChyYW5kb21OdW1iZXIgKyBpKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgYXJyYXkucHVzaChhbHBoYU51bSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGFycmF5KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhyYW5kb21BeGlzKTtcclxuICAgICAgICByZXR1cm4gYXJyYXlcclxuICAgIH1cclxuICAgIGVsc2UgeyAvLyBZIGF4aXMgYmxvY2tzXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPGxlbmc7IGkrKyApe1xyXG4gICAgICAgICAgICBjb25zdCBhbHBMb29wID0gYWxwaGFiZXQuY2hhckF0KGFscGhhYmV0LmluZGV4T2YocmFuZG9tQWxwKSArIGkpO1xyXG4gICAgICAgICAgICBhbHBoYU51bSA9IGFscExvb3AuY29uY2F0KChyYW5kb21OdW1iZXIpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICBhcnJheS5wdXNoKGFscGhhTnVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYXJyYXkpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJhbmRvbUF4aXMpO1xyXG4gICAgICAgIHJldHVybiBhcnJheVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IHBsYWNlUmFuZG9taXplciIsImltcG9ydCB7IGdhbWUgfSBmcm9tIFwiLi9tYWluZ2FtZVwiO1xyXG5cclxuZnVuY3Rpb24gcG9wVXBHYW1lRW5kKCl7XHJcbiAgICBjb25zdCBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmQnKTtcclxuICAgIGNvbnN0IGxheWVyUG9wVXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IGxheWVyVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29uc3QgbGF5ZXJCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRleHQudGV4dENvbnRlbnQgPSAnQ29uZ3JhdHMgRm9yIFRoZSBXaW4nXHJcbiAgICBidG4udGV4dENvbnRlbnQgPSAnT0snO1xyXG4gICAgdGV4dC5pZCA9J3RleHRQb3BVcCc7XHJcbiAgICBidG4uaWQgPSAnYnRuUG9wVXAnO1xyXG4gICAgbGF5ZXJUZXh0LmNsYXNzTmFtZT0nbGF5ZXJUZXh0UG9wVXAnO1xyXG4gICAgbGF5ZXJCdG4uY2xhc3NOYW1lPSdsYXllckJ0blBvcFVwJztcclxuICAgIGxheWVyUG9wVXAuY2xhc3NOYW1lPSdsYXllclBvcFVwJztcclxuICAgIGxheWVyUG9wVXAuY2xhc3NMaXN0LmFkZCgnZGVhY3RpdmUnKTtcclxuXHJcbiAgICBsYXllclRleHQuYXBwZW5kKHRleHQpO1xyXG4gICAgbGF5ZXJCdG4uYXBwZW5kKGJ0bik7XHJcbiAgICBsYXllclBvcFVwLmFwcGVuZChsYXllclRleHQsIGxheWVyQnRuKTtcclxuICAgIGxheWVyLmFwcGVuZChsYXllclBvcFVwKTtcclxuXHJcbiAgICBidG4ub25jbGljayA9ICgpPT57XHJcbiAgICAgICAgbGF5ZXJQb3BVcC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICBsYXllclBvcFVwLmNsYXNzTGlzdC5hZGQoJ2RlYWN0aXZlJyk7XHJcbiAgICAgICAgZ2FtZS5yZXN0YXJ0R2FtZSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhY3RpdmU6ICgpPT4ge1xyXG4gICAgICAgICAgICBsYXllclBvcFVwLmNsYXNzTGlzdC5yZW1vdmUoJ2RlYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGxheWVyUG9wVXAuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIC8vIGxheWVyUG9wVXAuc3R5bGUub3BhY2l0eT0nMSc7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZWFjdGl2ZTogKCk9PiB7XHJcbiAgICAgICAgICAgIC8vIGxheWVyUG9wVXAuc3R5bGUub3BhY2l0eT0nMCc7XHJcbiAgICAgICAgICAgIGxheWVyUG9wVXAuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGxheWVyUG9wVXAuY2xhc3NMaXN0LmFkZCgnZGVhY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBvcFVwR2FtZUVuZCIsIlxyXG5jb25zdCBzaGlwcyA9IChjb29yZCkgPT57IC8vIGxlbmd0aCB3aWxsIGJlIGZyb20gc2l6ZSBvZiB0aGUgc2hpcFxyXG4gICAgLy8gbGV0IGNvb3JkID0gbG9jLnNwbGl0KCcsJyk7XHJcbiAgICBsZXQgaGVhbHRoQmFyID0gY29vcmQubGVuZ3RoO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBsZW5ndGg6ICgpPT57XHJcbiAgICAgICAgICAgIHJldHVybiBsZW4gXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoaXQ6IChsb2MpPT57XHJcbiAgICAgICAgICAgIC8vZ2V0IHRoZSBhdHRjayBoaXQgbG9jYXRpb25cclxuICAgICAgICAgICAgaWYgKGNvb3JkLmluY2x1ZGVzKGxvYykgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJhdHRhY2sgbWlzc2VkXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGNvb3JkLmluY2x1ZGVzKGxvYykgPT09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgY29vcmQgPSBjb29yZC5maWx0ZXIoICh2YWwpPT57XHJcbiAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsICE9PSBsb2NcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaGVhbHRoQmFyID0gaGVhbHRoQmFyIC0gMTtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpc1N1bms6ICgpPT57XHJcbiAgICAgICAgICAgIC8vY2hlY2sgdGhlIHNoaXAgaWYgc3Vua2VuIHlldFxyXG4gICAgICAgICAgICBpZihoZWFsdGhCYXIgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NoaXAgaXMgZGVzdHJveWVkJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIFxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzaGlwIGlzIHN0aWxsIGludGFjdCcpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgXHJcbiAgICAgICAgaGVhbHRoQmFyIDogKCk9PiB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJ0aGlzIHNoaXAgaGVhbHRoOiBcIiArIGhlYWx0aEJhcik7XHJcbiAgICAgICAgICAgIHJldHVybiBoZWFsdGhCYXJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxvY2F0aW9uOiAoKT0+e1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGNvb3JkKVxyXG4gICAgICAgICAgICByZXR1cm4gY29vcmRcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNoaXBzIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWluZ2FtZS5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==