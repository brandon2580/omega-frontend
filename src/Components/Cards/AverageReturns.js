import React, { useState, useEffect } from "react";
import "../../App.scss";
import { Card } from "antd";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts/core";
import Bubble from "fusioncharts/viz/bubble";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Bubble, FusionTheme);

const AverageReturns = (props) => {
  const [series, setSeries] = useState({
    avg_gain: 0,
    avg_loss: 0,
    gain_ratio: 0,
    loss_ratio: 0,
    num_gain: 0,
    num_loss: 0,
  });
  const [theme, setTheme] = useState("");
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    props.darkMode ? setTheme("#000000") : setTheme("#FFFFFF");
    props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
  }, [props.darkMode]);
  useEffect(() => {
    const average_returns = fetch(
      `${props.apiBaseUrl}/return_compare?code=${props.apiCode}==&symbol=${props.activeTicker}`
    ).then((res) => res.json());

    Promise.resolve(average_returns).then((average_returns) => {
      let averageReturnsData = average_returns;
      setSeries(averageReturnsData);
    });
  }, [props.activeTicker]);

  useEffect(() => {}, [props.data]);

  const dataSource = {
    chart: {
      numberPrefix: "$",
      rotateLabels: 0,
      showLegend: 1,
      legendPosition: "bottom",
      canvasbgColor: theme,
      canvasbgAlpha: "100",
      canvasBorderThickness: "0",
      showAlternateHGridColor: "0",
      bgColor: theme,
      toolTipBgColor: theme,
      baseFontColor: textColor,
      bgAlpha: "100",
      showBorder: "0",
      palettecolors: "#007bff",
      anchorBgColor: "#007bff",
      yAxisMinValue: ".5",
      yAxisMaxValue: "1.5",
      showYAxisValues: 0,
    },
    categories: [
      {
        category: [
          {
            x: "1",
          },
          {
            x: "2",
          },
          {
            x: "3",
          },
          {
            x: "4",
          },
        ],
      },
    ],
    dataset: [
      {
        data: [
          {
            name: "Gain Ratio",
            tooltext: `Gain Ratio: ${series.gain_ratio.toFixed(
              2
            )}{br}Average Gain: ${
              series.avg_gain.toFixed(2) * 100
            }%{br}Number of Gains: ${series.num_gain}`,
            x: "2",
            y: "1",
            z: series.gain_ratio,
            color: "#00FF00",
          },
          {
            name: "Loss Ratio",
            tooltext: `Loss Ratio: ${series.loss_ratio.toFixed(
              2
            )}{br}Average Loss: ${
              series.avg_loss.toFixed(2) * 100
            }%{br}Number of Losses: ${series.num_loss}`,
            x: "3",
            y: "1",
            z: series.loss_ratio,
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
        <div className="row">
          <div className="col-lg-12 d-flex flex-row justify-content-center align-items-center">
            <svg
              class="recharts-surface"
              width="14"
              height="14"
              style={{
                display: "inlineBlock",
                verticalAlign: "middle",
                marginRight: "4px",
              }}
              viewBox="0 0 32 32"
              version="1.1"
            >
              <path
                stroke="none"
                fill="#00FF00"
                d="M0,4h32v24h-32z"
                class="recharts-legend-icon"
              ></path>
            </svg>
            <span style={{ marginRight: "15px" }}>Total Gain</span>
            <svg
              class="recharts-surface"
              width="14"
              height="14"
              style={{
                display: "inlineBlock",
                verticalAlign: "middle",
                marginRight: "4px",
              }}
              viewBox="0 0 32 32"
              version="1.1"
            >
              <path
                stroke="none"
                fill="#FF0000"
                d="M0,4h32v24h-32z"
                class="recharts-legend-icon"
              ></path>
            </svg>
            <span>Total Loss</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AverageReturns;
