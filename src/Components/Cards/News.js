import React, { useEffect, useState } from "react";
import "../../App.scss";
import Ticker from "react-ticker";
import { Card } from "antd";

const News = (props) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    setNews(props.data);
  }, [props.data]);

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
        <div className="scrolling-news">
          <Ticker>
            {() => {
              let mappedNews = news.map((el) => {
                return (
                  <span className="ticker-content">
                    <span className="yellow"><strong>{el.source}</strong></span>: {el.title}{'  '}
                  </span>
                );
              });
              return mappedNews;
            }}
          </Ticker>
        </div>
      </div>
    </Card>
  );
};

export default News;
