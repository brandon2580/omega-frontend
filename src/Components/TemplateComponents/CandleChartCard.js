import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import ReactApexChart from "react-apexcharts";

const CandleChartCard = (props) => {
  const [series, setSeries] = useState([{}]);

  useEffect(() => {
    setSeries([{ data: props.data.slice(2) }]);
  }, [props.data]);

  const [options, setOptions] = useState({
    chart: {
      type: "candlestick",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
    grid: {
      borderColor: "none",
    },
  });

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
      <ReactApexChart
        options={options}
        series={series}
        height="456"
        type="candlestick"
      />
    </Card>
  );
};
export default CandleChartCard;
