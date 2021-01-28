import React from "react";
import "../../App.scss";
import { Card } from "antd";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts/core";
import Line from "fusioncharts/viz/line";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Line, FusionTheme);

const dataSource = {
  chart: {
    caption: "Average Fastball Velocity",
    yaxisname: "Velocity (in mph)",
    subcaption: "[2005-2016]",
    numbersuffix: " mph",
    rotatelabels: "1",
    setadaptiveymin: "1",
    canvasbgColor: "#000000",
    canvasbgAlpha: "100",
    canvasBorderThickness: "0",
    showAlternateHGridColor: "0",
    bgColor: "#000000",
    bgAlpha: "#000000",
    showBorder: "0",
  },
  data: [
    {
      label: "2005",
      value: "89.45",
    },
    {
      label: "2006",
      value: "89.87",
    },
    {
      label: "2007",
      value: "89.64",
    },
    {
      label: "2008",
      value: "90.13",
    },
    {
      label: "2009",
      value: "90.67",
    },
    {
      label: "2010",
      value: "90.54",
    },
    {
      label: "2011",
      value: "90.75",
    },
    {
      label: "2012",
      value: "90.8",
    },
    {
      label: "2013",
      value: "91.16",
    },
    {
      label: "2014",
      value: "91.37",
    },
    {
      label: "2015",
      value: "91.66",
    },
    {
      label: "2016",
      value: "91.8",
    },
  ],
};
const Economics = (props) => {
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
        <ReactFC
          type="line"
          width="100%"
          height="100%"
          dataFormat="JSON"
          dataSource={dataSource}
        />
      </div>
    </Card>
  );
};

export default Economics;
