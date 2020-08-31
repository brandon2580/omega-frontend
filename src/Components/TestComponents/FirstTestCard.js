import React from "react";
import "../../App.scss";
import { Card } from "antd";

const FirstTestCard = (props) => {
  return (
    <Card
      title="First Test Card"
      style={{
        height: "100%",
        overflow: "auto",
        scrollbarColor: "#152233 #131722",
      }}
    >
      <hr className="card-hr" />

      <h1>First Test Card</h1>
    </Card>
  );
};

export default FirstTestCard;
