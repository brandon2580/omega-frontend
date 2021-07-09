import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";
import Loader from "react-loader-spinner";
import ReactApexChart from "react-apexcharts";

const CorrelatedMarkets = (props) => {
  const [series, setSeries] = useState();
  const [sectors, setSectors] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
  }, [props.darkMode]);

  useEffect(() => {
    const correlated_markets = fetch(
      `https://sigma7-analytics.azure-api.net/sigma7-analytics/corr_metrics/?symbol=${props.activeTicker}&frame=1y`
    ).then((res) => res.json());

    Promise.resolve(correlated_markets).then((el) => {
      let f = el.output;

      let values = Object.values(f).map((value) => {
        return value;
      });

      let names = Object.keys(f).map((name) => {
        return name;
      });

      setSeries([{ data: values }]);
      setSectors(names);
      setIsLoading(false);
    });
  }, [props.activeTicker]);

  let options = {
    chart: {
      type: "bar",
      height: 350,
    },
    xaxis: {
      labels: {
        style: {
          colors: [textColor],
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: [textColor],
        },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: sectors,
    },
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
        title={props.title}
        extra={props.extra}
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
        <hr className="card-hr" />
        <div style={{ height: 456 }}>
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={420}
          />
        </div>
      </Card>
    );
  }
};

export default CorrelatedMarkets;
