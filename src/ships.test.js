import ships from "./ships";

test('Test ship hit', ()=>{
    const bigShip = ships("3A 4A 5A 6A 7A");
    bigShip.hit("4A");
    expect(bigShip.healthBar()).toBe(4);
    expect(bigShip.location()).toContain("3A", "5A", "6A", "7A");
})