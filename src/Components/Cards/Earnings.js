import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import ReactApexChart from "react-apexcharts";

const Earnings = (props) => {
  const [series, setSeries] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    setSeries(props.data);
    setDates(props.dates);
  }, [props.data]);

  let options = {
    chart: {
      type: "scatter",
      width: "100%",
    },

    colors: ["#D3D3D3", "#007BFF"],

    markers: {
      strokeWidth: 0,
    },

    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
    
    xaxis: {
      categories: dates,
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
          series={series}
          height="456"
          type="scatter"
        />
      </div>
    </Card>
  );
};

export default Earnings;
