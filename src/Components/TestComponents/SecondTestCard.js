import React from "react";
import "../../App.scss";
import { Card } from "antd";

const SecondTestCard = (props) => {
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

      <h1>{props.name}</h1>
    </Card>
  );
};

export default SecondTestCard;
