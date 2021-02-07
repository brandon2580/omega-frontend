import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import ReactApexChart from "react-apexcharts";

const Price = (props) => {
  const [series, setSeries] = useState([{}]);

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
    setSeries([{ data: props.data.slice(2) }]);
  }, [props.data]);

  const changeTimeFrame = (e) => {
    props.setPriceRange(e.target.value);
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
      <div style={{ height: 456 }}>

        <ReactApexChart
          options={options}
          series={series}
          type="candlestick"
          height={413}
        />

      </div>
    </Card>
  );
};
export default Price;
