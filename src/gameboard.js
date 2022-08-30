import { ships } from "./ships.js"

const gameboard = ()=> {
    console.log('gameboard is on')
    let shipCoordinate = [];
    let objShip = {
        mainShip: [],
        midShip: [],
        smallShip: []
    };
    return {
        placement: (coor, ships)=>{
            // make sure the coordinate is valid, which means empty and one block away from another ship
            // place the ships on the coordinate      
            shipCoordinate.push(coor.split(" "));
            if (ships.length() === 5){
                objShip.mainShip.push(ships);
                objShip.mainShip.push(coor.split(" ")) // coordinate better put inside the ships
                // objShip.mainShip = Object.assign(objShip.mainShip.ships, ships);
                console.log(objShip); debugger
            }
            if (ships.length() === 3){
                objShip.midShip.push(ships);
                objShip.midShip.push(coor.split(" "))
                // objShip.midShip = Object.assign(objShip.midShip.ships, ships);
                console.log(objShip); debugger
            }
            if (ships.length() === 2){
                objShip.smallShip.push(ships);
                objShip.smallShip.push(coor.split(" "))
                // objShip.smallShip = Object.assign(objShip.smallShip.ships, ships);
                console.log(objShip); debugger
            }
            else{
                return
            }
            // marks the coordinate with ships' marks
            return
        },
        receiveAttack: (coor)=>{
            // check if its hit the ship
            // if its hits the ship, toggle ship.hit()
            // toggle checkAllShip() to make sure if its not endgame
            // if not marks the coordinate with missedAttack()
            return
        },
        missedAttack: ()=>{
            // mark the missed attack from opponnent
            // disable the exact gameboard coordinate so you cannot receive attack on it again
            return
        },
        checkAllShip: ()=>{
            // check the healthbar of each ships with ship.healthbar()
            // if all the healthbar is 0 then the game is ended
            return
        }
    }
}
let midShip = ships(3);
let smallShip = ships(2);


const playa = gameboard();
playa.placement('1A 2A 3A', ships(3));
playa.placement('3B 4B', ships(2));
playa.placement('6B 7B 8B 9B 10B', ships(5));
playa.placement('6E 7E 8E 9E 10E', ships(5));


export {gameboard}