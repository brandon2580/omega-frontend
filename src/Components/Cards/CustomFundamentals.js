import React, {useEffect, useState} from "react";
import "../../App.scss";
import {Card} from "antd";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import Loader from "react-loader-spinner";

const CustomFundamentals = (props) => {
    const [chartData, setChartData] = useState([]);
    const [availableData, setAvailableData] = useState([]);
    const [list, setList] = useState([]);
    const [selectedMetric, setSelectedMetric] = useState("");
    const [noData, setNoData] = useState(false);
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
                    return el;
                });
                dataArray.reverse();

                let listArray = balance_sheet.balancesheet.map((el, i) => {
                    return Object.keys(el);
                });
                listArray.reverse();

                setNoData(false);
                setAvailableData(dataArray);
                setList(listArray);
                setIsLoading(false);
            }
        }).catch((err) => {
            setNoData(true);
            setIsLoading(false);
        });
    }, [props.activeTicker]);

    const handleClick = (e) => {
        setSelectedMetric(e.target.value);
    };

    useEffect(() => {
        am4core.ready(function () {
            // Create chart instance
            const chart = am4core.create("customfundamentalsdiv", am4charts.XYChart);
            const seriesId = chart.series.length + 1;

            let data = availableData.map((el, i) => {
                return {
                    x: el.fiscalDate,
                    y1: el["accountsPayable"],
                    y2: el["commonStock"],
                    y3: el["longTermDebt"],
                };
            });

            chart.data = data;

            /* Create axes */
            const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "x";

            /* Create value axis */
            const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

            // Create series
            let series = new am4charts.LineSeries();
            series.data = data;
            series.dataFields.valueY = "y" + seriesId;
            series.dataFields.categoryX = "x";
            series.name = "Series #" + seriesId;
            series.strokeWidth = 3;
            series.tensionX = 0.7;
            series.fillOpacity = 0.2;
            series.stacked = true;
            series = chart.series.push(series);

            /* Add legend */
            chart.legend = new am4charts.Legend();

            /* Create a cursor */
            chart.cursor = new am4charts.XYCursor();
        });
    }, [isLoading, textColor, selectedMetric]);

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
                <h1 style={{color: textColor}}>No Data</h1>
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
                    <div style={{height: 456}} id="customfundamentalsdiv"/>
                    <p>
                        List:
                        {list.map((el, i) => {
                            return (
                                <button
                                    onClick={handleClick}
                                    className="btn btn-primary"
                                    key={el[i]}
                                    value={el[i]}
                                >
                                    {el[i]}
                                </button>
                            );
                        })}
                    </p>
                </React.Fragment>
            </Card>
        );
    }
};

export default CustomFundamentals;
