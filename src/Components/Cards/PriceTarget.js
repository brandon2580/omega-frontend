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
  const [series, setSeries] = useState([]);
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
            observed: prices[key].close,
          };
        }),
      ];

      let mostRecentData = priceTargetData[0].slice(-1).pop();

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

      function getDates(startDate, stopDate) {
        var dateArray = [];
        var currentDate = moment(startDate);
        var stopDate = moment(stopDate);
        while (currentDate <= stopDate) {
          dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
          currentDate = moment(currentDate).add(1, "days");
        }
        return dateArray;
      }

      let yearsWorthOfDates = getDates(mostRecentData.date, formatted);

      let f = yearsWorthOfDates.map((el, i) => {
        return {
          projection: price_target.priceTargetAverage,
          easing: price_target.priceTargetHigh,
          stricter: price_target.priceTargetLow,
          date: el,
        };
      });

      f.unshift({
        projection: mostRecentData.observed,
        easing: mostRecentData.observed,
        stricter: mostRecentData.observed,
        date: "2021-07-23"
      })
      function range(size, startAt = 0) {
        return [...Array(size).keys()].map(i => i + startAt);
    }

    console.log(range(60))

      let z = f.map((el, i) => {
        return priceTargetData[0].push(el)
      })
      console.log(z);

      console.log(priceTargetData[0])

      let projectionData = {
        date: mostRecentData.date,
        observed: mostRecentData.observed,
      };

      // priceTargetData[0].push({
      //   last_updated: price_target.updatedData,
      //   projection: price_target.priceTargetAverage,
      //   easing: price_target.priceTargetHigh,
      //   stricter: price_target.priceTargetLow,
      //   numOfAnalysts: price_target.numberOfAnalysts,
      // },)

      setSeries(priceTargetData[0]);
      // setHigh(priceTargetData[1].high);
      // setAverage(priceTargetData[1].average);
      // setLow(priceTargetData[1].low);
      setIsLoading(false);
    });
  }, [props.activeTicker]);
  console.log(series);
  useEffect(() => {
    if (!isLoading) {
      let recentPrice = series.slice(-1)[0].value;
      setCurrentPrice(recentPrice);
    }
  }, [isLoading, series]);

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
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.dateFormatter.dateFormat = "MMM YYYY";
    chart.numberFormatter.numberFormat = "#.#a";
    chart.numberFormatter.bigNumberPrefixes = [
      { number: 1e3, suffix: "K" },
      { number: 1e6, suffix: "M" },
      { number: 1e9, suffix: "B" },
    ];

    // Chart title
    var title = chart.titles.create();

    // Add data
    chart.data = series;
    //[
    //   {
    //     date: new Date(2020, 0, 1),
    //     observed: 0,
    //   },
    //   {
    //     date: new Date(2020, 1, 1),
    //     observed: 4000,
    //   },
    //   {
    //     date: new Date(2020, 2, 1),
    //     observed: 55000,
    //   },
    //   {
    //     date: new Date(2020, 3, 1),
    //     observed: 220000,
    //   },
    //   {
    //     date: new Date(2020, 4, 1),
    //     observed: 390000,
    //   },
    //   {
    //     date: new Date(2020, 5, 1),
    //     observed: 550000,
    //   },
    //   {
    //     date: new Date(2020, 6, 1),
    //     observed: 720000,
    //     easing: 720000,
    //     projection: 720000,
    //     stricter: 720000,
    //   },
    //   {
    //     date: new Date(2020, 7, 1),
    //     easing: 900000,
    //     projection: 900000,
    //     stricter: 900000,
    //   },
    //   {
    //     date: new Date(2020, 8, 1),
    //     easing: 1053000,
    //     projection: 1053000,
    //     stricter: 1053000,
    //   },
    //   {
    //     date: new Date(2020, 9, 1),
    //     easing: 1252000,
    //     projection: 1249000,
    //     stricter: 1232000,
    //   },
    //   {
    //     date: new Date(2020, 10, 1),
    //     easing: 1674000,
    //     projection: 1604000,
    //     stricter: 1415000,
    //   },
    //   {
    //     date: new Date(2020, 11, 1),
    //     easing: 3212000,
    //     projection: 2342000,
    //     stricter: 1751000,
    //   },
    // ];

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 30;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.verticalCenter = "bottom";
    valueAxis.renderer.labels.template.dx = -5;
    valueAxis.renderer.labels.template.dy = 10;
    valueAxis.renderer.maxLabelPosition = 0.95;
    valueAxis.title.text = "Number of infections";
    valueAxis.title.marginRight = 5;

    // Create series
    function createSeries(field, name, color, dashed) {
      var series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = field;
      series.dataFields.dateX = "date";
      series.name = name;
      series.tooltipText = "[bold]{name}[/]\n{dateX}: [b]{valueY}[/]";
      series.strokeWidth = 2;
      series.smoothing = "monotoneX";
      series.stroke = color;

      if (dashed) {
        series.strokeDasharray = "5 3";
      }

      return series;
    }

    createSeries("observed", "Observed", am4core.color("#B1B106"));
    createSeries("easing", "Easing rules", am4core.color("#D68C45"), true);
    createSeries("stricter", "Stricter rules", am4core.color("#2C6E49"), true);
    createSeries("projection", "Projection", am4core.color("#B1B106"), true);

    chart.legend = new am4charts.Legend();
    chart.cursor = new am4charts.XYCursor();
  });

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
          <div style={{ height: 456 }} id="chartdiv" />
          <p className="price-target-outlook center">
            Outlook: <span className="blue">{outlook}</span>
          </p>
        </div>
      </Card>
    );
  }
};

export default PriceTarget;
