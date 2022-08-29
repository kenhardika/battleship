
const ships = (len) =>{ // length will be from size of the ship
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
const midShip2 = ships(3);
const smallShip = ships(1);

bigShip.hit(5);
bigShip.healthBar();
bigShip.isSunk();

export {ships}