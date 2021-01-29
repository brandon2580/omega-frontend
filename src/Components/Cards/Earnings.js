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

  console.log(dates);

  const dataSource = {
    chart: {
      yaxisname: "EPS",
      ynumberprefix: "$",
      canvasbgColor: "#000000",
      canvasbgAlpha: "100",
      canvasBorderThickness: "0",
      showAlternateHGridColor: "0",
      bgColor: "#000000",
      bgAlpha: "#000000",
      showBorder: "0",
      anchorRadius: "7",
      anchorSides: "1",
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
          height="90%"
          dataFormat="JSON"
          dataSource={dataSource}
        />
      </div>
    </Card>
  );
};

export default Earnings;
