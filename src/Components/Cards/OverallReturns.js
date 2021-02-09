import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#00FF00", "#FF0000"];

const OverallReturns = (props) => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    let prices = props.data.slice(2);
    let changes = prices.map((el) => {
      return JSON.stringify(el.change);
    });

    let positiveCount = changes.filter((change) => !change.includes("-")).length;
    let negativeCount = changes.filter((change) => change.includes("-")).length;
    let totalCount = positiveCount + negativeCount;

    let positivePercent = (positiveCount / totalCount) * 100;
    let negativePercent = (negativeCount / totalCount) * 100;

    setSeries([
      {
        name: "Total Days Up",
        value: parseInt(positivePercent.toFixed(2)),
      },
      {
        name: "Total Days Down",
        value: parseInt(negativePercent.toFixed(2)),
      },
    ]);
  }, [props.data]);

  return (
    <Card
      title={props.title}
      extra={props.extra}
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
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default OverallReturns;
