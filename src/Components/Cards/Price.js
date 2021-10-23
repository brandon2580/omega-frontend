// WIP BUTTON COLORS

import React, { useEffect, useLayoutEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import Loader from "react-loader-spinner";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

const Price = (props) => {
  const [candlestickSeries, setCandlestickSeries] = useState([{}]);
  const [areaSeries, setAreaSeries] = useState([{}]);
  const [priceRange, setPriceRange] = useState("1y");
  const [priceFrame, setPriceFrame] = useState("daily");
  const [buttonBackground, setButtonBackground] = useState("#0e0e0f");
  const [f, setF] = useState("red");
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState("area");
  const [noData, setNoData] = useState(false);
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
  }, [props.darkMode]);

  useLayoutEffect(() => {
    setIsLoading(true);
    const candlestickPrices = fetch(
      `https://cloud.iexapis.com/stable/stock/${props.activeTicker}/chart/${priceRange}?token=pk_6fdc6387a2ae4f8e9783b029fc2a3774`
    ).then((res) => res.json());

    Promise.resolve(candlestickPrices)
      .then((price) => {
        let candlestickData = Object.keys(price).map(function (key) {
          return {
            date: price[key].date,
            open: price[key].open,
            high: price[key].high,
            low: price[key].low,
            close: price[key].close,
          };
        });
        setNoData(false);
        setCandlestickSeries(candlestickData, 2);
        setIsLoading(false);
      })
      .catch((err) => {
        setView("");
        setNoData(true);
        setIsLoading(false);
      });

    const areaPrices = fetch(
      `https://cloud.iexapis.com/stable/stock/${props.activeTicker}/chart/${priceRange}?token=pk_6fdc6387a2ae4f8e9783b029fc2a3774`
    ).then((res) => res.json());

    Promise.resolve(areaPrices)
      .then((price) => {
        let areaData = Object.keys(price).map(function (key) {
          return {
            x: price[key].date,
            y: price[key].close,
            color: "#007bff",
          };
        });
        setNoData(false);
        setAreaSeries(areaData);
        setIsLoading(false);
      })
      .catch((err) => {
        setView("");
        setNoData(true);
        setIsLoading(false);
      });
  }, [priceRange, priceFrame, props.activeTicker]);

  const handleTimeFrameClick = (e) => {
    setPriceRange(e.target.value);
    e.target.style.backgroundColor = "red";
  };

  useEffect(() => {
    am4core.ready(function () {
      const chart = am4core.create("line-div", am4charts.XYChart);

      // Add data
      chart.data = areaSeries;
      chart.numberFormatter.numberFormat = "$#,###";
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
      series.propertyFields.stroke = "color";
      series.propertyFields.fill = "color";
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
      series.fillOpacity = 1;

      const fillModifier = new am4core.LinearGradientModifier();
      fillModifier.opacities = [1, 0];
      fillModifier.offsets = [0, 1];
      fillModifier.gradient.rotation = 270;
      series.segments.template.fillModifier = fillModifier;
    });
  }, [isLoading, areaSeries, view, textColor]);

  // --------------------------------------

  useEffect(() => {
    am4core.ready(function () {
      const chart = am4core.create("candlestick-div", am4charts.XYChart);
      chart.paddingRight = 20;
      chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;

      const series = chart.series.push(new am4charts.CandlestickSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "close";
      series.dataFields.openValueY = "open";
      series.dataFields.lowValueY = "low";
      series.dataFields.highValueY = "high";
      series.tooltipText =
        "Open:${openValueY.value}\nLow:${lowValueY.value}\nHigh:${highValueY.value}\nClose:${valueY.value}";

      // important!
      // candlestick series colors are set in states.
      series.riseFromOpenState.properties.fill = am4core.color("#00ff00");
      series.dropFromOpenState.properties.fill = am4core.color("#FF0000");
      series.riseFromOpenState.properties.stroke = am4core.color("#00ff00");
      series.dropFromOpenState.properties.stroke = am4core.color("#FF0000");

      series.riseFromPreviousState.properties.fillOpacity = 1;
      series.dropFromPreviousState.properties.fillOpacity = 0;

      chart.cursor = new am4charts.XYCursor();

      // a separate series for scrollbar
      const lineSeries = chart.series.push(new am4charts.LineSeries());
      lineSeries.dataFields.dateX = "date";
      lineSeries.dataFields.valueY = "close";
      // need to set on default state, as initially series is "show"
      lineSeries.defaultState.properties.visible = false;

      // hide from legend too (in case there is one)
      lineSeries.hiddenInLegend = true;
      lineSeries.fillOpacity = 0.5;
      lineSeries.strokeOpacity = 0.5;

      chart.data = candlestickSeries;
    });
  }, [isLoading, candlestickSeries, view]);

  // --------------------------------------

  let timeFrameButtons = (
    <div className="row">
      <div className="col-lg-1">
        <button
          className="range-button btn btn-link btn-sm shadow-none"
          style={{ backgroundColor: buttonBackground }}
          value="5y"
          onClick={handleTimeFrameClick}
        >
          5y
        </button>
      </div>
      <div className="col-lg-1">
        <button
          className="range-button btn btn-link btn-sm shadow-none"
          style={{ backgroundColor: buttonBackground }}
          value="2y"
          onClick={handleTimeFrameClick}
        >
          2y
        </button>
      </div>

      <div className="col-lg-1">
        <button
          className="range-button btn btn-link btn-sm shadow-none"
          style={{ backgroundColor: buttonBackground }}
          value="1y"
          onClick={handleTimeFrameClick}
        >
          1y
        </button>
      </div>

      <div className="col-lg-1">
        <button
          className="range-button btn btn-link btn-sm shadow-none"
          style={{ backgroundColor: buttonBackground }}
          value="6m"
          onClick={handleTimeFrameClick}
        >
          6m
        </button>
      </div>

      <div className="col-lg-1">
        <button
          className="range-button btn btn-link btn-sm shadow-none"
          style={{ backgroundColor: buttonBackground }}
          value="3m"
          onClick={handleTimeFrameClick}
        >
          3m
        </button>
      </div>

      <div className="col-lg-1">
        <button
          className="range-button btn btn-link btn-sm shadow-none"
          style={{ backgroundColor: buttonBackground }}
          value="1m"
          onClick={handleTimeFrameClick}
        >
          1m
        </button>
      </div>

      <div className="col-lg-1">
        <button
          className="range-button btn btn-link btn-sm shadow-none"
          style={{ backgroundColor: buttonBackground }}
          value="2w"
          onClick={handleTimeFrameClick}
        >
          2w
        </button>
      </div>

      <div className="col-lg-1">
        <button
          className="range-button btn btn-link btn-sm shadow-none"
          style={{ backgroundColor: buttonBackground }}
          value="ytd"
          onClick={handleTimeFrameClick}
        >
          ytd
        </button>
      </div>
    </div>
  );

  let candlestickExtraHeader = (
    <React.Fragment>
      <button
        className="btn btn-primary change-view-button"
        onClick={() => setView("area")}
      >
        Change View
      </button>
      {props.extra}
    </React.Fragment>
  );


  let areaExtraHeader = (
    <React.Fragment>
      <button
        className="btn btn-primary change-view-button"
        onClick={() => setView("candlestick")}
      >
        Change View
      </button>
      {props.extra}
    </React.Fragment>
  );

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
  } else if (noData) {
    return (
      <Card
        className="hide-overflow price-card"
        title={props.header}
        extra={props.extra}
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
        <hr className="card-hr" />
        <h1 style={{ color: textColor }}>No Price Data :(</h1>
      </Card>
    );
  } else if (view === "area") {
    return (
      <Card
        className="hide-overflow price-card"
        title={props.header}
        extra={areaExtraHeader}
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
        <hr className="card-hr" />
        <div style={{ height: 456 }}>
          <div style={{ height: 410 }} id="line-div" />
          <hr className="price-button-hr" />
          {timeFrameButtons}
        </div>
      </Card>
    );
  } else if (view === "candlestick") {
    return (
      <Card
        className="hide-overflow price-card"
        title={props.header}
        extra={candlestickExtraHeader}
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
        <hr className="card-hr" />
        <div style={{ height: 456 }}>
          <div style={{ height: 410 }} id="candlestick-div" />
          <hr className="price-button-hr" />
          {timeFrameButtons}
        </div>
      </Card>
    );
  }
};
export default Price;
