import React, { useEffect, useState } from "react";
import "../../App.scss";
import image from "../../images/test.png";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import BasicNavbar from "../Navbars/BasicNavbar";
import db from "../../firebase";
import uuid from "react-uuid";
import firebase from "firebase/app";
import "firebase/firestore";

const Explore = (props) => {
  let { userID } = useParams();
  const [dashboards, setDashboards] = useState([]);

  useEffect(() => {
    db.collection("shared_dashboards")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setDashboards((prevSelected) => [...prevSelected, doc.data()]);
        });
      });
  }, []);

  useEffect(() => {
    const data = db.collection("saved_dashboards").doc(userID);

    data.get().then((docSnapshot) => {
      if (!docSnapshot.exists) {
        data.set({
          id: userID,
          dashboards: [],
        });
      }
    });
  }, []);

  const saveLayout = (e) => {
    console.log(e.target.value);

    const data = db.collection("saved_dashboards").doc(userID);

    data.get().then(() => {
      const selectedIndex = e.target.getAttribute("data-key");
      console.log(selectedIndex);

      let dashboard_names = dashboards.map((dashboard, i) => {
        return dashboard.dashboard_name;
      });

      let dashboard_layouts = dashboards.map((dashboard, i) => {
        return dashboard.dashboard;
      });

      // Makes sure that the current dashboard name doesn't already exist
      data
        .set(
          {
            id: userID,
            dashboards: firebase.firestore.FieldValue.arrayUnion({
              [uuid()]: {
                [dashboard_names[selectedIndex]]:
                  dashboard_layouts[selectedIndex],
              },
            }),
          },
          { merge: true }
        )
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    });
  };

  return (
    <div>
      <BasicNavbar />
      <h1 className="center header explore-header">Explore Page</h1>
      <div className="center explore-dashboards-section container-fluid">
        <div className="row">
          {dashboards.map((dashboard, key) => {
            return (
              <div className="col-lg-4">
                <img className="test-image" src={image} />
                <p>
                  <button
                    value={dashboard.dashboard}
                    key={key}
                    data-key={key}
                    onClick={saveLayout}
                    className="btn btn-primary"
                  >
                    Save
                  </button>
                </p>
                <h1>{dashboard.dashboard_name}</h1>
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
