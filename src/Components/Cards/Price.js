import React, { useEffect, useState } from "react";
import "../../App.scss";
import _ from "lodash";
import { Card } from "antd";
import Loader from "react-loader-spinner";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const Price = (props) => {
  const [candlestickSeries, setCandlestickSeries] = useState([{}]);
  const [areaSeries, setAreaSeries] = useState([{}]);
  const [priceRange, setPriceRange] = useState("1y");
  const [priceFrame, setPriceFrame] = useState("daily");
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState("area");
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
  }, [props.darkMode]);

  useEffect(() => {
    const candlestickPrices = fetch(
      `https://cloud.iexapis.com/stable/stock/${props.activeTicker}/chart/${priceRange}?token=pk_6fdc6387a2ae4f8e9783b029fc2a3774`
    ).then((res) => res.json());

    Promise.resolve(candlestickPrices).then((price) => {
      let candlestickData = Object.keys(price).map(function (key) {
        return {
          date: price[key].date,
          open: price[key].open,
          high: price[key].high,
          low: price[key].low,
          close: price[key].close,
        };
      });
      setCandlestickSeries(candlestickData, 2);
      setIsLoading(false);
    });

    const areaPrices = fetch(
      `https://cloud.iexapis.com/stable/stock/${props.activeTicker}/chart/${priceRange}?token=pk_6fdc6387a2ae4f8e9783b029fc2a3774`
    ).then((res) => res.json());

    Promise.resolve(areaPrices).then((price) => {
      let areaData = Object.keys(price).map(function (key) {
        return {
          x: price[key].date,
          y: price[key].close,
          color: "#007bff",
        };
      });
      setAreaSeries(areaData);
      setIsLoading(false);
    });
  }, [priceRange, priceFrame, props.activeTicker]);

  const changeTimeFrame = (e) => {
    setPriceRange(e.target.value);
  };

  let candlestickHeader = (
    <div>
      {props.title}
      <button
        className="btn btn-primary change-view-button"
        onClick={() => setView("area")}
      >
        Change View
      </button>
    </div>
  );

  let areaHeader = (
    <div>
      {props.title}
      <button
        className="btn btn-primary change-view-button"
        onClick={() => setView("candlestick")}
      >
        Change View
      </button>
    </div>
  );

  // ---------------------------------------------------------

  useEffect(() => {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("line-div", am4charts.XYChart);

    // Add data
    chart.data = areaSeries;
    chart.numberFormatter.numberFormat = "'$' #";
    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;
    dateAxis.renderer.labels.template.fill = textColor;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.fill = textColor;

    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "y";
    series.dataFields.dateX = "x";
    series.strokeWidth = 2;
    series.propertyFields.stroke = "color";
    series.propertyFields.fill = "color";
    series.minBulletDistance = 10;
    series.tooltipText = "{valueY}";
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.fillOpacity = 0.5;
    series.tooltip.label.padding(12, 12, 12, 12);

    // Add scrollbar
    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.series.push(series);
    chart.scrollbarX.background.fill = "white"
    chart.scrollbarX.background.fillOpacity = 0;

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;
    series.fillOpacity = 1;

    var fillModifier = new am4core.LinearGradientModifier();
    fillModifier.opacities = [1, 0];
    fillModifier.offsets = [0, 1];
    fillModifier.gradient.rotation = 90;
    series.segments.template.fillModifier = fillModifier;
  }, [isLoading, areaSeries, view, textColor]);

  // --------------------------------------

  useEffect(() => {
    // Themes begin
    am4core.useTheme(am4themes_dark);
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("candlestick-div", am4charts.XYChart);
    chart.paddingRight = 20;

    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;

    var series = chart.series.push(new am4charts.CandlestickSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "close";
    series.dataFields.openValueY = "open";
    series.dataFields.lowValueY = "low";
    series.dataFields.highValueY = "high";
    series.tooltipText =
      "Open:${openValueY.value}\nLow:${lowValueY.value}\nHigh:${highValueY.value}\nClose:${valueY.value}";

    // important!
    // candlestick series colors are set in states.
    // series.riseFromOpenState.properties.fill = am4core.color("#00ff00");
    // series.dropFromOpenState.properties.fill = am4core.color("#FF0000");
    // series.riseFromOpenState.properties.stroke = am4core.color("#00ff00");
    // series.dropFromOpenState.properties.stroke = am4core.color("#FF0000");

    series.riseFromPreviousState.properties.fillOpacity = 1;
    series.dropFromPreviousState.properties.fillOpacity = 0;

    chart.cursor = new am4charts.XYCursor();

    // a separate series for scrollbar
    var lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.dateX = "date";
    lineSeries.dataFields.valueY = "close";
    // need to set on default state, as initially series is "show"
    lineSeries.defaultState.properties.visible = false;

    // hide from legend too (in case there is one)
    lineSeries.hiddenInLegend = true;
    lineSeries.fillOpacity = 0.5;
    lineSeries.strokeOpacity = 0.5;

    var scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(lineSeries);
    chart.scrollbarX = scrollbarX;

    chart.data = candlestickSeries;
  }, [isLoading, candlestickSeries, view]);

  // --------------------------------------

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
  } else if (view == "area") {
    return (
      <Card
        className="hide-overflow price-card"
        title={areaHeader}
        extra={props.extra}
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
        <hr className="card-hr" />
        <div style={{ height: 456 }}>
          <div style={{ height: 456 }} id="line-div" />

          <div className="row">
            <div className="col-lg-12">
              <button
                className="range-button btn btn-link btn-sm shadow-none"
                value="5y"
                onClick={changeTimeFrame}
              >
                5y
              </button>
              <button
                className="range-button btn btn-link btn-sm shadow-none"
                value="2y"
                onClick={changeTimeFrame}
              >
                2y
              </button>
              <button
                className="range-button btn btn-link btn-sm shadow-none"
                value="1y"
                onClick={changeTimeFrame}
              >
                1y
              </button>
              <button
                className="range-button btn btn-link btn-sm shadow-none"
                value="6m"
                onClick={changeTimeFrame}
              >
                6m
              </button>
              <button
                className="range-button btn btn-link btn-sm shadow-none"
                value="3m"
                onClick={changeTimeFrame}
              >
                3m
              </button>
              <button
                className="range-button btn btn-link btn-sm shadow-none"
                value="1m"
                onClick={changeTimeFrame}
              >
                1m
              </button>
              <button
                className="range-button btn btn-link btn-sm shadow-none"
                value="2w"
                onClick={changeTimeFrame}
              >
                2w
              </button>
              <button
                className="range-button btn btn-link btn-sm shadow-none"
                value="ytd"
                onClick={changeTimeFrame}
              >
                ytd
              </button>
            </div>
          </div>
        </div>
      </Card>
    );
  } else if (view == "candlestick") {
    return (
      <Card
        className="hide-overflow price-card"
        title={candlestickHeader}
        extra={props.extra}
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
        <hr className="card-hr" />
        <div style={{ height: 456 }}>
          <div style={{ height: 456 }} id="candlestick-div" />

          <div className="row">
            <div className="col-lg-12">
              <button
                className="range-button btn btn-link btn-sm shadow-none"
                value="5y"
                onClick={changeTimeFrame}
              >
                5y
              </button>
              <button
                className="range-button btn btn-link btn-sm shadow-none"
                value="2y"
                onClick={changeTimeFrame}
              >
                2y
              </button>
              <button
                className="range-button btn btn-link btn-sm shadow-none"
                value="1y"
                onClick={changeTimeFrame}
              >
                1y
              </button>
              <button
                className="range-button btn btn-link btn-sm shadow-none"
                value="6m"
                onClick={changeTimeFrame}
              >
                6m
              </button>
              <button
                className="range-button btn btn-link btn-sm shadow-none"
                value="3m"
                onClick={changeTimeFrame}
              >
                3m
              </button>
              <button
                className="range-button btn btn-link btn-sm shadow-none"
                value="1m"
                onClick={changeTimeFrame}
              >
                1m
              </button>
              <button
                className="range-button btn btn-link btn-sm shadow-none"
                value="2w"
                onClick={changeTimeFrame}
              >
                2w
              </button>
              <button
                className="range-button btn btn-link btn-sm shadow-none"
                value="ytd"
                onClick={changeTimeFrame}
              >
                ytd
              </button>
            </div>
          </div>
        </div>
      </Card>
    );
  }
};
export default Price;
