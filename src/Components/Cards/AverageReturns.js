import React, { useState, useEffect } from "react";
import "../../App.scss";
import { Card } from "antd";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

// Resolves charts dependancy
charts(FusionCharts);

const AverageReturns = (props) => {
  const [series, setSeries] = useState();

  useEffect(() => {
    setSeries(props.data);
  }, [props.data]);

  const dataSource = {
    chart: {
      numberPrefix: "$",
      rotateLabels: 0,
      canvasbgColor: "#000000",
      canvasbgAlpha: "100",
      canvasBorderThickness: "0",
      showAlternateHGridColor: "0",
      bgColor: "#000000",
      bgAlpha: "#000000",
      showBorder: "0",
      palettecolors: "#007bff",
      anchorBgColor: "#007bff",
    },
    categories: [
      {
        category: [
          {
            label: "$0",
            x: "0",
          },
          {
            label: "$20",
            x: "20",
            showverticalline: "1",
          },
          {
            label: "$40",
            x: "40",
            showverticalline: "1",
          },
          {
            label: "$60",
            x: "60",
            showverticalline: "1",
          },
          {
            label: "$80",
            x: "80",
            showverticalline: "1",
          },
          {
            label: "$100",
            x: "100",
            showverticalline: "1",
          },
        ],
      },
    ],
    dataset: [
      {
        data: [
          {
            name: "Up",
            x: "80",
            y: "10000",
            z: "1",
            // color: "#00FF00",
          },
          {
            name: "Down",
            x: "60",
            y: "10000",
            z: "10",
            // color: "#FF0000",
          },
        ],
      },
    ],
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
        <ReactFusioncharts
          type="bubble"
          width="100%"
          height="80%"
          dataFormat="JSON"
          dataSource={dataSource}
        />
      </div>
    </Card>
  );
};

export default AverageReturns;
