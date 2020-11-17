import React, { useEffect, useState } from "react";
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
  ReferenceLine,
} from "recharts";

const PriceTarget = (props) => {
  const [series, setSeries] = useState();
  const [high, setHigh] = useState();
  const [average, setAverage] = useState();
  const [low, setLow] = useState();
  
  useEffect(() => {
    setSeries(props.data[0]);
    setHigh(props.data[1].high);
    setAverage(props.data[1].average);
    setLow(props.data[1].low);
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
          <LineChart
            data={series}
            margin={{
              top: 20,
              right: 50,
              left: 15,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend
              verticalAlign="bottom"
              align="center"
              payload={[
                { id: "High Estimate", value: "High Estimate", type: "line", color: "lime" },
                { id: "Average Estimate", value: "Average Estimate", type: "line", color: "grey" },
                { id: "Low Estimate", value: "Low Estimate", type: "line", color: "red" },
              ]}
            />
            <ReferenceLine y={high} stroke="lime" alwaysShow={true} />
            <ReferenceLine y={average} stroke="grey" alwaysShow={true} />
            <ReferenceLine y={low} stroke="red" alwaysShow={true} />
            <Line
              type="monotone"
              dot={false}
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

export default PriceTarget;
