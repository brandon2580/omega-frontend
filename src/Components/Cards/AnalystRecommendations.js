import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import Loader from "react-loader-spinner";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const AnalystRecommendations = (props) => {
  const [pieData, setPieData] = useState([]);
  const [barSeries, setBarSeries] = useState([]);
  const [totalRecs, setTotalRecs] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [overall, setOverall] = useState("");
  const [view, setView] = useState("bar");
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
  }, [props.darkMode]);

  useEffect(() => {
    setIsLoading(true)
    const analyst_recs = fetch(
      `https://cloud.iexapis.com/stable/stock/${props.activeTicker}/recommendation-trends?token=pk_6fdc6387a2ae4f8e9783b029fc2a3774`
    ).then((res) => res.json());

    Promise.resolve(analyst_recs).then((analyst_recs) => {
      if (analyst_recs[0] == undefined) {
        setIsLoading(false);
        return null;
      } else {
        let pieSeriesData = [
          {
            "Strong Buy": analyst_recs[0].ratingOverweight,
            Buy: analyst_recs[0].ratingBuy,
            Hold: analyst_recs[0].ratingHold,
            Sell: analyst_recs[0].ratingSell,
            "Strong Sell": analyst_recs[0].ratingUnderweight,
          },
        ];

        let barSeriesData = [
          {
            "Strong Buy": analyst_recs[0].ratingOverweight,
            Buy: analyst_recs[0].ratingBuy,
            Hold: analyst_recs[0].ratingHold,
            Sell: analyst_recs[0].ratingSell,
            "Strong Sell": analyst_recs[0].ratingUnderweight,
          },
        ];

        let mappedBarSeriesData = barSeriesData.map((el) => {
          return [
            {
              rating: "Strong Buy",
              value: el["Strong Buy"],
              color: am4core.color("#41FFC9"),
            },
            {
              rating: "Buy",
              value: el["Buy"],
              color: am4core.color("#23807E"),
            },
            {
              rating: "Hold",
              value: el["Hold"],
              color: am4core.color("#808080"),
            },
            {
              rating: "Sell",
              value: el["Sell"],
              color: am4core.color("#FE3636"),
            },
            {
              rating: "Strong Sell",
              value: el["Strong Sell"],
              color: am4core.color("#520000"),
            },
          ];
        });

        let mappedPieSeriesData = pieSeriesData.map((el) => {
          return [
            {
              rating: "Strong Buy",
              value: el["Strong Buy"],
              color: am4core.color("#41FFC9"),
            },
            {
              rating: "Buy",
              value: el["Buy"],
              color: am4core.color("#23807E"),
            },
            {
              rating: "Hold",
              value: el["Hold"],
              color: am4core.color("#808080"),
            },
            {
              rating: "Sell",
              value: el["Sell"],
              color: am4core.color("#FE3636"),
            },
            {
              rating: "Strong Sell",
              value: el["Strong Sell"],
              color: am4core.color("#520000"),
            },
          ];
        });

        setPieData(mappedPieSeriesData[0]);
        setBarSeries(mappedBarSeriesData[0]);

        let totalRecsArr = pieData.map((el) => {
          return el.value;
        });

        let buyRecs = totalRecsArr[0] + totalRecsArr[1];
        let holdRecs = totalRecsArr[2];
        let sellRecs = totalRecsArr[3] + totalRecsArr[4];

        let simplifiedArr = [buyRecs, holdRecs, sellRecs];

        const max = simplifiedArr.reduce((m, n) => Math.max(m, n));
        let overallIndex = [...simplifiedArr.keys()].filter(
          (i) => simplifiedArr[i] === max
        );

        if (overallIndex == 0) {
          setOverall("Buy");
        } else if (overallIndex == 1) {
          setOverall("Hold");
        } else if (overallIndex == 2) {
          setOverall("Sell");
        } else {
          setOverall("Mixed");
        }

        setTotalRecs(totalRecsArr.reduce((a, b) => a + b, 0));
        setIsLoading(false);
      }
    });
  }, [props.activeTicker]);

  let pieHeader = (
    <React.Fragment>
      {props.title}
      <button
        className="btn btn-primary change-view-button"
        onClick={() => setView("bar")}
      >
        Change View
      </button>
    </React.Fragment>
  );

  let barHeader = (
    <React.Fragment>
      {props.title}
      <button
        className="btn btn-primary change-view-button"
        onClick={() => setView("pie")}
      >
        Change View
      </button>
    </React.Fragment>
  );

  // -------------------
  useEffect(() => {
    am4core.ready(function () {
      var chart = am4core.create("bar-div", am4charts.XYChart);
      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

      chart.paddingRight = 40;

      chart.data = barSeries;

      var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "rating";
      categoryAxis.renderer.grid.template.strokeOpacity = 0;
      categoryAxis.renderer.minGridDistance = 10;
      categoryAxis.renderer.labels.template.dx = -40;
      categoryAxis.renderer.minWidth = 120;
      categoryAxis.renderer.tooltip.dx = -40;
      categoryAxis.renderer.labels.template.fill = textColor;

      var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.inside = true;
      valueAxis.renderer.labels.template.fillOpacity = 0.3;
      valueAxis.renderer.grid.template.strokeOpacity = 0;
      valueAxis.min = 0;
      valueAxis.cursorTooltipEnabled = false;
      valueAxis.renderer.baseGrid.strokeOpacity = 0;
      valueAxis.renderer.labels.template.dy = 20;
      valueAxis.renderer.labels.template.fill = textColor;

      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueX = "value";
      series.dataFields.categoryY = "rating";
      series.tooltipText = "# of Analysts: {valueX.value}";
      series.tooltip.pointerOrientation = "vertical";
      series.tooltip.dy = -30;
      series.columnsContainer.zIndex = 100;

      var columnTemplate = series.columns.template;
      columnTemplate.height = am4core.percent(75);
      columnTemplate.maxHeight = 75;
      columnTemplate.column.cornerRadius(0, 50, 0, 50);
      columnTemplate.strokeOpacity = 0;
      series.mainContainer.mask = undefined;
      // Set the colors
      series.columns.template.propertyFields.fill = "color";

      var cursor = new am4charts.XYCursor();
      chart.cursor = cursor;
      cursor.lineX.disabled = true;
      cursor.lineY.disabled = true;
      cursor.behavior = "none";
    });
  }, [isLoading, barSeries, view, textColor]);

  useEffect(() => {
    am4core.ready(function () {
      am4core.useTheme(am4themes_animated);
      am4core.useTheme(am4themes_dark);

      // Create chart instance
      var chart = am4core.create("pie-div", am4charts.PieChart);

      // Add and configure Series
      var pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "value";
      pieSeries.dataFields.category = "rating";

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
      ///chart.legend = new am4charts.Legend();
      chart.svgContainer.measure();

      // Get series data and set it
      chart.data = pieData;
    });
  }, [isLoading, pieData, view]);

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
    if (view == "pie") {
      return (
        <Card
          className="analystrecs-card"
          title={pieHeader}
          extra={props.extra}
          style={{
            height: "100%",
            overflow: "auto",
          }}
        >
          <hr className="card-hr" />

          <div style={{ height: 456 }}>
            <div style={{ height: 456 }} id="pie-div"></div>

            <p className="analyst-recs-overall-pie center">
              Overall: <span className="blue">{overall}</span>
            </p>
          </div>
        </Card>
      );
    } else {
      return (
        <Card
          className="analystrecs-card"
          title={barHeader}
          extra={props.extra}
          style={{
            height: "100%",
            overflow: "auto",
          }}
        >
          <hr className="card-hr" />

          <div style={{ height: 456 }}>
            <div style={{ height: 456 }} id="bar-div"></div>
            <p className="analyst-recs-overall-bar center">
              Overall: <span className="blue">{overall}</span>
            </p>
          </div>
        </Card>
      );
    }
  }
};

export default AnalystRecommendations;
