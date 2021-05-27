import React, { useEffect, useState } from "react";
import "../../App.scss";
import image from "../../images/test.png";
import BasicNavbar from "../Navbars/BasicNavbar";

const Explore = () => {
  return (
    <div>
      <BasicNavbar />
      <h1 className="center header explore-header">Explore Page</h1>
      <div className="center explore-dashboards-section container-fluid">
        <div className="row">
          <img className="test-image" src={image} />
          <img className="test-image" src={image} />
          <img className="test-image" src={image} />
          <img className="test-image" src={image} />
        </div>
        <div className="row">
          <img className="test-image" src={image} />
          <img className="test-image" src={image} />
          <img className="test-image" src={image} />
          <img className="test-image" src={image} />
        </div>
      </div>
    </div>
  );
};

export default Explore;
