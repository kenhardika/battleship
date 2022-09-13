function markedAttack(user, className){
        const gamelayout = document.querySelector(`.${user}Gameboard`);
        const grid = gamelayout.querySelector(`.${className}`);
        // console.log(className);
        // console.log(grid);
        grid.classList.add('attacked');
        return
}
export default markedAttack