import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import Loader from "react-loader-spinner";

const ResearchAndDevelopment = (props) => {
  const [chartData, setChartData] = useState([]);
  const [theme, setTheme] = useState("");
  const [textColor, setTextColor] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    props.darkMode ? setTheme("#000000") : setTheme("#FFFFFF");
    props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
  }, [props.darkMode]);

  useEffect(() => {
    setIsLoading(true);
    const balance_sheet = fetch(
      `https://sigma7-nodejs.herokuapp.com/api/income/${props.activeTicker}`
    ).then((res) => res.json());

    Promise.resolve(balance_sheet)
      .then((balance_sheet) => {
        // First, check to see if the object has 0 keys,
        // (meaning no data was returned)
        if (Object.keys(balance_sheet.data).length === 0) {
          setNoData(true);
          setIsLoading(false);
        } else {
          let dataArray = balance_sheet.data.income.map((el, i) => {
            return {
              x: el.fiscalDate,
              y: el.researchAndDevelopment,
            };
          });
          setNoData(false);
          dataArray.reverse();
          setChartData(dataArray);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setNoData(true);
        setIsLoading(false);
      });
  }, [props.activeTicker]);

  useEffect(() => {
    am4core.ready(function () {
      // Create chart instance
      const chart = am4core.create(
        "researchanddevelopmentdiv",
        am4charts.XYChart
      );

      // Add data
      chart.data = chartData;
      chart.numberFormatter.numberFormat = "$#a";
      chart.numberFormatter.bigNumberPrefixes = [
        { number: 1e3, suffix: "K" },
        { number: 1e6, suffix: "M" },
        { number: 1e9, suffix: "B" },
      ];
      // Create axes
      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.minGridDistance = 50;
      dateAxis.renderer.labels.template.fill = textColor;

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.labels.template.fill = textColor;

      // Create series
      const series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = "y";
      series.dataFields.dateX = "x";
      series.strokeWidth = 2;
      series.stroke = am4core.color("#007bff");
      series.minBulletDistance = 10;
      series.tooltipText = "{valueY}";
      series.tooltip.pointerOrientation = "vertical";
      series.tooltip.background.cornerRadius = 20;
      series.tooltip.background.fillOpacity = 0.5;
      series.tooltip.label.padding(12, 12, 12, 12);
      series.tooltip.getFillFromObject = false;
      series.tooltip.getStrokeFromObject = true;
      // Add cursor
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;
      chart.cursor.snapToSeries = series;
    });
  }, [isLoading, chartData, textColor]);

  if (isLoading) {
    return (
      <Card
        className="card"
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
        className="card"
        title={props.header}
        extra={props.extra}
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
        <hr className="card-hr" />
        <h1 style={{ color: textColor }}>No r&d data</h1>
      </Card>
    );
  } else {
    return (
      <Card
        className="card"
        title={props.header}
        extra={props.extra}
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
        <hr className="card-hr" />
        <React.Fragment>
          <div style={{ height: 456 }} id="researchanddevelopmentdiv" />
        </React.Fragment>
      </Card>
    );
  }
};

export default ResearchAndDevelopment;
