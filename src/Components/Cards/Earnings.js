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
  ReferenceLine,
} from "recharts";
import Loader from "react-loader-spinner";

ReactFC.fcRoot(FusionCharts, Scatter, FusionTheme);

const Earnings = (props) => {
  const [earningsPeriod, setEarningsPeriod] = useState("Q");
  const [view, setView] = useState("bar");
  const [consensus, setConsensus] = useState();
  const [actual, setActual] = useState();
  const [barViewData, setBarViewData] = useState([]);
  const [dates, setDates] = useState([]);
  const [theme, setTheme] = useState("");
  const [textColor, setTextColor] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    props.darkMode ? setTheme("#000000") : setTheme("#FFFFFF");
    props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
  }, [props.darkMode]);

  useEffect(() => {
    const earnings = fetch(
      `${props.apiBaseUrl}/earnings?code=${props.apiCode}==&symbol=${props.activeTicker}&lastN=4&period=${earningsPeriod}`
    ).then((res) => res.json());

    Promise.resolve(earnings).then((earnings) => {
      let dates = Object.keys(earnings.fiscal_period)
        .sort()
        .map(function (key, i) {
          return earnings.fiscal_period[key];
        });

      let consensusMap = Object.keys(earnings.consensus_eps)
        .sort()
        .map(function (key, i) {
          return {
            x: dates[i],
            y: earnings.consensus_eps[key].toFixed(2),
          };
        });

      let actualMap = Object.keys(earnings.real_eps)
        .sort()
        .map(function (key, i) {
          return {
            x: dates[i],
            y: earnings.real_eps[key].toFixed(2),
          };
        });

      let earningsObject = {
        actual: {
          name: "Actual",
          eps: actualMap,
        },

        consensus: {
          name: "Consensus",
          eps: consensusMap,
        },
      };
      let consensusEPS = earningsObject.consensus.eps.map((el, i) => {
        return {
          x: i + 1,
          y: el.y,
        };
      });

      let actualEPS = earningsObject.actual.eps.map((el, i) => {
        return {
          x: i + 1,
          y: el.y,
        };
      });

      let formattedDates = dates.map((el, i) => {
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
      setIsLoading(false);
    });
  }, [earningsPeriod, props.activeTicker]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

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

  if (isLoading) {
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
              <ComposedChart data={barViewData} width={500}>
                <XAxis dataKey="name" allowDataOverflow={true} />
                <ReferenceLine y={0} stroke="grey" />
                <YAxis />
                <Tooltip
                  formatter={(value, label, props) => {
                    return [value, capitalizeFirstLetter(label)];
                  }}
                />
                <Legend formatter={(label) => capitalizeFirstLetter(label)} />
                <Bar dataKey="actual" barSize={20} fill="#007bff" />
                <Line dataKey="consensus" stroke="#C0C0C0" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Card>
      );
    }
  }
};

export default Earnings;
