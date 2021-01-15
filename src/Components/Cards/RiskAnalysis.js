import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import ReactApexChart from "react-apexcharts";

const RiskAnalysis = (props) => {
  const [sharpe, setSharpe] = useState([{}]);
  const [currentRating, setCurrentRating] = useState("Rating");
  const [chartValue, setChartValue] = useState([0]);

  let options = {
    colors: ["#007bff"],
    chart: {
      type: "radialBar",
      offsetY: -20,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#FFFFFF",
          strokeWidth: "97%",
          margin: 5, // margin is in pixels
        },
        dataLabels: {
          name: {
            show: true,
          },
          value: {
            show: false,
            offsetY: -2,
            fontSize: "22px",
            color: "#FFFFFF",
          },
        },
      },
    },

    fill: {
      type: "solid",
    },
    labels: [currentRating],
  };

  useEffect(() => {
    setSharpe(props.data);
  }, [props.data]);

  useEffect(() => {
    if (sharpe < 0.45) {
      setCurrentRating("Poor");
      setChartValue([25]);
    } else if (sharpe <= 0.8 && sharpe >= 0.45) {
      setCurrentRating("Average");
      setChartValue([50]);
    } else if (sharpe <= 1.15 && sharpe >= 0.81) {
      setCurrentRating("Good");
      setChartValue([75]);
    } else if (sharpe > 1.15) {
      setCurrentRating("Exceptional");
      setChartValue([100]);
    }
  }, [sharpe]);

  return (
    <Card
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
          className="radial-risk"
          options={options}
          series={chartValue}
          height="456"
          type="radialBar"
        />
      </div>
    </Card>
  );
};

export default RiskAnalysis;
