import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import Loader from "react-loader-spinner";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

const InsiderTrading = (props) => {
  const [chartSeries, setChartSeries] = useState([]);
  const [insiders, setInsiders] = useState([]);
  const [noData, setNoData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
  }, [props.darkMode]);

  useEffect(() => {
    setIsLoading(true);
    const insider_trading = fetch(
      `https://sigma7-api.azure-api.net/insider_trx?symbol=${props.activeTicker}`
    ).then((res) => res.json());

    Promise.resolve(insider_trading)
      .then((insider_trading) => {
        // First, check to see if the length of the array is 0
        // (meaning no data was returned)
        if (insider_trading.transactions.length === 0) {
          setNoData(true);
          setIsLoading(false);
        } else {
          setNoData(false);

          setChartSeries(insider_trading.transactions);
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
      var chart = am4core.create("insidertradingdiv", am4charts.XYChart);

      chart.data = chartSeries;
      chart.numberFormatter.numberFormat = "#a";
      chart.numberFormatter.bigNumberPrefixes = [
        { number: 1e3, suffix: "K" },
        { number: 1e6, suffix: "M" },
        { number: 1e9, suffix: "B" },
      ];

      var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.labels.template.fill = textColor;
      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.labels.template.fill = textColor;

      var series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.name = "Purchase";
      series.dataFields.valueY = "purchase";
      series.tooltipText = "[#000]{valueY.value}[/]";
      series.tooltip.background.stroke = am4core.color("lime");
      series.tooltip.background.fill = am4core.color("white");
      series.stroke = am4core.color("lime");
      series.fill = am4core.color("lime");
      series.tooltip.getStrokeFromObject = false;
      series.tooltip.background.strokeWidth = 3;
      series.tooltip.getFillFromObject = false;

      series.fillOpacity = 0.6;
      series.strokeWidth = 2;

      var series2 = chart.series.push(new am4charts.LineSeries());
      series2.name = "Sale";
      series2.dataFields.dateX = "date";
      series2.dataFields.valueY = "sale";
      series2.tooltipText = "[#000]{valueY.value}[/]";
      series2.tooltip.background.stroke = am4core.color("red");
      series2.stroke = am4core.color("red");
      series2.fill = am4core.color("red");
      series2.tooltip.background.fill = am4core.color("white");
      series2.tooltip.getFillFromObject = false;
      series2.tooltip.getStrokeFromObject = false;
      series2.tooltip.background.strokeWidth = 3;
      series2.fillOpacity = 0.6;
      series2.strokeWidth = 2;

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;

      // Add a legend
      chart.legend = new am4charts.Legend();
      chart.legend.position = "top";
      chart.legend.labels.template.fill = textColor;
    }); // end am4core.ready()
  }, [chartSeries, isLoading, textColor]);

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
        <React.Fragment>
          <h1 style={{ color: textColor }}>No Insider Trading Data :(</h1>
        </React.Fragment>
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
        <React.Fragment>
          <div style={{ height: 440 }} id="insidertradingdiv" />

          {/* <div className="row">
                           <p className="compare-returns-overall center">
                              Overall: <span className="blue"></span>
                           </p>
                        </div> */}
        </React.Fragment>
      </Card>
    );
  }
};

export default InsiderTrading;
