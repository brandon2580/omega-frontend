import React, {useEffect, useState} from "react";
import "../../App.scss";
import {Card} from "antd";
import Loader from "react-loader-spinner";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

const InsiderTrading = (props) => {
  const [chartSeries, setChartSeries] = useState([]);
  const [insiders, setInsiders] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
  }, [props.darkMode]);

  useEffect(() => {
    setIsLoading(true);
    const insider_trading = fetch(
      `https://cloud.iexapis.com/stable/time-series/INSIDER_TRANSACTIONS/${props.activeTicker}?token=pk_6fdc6387a2ae4f8e9783b029fc2a3774&last=25`
    ).then((res) => res.json());

    Promise.resolve(insider_trading).then((insider_trading) => {
      let insiderTraders = insider_trading.map((el, i) => {
        return el.fullName;
      });

      let data = insider_trading.map((el, i) => {
        return {
          [el.fullName]: el.transactionShares,
          date: el.filingDate,
        };
      });

      setInsiders(insiderTraders);
      setChartSeries(data);
      setIsLoading(false);
    });
  }, [props.activeTicker]);

  useEffect(() => {
    am4core.ready(function () {
      // Create chart instance
      const chart = am4core.create("insidertradingdiv", am4charts.XYChart);

      // Add data
      chart.data = chartSeries;

      // Create axes
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "date";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 50;
      categoryAxis.startLocation = 0.5;
      categoryAxis.endLocation = 0.5;

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

      // Create series
      function createSeries(field, name) {
        const series = chart.series.push(new am4charts.LineSeries());
        series.dummyData = {
          field: field,
        };
        series.dataFields.valueY = field + "_hi";
        series.dataFields.openValueY = field + "_low";
        series.dataFields.categoryX = "date";
        series.name = name;
        series.tooltipText =
          "[font-size: 18]{name}[/]\n{categoryX}: [bold]{" + field + "}[/]";
        series.strokeWidth = 1;
        series.fillOpacity = 1;
        series.tensionX = 0.8;
        return series;
      }

      for (let i = 0; i < insiders.length; i++) {
        createSeries(JSON.stringify(insiders[i]), JSON.stringify(insiders[i]));
      }

      //   // Legend
      //   chart.legend = new am4charts.Legend();
      //   chart.legend.itemContainers.template.togglable = false;
      //   chart.legend.itemContainers.template.cursorOverStyle =
      //     am4core.MouseCursorStyle.default;
      //   chart.legend.position = "right";
      //   chart.legend.reverseOrder = true;

      // Cursor
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.maxTooltipDistance = 0;

      // Responsive
      chart.responsive.enabled = true;
      chart.responsive.useDefault = false;
      chart.responsive.rules.push({
        relevant: am4core.ResponsiveBreakpoints.widthL,
        state: function (target, stateId) {
          if (target instanceof am4charts.Legend) {
            const state = target.states.create(stateId);
            state.properties.position = "bottom";
            return state;
          }
          return null;
        },
      });

      // Prepare data for the river-stacked series
      chart.events.on("beforedatavalidated", updateData);
      function updateData() {
        const data = chart.data;
        if (data.length === 0) {
          return;
        }

        for (let i = 0; i < data.length; i++) {
          const row = data[i];
          let sum = 0;

          // Calculate open and close values
          chart.series.each(function (series) {
            const field = series.dummyData.field;
            const val = Number(row[field]);
            row[field + "_low"] = sum;
            row[field + "_hi"] = sum + val;
            sum += val;
          });

          // Adjust values so they are centered
          const offset = sum / 2;
          chart.series.each(function (series) {
            const field = series.dummyData.field;
            row[field + "_low"] -= offset;
            row[field + "_hi"] -= offset;
          });
        }
      }
    }); // end am4core.ready()
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
          <div style={{ height: 440 }} id="insidertradingdiv" />

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

export default InsiderTrading;
