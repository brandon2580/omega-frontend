import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card, Table } from "antd";
import Loader from "react-loader-spinner";

const TopInsiders = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  const [noData, setNoData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
  }, [props.darkMode]);

  useEffect(() => {
    setIsLoading(true);
    const top_insiders = fetch(
      `https://sigma7-api.azure-api.net/top_insiders?symbol=${props.activeTicker}`
    ).then((res) => res.json());

    Promise.resolve(top_insiders)
      .then((top_insiders) => {
        // First, check to see if the length of the array is 0
        // (meaning no data was returned)
        if (Object.keys(top_insiders).length === 0) {
          setNoData(true);
          setIsLoading(false);
        } else {
          let data = Object.values(top_insiders.insiders);
          let mapped = data.map((el, i) => {
            return {
              key: i,
              name: el.name,
              sale: el.sale,
              buy: el.buy,
              total_volume: el.total_volume,
            };
          });
          setDataSource(mapped);
          setColumns([
            {
              title: "Name",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "Bought",
              dataIndex: "buy",
              key: "buy",
            },
            {
              title: "Sold",
              dataIndex: "sale",
              key: "sale",
            },
            {
              title: "Total Volume",
              dataIndex: "total_volume",
              key: "total_volume",
            },
          ]);
          setNoData(false);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setNoData(true);
        setIsLoading(false);
      });
  }, [props.activeTicker]);

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
  } else if (noData) {
    return (
      <Card
        title={props.header}
        extra={props.extra}
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
        <hr className="card-hr" />
        <React.Fragment>
          <h1 style={{ color: textColor }}>No Top Insiders Data :(</h1>
        </React.Fragment>
      </Card>
    );
  } else {
    return (
      <Card
        title={props.header}
        extra={props.extra}
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
        <hr className="card-hr" />
        <React.Fragment>
          <div style={{ height: 440, overflow: "scroll", overflowX: "hidden" }}>
            <Table dataSource={dataSource} columns={columns} />
          </div>
        </React.Fragment>
      </Card>
    );
  }
};

export default TopInsiders;
