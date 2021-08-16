import React, { useEffect, useState } from "react";
import "../../App.scss";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import {
  HomeOutlined,
  LineChartOutlined,
  LayoutOutlined,
} from "@ant-design/icons";
import db from "../../firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const Sidenavbar = (props) => {
  const [sidenavHeaderStyle, setSidenavHeaderStyle] = useState("hidden");
  const [savedDashboards, setSavedDashboards] = useState([]);
  const [savedDashboardNames, setSavedDashboardNames] = useState([]);

  const handleYourDashboardsClick = (e) => {
    props.setIsNewLayoutLoading(true)
    props.setSelectedLayoutIndex(e.target.getAttribute("data-index"));
    props.setWasYourDashboardSelected(true);
  };

  const handleSavedDashboardsClick = (e) => {
    props.setSelectedLayoutIndex(e.target.getAttribute("data-index"));
    props.setWasSavedDashboardSelected(true);
  };

  // const handleDelete = (e) => {
  //   let index = e.target.getAttribute("data-index");

  //   var ref = db.collection('user_dashboards').doc(props.userID);

  //   ref.update({
  //       dashboards: firebase.firestore.FieldValue.delete()
  //   });
  // };

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
      var docRef = db.collection("user_dashboards").doc(props.userID);
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
                    {/* <button
                    value={names}
                    data-index={i}
                    onClick={handleDelete}
                    className="btn btn-danger"
                  >
                    delete
                  </button> */}
                  </NavText>
                  <NavIcon>
                    <LayoutOutlined />
                  </NavIcon>
                </NavItem>
              );
            });

            props.setDashboardNames(mapped);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }, 500);
  }, []);

  useEffect(() => {
    // We have a decent amount of nesting to do here (as seen with the 3 maps)
    let firstLayer = savedDashboards.flatMap((el, i) => {
      return el.dashboards;
    });

    let secondLayer = firstLayer.flatMap((el, i) => {
      return Object.values(el);
    });

    let dashboardNames = secondLayer.flatMap((name, i) => {
      let names = Object.keys(name);
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
          </NavText>
        </NavItem>
      );
    });

    setSavedDashboardNames(dashboardNames);
  }, [savedDashboards]);

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
            <a className="nav-link">Dashboard</a>
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
        {props.dashboardNames}
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
