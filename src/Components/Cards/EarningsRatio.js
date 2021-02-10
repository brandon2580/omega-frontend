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

const COLORS = ["#00FF00", "#FF0000"];

function getOccurrence(array, value) {
  var count = 0;
  array.forEach((v) => v === value && count++);
  return count;
}

// This function ultimately returns the amount of times earnings has missed
function compare(consensus, actual) {
  consensus = {};
  actual = {};
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
  const [series, setSeries] = useState([
    { name: "% Beat", value: 0 },
    { name: "% Missed", value: 0 },
  ]);

  useEffect(() => {
    let consensus = props.data[Object.keys(props.data)[0]];
    let actual = props.data[Object.keys(props.data)[1]];
    let timesMissed = compare(consensus, actual);
    let percentTimesMissed = (timesMissed / 4) * 100;
    let percentTimesBeat = 100 - percentTimesMissed;

    setSeries([
      { name: "% Beat", value: percentTimesBeat },
      { name: "% Missed", value: percentTimesMissed },
    ]);
  }, [props.data]);

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
      </div>
    </Card>
  );
};

export default EarningsRatio;
