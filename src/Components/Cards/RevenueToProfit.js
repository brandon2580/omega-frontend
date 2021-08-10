import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import Loader from "react-loader-spinner";

const RevenueToProfit = (props) => {
  const [chartData, setChartData] = useState([]);
  const [theme, setTheme] = useState("");
  const [textColor, setTextColor] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    props.darkMode ? setTheme("#000000") : setTheme("#FFFFFF");
    props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
  }, [props.darkMode]);

  useEffect(() => {
    const income_statement = fetch(
      `https://cloud.iexapis.com/stable/stock/${props.activeTicker}/income/20?token=pk_6fdc6387a2ae4f8e9783b029fc2a3774`
    ).then((res) => res.json());

    Promise.resolve(income_statement).then((data) => {
      let dataArray = data.income.map((el, i) => {
        return {
          date: el.fiscalDate,
          revenue: el.totalRevenue,
          profit: el.netIncome,
        };
      });
      dataArray.reverse()
      setChartData(dataArray);
      setIsLoading(false);
    });
  }, [props.activeTicker]);

  useEffect(() => {
    // Themes begin
    am4core.useTheme(am4themes_dataviz);
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("revenuetoprofitdiv", am4charts.XYChart);

    chart.data = chartData;

    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60;
    dateAxis.startLocation = 0.5;
    dateAxis.endLocation = 0.5;

    chart.numberFormatter.numberFormat = "$#a";
    chart.numberFormatter.bigNumberPrefixes = [
      { number: 1e3, suffix: "K" },
      { number: 1e6, suffix: "M" },
      { number: 1e9, suffix: "B" },
    ];

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.labels.template.fill = textColor;
    dateAxis.renderer.labels.template.fill = textColor;

    var series1 = chart.series.push(new am4charts.LineSeries());
    series1.name = "Revenue";
    series1.dataFields.dateX = "date";
    series1.dataFields.valueY = "revenue";
    series1.tooltipText = "[#000]{valueY.value}[/]";
    series1.tooltip.background.fill = am4core.color("#FFF");
    series1.stroke = am4core.color("#007bff");
    series1.fill = am4core.color("#007bff");
    series1.tooltip.getFillFromObject = false;
    series1.tooltip.getStrokeFromObject = true;
    series1.tooltip.background.strokeWidth = 2;
    series1.sequencedInterpolation = true;
    series1.fillOpacity = 0.6;
    series1.strokeWidth = 2;

    var series2 = chart.series.push(new am4charts.LineSeries());
    series2.name = "Profit";
    series2.dataFields.dateX = "date";
    series2.dataFields.valueY = "profit";
    series2.tooltipText = "[#000]{valueY.value}[/]";
    series2.tooltip.background.fill = am4core.color("#FFF");
    series2.stroke = am4core.color("#00008b");
    series2.fill = am4core.color("#00008b");
    series2.tooltip.getFillFromObject = false;
    series2.tooltip.getStrokeFromObject = true;
    series2.tooltip.background.strokeWidth = 2;
    series2.sequencedInterpolation = true;
    series2.fillOpacity = 0.6;
    series2.defaultState.transitionDuration = 1000;
    series2.strokeWidth = 2;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;

    // Add a legend
    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    chart.legend.labels.template.fill = textColor;

  }, [isLoading, textColor, chartData]);

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
        <div>
          <div style={{ height: 456 }} id="revenuetoprofitdiv" />
        </div>
      </Card>
    );
  }
};

export default RevenueToProfit;
