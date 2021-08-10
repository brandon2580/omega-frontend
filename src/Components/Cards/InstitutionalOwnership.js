import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import Loader from "react-loader-spinner";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const InstitutionalOwnership = (props) => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
  }, [props.darkMode]);

  useEffect(() => {
    const institutional_ownership = fetch(
      `https://cloud.iexapis.com/stable/stock/${props.activeTicker}/institutional-ownership?token=pk_6fdc6387a2ae4f8e9783b029fc2a3774`
    ).then((res) => res.json());

    Promise.resolve(institutional_ownership).then((data) => {
      let dataArray = data.map((el, i) => {
        return {
          entity: el.entityProperName,
          shares_held: el.adjHolding,
        };
      });
      setChartData(dataArray);
      setIsLoading(false);
    });
  }, [props.activeTicker]);
  console.log(chartData);

  useEffect(() => {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("institutionalownershipdiv", am4charts.XYChart);
    chart.numberFormatter.numberFormat = "#a";
    chart.numberFormatter.bigNumberPrefixes = [
      { number: 1e3, suffix: "K" },
      { number: 1e6, suffix: "M" },
      { number: 1e9, suffix: "B" },
    ];

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "entity";
    categoryAxis.visible = false;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    var series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.dataFields.valueY = "shares_held";
    series1.dataFields.categoryX = "entity";
    series1.name = "Shares Held";
    series1.columns.template.tooltipText =
      "{categoryX}: [bold]{valueY}[/] shares";
    series1.columns.template.fillOpacity = 0.8;
    series1.fill = am4core.color("#007bff");

    var columnTemplate1 = series1.columns.template;
    columnTemplate1.strokeWidth = 2;
    columnTemplate1.strokeOpacity = 1;

    // Add a legend
    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    chart.legend.labels.template.fill = textColor;

    chart.data = chartData;
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
        <div>
          <div style={{ height: 456 }} id="institutionalownershipdiv" />
        </div>
      </Card>
    );
  }
};

export default InstitutionalOwnership;
