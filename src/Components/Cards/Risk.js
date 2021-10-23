import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import Loader from "react-loader-spinner";
import ReactApexChart from "react-apexcharts";

const Risk = (props) => {
  const [series, setSeries] = useState([]);
  const [allTickers, setAllTickers] = useState([]);
  const [overallRisk, setOverallRisk] = useState("");
  const [overallReturn, setOverallReturn] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [noData, setNoData] = useState(false);
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
  }, [props.darkMode]);

  useEffect(() => {
    setIsLoading(true);
    const risk = fetch(
      `https://sigma7-api.azure-api.net/sharpe?symbol=${props.activeTicker}`
    ).then((res) => res.json());

    Promise.resolve(risk)
      .then((el) => {
        let keys = Object.keys(el).map((key) => {
          return key;
        });

        let values = Object.values(el).map((value) => {
          return value;
        });

        if (values[0].std > values[1].std) {
          setOverallRisk("High");
        } else if (values[0].std < values[1].std) {
          setOverallRisk("Low");
        } else {
          setOverallRisk("Average");
        }

        if (values[0].avg_return > values[1].avg_return) {
          setOverallReturn("High");
        } else if (values[0].avg_return < values[1].avg_return) {
          setOverallReturn("Low");
        } else {
          setOverallReturn("Average");
        }

        let mappedSeries = Object.keys(el.peers).map((stock, i) => {
          return {
            name: stock,
            data: [
              [
                Object.values(el.peers)[i].std,
                Object.values(el.peers)[i].avg_return,
                Object.values(el.peers)[i].sharpe,
              ],
            ],
          };
        });

        let sliced = keys.slice(0, 2);
        sliced.map((el, i) => {
          mappedSeries.push({
            name: el,
            data: [[values[i].std, values[i].avg_return, values[i].sharpe]],
          });
        });

        setNoData(false);
        setSeries(mappedSeries);
        setIsLoading(false);
      })
      .catch((err) => {
        setNoData(true);
        setIsLoading(false);
      });
  }, [props.activeTicker]);

  useEffect(() => {
    // Make sure the data exists first
    if (!noData) {
      let updated = series.map((el) => {
        return el.name;
      });
      setAllTickers(updated);
    }
  }, [series]);

  let options = {
    chart: {
      type: "bubble",
      animations: {
        enabled: false,
      },
      height: 350,
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return (
          '<div class="risk-tooltip-content">' +
          "<span>" +
          allTickers[seriesIndex] +
          "</span>" +
          "</div>"
        );
      },
    },
    xaxis: {
      title: {
        text: "Risk",
        style: {
          color: textColor,
          fontSize: "large",
        },
      },
      labels: {
        show: false,
        style: {
          colors: [textColor],
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      title: {
        text: "Return",
        style: {
          color: textColor,
          fontSize: "large",
        },
      },
      labels: {
        show: false,

        style: {
          colors: [textColor],
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  if (isLoading) {
    return (
      <Card
        title={props.header}
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
  } else if (noData) {
    return (
      <Card
        title={props.header}
        extra={props.extra}
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
        <hr className="card-hr" />
        <h1 style={{ color: textColor }}>No Risk Data :(</h1>
      </Card>
    );
  } else {
    return (
      <Card
        title={props.header}
        extra={props.extra}
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
        <hr className="card-hr" />
        <div style={{ height: 456 }}>
          <ReactApexChart
            className="risk-chart"
            options={options}
            series={series}
            type="bubble"
            height={400}
          />
          <p className="risk-potential-risk center">
            Potential Risk: <span className="blue">{overallRisk}</span>
          </p>
          <p className="risk-potential-return center">
            Potential Return: <span className="blue">{overallReturn}</span>
          </p>
        </div>
      </Card>
    );
  }
};

export default Risk;
