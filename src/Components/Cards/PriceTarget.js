import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts/core";
import Line from "fusioncharts/viz/line";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Line, FusionTheme);

const PriceTarget = (props) => {
  const [series, setSeries] = useState();
  const [high, setHigh] = useState();
  const [average, setAverage] = useState();
  const [low, setLow] = useState();
  const [theme, setTheme] = useState("");
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    props.darkMode ? setTheme("#000000") : setTheme("#FFFFFF");
    props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
  }, [props.darkMode]);

  useEffect(() => {
    setSeries(props.data[0].splice(2));
    setHigh(props.data[1].high);
    setAverage(props.data[1].average);
    setLow(props.data[1].low);
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
      drawAnchors: "0",
      baseFontColor: textColor,
      toolTipBgColor: theme,
    },
    data: series,
    trendlines: [
      {
        line: [
          {
            startvalue: high,
            color: "#00FF00",
            displayvalue: "High",
            valueOnRight: "1",
            thickness: "1",
          },
          {
            startvalue: average,
            color: "#C0C0C0",
            displayvalue: "Avg",
            valueOnRight: "1",
            thickness: "1",
          },
          {
            startvalue: low,
            color: "#FF0000",
            displayvalue: "Low",
            valueOnRight: "1",
            thickness: "1",
          },
        ],
      },
    ],
  };

  return (
    <Card
      title={props.title}
      extra={props.extra}
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
          height="80%"
          dataFormat="JSON"
          dataSource={dataSource}
        />
      </div>
    </Card>
  );
};

export default PriceTarget;
