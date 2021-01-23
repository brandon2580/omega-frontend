import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import _ from "lodash";
import ReactApexChart from "react-apexcharts";

const PriceCalendar = (props) => {
  const [series, setSeries] = useState([{}]);

  useEffect(() => {
    let lastFourWeeks = props.data.slice(Math.max(props.data.length - 20, 1));

    function groupArr(data, n) {
      var group = [];
      for (var i = 0, j = 0; i < data.length; i++) {
        if (i >= n && i % n === 0) j++;
        group[j] = group[j] || [];
        group[j].push(data[i]);
      }
      return group;
    }

    let grouped = groupArr(lastFourWeeks, 5);
    let mapped = grouped.map((el) => {
      let percentChange = el.map((price) => {
        return {
          x: price.x,
          y: price.change,
        };
      });

      return {
        data: percentChange,
      };
    });

    setSeries(mapped);
  }, [props.data]);

  let options = {
    plotOptions: {
      heatmap: {
        colorScale: {
          ranges: [
            {
              from: -100,
              to: -3,
              color: "#8B0000",
              name: "lower",
            },
            {
              from: -2.99,
              to: -0.25,
              color: "#FF0000",
              name: "low",
            },
            {
              from: -0.24,
              to: 0.25,
              color: "#C0C0C0",
              name: "neutral",
            },
            {
              from: 0.26,
              to: 2.99,
              color: "#00FF00",
              name: "high",
            },
            {
              from: 3,
              to: 100,
              color: "#009900",
              name: "higher",
            },
          ],
        },
      },
    },
    chart: {
      height: 350,
      type: "heatmap",
    },
    xaxis: {
      type: "category",
      categories: ["Mon", "Tues", "Wed", "Thur", "Fri"],
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
      <div style={{ height: "456px" }}>
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
