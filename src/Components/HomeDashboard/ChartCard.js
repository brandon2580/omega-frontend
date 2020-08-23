import React, { useState, useEffect } from "react";
import "../../App.scss";
import { Card } from "antd";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const ChartCard = () => {
  const data = [
    { name: "Page A", uv: 1500, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 1000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 1500, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 1900, pv: 4300, amt: 2100 },
  ];

  return (
    <Card
      title="Chart"
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
            data={data}
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
              dataKey="uv"
              stroke="#1F77B4"
              fill="#1F77B4"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ChartCard;
