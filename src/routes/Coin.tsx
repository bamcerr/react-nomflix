import { Link, Route, Switch, useLocation, useParams, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
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

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ $isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.$isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

const HomeBtn = styled.button`
  width: 40px;
  height: 40px;
  font-size: 22px;
`;


// mark: - info data interface
interface InfoData {
  id:                 string;
  name:               string;
  symbol:             string;
  rank:               number;
  is_new:             boolean;
  is_active:          boolean;
  type:               string;
  logo:               string;
  tags:               Tag[];
  team:               Team[];
  description:        string;
  message:            string;
  open_source:        boolean;
  started_at:         Date;
  development_status: string;
  hardware_wallet:    boolean;
  proof_type:         string;
  org_structure:      string;
  hash_algorithm:     string;
  links:              Links;
  links_extended:     LinksExtended[];
  whitepaper:         Whitepaper;
  first_data_at:      Date;
  last_data_at:       Date;
}

interface Links {
  explorer:    string[];
  facebook:    string[];
  reddit:      string[];
  source_code: string[];
  website:     string[];
  youtube:     string[];
}

interface LinksExtended {
  url:    string;
  type:   string;
  stats?: Stats;
}

interface Stats {
  subscribers?:  number;
  contributors?: number;
  stars?:        number;
  followers?:    number;
}

interface Tag {
  id:           string;
  name:         string;
  coin_counter: number;
  ico_counter:  number;
}

interface Team {
  id:       string;
  name:     string;
  position: string;
}

interface Whitepaper {
  link:      string;
  thumbnail: string;
}

// mark: - price data interface
interface PriceData {
  id:            string;
  name:          string;
  symbol:        string;
  rank:          number;
  total_supply:  number;
  max_supply:    number;
  beta_value:    number;
  first_data_at: Date;
  last_updated:  Date;
  quotes:        Quotes;
}

export interface Quotes {
  USD: Usd;
}

interface Usd {
  price:                  number;
  volume_24h:             number;
  volume_24h_change_24h:  number;
  market_cap:             number;
  market_cap_change_24h:  number;
  percent_change_15m:     number;
  percent_change_30m:     number;
  percent_change_1h:      number;
  percent_change_6h:      number;
  percent_change_12h:     number;
  percent_change_24h:     number;
  percent_change_7d:      number;
  percent_change_30d:     number;
  percent_change_1y:      number;
  ath_price:              number;
  ath_date:               Date;
  percent_from_price_ath: number;
}

// mark: 
interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

interface IConProps {
}


function Coin({}:IConProps) {
  const { coinId } = useParams<RouteParams>();
  const {state} = useLocation<RouteState>();
  
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  const {isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId], 
    () => fetchCoinInfo(coinId),
    // {
    //   refetchInterval: 100000
    // }
  );
  const {isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(["tickers",coinId], () => fetchCoinTickers(coinId));
  const isLoading = infoLoading || tickersLoading;
  return <Container>
    <Helmet>
      <title>{state?.name ? state.name : isLoading ? "Loading.." : infoData?.name}</title>
    </Helmet>

    <div>
      <HomeBtn>
        <Link to={{pathname: `/`}}>
          &#8962;
        </Link>
      </HomeBtn>
    </div>

    <Header>
      <Title>{state?.name ? state.name : isLoading ? "Loading.." : infoData?.name}</Title>
    </Header>

    {isLoading 
      ? <Loader>Loading...</Loader> 
      : <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price</span>
              <span>${tickersData?.quotes?.USD?.price?.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab $isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab $isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/:coinId/price`}>
              <Price quotes={tickersData?.quotes}/>
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
    }
  </Container>
}

export default Coin