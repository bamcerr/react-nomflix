import { Quotes } from "./Coin";

interface IPriceProps {
  quotes?: Quotes
}

function Price({quotes}:IPriceProps) {
  return <>
    <h1>price {quotes?.USD.price}</h1>
    <h1>market cap{quotes?.USD.market_cap}</h1>
    <h1>all time high date{quotes?.USD.ath_date.valueOf()}</h1>
    <h1>all time high price{quotes?.USD.ath_price}</h1>
  </>
}

export default Price;