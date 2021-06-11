import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts/core";
import AngularGauge from "fusioncharts/viz/angulargauge";
import Loader from "react-loader-spinner";

ReactFC.fcRoot(FusionCharts, AngularGauge);

const RiskAnalysis = (props) => {
  const [sharpe, setSharpe] = useState([{}]);
  const [chartValue, setChartValue] = useState([]);
  const [theme, setTheme] = useState("");
  const [dialColor, setDialColor] = useState("");
  const [textColor, setTextColor] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    props.darkMode ? setTheme("#000000") : setTheme("#FFFFFF");
    props.darkMode ? setDialColor("#FFFFFF") : setDialColor("#000000");
    props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
  }, [props.darkMode]);

  useEffect(() => {
    const risk = fetch(
      `${props.apiBaseUrl}/risk_metrics?code=${props.apiCode}==&symbol=${props.activeTicker}`
    ).then((res) => res.json());

    Promise.resolve(risk).then((risk) => {
      let riskData = risk;
      setSharpe(riskData.sharpe_ratio);
      setIsLoading(false);
    });
  }, [props.activeTicker]);

  useEffect(() => {
    if (sharpe < 0.45) {
      setChartValue([12.5]);
    } else if (sharpe <= 0.8 && sharpe >= 0.45) {
      setChartValue([37.5]);
    } else if (sharpe <= 1.15 && sharpe >= 0.81) {
      setChartValue([62.5]);
    } else if (sharpe > 1.15) {
      setChartValue([87.5]);
    }
  }, [sharpe]);

  const dataSource = {
    chart: {
      theme: "fusion",
      lowerLimitDisplay: "Poor",
      upperLimitDisplay: "Exceptional",
      showPivotBorder: 1,
      canvasbgColor: theme,
      bgColor: theme,
      baseFontColor: textColor,
      toolTipBgColor: theme,
      tickValueStep: 5,
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
          bgcolor: dialColor,
        },
      ],
    },
  };

  if (isLoading) {
    return (
      <Card
        className="news-card"
        title={props.title}
        extra={props.extra}
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
        <hr className="card-hr" />

        <Loader
          className="fullyCentered"
          type="Puff"
          color="#007bff"
          height={100}
          width={100}
        />
      </Card>
    );
  } else {
    return (
      <Card
        title={props.title}
        extra={props.extra}
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
        <hr className="card-hr" />
        <div style={{ height: 456 }}>
          <div className="gauge-risk">
            <ReactFC
              type="angulargauge"
              width="100%"
              height="45%"
              dataFormat="JSON"
              dataSource={dataSource}
            />
          </div>
        </div>
      </Card>
    );
  }
};

export default RiskAnalysis;
