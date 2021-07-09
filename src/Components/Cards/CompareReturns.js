import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import Loader from "react-loader-spinner";
import ReactApexChart from "react-apexcharts";

const CompareReturns = (props) => {
  const [series, setSeries] = useState();
  const [performanceStatus, setPerformanceStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
  }, [props.darkMode]);

  useEffect(() => {
    const compare_returns = fetch(
      `https://sigma7-analytics.azure-api.net/sigma7-analytics/compare_metrics?symbol=${props.activeTicker}&stat=total_return`
    ).then((res) => res.json());

    Promise.resolve(compare_returns).then((compare_returns) => {
      Object.keys(compare_returns).map(function (el, key) {
        let returns = Object.values(compare_returns.peer_metrics).map(
          (peer_return) => {
            return peer_return;
          }
        );
        returns.push(compare_returns.average);
        returns.reverse();
        let names = Object.keys(compare_returns.peer_metrics).map(
          (peer_name) => {
            return peer_name;
          }
        );
        names.push(compare_returns.symbol);
        names.reverse();

        if (compare_returns.average > compare_returns.peerAvg) {
          setPerformanceStatus("Outperforming");
        } else if (compare_returns.average < compare_returns.peerAvg) {
          setPerformanceStatus("Underperforming");
        } else {
          setPerformanceStatus("Equal");
        }

        let mappedObjects = names.map((name, i) => {
          let returnsMap = returns.map((el, i) => {
            return el;
          });

          return {
            x: name,
            y: returnsMap[i].toFixed(2) * 100,
            goals: [
              {
                name: "Avg. Competitor Return",
                value: compare_returns.peerAvg.toFixed(2) * 100,
                strokeWidth: 5,
                strokeColor: "#00E396",
              },
            ],
          };
        });

        let data = [
          {
            name: "Return",
            data: mappedObjects,
          },
        ];

        setSeries(data);
      });
      setIsLoading(false);
    });
  }, [props.activeTicker]);

  let options = {
    chart: {
      height: 350,
      type: "bar",
    },
    dataLabels: {
      formatter: function (val, opt) {
        return val + "%";
      },
    },
    xaxis: {
      labels: {
        formatter: function (val, opt) {
          return val + "%";
        },
        style: {
          colors: [textColor],
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: [textColor],
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    tooltip: {
      y: {
        formatter: function (val, opt) {
          return val + "%";
        },
      },
    },
    colors: ["#007bff"],
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: ["Total Return %", "Average Total Return %"],
      markers: {
        fillColors: ["#007bff", "#00E396"],
      },
      labels: {
        colors: [textColor],
      },
    },
  };

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
        title={props.title}
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
            series={series}
            type="bar"
            height={420}
          />
          <p className="compare-returns-overall center">
            Overall: <span className="blue">{performanceStatus}</span>
          </p>
        </div>
      </Card>
    );
  }
};

export default CompareReturns;
