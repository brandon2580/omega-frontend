import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import _ from "lodash";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts/core";
import Radar from "fusioncharts/viz/radar";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Radar, FusionTheme);

const PriceCalendar = (props) => {
  const [series, setSeries] = useState([]);
  const [theme, setTheme] = useState("");
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    props.darkMode ? setTheme("#000000") : setTheme("#FFFFFF");
    props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
  }, [props.darkMode]);

  useEffect(() => {
    setSeries(props.data);
  }, [props.data]);

  const handleClick = (e) => {
    props.setCalendarFrame(e.target.value);
  };

  const dataSource = {
    chart: {
      decimals: "2",
      showlegend: "0",
      showvalues: "1",
      numbersuffix: "%",
      canvasbgColor: theme,
      radarfillcolor: theme,
      plotfillalpha: "40",
      bgColor: theme,
      bgAlpha: "100",
      showBorder: "0",
      palettecolors: "#007bff",
      anchorBgColor: "#007bff",
      baseFontColor: textColor,
      toolTipBgColor: theme,
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

  const menu = (
    <Menu>
      <Menu.Item>
        <button
          className="btn btn-sm shadow-none dropdown-btn"
          onClick={handleClick}
          value="1"
        >
          1
        </button>
      </Menu.Item>
      <Menu.Item>
        <button
          className="btn btn-sm shadow-none dropdown-btn"
          onClick={handleClick}
          value="3"
        >
          3
        </button>
      </Menu.Item>
      <Menu.Item>
        <button
          className="btn btn-sm shadow-none dropdown-btn"
          onClick={handleClick}
          value="max"
        >
          Max
        </button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Card
      className="hide-overflow"
      title={props.title}
      extra={props.extra}
      style={{
        height: "100%",
        overflow: "auto",
        scrollbarColor: "#152233 #131722",
      }}
    >
      <hr className="card-hr" />
      <div style={{ height: 456 }}>
        <ReactFC
          type="radar"
          width="100%"
          height="80%"
          dataFormat="JSON"
          dataSource={dataSource}
        />

        <div className="row">
          <div className="col-sm-12">
            <Dropdown overlay={menu}>
              <btn className="ant-dropdown-link">
                Frame <DownOutlined />
              </btn>
            </Dropdown>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default PriceCalendar;
