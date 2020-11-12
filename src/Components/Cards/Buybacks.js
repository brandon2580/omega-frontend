import React from "react";
import "../../App.scss";
import { Card } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Buybacks = (props) => {
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
          <BarChart
            data={props.data}
            margin={{
              top: 20,
              right: 50,
              left: 15,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip cursor={{fill: 'grey', opacity: "10%"}} />
            <Legend />
            <Bar name={props.dataLabel} dataKey="data" fill="#1F77B4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default Buybacks;
