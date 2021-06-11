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
import Loader from "react-loader-spinner";

const COLORS = ["#00FF00", "#FF0000"];

const OverallReturns = (props) => {
  const [series, setSeries] = useState([]);
  const [priceRange, setPriceRange] = useState("1y");
  const [priceFrame, setPriceFrame] = useState("daily");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const prices = fetch(
      `${props.apiBaseUrl}/prices?code=${props.apiCode}==&symbol=${props.activeTicker}&range=${priceRange}&frame=${priceFrame}`
    ).then((res) => res.json());

    Promise.resolve(prices).then((price) => {
      let overallReturnsData = Object.keys(price).map(function (key) {
        return {
          x: key,
          change: price[key].change,
        };
      });

      let prices = overallReturnsData.slice(2);
      let changes = prices.map((el) => {
        return JSON.stringify(el.change);
      });

      let positiveCount = changes.filter(
        (change) => !change.includes("-")
      ).length;
      let negativeCount = changes.filter((change) =>
        change.includes("-")
      ).length;
      let totalCount = positiveCount + negativeCount;

      let positivePercent = (positiveCount / totalCount) * 100;
      let negativePercent = (negativeCount / totalCount) * 100;

      setSeries([
        {
          name: "Total Days Up",
          value: parseFloat(positivePercent.toFixed(2)),
        },
        {
          name: "Total Days Down",
          value: parseFloat(negativePercent.toFixed(2)),
        },
      ]);
      setIsLoading(false);
    });
  }, [priceRange, priceFrame, props.activeTicker]);

  if (isLoading) {
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

        <Loader
          className="fullyCentered"
          type="Puff"
          color="#007bff"
          height={100}
          width={100}
        />
      </Card>
    );
  } else {
    return (
      <Card
        className="overallreturns-card"
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
                innerRadius={110}
                outerRadius={140}
                stroke={""}
                paddingAngle={5}
                label={(obj) => obj.percent * 100 + "%"}
              >
                {series.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip formatter={(value) => value + "%"} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    );
  }
};

export default OverallReturns;
