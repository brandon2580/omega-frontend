import React, { useEffect, useState } from "react";
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

      <p>{props.data}</p>
    </Card>
  );
};

export default SecondTestCard;
