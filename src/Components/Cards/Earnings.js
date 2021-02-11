import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts/core";
import Scatter from "fusioncharts/viz/scatter";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

ReactFC.fcRoot(FusionCharts, Scatter, FusionTheme);

const Earnings = (props) => {
  const [view, setView] = useState("scatter");
  const [consensus, setConsensus] = useState();
  const [actual, setActual] = useState();
  const [barViewData, setBarViewData] = useState([]);
  const [dates, setDates] = useState([]);
  const [theme, setTheme] = useState("");
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    props.darkMode ? setTheme("#000000") : setTheme("#FFFFFF");
    props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
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

    let barViewDataMap = consensusEPS.map((el, i) => {
      return {
        name: formattedDates[i].label,
        consensus: el.y,
        actual: actualEPS[i].y,
      };
    });

    setConsensus(consensusEPS);
    setActual(actualEPS);
    setDates(formattedDates);
    setBarViewData(barViewDataMap);
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
      baseFontColor: textColor,
      toolTipBgColor: theme,
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

  let scatterHeader = (
    <div>
      {props.title}
      <button
        className="btn btn-primary change-view-button"
        onClick={() => setView("bar")}
      >
        Change View
      </button>
    </div>
  );

  let barHeader = (
    <div>
      {props.title}
      <button
        className="btn btn-primary change-view-button"
        onClick={() => setView("scatter")}
      >
        Change View
      </button>
    </div>
  );

  if (view == "scatter") {
    return (
      <Card
        title={scatterHeader}
        extra={props.extra}
        style={{
          height: "100%",
          overflow: "auto",
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
  } else {
    return (
      <Card
        title={barHeader}
        extra={props.extra}
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
        <hr className="card-hr" />
        <div style={{ height: 456 }}>
          <ResponsiveContainer>
            <ComposedChart data={barViewData} width={500} height={400}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="actual" barSize={20} fill="#007bff" />
              <Line dataKey="consensus" stroke="#C0C0C0" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </Card>
    );
  }
};

export default Earnings;
