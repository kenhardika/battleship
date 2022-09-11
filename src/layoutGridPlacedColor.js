import { AIGameboard } from "./maingame";

function layoutGridPlacedColor(){
    let currentGap = AIGameboard.gapLocation;
    let currentShip = AIGameboard.checkAllLocation();
    // console.log(currentGap);
    if (!currentGap){
        return
    }
    else {
        currentGap.forEach((arrayLoc)=>{
                let gap = document.querySelector(`.${arrayLoc}`);
                gap.classList.add('gap');
            // let layer = document.querySelector(`.${loc}`);
            // layer.classList.add('placed');
        });

        currentShip.forEach((curship)=>{
            let ship = document.querySelector(`.${curship}`);
            ship.classList.add('ship');
        });
        // console.log(currentShip);

    }
}

export default layoutGridPlacedColor