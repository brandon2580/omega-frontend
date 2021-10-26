import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import Loader from "react-loader-spinner";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

const CEOPayBreakdown = (props) => {
  const [chartSeries, setChartSeries] = useState([]);
  const [noData, setNoData] = useState(false);
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

    Promise.resolve(ceo_pay)
      .then((ceo_pay) => {
        let properties = Object.keys(ceo_pay.comp).map((el) => {
          return el;
        });

        let values = Object.values(ceo_pay.comp).map((el, i) => {
          function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
          }

          return {
            value: el,
            name: capitalizeFirstLetter(
              Object.values(properties)
                [i].replace(/([A-Z])/g, " $1")
                .trim()
            ),
          };
        });

        setNoData(false);
        setChartSeries(values);
        setIsLoading(false);
      })
      .catch((err) => {
        setNoData(true);
        setIsLoading(false);
      });
  }, [props.activeTicker]);

  useEffect(() => {
    am4core.ready(function () {
      // Create chart instance
      const chart = am4core.create("ceo-pay-breakdown-div", am4charts.PieChart);

      chart.numberFormatter.numberFormat = "$#a";
      chart.numberFormatter.bigNumberPrefixes = [
        { number: 1e3, suffix: "K" },
        { number: 1e6, suffix: "M" },
        { number: 1e9, suffix: "B" },
      ];

      // Add and configure Series
      const pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "value";
      pieSeries.dataFields.category = "name";

      // Let's cut a hole in our Pie chart the size of 55% the radius
      chart.innerRadius = am4core.percent(55);
      pieSeries.slices.template.propertyFields.fill = "color";

      pieSeries.labels.template.disabled = false;

      // Create a base filter effect (as if it's not there) for the hover to return to
      const shadow = pieSeries.slices.template.filters.push(
        new am4core.DropShadowFilter()
      );
      shadow.opacity = 0;

      // Create hover state
      const hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

      // Slightly shift the shadow and make it more prominent on hover
      const hoverShadow = hoverState.filters.push(
        new am4core.DropShadowFilter()
      );
      hoverShadow.opacity = 0.7;
      hoverShadow.blur = 5;

      // Get series data and set it
      chart.data = chartSeries;
      pieSeries.labels.template.fill = textColor;
      pieSeries.labels.template.fontSize = 14;
      pieSeries.labels.template.maxWidth = 90;
      pieSeries.labels.template.wrap = true;
      pieSeries.alignLabels = false;
      pieSeries.labels.template.text = "{category}";
    });
  }, [chartSeries, isLoading, textColor]);

  if (isLoading) {
    return (
      <Card
        className="card"
        title={props.header}
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
        className="card"
        title={props.header}
        extra={props.extra}
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
        <hr className="card-hr" />
        <h1 style={{ color: textColor }}>No CEO Pay Breakdown Data :(</h1>
      </Card>
    );
  } else {
    return (
      <Card
        className="card"
        title={props.header}
        extra={props.extra}
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
        <hr className="card-hr" />
        <React.Fragment>
          <div style={{ height: 440 }} id="ceo-pay-breakdown-div" />
        </React.Fragment>
      </Card>
    );
  }
};

export default CEOPayBreakdown;
