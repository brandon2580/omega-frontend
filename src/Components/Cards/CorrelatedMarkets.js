import React, {useEffect, useState} from "react";
import "../../App.scss";
import {Card} from "antd";
import Loader from "react-loader-spinner";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

const CorrelatedMarkets = (props) => {
  const [chartData, setChartData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
  }, [props.darkMode]);

  useEffect(() => {
    setIsLoading(true);
    const correlated_markets = fetch(
      `https://sigma7-api.azure-api.net/corr_metrics/?symbol=${props.activeTicker}&frame=1y`
    ).then((res) => res.json());

    Promise.resolve(correlated_markets).then((el) => {
      let output = el.output;

      let values = Object.values(output).map((value) => {
        return value;
      });

      let formattedData = Object.keys(output).map((name, i) => {
        return {
          sector: name,
          value: values[i],
        };
      });

      setChartData(formattedData);
      setIsLoading(false);
    });
  }, [props.activeTicker]);

  useEffect(() => {
    am4core.ready(function () {

      const chart = am4core.create("correlatedmarketsdiv", am4charts.XYChart);

      const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.dataFields.category = "sector";
      categoryAxis.renderer.minGridDistance = 1;
      categoryAxis.renderer.inversed = true;
      categoryAxis.renderer.grid.template.disabled = true;
      categoryAxis.renderer.labels.template.fill = textColor;

      const valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.labels.template.fill = textColor;

      const series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.categoryY = "sector";
      series.dataFields.valueX = "value";
      series.tooltipText = "{valueX.value}";
      series.columns.template.strokeOpacity = 0;
      series.columns.template.column.cornerRadiusBottomRight = 5;
      series.columns.template.column.cornerRadiusTopRight = 5;

      const labelBullet = series.bullets.push(new am4charts.LabelBullet());
      labelBullet.label.horizontalCenter = "left";
      labelBullet.label.dx = 10;
      labelBullet.locationX = 1;

      // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
      series.columns.template.adapter.add("fill", function (fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
      });

      categoryAxis.sortBySeries = series;
      chart.data = chartData;
    });
  }, [chartData, isLoading, textColor]);

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
          <div style={{ height: 456 }} id="correlatedmarketsdiv" />
        </React.Fragment>
      </Card>
    );
  }
};

export default CorrelatedMarkets;
