import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

const ScatterChartCard = (props) => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    setSeries(props.data);
  }, [props.data]);

  const colors = ["white", "#007bff"];

  console.log(series);

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
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <XAxis type="number" dataKey="x" name="Quarter" unit="Q" />
            <YAxis type="number" dataKey="y" name="EPS Value" unit="/share" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter name="Estimates" data={series} fill="#8884d8">
              {series.map((entry, index) => {
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                );
              })}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ScatterChartCard;
