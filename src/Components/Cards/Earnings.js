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
  const [overall, setOverall] = useState();
  const [barViewData, setBarViewData] = useState([]);
  const [dates, setDates] = useState([]);
  const [theme, setTheme] = useState("");
  const [textColor, setTextColor] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    props.darkMode ? setTheme("#000000") : setTheme("#FFFFFF");
    props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
  }, [props.darkMode]);

  function getOccurrence(array, value) {
    var count = 0;
    array.forEach((v) => v === value && count++);
    return count;
  }

  // This function ultimately returns the amount of times earnings has missed
  function compare(consensus, actual) {
    let consensusData = Object.values(consensus);
    let actualData = Object.values(actual);

    let compareValues = actualData.map((actual, i) => {
      return actual - consensusData[i];
    });

    let negativeOccurences = compareValues.map((value) => {
      return Math.sign(value);
    });

    return getOccurrence(negativeOccurences, -1);
  }

  useEffect(() => {
    const earnings = fetch(
      `https://cloud.iexapis.com/stable/stock/${props.activeTicker}/earnings/4?token=pk_6fdc6387a2ae4f8e9783b029fc2a3774`
    ).then((res) => res.json());

    Promise.resolve(earnings).then((earnings) => {
      if (earnings.earnings == undefined) {
        setIsLoading(false);
        return null;
      } else {
        let earningsArray = earnings.earnings;

        let dates = earningsArray.reverse().map((el, i) => {
          return el.fiscalPeriod;
        });

        let consensusMap = earningsArray.map((el, i) => {
          return {
            x: dates[i],
            y: el.consensusEPS,
          };
        });

        let actualMap = earningsArray.map((el, i) => {
          return {
            x: dates[i],
            y: el.actualEPS,
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

        let plainConsensusArr = consensusEPS.map((el) => {
          return el.y;
        });

        let plainActualArr = actualEPS.map((el) => {
          return el.y;
        });

        let timesMissed = compare(plainConsensusArr, plainActualArr);
        let percentTimesMissed = (timesMissed / 4) * 100;
        let percentTimesBeat = 100 - percentTimesMissed;

        if (percentTimesBeat < 50) {
          setOverall("Underperforming");
        } else if (percentTimesBeat > 50) {
          setOverall("Outperforming");
        } else if (percentTimesBeat == 50) {
          setOverall("Mixed");
        }

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
      }
    });
  }, [earningsPeriod, props.activeTicker]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  console.log(overall);

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
              height="77%"
              dataFormat="JSON"
              dataSource={dataSource}
            />
            <p className="earnings-overall center">
              Overall: <span className="blue">{overall}</span>
            </p>
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
            <ResponsiveContainer height={434}>
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
            <p className="earnings-overall center">
              Overall: <span className="blue">{overall}</span>
            </p>
          </div>
        </Card>
      );
    }
  }
};

export default Earnings;
