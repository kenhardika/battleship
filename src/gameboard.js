import ships from "./ships.js";

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
        checkAllShip: ()=>{
            // check the healthbar of each ships with ship.healthbar()
            allShip.forEach((ship)=>{
                ship.location(); 
                totalHealth = totalHealth + ship.healthBar();
            });
            console.log(totalHealth);
            // if all the healthbar is 0 then the game is ended
            return totalHealth 
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

const playa = gameboard();
const bigShipCoor = '6B 7B 8B 9B 10B';
const midShipCoor = '4B 4C 4D';
const midShip = ships(midShipCoor);
const bigShip = ships(bigShipCoor);

playa.placement(bigShip);
playa.placement(midShip);
playa.receiveAttack("7B");debugger
playa.receiveAttack("7B");debugger
playa.receiveAttack("4D");debugger
playa.receiveAttack("3B");debugger
playa.checkAllLocation();
playa.checkAttackMissed();
playa.checkAllShip(); 
// revise this
// playa.placement('1A 2A 3A', ships(3));
// playa.placement('3B 4B', ships(2));
// playa.placement('6B 7B 8B 9B 10B', ships(5));
// playa.placement('6E 7E 8E 9E 10E', ships(5));


export {gameboard}