import React, {useEffect, useState} from "react";
import "../../App.scss";
import {Card} from "antd";
import Loader from "react-loader-spinner";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

const InstitutionalOwnership = (props) => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noData, setNoData] = useState(false);
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
  }, [props.darkMode]);

  useEffect(() => {
    setIsLoading(true);
    const institutional_ownership = fetch(
        `https://cloud.iexapis.com/stable/stock/${props.activeTicker}/institutional-ownership?token=pk_6fdc6387a2ae4f8e9783b029fc2a3774`
    ).then((res) => res.json());

    Promise.resolve(institutional_ownership).then((institutional_ownership) => {
      // First, check to see if the length of the array is 0
      // (meaning no data was returned)
      if (institutional_ownership.length === 0) {
        setNoData(true);
        setIsLoading(false);
      } else {
        let dataArray = institutional_ownership.map((el, i) => {
          return {
            entity: el.entityProperName,
            shares_held: el.reportedHolding,
          };
        });
        setNoData(false);
        setChartData(dataArray);
        setIsLoading(false);
      }

    }).catch((err) => {
      setNoData(true);
      setIsLoading(false);
    });
  }, [props.activeTicker]);

  useEffect(() => {
    am4core.ready(function () {
      const chart = am4core.create("institutionalownershipdiv", am4charts.XYChart);

      chart.numberFormatter.numberFormat = "#a";
      chart.numberFormatter.bigNumberPrefixes = [
        { number: 1e3, suffix: "K" },
        { number: 1e6, suffix: "M" },
        { number: 1e9, suffix: "B" },
      ];

      // Create axes
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "entity";
      categoryAxis.visible = false;

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

      // Create series
      const series1 = chart.series.push(new am4charts.ColumnSeries());
      series1.dataFields.valueY = "shares_held";
      series1.dataFields.categoryX = "entity";
      series1.name = "Reported Shares Held";
      series1.columns.template.tooltipText =
          "{categoryX}: [bold]{valueY}[/] shares";
      series1.columns.template.fillOpacity = 0.8;
      series1.fill = am4core.color("#007bff");

      const columnTemplate1 = series1.columns.template;
      columnTemplate1.strokeWidth = 0;

      // Add a legend
      chart.legend = new am4charts.Legend();
      chart.legend.position = "top";
      chart.legend.labels.template.fill = textColor;

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
        <hr className="card-hr"/>

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
            title={props.title}
            extra={props.extra}
            style={{
              height: "100%",
              overflow: "auto",
            }}
        >
          <hr className="card-hr"/>
          <h1 style={{color: textColor}}>No inst data</h1>
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
            <div style={{ height: 456 }} id="institutionalownershipdiv" />
          </React.Fragment>
        </Card>
    );
  }
};

export default InstitutionalOwnership;
