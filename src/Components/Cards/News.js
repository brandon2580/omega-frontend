import React, { useEffect, useState } from "react";
import "../../App.scss";
import Ticker from "react-ticker";
import { Card } from "antd";

const News = (props) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const news = fetch(
      `https://cloud.iexapis.com/stable/stock/${props.activeTicker}/news/last/50?token=pk_756d2eedb1d64c5192084581943ee4b9`
    ).then((res) => res.json());

    Promise.resolve(news).then((news) => {
      let newsData = Object.keys(news).map(function (key) {
        return {
          title: news[key].headline,
          source: news[key].source,
          summary: news[key].summary,
          url: news[key].url,
        };
      });
      setNews(newsData);
    });
  }, [props.activeTicker]);

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
