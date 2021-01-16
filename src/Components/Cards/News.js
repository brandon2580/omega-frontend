import React, { useEffect, useState } from "react";
import "../../App.scss";
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
        <div className="row news-row">
          <div className="col-lg-12">
            {news.map((el) => {
              return (
                <p>
                  {el.source}: {el.title}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default News;
