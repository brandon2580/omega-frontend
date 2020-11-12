import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import ReactApexChart from "react-apexcharts";

const Earnings = (props) => {
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    setSeries(props.data);
  }, [props.data]);

  useEffect(() => {
    setLabels(props.labels);
  }, [props.labels]);

  let options = {
    chart: {
      type: "scatter",
      width: "100%",
    },

    labels: labels,

    yaxis: {
      tooltip: {
        enabled: true,
      },
    },

    xaxis: {
      labels: {
        offsetX: -10
      },
    },

    grid: {
      borderColor: "none",
    },
  };

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

export default Earnings;
