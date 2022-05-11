import CoinMachine from "./coinmachine";

test("can make 55 cents with one quarter", () => {
    const cm = new CoinMachine(3, 3, 0, 0);
    const amount = 55;
    expect(cm.pay(amount)).toEqual({ q: 1, d: 3, n: 0, p: 0 });
});

test("can make 55 cents with no pennies", () => {
    const cm = new CoinMachine(2, 3, 0, 100);
    const amount = 55;
    expect(cm.pay(amount)).toEqual({ q: 1, d: 3, n: 0, p: 0 });
});
test("will give 30 cents with three dimes", () => {
    const cm = new CoinMachine(2, 3, 0, 100);
    const amount = 30;
    expect(cm.pay(amount)).toEqual({ q: 0, d: 3, n: 0, p: 0 });
});
test("will give 30 cents with a quarter and a nickel", () => {
    const cm = new CoinMachine(2, 3, 5, 100);
    const amount = 30;
    expect(cm.pay(amount)).toEqual({ q: 1, d: 0, n: 1, p: 0 });
});

test("will give 55 cents with dimes, nickels, and pennies", () => {
    const cm = new CoinMachine(0, 3, 4, 100);
    const amount = 55;
    expect(cm.pay(amount)).toEqual({ q: 0, d: 3, n: 4, p: 5 });
});

test("Throws error making 75 cents", () => {
    const cm = new CoinMachine(2,1,1,5);
    expect(cm.pay.bind(null,75)).toThrowError("Supply of coins not enough to make exact change.");
});

test("Can make multiple payments", () => {
    let cm = new CoinMachine();
    expect(cm.pay(32)).toEqual({q: 1, d: 0, n: 1, p: 2});
    expect(cm.pay(37)).toEqual({q: 1, d: 1, n: 0, p: 2});
    expect(cm.pay(0)).toEqual({q: 0, d: 0, n: 0, p: 0});
    expect(cm.pay(5)).toEqual({q: 0, d: 0, n: 1, p: 0});
    cm = new CoinMachine(4,5,8,7);
    expect(cm.pay(32)).toEqual({q: 1, d: 0, n: 1, p: 2});
    expect(cm.pay(55)).toEqual({q: 2, d: 0, n: 1, p: 0});
    expect(cm.pay(55)).toEqual({q: 1, d: 3, n: 0, p: 0});
    expect(cm.pay(55)).toEqual({q: 0, d: 2, n: 6, p: 5});
    expect(cm.pay.bind(null, 1)).toThrowError("Supply of coins not enough to make exact change.");
});
