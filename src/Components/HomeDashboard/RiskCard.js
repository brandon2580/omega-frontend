import React, { useState, useEffect } from "react";
import "../../App.scss";
import { Card } from "antd";
import { Rnd } from "react-rnd";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const RiskCard = () => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
    },
    {
      name: "Page B",
      uv: 3000,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      amt: 2000,
    },
  ];

  return (
    <Card
      title="Risk Analysis"
      style={{
        height: "100%",
        overflow: "auto",
        scrollbarColor: "#152233 #131722",
      }}
    >
      <hr className="card-hr" />

      <div style={{ height: 456 }}>
        <ResponsiveContainer>
          <BarChart
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
            <Legend />
            <Bar dataKey="uv" fill="#1F77B4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default RiskCard;
