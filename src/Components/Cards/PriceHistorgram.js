import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import ReactApexChart from "react-apexcharts";

const PriceHistogram = (props) => {
  const [series, setSeries] = useState([{}, {}]);
  const [occurences, setOccurences] = useState([])

  let options = {
    chart: {
      type: "bar",
      height: 440,
      stacked: true,
    },
    colors: ["#008FFB", "#FF4560"],
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "80%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },

    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      min: -5,
      max: 5,
      title: {
        // text: 'Age',
      },
    },
    tooltip: {
      shared: false,
      x: {
        formatter: function (val) {
          return val;
        },
      },
      y: {
        formatter: function (val) {
          return Math.abs(val) + "%";
        },
      },
    },
    xaxis: {
      categories: [
        "45",
        "40",
        "35",
        "30",
        "25",
        "20",
        "15",
        "10",
        "5",
        "0",
      ],
      title: {
        text: "Percent",
      },
      labels: {
        formatter: function (val) {
          return Math.abs(Math.round(val)) + "%";
        },
      },
    },
  };

  function percentChange(n1, n2) {
    return (((n2 - n1) / n1) * 100).toFixed(2);
  }

  useEffect(() => {
    let prices = props.data.slice(2);
    let firstTen = prices.slice(0, 100);
    let mappedChanges = firstTen.map((el) => {
      return percentChange(el.y[0], el.y[3]);
    });
    let positive = mappedChanges.filter((e) => !e.includes("-"));
    let negative = mappedChanges.filter((e) => e.includes("-"));

    setSeries([
      { name: "Positive", data: positive.sort() },
      { name: "Negative", data: negative.sort() },
    ]);
  }, [props.data]);

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
          type="bar"
        />
      </div>
    </Card>
  );
};

export default PriceHistogram;
