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
      extra={props.extra}
      style={{
        height: "100%",
        overflow: "auto",
      }}
    >
      <hr className="card-hr" />

      <div className="news-card" style={{ height: 456 }}>
        {news.map((news) => {
          return (
            <div>
                <h4 className="news-header">
                  {news.source}: {news.title}
                </h4>
                <p>{news.summary}</p>
                <a target="_blank" href={news.url}>
                  {news.url}
                </a>
              <hr className="news-hr" />
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default News;
