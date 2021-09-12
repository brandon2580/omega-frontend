import React, {useEffect, useState} from "react";
import "../../App.scss";
import {Card} from "antd";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import Loader from "react-loader-spinner";

const ResearchAndDevelopment = (props) => {
    const [chartData, setChartData] = useState([]);
    const [theme, setTheme] = useState("");
    const [textColor, setTextColor] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        props.darkMode ? setTheme("#000000") : setTheme("#FFFFFF");
        props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
    }, [props.darkMode]);

    useEffect(() => {
        setIsLoading(true);
        const balance_sheet = fetch(
            `https://cloud.iexapis.com/stable/stock/${props.activeTicker}/income/20?token=pk_6fdc6387a2ae4f8e9783b029fc2a3774`
        ).then((res) => res.json());

        Promise.resolve(balance_sheet).then((data) => {
            if (data[0] == undefined) {
                return null
            } else {
                let dataArray = data.income.map((el, i) => {
                    return {
                        x: el.fiscalDate,
                        y: el.researchAndDevelopment,
                    };
                });
                dataArray.reverse();
                setChartData(dataArray);
                setIsLoading(false);
            }
        });
    }, [props.activeTicker]);

    useEffect(() => {
        am4core.ready(function () {

            // Create chart instance
            const chart = am4core.create("researchanddevelopmentdiv", am4charts.XYChart);

            // Add data
            chart.data = chartData;
            chart.numberFormatter.numberFormat = "$#a";
            chart.numberFormatter.bigNumberPrefixes = [
                {number: 1e3, suffix: "K"},
                {number: 1e6, suffix: "M"},
                {number: 1e9, suffix: "B"},
            ];
            // Create axes
            const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.minGridDistance = 50;
            dateAxis.renderer.labels.template.fill = textColor;

            const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.renderer.labels.template.fill = textColor;

            // Create series
            const series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = "y";
            series.dataFields.dateX = "x";
            series.strokeWidth = 2;
            series.stroke = am4core.color("#007bff");
            series.minBulletDistance = 10;
            series.tooltipText = "{valueY}";
            series.tooltip.pointerOrientation = "vertical";
            series.tooltip.background.cornerRadius = 20;
            series.tooltip.background.fillOpacity = 0.5;
            series.tooltip.label.padding(12, 12, 12, 12);
            series.tooltip.getFillFromObject = false;
            series.tooltip.getStrokeFromObject = true;
            // Add cursor
            chart.cursor = new am4charts.XYCursor();
            chart.cursor.xAxis = dateAxis;
            chart.cursor.snapToSeries = series;
        });
    }, [isLoading, chartData, textColor]);

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
                    <div style={{height: 456}} id="researchanddevelopmentdiv"/>
                </React.Fragment>
            </Card>
        );
    }
};

export default ResearchAndDevelopment;
