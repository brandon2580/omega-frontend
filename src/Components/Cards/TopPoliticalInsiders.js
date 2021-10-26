import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card, Table } from "antd";
import Loader from "react-loader-spinner";

const TopPoliticalInsiders = (props) => {
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
    const top_political_insiders = fetch(
      `https://sigma7-api.azure-api.net/top_political_traders?symbol=${props.activeTicker}`
    ).then((res) => res.json());

    Promise.resolve(top_political_insiders)
      .then((top_political_insiders) => {
        // First, check to see if the length of the array is 0
        // (meaning no data was returned)
        if (Object.keys(top_political_insiders).length === 0) {
          setNoData(true);
          setIsLoading(false);
        } else {
          let data = Object.values(top_political_insiders.transactions);

          let mapped = data.map((el, i) => {
            return {
              key: i,
              name: el.name,
              est_purchase_volume: el.est_purchase_volume,
              est_sale_volume: el.est_sale_volume,
              district: el.district,
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
              title: "Est. Purchase Volume",
              dataIndex: "est_purchase_volume",
              key: "est_purchase_volume",
            },
            {
              title: "Est. Sale Volume",
              dataIndex: "est_sale_volume",
              key: "est_sale_volume",
            },
            {
              title: "District",
              dataIndex: "district",
              key: "district",
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
        className="card"
        title={props.header}
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
        className="card"
        title={props.header}
        extra={props.extra}
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
        <hr className="card-hr" />
        <React.Fragment>
          <h1 style={{ color: textColor }}>
            No Top Political Insiders Data :(
          </h1>
        </React.Fragment>
      </Card>
    );
  } else {
    return (
      <Card
        className="card"
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

export default TopPoliticalInsiders;
