import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import ReactApexChart from "react-apexcharts";

const Price = (props) => {
  const [series, setSeries] = useState([{}]);
  let options = {
    xaxis: {
      labels: {
        formatter: function (value) {
          return value;
        },
      },
    },
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

  const handleClick = (e) => {
    props.setRange(e.target.value);
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
      <button className="range-button" value="5y" onClick={handleClick}>
        5y
      </button>
      <button className="range-button" value="2y" onClick={handleClick}>
        2y
      </button>
      <button className="range-button" value="1y" onClick={handleClick}>
        1y
      </button>
      <button className="range-button" value="6m" onClick={handleClick}>
        6m
      </button>
      <button className="range-button" value="3m" onClick={handleClick}>
        3m
      </button>
      <button className="range-button" value="1m" onClick={handleClick}>
        1m
      </button>
      <button className="range-button" value="2w" onClick={handleClick}>
        2w
      </button>
      <button className="range-button" value="1w" onClick={handleClick}>
        1w
      </button>
      <button className="range-button" value="5d" onClick={handleClick}>
        5d
      </button>
      <button className="range-button" value="ytd" onClick={handleClick}>
        ytd
      </button>

      <ReactApexChart
        options={options}
        series={series}
        height="515"
        type="candlestick"
      />
    </Card>
  );
};
export default Price;
