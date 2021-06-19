import React, { useEffect, useState } from "react";
import "../../App.scss";
import _ from "lodash";
import { Card } from "antd";
import ReactApexChart from "react-apexcharts";
import Loader from "react-loader-spinner";

const Price = (props) => {
  const [series, setSeries] = useState([{}]);
  const [priceRange, setPriceRange] = useState("1y");
  const [priceFrame, setPriceFrame] = useState("daily");
  const [isLoading, setIsLoading] = useState(true);

  let options = {
    chart: {
      type: "candlestick",
      height: 420,
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
      `https://sandbox.iexapis.com/stable/stock/${props.activeTicker}/chart/${priceRange}?token=Tpk_0a80aa79cd7244838ccc02f6ad231450`
    ).then((res) => res.json());
    Promise.resolve(prices).then((price) => {
      let priceData = Object.keys(price)
        .map(function (key) {
          return {
            x: price[key].date,
            y: [
              price[key].open,
              price[key].high,
              price[key].low,
              price[key].close,
            ],
          };
        });

      setSeries([{ data: _.dropRight(priceData, 2) }]);
      setIsLoading(false);
    });
  }, [priceRange, priceFrame, props.activeTicker]);

  const changeTimeFrame = (e) => {
    setPriceRange(e.target.value);
  };

  const changeCandleInterval = (e) => {
    setPriceFrame(e.target.value);
  };

  if (isLoading) {
    return (
      <Card
        title={props.title}
        extra={props.extra}
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
        <hr className="card-hr" />

        <Loader
          className="fullyCentered"
          type="Puff"
          color="#007bff"
          height={100}
          width={100}
        />
      </Card>
    );
  } else {
    return (
      <Card
        className="hide-overflow price-card"
        title={props.title}
        extra={props.extra}
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
        <hr className="card-hr" />
        <div style={{ height: 456 }}>
          {/* <div className="row">
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
          </div> */}

          <ReactApexChart
            options={options}
            series={series}
            type="candlestick"
            height={410}
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
  }
};
export default Price;
