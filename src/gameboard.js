import { ships } from "./ships"

const gameboard = (loc)=> {
    console.log('gameboard is on')
    return {
        placement: (coor, ships)=>{
            return
        },
        receiveAttack: ()=>{
            return
        },
        missedAttack: ()=>{
            return
        },
        checkAllShip: ()=>{
            return
        }
    }
}
let midShip = ships(3);

const playa = gameboard();
playa.placement('1A, 2A, 3A', midShip)

export {gameboard}