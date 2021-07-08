import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import Loader from "react-loader-spinner";

const COLORS = ["#00FF00", "#FF0000"];

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

const EarningsRatio = (props) => {
  const [earningsPeriod, setEarningsPeriod] = useState("Q");
  const [overall, setOverall] = useState("");
  const [series, setSeries] = useState([
    { name: "% Beat", value: 0 },
    { name: "% Missed", value: 0 },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const earnings = fetch(
      `https://cloud.iexapis.com/stable/stock/${props.activeTicker}/earnings/4?token=pk_6fdc6387a2ae4f8e9783b029fc2a3774`
    ).then((res) => res.json());

    Promise.resolve(earnings).then((earnings) => {
      if (earnings.earnings == undefined) {
        setIsLoading(false)
        return null
      } else {
        let earningsRatioData = earnings.earnings.map((el, i) => {
          return {
            consensus: el.consensusEPS,
            actual: el.actualEPS
          }
        })

        let consensus = earningsRatioData.map((el, i) => {
          return el.consensus
        })

        let actual = earningsRatioData.map((el, i) => {
          return el.actual
        })

        let timesMissed = compare(consensus, actual)
        let percentTimesMissed = (timesMissed / 4) * 100;
        let percentTimesBeat = 100 - percentTimesMissed;

        if (percentTimesBeat < 50) {
          setOverall("Poor")
        } else if (percentTimesBeat > 50) {
          setOverall("Great")
        } else if (percentTimesBeat == 50) {
          setOverall("Mixed")
        }

        setSeries([
          { name: "% Beat", value: percentTimesBeat },
          { name: "% Missed", value: percentTimesMissed },
        ]);
        setIsLoading(false);
      }
    });
  }, [earningsPeriod, props.activeTicker]);

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
    return (
      <Card
        className="earningsratio-card"
        title={props.title}
        extra={props.extra}
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
        <hr className="card-hr" />

        <div style={{ height: 456 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={series}
                innerRadius={110}
                outerRadius={140}
                stroke={""}
                paddingAngle={5}
              >
                {series.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <p className="earnings-ratio-overall center">Overall: <span className="blue">{overall}</span></p>

        </div>
      </Card>
    );
  }
};

export default EarningsRatio;
