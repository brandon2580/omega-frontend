import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import ReactApexChart from "react-apexcharts";

const Volatility = (props) => {
  const [series, setSeries] = useState([]);
  const [ticker, setTicker] = useState("");

  useEffect(() => {
    setSeries([
      props.data.beta.toFixed(2),
      props.data.comp_beta.toFixed(2),
      props.data.dow_beta.toFixed(2),
    ]);
    setTicker(props.data.symbol);
  }, [props.data]);

  let options = {
    series: series,
    chart: {
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "30%",
          background: "transparent",
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
      },
    },
    colors: ["#007bff", "#0084ff", "#39539E"],
    labels: [ticker, "Competitors", "DOW 30"],
    legend: {
      show: true,
      floating: true,
      fontSize: "14px",
      position: "left",
      offsetX: 10,
      offsetY: 15,
      labels: {
        useSeriesColors: true,
      },
      markers: {
        size: 0,
      },
      formatter: function (seriesName, opts) {
        return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
      },
      itemMargin: {
        vertical: 3,
      },
    },
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
          type="radialBar"
          height={413}
        />
      </div>
    </Card>
  );
};
export default Volatility;
