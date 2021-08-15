import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import Loader from "react-loader-spinner";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const CompareReturns = (props) => {
  const [chartSeries, setChartSeries] = useState([]);
  const [performanceStatus, setPerformanceStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [textColor, setTextColor] = useState("");
  const [timeFrame, setTimeFrame] = useState("1y");

  useEffect(() => {
    props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
  }, [props.darkMode]);

  useEffect(() => {
    setIsLoading(true);
    const compare_returns = fetch(
      `https://sigma7-api.azure-api.net/performance?symbol=${props.activeTicker}&frame=${timeFrame}`
    ).then((res) => res.json());

    Promise.resolve(compare_returns).then((compare_returns) => {
      let returns = Object.values(compare_returns.returns).map(
        (peer_return) => {
          return peer_return;
        }
      );

      let names = Object.keys(compare_returns.returns).map((peer_name) => {
        if (peer_name != "peerAvg") return peer_name;
      });

      if (
        compare_returns.returns[props.activeTicker] > compare_returns.peerAvg
      ) {
        setPerformanceStatus("Outperforming");
      } else if (
        compare_returns.returns[props.activeTicker] < compare_returns.peerAvg
      ) {
        setPerformanceStatus("Underperforming");
      } else {
        setPerformanceStatus("Equal");
      }

      let mappedObjects = names.map((name, i) => {
        let returnsMap = returns.map((el, i) => {
          return el;
        });

        return {
          stock: name,
          return: returnsMap[i].toFixed(2),
          avg_competitor_return: compare_returns.peerAvg.toFixed(2),
          color: "#007bff",
        };
      });

      let data = mappedObjects;

      setChartSeries(data);
      setIsLoading(false);
    });
  }, [props.activeTicker, timeFrame]);

  useEffect(() => {
    am4core.ready(function () {
      var chart = am4core.create("comparediv", am4charts.XYChart);

      chart.data = chartSeries;
      chart.numberFormatter.numberFormat = "#'%";

      //create category axis for years
      var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "stock";
      categoryAxis.renderer.inversed = true;
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.labels.template.fill = textColor;
      categoryAxis.cursorTooltipEnabled = false;

      //create value axis for income and expenses
      var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.opposite = true;
      valueAxis.renderer.labels.template.fill = textColor;

      //create columns
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.categoryY = "stock";
      series.dataFields.valueX = "return";
      series.name = "Return";
      series.tooltipText = "{categoryY}: {valueX.value}";
      series.columns.template.propertyFields.fill = "color";
      series.stroke = am4core.color("#007bff");
      series.fill = am4core.color("#007bff");

      //create line
      var lineSeries = chart.series.push(new am4charts.LineSeries());
      lineSeries.dataFields.categoryY = "stock";
      lineSeries.dataFields.valueX = "avg_competitor_return";
      lineSeries.name = "Average Competitor Return";
      lineSeries.strokeWidth = 3;
      lineSeries.tooltipText = "Average Competitor Return: {valueX.value}";
      lineSeries.tooltip.fill = am4core.color("orange");
      lineSeries.stroke = am4core.color("orange");
      lineSeries.fill = am4core.color("orange");
      //add bullets
      var bullet = lineSeries.bullets.push(new am4charts.Bullet());
      bullet.fill = am4core.color("orange");
      var circle = bullet.createChild(am4core.Circle);
      circle.radius = 4;
      circle.fill = am4core.color("#fff");
      circle.strokeWidth = 3;

      //add chart cursor
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.behavior = "zoomY";

      chart.legend = new am4charts.Legend();
      chart.legend.labels.template.fill = textColor;
      chart.legend.useDefaultMarker = true;
    });
  }, [chartSeries, isLoading, textColor, timeFrame]);

  const changeTimeFrame = (e) => {
    setTimeFrame(e.target.value);
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
        <React.Fragment>
          <div style={{ height: 440 }} id="comparediv" />

          <div className="row">
            <div className="col-lg-4">
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
                value="ytd"
                onClick={changeTimeFrame}
              >
                ytd
              </button>
            </div>

            <p className="compare-returns-overall center">
              Overall: <span className="blue">{performanceStatus}</span>
            </p>
          </div>
        </React.Fragment>
      </Card>
    );
  }
};

export default CompareReturns;
