import React, {useEffect, useState} from "react";
import "../../App.scss";
import {Card} from "antd";
import Loader from "react-loader-spinner";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

const PoliticalInsiders = (props) => {
    const [chartSeries, setChartSeries] = useState([]);
    const [range, setRange] = useState(12);
    const [noData, setNoData] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [textColor, setTextColor] = useState("");

    useEffect(() => {
        props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
    }, [props.darkMode]);

    useEffect(() => {
        setIsLoading(true);
        const political_pie = fetch(
            `https://sigma7-api.azure-api.net/political_pie?symbol=${props.activeTicker}&period=${range}`
        ).then((res) => res.json());

        Promise.resolve(political_pie).then((political_pie) => {
            // First, check to see if the length of the array is 0
            // (meaning no data was returned)
            // if (political_pie.data.length === 0) {
            //    setNoData(true);
            //   setIsLoading(false);
            // } else {

            function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }

            let mapped = Object.values(political_pie.data).map((el, i) => {
                return {
                    transaction: capitalizeFirstLetter(el.transaction),
                    shares: el.est_volume
                }
            })
            setNoData(false)
            setChartSeries(mapped)
            setIsLoading(false);

            //}
            setNoData(false);
            setIsLoading(false)
        }).catch((err) => {
            setNoData(true);
            setIsLoading(false);
        });
    }, [props.activeTicker, range]);

    useEffect(() => {
        am4core.ready(function () {
            // Create chart instance
            const chart = am4core.create("politicalinsidersdiv", am4charts.PieChart);

            chart.numberFormatter.numberFormat = "#a";
            chart.numberFormatter.bigNumberPrefixes = [
                {number: 1e3, suffix: "K"},
                {number: 1e6, suffix: "M"},
                {number: 1e9, suffix: "B"},
            ];

            // Add and configure Series
            const pieSeries = chart.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = "shares";
            pieSeries.dataFields.category = "transaction";

            // Let's cut a hole in our Pie chart the size of 55% the radius
            chart.innerRadius = am4core.percent(55);
            var colorSet = new am4core.ColorSet();
            colorSet.list = ["#00FF00", "#FF0000"].map(function (color) {
                return new am4core.color(color);
            });

            pieSeries.colors = colorSet;
            pieSeries.labels.template.disabled = false;

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

            // Get series data and set it
            chart.data = chartSeries;
            pieSeries.labels.template.fontSize = 14;
            pieSeries.labels.template.fill = textColor;
            pieSeries.labels.template.maxWidth = 90;
            pieSeries.labels.template.wrap = true;
            pieSeries.alignLabels = false;
            pieSeries.labels.template.text = "{category}";
        });
    }, [chartSeries, isLoading, textColor]);

    const changeTimeFrame = (e) => {
        setRange(e.target.value);
    };

    let timeFrameButtons =
        <div className="row">
            <div className="col-lg-12">
                <button
                    className="range-button btn btn-link btn-sm shadow-none"
                    value={3}
                    onClick={changeTimeFrame}
                >
                    3 months
                </button>
                <button
                    className="range-button btn btn-link btn-sm shadow-none"
                    value={6}
                    onClick={changeTimeFrame}
                >
                    6 months
                </button>
                <button
                    className="range-button btn btn-link btn-sm shadow-none"
                    value={12}
                    onClick={changeTimeFrame}
                >
                    12 months
                </button>
            </div>
        </div>

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
                <React.Fragment>
                    <h1 style={{color: textColor}}>No Insider Data :(</h1>
                </React.Fragment>
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
                    <div style={{height: 440}} id="politicalinsidersdiv"/>
                    {timeFrameButtons}
                </React.Fragment>
            </Card>
        );
    }
};

export default PoliticalInsiders;
