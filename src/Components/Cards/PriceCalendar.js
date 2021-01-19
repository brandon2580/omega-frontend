import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import ReactApexChart from "react-apexcharts";

const PriceCalendar = (props) => {
  function generateData(count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = (i + 1).toString();
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      series.push({
        x: x,
        y: y,
      });
      i++;
    }
    return series;
  }

  const [series, setSeries] = useState([{}]);

  useEffect(() => {
    setSeries([{ data: props.data.slice(2) }]);
  }, [props.data]);
  console.log(series)

  let options = {
    chart: {
      height: 350,
      type: "heatmap",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#008FFB"],
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
      <div style={{ height: "425px" }}>
        <ReactApexChart
          options={options}
          series={series}
          type="heatmap"
          height="456"
        />
      </div>
    </Card>
  );
};
export default PriceCalendar;
