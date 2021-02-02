import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts/core";
import Scatter from "fusioncharts/viz/scatter";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Scatter, FusionTheme);

const Earnings = (props) => {
  const [consensus, setConsensus] = useState();
  const [actual, setActual] = useState();
  const [dates, setDates] = useState([]);
  const [theme, setTheme] = useState("");

  useEffect(() => {
    if (props.darkMode) {
      setTheme("#000000");
    } else {
      setTheme("#FFFFFF");
    }
  }, [props.darkMode]);

  useEffect(() => {
    let consensusEPS = props.consensus.eps.map((el, i) => {
      return {
        x: i + 1,
        y: el.y,
      };
    });

    let actualEPS = props.actual.eps.map((el, i) => {
      return {
        x: i + 1,
        y: el.y,
      };
    });

    let formattedDates = props.dates.map((el, i) => {
      return {
        x: i + 1,
        label: el,
      };
    });
    setConsensus(consensusEPS);
    setActual(actualEPS);
    setDates(formattedDates);
  }, [props.consensus, props.actual, props.dates]);

  const dataSource = {
    chart: {
      yaxisname: "EPS",
      ynumberprefix: "$",
      canvasbgAlpha: "100",
      anchorRadius: "7",
      anchorSides: "1",
      canvasPadding: "50",
      showBorder: "0",
      canvasBorderThickness: "0",
      showAlternateHGridColor: "0",
      canvasbgColor: theme,
      bgColor: theme,
      bgAlpha: "100",
      legendBgColor: theme,
    },
    categories: [{ category: dates }],
    dataset: [
      {
        seriesname: "Consensus",
        color: "#C0C0C0",
        anchorBgColor: "#C0C0C0",
        data: consensus,
      },
      {
        seriesname: "Actual",
        color: "#007bff",
        anchorBgColor: "#007bff",
        data: actual,
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
          type="scatter"
          width="100%"
          height="85%"
          dataFormat="JSON"
          dataSource={dataSource}
        />
      </div>
    </Card>
  );
};

export default Earnings;
