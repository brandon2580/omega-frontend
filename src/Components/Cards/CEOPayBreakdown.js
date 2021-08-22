import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import Loader from "react-loader-spinner";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

const CEOPayBreakdown = (props) => {
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
      console.log(ceo_pay);

      let properties = Object.keys(ceo_pay.comp).map((el) => {
        return el;
      });

      let values = Object.values(ceo_pay.comp).map((el, i) => {
        return {
          value: el,
          name: Object.values(properties)[i],
        };
      });

      setChartSeries(values);
      console.log(values);
      setIsLoading(false);
    });
  }, [props.activeTicker]);

  useEffect(() => {
    am4core.ready(function () {
      // Create chart instance
      var chart = am4core.create("ceo-pay-breakdown-div", am4charts.PieChart);

      chart.numberFormatter.numberFormat = "$#a";
      chart.numberFormatter.bigNumberPrefixes = [
        { number: 1e3, suffix: "K" },
        { number: 1e6, suffix: "M" },
        { number: 1e9, suffix: "B" },
      ];

      // Add and configure Series
      var pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "value";
      pieSeries.dataFields.category = "name";

      // Let's cut a hole in our Pie chart the size of 55% the radius
      chart.innerRadius = am4core.percent(55);
      pieSeries.slices.template.propertyFields.fill = "color";

      // Remove ugly labels
      pieSeries.labels.template.disabled = true;

      // Create a base filter effect (as if it's not there) for the hover to return to
      var shadow = pieSeries.slices.template.filters.push(
        new am4core.DropShadowFilter()
      );
      shadow.opacity = 0;

      // Create hover state
      var hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

      // Slightly shift the shadow and make it more prominent on hover
      var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter());
      hoverShadow.opacity = 0.7;
      hoverShadow.blur = 5;

      // Add a legend
      chart.legend = new am4charts.Legend();
      chart.svgContainer.measure();

      // Get series data and set it
      chart.data = chartSeries;
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
          <div style={{ height: 440 }} id="ceo-pay-breakdown-div" />

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

export default CEOPayBreakdown;