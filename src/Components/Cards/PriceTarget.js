import React, { useEffect, useState } from "react";
import "../../App.scss";
import _ from "lodash";
import { Card } from "antd";
import Loader from "react-loader-spinner";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import moment from "moment";
const PriceTarget = (props) => {
  const [chartData, setChartData] = useState([]);
  const [futureDateOneYear, setFutureDateOneYear] = useState("");
  const [mostRecentData, setMostRecentData] = useState("");
  const [high, setHigh] = useState();
  const [average, setAverage] = useState();
  const [low, setLow] = useState();
  const [currentPrice, setCurrentPrice] = useState();
  const [outlook, setOutlook] = useState("");
  const [theme, setTheme] = useState("");
  const [textColor, setTextColor] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    props.darkMode ? setTheme("#000000") : setTheme("#FFFFFF");
    props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
  }, [props.darkMode]);

  useEffect(() => {
    const price_target = fetch(
      `https://cloud.iexapis.com/stable/stock/${props.activeTicker}/price-target?token=pk_6fdc6387a2ae4f8e9783b029fc2a3774`
    ).then((res) => res.json());

    const prices = fetch(
      `https://cloud.iexapis.com/stable/stock/${props.activeTicker}/chart/1y?token=pk_6fdc6387a2ae4f8e9783b029fc2a3774`
    ).then((res) => res.json());

    const allReqs = [prices, price_target];

    Promise.all(allReqs).then((allResp) => {
      const [prices, price_target] = allResp;

      let priceTargetData = [
        Object.keys(prices).map(function (key) {
          return {
            date: prices[key].date,
            value: prices[key].close,
            color: "#007bff"
          };
        }),
        {
          last_updated: price_target.updatedData,
          average: price_target.priceTargetAverage,
          high: price_target.priceTargetHigh,
          low: price_target.priceTargetLow,
          numOfAnalysts: price_target.numberOfAnalysts,
        },
      ];

      function getFormattedDate(date) {
        var d = new Date(date),
          month = "" + (d.getMonth() + 1),
          day = "" + d.getDate(),
          year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
      }

      let oneYearFromNow = new Date();

      oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

      let formatted = getFormattedDate(oneYearFromNow);
      setFutureDateOneYear(formatted);

      setMostRecentData(priceTargetData[0].slice(-1).pop());

      setChartData(priceTargetData[0]);
       setHigh(priceTargetData[1].high);
       setAverage(priceTargetData[1].average);
       setLow(priceTargetData[1].low);
      setIsLoading(false);
    });
  }, [props.activeTicker]);

  useEffect(() => {
    if (!isLoading) {
      let recentPrice = chartData.slice(-1)[0].value;
      setCurrentPrice(recentPrice);
    }
  }, [isLoading, chartData]);

  useEffect(() => {
    function percentChange(a, b) {
      return ((b - a) / a) * 100;
    }

    let diff = percentChange(currentPrice, average);
    if (diff > 8) {
      setOutlook("Great");
    } else if (diff <= 8 && diff >= -8) {
      setOutlook("Neutral");
    } else if (diff < -8) {
      setOutlook("Poor");
    }
  }, [currentPrice, average]);

  useEffect(() => {
    // Themes begin
    am4core.useTheme(am4themes_dark);
    // Themes end

    // Create chart instance
    var chart = am4core.create("pricetargetdiv", am4charts.XYChart);

    // Enable chart cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.disabled = true;
    chart.cursor.lineY.disabled = true;

    // Enable scrollbar
    chart.scrollbarX = new am4core.Scrollbar();

    // Add data
    chart.data = chartData;

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0.5;
    dateAxis.dateFormatter.inputDateFormat = "yyyy-MM-dd";
    dateAxis.renderer.minGridDistance = 40;
    dateAxis.tooltipDateFormat = "MMM dd, yyyy";
    dateAxis.dateFormats.setKey("day", "dd");
    dateAxis.renderer.labels.template.fill = textColor;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.fill = textColor;

    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.tooltipText = "{date}\n[bold font-size: 17px]${valueY}[/]";
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.propertyFields.stroke = "color"
    series.propertyFields.fill = "color"

    function createTrendLine(data) {
      var trend = chart.series.push(new am4charts.LineSeries());
      trend.dataFields.valueY = "value";
      trend.dataFields.dateX = "date";
      trend.strokeDasharray = 3;

      trend.strokeWidth = 2;
      trend.propertyFields.stroke = "color"
      trend.propertyFields.fill = "color"
      trend.data = data;

      var bullet = trend.bullets.push(new am4charts.CircleBullet());
      bullet.tooltipText = "{date}\n[bold font-size: 17px]${valueY}[/]";
      bullet.strokeWidth = 2;
      bullet.propertyFields.stroke = "color"
      bullet.propertyFields.fill = "color"

      var hoverState = bullet.states.create("hover");
      hoverState.properties.scale = 1.7;

      return trend;
    }

    createTrendLine([
      { date: mostRecentData.date, value: mostRecentData.value, color: am4core.color("#00FF00") },
      { date: futureDateOneYear, value: high, color: am4core.color("#00FF00") },
    ]);

    createTrendLine([
      { date: mostRecentData.date, value: mostRecentData.value, color: am4core.color("#808080") },
      { date: futureDateOneYear, value: average, color: am4core.color("#808080") },
    ]);

    createTrendLine([
      { date: mostRecentData.date, value: mostRecentData.value, color: am4core.color("#FF0000") },
      { date: futureDateOneYear, value: low, color: am4core.color("#FF0000") },
    ]);
  }, [chartData, isLoading, futureDateOneYear, mostRecentData, high, average, low, textColor]);

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
        className="pricetarget-card"
        title={props.title}
        extra={props.extra}
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
        <hr className="card-hr" />
        <div style={{ height: 456 }}>
          <div style={{ height: 456 }} id="pricetargetdiv" />
          <p className="price-target-outlook center">
            Outlook: <span className="blue">{outlook}</span>
          </p>
        </div>
      </Card>
    );
  }
};

export default PriceTarget;
