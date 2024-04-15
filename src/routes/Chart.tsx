import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts"

interface IHistorical {
  time_open:  number;
  time_close: number;
  open:       string;
  high:       string;
  low:        string;
  close:      string;
  volume:     string;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
  isDark: boolean;
}

function Chart({coinId, isDark}: ChartProps) {
  const {isLoading, data} = useQuery<IHistorical[]>(
    ["ohlcv", coinId], 
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 100000
    }
  )

  return <div> { isLoading 
    ?"Loading chart..." 
    : <ApexChart 
        type="candlestick"
        height={350}
        series={[
          {
            data: data?.map(price => ({
              x: price.time_open,
              y: [price.open, price.high, price.low, price.close]
            })) ?? []
          }
        ]}
        options={{
          theme: {
            mode: isDark ? "dark" : "light"
          },
          chart: {
            type: 'candlestick',
            height: 350,
            width: 500,
            toolbar: {
              show: false
            },
            background: "transparent",
          },
          grid: {
            show: false
          },
          stroke: {
            curve: "smooth",
            width: 4
          },
          yaxis: {
            show: false
          },
          xaxis: {
            axisBorder: {  show: true },
            axisTicks: { show: false },
            labels: { show: true, datetimeFormatter: {} },
            type: "datetime",
            categories: data?.map(price => new Date(price.time_close * 1000).toISOString()) ?? []
          },
          // fill: {
          //   type: "gradient", gradient: { gradientToColors: ["#0be881"], stops: [0, 100]}
          // },
          colors: ["#0fbcf9"],
          tooltip: {
            y: {
              formatter: (value) => `$${value.toFixed(2)}`
            }
          }
        }}
      />
  }

  </div>
}

export default Chart;