import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#007bff", "#FF0000"];

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
  const [series, setSeries] = useState([]);

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
      extra={props.button}
      style={{
        height: "100%",
        overflow: "auto",
        scrollbarColor: "#152233 #131722",
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
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default EarningsRatio;