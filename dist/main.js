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
                    _maingame_js__WEBPACK_IMPORTED_MODULE_0__.gameEnd.active(user);
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
        game.restartGame();
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
        active: (loser)=> {
            if (loser == 'AI'){
                text.textContent = 'Congrats For The Win Player One!'
            }
            else{
                text.textContent = 'You are Defeated by the AI!'
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHVEQUFnQjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWU7Ozs7Ozs7Ozs7Ozs7OztBQy9DZiwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWU7Ozs7OztVQzVDZjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY2xlYXJDaGlsZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZpbmRDb21tb25FbGVtZW50cy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2xheW91dEdyaWQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9sYXlvdXRHcmlkUGxhY2VkQ29sb3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tYWluZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21hcmtlZEF0dGFja01vdmUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGFjZUdhcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYWNlUmFuZG9taXplci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BvcFVwR2FtZUVuZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gY2xlYXJDaGlsZChwYXJlbnQpIHtcbiAgICBjb25zdCBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3BhcmVudH1gKVxuICAgIHdoaWxlIChsYXllci5maXJzdENoaWxkKSB7XG4gICAgICBsYXllci5yZW1vdmVDaGlsZChsYXllci5maXJzdENoaWxkKTtcbiAgICB9XG4gIH1cbiAgXG4gIGV4cG9ydCBkZWZhdWx0IGNsZWFyQ2hpbGQ7IiwiZnVuY3Rpb24gZmluZENvbW1vbkVsZW1lbnRzKGFycjEsIGFycjIpIHtcbiAgICByZXR1cm4gYXJyMS5zb21lKGl0ZW0gPT4gYXJyMi5pbmNsdWRlcyhpdGVtKSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgZmluZENvbW1vbkVsZW1lbnRzIiwiaW1wb3J0IHsgZ2FtZSwgZ2FtZUVuZCB9IGZyb20gXCIuL21haW5nYW1lLmpzXCI7XG5pbXBvcnQgeyBtYXJrZWRBdHRhY2ssIG1hcmtlZEhpdCB9IGZyb20gXCIuL21hcmtlZEF0dGFja01vdmUuanNcIjtcblxuY29uc3QgZ2FtZWJvYXJkID0gKCk9PiB7XG4gICAgbGV0IGFsbFNoaXAgPSBbXTtcbiAgICBsZXQgdG90YWxIZWFsdGggPSAwO1xuICAgIGxldCBhbGxMb2NhdGlvbiA9IFtdO1xuICAgIGxldCBhdHRhY2tNaXNzZWQgPSBbXTtcbiAgICBsZXQgYWxsR2FwTG9jYXRpb24gPSBbXTtcbiAgICBsZXQgYWxsUmVjZWl2ZWRBdHRhY2tMb2NhdGlvbiA9IFtdO1xuXG4gICAgZnVuY3Rpb24gcmVmcmVzaEFsbExvY2F0aW9uKCl7XG4gICAgICAgIGxldCBuZXdMb2NhdGlvbiA9IFtdO1xuICAgICAgICBhbGxTaGlwLmZvckVhY2goKHNoaXApPT57XG4gICAgICAgICAgICBuZXdMb2NhdGlvbiA9IG5ld0xvY2F0aW9uLmNvbmNhdChzaGlwLmxvY2F0aW9uKCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgYWxsTG9jYXRpb24gPSBuZXdMb2NhdGlvbjtcbiAgICB9XG4gICAgZnVuY3Rpb24gYXR0YWNrTWlzc2VkQ291bnRlcihjb29yKXtcbiAgICAgICAgYXR0YWNrTWlzc2VkLnB1c2goY29vcik7XG4gICAgfVxuXG4gICAgLy9jb25zb2xlLmxvZygnZ2FtZWJvYXJkIGlzIG9uJyk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGxhY2VtZW50OiAoc2hpcHMpPT57IC8vIGRvbnQgbmVlZCBjb29yIHNpbmNlIGNvb3JkaW5hdGUgc2hvdWxkIGJlIGluc2lkZSB0aGUgc2hpcCgpXG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgdGhlIGNvb3JkaW5hdGUgaXMgdmFsaWQsIHdoaWNoIG1lYW5zIGVtcHR5IGFuZCBvbmUgYmxvY2sgYXdheSBmcm9tIGFub3RoZXIgc2hpcFxuICAgICAgICAgICAgLy8gcGxhY2UgdGhlIHNoaXBzIG9uIHRoZSBjb29yZGluYXRlICAgICBcbiAgICAgICAgICAgIGFsbFNoaXAucHVzaChzaGlwcyk7XG4gICAgICAgICAgICBhbGxMb2NhdGlvbiA9IGFsbExvY2F0aW9uLmNvbmNhdChzaGlwcy5sb2NhdGlvbigpKTtcbiAgICAgICAgICAgIC8vIG1hcmtzIHRoZSBjb29yZGluYXRlIHdpdGggc2hpcHMnIG1hcmtzXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfSxcbiAgICAgICAgcmVjZWl2ZUF0dGFjazogKGNvb3IsIHVzZXIpPT57XG4gICAgICAgICAgICBjb25zdCBjb29yZCA9IGNvb3IudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGFsbFJlY2VpdmVkQXR0YWNrTG9jYXRpb24ucHVzaChjb29yZCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKGFsbExvY2F0aW9uLmluY2x1ZGVzKGNvb3JkKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBdHRhY2sgbWlzc2VkIHRvOicgKyB1c2VyKVxuICAgICAgICAgICAgICAgIGF0dGFja01pc3NlZENvdW50ZXIoY29vcmQpO1xuICAgICAgICAgICAgICAgIG1hcmtlZEF0dGFjayh1c2VyLCBjb29yZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFxuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBdHRhY2sgSGl0ISB0bzogJyArIHVzZXIpXG4gICAgICAgICAgICAgICAgYWxsU2hpcC5mb3JFYWNoKChzaGlwKT0+e1xuICAgICAgICAgICAgICAgICAgICBzaGlwLmhpdChjb29yZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gcmVmcmVzaCB0aGUgYWxsTG9jYXRpb24gQXJyYXkgc28geW91IGNhbm5vdCBoaXQgdHdpY2Ugb24gdGhlIHNhbWUgY29vcmRpbmF0ZVxuICAgICAgICAgICAgICAgIHJlZnJlc2hBbGxMb2NhdGlvbigpXG4gICAgICAgICAgICAgICAgaWYgKGFsbExvY2F0aW9uLmxlbmd0aCA8IDEpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQUxMIFNISVBTIEhBUyBCRUVOIERFU1RST1lFRCwgUklQIFRPOiAnICsgdXNlcik7XG4gICAgICAgICAgICAgICAgICAgIGdhbWVFbmQuYWN0aXZlKHVzZXIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1hcmtlZEhpdCh1c2VyLCBjb29yZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGFsbExvY2F0aW9uKTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH0sXG4gICAgICAgIGFsbFJlY2VpdmVkQXR0YWNrTG9jYXRpb24sXG4gICAgICAgIGNoZWNrVG90YWxIZWFsdGg6ICgpPT57XG4gICAgICAgICAgICByZWZyZXNoQWxsTG9jYXRpb24oKTtcbiAgICAgICAgICAgIHRvdGFsSGVhbHRoID0gYWxsTG9jYXRpb24ubGVuZ3RoO1xuICAgICAgICAgICAgLy8gaWYgYWxsIHRoZSBoZWFsdGhiYXIgaXMgMCB0aGVuIHRoZSBnYW1lIGlzIGVuZGVkXG4gICAgICAgICAgICBpZih0b3RhbEhlYWx0aCA8PSAwKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdBTUUgT1ZFUiBBTEwgT0YgWU9VUiBTSElQUyBXUkVDS0VEXCIpO1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gXG4gICAgICAgICAgICB9IFxuICAgICAgICB9LFxuICAgICAgICBhbGxMb2NhdGlvbjogKCk9PntcbiAgICAgICAgICAgIHJlZnJlc2hBbGxMb2NhdGlvbigpO1xuICAgICAgICAgICAgcmV0dXJuIGFsbExvY2F0aW9uXG4gICAgICAgIH0sXG4gICAgICAgIGNoZWNrQWxsTG9jYXRpb246KCk9PntcbiAgICAgICAgICAgIHJlZnJlc2hBbGxMb2NhdGlvbigpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYWxsTG9jYXRpb24pO1xuICAgICAgICAgICAgcmV0dXJuIGFsbExvY2F0aW9uXG4gICAgICAgIH0sXG4gICAgICAgIGRlbGV0ZUFsbFNoaXA6ICgpPT4ge1xuICAgICAgICAgICAgYWxsU2hpcC5sZW5ndGggPSAwO1xuICAgICAgICAgICAgdG90YWxIZWFsdGggPSAwO1xuICAgICAgICAgICAgYWxsTG9jYXRpb24ubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIGF0dGFja01pc3NlZC5sZW5ndGg9MDtcbiAgICAgICAgICAgIGFsbEdhcExvY2F0aW9uLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICBhbGxSZWNlaXZlZEF0dGFja0xvY2F0aW9uLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICByZWZyZXNoQWxsTG9jYXRpb24oKTtcbiAgICAgICAgfSxcbiAgICAgICAgYWRkR2FwTG9jYXRpb246IChhcnJheSk9PiB7XG4gICAgICAgICAgICAvLyBnYXBMb2NhdGlvbi5wdXNoKGFycmF5KTtcbiAgICAgICAgICAgIGFycmF5LmZvckVhY2goKGFycik9PntcbiAgICAgICAgICAgICAgICBhbGxHYXBMb2NhdGlvbi5wdXNoKGFycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgXG4gICAgICAgIGNoZWNrR2FwTG9jYXRpb246ICgpPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYWxsR2FwTG9jYXRpb24pO1xuICAgICAgICAgICAgcmV0dXJuIGFsbEdhcExvY2F0aW9uXG4gICAgICAgIH0sXG4gICAgICAgIGNoZWNrQXR0YWNrTWlzc2VkOiAoKT0+e1xuICAgICAgICAgICAgY29uc29sZS5sb2coYXR0YWNrTWlzc2VkKTtcbiAgICAgICAgICAgIHJldHVybiBhdHRhY2tNaXNzZWRcbiAgICAgICAgfSxcbiAgICAgICAgYWxsR2FwTG9jYXRpb25cbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBnYW1lYm9hcmQ7IiwiXG5mdW5jdGlvbiBjcmVhdGVHcmlkKHdob3Mpe1xuICAgIGNvbnN0IGxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7d2hvc31HYW1lYm9hcmRgKTtcbiAgICBjb25zdCBNQVhfV0lEVEggPSAxMDtcbiAgICBjb25zdCBhbHBoYWJldCA9ICdhYmNkZWZnaGlqJztcbiAgICBjb25zdCBhbHBoQXJyYXkgPSBhbHBoYWJldC5zcGxpdCgnJyk7XG5cbiAgICBhbHBoQXJyYXkuZm9yRWFjaCgoYWxwKT0+e1xuICAgICAgICBmb3IgKGxldCBpPTE7IGkgPD0gTUFYX1dJRFRIOyBpKysgKXtcbiAgICAgICAgICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGdyaWQuY2xhc3NOYW1lPWAke2FscH0ke2l9YDtcbiAgICAgICAgICAgIGxheWVyLmFwcGVuZChncmlkKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlR3JpZCIsImZ1bmN0aW9uIGxheW91dEdyaWRQbGFjZWRDb2xvcihnYW1lYm9hcmQsIHVzZXIpe1xuICAgIGxldCBjdXJyZW50R2FwID0gZ2FtZWJvYXJkLmFsbEdhcExvY2F0aW9uO1xuICAgIGxldCBjdXJyZW50U2hpcCA9IGdhbWVib2FyZC5hbGxMb2NhdGlvbigpO1xuICAgIGlmIChjdXJyZW50R2FwLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXQgYXJyYXkgZ2FwbG9jYXRpb24gZW1wdHknKVxuICAgICAgICBjb25zdCBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3VzZXJ9R2FtZWJvYXJkYCk7XG4gICAgICAgIGNvbnN0IGdhcCA9IGxheWVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2RpdicpO1xuICAgICAgICAgICAgZ2FwLmZvckVhY2goKGcpPT57XG4gICAgICAgICAgICAgICAgZy5jbGFzc0xpc3QucmVtb3ZlKCdnYXAnKTtcbiAgICAgICAgICAgICAgICBnLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY3VycmVudEdhcC5mb3JFYWNoKChhcnJheUxvYyk9PntcbiAgICAgICAgICAgIGNvbnN0IGxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7dXNlcn1HYW1lYm9hcmRgKTtcbiAgICAgICAgICAgIGxldCBnYXAgPSBsYXllci5xdWVyeVNlbGVjdG9yKGAuJHthcnJheUxvY31gKTtcbiAgICAgICAgICAgIGdhcC5jbGFzc0xpc3QuYWRkKCdnYXAnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGN1cnJlbnRTaGlwLmZvckVhY2goKGN1cnNoaXApPT57XG4gICAgICAgICAgICBjb25zdCBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3VzZXJ9R2FtZWJvYXJkYCk7XG4gICAgICAgICAgICBsZXQgc2hpcCA9IGxheWVyLnF1ZXJ5U2VsZWN0b3IoYC4ke2N1cnNoaXB9YCk7XG4gICAgICAgICAgICBzaGlwLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBsYXlvdXRHcmlkUGxhY2VkQ29sb3IiLCJpbXBvcnQgZ2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZC5qc1wiXG5pbXBvcnQgc2hpcHMgZnJvbSBcIi4vc2hpcHMuanNcIjtcbmltcG9ydCBwbGFjZVJhbmRvbWl6ZXIgZnJvbSBcIi4vcGxhY2VSYW5kb21pemVyLmpzXCI7XG5pbXBvcnQgZmluZENvbW1vbkVsZW1lbnRzIGZyb20gXCIuL2ZpbmRDb21tb25FbGVtZW50cy5qc1wiO1xuaW1wb3J0IHBsYWNlR2FwIGZyb20gXCIuL3BsYWNlR2FwLmpzXCI7XG5pbXBvcnQgY3JlYXRlR3JpZCBmcm9tIFwiLi9sYXlvdXRHcmlkLmpzXCI7XG5pbXBvcnQgbGF5b3V0R3JpZFBsYWNlZENvbG9yIGZyb20gXCIuL2xheW91dEdyaWRQbGFjZWRDb2xvci5qc1wiO1xuaW1wb3J0IGNsZWFyQ2hpbGQgZnJvbSBcIi4vY2xlYXJDaGlsZC5qc1wiO1xuaW1wb3J0IHBvcFVwR2FtZUVuZCBmcm9tIFwiLi9wb3BVcEdhbWVFbmQuanNcIjtcblxuY3JlYXRlR3JpZCgnQUknKTtcbmNyZWF0ZUdyaWQoJ3BsYXllcicpO1xuY29uc3QgcGxheWVyR2FtZWJvYXJkID0gZ2FtZWJvYXJkKCk7XG5jb25zdCBBSUdhbWVib2FyZCA9IGdhbWVib2FyZCgpO1xuY29uc3QgZ2FtZSA9IHN0YXJ0R2FtZSgpO1xuY29uc3QgZ2FtZUVuZCA9IHBvcFVwR2FtZUVuZCgpO1xuXG5mdW5jdGlvbiBzdGFydEdhbWUoKXtcbiAgICBmdW5jdGlvbiByYW5kb21QbGFjZW1lbnQoYm9hcmQsIHZhbCl7IC8vIHlvdSBjYW4gdXNlIHRoaXMgcmFuZG9tUGxhY2VtZW50IHdpdGggQUkgb3IgUGxheWVyXG4gICAgICAgIGxldCBuZXdTaGlwQ29vcmQgPSBwbGFjZVJhbmRvbWl6ZXIodmFsKTtcbiAgICAgICAgbGV0IG5ld1NoaXBXaXRoR2FwID0gcGxhY2VHYXAobmV3U2hpcENvb3JkKTtcblxuICAgICAgICBmdW5jdGlvbiByZVJhbmRvbWl6ZVdpdGhHYXAoKXtcbiAgICAgICAgICAgIG5ld1NoaXBDb29yZCA9IHBsYWNlUmFuZG9taXplcih2YWwpO1xuICAgICAgICAgICAgbmV3U2hpcFdpdGhHYXAgPSBwbGFjZUdhcChuZXdTaGlwQ29vcmQpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tBbmRBZGRFbGVtZW50cyhuZXdlc3QsIGN1cnJlbnQsIHZhbCl7XG4gICAgICAgICAgICBpZiAoZmluZENvbW1vbkVsZW1lbnRzKG5ld2VzdCwgY3VycmVudCkgPT09IGZhbHNlKXsgLy8gaWYgdGhlcmUgSVMgTk9UIGNvbW1vbiBlbGVtZW50cyBpbnNpZGUgb2YgYm90aCBhcnJheSAobm90IGNsYXNoZWQpLCBwcm9jZWVkIHRvIGFkZCB0byBnYW1lYm9hcmRcbiAgICAgICAgICAgICAgICBib2FyZC5wbGFjZW1lbnQoc2hpcHMobmV3U2hpcENvb3JkKSk7XG4gICAgICAgICAgICAgICAgYm9hcmQuYWRkR2FwTG9jYXRpb24ocGxhY2VHYXAobmV3U2hpcENvb3JkKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHsgLy8gaWYgdGhlcmUgSVMgY29tbW9uIGVsZW1lbnQgaW5zaWRlIGJvdGggYXJyYXksIHJhbmRvbWl6ZSB0aGUgc2hpcCBwbGFjZW1lbnQgYWdhaW4sIHRoZW4gcmVwZWF0IHRoaXMgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICByZVJhbmRvbWl6ZVdpdGhHYXAoKTtcbiAgICAgICAgICAgICAgICBjaGVja0FuZEFkZEVsZW1lbnRzKG5ld1NoaXBDb29yZCwgYm9hcmQuYWxsR2FwTG9jYXRpb24sIHZhbCk7IC8vIHJlcGVhdCB0aGlzIGZ1bmN0aW9uIGFnYWluXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3RhcnRzIGhlcmVcbiAgICAgICAgY2hlY2tBbmRBZGRFbGVtZW50cyhuZXdTaGlwV2l0aEdhcCwgYm9hcmQuYWxsR2FwTG9jYXRpb24sIHZhbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmFuZG9tQXR0YWNrKGJvYXJkLCB1c2VyKXtcbiAgICAgICAgbGV0IG5ld0F0dGFja0Nvb3JkID0gcGxhY2VSYW5kb21pemVyKDEpOyAvLyBvbmx5IG9uZSBncmlkIHBlciBhdHRhY2sgYWxsb3dlZFxuICAgICAgICBcbiAgICAgICAgZnVuY3Rpb24gcmVOZXdBdHRhY2soKXtcbiAgICAgICAgICAgIG5ld0F0dGFja0Nvb3JkID0gcGxhY2VSYW5kb21pemVyKDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tSZXBlYXRlZEF0dGFjayhuZXdlc3QsIGN1cnJlbnQsIHVzZXIpe1xuICAgICAgICAgICAgaWYgKCFjdXJyZW50KXtcbiAgICAgICAgICAgICAgICBib2FyZC5yZWNlaXZlQXR0YWNrKG5ld0F0dGFja0Nvb3JkLCB1c2VyKTtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGZpbmRDb21tb25FbGVtZW50cyhuZXdlc3QsIGN1cnJlbnQpID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgYm9hcmQucmVjZWl2ZUF0dGFjayhuZXdBdHRhY2tDb29yZCwgdXNlcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZU5ld0F0dGFjaygpO1xuICAgICAgICAgICAgICAgIGNoZWNrUmVwZWF0ZWRBdHRhY2sobmV3QXR0YWNrQ29vcmQsIGJvYXJkLmFsbFJlY2VpdmVkQXR0YWNrTG9jYXRpb24sIHVzZXIpO1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNoZWNrUmVwZWF0ZWRBdHRhY2sobmV3QXR0YWNrQ29vcmQsIGJvYXJkLmFsbFJlY2VpdmVkQXR0YWNrTG9jYXRpb24sIHVzZXIpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRTaGlwUmFuZG9tKGJvYXJkKXtcbiAgICAgICAgLy8gcGxhY2UgdGhlIGJvYXJkIHlvdSB1c2UgYW5kIHRoZSBsZW5ndGggb2Ygc2hpcCwgdGhlbiByYW5kb21QbGFjZW1lbnQoKSB3aWxsIHBsYWNlIGl0IHJhbmRvbWx5IGluY2x1ZGluZyBnYXAgYmV0d2VlbiBzaGlwc1xuICAgICAgICByYW5kb21QbGFjZW1lbnQoYm9hcmQsNSk7IFxuICAgICAgICByYW5kb21QbGFjZW1lbnQoYm9hcmQsNCk7XG4gICAgICAgIHJhbmRvbVBsYWNlbWVudChib2FyZCwzKTtcbiAgICAgICAgcmFuZG9tUGxhY2VtZW50KGJvYXJkLDMpO1xuICAgICAgICByYW5kb21QbGFjZW1lbnQoYm9hcmQsMik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlc2V0R2FtZWJvYXJkKCl7XG4gICAgICAgIEFJR2FtZWJvYXJkLmRlbGV0ZUFsbFNoaXAoKTtcbiAgICAgICAgcGxheWVyR2FtZWJvYXJkLmRlbGV0ZUFsbFNoaXAoKTtcbiAgICAgICAgY2xlYXJDaGlsZCgnQUlHYW1lYm9hcmQnKTtcbiAgICAgICAgY2xlYXJDaGlsZCgncGxheWVyR2FtZWJvYXJkJyk7XG4gICAgICAgIGNyZWF0ZUdyaWQoJ0FJJyk7XG4gICAgICAgIGNyZWF0ZUdyaWQoJ3BsYXllcicpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhdHRhY2tNb2RlKHVzZXIpe1xuICAgICAgICBjb25zdCBnYW1lbGF5b3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7dXNlcn1HYW1lYm9hcmRgKTsgLy8gc3RpbGwgYnJva2UgZXZlcnkgYXR0YWNrIG1vZGUgaXMgaW5pdGlhdGVkIG92ZXIyIGFnYWluIHNvLCA0eCBzdGFydCBnYW1lID0gNHggYXR0YWNrbW9kZSgpXG4gICAgICAgIGNvbnN0IGFsbEdyaWQgPSBnYW1lbGF5b3V0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2RpdicpO1xuICAgICAgICBhbGxHcmlkLmZvckVhY2goKGdyaWQpPT57XG4gICAgICAgICAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcbiAgICAgICAgICAgICAgICBpZihncmlkLmNsYXNzTGlzdC5jb250YWlucygnYXR0YWNrZWQnKSB8fCBncmlkLmNsYXNzTGlzdC5jb250YWlucygnaGl0Jykpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgaWYoQUlHYW1lYm9hcmQuYWxsTG9jYXRpb24oKS5sZW5ndGggPCAxIHx8IHBsYXllckdhbWVib2FyZC5hbGxMb2NhdGlvbigpLmxlbmd0aCA8IDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2FtZUVuZC5hY3RpdmUoKTsgLy8gdGVsYXQgbmloLCBhIGJpdCB0b28gbGF0ZSwgbmVlZCBhbm90aGVyIGNsaWNrIGJlZm9yZSBpbml0aWF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2FtZS5yZXN0YXJ0R2FtZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC8vIEdBTUUgRU5EXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihBSUdhbWVib2FyZC5hbGxMb2NhdGlvbigpLmxlbmd0aCA+IDEgfHwgcGxheWVyR2FtZWJvYXJkLmFsbExvY2F0aW9uKCkubGVuZ3RoID4gMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBBSUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGdyaWQuY2xhc3NOYW1lLCAnQUknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFJR2FtZWJvYXJkLmNoZWNrVG90YWxIZWFsdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbUF0dGFjayhwbGF5ZXJHYW1lYm9hcmQsICdwbGF5ZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXJ0VnNBSTogKCk9PntcbiAgICAgICAgICAgIHJlc2V0R2FtZWJvYXJkKCk7XG4gICAgICAgICAgICBhdHRhY2tNb2RlKCdBSScpO1xuICAgICAgICAgICAgc2V0U2hpcFJhbmRvbShBSUdhbWVib2FyZCk7XG4gICAgICAgICAgICBzZXRTaGlwUmFuZG9tKHBsYXllckdhbWVib2FyZCk7XG4gICAgICAgICAgICBsYXlvdXRHcmlkUGxhY2VkQ29sb3IocGxheWVyR2FtZWJvYXJkLCAncGxheWVyJyk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlc3RhcnRHYW1lOiAoKT0+IHtcbiAgICAgICAgICAgIHJlc2V0R2FtZWJvYXJkKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHN0YXJ0R2FtZUJ0bigpe1xuICAgIGNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXJ0R2FtZUJ0bicpO1xuICAgIGNvbnN0IHJlc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdGFydEJ0bicpO1xuICAgIGNvbnN0IHJhbmRvbVBsYWNlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JhbmRvbVBsYWNlQnRuJyk7XG5cbiAgICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XG4gICAgICAgIGNvbnNvbGUubG9nKCdQbGF5IHRoZSBnYW1lIScpO1xuICAgICAgICBnYW1lLnN0YXJ0VnNBSSgpO1xuICAgIH0pO1xuICAgIHJlc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xuICAgICAgICBjb25zb2xlLmxvZygncmVzdGFydGVkJyk7XG4gICAgICAgIGdhbWUucmVzdGFydEdhbWUoKTtcbiAgICB9KTtcbiAgICByYW5kb21QbGFjZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XG4gICAgICAgIGNvbnNvbGUubG9nKCdyYW5kb21pemUnKTtcbiAgICAgICAgZ2FtZUVuZC5hY3RpdmUoKTtcbiAgICAgICAgLy8gcG9wVXBHYW1lRW5kKCkuYWN0aXZlKCk7XG4gICAgfSk7XG59XG5cbnN0YXJ0R2FtZUJ0bigpXG5cbmNvbnNvbGUubG9nKCdHYW1lIFJlYWR5Jyk7XG5leHBvcnQge3BsYXllckdhbWVib2FyZCwgQUlHYW1lYm9hcmQsIGdhbWUsIGdhbWVFbmR9IiwiZnVuY3Rpb24gbWFya2VkQXR0YWNrKHVzZXIsIGNsYXNzTmFtZSl7XG4gICAgICAgIGNvbnN0IGdhbWVsYXlvdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt1c2VyfUdhbWVib2FyZGApO1xuICAgICAgICBjb25zdCBncmlkID0gZ2FtZWxheW91dC5xdWVyeVNlbGVjdG9yKGAuJHtjbGFzc05hbWV9YCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGdyaWQpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjbGFzc05hbWUpO1xuICAgICAgICBncmlkLmNsYXNzTGlzdC5hZGQoJ2F0dGFja2VkJyk7XG4gICAgICAgIHJldHVyblxufVxuZnVuY3Rpb24gbWFya2VkSGl0KHVzZXIsIGNsYXNzTmFtZSl7XG4gICAgICAgIGNvbnN0IGdhbWVsYXlvdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt1c2VyfUdhbWVib2FyZGApO1xuICAgICAgICBjb25zdCBncmlkID0gZ2FtZWxheW91dC5xdWVyeVNlbGVjdG9yKGAuJHtjbGFzc05hbWV9YCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNsYXNzTmFtZSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGdyaWQpO1xuICAgICAgICBncmlkLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgICByZXR1cm5cbn1cblxuZnVuY3Rpb24gcmVzZXRNYXJrZWRBdHRhY2sodXNlcil7XG4gICAgICAgIGNvbnN0IGdhbWVsYXlvdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt1c2VyfUdhbWVib2FyZGApO1xuICAgICAgICBjb25zdCBhbGxHcmlkID0gZ2FtZWxheW91dC5xdWVyeVNlbGVjdG9yQWxsKGBkaXZgKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY2xhc3NOYW1lKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZ3JpZCk7XG4gICAgICAgIGFsbEdyaWQuZm9yRWFjaCgoZ3JpZCk9PntcbiAgICAgICAgICAgICAgICBncmlkLmNsYXNzTGlzdC5yZW1vdmUoJ2hpdCcpO1xuICAgICAgICAgICAgICAgIGdyaWQuY2xhc3NMaXN0LnJlbW92ZSgnYXR0YWNrZWQnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVyblxufVxuZXhwb3J0IHttYXJrZWRBdHRhY2ssIG1hcmtlZEhpdCwgcmVzZXRNYXJrZWRBdHRhY2t9IiwiLy8gc2V0IGdhcCBieSBvbmUgYnkgb25lIGxvb3AgY2hlY2tcblxuZnVuY3Rpb24gcGxhY2VHYXAobWFpbkFycmF5KXtcbiAgICBsZXQgb3V0cHV0QXJyYXkgPSBbXTtcbiAgICBsZXQgcmVzdWx0QXJyYXkgPSBbXTtcbiAgICBjb25zdCBudW1iZXJQYXR0ID0gL1swLTldL2c7XG4gICAgY29uc3QgYWxwaGFQYXR0ID0gL1thLXpBLVpdL2c7XG4gICAgY29uc3QgYWxwaGFiZXRNYXggPSAnYWJjZGVmZ2hpaic7XG4gICAgY29uc3QgYWxwQXJyYXkgPSBhbHBoYWJldE1heC5zcGxpdCgnJyk7XG4gICAgbWFpbkFycmF5LmZvckVhY2goKHZhbCk9PntcbiAgICAgICAgY29uc3QgbnVtYiA9IHBhcnNlSW50KHZhbC5tYXRjaChudW1iZXJQYXR0KS5qb2luKCcnKSk7XG4gICAgICAgIGNvbnN0IGFscGggPSB2YWwubWF0Y2goYWxwaGFQYXR0KS5qb2luKCcnKTtcbiAgICAgICAgY29uc3QgbnVtYk1pbnVzT25lID0gbnVtYiAtIDE7XG4gICAgICAgIGNvbnN0IG51bWJQbHVzT25lID0gbnVtYiArIDE7XG4gICAgICAgIGNvbnN0IGFscGhQbHVzT25lID0gYWxwQXJyYXlbKGFscEFycmF5LmluZGV4T2YoYWxwaCkpKzFdO1xuICAgICAgICBjb25zdCBhbHBoTWludXNPbmUgPSBhbHBBcnJheVsoYWxwQXJyYXkuaW5kZXhPZihhbHBoKSktMV07XG4gICAgICAgIFxuICAgICAgICBmdW5jdGlvbiBtZXJnZUFycmF5KCl7XG4gICAgICAgICAgICAgIC8vIG1lcmdlIHRoZSBhcnJheVxuICAgICAgICAgICAgcmVzdWx0QXJyYXkgPSByZXN1bHRBcnJheS5jb25jYXQob3V0cHV0QXJyYXkpO1xuICAgICAgICAgICAgcmVzdWx0QXJyYXkgPSBbLi4ubmV3IFNldCAoWy4uLm1haW5BcnJheSwuLi5vdXRwdXRBcnJheV0pXTsgIFxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrUmlnaHQoKXtcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaC5jb25jYXQoKG51bWJQbHVzT25lKS50b1N0cmluZygpKSk7IC8vIHJpZ2h0XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tMZWZ0KCl7XG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKGFscGguY29uY2F0KChudW1iTWludXNPbmUpLnRvU3RyaW5nKCkpKTsgLy8gbGVmdFxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrVXAoKXtcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaE1pbnVzT25lLmNvbmNhdCgobnVtYikudG9TdHJpbmcoKSkpOyAvLyB1cFxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrRG93bigpe1xuICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaChhbHBoUGx1c09uZS5jb25jYXQoKG51bWIpLnRvU3RyaW5nKCkpKTsgLy8gZG93blxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrRGlhZ1VwUmlnaHQoKXtcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaE1pbnVzT25lLmNvbmNhdCgobnVtYlBsdXNPbmUpLnRvU3RyaW5nKCkpKTsgLy8gdXAgcmlnaHRcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBjaGVja0RpYWdEb3duUmlnaHQoKXtcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaFBsdXNPbmUuY29uY2F0KChudW1iUGx1c09uZSkudG9TdHJpbmcoKSkpOyAvLyBkb3duIHJpZ2h0XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tEaWFnVXBMZWZ0KCl7XG4gICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKGFscGhNaW51c09uZS5jb25jYXQoKG51bWJNaW51c09uZSkudG9TdHJpbmcoKSkpOyAvLyB1cCBsZWZ0XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tEaWFnRG93bkxlZnQoKXtcbiAgICAgICAgICAgIG91dHB1dEFycmF5LnB1c2goYWxwaFBsdXNPbmUuY29uY2F0KChudW1iTWludXNPbmUpLnRvU3RyaW5nKCkpKTsgLy8gZG93biBsZWZ0XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFscGhNaW51c09uZSA9PSB1bmRlZmluZWQgJiYgbnVtYk1pbnVzT25lIDwgMSl7IC8vIGNvcm5lciB1cCBsZWZ0XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0cyBjb3JuZXIgdXAgbGVmdCcpO1xuICAgICAgICAgICAgY2hlY2tSaWdodCgpO1xuICAgICAgICAgICAgY2hlY2tEb3duKCk7XG4gICAgICAgICAgICBjaGVja0RpYWdEb3duUmlnaHQoKTtcbiAgICAgICAgICAgIG1lcmdlQXJyYXkoKTsgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYWxwaFBsdXNPbmUgPT0gdW5kZWZpbmVkICYmIG51bWJNaW51c09uZSA8IDEpeyAvLyBjb3JuZXIgYm90dG9tIGxlZnRcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXRzIGNvcm5lciBib3R0b20gbGVmdCcpO1xuICAgICAgICAgICAgY2hlY2tSaWdodCgpO1xuICAgICAgICAgICAgY2hlY2tVcCgpO1xuICAgICAgICAgICAgY2hlY2tEaWFnVXBSaWdodCgpO1xuICAgICAgICAgICAgbWVyZ2VBcnJheSgpOyBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhbHBoTWludXNPbmUgPT0gdW5kZWZpbmVkICYmIG51bWJQbHVzT25lID4gMTApeyAvLyBjb3JuZXIgdXAgcmlnaHQgXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGl0cyBjb3JuZXIgdXAgcmlnaHQnKTtcbiAgICAgICAgICAgIGNoZWNrTGVmdCgpO1xuICAgICAgICAgICAgY2hlY2tEb3duKCk7XG4gICAgICAgICAgICBjaGVja0RpYWdEb3duTGVmdCgpO1xuICAgICAgICAgICAgbWVyZ2VBcnJheSgpOyBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhbHBoUGx1c09uZSA9PSB1bmRlZmluZWQgJiYgbnVtYlBsdXNPbmUgPiAxMCl7IC8vIGNvcm5lciBib3R0b20gcmlnaHRcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXRzIGNvcm5lciBib3R0b20gcmlnaHQnKTtcbiAgICAgICAgICAgIGNoZWNrTGVmdCgpO1xuICAgICAgICAgICAgY2hlY2tVcCgpO1xuICAgICAgICAgICAgY2hlY2tEaWFnVXBMZWZ0KCk7XG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7IFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG51bWJNaW51c09uZSA8IDEpe1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdCBudW1iZXIgPSAwJyk7XG4gICAgICAgICAgICBjaGVja1JpZ2h0KCk7XG4gICAgICAgICAgICBjaGVja1VwKCk7XG4gICAgICAgICAgICBjaGVja0Rvd24oKTtcbiAgICAgICAgICAgIGNoZWNrRGlhZ1VwUmlnaHQoKTtcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25SaWdodCgpO1xuICAgICAgICAgICAgbWVyZ2VBcnJheSgpO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihudW1iUGx1c09uZSA+IDEwKXtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXQgbnVtYmVyID4gMTAnKTtcbiAgICAgICAgICAgIGNoZWNrTGVmdCgpO1xuICAgICAgICAgICAgY2hlY2tVcCgpO1xuICAgICAgICAgICAgY2hlY2tEb3duKCk7XG4gICAgICAgICAgICBjaGVja0RpYWdVcExlZnQoKTtcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25MZWZ0KCk7XG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhbHBoTWludXNPbmUgPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXRzIHVuZGVmaW5lZCcpO1xuICAgICAgICAgICAgY2hlY2tMZWZ0KCk7XG4gICAgICAgICAgICBjaGVja1JpZ2h0KCk7XG4gICAgICAgICAgICBjaGVja0Rvd24oKTtcbiAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25MZWZ0KCk7XG4gICAgICAgICAgICBjaGVja0RpYWdEb3duUmlnaHQoKTsgXG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhbHBoUGx1c09uZSA9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hpdHMgdW5kZWZpbmVkJyk7XG4gICAgICAgICAgICBjaGVja0xlZnQoKTtcbiAgICAgICAgICAgIGNoZWNrUmlnaHQoKTtcbiAgICAgICAgICAgIGNoZWNrVXAoKTsgXG4gICAgICAgICAgICBjaGVja0RpYWdVcExlZnQoKTsgXG4gICAgICAgICAgICBjaGVja0RpYWdVcFJpZ2h0KCk7XG4gICAgICAgICAgICBtZXJnZUFycmF5KCk7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8vIGhvcml6b250YWwgY2hlY2tcbiAgICAgICAgICAgICAgICBjaGVja0xlZnQoKTtcbiAgICAgICAgICAgICAgICBjaGVja1JpZ2h0KCk7XG4gICAgICAgICAgICAgICAgLy8gdmVydGljYWwgY2hlY2tcbiAgICAgICAgICAgICAgICBjaGVja1VwKCk7XG4gICAgICAgICAgICAgICAgY2hlY2tEb3duKCk7XG4gICAgICAgICAgICAgICAgLy9kaWFnb25hbCBsZWZ0IGNoZWNrXG4gICAgICAgICAgICAgICAgY2hlY2tEaWFnVXBMZWZ0KCk7XG4gICAgICAgICAgICAgICAgY2hlY2tEaWFnRG93bkxlZnQoKTtcbiAgICAgICAgICAgICAgICAvL2RpYWdvbmFsIHJpZ2h0IGNoZWNrXG4gICAgICAgICAgICAgICAgY2hlY2tEaWFnVXBSaWdodCgpO1xuICAgICAgICAgICAgICAgIGNoZWNrRGlhZ0Rvd25SaWdodCgpO1xuICAgICAgICAgICAgICAgIG1lcmdlQXJyYXkoKTtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIFxuXG4gICAgfSk7XG4gICAgLy8gY29uc29sZS5sb2cob3V0cHV0QXJyYXkpO1xuICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdEFycmF5KTtcbiAgICByZXR1cm4gcmVzdWx0QXJyYXlcbn1cblxuZXhwb3J0IGRlZmF1bHQgcGxhY2VHYXAiLCJmdW5jdGlvbiBwbGFjZVJhbmRvbWl6ZXIobGVuZyl7XG4gICAgY29uc3QgTUFYX0dSSUQgPSAxMDsgLy8gbWF4aW11bSBncmlkIGxlbmd0aCBpcyAxMHgxMFxuICAgIGNvbnN0IHJhbmRvbUF4aXMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTsgLy8gb25seSByZXR1cm4gMC8xXG4gICAgY29uc3QgYXJyYXkgPSBbXTtcbiAgICBjb25zdCBhbHBoYWJldCA9IFwiYWJjZGVmZ2hpalwiO1xuICAgIGNvbnN0IHJhbmRvbU51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChNQVhfR1JJRCAtIGxlbmcpKSArIDE7IC8vIHRoaXMgcmFuZG9taXplciBudW1iZXIga2VlcCB5b3UgZnJvbSBvdmVyZmxvd2luZywgcGx1cyBvbmUgc28gaXQgc3RhcnQgZnJvbSAxIG5vdCAwXG4gICAgY29uc3QgcmFuZG9tQWxwID0gYWxwaGFiZXRbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYWxwaGFiZXQuc3Vic3RyaW5nKDAsKE1BWF9HUklEIC0gbGVuZykpLmxlbmd0aCldOyAvLyB0aGlzIHJhbmRvbWl6ZXIga2VlcHMgeW91IGZyb20gdmFsdWUgbW9yZSB0aGFuIGxlbmd0aFxuICAgIGxldCBhbHBoYU51bTtcblxuICAgIGlmIChyYW5kb21BeGlzID09PSAwKXsgLy8gWCBheGlzIGJsb2Nrc1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8bGVuZzsgaSsrICl7XG4gICAgICAgICAgICBhbHBoYU51bSA9IHJhbmRvbUFscC5jb25jYXQoKHJhbmRvbU51bWJlciArIGkpLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgYXJyYXkucHVzaChhbHBoYU51bSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coYXJyYXkpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhyYW5kb21BeGlzKTtcbiAgICAgICAgcmV0dXJuIGFycmF5XG4gICAgfVxuICAgIGVsc2UgeyAvLyBZIGF4aXMgYmxvY2tzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDxsZW5nOyBpKysgKXtcbiAgICAgICAgICAgIGNvbnN0IGFscExvb3AgPSBhbHBoYWJldC5jaGFyQXQoYWxwaGFiZXQuaW5kZXhPZihyYW5kb21BbHApICsgaSk7XG4gICAgICAgICAgICBhbHBoYU51bSA9IGFscExvb3AuY29uY2F0KChyYW5kb21OdW1iZXIpLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgYXJyYXkucHVzaChhbHBoYU51bSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coYXJyYXkpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhyYW5kb21BeGlzKTtcbiAgICAgICAgcmV0dXJuIGFycmF5XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgcGxhY2VSYW5kb21pemVyIiwiaW1wb3J0IHsgZ2FtZSB9IGZyb20gXCIuL21haW5nYW1lXCI7XG5cbmZ1bmN0aW9uIHBvcFVwR2FtZUVuZCgpe1xuICAgIGNvbnN0IGxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVib2FyZCcpO1xuICAgIGNvbnN0IGxheWVyUG9wVXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBsYXllclRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBsYXllckJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgdGV4dC50ZXh0Q29udGVudCA9ICdDb25ncmF0cyBGb3IgVGhlIFdpbidcbiAgICBidG4udGV4dENvbnRlbnQgPSAnT0snO1xuICAgIHRleHQuaWQgPSd0ZXh0UG9wVXAnO1xuICAgIGJ0bi5pZCA9ICdidG5Qb3BVcCc7XG4gICAgbGF5ZXJUZXh0LmNsYXNzTmFtZT0nbGF5ZXJUZXh0UG9wVXAnO1xuICAgIGxheWVyQnRuLmNsYXNzTmFtZT0nbGF5ZXJCdG5Qb3BVcCc7XG4gICAgbGF5ZXJQb3BVcC5jbGFzc05hbWU9J2xheWVyUG9wVXAnO1xuICAgIGxheWVyUG9wVXAuY2xhc3NMaXN0LmFkZCgnZGVhY3RpdmUnKTtcblxuICAgIGxheWVyVGV4dC5hcHBlbmQodGV4dCk7XG4gICAgbGF5ZXJCdG4uYXBwZW5kKGJ0bik7XG4gICAgbGF5ZXJQb3BVcC5hcHBlbmQobGF5ZXJUZXh0LCBsYXllckJ0bik7XG4gICAgbGF5ZXIuYXBwZW5kKGxheWVyUG9wVXApO1xuXG4gICAgYnRuLm9uY2xpY2sgPSAoKT0+e1xuICAgICAgICBsYXllclBvcFVwLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICBsYXllclBvcFVwLmNsYXNzTGlzdC5hZGQoJ2RlYWN0aXZlJyk7XG4gICAgICAgIGdhbWUucmVzdGFydEdhbWUoKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWN0aXZlOiAobG9zZXIpPT4ge1xuICAgICAgICAgICAgaWYgKGxvc2VyID09ICdBSScpe1xuICAgICAgICAgICAgICAgIHRleHQudGV4dENvbnRlbnQgPSAnQ29uZ3JhdHMgRm9yIFRoZSBXaW4gUGxheWVyIE9uZSEnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHRleHQudGV4dENvbnRlbnQgPSAnWW91IGFyZSBEZWZlYXRlZCBieSB0aGUgQUkhJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGF5ZXJQb3BVcC5jbGFzc0xpc3QucmVtb3ZlKCdkZWFjdGl2ZScpO1xuICAgICAgICAgICAgbGF5ZXJQb3BVcC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIC8vIGxheWVyUG9wVXAuc3R5bGUub3BhY2l0eT0nMSc7XG4gICAgICAgIH0sXG4gICAgICAgIGRlYWN0aXZlOiAoKT0+IHtcbiAgICAgICAgICAgIC8vIGxheWVyUG9wVXAuc3R5bGUub3BhY2l0eT0nMCc7XG4gICAgICAgICAgICBsYXllclBvcFVwLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgbGF5ZXJQb3BVcC5jbGFzc0xpc3QuYWRkKCdkZWFjdGl2ZScpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBwb3BVcEdhbWVFbmQiLCJcbmNvbnN0IHNoaXBzID0gKGNvb3JkKSA9PnsgLy8gbGVuZ3RoIHdpbGwgYmUgZnJvbSBzaXplIG9mIHRoZSBzaGlwXG4gICAgLy8gbGV0IGNvb3JkID0gbG9jLnNwbGl0KCcsJyk7XG4gICAgbGV0IGhlYWx0aEJhciA9IGNvb3JkLmxlbmd0aDtcbiAgICByZXR1cm4ge1xuICAgICAgICBsZW5ndGg6ICgpPT57XG4gICAgICAgICAgICByZXR1cm4gbGVuIFxuICAgICAgICB9LFxuICAgICAgICBoaXQ6IChsb2MpPT57XG4gICAgICAgICAgICAvL2dldCB0aGUgYXR0Y2sgaGl0IGxvY2F0aW9uXG4gICAgICAgICAgICBpZiAoY29vcmQuaW5jbHVkZXMobG9jKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJhdHRhY2sgbWlzc2VkXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGNvb3JkLmluY2x1ZGVzKGxvYykgPT09IHRydWUpe1xuICAgICAgICAgICAgICAgIGNvb3JkID0gY29vcmQuZmlsdGVyKCAodmFsKT0+e1xuICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWwgIT09IGxvY1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGhlYWx0aEJhciA9IGhlYWx0aEJhciAtIDE7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzU3VuazogKCk9PntcbiAgICAgICAgICAgIC8vY2hlY2sgdGhlIHNoaXAgaWYgc3Vua2VuIHlldFxuICAgICAgICAgICAgaWYoaGVhbHRoQmFyIDw9IDApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2hpcCBpcyBkZXN0cm95ZWQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gIFxuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzaGlwIGlzIHN0aWxsIGludGFjdCcpO1xuICAgICAgICAgICAgICAgIHJldHVybiBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgXG4gICAgICAgIGhlYWx0aEJhciA6ICgpPT4ge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInRoaXMgc2hpcCBoZWFsdGg6IFwiICsgaGVhbHRoQmFyKTtcbiAgICAgICAgICAgIHJldHVybiBoZWFsdGhCYXJcbiAgICAgICAgfSxcbiAgICAgICAgbG9jYXRpb246ICgpPT57XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGNvb3JkKVxuICAgICAgICAgICAgcmV0dXJuIGNvb3JkXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNoaXBzIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWluZ2FtZS5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==