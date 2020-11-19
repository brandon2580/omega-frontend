import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import ReactApexChart from "react-apexcharts";

const Price = (props) => {
  const [series, setSeries] = useState([{}]);
  let options = {
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },

    grid: {
      borderColor: "none",
    },
  };

  useEffect(() => {
    setSeries([{ data: props.data.slice(2) }]);
  }, [props.data]);

  const changeTimeFrame = (e) => {
    props.setRange(e.target.value);
  };

  const changeCandleInterval = (e) => {
    props.setFrame(e.target.value);
  };

  return (
    <Card
      className="hide-overflow"
      title={props.title}
      extra={props.button}
      style={{
        height: "100%",
        overflow: "auto",
        scrollbarColor: "#152233 #131722",
      }}
    >
      <hr className="card-hr" />
      <div className="row">
        <div className="col-lg-12">
          <button
            className="range-button btn btn-primary"
            value="daily"
            onClick={changeCandleInterval}
          >
            Daily
          </button>
          <button
            className="range-button btn btn-primary"
            value="weekly"
            onClick={changeCandleInterval}
          >
            Weekly
          </button>
          <button
            className="range-button btn btn-primary"
            value="monthly"
            onClick={changeCandleInterval}
          >
            Monthly
          </button>
        </div>
      </div>
      <div style={{ height: "425px" }}>
        <ReactApexChart
          options={options}
          series={series}
          type="candlestick"
          height={465}
        />
      </div>

      <div className="row">
        <div className="col-lg-12">
          <button
            className="range-button btn btn-primary "
            value="5y"
            onClick={changeTimeFrame}
          >
            5y
          </button>
          <button
            className="range-button btn btn-primary "
            value="2y"
            onClick={changeTimeFrame}
          >
            2y
          </button>
          <button
            className="range-button btn btn-primary "
            value="1y"
            onClick={changeTimeFrame}
          >
            1y
          </button>
          <button
            className="range-button btn btn-primary "
            value="6m"
            onClick={changeTimeFrame}
          >
            6m
          </button>
          <button
            className="range-button btn btn-primary "
            value="3m"
            onClick={changeTimeFrame}
          >
            3m
          </button>
          <button
            className="range-button btn btn-primary "
            value="1m"
            onClick={changeTimeFrame}
          >
            1m
          </button>
          <button
            className="range-button btn btn-primary "
            value="2w"
            onClick={changeTimeFrame}
          >
            2w
          </button>
          <button
            className="range-button btn btn-primary "
            value="1w"
            onClick={changeTimeFrame}
          >
            1w
          </button>
          <button
            className="range-button btn btn-primary "
            value="5d"
            onClick={changeTimeFrame}
          >
            5d
          </button>
          <button
            className="range-button btn btn-primary "
            value="ytd"
            onClick={changeTimeFrame}
          >
            ytd
          </button>
        </div>
      </div>
    </Card>
  );
};
export default Price;
