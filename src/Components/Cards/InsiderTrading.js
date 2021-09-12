import React, {useEffect, useState} from "react";
import "../../App.scss";
import {Card} from "antd";
import Loader from "react-loader-spinner";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

const InsiderTrading = (props) => {
    const [chartSeries, setChartSeries] = useState([]);
    const [insiders, setInsiders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [textColor, setTextColor] = useState("");

    useEffect(() => {
        props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
    }, [props.darkMode]);

    useEffect(() => {
        setIsLoading(true);
        const insider_trading = fetch(
            `https://sigma7-api.azure-api.net/insider_trx?symbol=${props.activeTicker}`
        ).then((res) => res.json());

        Promise.resolve(insider_trading).then((insider_trading) => {

            function omit(key, obj) {
                const {[key]: omitted, ...rest} = obj;
                return rest;
            }

            let f = insider_trading.transactions.flatMap((el, i) => {
                let z = omit("date", el)
                return Object.keys(z)
            })

            let uniq = arr => [...new Set(arr)];

            let formatted = uniq(f)
            setInsiders(formatted)

            setChartSeries(insider_trading.transactions)
            setIsLoading(false);
        });
    }, [props.activeTicker]);


    useEffect(() => {
        am4core.ready(function () {

            // Create chart instance
            var chart = am4core.create("insidertradingdiv", am4charts.XYChart);

            // Add data
            chart.data = chartSeries

            // Create axes
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "date";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 50;
            categoryAxis.startLocation = 0.5;
            categoryAxis.endLocation = 0.5;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());


            // Create series
            function createSeries(field, name) {
                var series = chart.series.push(new am4charts.LineSeries());
                series.dummyData = {
                    field: field
                }
                series.dataFields.valueY = field + "_hi";
                series.dataFields.openValueY = field + "_low";
                series.dataFields.categoryX = "date";
                series.name = name;
                series.tooltipText = "{name}: {" + field + "}";

                series.strokeWidth = 1;
                series.fillOpacity = 1;
                series.tensionX = 0.8;

                return series;
            }

            let arr = ["uk", "ussr", "russia", "usa", "china"]
            for (let i = 0; i < insiders.length; i++) {
                createSeries(insiders[i], insiders[i])
            }

            // Legend
//             chart.legend = new am4charts.Legend();
//             chart.legend.itemContainers.template.togglable = false;
//             chart.legend.itemContainers.template.cursorOverStyle = am4core.MouseCursorStyle.default;
//             chart.legend.position = "right"
//             chart.legend.reverseOrder = true;

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
                        var state = target.states.create(stateId);
                        state.properties.position = "bottom";
                        return state;
                    }
                    return null;
                }
            });

            // Prepare data for the river-stacked series
            chart.events.on("beforedatavalidated", updateData);

            function updateData() {

                var data = chart.data;
                if (data.length == 0) {
                    return;
                }

                for (var i = 0; i < data.length; i++) {
                    var row = data[i];
                    var sum = 0;

                    // Calculate open and close values
                    chart.series.each(function (series) {
                        var field = series.dummyData.field;
                        var val = Number(row[field]);
                        row[field + "_low"] = sum;
                        row[field + "_hi"] = sum + val;
                        sum += val;
                    });

                    // Adjust values so they are centered
                    var offset = sum / 2;
                    chart.series.each(function (series) {
                        var field = series.dummyData.field;
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
                    <div style={{height: 440}} id="insidertradingdiv"/>

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
