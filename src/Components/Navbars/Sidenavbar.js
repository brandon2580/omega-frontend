import React, { useEffect, useState } from "react";
import "../../App.scss";
import SideNav, { NavIcon, NavItem, NavText } from "@trendmicro/react-sidenav";
import DarkModeToggle from "../DarkModeToggle";

import {
  CloudOutlined,
  DeleteTwoTone,
  DollarOutlined,
  GlobalOutlined,
  HomeOutlined,
  LayoutOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "./images/logo.png";
import db from "../../firebase";
import "firebase/firestore";
import firebase from "firebase/app";

const Sidenavbar = (props) => {
  const { logout } = useAuth0();

  const [sidenavTextStyle, setSidenavTextStyle] = useState("hidden");
  const [logoStyle, setLogoStyle] = useState("");
  const [miscIconStyle, setMiscIconStyle] = useState("18px");
  const [sidenavToggleStyle, setSidenavToggleStyle] = useState("");
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
                      <span className="blue">*</span>
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
          ? setSidenavTextStyle("visible")
          : setSidenavTextStyle("hidden");
        isExpanded ? setLogoStyle("-70px") : setLogoStyle("");
        isExpanded ? setSidenavToggleStyle("80px") : setSidenavToggleStyle("");
        isExpanded ? setMiscIconStyle("10px") : setMiscIconStyle("18px");
      }}
      className="sidenav"
      style={{
        backgroundColor: "black",
        position: "fixed",
      }}
    >
      <a href="/">
        <img
          src={logo}
          width="80"
          className="d-inline-block align-top"
          alt="sigma7"
          style={{ marginLeft: logoStyle }}
        />
      </a>
      <SideNav.Toggle
        id="sidenav-toggle"
        style={{ marginTop: sidenavToggleStyle }}
      />

      <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home">
          {/* <NavIcon>
            <DollarOutlined />
          </NavIcon> */}
          <NavText>
            <div className="col-lg-12">
              <p
                style={{ visibility: sidenavTextStyle }}
                className="dashboards-text"
              >
                Stocks Dashboard
              </p>
            </div>
            <hr className="dashboards-hr" />
          </NavText>
        </NavItem>
        {yourDashboards}
        {savedDashboardNames}
        <NavItem eventKey="home">
          {/* <NavIcon>
            <DollarOutlined />
          </NavIcon> */}
          <NavText>
            <div className="col-lg-12">
              <p
                style={{ visibility: sidenavTextStyle }}
                className="dashboards-text"
              >
                Crypto Dashboards
              </p>
            </div>
            <hr className="dashboards-hr" />
          </NavText>
        </NavItem>
        <span className="bottom-sidenav">
          <hr className="sidenav-misc-hr" />
          <span className="justify-content-left sidenav-misc-button">
            <CloudOutlined
              style={{ marginLeft: miscIconStyle }}
              className="color-scheme-icon"
            />
            <h4
              style={{ visibility: sidenavTextStyle }}
              className="sidenav-misc-text"
            >
              Theme
            </h4>
            <DarkModeToggle setDarkMode={props.setDarkMode} />
          </span>
          <hr className="sidenav-misc-hr" />
          <a href={`/explore/${props.userID}`}>
            <span className="justify-content-left sidenav-misc-button">
              <GlobalOutlined
                style={{ marginLeft: miscIconStyle }}
                className="explore-icon"
              />{" "}
              <h4
                style={{ visibility: sidenavTextStyle }}
                className="sidenav-misc-text"
              >
                Explore
              </h4>
            </span>
          </a>
          <hr className="sidenav-misc-hr" />
          <a href="/profile">
            <span className="justify-content-left sidenav-misc-button">
              <UserOutlined
                style={{ marginLeft: miscIconStyle }}
                className="profile-icon"
              />{" "}
              <h4
                style={{ visibility: sidenavTextStyle }}
                className="sidenav-misc-text"
              >
                My Profile
              </h4>
            </span>
          </a>
          <hr className="sidenav-misc-hr" />
          <span
            onClick={() => logout({ returnTo: window.location.origin })}
            className="justify-content-left sidenav-misc-button"
          >
            <LogoutOutlined
              style={{ marginLeft: miscIconStyle }}
              className="logout-icon"
            />{" "}
            <h4
              style={{ visibility: sidenavTextStyle }}
              className="sidenav-misc-text"
            >
              Log Out
            </h4>
          </span>
        </span>
      </SideNav.Nav>
    </SideNav>
  );
};

export default Sidenavbar;
