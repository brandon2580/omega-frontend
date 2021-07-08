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
import ReactApexChart from "react-apexcharts";
import Loader from "react-loader-spinner";

const COLORS = ["#41FFC9", "#23807E", "#808080", "#FE3636", "#520000"];

const AnalystRecommendations = (props) => {
  const [pieSeries, setPieSeries] = useState([]);
  const [barSeries, setBarSeries] = useState([]);
  const [totalRecs, setTotalRecs] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [overall, setOverall] = useState("");
  const [view, setView] = useState("bar");
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
  }, [props.darkMode]);

  useEffect(() => {
    const analyst_recs = fetch(
      `https://cloud.iexapis.com/stable/stock/${props.activeTicker}/recommendation-trends?token=pk_6fdc6387a2ae4f8e9783b029fc2a3774`
    ).then((res) => res.json());

    Promise.resolve(analyst_recs).then((analyst_recs) => {
      if (analyst_recs[0] == undefined) {
        setIsLoading(false)
        return null
      } else {
        let pieSeriesData = [
          { name: "Strong Buy", value: analyst_recs[0].ratingOverweight },
          { name: "Buy", value: analyst_recs[0].ratingBuy },
          { name: "Hold", value: analyst_recs[0].ratingHold },
          { name: "Sell", value: analyst_recs[0].ratingSell },
          { name: "Strong Sell", value: analyst_recs[0].ratingUnderweight },
        ];

        let barSeriesData = [
          {
            data: [
              analyst_recs[0].ratingOverweight,
              analyst_recs[0].ratingBuy,
              analyst_recs[0].ratingHold,
              analyst_recs[0].ratingSell,
              analyst_recs[0].ratingUnderweight,
            ],
          },
        ];

        setPieSeries(pieSeriesData);
        setBarSeries(barSeriesData);

        let totalRecsArr = pieSeriesData.map((el) => {
          return el.value;
        });

        let buyRecs = totalRecsArr[0] + totalRecsArr[1];
        let holdRecs = totalRecsArr[2];
        let sellRecs = totalRecsArr[3] + totalRecsArr[4];

        let simplifiedArr = [buyRecs, holdRecs, sellRecs];

        const max = simplifiedArr.reduce((m, n) => Math.max(m, n));
        let overallIndex = [...simplifiedArr.keys()].filter(
          (i) => simplifiedArr[i] === max
        );

        if (overallIndex == 0) {
          setOverall("Buy");
        } else if (overallIndex == 1) {
          setOverall("Hold");
        } else if (overallIndex == 2) {
          setOverall("Sell");
        } else {
          setOverall("Mixed");
        }

        setTotalRecs(totalRecsArr.reduce((a, b) => a + b, 0));
        setIsLoading(false);
      }
    });
  }, [props.activeTicker]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      let percentOfRecs = (payload[0].value / totalRecs) * 100;
      return (
        <div className="custom-tooltip">
          <p className="recharts-tooltip-label">
            Number of Recommendations:{" "}
            <span className="blue">{payload[0].value}</span>
          </p>
          <p className="desc">
            Percentage of Recommendations:{" "}
            <span className="blue">{percentOfRecs.toFixed(2)}%</span>
          </p>
        </div>
      );
    }

    return null;
  };

  const options = {
    chart: {
      type: "bar",
    },
    tooltip: {
      x: {
        show: true,
      },
      y: {
        title: {
          formatter: function () {
            return "";
          },
        },
      },
    },
    plotOptions: {
      bar: {
        barHeight: "75%",
        borderRadius: 10,
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: "bottom",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: COLORS,
    xaxis: {
      categories: ["Strong Buy", "Buy", "Hold", "Sell", "Strong Sell"],
      labels: {
        style: {
          colors: [textColor]
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: [textColor]
        }
      }
    },
    legend: {
      labels: {
        colors: [textColor]
      }
    },
    grid: {
      row: {
        colors: "#2D2D2D",
        opacity: 1,
      },
      column: {
        colors: "#2D2D2D",
        opacity: 1,
      },
    },
  };

  let pieHeader = (
    <div>
      {props.title}
      <button
        className="btn btn-primary change-view-button"
        onClick={() => setView("bar")}
      >
        Change View
      </button>
    </div>
  );

  let barHeader = (
    <div>
      {props.title}
      <button
        className="btn btn-primary change-view-button"
        onClick={() => setView("pie")}
      >
        Change View
      </button>
    </div>
  );

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
    if (view == "pie") {
      return (
        <Card
          className="analystrecs-card"
          title={pieHeader}
          extra={props.extra}
          style={{
            height: "100%",
            overflow: "auto",
          }}
        >
          <hr className="card-hr" />

          <div style={{ height: 456 }}>
            <ResponsiveContainer height={420}>
              <PieChart>
                <Pie
                  data={pieSeries}
                  dataKey="value"
                  innerRadius={110}
                  outerRadius={140}
                  stroke={""}
                  paddingAngle={5}
                >
                  {pieSeries.map((entry, index) => (
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
            <p className="analyst-recs-overall-pie center">Overall: <span className="blue">{overall}</span></p>
          </div>
        </Card>
      );
    } else {
      return (
        <Card
          className="analystrecs-card"
          title={barHeader}
          extra={props.extra}
          style={{
            height: "100%",
            overflow: "auto",
          }}
        >
          <hr className="card-hr" />

          <div style={{ height: 456 }}>
            <ReactApexChart
              options={options}
              series={barSeries}
              type="bar"
              height={420}
            />
            <p className="analyst-recs-overall-bar center">Overall: <span className="blue">{overall}</span></p>
          </div>
        </Card>
      );
    }
  }
};

export default AnalystRecommendations;
