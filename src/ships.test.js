const { ships } = require("./ships");

test('Test ship hit', ()=>{
    let bigShip = ships(5);
    bigShip.hit(5);
    expect(bigShip.healthBar()).toBe(0);
})