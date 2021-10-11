import React, { useEffect, useState } from "react";
import "../../App.scss";
import SideNav, { NavIcon, NavItem, NavText } from "@trendmicro/react-sidenav";
import { DeleteTwoTone, HomeOutlined, LayoutOutlined } from "@ant-design/icons";
import db from "../../firebase";
import "firebase/firestore";
import firebase from "firebase/app";

const Sidenavbar = (props) => {
  const [sidenavHeaderStyle, setSidenavHeaderStyle] = useState("hidden");
  const [savedDashboards, setSavedDashboards] = useState([]);
  const [savedDashboardNames, setSavedDashboardNames] = useState([]);
  const [yourDashboards, setYourDashboards] = useState([]);
  const [wasDeleted, setWasDeleted] = useState(false);

  const handleYourDashboardsClick = (e) => {
    props.setIsNewLayoutLoading(true);
    props.setSelectedLayoutIndex(e.target.getAttribute("data-index"));
    props.setWasYourDashboardSelected(true);
  };

  const handleSavedDashboardsClick = (e) => {
    props.setIsNewLayoutLoading(true);
    props.setSelectedLayoutIndex(e.target.getAttribute("data-index"));
    props.setWasSavedDashboardSelected(true);
  };

  const handleYourDashboardsDelete = (e) => {
    let index = e.target.getAttribute("data-index");

    var ref = db.collection("user_dashboards").doc(props.userID);
    ref.get().then((doc) => {
      if (doc.exists) {
        // This gets the layout which exists in the firebase array and deletes it
        let layout = doc.data().dashboards[index];
        ref.update({
          dashboards: firebase.firestore.FieldValue.arrayRemove(layout),
        });
        setWasDeleted(true);
      }
    });
  };

  const handleSavedDashboardsDelete = (e) => {
    let index = e.target.getAttribute("data-index");

    var ref = db.collection("saved_dashboards").doc(props.userID);
    ref.get().then((doc) => {
      if (doc.exists) {
        // This gets the layout which exists in the firebase array and deletes it
        let layout = doc.data().dashboards[index];
        console.log(doc.data().dashboards[index]);
        ref.update({
          dashboards: firebase.firestore.FieldValue.arrayRemove(layout),
        });
        setWasDeleted(true);
      }
    });
  };

  useEffect(() => {
    db.collection("saved_dashboards")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setSavedDashboards((prevSelected) => [...prevSelected, doc.data()]);
        });
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const docRef = db.collection("user_dashboards").doc(props.userID);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            let mapped = Object.values(doc.data().dashboards).map((el, i) => {
              let values = Object.values(el)[0];
              let names = Object.keys(values);
              return (
                <NavItem eventKey="home">
                  <NavIcon>
                    <LayoutOutlined />
                  </NavIcon>
                  <NavText>
                    <a
                      value={names}
                      data-index={i}
                      onClick={handleYourDashboardsClick}
                    >
                      {names}
                    </a>
                    <button
                      value={names}
                      data-index={i}
                      onClick={handleYourDashboardsDelete}
                      className="btn btn-danger fa fa-trash"
                      style={{ marginLeft: "25px" }}
                    />
                  </NavText>
                  <NavIcon>
                    <LayoutOutlined />
                  </NavIcon>
                </NavItem>
              );
            });

            setYourDashboards(mapped);
            setWasDeleted(false);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    });
  }, [props.dashboardNames, wasDeleted]);

  useEffect(() => {
    setTimeout(() => {
      const docRef = db.collection("saved_dashboards").doc(props.userID);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            let mapped = Object.values(doc.data().dashboards).map((el, i) => {
              let values = Object.values(el)[0];
              let names = Object.keys(values);
              return (
                <NavItem eventKey="home">
                  <NavIcon>
                    <LayoutOutlined />
                  </NavIcon>
                  <NavText>
                    <a
                      value={names}
                      data-index={i}
                      onClick={handleSavedDashboardsClick}
                    >
                      {names}
                    </a>
                    <button
                      value={names}
                      data-index={i}
                      onClick={handleSavedDashboardsDelete}
                      className="btn btn-danger fa fa-trash"
                      style={{ marginLeft: "25px" }}
                    />
                  </NavText>
                </NavItem>
              );
            });

            setSavedDashboardNames(mapped);
            setWasDeleted(false);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    });
  }, [savedDashboards, wasDeleted]);

  return (
    <SideNav
      onToggle={(isExpanded) => {
        isExpanded
          ? setSidenavHeaderStyle("visible")
          : setSidenavHeaderStyle("hidden");
      }}
      className="sidenav"
      style={{
        backgroundImage: "linear-gradient(315deg, #121516 0%, #000000 74%)",
        position: "fixed",
      }}
    >
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home">
          <NavText>
            <div className="col-lg-12">
              <p
                style={{ visibility: sidenavHeaderStyle }}
                className="dashboards-text"
              >
                Pages
              </p>
            </div>
            <hr className="dashboards-hr" />
          </NavText>
        </NavItem>
        <NavItem eventKey="home">
          <NavIcon>
            <HomeOutlined />
          </NavIcon>
          <NavText>
            <a className="nav-link">Stocks</a>
          </NavText>
        </NavItem>
        <NavItem eventKey="home">
          <NavIcon>
            <HomeOutlined />
          </NavIcon>
          <NavText>
            <a className="nav-link">Crypto</a>
          </NavText>
        </NavItem>
        <NavItem eventKey="home">
          <NavText>
            <div className="col-lg-12">
              <p
                style={{ visibility: sidenavHeaderStyle }}
                className="dashboards-text"
              >
                Your Dashboards
              </p>
            </div>
            <hr className="dashboards-hr" />
          </NavText>
        </NavItem>
        {yourDashboards}
        <NavItem eventKey="home">
          <NavText>
            <div className="col-lg-12">
              <p
                style={{ visibility: sidenavHeaderStyle }}
                className="dashboards-text"
              >
                Saved Dashboards
              </p>
            </div>
            <hr className="dashboards-hr" />
          </NavText>
        </NavItem>
        {savedDashboardNames}
      </SideNav.Nav>
    </SideNav>
  );
};

export default Sidenavbar;
