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

  useEffect(() => {
    setSeries(props.data.reverse());
  }, [props.data]);

  const handleClick = (e) => {
    props.setDividendRange(e.target.value);
  };

  const dataSource = {
    chart: {
      numberPrefix: "$",
      rotateLabels: 0,
      canvasbgColor: "#000000",
      canvasbgAlpha: "100",
      canvasBorderThickness: "0",
      showAlternateHGridColor: "0",
      bgColor: "#000000",
      bgAlpha: "#000000",
      showBorder: "0",
      palettecolors: "#007bff",
      anchorBgColor: "#007bff",
    },
    data: series,
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <button
          className="btn btn-sm shadow-none dropdown-btn"
          onClick={handleClick}
          value="1m"
        >
          1m
        </button>
      </Menu.Item>
      <Menu.Item>
        <button
          className="btn btn-sm shadow-none dropdown-btn"
          onClick={handleClick}
          value="3m"
        >
          3m
        </button>
      </Menu.Item>
      <Menu.Item>
        <button
          className="btn btn-sm shadow-none dropdown-btn"
          onClick={handleClick}
          value="6m"
        >
          6m
        </button>
      </Menu.Item>
      <Menu.Item>
        <button
          className="btn btn-sm shadow-none dropdown-btn"
          onClick={handleClick}
          value="ytd"
        >
          ytd
        </button>
      </Menu.Item>
      <Menu.Item>
        <button
          className="btn btn-sm shadow-none dropdown-btn"
          onClick={handleClick}
          value="1y"
        >
          1y
        </button>
      </Menu.Item>
      <Menu.Item>
        <button
          className="btn btn-sm shadow-none dropdown-btn"
          onClick={handleClick}
          value="2y"
        >
          2y
        </button>
      </Menu.Item>
      <Menu.Item>
        <button
          className="btn btn-sm shadow-none dropdown-btn"
          onClick={handleClick}
          value="5y"
        >
          5y
        </button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Card
      title={props.title}
      extra={props.button}
      style={{
        height: "100%",
        overflow: "auto",
        scrollbarColor: "#152233 #131722",
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
        </div>
      </div>
    </Card>
  );
};

export default Dividends;
