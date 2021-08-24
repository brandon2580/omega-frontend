import React, {useEffect, useState} from "react";
import "../../App.scss";
import {Card} from "antd";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import Loader from "react-loader-spinner";

const Earnings = (props) => {
  const [earningsPeriod, setEarningsPeriod] = useState("Q");
  const [view, setView] = useState("bar");
  const [consensus, setConsensus] = useState();
  const [actual, setActual] = useState();
  const [overall, setOverall] = useState();
  const [barViewData, setBarViewData] = useState([]);
  const [dates, setDates] = useState([]);
  const [theme, setTheme] = useState("");
  const [textColor, setTextColor] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    props.darkMode ? setTheme("#000000") : setTheme("#FFFFFF");
    props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
  }, [props.darkMode]);

  function getOccurrence(array, value) {
    let count = 0;
    array.forEach((v) => v === value && count++);
    return count;
  }

  // This function ultimately returns the amount of times earnings has missed
  function compare(consensus, actual) {
    let consensusData = Object.values(consensus);
    let actualData = Object.values(actual);

    let compareValues = actualData.map((actual, i) => {
      return actual - consensusData[i];
    });

    let negativeOccurences = compareValues.map((value) => {
      return Math.sign(value);
    });

    return getOccurrence(negativeOccurences, -1);
  }

  useEffect(() => {
    setIsLoading(true);
    const earnings = fetch(
      `https://cloud.iexapis.com/stable/stock/${props.activeTicker}/earnings/4?token=pk_6fdc6387a2ae4f8e9783b029fc2a3774`
    ).then((res) => res.json());

    Promise.resolve(earnings).then((earnings) => {
      if (earnings.earnings === undefined) {
        setIsLoading(false);
        return null;
      } else {
        let earningsArray = earnings.earnings;

        let dates = earningsArray.reverse().map((el, i) => {
          return el.fiscalPeriod;
        });

        let consensusMap = earningsArray.map((el, i) => {
          return {
            x: dates[i],
            y: el.consensusEPS,
          };
        });

        let actualMap = earningsArray.map((el, i) => {
          return {
            x: dates[i],
            y: el.actualEPS,
          };
        });

        let earningsObject = {
          actual: {
            name: "Actual",
            eps: actualMap,
          },

          consensus: {
            name: "Consensus",
            eps: consensusMap,
          },
        };

        let consensusEPS = earningsObject.consensus.eps.map((el, i) => {
          return {
            x: i + 1,
            y: el.y,
          };
        });

        let actualEPS = earningsObject.actual.eps.map((el, i) => {
          return {
            x: i + 1,
            y: el.y,
          };
        });

        let plainConsensusArr = consensusEPS.map((el) => {
          return el.y;
        });

        let plainActualArr = actualEPS.map((el) => {
          return el.y;
        });

        let timesMissed = compare(plainConsensusArr, plainActualArr);
        let percentTimesMissed = (timesMissed / 4) * 100;
        let percentTimesBeat = 100 - percentTimesMissed;

        if (percentTimesBeat < 50) {
          setOverall("Underperforming");
        } else if (percentTimesBeat > 50) {
          setOverall("Outperforming");
        } else if (percentTimesBeat === 50) {
          setOverall("Mixed");
        }

        let formattedDates = dates.map((el, i) => {
          return {
            x: i + 1,
            label: el,
          };
        });

        let barViewDataMap = consensusEPS.map((el, i) => {
          return {
            name: formattedDates[i].label,
            consensus: el.y.toFixed(2),
            actual: actualEPS[i].y.toFixed(2),
            color: "#007bff",
          };
        });

        setConsensus(consensusEPS);
        setActual(actualEPS);
        setDates(formattedDates);
        setBarViewData(barViewDataMap);
        setIsLoading(false);
      }
    });
  }, [earningsPeriod, props.activeTicker]);

  useEffect(() => {
    am4core.ready(function () {


      // Create chart instance
      const chart = am4core.create("earningsdiv", am4charts.XYChart);
      chart.numberFormatter.numberFormat = "$#,###";

      // Export
      chart.exporting.menu = new am4core.ExportMenu();

      /* Create axes */
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "name";
      categoryAxis.renderer.minGridDistance = 30;
      categoryAxis.renderer.labels.template.fill = textColor;
      /* Create value axis */
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.labels.template.fill = textColor;

      /* Create series */
      const columnSeries = chart.series.push(new am4charts.ColumnSeries());
      columnSeries.name = "Actual";
      columnSeries.dataFields.valueY = "actual";
      columnSeries.dataFields.categoryX = "name";

      columnSeries.columns.template.tooltipText =
        "[#fff font-size: 15px]Actual in {categoryX}:\n[/][#fff font-size: 20px]{valueY}/share[/] [#fff]{additional}[/]";
      columnSeries.columns.template.propertyFields.fillOpacity = "fillOpacity";
      columnSeries.columns.template.propertyFields.stroke = "stroke";
      columnSeries.columns.template.propertyFields.strokeWidth = "strokeWidth";
      columnSeries.columns.template.propertyFields.strokeDasharray =
        "columnDash";
      columnSeries.columns.template.propertyFields.fill = "color";
      columnSeries.tooltip.label.textAlign = "middle";

      const lineSeries = chart.series.push(new am4charts.LineSeries());
      lineSeries.name = "Expectation";
      lineSeries.dataFields.valueY = "consensus";
      lineSeries.dataFields.categoryX = "name";

      lineSeries.stroke = am4core.color("orange");
      lineSeries.strokeWidth = 3;
      lineSeries.propertyFields.strokeDasharray = "lineDash";
      lineSeries.tooltip.label.textAlign = "middle";

      const bullet = lineSeries.bullets.push(new am4charts.Bullet());
      bullet.fill = am4core.color("orange"); // tooltips grab fill from parent by default
      bullet.tooltipText =
        "[#fff font-size: 15px]Expectation in {categoryX}:\n[/][#fff font-size: 20px]{valueY}/share[/] [#fff]{additional}[/]";
      const circle = bullet.createChild(am4core.Circle);
      circle.radius = 4;
      circle.fill = am4core.color("#fff");
      circle.strokeWidth = 3;

      chart.data = barViewData;
    });
  }, [barViewData, isLoading, textColor]);

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
          <div style={{ height: 456 }} id="earningsdiv" />
          <p className="earnings-overall center">
            Overall: <span className="blue">{overall}</span>
          </p>
        </React.Fragment>
      </Card>
    );
  }
};

export default Earnings;
