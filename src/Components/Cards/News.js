import React, {useEffect, useState} from "react";
import "../../App.scss";
import {Card} from "antd";
import Loader from "react-loader-spinner";

const News = (props) => {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [titleColor, setTitleColor] = useState({
        positive: "lime",
        neutral: "grey",
        mixed: "yellow",
        negative: "red",
    });

    useEffect(() => {
        setIsLoading(true)
        const news = fetch(
            `https://sigma7-api.azure-api.net/sentiment_news?symbol=${props.activeTicker}`
        ).then((res) => res.json());

        Promise.resolve(news).then((news) => {
            let newsData = Object.keys(news).map(function (key) {
                return {
                    title: news[key].headline,
                    source: news[key].source,
                    summary: news[key].summary,
                    url: news[key].url,
                    sentiment: news[key].sentiment,
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
                <hr className="card-hr"/>

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
                <hr className="card-hr"/>

                <div className="news-card-body" style={{height: 456}}>
                    {news.map((news) => {
                        return (
                            <React.Fragment>
                                <a target="_blank" href={news.url}>
                                    <h4
                                        className="news-header"
                                        style={{color: titleColor[news.sentiment]}}
                                    >
                                        {news.title}
                                    </h4></a>
                                <p>{news.summary}</p>
                                <a target="_blank" href={news.url}>
                                    Link
                                </a>{" "}
                                | {news.source}
                                <hr className="news-hr"/>
                            </React.Fragment>
                        );
                    })}
                </div>
            </Card>
        );
    }
};

export default News;
