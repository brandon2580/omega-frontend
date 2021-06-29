import React, { useEffect, useState } from "react";
import "../../App.scss";
import _ from "lodash";
import { Card } from "antd";
import ReactApexChart from "react-apexcharts";
import Loader from "react-loader-spinner";

const Price = (props) => {
  const [candlestickSeries, setCandlestickSeries] = useState([{}]);
  const [areaSeries, setAreaSeries] = useState([{}]);

  const [priceRange, setPriceRange] = useState("1y");
  const [priceFrame, setPriceFrame] = useState("daily");
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState("area");

  const candlestickOptions = {
    chart: {
      type: "candlestick",
      height: 420,
      animations: {
        enabled: false,
      },
    },
    tooltip: {
      x: {
        show: true,
      },
      y: {
        title: {
          formatter: function () {
            return "$";
          },
        },
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

  const areaOptions = {
    chart: {
      type: "area",
      height: 420,
      animations: {
        enabled: false,
      },
    },
    tooltip: {
      x: {
        show: true,
      },
      y: {
        title: {
          formatter: function () {
            return "";
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },

    stroke: {
      width: 1,
    },
    tooltip: {
      onDatasetHover: {
        highlightDataSeries: true,
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
      xaxis: {
        type: "datetime",
      },
      tickAmount: 4,
      labels: {
        rotate: 0,
      },
    },
  };

  useEffect(() => {
    const candlestickPrices = fetch(
      `https://cloud.iexapis.com/stable/stock/${props.activeTicker}/chart/${priceRange}?token=pk_6fdc6387a2ae4f8e9783b029fc2a3774`
    ).then((res) => res.json());

    Promise.resolve(candlestickPrices).then((price) => {
      let candlestickData = Object.keys(price).map(function (key) {
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
      setCandlestickSeries([{ data: _.dropRight(candlestickData, 2) }]);
      setIsLoading(false);
    });

    const areaPrices = fetch(
      `https://cloud.iexapis.com/stable/stock/${props.activeTicker}/chart/${priceRange}?token=pk_6fdc6387a2ae4f8e9783b029fc2a3774`
      
    ).then((res) => res.json());

    Promise.resolve(areaPrices).then((price) => {
      let areaData = Object.keys(price).map(function (key) {
        return {
          x: price[key].date,
          y: price[key].close,
        };
      });
      setAreaSeries([{ data: _.dropRight(areaData, 2) }]);
      setIsLoading(false);
    });
  }, [priceRange, priceFrame, props.activeTicker]);

  const changeTimeFrame = (e) => {
    setPriceRange(e.target.value);
  };

  let candlestickHeader = (
    <div>
      {props.title}
      <button
        className="btn btn-primary change-view-button"
        onClick={() => setView("area")}
      >
        Change View
      </button>
    </div>
  );

  let areaHeader = (
    <div>
      {props.title}
      <button
        className="btn btn-primary change-view-button"
        onClick={() => setView("candlestick")}
      >
        Change View
      </button>
    </div>
  );

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
    if (view == "candlestick") {
      return (
        <Card
          className="hide-overflow price-card"
          title={candlestickHeader}
          extra={props.extra}
          style={{
            height: "100%",
            overflow: "auto",
          }}
        >
          <hr className="card-hr" />
          <div style={{ height: 456 }}>
            <ReactApexChart
              options={candlestickOptions}
              series={candlestickSeries}
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
    } else if (view == "area") {
      return (
        <Card
          className="hide-overflow price-card"
          title={areaHeader}
          extra={props.extra}
          style={{
            height: "100%",
            overflow: "auto",
          }}
        >
          <hr className="card-hr" />
          <div style={{ height: 456 }}>
            <ReactApexChart
              options={areaOptions}
              series={areaSeries}
              type="area"
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
  }
};
export default Price;
