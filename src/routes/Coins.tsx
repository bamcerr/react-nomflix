import styled from "styled-components"
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color:${props => props.theme.textColor};
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    display: flex;
    padding: 20px;
    transition: color 0.2s ease-in;
    align-items: center;
  }
  &:hover {
    a {
      color: ${props => props.theme.accentColor}
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const TopBar = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  align-items: center;
`;

const ToggleBtn = styled.div`
  margin-left: auto;
`;
const ToggleItem = styled.button<{$active: boolean}>`
  background-color: transparent;
  border-width: 1px;
  border-style: solid;
  border-color: ${props => !props.$active ? props.theme.textColor : props.theme.accentColor};
  color: ${props => !props.$active ? props.theme.textColor : props.theme.accentColor};
  &:first-child {
    border-radius: 10px 0 0 10px;
  }
  &:last-child {
    border-radius: 0 10px 10px 0;
  }
`

interface ICoin {
  id: string;
  name: String;
  symbol: String;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
};

function Coins() {
  const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins);
  
  return <Container>
    <Helmet>
      <title>코인</title>
    </Helmet>
    <Header>
      <Title>코인</Title>
    </Header>

    {isLoading ? <Loader>Loading...</Loader> : <CoinList>
      {data?.slice(0, 100).map(coin => (
        <Coin key={coin.id}>
          <Link to={{
            pathname: `/${coin.id}`,
            state: { name: coin.name }
          }}>
            <Img src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`} alt={coin.id}/>
            {coin.name} &rarr;
          </Link>
        </Coin>
      ))}
    </CoinList>}
  </Container>
}

export default Coins