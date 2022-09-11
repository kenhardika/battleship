import { AIGameboard } from "./maingame";

function layoutGridPlacedColor(gameboard, user){
    let currentGap = gameboard.gapLocation;
    let currentShip = gameboard.checkAllLocation();
    // console.log(currentGap);
    if (!currentGap){
        return
    }
    else {
        currentGap.forEach((arrayLoc)=>{
                let layer = document.querySelector(`.${user}Gameboard`);
                let gap = layer.querySelector(`.${arrayLoc}`);
                gap.classList.add('gap');
            // let layer = document.querySelector(`.${loc}`);
            // layer.classList.add('placed');
        });

        currentShip.forEach((curship)=>{
            let layer = document.querySelector(`.${user}Gameboard`);
            let ship = layer.querySelector(`.${curship}`);
            ship.classList.add('ship');
        });
        // console.log(currentShip);

    }
}

export default layoutGridPlacedColor