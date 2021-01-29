import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import Candlestick from "fusioncharts/viz/candlestick";
import ReactFC from "react-fusioncharts";

ReactFC.fcRoot(FusionCharts, TimeSeries, Candlestick);

const jsonify = (res) => res.json();
const dataFetch = fetch(
  "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/candlestick-chart-data.json"
).then(jsonify);
const schemaFetch = fetch(
  "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/candlestick-chart-schema.json"
).then(jsonify);

const dataSource = {
  chart: {},
  caption: {
    text: "Apple Inc. Stock Price",
  },
  subcaption: {
    text: "Stock prices from January 1980 - November 2011",
  },
  yaxis: [
    {
      plot: {
        value: {
          open: "Open",
          high: "High",
          low: "Low",
          close: "Close",
        },
        type: "candlestick",
      },
      format: {
        prefix: "$",
      },
      title: "Stock Value",
    },
  ],
};

const Price = (props) => {
  const [series, setSeries] = useState({
    type: "timeseries",
    renderAt: "fff",
    width: "600",
    height: "400",
    dataSource: dataSource,
  });

  useEffect(() => {
    Promise.all([dataFetch, schemaFetch]).then((res) => {
      const data = res[0];
      const schema = res[1];
      const fusionTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      );
      const timeseriesDs = Object.assign({}, series);
      timeseriesDs.dataSource.data = fusionTable;
      setSeries(timeseriesDs)
    });
  }, []);

  return (
    <Card
      className="hide-overflow"
      title={props.title}
      extra={props.button}
      style={{
        height: "100%",
        overflow: "auto",
        scrollbarColor: "#152233 #131722",
      }}
    >
      <hr className="card-hr" />
      <div style={{ height: "425px" }}>
        {series.dataSource.data ? (
          <ReactFC id="fff" {...series} />
        ) : (
          "loading"
        )}
      </div>
    </Card>
  );
};
export default Price;
