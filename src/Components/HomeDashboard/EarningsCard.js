import React, { useState, useEffect } from "react";
import "../../App.scss";
import { Card } from "antd";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

const EarningsCard = () => {
  const data = [
    { name: "Group A", value: 70 },
    { name: "Group B", value: 30 },
  ];

  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <Card
      title="Earnings"
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
              data={data}
              innerRadius={120}
              outerRadius={160}
              stroke={""}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
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

export default EarningsCard;
