import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

const Dividends = (props) => {
  const [series, setSeries] = useState();

  useEffect(() => {
    setSeries(props.data);
  }, [props.data]);

  const handleClick = (e) => {
    props.setDividendRange(e.target.value)
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <button className='btn btn-sm shadow-none dropdown-btn' onClick={handleClick} value="5">
          5
        </button>
      </Menu.Item>
      <Menu.Item>
        <button className='btn btn-sm shadow-none dropdown-btn' onClick={handleClick} value="10">
          10
        </button>
      </Menu.Item>
      <Menu.Item>
        <button className='btn btn-sm shadow-none dropdown-btn' onClick={handleClick} value="15">
          15
        </button>
      </Menu.Item>
      <Menu.Item>
        <button className='btn btn-sm shadow-none dropdown-btn' onClick={handleClick} value="20">
          20
        </button>
      </Menu.Item>
      <Menu.Item>
        <button className='btn btn-sm shadow-none dropdown-btn' onClick={handleClick} value="25">
          25
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
        <div className="row">
          <div className="col-sm-12">
            <Dropdown overlay={menu}>
              <btn className="ant-dropdown-link">
                Range <DownOutlined />
              </btn>
            </Dropdown>
          </div>
        </div>

        <ResponsiveContainer>
          <LineChart
            data={series}
            margin={{
              top: 20,
              right: 50,
              left: 15,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="bottom" align="center" />
            <Line
              type="monotone"
              name={props.dataLabel}
              dataKey="data"
              stroke="#1F77B4"
              fill="#007bff"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default Dividends;
