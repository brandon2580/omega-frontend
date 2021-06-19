import React, { useEffect, useState } from "react";
import "../../App.scss";
import Ticker from "react-ticker";
import { Card } from "antd";
import Loader from "react-loader-spinner";

const News = (props) => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const pk_key = process.env.IEX_PK_KEY;

  useEffect(() => {
    const news = fetch(
      `https://sandbox.iexapis.com/stable/stock/${props.activeTicker}/news/last/50?token=${pk_key}`
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
  } else {
    return (
      <Card
        className="news-card"
        title={props.title}
        extra={props.extra}
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
        <hr className="card-hr" />

        <div className="news-card-body" style={{ height: 456 }}>
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
  }
};

export default News;
