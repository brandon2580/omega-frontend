import React from "react";
import "../../App.scss";
import { Card } from "antd";

const SecondTestCard = (props) => {
  return (
    <Card
      title="Second Test Card"
      style={{
        height: "100%",
        overflow: "auto",
        scrollbarColor: "#152233 #131722",
      }}
    >
      <hr className="card-hr" />

      <h1>Second Test Card</h1>
    </Card>
  );
};

export default SecondTestCard;
