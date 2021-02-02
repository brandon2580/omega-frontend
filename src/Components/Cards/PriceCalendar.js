import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import _ from "lodash";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts/core";
import Radar from "fusioncharts/viz/radar";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Radar, FusionTheme);

const PriceCalendar = (props) => {
  const [series, setSeries] = useState([]);
  const [theme, setTheme] = useState("");
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    props.darkMode ? setTheme("#000000") : setTheme("#FFFFFF");
    props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
  }, [props.darkMode]);

  useEffect(() => {
    setSeries(props.data);
  }, [props.data]);

  const dataSource = {
    chart: {
      decimals: "2",
      showlegend: "0",
      showvalues: "1",
      numbersuffix: "%",
      canvasbgColor: theme,
      radarfillcolor: theme,
      plotfillalpha: "40",
      bgColor: theme,
      bgAlpha: "100",
      showBorder: "0",
      palettecolors: "#007bff",
      anchorBgColor: "#007bff",
      baseFontColor: textColor,
    },
    categories: [
      {
        category: [
          {
            label: "Jan",
          },
          {
            label: "Feb",
          },
          {
            label: "Mar",
          },
          {
            label: "Apr",
          },
          {
            label: "May",
          },
          {
            label: "Jun",
          },
          {
            label: "Jul",
          },
          {
            label: "Aug",
          },
          {
            label: "Sep",
          },
          {
            label: "Oct",
          },
          {
            label: "Nov",
          },
          {
            label: "Dec",
          },
        ],
      },
    ],
    dataset: [
      {
        seriesname: "% Change",
        data: series,
      },
    ],
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
        <ReactFC
          type="radar"
          width="100%"
          height="80%"
          dataFormat="JSON"
          dataSource={dataSource}
        />
      </div>
    </Card>
  );
};
export default PriceCalendar;
