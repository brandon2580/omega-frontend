import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts/core";
import Column2d from "fusioncharts/viz/column2d";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Column2d, FusionTheme);

const Volatility = (props) => {
  const [series, setSeries] = useState([]);
  const [theme, setTheme] = useState("");
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    props.darkMode ? setTheme("#000000") : setTheme("#FFFFFF");
    props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
  }, [props.darkMode]);

  useEffect(() => {
    const volatility = fetch(
      `${props.apiBaseUrl}/compare_metric?code=${props.apiCode}==&symbol=${props.activeTicker}&metric=beta`
    ).then((res) => res.json());

    Promise.resolve(volatility).then((volatility) => {
      let volatilityData = volatility;
      setSeries([
        {
          label: volatilityData.symbol,
          value: volatilityData.beta.toFixed(2),
          color: "#007bff",
        },
        {
          label: "Competitors",
          value: volatilityData.comp_beta.toFixed(2),
          color: "#FF0000",
        },
        {
          label: "DOW 30",
          value: volatilityData.dow_beta.toFixed(2),
          color: "#00FF00",
        },
      ]);
    });
  }, [props.activeTicker]);

  const dataSource = {
    chart: {
      yaxisname: "Beta",
      theme: "fusion",
      canvasbgColor: theme,
      canvasbgAlpha: "100",
      canvasBorderThickness: "0",
      showAlternateHGridColor: "0",
      bgColor: theme,
      bgAlpha: "100",
      showBorder: "0",
      palettecolors: "#007bff",
      drawAnchors: "0",
      showhovereffect: "1",
      crosslinealpha: "25",
      plotcolorintooltip: "1",
      drawcrossline: "1",
      crosslinecolor: "#808080",
      baseFontColor: textColor,
      toolTipBgColor: theme,
    },
    data: series,
  };

  return (
    <Card
      className="hide-overflow volatility-card"
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
          type="column2d"
          width="100%"
          height="80%"
          dataFormat="JSON"
          dataSource={dataSource}
        />
      </div>
    </Card>
  );
};
export default Volatility;
