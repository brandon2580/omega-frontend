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

const COLORS = ["#23807E", "#41FFC9", "#007bff", "#FE3636", "#520000"];

const AnalystRecommendations = (props) => {
  const [series, setSeries] = useState([]);
  const [totalRecs, setTotalRecs] = useState(0);
  useEffect(() => {
    setSeries(props.data);

    let totalRecsArr = props.data.map((el) => {
      return el.value;
    });

    setTotalRecs(totalRecsArr.reduce((a, b) => a + b, 0));
  }, [props.data]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      let percentOfRecs = (payload[0].value / totalRecs) * 100;
      return (
        <div className="custom-tooltip">
          <p className="recharts-tooltip-label">Number of Recommendations: <span className="blue">{payload[0].value}</span></p>
          <p className="desc">
            Percentage of Recommendations:{" "}
            <span className="blue">{percentOfRecs.toFixed(2)}%</span>
          </p>
        </div>
      );
    }

    return null;
  };

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
              dataKey="value"
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

            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default AnalystRecommendations;
