type CoinCollection = {
    q: number,
    d: number,
    n: number,
    p: number
};
class CoinMachine {
    pay: (amount: number) => CoinCollection;
    constructor(quarters = Infinity, dimes = Infinity, nickels = Infinity, pennies = Infinity) {
        const supply: CoinCollection = {
            q: quarters,
            d: dimes,
            n: nickels,
            p: pennies
        };
        const coinValue: CoinCollection = {
            q: 25,
            d: 10,
            n: 5,
            p: 1
        }
        this.pay = function (amount) {
            const coins: CoinCollection = {
                q: 0,
                d: 0,
                n: 0,
                p: 0
            };
            const order = ["q", "d", "n", "p"];
            for (let i = 0; i < 4; i++) {
                const coin = order[i];
                if (amount === 0)
                    break;
                coins[coin] = Math.min(Math.floor(amount / coinValue[coin]), supply[coin]);
                supply[coin] -= coins[coin];
                amount -= coins[coin] * coinValue[coin];
            }
            if ((amount === 5 || coins.p >= 5) && coins.q > 0 && supply.d >= 3) {
                coins.q--;
                supply.q += 1;
                supply.d -= 3;
                coins.d += 3;
                if (coins.p >= 5){
                    coins.p -=5;
                    supply.p += 5;
                }
                else
                    amount -= 5;
            }
            if (amount !== 0) {
                for (const coin of order) {
                    if (coins[coin])
                        supply[coin] += coins[coin];
                }
                throw new Error("Supply of coins not enough to make exact change.");
            }
            return coins;
        }

    }
}

export default CoinMachine;
