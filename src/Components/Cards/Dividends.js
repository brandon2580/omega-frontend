import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts/core";
import Line from "fusioncharts/viz/line";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Line, FusionTheme);

const Dividends = (props) => {
  const [series, setSeries] = useState();
  const [dividendRange, setDividendRange] = useState(25);
  const [theme, setTheme] = useState("");
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    props.darkMode ? setTheme("#000000") : setTheme("#FFFFFF");
    props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
  }, [props.darkMode]);

  useEffect(() => {
    const dividends = fetch(
      `${props.apiBaseUrl}/dividends?code=${props.apiCode}==&symbol=${props.activeTicker}&lastN=${dividendRange}`
    ).then((res) => res.json());

    Promise.resolve(dividends).then((dividends) => {
      let dividendData = Object.keys(dividends.amount)
        .reverse()
        .map(function (key) {
          return {
            label: key,
            value: dividends.amount[key].toFixed(2),
          };
        });

      setSeries(dividendData);
    });
  }, [dividendRange, props.activeTicker]);

  const handleClick = (e) => {
    setDividendRange(e.target.value);
  };

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
      anchorBgColor: "#007bff",
      showhovereffect: "1",
      crosslinealpha: "100",
      plotcolorintooltip: "1",
      drawcrossline: "1",
      crosslinecolor: "#808080",
      baseFontColor: textColor,
      toolTipBgColor: theme,
    },
    data: series,
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <button
          className="btn btn-sm shadow-none dropdown-btn"
          onClick={handleClick}
          value="5"
        >
          5
        </button>
      </Menu.Item>
      <Menu.Item>
        <button
          className="btn btn-sm shadow-none dropdown-btn"
          onClick={handleClick}
          value="10"
        >
          10
        </button>
      </Menu.Item>
      <Menu.Item>
        <button
          className="btn btn-sm shadow-none dropdown-btn"
          onClick={handleClick}
          value="15"
        >
          15
        </button>
      </Menu.Item>
      <Menu.Item>
        <button
          className="btn btn-sm shadow-none dropdown-btn"
          onClick={handleClick}
          value="20"
        >
          20
        </button>
      </Menu.Item>
      <Menu.Item>
        <button
          className="btn btn-sm shadow-none dropdown-btn"
          onClick={handleClick}
          value="25"
        >
          25
        </button>
      </Menu.Item>
    </Menu>
  );

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
      <div style={{ height: 456 }}>
        <ReactFC
          type="line"
          width="100%"
          height="80%"
          dataFormat="JSON"
          dataSource={dataSource}
        />
        <div className="row">
          <div className="col-sm-12">
            <Dropdown overlay={menu}>
              <btn className="ant-dropdown-link">
                Range <DownOutlined />
              </btn>
            </Dropdown>
          </div>
        </div>{" "}
      </div>
    </Card>
  );
};

export default Dividends;
