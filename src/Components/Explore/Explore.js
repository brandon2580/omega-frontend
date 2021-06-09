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
          setDashboards((prevSelected) => [
            ...prevSelected,
            doc.data().dashboard,
          ]);
        });
      });
  }, []);

  const saveLayout = (e) => {
    console.log(e.target.value);
  };

  return (
    <div>
      <BasicNavbar />
      <h1 className="center header explore-header">Explore Page</h1>
      <div className="center explore-dashboards-section container-fluid">
        <div className="row">
          {dashboards.map((dashboard) => {
            return (
              <div className="col-lg-4">
                <img className="test-image" src={image} />
                <p>
                  <button
                    value={dashboard}
                    onClick={saveLayout}
                    className="btn btn-primary"
                  >
                    Save
                  </button>
                </p>
              </div>
            );
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
