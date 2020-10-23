import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import ReactApexChart from "react-apexcharts";

const ScatterChartCard = (props) => {
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    setSeries(props.data);
  }, [props.data]);

  useEffect(() => {
    setLabels(props.labels);
  }, [props.labels]);

  const [options, setOptions] = useState({
    chart: {
      type: "scatter",
    },

    labels: labels,

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

      <div style={{ height: 456 }}>
        <ReactApexChart
          options={options}
          labels={labels}
          series={series}
          height="456"
          type="scatter"
        />
      </div>
    </Card>
  );
};

export default ScatterChartCard;
