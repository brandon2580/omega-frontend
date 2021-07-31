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



// import React, { useEffect, useState } from "react";
// import "../../App.scss";
// import { Card } from "antd";
// import Loader from "react-loader-spinner";
// import ReactApexChart from "react-apexcharts";
// import * as am4core from "@amcharts/amcharts4/core";
// import * as am4charts from "@amcharts/amcharts4/charts";
// import am4themes_dark from "@amcharts/amcharts4/themes/dark";
// import am4themes_animated from "@amcharts/amcharts4/themes/animated";

// const Risk = (props) => {
//   const [chartData, setChartData] = useState([]);
//   const [competitors, setCompetitors] = useState([]);
//   const [allTickers, setAllTickers] = useState([]);
//   const [overallRisk, setOverallRisk] = useState("");
//   const [overallReturn, setOverallReturn] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [textColor, setTextColor] = useState("");

//   useEffect(() => {
//     props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
//   }, [props.darkMode]);

//   useEffect(() => {
//     const risk = fetch(
//       `https://sigma7-analytics.azure-api.net/sigma7-analytics/sharpe?symbol=${props.activeTicker}`
//     ).then((res) => res.json());

//     Promise.resolve(risk).then((el) => {
//       let keys = Object.keys(el).map((key) => {
//         return key;
//       });

//       let values = Object.values(el).map((value) => {
//         return value;
//       });

//       setCompetitors(
//         Object.keys(values[2]).map((competitor) => {
//           return competitor;
//         })
//       );

//       let competitorValues = Object.values(values[2]).map((competitorValue) => {
//         return competitorValue;
//       });

//       if (values[0].std > values[1].std) {
//         setOverallRisk("High");
//       } else if (values[0].std < values[1].std) {
//         setOverallRisk("Low");
//       } else {
//         setOverallRisk("Average");
//       }

//       if (values[0].avg_return > values[1].avg_return) {
//         setOverallReturn("High");
//       } else if (values[0].avg_return < values[1].avg_return) {
//         setOverallReturn("Low");
//       } else {
//         setOverallReturn("Average");
//       }

//       setChartData([
//         {
//           name: keys[0],
//           std: values[0].std,
//           avg_return: values[0].avg_return,
//           sharpe: competitorValues[0].sharpe,
//         },
//         {
//           name: keys[1],
//           std: values[1].std,
//           avg_return: values[1].avg_return,
//           sharpe: competitorValues[1].sharpe,
//         },
//         {
//           name: competitors[0],
//           std: competitorValues[0].std,
//           avg_return: competitorValues[0].avg_return,
//           sharpe: competitorValues[0].sharpe,
//         },
//         {
//           name: competitors[1],
//           std: competitorValues[1].std,
//           avg_return: competitorValues[1].avg_return,
//           sharpe: competitorValues[1].sharpe,
//         },
//         {
//           name: competitors[2],
//           std: competitorValues[2].std,
//           avg_return: competitorValues[2].avg_return,
//           sharpe: competitorValues[2].sharpe,
//         },
//         {
//           name: competitors[3],
//           std: competitorValues[3].std,
//           avg_return: competitorValues[3].avg_return,
//           sharpe: competitorValues[3].sharpe,
//         },
//       ]);

//       setIsLoading(false);
//     });
//   }, [props.activeTicker, isLoading]);

//   useEffect(() => {
//     let updated = chartData.map((el) => {
//       return el.name;
//     });

//     setAllTickers(updated);
//   }, [chartData]);

//   console.log(chartData);

//   useEffect(() => {
//     // Themes begin
//     am4core.useTheme(am4themes_dark);
//     am4core.useTheme(am4themes_animated);
//     // Themes end

//     // Create chart instance
//     var chart = am4core.create("riskdiv", am4charts.XYChart);
//     chart.colors.step = 3;

//     // Add data
//     chart.data = chartData;

//     // Create axes
//     var xAxis = chart.xAxes.push(new am4charts.ValueAxis());
//     xAxis.renderer.minGridDistance = 50;
//     xAxis.title.text = "Risk";
//     xAxis.title.fontWeight = "bold";
//     xAxis.title.fontSize = 24;

//     var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
//     yAxis.renderer.minGridDistance = 50;
//     yAxis.title.text = "Return";
//     yAxis.title.fontWeight = "bold";
//     yAxis.title.fontSize = 24;



//     // Create series #1
//     var series = chart.series.push(new am4charts.LineSeries());
//     series.dataFields.valueY = "avg_return";
//     series.dataFields.valueX = "std";
//     series.dataFields.value = "sharpe";
//     series.strokeOpacity = 0;

//     var bullet = series.bullets.push(new am4charts.CircleBullet());
//     bullet.strokeOpacity = 0.2;
//     bullet.stroke = am4core.color("#ffffff");
//     bullet.nonScalingStroke = true;
//     bullet.tooltipText = "{name}";
//     series.heatRules.push({
//       target: bullet.circle,
//       min: 10,
//       max: 60,
//       property: "radius",
//     });


//   }, [chartData, isLoading]);

//   if (isLoading) {
//     return (
//       <Card
//         title={props.title}
//         extra={props.extra}
//         style={{
//           height: "100%",
//           overflow: "auto",
//         }}
//       >
//         <hr className="card-hr" />

//         <Loader
//           className="fullyCentered"
//           type="Puff"
//           color="#007bff"
//           height={100}
//           width={100}
//         />
//       </Card>
//     );
//   } else {
//     return (
//       <Card
//         title={props.title}
//         extra={props.extra}
//         style={{
//           height: "100%",
//           overflow: "auto",
//         }}
//       >
//         <hr className="card-hr" />
//         <div style={{ height: 456 }}>
//           <div style={{ height: 456 }} id="riskdiv" />
//           <p className="risk-potential-risk center">
//             Potential Risk: <span className="blue">{overallRisk}</span>
//           </p>
//           <p className="risk-potential-return center">
//             Potential Return: <span className="blue">{overallReturn}</span>
//           </p>
//         </div>
//       </Card>
//     );
//   }
// };

// export default Risk;
