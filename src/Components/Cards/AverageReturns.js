import React, { useState, useEffect } from "react";
import "../../App.scss";
import { Card } from "antd";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts/core";
import Bubble from "fusioncharts/viz/bubble";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Bubble, FusionTheme);

const AverageReturns = (props) => {
  const [series, setSeries] = useState();
  const [theme, setTheme] = useState("");

  useEffect(() => {
    props.darkMode ? setTheme("#000000") : setTheme("#FFFFFF");
  }, [props.darkMode]);

  useEffect(() => {
    setSeries(props.data);
  }, [props.data]);

  const dataSource = {
    chart: {
      numberPrefix: "$",
      rotateLabels: 0,
      canvasbgColor: theme,
      canvasbgAlpha: "100",
      canvasBorderThickness: "0",
      showAlternateHGridColor: "0",
      bgColor: theme,
      bgAlpha: "100",
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
        <ReactFC
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
