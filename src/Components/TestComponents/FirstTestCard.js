import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Card } from "antd";

const FirstTestCard = (props) => {
  return (
    <Card
      title={props.title}
      style={{
        height: "100%",
        overflow: "auto",
        scrollbarColor: "#152233 #131722",
      }}
    >
      <hr className="card-hr" />

      <div style={{ height: 456 }}>
        <p>{props.data}</p>
      </div>
    </Card>
  );
};

export default FirstTestCard;
