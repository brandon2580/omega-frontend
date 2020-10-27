import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import ReactApexChart from "react-apexcharts";

const CandleChartCard = (props) => {
  const [series, setSeries] = useState([{}]);
  console.log(series);
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
      <ReactApexChart
        options={options}
        series={series}
        height="515"
        type="candlestick"
      />
    </Card>
  );
};
export default CandleChartCard;
