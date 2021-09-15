import React, {useEffect, useState} from "react";
import "../../App.scss";
import {Card} from "antd";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import Loader from "react-loader-spinner";

const DebtToAssets = (props) => {
    const [chartData, setChartData] = useState([]);
    const [theme, setTheme] = useState("");
    const [textColor, setTextColor] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [noData, setNoData] = useState(false);

    useEffect(() => {
        props.darkMode ? setTheme("#000000") : setTheme("#FFFFFF");
        props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
    }, [props.darkMode]);

    useEffect(() => {
        setIsLoading(true);
        const balance_sheet = fetch(
            `https://cloud.iexapis.com/stable/stock/${props.activeTicker}/balance-sheet/20?token=pk_6fdc6387a2ae4f8e9783b029fc2a3774`
        ).then((res) => res.json());

        Promise.resolve(balance_sheet).then((balance_sheet) => {
            // First, check to see if the object has 0 keys,
            // (meaning no data was returned)
            if (Object.keys(balance_sheet).length === 0) {
                setNoData(true);
                setIsLoading(false);
            } else {
                let dataArray = balance_sheet.balancesheet.map((el, i) => {
                    return {
                        date: el.fiscalDate,
                        assets: el.totalAssets,
                        debt: el.longTermDebt,
                    };
                });
                setNoData(false);
                dataArray.reverse();
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

            const chart = am4core.create("debttoassetsdiv", am4charts.XYChart);

            chart.data = chartData;

            const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.minGridDistance = 60;
            dateAxis.startLocation = 0.5;
            dateAxis.endLocation = 0.5;

            chart.numberFormatter.numberFormat = "$#a";
            chart.numberFormatter.bigNumberPrefixes = [
                {number: 1e3, suffix: "K"},
                {number: 1e6, suffix: "M"},
                {number: 1e9, suffix: "B"},
            ];

            const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.tooltip.disabled = true;
            valueAxis.renderer.labels.template.fill = textColor;
            dateAxis.renderer.labels.template.fill = textColor;

            const series1 = chart.series.push(new am4charts.LineSeries());
            series1.name = "Debt";
            series1.dataFields.dateX = "date";
            series1.dataFields.valueY = "debt";
            series1.tooltipText = "[#000]{valueY.value}[/]";
            series1.tooltip.background.fill = am4core.color("#FFF");
            series1.stroke = "red";
            series1.fill = "red";
            series1.tooltip.getFillFromObject = false;
            series1.tooltip.getStrokeFromObject = true;
            series1.tooltip.background.strokeWidth = 2;
            series1.sequencedInterpolation = true;
            series1.fillOpacity = 0.6;
            series1.stacked = true;
            series1.strokeWidth = 2;

            const series2 = chart.series.push(new am4charts.LineSeries());
            series2.name = "Assets";
            series2.dataFields.dateX = "date";
            series2.dataFields.valueY = "assets";
            series2.tooltipText = "[#000]{valueY.value}[/]";
            series2.tooltip.background.fill = am4core.color("#FFF");
            series2.stroke = am4core.color("#007bff");
            series2.fill = am4core.color("#007bff");
            series2.tooltip.getFillFromObject = false;
            series2.tooltip.getStrokeFromObject = true;
            series2.tooltip.background.strokeWidth = 2;
            series2.sequencedInterpolation = true;
            series2.fillOpacity = 0.6;
            series2.defaultState.transitionDuration = 1000;
            series2.stacked = true;
            series2.strokeWidth = 2;

            chart.cursor = new am4charts.XYCursor();
            chart.cursor.xAxis = dateAxis;

            // Add a legend
            chart.legend = new am4charts.Legend();
            chart.legend.position = "top";
            chart.legend.labels.template.fill = textColor;
        });
    }, [isLoading, textColor, chartData]);

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
                <h1 style={{color: textColor}}>{props.title} data not found</h1>
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
                    <div style={{height: 456}} id="debttoassetsdiv"/>
                </React.Fragment>
            </Card>
        );
    }
};

export default DebtToAssets;
