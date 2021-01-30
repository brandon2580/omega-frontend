import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import _ from "lodash";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts/core";
import Radar from "fusioncharts/viz/radar";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Radar, FusionTheme);

const PriceCalendar = (props) => {
  const [series, setSeries] = useState([]);

  function percentChange(n1, n2) {
    return (((n2 - n1) / n1) * 100).toFixed(2);
  }

  useEffect(() => {
    let closes = props.data.slice(2).map((el) => {
      return el.close;
    });

    let months = props.data.slice(2).map((el) => {
      let month = el.x.substring(5, 7)
      return month
    })

    let grouped = _.zip(closes, _.tail(closes))

    let mapped = grouped.map((price) => {
      return percentChange(price[0], price[1])
    });
    mapped.pop();

    console.log(grouped)
    console.log(mapped)
    console.log(props.data.slice(2))

    setSeries(mapped);
  }, [props.data]);


  const dataSource = {
    chart: {
      showlegend: "0",
      showdivlinevalues: "0",
      showlimits: "0",
      showvalues: "1",
      plotfillalpha: "40",
    },
    categories: [
      {
        category: [
          {
            label: "Jan",
          },
          {
            label: "Feb",
          },
          {
            label: "Mar",
          },
          {
            label: "Apr",
          },
          {
            label: "May",
          },
          {
            label: "Jun",
          },
          {
            label: "Jul",
          },
          {
            label: "Aug",
          },
          {
            label: "Sep",
          },
          {
            label: "Oct",
          },
          {
            label: "Nov",
          },
          {
            label: "Dec",
          },
        ],
      },
    ],
    dataset: [
      {
        seriesname: "% Change",
        data: series,
      },
    ],
  };

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
      <div style={{ height: "456px" }}>
        <ReactFC
          type="radar"
          width="100%"
          height="80%"
          dataFormat="JSON"
          dataSource={dataSource}
        />
      </div>
    </Card>
  );
};
export default PriceCalendar;
