import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import ReactApexChart from "react-apexcharts";

const Price = (props) => {
  const [series, setSeries] = useState([{}]);
  const [priceRange, setPriceRange] = useState("1y");
  const [priceFrame, setPriceFrame] = useState("daily");

  let options = {
    chart: {
      type: "candlestick",
      height: 420,
      width: "100%",
      animations: {
        enabled: false,
      },
    },
    grid: {
      row: {
        colors: "#2D2D2D",
        opacity: 0.8,
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
    xaxis: {
      tickAmount: 4,
      labels: {
        rotate: 0,
      },
      grid: {
        borderColor: "none",
      },
    },
  };

  useEffect(() => {
    const prices = fetch(
      `${props.apiBaseUrl}/prices?code=${props.apiCode}==&symbol=${props.activeTicker}&range=${priceRange}&frame=${priceFrame}`
    ).then((res) => res.json());
    Promise.resolve(prices).then((price) => {
      let priceData = Object.keys(price)
        .reverse()
        .map(function (key) {
          return {
            x: key,
            y: [
              price[key].adj_open,
              price[key].adj_high,
              price[key].adj_low,
              price[key].adj_close,
            ],
          };
        });

      setSeries([{ data: priceData.slice(2) }]);
    });
  }, [priceRange, priceFrame, props.activeTicker]);

  const changeTimeFrame = (e) => {
    setPriceRange(e.target.value);
  };

  const changeCandleInterval = (e) => {
    setPriceFrame(e.target.value);
  };

  return (
    <Card
      className="hide-overflow"
      title={props.title}
      extra={props.extra}
      style={{
        height: "100%",
        overflow: "auto",
      }}
    >
      <hr className="card-hr" />
      <div style={{ height: 456 }}>
        <div className="row">
          <div className="col-lg-12">
            <button
              className="range-button btn btn-link btn-sm shadow-none"
              value="daily"
              onClick={changeCandleInterval}
            >
              Daily
            </button>
            <button
              className="range-button btn btn-link btn-sm shadow-none"
              value="weekly"
              onClick={changeCandleInterval}
            >
              Weekly
            </button>
            <button
              className="range-button btn btn-link btn-sm shadow-none"
              value="monthly"
              onClick={changeCandleInterval}
            >
              Monthly
            </button>
          </div>
        </div>

        <ReactApexChart
          options={options}
          series={series}
          type="candlestick"
          height={413}
        />

        <div className="row">
          <div className="col-lg-12">
            <button
              className="range-button btn btn-link btn-sm shadow-none"
              value="5y"
              onClick={changeTimeFrame}
            >
              5y
            </button>
            <button
              className="range-button btn btn-link btn-sm shadow-none"
              value="2y"
              onClick={changeTimeFrame}
            >
              2y
            </button>
            <button
              className="range-button btn btn-link btn-sm shadow-none"
              value="1y"
              onClick={changeTimeFrame}
            >
              1y
            </button>
            <button
              className="range-button btn btn-link btn-sm shadow-none"
              value="6m"
              onClick={changeTimeFrame}
            >
              6m
            </button>
            <button
              className="range-button btn btn-link btn-sm shadow-none"
              value="3m"
              onClick={changeTimeFrame}
            >
              3m
            </button>
            <button
              className="range-button btn btn-link btn-sm shadow-none"
              value="1m"
              onClick={changeTimeFrame}
            >
              1m
            </button>
            <button
              className="range-button btn btn-link btn-sm shadow-none"
              value="2w"
              onClick={changeTimeFrame}
            >
              2w
            </button>
            <button
              className="range-button btn btn-link btn-sm shadow-none"
              value="1w"
              onClick={changeTimeFrame}
            >
              1w
            </button>
            <button
              className="range-button btn btn-link btn-sm shadow-none"
              value="5d"
              onClick={changeTimeFrame}
            >
              5d
            </button>
            <button
              className="range-button btn btn-link btn-sm shadow-none"
              value="ytd"
              onClick={changeTimeFrame}
            >
              ytd
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default Price;
