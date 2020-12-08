import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#23807E", "#41FFC9", "#007bff", "#FE3636", "#520000"];

const AnalystRecommendations = (props) => {
  const [series, setSeries] = useState([])

  useEffect(() => {
    setSeries(props.data)
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

export default AnalystRecommendations;
