import React, {useEffect, useState} from "react";
import "../../App.scss";
import {Card} from "antd";
import Loader from "react-loader-spinner";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

const ComparingCEOPay = (props) => {
    const [chartSeries, setChartSeries] = useState([]);
    const [overall, setOverall] = useState("");
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
                    value: el,
                    name: Object.values(names[i])[0],
                    avg_peer_pay: ceo_pay.peerAvg,
                };
            });

            setChartSeries(values);

            if (ceo_pay.peers[props.activeTicker] > ceo_pay.peerAvg) {
                setOverall("Above Average");
            } else if (ceo_pay.peers[props.activeTicker] < ceo_pay.peerAvg) {
                setOverall("Below Average");
            } else {
                setOverall("Equal To Competitors");
            }

            setIsLoading(false);
        });
    }, [props.activeTicker]);

    useEffect(() => {
        am4core.ready(function () {
            const chart = am4core.create("compare-ceo-div", am4charts.XYChart);

            chart.data = chartSeries;
            chart.numberFormatter.numberFormat = "$#a";
            chart.numberFormatter.bigNumberPrefixes = [
                {number: 1e3, suffix: "K"},
                {number: 1e6, suffix: "M"},
                {number: 1e9, suffix: "B"},
            ];

            //create category axis for years
            const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "name";
            categoryAxis.renderer.minGridDistance = 30;
            categoryAxis.renderer.inversed = true;
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.labels.template.fill = textColor;
            categoryAxis.cursorTooltipEnabled = false;

            //create value axis for income and expenses
            const valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
            valueAxis.renderer.opposite = true;
            valueAxis.renderer.labels.template.fill = textColor;

            const columnSeries = chart.series.push(new am4charts.ColumnSeries());
            columnSeries.name = "CEO Pay";
            columnSeries.dataFields.categoryY = "name";
            columnSeries.dataFields.valueX = "value";
            columnSeries.tooltipText = "{categoryY}: {valueX.value}";
            columnSeries.columns.template.propertyFields.fill = "color";
            columnSeries.stroke = am4core.color("#007bff");
            columnSeries.fill = am4core.color("#007bff");

            //create line
            const lineSeries = chart.series.push(new am4charts.LineSeries());
            lineSeries.dataFields.categoryY = "name";
            lineSeries.dataFields.valueX = "avg_peer_pay";
            lineSeries.name = "Average CEO Pay";
            lineSeries.strokeWidth = 3;
            lineSeries.tooltipText = "Average CEO Pay: {valueX.value}";
            lineSeries.tooltip.fill = am4core.color("orange");
            lineSeries.stroke = am4core.color("orange");
            lineSeries.fill = am4core.color("orange");

            //add bullets
            const bullet = lineSeries.bullets.push(new am4charts.Bullet());
            bullet.fill = am4core.color("orange");
            const circle = bullet.createChild(am4core.Circle);
            circle.radius = 4;
            circle.fill = am4core.color("#fff");
            circle.strokeWidth = 3;

            const columnTemplate = columnSeries.columns.template;
            columnTemplate.height = am4core.percent(75);
            columnTemplate.maxHeight = 75;
            columnTemplate.column.cornerRadius(0, 50, 0, 50);
            columnTemplate.strokeOpacity = 0;
            columnSeries.mainContainer.mask = undefined;
            // Set the colors
            columnSeries.columns.template.propertyFields.fill = "color";

            //add chart cursor
            chart.cursor = new am4charts.XYCursor();
            chart.cursor.behavior = "zoomY";

            chart.legend = new am4charts.Legend();
            chart.legend.labels.template.fill = textColor;
            chart.legend.useDefaultMarker = true;
            lineSeries.legendSettings.labelText = "Average CEO Pay"
            columnSeries.legendSettings.labelText = "CEO Pay"
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
                <hr className="card-hr"/>
                <React.Fragment>
                    <div style={{height: 440}} id="compare-ceo-div"/>

                    <p className="compare-ceo-pay center">
                        CEO Pay: <span className="blue">{overall}</span>
                    </p>
                </React.Fragment>
            </Card>
        );
    }
};

export default ComparingCEOPay;
