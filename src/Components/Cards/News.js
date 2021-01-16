import React from "react";
import "../../App.scss";
import { Card } from "antd";

const News = (props) => {
  return(
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
          <h1>News</h1>
      </div>
    </Card>
  );
};

export default News;
