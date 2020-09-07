import React from "react";
import "../../App.scss";
import { Card } from "antd";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

const LineChartCard = (props) => {
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
          <LineChart
            data={props.data}
            margin={{
              top: 20,
              right: 50,
              left: 15,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              name={props.dataLabel}
              dataKey="data"
              stroke="#1F77B4"
              fill="#007bff"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default LineChartCard;
