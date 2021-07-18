import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import Loader from "react-loader-spinner";
import ReactApexChart from "react-apexcharts";

const Risk = (props) => {
  const [series, setSeries] = useState([]);
  const [competitors, setCompetitors] = useState([]);
  const [allTickers, setAllTickers] = useState([]);
  const [overallRisk, setOverallRisk] = useState("");
  const [overallReturn, setOverallReturn] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
  }, [props.darkMode]);

  useEffect(() => {
    const risk = fetch(
      `https://sigma7-analytics.azure-api.net/sigma7-analytics/sharpe?symbol=${props.activeTicker}`
    ).then((res) => res.json());

    Promise.resolve(risk).then((el) => {
      let keys = Object.keys(el).map((key) => {
        return key;
      });

      let values = Object.values(el).map((value) => {
        return value;
      });

      setCompetitors(
        Object.keys(values[2]).map((competitor) => {
          return competitor;
        })
      );

      let competitorValues = Object.values(values[2]).map((competitorValue) => {
        return competitorValue;
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

      setSeries([
        {
          name: keys[0],
          data: [[values[0].std, values[0].avg_return, values[0].sharpe]],
        },
        {
          name: keys[1],
          data: [[values[1].std, values[1].avg_return, values[1].sharpe]],
        },
        {
          name: competitors[0],
          data: [
            [
              competitorValues[0].std,
              competitorValues[0].avg_return,
              competitorValues[0].sharpe,
            ],
          ],
        },
        {
          name: competitors[1],
          data: [
            [
              competitorValues[1].std,
              competitorValues[1].avg_return,
              competitorValues[1].sharpe,
            ],
          ],
        },
        {
          name: competitors[2],
          data: [
            [
              competitorValues[2].std,
              competitorValues[2].avg_return,
              competitorValues[2].sharpe,
            ],
          ],
        },
        {
          name: competitors[3],
          data: [
            [
              competitorValues[3].std,
              competitorValues[3].avg_return,
              competitorValues[3].sharpe,
            ],
          ],
        },
      ]);
      
      setIsLoading(false);
    });
  }, [props.activeTicker, isLoading]);

  useEffect(() => {
    let updated = series.map((el) => {
      return el.name;
    });

    setAllTickers(updated);
  }, [series]);

  let options = {
    chart: {
      type: "bubble",
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
