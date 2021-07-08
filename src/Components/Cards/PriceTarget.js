import React, { useEffect, useState } from "react";
import "../../App.scss";
import _ from "lodash";
import { Card } from "antd";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts/core";
import Line from "fusioncharts/viz/line";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import Loader from "react-loader-spinner";

ReactFC.fcRoot(FusionCharts, Line, FusionTheme);

const PriceTarget = (props) => {
  const [series, setSeries] = useState([]);
  const [high, setHigh] = useState();
  const [average, setAverage] = useState();
  const [low, setLow] = useState();
  const [currentPrice, setCurrentPrice] = useState();
  const [outlook, setOutlook] = useState("");
  const [theme, setTheme] = useState("");
  const [textColor, setTextColor] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    props.darkMode ? setTheme("#000000") : setTheme("#FFFFFF");
    props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
  }, [props.darkMode]);

  useEffect(() => {
    const price_target = fetch(
      `https://cloud.iexapis.com/stable/stock/${props.activeTicker}/price-target?token=pk_6fdc6387a2ae4f8e9783b029fc2a3774`
    ).then((res) => res.json());

    const prices = fetch(
      `https://cloud.iexapis.com/stable/stock/${props.activeTicker}/chart/1y?token=pk_6fdc6387a2ae4f8e9783b029fc2a3774`
    ).then((res) => res.json());

    const allReqs = [prices, price_target];

    Promise.all(allReqs).then((allResp) => {
      const [prices, price_target] = allResp;

      let priceTargetData = [
        Object.keys(prices).map(function (key) {
          return {
            label: prices[key].date,
            value: prices[key].close,
          };
        }),
        {
          last_updated: price_target.updatedData,
          average: price_target.priceTargetAverage,
          high: price_target.priceTargetHigh,
          low: price_target.priceTargetLow,
          numOfAnalysts: price_target.numberOfAnalysts,
        },
      ];

      setSeries(_.dropRight(priceTargetData[0], 2));
      setHigh(priceTargetData[1].high);
      setAverage(priceTargetData[1].average);
      setLow(priceTargetData[1].low);
      setIsLoading(false);
    });
  }, [props.activeTicker]);

  useEffect(() => {
    if (!isLoading) {
      let recentPrice = series.slice(-1)[0].value;
      setCurrentPrice(recentPrice);
    }
  }, [isLoading, series]);

  useEffect(() => {
    function percentChange(a, b) {
      return ((b - a) / a) * 100;
    }

    let diff = percentChange(currentPrice, average);
    if (diff > 8) {
      setOutlook("Great");
    } else if (diff <= 8 && diff >= -8) {
      setOutlook("Neutral");
    } else if (diff < -8) {
      setOutlook("Poor");
    }
  }, [currentPrice, average]);

  const dataSource = {
    chart: {
      numberPrefix: "$",
      rotateLabels: 0,
      canvasbgColor: theme,
      canvasbgAlpha: "100",
      canvasBorderThickness: "0",
      showAlternateHGridColor: "0",
      bgColor: theme,
      bgAlpha: "100",
      showBorder: "0",
      palettecolors: "#007bff",
      drawAnchors: "0",
      showhovereffect: "1",
      crosslinealpha: "100",
      plotcolorintooltip: "1",
      drawcrossline: "1",
      crosslinecolor: "#808080",
      baseFontColor: textColor,
      toolTipBgColor: theme,
    },
    data: series,
    trendlines: [
      {
        line: [
          {
            startvalue: high,
            color: "#00FF00",
            displayvalue: "High",
            valueOnRight: "1",
            thickness: "1",
          },
          {
            startvalue: average,
            color: "#C0C0C0",
            displayvalue: "Avg",
            valueOnRight: "1",
            thickness: "1",
          },
          {
            startvalue: low,
            color: "#FF0000",
            displayvalue: "Low",
            valueOnRight: "1",
            thickness: "1",
          },
        ],
      },
    ],
  };

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
        className="pricetarget-card"
        title={props.title}
        extra={props.extra}
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
        <hr className="card-hr" />
        <div style={{ height: 456 }}>
          <ReactFC
            type="line"
            width="100%"
            height="78%"
            dataFormat="JSON"
            dataSource={dataSource}
          />
          <p className="price-target-outlook center">Outlook: <span className="blue">{outlook}</span></p>
        </div>
      </Card>
    );
  }
};

export default PriceTarget;
