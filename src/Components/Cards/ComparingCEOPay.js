import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import Loader from "react-loader-spinner";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

const ComparingCEOPay = (props) => {
  const [chartSeries, setChartSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
  }, [props.darkMode]);

  useEffect(() => {
    setIsLoading(true);
    const ceo_pay = fetch(
      `https://sigma7-api.azure-api.net/ceo_pay?symbol=${props.activeTicker}`
    ).then((res) => res.json());

    Promise.resolve(ceo_pay).then((ceo_pay) => {
      let names = Object.keys(ceo_pay.peers).map((el) => {
        return {
          name: el,
        };
      });

      let values = Object.values(ceo_pay.peers).map((el, i) => {
        return {
          value: el.toFixed(2),
          name: Object.values(names[i])[0],
          avg_peer_pay: ceo_pay.peerAvg.toFixed(2),
        };
      });

      setChartSeries(values);

      setIsLoading(false);
    });
  }, [props.activeTicker]);

  useEffect(() => {
    am4core.ready(function () {
      var chart = am4core.create("compare-ceo-div", am4charts.XYChart);
      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

      chart.paddingRight = 40;

      chart.data = chartSeries;
      chart.numberFormatter.numberFormat = "$#a";
      chart.numberFormatter.bigNumberPrefixes = [
        { number: 1e3, suffix: "K" },
        { number: 1e6, suffix: "M" },
        { number: 1e9, suffix: "B" },
      ];

      //create category axis for years
      var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "name";
      categoryAxis.renderer.inversed = true;
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.labels.template.fill = textColor;
      categoryAxis.cursorTooltipEnabled = false;

      //create value axis for income and expenses
      var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.opposite = true;
      valueAxis.renderer.labels.template.fill = textColor;

      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.categoryY = "name";
      series.dataFields.valueX = "value";
      series.name = "CEO Pay";
      series.tooltipText = "{categoryY}: {valueX.value}";
      series.columns.template.propertyFields.fill = "color";
      series.stroke = am4core.color("#007bff");
      series.fill = am4core.color("#007bff");

      //create line
      var lineSeries = chart.series.push(new am4charts.LineSeries());
      lineSeries.dataFields.categoryY = "name";
      lineSeries.dataFields.valueX = "avg_peer_pay";
      lineSeries.name = "Average CEO Pay";
      lineSeries.strokeWidth = 3;
      lineSeries.tooltipText = "Average CEO Pay: {valueX.value}";
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

      var columnTemplate = series.columns.template;
      columnTemplate.height = am4core.percent(75);
      columnTemplate.maxHeight = 75;
      columnTemplate.column.cornerRadius(0, 50, 0, 50);
      columnTemplate.strokeOpacity = 0;
      series.mainContainer.mask = undefined;
      // Set the colors
      series.columns.template.propertyFields.fill = "color";

      //add chart cursor
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.behavior = "zoomY";

      chart.legend = new am4charts.Legend();
      chart.legend.labels.template.fill = textColor;
      chart.legend.useDefaultMarker = true;
    });
  }, [chartSeries, isLoading, textColor]);

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
          <div style={{ height: 440 }} id="compare-ceo-div" />

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

export default ComparingCEOPay;
