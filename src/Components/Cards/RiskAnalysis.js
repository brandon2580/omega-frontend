import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts/core";
import AngularGauge from "fusioncharts/viz/angulargauge";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, AngularGauge, FusionTheme);

const RiskAnalysis = (props) => {
  const [sharpe, setSharpe] = useState([{}]);
  const [currentRating, setCurrentRating] = useState("Rating");
  const [chartValue, setChartValue] = useState([0]);
  const [theme, setTheme] = useState("");

  useEffect(() => {
    props.darkMode ? setTheme("#000000") : setTheme("#FFFFFF");
  }, [props.darkMode]);

  const dataSource = {
    chart: {
      lowerLimit: "0",
      upperLimit: "100",
      lowerLimitDisplay: "Poor",
      upperLimitDisplay: "Exceptional",
      showValue: "1",
      valueBelowPivot: "1",
      theme: "fusion",
      canvasbgColor: theme,
      canvasbgAlpha: "100",
      canvasBorderThickness: "0",
      bgColor: theme,
      bgAlpha: "100",
      showBorder: "0",
      palettecolors: "#007bff",
      anchorBgColor: "#007bff",
    },
    colorRange: {
      color: [
        {
          minValue: "0",
          maxValue: "25",
          code: "#e44a00",
        },
        {
          minValue: "25",
          maxValue: "50",
          code: "#f8bd19",
        },
        {
          minValue: "50",
          maxValue: "75",
          code: "#6baa01",
        },
        {
          minValue: "75",
          maxValue: "100",
          code: "#006400",
        },
      ],
    },
    dials: {
      dial: [
        {
          value: chartValue,
          bgcolor: "#FFFFFF",
        },
      ],
    },
  };

  useEffect(() => {
    setSharpe(props.data);
  }, [props.data]);

  useEffect(() => {
    if (sharpe < 0.45) {
      setCurrentRating("Poor");
      setChartValue([25]);
    } else if (sharpe <= 0.8 && sharpe >= 0.45) {
      setCurrentRating("Average");
      setChartValue([50]);
    } else if (sharpe <= 1.15 && sharpe >= 0.81) {
      setCurrentRating("Good");
      setChartValue([75]);
    } else if (sharpe > 1.15) {
      setCurrentRating("Exceptional");
      setChartValue([100]);
    }
  }, [sharpe]);

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

      <div className="radial-risk" style={{ height: "456px" }}>
        <ReactFC
          type="angulargauge"
          width="60%"
          height="80%"

          dataFormat="JSON"
          dataSource={dataSource}
        />
      </div>
    </Card>
  );
};

export default RiskAnalysis;
