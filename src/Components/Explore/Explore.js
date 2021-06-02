import React, { useEffect, useState } from "react";
import "../../App.scss";
import image from "../../images/test.png";
import BasicNavbar from "../Navbars/BasicNavbar";
import db from "../../firebase";

const Explore = (props) => {
  const [dashboards, setDashboards] = useState([]);

  useEffect(() => {
    db.collection("shared_dashboards")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          setDashboards((prevSelected) => [
            ...prevSelected,
            doc.data().dashboard,
          ]);
        });
      });
  }, []);

  const saveLayout = () => {

  }

  console.log(props);

  return (
    <div>
      <BasicNavbar />
      <h1 className="center header explore-header">Explore Page</h1>
      <div className="center explore-dashboards-section container-fluid">
        <div className="row">
          {dashboards.map((dashboard) => {
            return <p>{JSON.stringify(dashboard)} <button onClick={saveLayout} className="btn btn-primary">Save</button></p>;
          })}
        </div>

        {/* <div className="row">
          <img className="test-image" src={image} />
          <img className="test-image" src={image} />
          <img className="test-image" src={image} />
          <img className="test-image" src={image} />
        </div> */}
      </div>
    </div>
  );
};

export default Explore;
