import React, {useEffect, useState} from "react";
import "../../App.scss";
import {Card} from "antd";
import Loader from "react-loader-spinner";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

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

const EarningsRatio = (props) => {
  const [earningsPeriod, setEarningsPeriod] = useState("Q");
  const [overall, setOverall] = useState("");
  const [series, setSeries] = useState([
    { name: "% Beat", value: 0, color: am4core.color("#00FF00") },
    { name: "% Missed", value: 0, color: am4core.color("#FF0000") },
  ]);
  const [isLoading, setIsLoading] = useState(true);

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
        let earningsRatioData = earnings.earnings.map((el, i) => {
          return {
            consensus: el.consensusEPS,
            actual: el.actualEPS,
          };
        });

        let consensus = earningsRatioData.map((el, i) => {
          return el.consensus;
        });

        let actual = earningsRatioData.map((el, i) => {
          return el.actual;
        });

        let timesMissed = compare(consensus, actual);
        let percentTimesMissed = (timesMissed / 4) * 100;
        let percentTimesBeat = 100 - percentTimesMissed;

        if (percentTimesBeat < 50) {
          setOverall("Poor");
        } else if (percentTimesBeat > 50) {
          setOverall("Great");
        } else if (percentTimesBeat === 50) {
          setOverall("Mixed");
        }

        setSeries([
          {
            name: "% Beat",
            value: percentTimesBeat,
            color: am4core.color("#00FF00"),
          },
          {
            name: "% Missed",
            value: percentTimesMissed,
            color: am4core.color("#FF0000"),
          },
        ]);
        setIsLoading(false);
      }
    });
  }, [earningsPeriod, props.activeTicker]);

  // Create chart
  useEffect(() => {
    am4core.ready(function () {

      // Create chart instance
      const chart = am4core.create("earnings-ratio-chart-div", am4charts.PieChart);

      // Add and configure Series
      const pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "value";
      pieSeries.dataFields.category = "name";

      // Let's cut a hole in our Pie chart the size of 55% the radius
      chart.innerRadius = am4core.percent(55);
      pieSeries.slices.template.propertyFields.fill = "color";

      // Remove ugly labels
      pieSeries.labels.template.disabled = true;

      // Create a base filter effect (as if it's not there) for the hover to return to
      const shadow = pieSeries.slices.template.filters.push(
          new am4core.DropShadowFilter()
      );
      shadow.opacity = 0;

      // Create hover state
      const hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

      // Slightly shift the shadow and make it more prominent on hover
      const hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter());
      hoverShadow.opacity = 0.7;
      hoverShadow.blur = 5;

      // Add a legend
      ///chart.legend = new am4charts.Legend();
      chart.svgContainer.measure();

      // Get series data and set it
      chart.data = series;
    });
  }, [isLoading, series]);
  // End create chart

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
        className="earningsratio-card"
        title={props.title}
        extra={props.extra}
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
        <hr className="card-hr" />

        <div style={{ height: 456 }}>
          <div style={{ height: 456 }} id="earnings-ratio-chart-div" />
          <p className="earnings-ratio-overall center">
            Overall: <span className="blue">{overall}</span>
          </p>
        </div>
      </Card>
    );
  }
};

export default EarningsRatio;
